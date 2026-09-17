import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendSms } from "@/lib/sms";
import { makeTicketCode, ticketQrPayload, ticketSmsBodies } from "@/lib/ticket";

// node:crypto (ticket codes) needs the Node runtime, not edge.
export const runtime = "nodejs";

/**
 * Manual admin confirmation → issue tickets + text the buyer their code(s).
 *
 * Idempotency (PAYMENT_FLOW.md §6.1): the update flips pending->confirmed only
 * when the row is still pending, and `.select()` returns a row ONLY for the
 * call that actually made that transition. A double-tap matches zero rows, so
 * tickets are issued and the ticket SMS is sent exactly once — never twice.
 *
 * The SMS is best-effort and config-gated: sendSms() no-ops (logs) until an SMS
 * provider is configured, so confirming always succeeds even with no gateway.
 * TODO(auth): require an authenticated admin session + role; audit-log confirms.
 */
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, stub: true });
  }

  const { data: updated, error } = await supabase
    .from("orders")
    .update({ status: "confirmed", sms_sent_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "pending")
    .select("id, ref, customer_phone");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const order = updated?.[0];
  if (!order) {
    // Already confirmed (or not found) — do not re-issue tickets or re-send SMS.
    return NextResponse.json({ ok: true, alreadyDone: true });
  }

  // One ticket per seat. Seat multiplier is 1 for every tier today; if the
  // client later says "A Table" seats N, multiply qty here — nothing else moves.
  const { data: items } = await supabase
    .from("order_items")
    .select("product_id, tier, qty")
    .eq("order_id", id);

  const rows = (items ?? []).flatMap((it) => {
    const tier = it.tier ?? "General";
    return Array.from({ length: Math.max(1, it.qty) }, () => {
      const code = makeTicketCode(it.product_id);
      return { order_id: id, code, tier, qr_payload: ticketQrPayload(code) };
    });
  });

  if (rows.length > 0) {
    const { error: ticketErr } = await supabase.from("tickets").insert(rows);
    if (ticketErr) {
      return NextResponse.json({ error: ticketErr.message }, { status: 500 });
    }

    // Best-effort: a gateway failure must not undo a confirmed order.
    const bodies = ticketSmsBodies(
      order.ref,
      rows.map((r) => ({ tier: r.tier, code: r.code })),
    );
    await Promise.all(
      bodies.map((body) =>
        sendSms({ to: order.customer_phone, body, template: "ticket", orderId: order.id }),
      ),
    ).catch(() => {});
  }

  return NextResponse.json({ ok: true, tickets: rows.length });
}

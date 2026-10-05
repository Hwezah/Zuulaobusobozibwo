import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * Undo a mistaken confirmation: confirmed -> pending, tickets voided.
 *
 * Tickets are deleted (not kept) so confirming again issues a fresh set rather
 * than duplicating codes; the code the buyer was already texted stops being
 * valid. No SMS is sent here. The `.eq("status","confirmed")` guard makes a
 * double-tap a harmless no-op. Refused if any ticket was already checked in at
 * the door. Guarded by requireAdmin() (signed session cookie). TODO: audit-log.
 */
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const { id } = await params;
  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, stub: true });
  }

  const { data: used, error: usedErr } = await supabase
    .from("tickets")
    .select("id")
    .eq("order_id", id)
    .not("checked_in_at", "is", null)
    .limit(1);
  if (usedErr) return NextResponse.json({ error: usedErr.message }, { status: 500 });
  if (used && used.length > 0) {
    return NextResponse.json(
      { error: "A ticket from this order has already been used at the door." },
      { status: 409 },
    );
  }

  const { data: flipped, error } = await supabase
    .from("orders")
    .update({ status: "pending", sms_sent_at: null })
    .eq("id", id)
    .eq("status", "confirmed")
    .select("id");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!flipped || flipped.length === 0) {
    return NextResponse.json({ ok: true, alreadyDone: true });
  }

  const { error: delErr } = await supabase.from("tickets").delete().eq("order_id", id);
  if (delErr) {
    // Don't leave a pending order with live tickets: put it back as confirmed.
    await supabase.from("orders").update({ status: "confirmed" }).eq("id", id);
    return NextResponse.json({ error: delErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

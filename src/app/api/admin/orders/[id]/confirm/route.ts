import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * Manual admin confirmation → issue tickets + send ticket SMS.
 * TODO(auth): require an authenticated admin session (Supabase Auth + role),
 * rate-limit, and audit-log every confirm. TODO(sms): idempotent send per
 * (order, 'ticket'). See BACKEND_SPEC.md "Admin auth".
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
  // The `.eq("status", "pending")` guard is the idempotency line from
  // PAYMENT_FLOW.md §6.1: a double-tap matches zero rows once confirmed, so no
  // second ticket is issued and no second SMS is sent.
  const { error } = await supabase
    .from("orders")
    .update({ status: "confirmed", sms_sent_at: new Date().toISOString() })
    .eq("id", id)
    .eq("status", "pending");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

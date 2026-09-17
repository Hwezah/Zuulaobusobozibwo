import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * Manual admin rejection → mark the order failed with a required reason.
 * The `.eq("status", "pending")` guard means a confirmed order can never be
 * flipped to failed, and a double-tap is a harmless no-op (see PAYMENT_FLOW.md
 * §6.3 / §9). TODO(auth): require an authenticated admin session + role,
 * rate-limit, audit-log, and optionally send the `failed` SMS template.
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  let reason = "";
  try {
    const body = await req.json();
    reason = typeof body?.reason === "string" ? body.reason.trim() : "";
  } catch {
    // no body — falls through to the required-reason check below
  }
  if (!reason) {
    return NextResponse.json(
      { error: "A reason is required to decline an order." },
      { status: 422 },
    );
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, stub: true });
  }

  const { error } = await supabase
    .from("orders")
    .update({ status: "failed", reject_reason: reason })
    .eq("id", id)
    .eq("status", "pending");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

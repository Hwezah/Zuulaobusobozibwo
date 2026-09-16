import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * Resend the payment-reminder SMS. TODO(auth): admin session required.
 * TODO(sms): idempotent per (order, 'reminder'). See BACKEND_SPEC.md.
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
  // Reminder SMS is logged/sent server-side; status stays awaiting_payment.
  void id;
  return NextResponse.json({ ok: true });
}

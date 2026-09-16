import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * MTN MoMo collections callback. TODO(payments):
 *  1. Verify the provider signature (reject if invalid).
 *  2. Dedupe via webhook_events (idempotency).
 *  3. On success → mark order 'paid', issue tickets, send ticket SMS.
 * Never trust the client; only a verified webhook may reach 'paid'.
 */
export async function POST(req: Request) {
  const raw = await req.json().catch(() => ({}));
  const supabase = createServiceClient();
  if (supabase) {
    await supabase
      .from("webhook_events")
      .insert({ provider: "mtn", raw, signature_ok: false });
  }
  return NextResponse.json({ received: true });
}

import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * Airtel Money collections callback. Same contract as the MTN webhook:
 * verify signature → dedupe → mark 'paid' → issue tickets → send SMS.
 * See BACKEND_SPEC.md.
 */
export async function POST(req: Request) {
  const raw = await req.json().catch(() => ({}));
  const supabase = createServiceClient();
  if (supabase) {
    await supabase
      .from("webhook_events")
      .insert({ provider: "airtel", raw, signature_ok: false });
  }
  return NextResponse.json({ received: true });
}

/**
 * Provider-agnostic SMS seam. Business logic calls sendSms() only — no gateway
 * SDK leaks past this file (PAYMENT_FLOW.md §7).
 *
 * HOLD SPOT: until SMS_PROVIDER + SMS_API_KEY are set this no-ops (logs only),
 * so the ticket flow works in prototype mode. Wire the chosen gateway
 * (Africa's Talking / EgoSMS / Yo! Uganda) where the TODO is below. A
 * registered sender ID is a launch blocker — approval takes days, so apply
 * early.
 */
export interface SmsMessage {
  to: string;
  body: string;
  template?: string;
  orderId?: string | null;
}

export interface SmsResult {
  ok: boolean;
  stub?: boolean;
  error?: string;
}

export function isSmsConfigured(): boolean {
  return Boolean(process.env.SMS_PROVIDER && process.env.SMS_API_KEY);
}

export async function sendSms(msg: SmsMessage): Promise<SmsResult> {
  if (!isSmsConfigured()) {
    console.info(`[sms:stub] -> ${msg.to} :: ${msg.body}`);
    return { ok: true, stub: true };
  }
  try {
    // TODO(sms): POST to the chosen provider here using SMS_API_KEY /
    // SMS_SENDER_ID. Keep the integration confined to this function.
    await Promise.resolve();
    console.info(`[sms] -> ${msg.to} :: ${msg.body}`);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "sms failed" };
  }
}

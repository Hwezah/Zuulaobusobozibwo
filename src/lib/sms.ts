/**
 * Provider-agnostic SMS seam. Business logic calls sendSms() only — no gateway
 * SDK leaks past this file (PAYMENT_FLOW.md §7).
 *
 * Wired provider: Africa's Talking (SMS_PROVIDER=africastalking). Set
 * AT_USERNAME=sandbox to test free in the AT simulator; a live app username
 * routes to production. Until SMS_PROVIDER + SMS_API_KEY are set this no-ops
 * (logs only), so the ticket flow works in prototype mode. A registered sender
 * ID is a launch blocker — approval takes days, so apply early.
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
    switch ((process.env.SMS_PROVIDER ?? "").toLowerCase()) {
      case "africastalking":
      case "at":
        return await sendViaAfricasTalking(msg);
      default:
        console.warn(`[sms] unknown SMS_PROVIDER "${process.env.SMS_PROVIDER}" — not sent`);
        return { ok: false, error: "unknown SMS_PROVIDER" };
    }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "sms failed" };
  }
}

// ------------------------------------------------------------------ Africa's Talking

interface ATRecipient {
  number: string;
  cost: string;
  status: string;
  statusCode: number;
  messageId: string;
}

interface ATResponse {
  SMSMessageData?: {
    Message?: string;
    Recipients?: ATRecipient[];
  };
}

async function sendViaAfricasTalking(msg: SmsMessage): Promise<SmsResult> {
  const apiKey = process.env.SMS_API_KEY as string;
  // "sandbox" is both a valid username and the switch that selects the sandbox
  // host — the AT simulator receives the message at zero cost.
  const username = process.env.AT_USERNAME || "sandbox";
  const senderId = process.env.SMS_SENDER_ID;
  const base =
    username === "sandbox"
      ? "https://api.sandbox.africastalking.com"
      : "https://api.africastalking.com";

  const params = new URLSearchParams({ username, to: msg.to, message: msg.body });
  if (senderId) params.set("from", senderId);

  const res = await fetch(`${base}/version1/messaging`, {
    method: "POST",
    headers: {
      apiKey,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return { ok: false, error: `AT ${res.status}: ${text.slice(0, 200)}` };
  }

  const data = (await res.json().catch(() => null)) as ATResponse | null;
  const recipients = data?.SMSMessageData?.Recipients ?? [];
  const summary = data?.SMSMessageData?.Message ?? "";
  const ok = recipients.length > 0 && recipients.every((r) => r.status === "Success");

  if (!ok) {
    const detail =
      recipients.map((r) => `${r.number}:${r.status}`).join(", ") || summary || "no recipients";
    return { ok: false, error: `AT rejected: ${detail}` };
  }

  console.info(`[sms:at] ${summary} -> ${msg.to}`);
  return { ok: true };
}

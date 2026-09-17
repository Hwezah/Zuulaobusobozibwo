import { NextResponse } from "next/server";
import { isSmsConfigured, sendSms } from "@/lib/sms";
import { adminSmsRecipients } from "@/lib/notify";

// node runtime for the outbound fetch in sendSms.
export const runtime = "nodejs";

/**
 * Temporary sandbox-only SMS diagnostic. Visit /api/debug/sms to see whether the
 * SMS env vars reached THIS deployment; add ?send=1 to attempt a real sandbox
 * send and see Africa's Talking's actual response. Never exposes the API key.
 * Self-disables the moment AT_USERNAME is a live (non-"sandbox") username.
 * Remove this route before going live.
 */
export async function GET(req: Request) {
  const username = process.env.AT_USERNAME || "sandbox";
  if (username !== "sandbox") {
    return NextResponse.json({ error: "debug endpoint disabled outside sandbox" }, { status: 404 });
  }

  const recipients = adminSmsRecipients();
  const info = {
    smsConfigured: isSmsConfigured(),
    provider: process.env.SMS_PROVIDER ?? null,
    atUsername: username,
    hasApiKey: Boolean(process.env.SMS_API_KEY),
    senderId: process.env.SMS_SENDER_ID ?? null,
    recipients,
  };

  if (new URL(req.url).searchParams.get("send") === "1") {
    const to = recipients[0];
    if (!to) {
      return NextResponse.json({
        ...info,
        send: { attempted: false, reason: "no ADMIN_SMS_RECIPIENTS set on this deployment" },
      });
    }
    const result = await sendSms({ to, body: "Zuula sandbox test: SMS pipeline OK." });
    return NextResponse.json({ ...info, send: { attempted: true, to, result } });
  }

  return NextResponse.json(info);
}

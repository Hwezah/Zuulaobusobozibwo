import { sendSms } from "./sms";

/** Comma-separated E.164 recipient numbers for admin order alerts. */
export function adminSmsRecipients(): string[] {
  return (process.env.ADMIN_SMS_RECIPIENTS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** UGX integer -> "UGX 30,000". ASCII only, so the SMS stays GSM-7 (1 segment). */
function ugxPlain(n: number): string {
  return "UGX " + n.toLocaleString("en-US");
}

export interface AdminOrderAlert {
  ref: string;
  name: string;
  phone: string;
  provider: string;
  amount: number;
  itemsSummary: string;
}

/**
 * Text the team when a buyer submits an order — the order lands in the admin
 * panel AND pings the admin's phone. Best-effort: this never blocks or fails
 * order creation.
 *
 * HOLD SPOT: no-ops (logs) until ADMIN_SMS_RECIPIENTS and an SMS provider are
 * configured.
 */
export async function notifyAdminNewOrder(o: AdminOrderAlert): Promise<void> {
  const to = adminSmsRecipients();
  if (to.length === 0) {
    console.info(`[notify:admin] (no ADMIN_SMS_RECIPIENTS) new order ${o.ref}`);
    return;
  }
  const providerShort = o.provider.toLowerCase().includes("airtel") ? "Airtel" : "MTN";
  const body =
    `Zuula: NEW order ${o.ref} ${ugxPlain(o.amount)} ${providerShort}. ` +
    `${o.name} ${o.phone}. ${o.itemsSummary}. Open the team panel to confirm.`;
  await Promise.all(
    to.map((t) => sendSms({ to: t, body, template: "admin_new_order", orderId: o.ref })),
  );
}

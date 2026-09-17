import { createHmac, randomBytes } from "node:crypto";

/** Crockford base32 (no I/L/O/U) — unambiguous when read aloud or typed. */
const B32 = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

function base32(bytes: Buffer): string {
  let out = "";
  for (const b of bytes) out += B32[b % 32];
  return out;
}

function slug(productId: string): string {
  const s = (productId || "").replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 8);
  return s || "TICKET";
}

/** Single-use ticket code, e.g. "ZB-KBS2026-4F7K2Q". */
export function makeTicketCode(productId: string): string {
  return `ZB-${slug(productId)}-${base32(randomBytes(6))}`;
}

/**
 * QR payload for the ticket. When TICKET_SIGNING_SECRET is set the code is
 * HMAC-signed so a door scanner can validate it offline; otherwise the payload
 * is just the code. HOLD SPOT: set TICKET_SIGNING_SECRET before door scanning.
 */
export function ticketQrPayload(code: string): string {
  const secret = process.env.TICKET_SIGNING_SECRET;
  if (!secret) return code;
  const sig = createHmac("sha256", secret).update(code).digest("base64url").slice(0, 16);
  return `${code}.${sig}`;
}

export interface IssuedTicket {
  tier: string;
  code: string;
}

function summariseTiers(tickets: IssuedTicket[]): string {
  const counts = new Map<string, number>();
  for (const t of tickets) counts.set(t.tier, (counts.get(t.tier) ?? 0) + 1);
  return [...counts].map(([tier, n]) => `${n} x ${tier}`).join(", ");
}

/**
 * Buyer ticket SMS. GSM-7 safe (ASCII only — plain "x" and "-", no curly
 * quotes/em dashes) so it stays one 160-char segment where possible. Sends one
 * message listing every code if it fits, otherwise one message per ticket
 * (PAYMENT_FLOW.md §7).
 */
export function ticketSmsBodies(ref: string, tickets: IssuedTicket[]): string[] {
  if (tickets.length === 0) return [];
  const codes = tickets.map((t) => t.code).join(", ");
  const combined =
    `Zuula: Payment confirmed, order ${ref}. ${summariseTiers(tickets)}. ` +
    `Code: ${codes}. Show this SMS at the door.`;
  if (combined.length <= 160) return [combined];
  return tickets.map(
    (t) =>
      `Zuula: Payment confirmed, order ${ref}. 1 x ${t.tier}. ` +
      `Code: ${t.code}. Show this SMS at the door.`,
  );
}

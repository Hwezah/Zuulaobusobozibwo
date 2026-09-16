/** Normalise a Ugandan phone number to E.164, e.g. "0772 431 909" -> "+256772431909". */
export function toE164(input: string): string {
  const digits = String(input).replace(/[^0-9]/g, "");
  if (digits.startsWith("256")) return "+" + digits;
  if (digits.startsWith("0")) return "+256" + digits.slice(1);
  if (digits.startsWith("7")) return "+256" + digits;
  return "+" + digits;
}

/** Accepts local 07xxxxxxxx form (matches the prototype's validator). */
export function isValidUgPhone(input: string): boolean {
  return /^0(7\d{8})$/.test(String(input).replace(/[^0-9]/g, ""));
}

/** Human-readable order ref, e.g. "ZB-482913". */
export function makeRef(): string {
  return "ZB-" + String(Date.now()).slice(-6);
}

export interface CheckoutItem {
  productId: string;
  title: string;
  tier?: string;
  unitPrice: number;
  qty: number;
}

export function itemsSummary(items: CheckoutItem[]): string {
  return items.map((i) => `${i.qty} × ${i.title}`).join(", ");
}

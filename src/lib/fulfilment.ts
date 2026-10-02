import { getProductById } from "@/data/products";
import type { Product, ProductType } from "@/lib/types";

/**
 * What happens when the admin confirms an order line. One checkout, one admin
 * panel, one confirm button — the kind of each product decides the follow-up:
 *
 *   ticket   issue a code per seat, text the codes        (event tiers)
 *   digital  text the download link (or a "coming" note)  (eBooks, audio)
 *   physical text a delivery/pickup note                  (paperbacks, merch)
 *   service  text a welcome / group link / next step      (memberships)
 */
export type Fulfilment = "ticket" | "digital" | "physical" | "service";

const BY_TYPE: Record<ProductType, Fulfilment> = {
  "Event ticket": "ticket",
  eBook: "digital",
  Audiobook: "digital",
  Paperback: "physical",
  Membership: "service",
};

export function fulfilmentOf(type: ProductType): Fulfilment {
  return BY_TYPE[type];
}

/** Fulfilment for a stored order line; an unknown/retired product id is a plain service note. */
export function fulfilmentForProductId(productId: string): Fulfilment {
  const p = getProductById(productId);
  return p ? fulfilmentOf(p.type) : "service";
}

export interface OrderLine {
  productId: string;
  title: string;
  qty: number;
}

/** Keep SMS GSM-7 (one 160-char segment where possible): ASCII punctuation only. */
function gsm(s: string): string {
  return s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/×/g, "x");
}

function lineText(line: OrderLine, product: Product | undefined): string {
  const title = product?.title ?? line.title;
  const kind = product ? fulfilmentOf(product.type) : "service";
  if (kind === "digital") {
    return product?.downloadUrl
      ? `${title}: ${product.downloadUrl}`
      : `${title}: we will send your copy to this number on WhatsApp shortly.`;
  }
  // Service/physical notes name themselves, so the title is not repeated (keeps
  // the SMS inside one 160-char segment).
  if (kind === "physical") {
    return product?.fulfilNote ?? `${title}: we will contact you about delivery or pickup.`;
  }
  return product?.fulfilNote ?? `${title}: we will contact you shortly.`;
}

/**
 * Buyer SMS for the non-ticket lines of a confirmed order. One message if it
 * fits a single segment, otherwise one per line (same rule as ticket SMS).
 * Returns [] when the order has no such lines.
 */
export function fulfilmentSmsBodies(ref: string, lines: OrderLine[]): string[] {
  if (lines.length === 0) return [];
  const head = `Zuula: Payment confirmed, order ${ref}.`;
  const texts = lines.map((l) => gsm(lineText(l, getProductById(l.productId))));
  const combined = `${head} ${texts.join(" ")}`;
  if (combined.length <= 160) return [combined];
  return texts.map((t) => `${head} ${t}`);
}

import type { Product } from "@/lib/types";
import { getTicketProducts } from "./events";
import { MEMBERSHIP_TIERS } from "./site";

const HOST = "https://midnightblue-stinkbug-675139.hostingersite.com/wp-content/uploads";

/**
 * Library titles. Covers currently hot-link to the legacy Hostinger site
 * (see README "Known gaps" — self-host + confirm title mapping with client).
 */
export const BOOKS: Product[] = [
  {
    id: "b1",
    title: "Divine Relocation",
    type: "eBook",
    priceVal: 25000,
    cover: "front cover",
    img: `${HOST}/2026/03/front-cover.jpg`,
    desc: "A call to move from where you are to where God has positioned you.",
  },
  {
    id: "b2",
    title: "Omuwendo Gw'obulamu",
    type: "eBook",
    priceVal: 25000,
    cover: "front cover",
    img: `${HOST}/2026/03/Artboard-1-copy-2100-1.jpg`,
    desc: "A reflection, in Runyankore-Rukiga, on the worth and purpose of every life.",
  },
  {
    id: "b3",
    title: "The Generational Family Prayer Altar",
    type: "eBook",
    priceVal: 25000,
    cover: "front cover",
    img: `${HOST}/2026/03/alter-front-cover.jpg`,
    desc: "How to build and keep a prayer altar that carries your family across generations.",
  },
  {
    id: "b4",
    title: "The Value of Life",
    type: "eBook",
    priceVal: 25000,
    cover: "front cover",
    img: `${HOST}/2026/04/Artboard-1-copy-10100-1.jpg`,
    desc: "Discover the worth God placed in your life and how to live it on purpose.",
  },
  // b5–b8: placeholder titles/covers, all UGX 25,000. Replace once real data arrives.
  {
    id: "b5",
    title: "Coming soon",
    type: "eBook",
    priceVal: 25000,
    cover: "front cover",
    desc: "New title coming soon.",
  },
  {
    id: "b6",
    title: "Coming soon",
    type: "eBook",
    priceVal: 25000,
    cover: "front cover",
    desc: "New title coming soon.",
  },
  {
    id: "b7",
    title: "Coming soon",
    type: "eBook",
    priceVal: 25000,
    cover: "front cover",
    desc: "New title coming soon.",
  },
  {
    id: "b8",
    title: "Coming soon",
    type: "eBook",
    priceVal: 25000,
    cover: "front cover",
    desc: "New title coming soon.",
  },
];

export const LIBRARY_FILTERS = ["All", "eBook"] as const;

/** Paid membership tiers become cart products, priced from the tier data. */
export const MEMBERSHIPS: Product[] = MEMBERSHIP_TIERS.flatMap((t) =>
  t.pid && t.priceUgx
    ? [
        {
          id: t.pid,
          title: `${t.name} (1 month)`,
          type: "Membership" as const,
          priceVal: t.priceUgx,
          desc: t.feats[0],
          cover: "membership",
          fulfilNote: t.sms,
        },
      ]
    : [],
);

/** Everything the cart can sell: books, event tickets and paid memberships. */
export const ALL_PRODUCTS: Product[] = [...BOOKS, ...getTicketProducts(), ...MEMBERSHIPS];

export function getProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

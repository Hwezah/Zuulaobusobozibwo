import type { Product } from "@/lib/types";
import { getTicketProducts } from "./events";

const HOST = "https://midnightblue-stinkbug-675139.hostingersite.com/wp-content/uploads";

/**
 * Library titles. Covers currently hot-link to the legacy Hostinger site
 * (see README "Known gaps" — self-host + confirm title mapping with client).
 */
export const BOOKS: Product[] = [
  {
    id: "b1",
    title: "The Seed Within",
    type: "eBook",
    priceVal: 25000,
    cover: "front cover",
    img: `${HOST}/2026/03/front-cover.jpg`,
    desc: "Discover the untapped strength already inside you.",
  },
  {
    id: "b2",
    title: "Kingdom Stewardship",
    type: "eBook",
    priceVal: 20000,
    cover: "front cover",
    img: `${HOST}/2026/03/Artboard-1-copy-2100-1.jpg`,
    desc: "Steward your gifts, time and resources with purpose.",
  },
  {
    id: "b3",
    title: "Return to Essence",
    type: "Paperback",
    priceVal: 45000,
    cover: "front cover",
    img: `${HOST}/2026/03/alter-front-cover.jpg`,
    desc: "A guided journey back to who you were made to be.",
  },
  {
    id: "b4",
    title: "Healing the Soul",
    type: "Audiobook",
    priceVal: 18000,
    cover: "front cover",
    img: `${HOST}/2026/04/Artboard-1-copy-10100-1.jpg`,
    desc: "Practical steps to heal your inner world.",
  },
  {
    id: "b5",
    title: "Purpose & Prosperity",
    type: "Paperback",
    priceVal: 40000,
    cover: "front cover",
    desc: "Align your calling with lasting Kingdom impact.",
  },
  {
    id: "b6",
    title: "Quiet Mornings",
    type: "eBook",
    priceVal: 15000,
    cover: "front cover",
    desc: "31 devotionals to start each day grounded.",
  },
  {
    id: "b7",
    title: "The Leader Within",
    type: "Audiobook",
    priceVal: 22000,
    cover: "front cover",
    desc: "Lead yourself before you lead others.",
  },
  {
    id: "b8",
    title: "Roots & Wings",
    type: "Paperback",
    priceVal: 38000,
    cover: "front cover",
    desc: "Raising the next generation of purpose-driven believers.",
  },
];

export const LIBRARY_FILTERS = ["All", "eBook", "Paperback", "Audiobook"] as const;

/** Books + ticket products, matching the prototype's getProducts(). */
export const ALL_PRODUCTS: Product[] = [...BOOKS, ...getTicketProducts()];

export function getProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

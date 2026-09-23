import type { EventItem, Product } from "@/lib/types";

export const EVENTS: EventItem[] = [
  {
    id: "kbs2026",
    day: "24",
    mon: "OCT",
    monthFull: "October 2026",
    tag: "IN PERSON",
    edition: "Third Edition",
    title: "Kingdom Business Summit 2026",
    subtitle: "Third Edition · with Pastor Joseph Prosper Tumusiime",
    theme: "Not Just Priests — We are Kings Too",
    themeSub: "Rising into the Marketplace Mantle of Revelation 1:6",
    place: "Fidodido, Kampala",
    dateFull: "Saturday, 24th October 2026",
    time: "9:00 AM — 4:00 PM",
    flyer: "/assets/kingdom-business-summit-2026-flyer.png",
    priceLabel: "from UGX 10K",
    cur: "UGX",
    blurb:
      "Don't miss life testimonies and business insights from prominent businessmen and women. A full day of Kingdom business teaching, marketplace strategy and real-world testimony — equipping believers to take dominion in business, not just in ministry.",
    speakers: [
      {
        name: "Bishop Isaac Sebaduka",
        role: "Victory Life Church Nansana · Director, Daddy's Bakery",
      },
      {
        name: "Pastor Wilson Bugembe",
        role: "Worship House · King in Gospel Entertainment Industry",
      },
      {
        name: "Pastor Dr. Robinson Masembe",
        role: "Maya Christian Church · Director, MASROB Events",
      },
      {
        name: "Pastor Brian Kesi Musoke",
        role: "Emissary Ministries · Director, Butale Printing Press",
      },
    ],
    highlights: [
      "Life testimonies from prominent businessmen and women",
      "Practical marketplace and business insights",
      "Kingdom teaching on Revelation 1:6",
      "Networking with Kingdom entrepreneurs",
    ],
    enquiries: ["0777 667 080", "0757 217 681"],
    tiers: [
      {
        pid: "t-kbs-ord",
        name: "Ordinary",
        priceLabel: "UGX 10,000",
        val: 10000,
        note: "General admission seating",
      },
      {
        pid: "t-kbs-vip",
        name: "VIP",
        priceLabel: "UGX 30,000",
        val: 30000,
        note: "Reserved front seating + refreshments",
      },
      {
        pid: "t-kbs-table",
        name: "A Table",
        priceLabel: "UGX 500,000",
        val: 500000,
        note: "Full table for your team or business",
      },
    ],
  },
];

export function getEvent(id: string): EventItem | undefined {
  return EVENTS.find((e) => e.id === id);
}

/** One purchasable Product per ticket tier across all events. */
export function getTicketProducts(): Product[] {
  const out: Product[] = [];
  for (const e of EVENTS) {
    for (const t of e.tiers) {
      out.push({
        id: t.pid,
        title: `${e.title} — ${t.name}`,
        type: "Event ticket",
        priceVal: t.val,
        cover: "ticket",
        desc: `${e.dateFull} · ${e.place}`,
        eventId: e.id,
      });
    }
  }
  return out;
}

/** Filter-chip labels for the events page. */
export const EVENT_FILTERS = ["All events", "In person", "Virtual"] as const;
export const EVENT_FILTER_TAG: Record<string, string | null> = {
  "All events": null,
  "In person": "IN PERSON",
  Virtual: "VIRTUAL",
};

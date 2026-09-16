import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { EventItem } from "@/lib/types";
import { Button } from "@/components/ui/button";

/** Compact vertical event card used on the home "Events & tickets" strip. */
export function EventPreviewCard({ event }: { event: EventItem }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] border border-border bg-card-2 shadow-[0_6px_22px_rgba(60,30,80,.06)]">
      <Link href={`/events/${event.id}`} className="relative block aspect-[3/4] overflow-hidden bg-well">
        <Image
          src={event.flyer}
          alt={`${event.title} flyer`}
          width={864}
          height={1219}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-panel/85 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-pink-hover backdrop-blur">
          {event.tag}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="text-[12px] font-bold uppercase tracking-wide text-pink-hover">
          {event.mon} {event.day} · 2026
        </div>
        <h3 className="mt-1.5 font-display text-[18px] font-bold leading-tight text-text">
          {event.title}
        </h3>
        <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-muted">
          <MapPin className="h-4 w-4 text-pink" /> {event.place}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="font-display text-[15px] font-extrabold text-text">
            {event.priceLabel}
          </span>
          <Button asChild shape="pill" size="sm">
            <Link href={`/events/${event.id}`}>Get tickets</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Clock, ArrowRight } from "lucide-react";
import type { EventItem } from "@/lib/types";
import { Button } from "@/components/ui/button";

/** Prominent, flyer-led event card used on the home page. */
export function FeaturedEventCard({ event }: { event: EventItem }) {
  return (
    <div
      data-grid2
      className="grid items-stretch gap-8 overflow-hidden rounded-[24px] border border-border bg-card-2 p-4 shadow-[0_24px_70px_rgba(60,30,80,.14)] sm:p-6 lg:grid-cols-[minmax(0,420px)_1fr]"
    >
      <Link
        href={`/events/${event.id}`}
        className="relative block overflow-hidden rounded-[18px] bg-well"
      >
        <Image
          src={event.flyer}
          alt={`${event.title} flyer`}
          width={864}
          height={1219}
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="flex flex-col justify-center gap-5 py-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-accent-grad px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            {event.tag}
          </span>
          <span className="rounded-full border border-border bg-chip px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-pink-hover">
            {event.priceLabel}
          </span>
        </div>

        <div>
          <h3 className="font-display text-[clamp(24px,3.4vw,34px)] font-extrabold leading-[1.1] text-text">
            {event.title}
          </h3>
          <p className="mt-2 text-[15px] text-muted">{event.subtitle}</p>
        </div>

        <p className="text-[15px] font-semibold text-text-3">
          “{event.theme}”
        </p>

        <ul className="flex flex-col gap-2.5 text-[14px] text-text-3">
          <li className="flex items-center gap-2.5">
            <CalendarDays className="h-[18px] w-[18px] text-pink" /> {event.dateFull}
          </li>
          <li className="flex items-center gap-2.5">
            <Clock className="h-[18px] w-[18px] text-pink" /> {event.time}
          </li>
          <li className="flex items-center gap-2.5">
            <MapPin className="h-[18px] w-[18px] text-pink" /> {event.place}
          </li>
        </ul>

        <div className="flex flex-wrap gap-3">
          <Button asChild shape="pill">
            <Link href={`/events/${event.id}`}>
              Get tickets <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost" shape="pill">
            <Link href={`/events/${event.id}`}>View details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

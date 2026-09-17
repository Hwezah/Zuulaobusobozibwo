import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import type { EventItem } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function EventRow({ event }: { event: EventItem }) {
  return (
    <div
      data-eventrow
      className="grid grid-cols-[64px_1fr] items-center gap-5 rounded-[20px] border border-border bg-card-2 px-6 py-8 shadow-[0_6px_22px_rgba(60,30,80,.06)] sm:grid-cols-[72px_1fr_auto] sm:gap-6 sm:px-8 sm:py-10 max-[560px]:grid-cols-1 max-[560px]:gap-3 max-[560px]:px-5 max-[560px]:py-6 max-[560px]:text-center"
    >
      <div
        data-ev-date
        className="flex flex-col items-center leading-none max-[560px]:order-2"
      >
        <span className="font-display text-[30px] font-extrabold text-pink">{event.day}</span>
        <span className="mt-1 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-2">
          {event.mon}
        </span>
      </div>

      <div data-ev-content className="min-w-0 max-[560px]:order-1">
        <div className="mb-2 flex items-center gap-2 max-[560px]:justify-center">
          <span className="rounded-full border border-[rgba(255,45,149,.4)] bg-[rgba(255,45,149,.12)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-pink-hover">
            {event.tag}
          </span>
        </div>
        <h3 className="font-display text-[20px] font-bold leading-tight text-text">
          {event.title}
        </h3>
        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13.5px] text-muted max-[560px]:justify-center">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-pink" /> {event.place}
          </span>
          <span aria-hidden className="text-muted-3">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-pink" /> {event.time}
          </span>
        </p>
      </div>

      <div
        data-ev-btns
        className="col-span-full flex gap-2 sm:col-span-1 sm:w-auto max-[560px]:order-3 max-[560px]:w-full"
      >
        <Button asChild variant="subtle" shape="pill" className="flex-1 sm:flex-none">
          <Link href={`/events/${event.id}`}>Details</Link>
        </Button>
        <Button asChild shape="pill" className="flex-1 sm:flex-none">
          <Link href={`/events/${event.id}`}>Get tickets</Link>
        </Button>
      </div>
    </div>
  );
}

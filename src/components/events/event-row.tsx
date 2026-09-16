"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { EventItem } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { TicketDialog } from "./ticket-dialog";

export function EventRow({ event }: { event: EventItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      data-eventrow
      className="grid grid-cols-[64px_1fr] items-center gap-4 rounded-[18px] border border-border bg-card-2 p-5 shadow-[0_6px_22px_rgba(60,30,80,.06)] sm:grid-cols-[80px_1fr_auto] sm:gap-6 max-[560px]:grid-cols-1 max-[560px]:text-center"
    >
      <div
        data-ev-date
        className="flex flex-col items-center justify-center rounded-[14px] border border-border bg-well py-3 max-[560px]:mx-auto max-[560px]:w-24"
      >
        <span className="font-display text-[22px] font-extrabold leading-none text-text">
          {event.day}
        </span>
        <span className="mt-1 text-[11px] font-bold uppercase tracking-wide text-pink-hover">
          {event.mon}
        </span>
      </div>

      <div data-ev-content className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 max-[560px]:justify-center">
          <span className="rounded-full bg-accent-grad px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            {event.tag}
          </span>
          <span className="text-[12px] font-semibold text-pink-hover">{event.priceLabel}</span>
        </div>
        <h3 className="mt-2 font-display text-[19px] font-bold leading-tight text-text">
          {event.title}
        </h3>
        <p className="mt-1 text-[13.5px] text-muted">{event.subtitle}</p>
        <p className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] text-text-3 max-[560px]:justify-center">
          <MapPin className="h-4 w-4 text-pink" /> {event.place}
        </p>
      </div>

      <div
        data-ev-btns
        className="col-span-full flex gap-2 sm:col-span-1 sm:w-auto max-[560px]:w-full"
      >
        <Button asChild variant="ghost" shape="pill" size="sm" className="flex-1 sm:flex-none">
          <Link href={`/events/${event.id}`}>Details</Link>
        </Button>
        <Button shape="pill" size="sm" className="flex-1 sm:flex-none" onClick={() => setOpen(true)}>
          Get tickets
        </Button>
      </div>

      <TicketDialog event={event} open={open} onOpenChange={setOpen} />
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin, Check, Phone } from "lucide-react";
import { EVENTS, getEvent } from "@/data/events";
import { EventTiers } from "@/components/events/event-tiers";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = getEvent(id);
  if (!event) return { title: "Event not found" };
  return {
    title: event.title,
    description: event.blurb,
    openGraph: { title: event.title, images: [event.flyer] },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEvent(id);
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-muted transition-colors hover:text-text"
      >
        <ArrowLeft className="h-4 w-4" /> All events
      </Link>

      <div
        data-detgrid
        className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr]"
      >
        {/* Poster */}
        <div data-postercol className="lg:h-full">
          <div
            data-poster
            className="overflow-hidden rounded-[22px] border border-border bg-well shadow-[0_24px_70px_rgba(60,30,80,.2)] lg:sticky lg:top-24"
          >
            <Image
              src={event.flyer}
              alt={`${event.title} flyer`}
              width={864}
              height={1219}
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-10">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-accent-grad px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                {event.tag}
              </span>
              <span className="rounded-full border border-border bg-chip px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-pink-hover">
                {event.priceLabel}
              </span>
            </div>
            <h1 className="mt-4 font-display text-[clamp(30px,4.6vw,48px)] font-extrabold leading-[1.05] tracking-[-0.8px] text-text">
              {event.title}
            </h1>
            <p className="mt-3 text-[16px] text-muted">{event.subtitle}</p>
          </header>

          {/* Theme */}
          <div className="rounded-[20px] border border-[rgba(255,45,149,.3)] bg-[linear-gradient(135deg,rgba(255,45,149,.1),rgba(139,47,214,.08))] p-6">
            <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-pink-hover">
              Theme
            </span>
            <p className="mt-2 font-display text-[22px] font-extrabold leading-tight text-text">
              “{event.theme}”
            </p>
            <p className="mt-1 text-[14px] italic text-muted">{event.themeSub}</p>
          </div>

          {/* Facts */}
          <div data-detfacts className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: CalendarDays, label: "Date", value: event.dateFull },
              { icon: Clock, label: "Time", value: event.time },
              { icon: MapPin, label: "Venue", value: event.place },
            ].map((f) => (
              <div key={f.label} className="rounded-[16px] border border-border bg-card-2 p-4">
                <f.icon className="h-5 w-5 text-pink" />
                <div className="mt-2 text-[12px] uppercase tracking-wide text-muted-2">
                  {f.label}
                </div>
                <div className="mt-0.5 text-[14px] font-semibold text-text">{f.value}</div>
              </div>
            ))}
          </div>

          <p className="text-[16px] leading-relaxed text-muted">{event.blurb}</p>

          {/* Speakers */}
          <div>
            <h2 className="font-display text-[22px] font-extrabold text-text">Speakers</h2>
            <div data-detspk className="mt-5 grid gap-4 sm:grid-cols-2">
              {event.speakers.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-4 rounded-[16px] border border-border bg-card-2 p-4"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent-grad font-display text-[17px] font-bold text-white">
                    {s.name.split(" ").filter(Boolean).slice(-1)[0]?.[0] ?? s.name[0]}
                  </span>
                  <div className="min-w-0">
                    <div className="font-display text-[15px] font-bold leading-tight text-text">
                      {s.name}
                    </div>
                    <div className="mt-0.5 text-[13px] text-muted">{s.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h2 className="font-display text-[22px] font-extrabold text-text">Highlights</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {event.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-[15px] text-text-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-pink" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tickets */}
          <div id="tickets">
            <h2 className="font-display text-[22px] font-extrabold text-text">Ticket tiers</h2>
            <p className="mt-1 text-[14px] text-muted">
              All prices in UGX. Payment is by Mobile Money at checkout.
            </p>
            <div className="mt-5">
              <EventTiers event={event} />
            </div>
          </div>

          {/* Enquiries */}
          <div className="flex flex-wrap items-center gap-3 rounded-[16px] border border-border bg-card p-5">
            <Phone className="h-5 w-5 text-pink" />
            <span className="text-[14px] font-semibold text-text-3">Enquiries:</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[14px] text-muted">
              {event.enquiries.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

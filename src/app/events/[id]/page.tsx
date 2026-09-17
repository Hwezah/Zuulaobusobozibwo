import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
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

      <div data-detgrid className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,420px)_1fr]">
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
            <span className="inline-flex items-center rounded-full border border-[rgba(255,45,149,.4)] bg-[rgba(255,45,149,.1)] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-pink-hover">
              {event.edition ? `${event.edition} · ` : ""}
              {event.tag}
            </span>
            <h1 className="mt-4 font-display text-[clamp(30px,4.6vw,48px)] font-extrabold leading-[1.05] tracking-[-0.8px] text-text">
              {event.title}
            </h1>
            <p className="mt-3 text-[16px] text-muted">{event.subtitle}</p>
          </header>

          {/* Theme */}
          <div className="rounded-[20px] border border-[rgba(139,47,214,.3)] bg-[linear-gradient(135deg,rgba(139,47,214,.14),rgba(255,45,149,.06))] p-6">
            <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-pink-hover">
              Theme
            </span>
            <p className="mt-2 font-display text-[22px] font-extrabold leading-tight text-text">
              {event.theme}
            </p>
            <p className="mt-1 text-[14px] italic text-muted">{event.themeSub}</p>
          </div>

          {/* Facts */}
          <div data-detfacts className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Date", value: event.dateFull },
              { label: "Time", value: event.time },
              { label: "Venue", value: event.place },
            ].map((f) => (
              <div key={f.label} className="rounded-[16px] border border-border bg-card-2 p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-2">
                  {f.label}
                </div>
                <div className="mt-1.5 text-[15px] font-bold text-text">{f.value}</div>
              </div>
            ))}
          </div>

          <p className="text-[16px] leading-relaxed text-muted">{event.blurb}</p>

          {/* What you'll get */}
          <div>
            <h2 className="font-display text-[22px] font-extrabold text-text">What you&apos;ll get</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {event.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-[15px] text-text-3">
                  <Star className="h-[16px] w-[16px] shrink-0 fill-[var(--pink)] text-pink" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Speakers */}
          <div>
            <h2 className="font-display text-[22px] font-extrabold text-text">Speakers</h2>
            <div data-detspk className="mt-5 grid gap-4 sm:grid-cols-2">
              {event.speakers.map((s) => (
                <div key={s.name} className="rounded-[16px] border border-border bg-card-2 p-5">
                  <div className="font-display text-[16px] font-bold leading-tight text-text">
                    {s.name}
                  </div>
                  <div className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{s.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tickets */}
          <div id="tickets">
            <h2 className="font-display text-[22px] font-extrabold text-text">Tickets on sale</h2>
            <p className="mt-1 text-[14px] text-muted">
              Pick your tier, then pay securely with MTN or Airtel Mobile Money at checkout.
            </p>
            <div className="mt-5">
              <EventTiers event={event} />
            </div>
          </div>

          {/* Enquiries */}
          <p className="text-center text-[13.5px] text-muted-2">
            Ticket enquiries: {event.enquiries.join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}

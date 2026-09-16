import type { Metadata } from "next";
import { Section } from "@/components/common";
import { EventsView } from "@/components/events/events-view";
import { SpeakerCTA } from "@/components/speaker-cta";

export const metadata: Metadata = {
  title: "Events & Tickets",
  description:
    "Upcoming Zuula Obusobozibwo events including the Kingdom Business Summit 2026.",
};

export default function EventsPage() {
  return (
    <>
      <Section className="pb-0 text-center">
        <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-pink-hover">
          Events &amp; tickets
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl font-display text-[clamp(40px,6vw,64px)] font-extrabold leading-[1.04] tracking-[-1px] text-text">
          Experience it live
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
          Conferences, masterclasses and virtual gatherings. Reserve your seat
          before they sell out.
        </p>
      </Section>

      <Section>
        <EventsView />
      </Section>

      <Section className="pt-0">
        <SpeakerCTA />
      </Section>
    </>
  );
}

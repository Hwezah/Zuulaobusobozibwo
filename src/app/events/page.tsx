import type { Metadata } from "next";
import { Section } from "@/components/common";
import { EventsView } from "@/components/events/events-view";

export const metadata: Metadata = {
  title: "Events & Tickets",
  description:
    "Upcoming Zuula Obusobozibwo events including the Kingdom Business Summit 2026.",
};

export default function EventsPage() {
  return (
    <Section>
      <EventsView />
    </Section>
  );
}

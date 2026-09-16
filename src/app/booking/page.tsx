import type { Metadata } from "next";
import { Section, SectionHeading, Stat } from "@/components/common";
import { IconFeatureCard } from "@/components/cards/icon-card";
import { BookingForm } from "@/components/booking/booking-form";
import { BOOKING_TYPES, BOOKING_STATS } from "@/data/site";

export const metadata: Metadata = {
  title: "Book Joseph to speak",
  description:
    "Invite Joseph Prosper Tumusiime to speak at your conference, church or corporate event.",
};

export default function BookingPage() {
  return (
    <>
      <Section>
        <SectionHeading
          eyebrow="Speaking"
          title="Book Joseph to speak"
          subtitle="High-energy, biblically-grounded talks on purpose, healing and Kingdom leadership — shaped around your audience."
        />
        <div
          data-hero-stats
          className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {BOOKING_STATS.map((s) => (
            <Stat key={s.label} num={s.num} label={s.label} />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BOOKING_TYPES.map((t) => (
            <IconFeatureCard key={t.title} data={t} />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <BookingForm />
      </Section>
    </>
  );
}

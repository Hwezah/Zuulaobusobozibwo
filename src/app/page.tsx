import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { FounderSection } from "@/components/home/founder-section";
import { FlagshipBand } from "@/components/home/flagship-band";
import { PodcastBand } from "@/components/home/podcast-band";
import { NewsletterCTA } from "@/components/home/newsletter-cta";
import { Section, SectionHeading } from "@/components/common";
import { Scroller } from "@/components/scroller";
import { BookCard } from "@/components/cards/book-card";
import { EventPreviewCard } from "@/components/cards/event-preview-card";
import { IconFeatureCard } from "@/components/cards/icon-card";
import { TierCard } from "@/components/cards/tier-card";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { EVENTS } from "@/data/events";
import { BOOKS } from "@/data/products";
import { SERVICES, MEMBERSHIP_TIERS, TESTIMONIALS } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Services */}
      <Section>
        <SectionHeading eyebrow="Everything in one place" title="Ways to grow with Joseph" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <IconFeatureCard key={s.title} data={s} />
          ))}
        </div>
      </Section>

      {/* Founder */}
      <Section className="pt-0">
        <FounderSection />
      </Section>

      {/* Flagship mentorship */}
      <Section className="pt-0">
        <FlagshipBand />
      </Section>

      {/* Events */}
      <Section className="pt-0">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-pink-hover">
              Upcoming
            </span>
            <h2 className="mt-2 font-display text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.5px] text-text">
              Events &amp; tickets
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-pink-hover"
          >
            View full calendar <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((e) => (
            <EventPreviewCard key={e.id} event={e} />
          ))}
        </div>
      </Section>

      {/* Library */}
      <Section className="pt-0">
        <SectionHeading eyebrow="Library" title="Books, audio & podcast" />
        <Scroller peek className="mt-12" cols="repeat(4,minmax(0,1fr))">
          {BOOKS.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </Scroller>
      </Section>

      {/* Podcast */}
      <Section className="pt-0">
        <PodcastBand />
      </Section>

      {/* Testimonials */}
      <Section className="pt-0">
        <SectionHeading eyebrow="Transformed lives" title="What people are saying" />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </Section>

      {/* Membership */}
      <Section className="pt-0">
        <SectionHeading eyebrow="Community" title="Join the membership" />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {MEMBERSHIP_TIERS.map((t) => (
            <TierCard key={t.name} tier={t} />
          ))}
        </div>
      </Section>

      {/* Newsletter */}
      <Section className="pt-0">
        <NewsletterCTA />
      </Section>
    </>
  );
}

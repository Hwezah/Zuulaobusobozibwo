import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { TelegramCTA } from "@/components/home/telegram-cta";
import { Section, SectionHeading } from "@/components/common";
import { Scroller } from "@/components/scroller";
import { Button } from "@/components/ui/button";
import { FeaturedEventCard } from "@/components/cards/event-card";
import { BookCard } from "@/components/cards/book-card";
import { ArticleCard } from "@/components/cards/article-card";
import { IconFeatureCard } from "@/components/cards/icon-card";
import { TierCard } from "@/components/cards/tier-card";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { EVENTS } from "@/data/events";
import { BOOKS } from "@/data/products";
import { ARTICLES } from "@/data/articles";
import { SERVICES, MEMBERSHIP_TIERS, TESTIMONIALS } from "@/data/site";

export default function HomePage() {
  const event = EVENTS[0];

  return (
    <>
      <Hero />

      {/* Services */}
      <Section>
        <SectionHeading
          eyebrow="What we do"
          title="Everything you need to grow in purpose"
          subtitle="Teaching, mentorship, events and resources — one ministry equipping believers to take dominion in the marketplace."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <IconFeatureCard key={s.title} data={s} />
          ))}
        </div>
      </Section>

      {/* Featured event */}
      {event && (
        <Section>
          <SectionHeading
            eyebrow="Next event"
            title="Kingdom Business Summit 2026"
            subtitle="A full day of Kingdom business teaching, marketplace strategy and real-world testimony."
          />
          <div className="mt-12">
            <FeaturedEventCard event={event} />
          </div>
        </Section>
      )}

      {/* Library */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            align="left"
            eyebrow="Library"
            title="Books, eBooks & audio"
            subtitle="A curated library to deepen your faith and unlock potential."
          />
          <Button asChild variant="ghost" shape="pill" className="max-sm:hidden">
            <Link href="/library">
              Browse all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Scroller peek className="mt-10" cols="repeat(4,minmax(0,1fr))">
          {BOOKS.slice(0, 4).map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </Scroller>
      </Section>

      {/* Articles */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            align="left"
            eyebrow="Insights"
            title="Kingdom articles"
            subtitle="Biblically-grounded reflections on purpose, stewardship and leadership."
          />
          <Button asChild variant="ghost" shape="pill" className="max-sm:hidden">
            <Link href="/articles">
              All articles <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Scroller peek className="mt-10" cols="repeat(3,minmax(0,1fr))">
          {ARTICLES.slice(0, 3).map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </Scroller>
      </Section>

      {/* Mentorship teaser */}
      <Section>
        <SectionHeading
          eyebrow="Membership"
          title="Join the circle"
          subtitle="Choose the level of support that fits your journey — from free resources to deep 1:1 work."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {MEMBERSHIP_TIERS.map((t) => (
            <TierCard key={t.name} tier={t} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="link">
            <Link href="/mentorship">
              See full mentorship packages <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeading eyebrow="Stories" title="Lives being transformed" />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </Section>

      {/* Telegram */}
      <Section>
        <TelegramCTA />
      </Section>
    </>
  );
}

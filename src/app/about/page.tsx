import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading, Stat } from "@/components/common";
import { IconFeatureCard } from "@/components/cards/icon-card";
import { Button } from "@/components/ui/button";
import { ABOUT_VALUES, ABOUT_STATS } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Zuula Obusobozibwo — a Kingdom-business ministry awakening purpose and potential across Uganda and beyond.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section className="text-center">
        <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-pink-hover">
          About us
        </span>
        <h1 className="mx-auto mt-5 max-w-4xl font-display text-[clamp(38px,6vw,64px)] font-extrabold leading-[1.04] tracking-[-1px] text-text">
          Awakening the <span className="text-gradient">potential</span> God
          placed within
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
          Zuula Obusobozibwo means to discover ability. We equip believers to
          rise into the marketplace mantle — not just priests, but kings too.
        </p>
      </Section>

      {/* Story */}
      <Section className="pt-0">
        <div className="mx-auto max-w-3xl space-y-5 text-center text-[16px] leading-relaxed text-muted">
          <p>
            Led by Pastor Joseph Prosper Tumusiime, Zuula Obusobozibwo blends
            biblical teaching with practical marketplace strategy — through live
            events, mentorship, a growing library and a supportive community.
          </p>
          <p>
            Our conviction is simple: every believer carries untapped strength,
            and God calls us to steward it for Kingdom impact in business,
            leadership and everyday life.
          </p>
        </div>
      </Section>

      {/* Values */}
      <Section className="pt-0">
        <SectionHeading
          eyebrow="What we stand for"
          title="The values that shape us"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_VALUES.map((v) => (
            <IconFeatureCard key={v.title} data={v} />
          ))}
        </div>
      </Section>

      {/* Impact */}
      <Section className="pt-0">
        <SectionHeading eyebrow="Our impact" title="The story so far" />
        <div className="mt-12 rounded-[20px] border border-border bg-card-2 p-8 shadow-[0_6px_22px_rgba(60,30,80,.06)] sm:p-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_STATS.map((s) => (
              <Stat key={s.label} num={s.num} label={s.label} />
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="pt-0">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.5px] text-text">
            Walk with us
          </h2>
          <p className="max-w-xl text-[16px] leading-relaxed text-muted">
            Wherever you are on the journey, there is a next step — begin with
            mentorship, or simply reach out and say hello.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button asChild shape="pill" size="lg">
              <Link href="/mentorship">
                Start mentorship <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" shape="pill" size="lg">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

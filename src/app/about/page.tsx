import type { Metadata } from "next";
import Link from "next/link";
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
      <Section>
        <SectionHeading
          eyebrow="About us"
          title="Awakening the potential God placed within"
          subtitle="Zuula Obusobozibwo means to discover ability. We equip believers to rise into the marketplace mantle — not just priests, but kings too."
        />
        <div className="mx-auto mt-10 max-w-3xl space-y-5 text-center text-[16px] leading-relaxed text-muted">
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

      <Section className="pt-0">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_VALUES.map((v) => (
            <IconFeatureCard key={v.title} data={v} />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-[22px] border border-border bg-card-2 p-8 sm:p-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_STATS.map((s) => (
              <Stat key={s.label} num={s.num} label={s.label} />
            ))}
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-[26px] font-extrabold text-text">
            Walk with us
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild shape="pill">
              <Link href="/mentorship">Start mentorship</Link>
            </Button>
            <Button asChild variant="ghost" shape="pill">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

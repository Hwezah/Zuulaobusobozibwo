import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/common";
import { TierCard } from "@/components/cards/tier-card";
import { TelegramCommunity } from "@/components/mentorship/telegram-community";
import { Button } from "@/components/ui/button";
import { PACKAGES, MENTORSHIP_STEPS, FAQS, MENTOR_HERO } from "@/data/site";

export const metadata: Metadata = {
  title: "Mentorship",
  description:
    "1:1 mentorship and coaching to discover your gifts, heal your inner world and step into purpose.",
};

export default function MentorshipPage() {
  return (
    <>
      {/* Hero */}
      <Section className="text-center">
        <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-pink-hover">
          {MENTOR_HERO.eyebrow}
        </span>
        <h1 className="mx-auto mt-5 max-w-4xl font-display text-[clamp(38px,6vw,64px)] font-extrabold leading-[1.04] tracking-[-1px] text-text">
          {MENTOR_HERO.headA}
          <span className="text-gradient">{MENTOR_HERO.headB}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
          {MENTOR_HERO.sub}
        </p>
      </Section>

      {/* Packages */}
      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((t) => (
            <TierCard key={t.name} tier={t} />
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section className="pt-0">
        <h2 className="text-center font-display text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.5px] text-text">
          How mentorship works
        </h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {MENTORSHIP_STEPS.map((s) => (
            <div key={s.n} className="flex flex-col items-center text-center">
              <span className="grid h-14 w-14 place-items-center rounded-[16px] bg-accent-grad font-display text-[20px] font-extrabold text-white shadow-[0_10px_24px_rgba(255,45,149,.3)]">
                {s.n}
              </span>
              <h3 className="mt-4 font-display text-[17px] font-bold text-text">{s.title}</h3>
              <p className="mt-1.5 max-w-[220px] text-[14px] leading-relaxed text-muted">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Telegram community */}
      <Section className="pt-0">
        <TelegramCommunity />
      </Section>

      {/* FAQ */}
      <Section className="pt-0">
        <h2 className="text-center font-display text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.5px] text-text">
          Frequently asked
        </h2>
        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-4">
          {FAQS.map((f) => (
            <div key={f.q} className="rounded-[16px] border border-border bg-card-2 p-6">
              <h3 className="font-display text-[16px] font-bold text-pink-hover">{f.q}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild shape="pill" size="lg">
            <Link href="/booking">
              Apply for mentorship <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

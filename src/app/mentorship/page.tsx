import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/common";
import { TierCard } from "@/components/cards/tier-card";
import { TelegramCTA } from "@/components/home/telegram-cta";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { PACKAGES, MENTORSHIP_STEPS, FAQS, MENTOR_PERKS } from "@/data/site";

export const metadata: Metadata = {
  title: "Mentorship",
  description:
    "1:1 mentorship and coaching to discover your gifts, heal your inner world and step into purpose.",
};

export default function MentorshipPage() {
  return (
    <>
      <Section>
        <SectionHeading
          eyebrow="1:1 Mentorship"
          title="Personal coaching for your purpose"
          subtitle="Work directly with Joseph Prosper to discover your gifts, heal your inner world and build a life of Kingdom impact."
        />
        <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-3">
          {MENTOR_PERKS.map((p) => (
            <li key={p} className="inline-flex items-center gap-2 text-[14px] text-text-3">
              <Check className="h-[18px] w-[18px] text-pink" /> {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((t) => (
            <TierCard key={t.name} tier={t} />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="How it works" title="Your journey, step by step" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MENTORSHIP_STEPS.map((s) => (
            <div key={s.n} className="rounded-[18px] border border-border bg-card-2 p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-accent-grad font-display text-[17px] font-bold text-white">
                {s.n}
              </span>
              <h3 className="mt-4 font-display text-[17px] font-bold text-text">{s.title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading eyebrow="Questions" title="Frequently asked" />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <Section className="pt-0">
        <TelegramCTA />
      </Section>
    </>
  );
}

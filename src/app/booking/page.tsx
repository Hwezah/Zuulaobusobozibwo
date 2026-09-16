import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Section } from "@/components/common";
import { BookingForm } from "@/components/booking/booking-form";
import {
  BOOKING_HERO,
  BOOKING_STATS,
  BOOKING_EXPECT,
  BOOKING_TESTIMONIAL,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Book Joseph to speak",
  description:
    "Invite Joseph Prosper Tumusiime to speak at your conference, church or corporate event.",
};

export default function BookingPage() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,480px)]">
        {/* Left: pitch */}
        <div>
          <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-pink-hover">
            {BOOKING_HERO.eyebrow}
          </span>
          <h1 className="mt-4 font-display text-[clamp(40px,5.5vw,60px)] font-extrabold leading-[1.02] tracking-[-1px] text-text">
            {BOOKING_HERO.headA}
            <span className="text-gradient">{BOOKING_HERO.headB}</span>
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
            {BOOKING_HERO.sub}
          </p>

          <hr className="my-8 border-t border-border" />

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {BOOKING_STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-[28px] font-extrabold text-text">{s.num}</div>
                <div className="mt-1 text-[13px] text-muted">{s.label}</div>
              </div>
            ))}
          </div>

          <hr className="my-8 border-t border-border" />

          <div>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.16em] text-muted-2">
              {BOOKING_HERO.expectHeading}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {BOOKING_EXPECT.map((e) => (
                <li key={e} className="flex items-center gap-3 text-[15px] text-text-3">
                  <Star className="h-[16px] w-[16px] shrink-0 fill-[var(--pink)] text-pink" />
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <blockquote className="mt-8 rounded-[20px] border border-[rgba(139,47,214,.3)] bg-[linear-gradient(135deg,rgba(139,47,214,.12),rgba(255,45,149,.06))] p-6">
            <div className="flex gap-1" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[var(--pink)] text-pink" />
              ))}
            </div>
            <p className="mt-3 font-serif text-[16px] italic leading-relaxed text-text-2">
              “{BOOKING_TESTIMONIAL.quote}”
            </p>
            <p className="mt-3 text-[14px] text-muted">{BOOKING_TESTIMONIAL.author}</p>
          </blockquote>
        </div>

        {/* Right: form */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <BookingForm />
        </div>
      </div>
    </Section>
  );
}

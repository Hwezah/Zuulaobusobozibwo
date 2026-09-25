"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROT_WORDS, STATS, HERO, TOPIC_STRIP } from "@/data/site";

function useTyping(words: string[]) {
  const [text, setText] = useState("");
  const state = useRef({ wordIdx: 0, typed: "", deleting: false });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function tick() {
      const s = state.current;
      const full = words[s.wordIdx];
      let delay = 90;
      if (!s.deleting) {
        s.typed = full.slice(0, s.typed.length + 1);
        if (s.typed === full) {
          delay = 1500;
          s.deleting = true;
        }
      } else {
        s.typed = full.slice(0, Math.max(0, s.typed.length - 1));
        delay = 45;
        if (s.typed === "") {
          s.deleting = false;
          s.wordIdx = (s.wordIdx + 1) % words.length;
          delay = 250;
        }
      }
      setText(s.typed);
      timer.current = setTimeout(tick, delay);
    }
    timer.current = setTimeout(tick, 300);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [words]);

  return text;
}

export function Hero() {
  const rot = useTyping(ROT_WORDS);

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="hide-in-light pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(255,45,149,.28)", animation: "glow 6s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="hide-in-light pointer-events-none absolute right-0 top-40 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "rgba(139,47,214,.3)", animation: "glow 7s ease-in-out infinite" }}
      />

      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div data-grid2 className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* left: copy */}
          <div className="max-[560px]:text-center">
            <span
              data-hero-eyebrow
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-text-3 max-[560px]:justify-center"
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-pink" />
              {HERO.eyebrowPrefix}{" "}
              <span className="text-pink-hover">
                {rot}
                <span
                  aria-hidden
                  className="ml-0.5 inline-block w-[2px] bg-pink align-middle"
                  style={{ height: "1em", animation: "caret 1s step-end infinite" }}
                />
              </span>
            </span>

            <h1 className="mt-5 font-display text-[clamp(40px,6vw,68px)] font-extrabold leading-[1.03] tracking-[-1.5px] text-text">
              {HERO.headA}
              <span className="text-gradient">{HERO.headB}</span>
            </h1>

            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted max-[560px]:mx-auto">
              {HERO.sub}
            </p>

            <div
              data-cta-group
              className="mt-8 flex flex-wrap gap-3 max-[560px]:justify-center"
            >
              <Button asChild shape="pill" size="lg" data-cta>
                <Link href="/mentorship">
                  Join Mentorship <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" shape="pill" size="lg" data-cta>
                <Link href="/events/kbs2026">Get Event Tickets</Link>
              </Button>
            </div>

            <div
              data-hero-stats
              className="mt-12 flex flex-wrap gap-x-12 gap-y-6 max-[560px]:justify-center"
            >
              {STATS.map((s) => (
                <div key={s.label} className="text-left max-[560px]:text-center">
                  <div className="font-display text-[28px] font-extrabold text-text">{s.num}</div>
                  <div className="mt-1 text-[13px] text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* right: portrait — framed photo, shown in full (no crop) */}
          <div className="relative mx-auto w-full max-w-[440px] lg:mx-0 lg:ml-auto">
            <div className="overflow-hidden rounded-[24px] border border-border shadow-[0_24px_70px_rgba(60,30,80,.25)]">
              <Image
                src="/assets/joseph-hero.webp"
                alt="Tumusiime Joseph Prosper"
                width={1024}
                height={1536}
                priority
                sizes="(max-width: 1024px) 90vw, 440px"
                className="h-auto w-full"
              />
            </div>
            {/* stays within the image, so it never overlaps the copy when stacked */}
            <div className="absolute bottom-4 left-4 rounded-[14px] border border-border-2 bg-panel/90 px-4 py-3 backdrop-blur">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-pink-hover">
                Next live event
              </div>
              <div className="mt-0.5 font-display text-[14px] font-bold text-text">
                {HERO.nextEventLabel}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* topic strip */}
      <div className="border-y border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-4 sm:px-6 lg:px-8">
          {TOPIC_STRIP.map((t, i) => (
            <span key={t} className="flex items-center gap-6">
              {i > 0 && <span aria-hidden className="text-pink/50">✦</span>}
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-muted-2">
                {t}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

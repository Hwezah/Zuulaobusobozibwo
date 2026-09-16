"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stat } from "@/components/common";
import { ROT_WORDS, STATS } from "@/data/site";

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
      {/* ambient glow blobs — dimmed away in light theme via tokens */}
      <div
        aria-hidden
        className="hide-in-light pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(255,45,149,.32)", animation: "glow 6s ease-in-out infinite" }}
      />
      <div
        aria-hidden
        className="hide-in-light pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "rgba(139,47,214,.34)", animation: "glow 7s ease-in-out infinite" }}
      />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span
            data-hero-eyebrow
            className="inline-flex items-center gap-2 rounded-full border border-border bg-chip px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-pink-hover"
          >
            Zuula Obusobozibwo · Kingdom Business
          </span>

          <h1 className="mt-6 font-display text-[clamp(38px,6.4vw,66px)] font-extrabold leading-[1.04] tracking-[-1px] text-text">
            Awakening purpose in{" "}
            <span className="whitespace-nowrap">
              <span className="text-gradient">{rot}</span>
              <span
                aria-hidden
                className="ml-0.5 inline-block w-[3px] bg-pink align-middle"
                style={{ height: "0.9em", animation: "caret 1s step-end infinite" }}
              />
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted">
            Not just priests — we are kings too. Rise into the marketplace mantle
            through teaching, mentorship, live events and a library built to
            unlock the potential God placed within you.
          </p>

          <div
            data-cta-group
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Button asChild shape="pill" size="lg" data-cta>
              <Link href="/events/kbs2026">
                Get summit tickets <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" shape="pill" size="lg" data-cta>
              <Link href="/mentorship">Explore mentorship</Link>
            </Button>
          </div>

          <div
            data-hero-stats
            className="mt-14 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
          >
            {STATS.map((s) => (
              <Stat key={s.label} num={s.num} label={s.label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

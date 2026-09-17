import type { Metadata } from "next";
import { Play } from "lucide-react";
import { PiWaveform } from "react-icons/pi";
import { Section } from "@/components/common";
import { Button } from "@/components/ui/button";
import { PODCAST_EPISODES, SOCIALS } from "@/data/site";

export const metadata: Metadata = {
  title: "Podcast",
  description: "The Zuula Podcast — weekly episodes on Kingdom purpose and wholeness.",
};

export default function PodcastPage() {
  return (
    <>
      {/* Hero */}
      <Section className="text-center">
        <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-pink-hover">
          Listen
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl font-display text-[clamp(40px,6vw,64px)] font-extrabold leading-[1.04] tracking-[-1px] text-text">
          The Zuula <span className="text-gradient">Podcast</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
          Weekly conversations on Kingdom purpose, healing and marketplace impact
          — new episodes every Tuesday.
        </p>
      </Section>

      {/* Episodes */}
      <Section className="pt-0">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {PODCAST_EPISODES.map((ep) => (
            <div
              key={ep.n}
              data-podcard
              className="flex items-center gap-4 rounded-[18px] border border-border bg-card-2 p-5 max-[560px]:flex-wrap"
            >
              <span
                data-podicon
                className="grid h-14 w-14 shrink-0 place-items-center rounded-[16px] bg-accent-grad text-white"
              >
                <PiWaveform className="h-6 w-6" />
              </span>
              <div data-podtext className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-[12px] text-muted-2">
                  <span className="font-semibold text-pink-hover">EP {ep.n}</span>
                  <span aria-hidden>·</span>
                  <span>{ep.dur}</span>
                  <span aria-hidden>·</span>
                  <span>{ep.date}</span>
                </div>
                <h3 className="mt-1 font-display text-[17px] font-bold text-text">{ep.title}</h3>
                <p className="mt-1 text-[14px] text-muted">{ep.desc}</p>
              </div>
              <button
                type="button"
                aria-label={`Play episode ${ep.n}`}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border-2 bg-card text-text transition-colors hover:border-[var(--pink)] hover:text-pink-hover"
              >
                <Play className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* Follow */}
      <Section className="pt-0">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.5px] text-text">
            Never miss an episode
          </h2>
          <p className="max-w-xl text-[16px] leading-relaxed text-muted">
            Follow along wherever you listen and watch — a fresh conversation
            drops every Tuesday.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button asChild shape="pill" size="lg">
              <a href={SOCIALS.tiktok} target="_blank" rel="noopener noreferrer">
                Watch on TikTok
              </a>
            </Button>
            <Button asChild variant="ghost" shape="pill" size="lg">
              <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer">
                Follow on Facebook
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

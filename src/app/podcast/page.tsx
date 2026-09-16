import type { Metadata } from "next";
import { Play } from "lucide-react";
import { PiWaveform } from "react-icons/pi";
import { Section, SectionHeading } from "@/components/common";
import { PODCAST_EPISODES } from "@/data/site";

export const metadata: Metadata = {
  title: "Podcast",
  description: "The Zuula Podcast — weekly episodes on Kingdom purpose and wholeness.",
};

export default function PodcastPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Listen"
        title="The Zuula Podcast"
        subtitle="Weekly conversations on Kingdom purpose, healing and marketplace impact."
      />

      <div className="mt-12 flex flex-col gap-4">
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
  );
}

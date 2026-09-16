import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PiWaveform } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { PODCAST_BAND } from "@/data/site";

export function PodcastBand() {
  return (
    <div className="flex flex-wrap items-center gap-6 rounded-[20px] border border-border bg-[linear-gradient(135deg,rgba(255,45,149,.08),rgba(139,47,214,.06))] p-6 sm:p-8">
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[16px] bg-accent-grad text-white shadow-[0_8px_20px_rgba(255,45,149,.28)]">
        <PiWaveform className="h-7 w-7" />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-[20px] font-extrabold text-text">{PODCAST_BAND.title}</h3>
        <p className="mt-1 text-[14px] leading-relaxed text-muted">{PODCAST_BAND.desc}</p>
      </div>
      <Button asChild variant="ghost" shape="pill" className="max-sm:w-full">
        <Link href="/podcast">
          {PODCAST_BAND.cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

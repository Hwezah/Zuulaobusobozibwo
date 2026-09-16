import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageWell } from "@/components/image-well";
import { FOUNDER } from "@/data/site";

export function FounderSection() {
  return (
    <div data-grid2 className="grid items-center gap-12 lg:grid-cols-2">
      {/* portrait */}
      <ImageWell
        src="/assets/joseph-founder.jpg"
        label="founder portrait"
        className="aspect-square w-full rounded-[24px] border border-border"
      />

      {/* copy */}
      <div className="max-[560px]:text-center">
        <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-pink-hover">
          {FOUNDER.eyebrow}
        </span>
        <h2 className="mt-3 font-display text-[clamp(28px,4vw,42px)] font-extrabold tracking-[-0.5px] text-text">
          {FOUNDER.name}
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-muted">{FOUNDER.intro}</p>
        <blockquote className="mt-6 border-l-2 border-[var(--pink)] pl-5 text-[16px] italic leading-relaxed text-text-3 max-[560px]:mx-auto max-[560px]:max-w-md">
          “{FOUNDER.quote}”
        </blockquote>
        <Button asChild variant="ghost" shape="pill" className="mt-7">
          <Link href="/booking">{FOUNDER.cta}</Link>
        </Button>
      </div>
    </div>
  );
}

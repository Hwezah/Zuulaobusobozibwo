import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FOUNDER } from "@/data/site";

export function FounderSection() {
  return (
    <div data-grid2 className="grid items-start gap-12 lg:grid-cols-2">
      {/* portrait — framed photo, shown in full (no crop) */}
      <div className="mx-auto w-full max-w-[440px] overflow-hidden rounded-[24px] border border-border shadow-[0_16px_50px_rgba(60,30,80,.18)] lg:mx-0">
        <Image
          src="/assets/joseph-office.webp"
          alt="Tumusiime Joseph Prosper, founder of Zuula Obusobozibwo"
          width={1024}
          height={1536}
          sizes="(max-width: 1024px) 90vw, 440px"
          className="h-auto w-full"
        />
      </div>

      {/* copy — pinned while the taller portrait scrolls past */}
      <div className="max-[560px]:text-center lg:sticky lg:top-24 lg:self-start">
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

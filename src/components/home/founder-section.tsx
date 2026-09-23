import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CutoutImage } from "@/components/cutout-image";
import { FOUNDER } from "@/data/site";

export function FounderSection() {
  return (
    <div data-grid2 className="grid items-center gap-12 lg:grid-cols-2">
      {/* portrait — framed, flipped to face the copy */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] border border-[rgba(255,255,255,.12)]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 25%, #8b2fd6 0%, #4a1a7a 45%, #1a0f2e 100%)",
        }}
      >
        <div
          aria-hidden
          className="absolute left-1/2 top-[18%] aspect-square w-[70%] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,45,149,.45), rgba(255,45,149,0) 70%)",
          }}
        />
        <CutoutImage
          src="/assets/ceo-cutout-flip.webp"
          alt="Tumusiime Joseph Prosper, founder of Zuula Obusobozibwo"
          className="absolute bottom-0 left-0 w-full object-cover"
          style={{ height: "94%", objectPosition: "center top" }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0"
          style={{
            height: "45%",
            background:
              "linear-gradient(to top, #0f0a1c 0%, rgba(15,10,28,.7) 40%, rgba(15,10,28,0) 100%)",
          }}
        />
      </div>

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

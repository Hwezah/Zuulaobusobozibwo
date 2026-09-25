import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FLAGSHIP } from "@/data/site";

export function FlagshipBand() {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[rgba(255,45,149,.3)] bg-[linear-gradient(135deg,rgba(255,45,149,.14),rgba(139,47,214,.1))] p-8 sm:p-12">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="max-[560px]:text-center">
          <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-pink-hover">
            {FLAGSHIP.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-[clamp(26px,3.6vw,38px)] font-extrabold tracking-[-0.5px] text-text">
            {FLAGSHIP.title}
          </h2>
          <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted max-[560px]:mx-auto">
            {FLAGSHIP.desc}
          </p>
          <Button asChild shape="pill" className="mt-7">
            <Link href="/mentorship">
              {FLAGSHIP.cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <ul className="flex flex-col gap-3">
          {FLAGSHIP.perks.map((p) => (
            <li
              key={p}
              className="flex items-center gap-3 rounded-[14px] border border-border bg-card-2 px-5 py-4"
            >
              <Star className="h-[18px] w-[18px] shrink-0 fill-[var(--pink)] text-pink" />
              <span className="text-[15px] font-semibold text-text">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

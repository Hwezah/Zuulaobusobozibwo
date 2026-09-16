import { Check } from "lucide-react";
import type { PriceTier } from "@/data/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TierCard({ tier }: { tier: PriceTier }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-[20px] border p-7 transition-transform duration-200",
        tier.featured
          ? "border-[rgba(255,45,149,.5)] bg-[linear-gradient(180deg,rgba(255,45,149,.12),rgba(139,47,214,.08))] lg:-translate-y-2"
          : "border-border bg-card-2",
      )}
    >
      {tier.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-grad px-4 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          Most popular
        </span>
      )}
      <div className="text-center">
        <h3 className="font-display text-[18px] font-bold text-text">{tier.name}</h3>
        {tier.tagline && <p className="mt-1 text-[13px] text-muted">{tier.tagline}</p>}
        <div className="mt-4 flex items-end justify-center gap-1">
          <span className="font-display text-[32px] font-extrabold text-text">{tier.price}</span>
          {tier.per && <span className="pb-1.5 text-[14px] text-muted">{tier.per}</span>}
        </div>
      </div>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {tier.feats.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[14px] text-text-3">
            <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-pink" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={tier.featured ? "primary" : "subtle"}
        shape="pill"
        className="mt-7 w-full"
      >
        {tier.btn}
      </Button>
    </div>
  );
}

import { Star } from "lucide-react";
import type { PriceTier } from "@/data/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TierCard({ tier }: { tier: PriceTier }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-[20px] border p-7",
        tier.featured
          ? "border-[rgba(255,45,149,.5)] bg-[linear-gradient(180deg,rgba(255,45,149,.12),rgba(139,47,214,.08))]"
          : "border-border bg-card-2",
      )}
    >
      {tier.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-grad px-4 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          {tier.badge ?? "Most popular"}
        </span>
      )}

      <h3 className="font-display text-[17px] font-bold text-text">{tier.name}</h3>
      {tier.tagline && <p className="mt-1 text-[13px] text-muted">{tier.tagline}</p>}
      <div className="mt-3 flex items-end gap-1">
        <span className="font-display text-[34px] font-extrabold leading-none text-text">
          {tier.price}
        </span>
        {tier.per && <span className="pb-1 text-[14px] text-muted">{tier.per}</span>}
      </div>

      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {tier.feats.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-[14px] text-text-3">
            <Star className="mt-0.5 h-[16px] w-[16px] shrink-0 fill-[var(--pink)] text-pink" />
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

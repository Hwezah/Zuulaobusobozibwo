"use client";

import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LINKS, openUrl } from "@/config/links";
import { MEMBERSHIP_TIERS, USD_UGX, type MembershipTier } from "@/data/site";
import { cn } from "@/lib/utils";

type Currency = "USD" | "UGX";

const ACTION_URL: Record<MembershipTier["action"], string> = {
  whatsappGroup: LINKS.whatsappGroup,
  telegramGroup: LINKS.telegramGroup,
  mentorship: "/mentorship",
};

function priceLabel(tier: MembershipTier, cur: Currency): string {
  if (tier.priceUgx === null) return "Free";
  return cur === "UGX"
    ? "UGX " + Math.round(tier.priceUgx / 1000) + "K"
    : "$" + Math.round(tier.priceUgx / USD_UGX);
}

export function MembershipTiers() {
  const [cur, setCur] = useState<Currency>("UGX");

  return (
    <>
      {/* currency toggle */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="inline-flex rounded-full border border-border-2 bg-card p-1">
          {(["USD", "UGX"] as Currency[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCur(c)}
              aria-pressed={cur === c}
              className={cn(
                "rounded-full px-5 py-1.5 text-[13px] font-semibold transition-colors",
                cur === c ? "text-white" : "text-muted hover:text-text",
              )}
              style={
                cur === c
                  ? { background: "linear-gradient(135deg,#ff2d95,#8b1fd4)" }
                  : undefined
              }
            >
              {c}
            </button>
          ))}
        </div>
        <p className="text-[13px] text-muted-2">
          {cur === "UGX"
            ? "Exact price · pay by Mobile Money"
            : "Approx. at UGX 3,800 per $1"}
        </p>
      </div>

      {/* tiers */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {MEMBERSHIP_TIERS.map((tier) => (
          <div
            key={tier.name}
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
            <div className="mt-3 flex items-end gap-1">
              <span className="font-display text-[34px] font-extrabold leading-none text-text">
                {priceLabel(tier, cur)}
              </span>
              {tier.priceUgx !== null && tier.per && (
                <span className="pb-1 text-[14px] text-muted">{tier.per}</span>
              )}
            </div>

            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {tier.feats.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[14px] text-text-3">
                  <Star className="mt-0.5 h-[16px] w-[16px] shrink-0 fill-[var(--pink)] text-pink" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {tier.action === "mentorship" ? (
              <Button
                asChild
                variant={tier.featured ? "primary" : "subtle"}
                shape="pill"
                className="mt-7 w-full"
              >
                <Link href="/mentorship">{tier.btn}</Link>
              </Button>
            ) : (
              <Button
                variant={tier.featured ? "primary" : "subtle"}
                shape="pill"
                className="mt-7 w-full"
                onClick={() => openUrl(ACTION_URL[tier.action])}
              >
                {tier.btn}
              </Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

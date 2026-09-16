"use client";

import { Plus } from "lucide-react";
import type { EventItem } from "@/lib/types";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { QtyStepper } from "@/components/common";
import { cn } from "@/lib/utils";

export function EventTiers({ event }: { event: EventItem }) {
  const { qtyOf, add, inc, dec } = useCart();

  return (
    <div className="flex flex-col gap-3">
      {event.tiers.map((t) => {
        const qty = qtyOf(t.pid);
        const inCart = qty > 0;
        return (
          <div
            key={t.pid}
            data-tierrow
            className={cn(
              "flex flex-wrap items-center justify-between gap-4 rounded-[18px] border p-5 transition-colors max-[560px]:flex-col max-[560px]:text-center",
              inCart
                ? "border-[rgba(255,45,149,.45)] bg-[rgba(255,45,149,.07)]"
                : "border-border bg-card-2",
            )}
          >
            <div className="min-w-0">
              <div className="flex items-baseline gap-3 max-[560px]:justify-center">
                <h3 className="font-display text-[18px] font-bold text-text">{t.name}</h3>
                <span className="font-display text-[16px] font-extrabold text-pink-hover">
                  {t.priceLabel}
                </span>
              </div>
              <p className="mt-1 text-[13.5px] text-muted">{t.note}</p>
            </div>

            {inCart ? (
              <span data-tierbuy className="max-[560px]:w-full max-[560px]:flex max-[560px]:justify-center">
                <QtyStepper value={qty} onInc={() => inc(t.pid)} onDec={() => dec(t.pid)} />
              </span>
            ) : (
              <Button
                shape="pill"
                onClick={() => add(t.pid)}
                data-tierbuy
                className="max-[560px]:w-full"
              >
                <Plus className="h-4 w-4" /> Add ticket
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}

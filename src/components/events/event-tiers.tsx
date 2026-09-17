"use client";

import { useRouter } from "next/navigation";
import { Plus, ArrowRight } from "lucide-react";
import type { EventItem } from "@/lib/types";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { QtyStepper } from "@/components/common";
import { ugx, cn } from "@/lib/utils";

export function EventTiers({ event }: { event: EventItem }) {
  const router = useRouter();
  const { qtyOf, add, inc, dec, setOpen } = useCart();

  const total = event.tiers.reduce((n, t) => n + qtyOf(t.pid) * t.val, 0);
  const count = event.tiers.reduce((n, t) => n + qtyOf(t.pid), 0);

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
              "flex flex-wrap items-center justify-between gap-4 rounded-[16px] border p-5 transition-colors max-[560px]:flex-col max-[560px]:text-center",
              inCart
                ? "border-[rgba(255,45,149,.45)] bg-[rgba(255,45,149,.07)]"
                : "border-border bg-card-2",
            )}
          >
            <div className="min-w-0">
              <h3 className="font-display text-[17px] font-bold text-text">{t.name}</h3>
              <p className="mt-0.5 text-[13.5px] text-muted">{t.note}</p>
            </div>

            <div className="flex items-center gap-4 max-[560px]:w-full max-[560px]:justify-between">
              <span className="font-display text-[17px] font-extrabold text-text">
                {t.priceLabel}
              </span>
              {inCart ? (
                <QtyStepper value={qty} onInc={() => inc(t.pid)} onDec={() => dec(t.pid)} />
              ) : (
                <Button shape="pill" size="sm" onClick={() => add(t.pid)}>
                  <Plus className="h-4 w-4" /> Add
                </Button>
              )}
            </div>
          </div>
        );
      })}

      <Button
        size="lg"
        className="mt-2 w-full"
        disabled={count === 0}
        onClick={() => {
          setOpen(false);
          router.push("/checkout");
        }}
      >
        Proceed to checkout — {ugx(total)} <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

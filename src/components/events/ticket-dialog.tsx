"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QtyStepper } from "@/components/common";
import { useCart } from "@/context/cart-context";
import type { EventItem } from "@/lib/types";
import { ugx } from "@/lib/utils";

export function TicketDialog({
  event,
  open,
  onOpenChange,
}: {
  event: EventItem;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();
  const { inc, setOpen } = useCart();
  const [qty, setQty] = useState<Record<string, number>>({});

  const { count, total } = useMemo(() => {
    let count = 0;
    let total = 0;
    for (const t of event.tiers) {
      const q = qty[t.pid] || 0;
      count += q;
      total += q * t.val;
    }
    return { count, total };
  }, [qty, event.tiers]);

  function bump(pid: string, d: 1 | -1) {
    setQty((s) => {
      const n = Math.max(0, (s[pid] || 0) + d);
      return { ...s, [pid]: n };
    });
  }

  function addToCart() {
    for (const t of event.tiers) {
      const q = qty[t.pid] || 0;
      for (let i = 0; i < q; i++) inc(t.pid);
    }
  }

  function checkout() {
    addToCart();
    onOpenChange(false);
    setQty({});
    router.push("/checkout");
  }

  function addAndBrowse() {
    addToCart();
    onOpenChange(false);
    setQty({});
    setOpen(true);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            {event.day} {event.monthFull} · {event.time} · {event.place}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          {event.tiers.map((t) => (
            <div
              key={t.pid}
              className="flex items-center justify-between gap-4 rounded-[14px] border border-border bg-card p-4"
            >
              <div className="min-w-0">
                <p className="font-display text-[15px] font-bold text-text">{t.name}</p>
                <p className="text-[13px] text-muted">{t.priceLabel}</p>
              </div>
              <QtyStepper
                value={qty[t.pid] || 0}
                onInc={() => bump(t.pid, 1)}
                onDec={() => bump(t.pid, -1)}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-[14px] text-muted">
            {count} {count === 1 ? "ticket" : "tickets"}
          </span>
          <span className="font-display text-[20px] font-extrabold text-text">
            {ugx(total)}
          </span>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="ghost" shape="pill" className="flex-1" disabled={count === 0} onClick={addAndBrowse}>
            Add to cart
          </Button>
          <Button shape="pill" className="flex-1" disabled={count === 0} onClick={checkout}>
            Checkout · {ugx(total)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { QtyStepper } from "@/components/common";
import { useCart } from "@/context/cart-context";
import { ugx } from "@/lib/utils";

export function CartDrawer() {
  const router = useRouter();
  const { open, setOpen, lines, total, count, inc, dec, remove } = useCart();

  function checkout() {
    setOpen(false);
    router.push("/checkout");
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <div className="flex items-center gap-2 border-b border-border px-5 py-5">
          <ShoppingBag className="h-5 w-5 text-pink" />
          <SheetTitle>Your cart</SheetTitle>
          <span className="ml-1 rounded-full bg-chip px-2 py-0.5 text-[12px] font-semibold text-muted">
            {count}
          </span>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <SheetDescription>Your cart is empty.</SheetDescription>
            <Button variant="ghost" shape="pill" onClick={() => setOpen(false)}>
              Keep browsing
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-3">
                {lines.map(({ product, qty, lineTotal }) => (
                  <li
                    key={product.id}
                    className="flex flex-col gap-3 rounded-[14px] border border-border bg-card p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-display text-[15px] font-bold text-text">
                          {product.title}
                        </p>
                        <p className="text-[12px] uppercase tracking-wide text-muted-2">
                          {product.type}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label="Remove"
                        onClick={() => remove(product.id)}
                        className="text-muted transition-colors hover:text-pink"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <QtyStepper value={qty} onInc={() => inc(product.id)} onDec={() => dec(product.id)} />
                      <span className="font-display text-[15px] font-bold text-text">
                        {ugx(lineTotal)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-border px-5 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[14px] text-muted">Total</span>
                <span className="font-display text-[20px] font-extrabold text-text">
                  {ugx(total)}
                </span>
              </div>
              <Button className="w-full" shape="pill" onClick={checkout}>
                Checkout · {ugx(total)}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

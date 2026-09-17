"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Lock } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { QtyStepper } from "@/components/common";
import { ImageWell } from "@/components/image-well";
import { useCart } from "@/context/cart-context";
import { ugx } from "@/lib/utils";

export function CartDrawer() {
  const router = useRouter();
  const { open, setOpen, lines, total, inc, dec, remove } = useCart();

  function checkout() {
    setOpen(false);
    router.push("/checkout");
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <div className="flex items-center border-b border-border px-5 py-5">
          <SheetTitle>Your cart</SheetTitle>
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
            <div className="flex-1 overflow-y-auto px-5">
              <ul className="flex flex-col">
                {lines.map(({ product, qty }) => (
                  <li
                    key={product.id}
                    className="flex gap-3 border-b border-border py-5 last:border-0"
                  >
                    <ImageWell
                      src={product.img}
                      className="h-14 w-14 shrink-0 rounded-[10px] border border-border"
                    />
                    <div className="flex min-w-0 flex-1 justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-display text-[14px] font-bold leading-tight text-text">
                          {product.title}
                        </p>
                        <p className="mt-0.5 text-[12px] text-muted">{product.type}</p>
                        <p className="mt-1 font-display text-[14px] font-bold text-pink-hover">
                          {ugx(product.priceVal)}
                        </p>
                        <div className="mt-3">
                          <QtyStepper value={qty} onInc={() => inc(product.id)} onDec={() => dec(product.id)} />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(product.id)}
                        className="shrink-0 text-[13px] font-semibold text-muted transition-colors hover:text-pink"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border px-5 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[15px] text-muted">Subtotal</span>
                <span className="font-display text-[22px] font-extrabold text-text">
                  {ugx(total)}
                </span>
              </div>
              <Button className="w-full" size="lg" onClick={checkout}>
                Proceed to checkout <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-muted-2">
                <Lock className="h-3.5 w-3.5" /> Secure payment via Mobile Money
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

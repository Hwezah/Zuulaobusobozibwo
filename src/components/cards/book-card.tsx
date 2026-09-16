"use client";

import { Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/cart-context";
import { ugx } from "@/lib/utils";

export function BookCard({ book }: { book: Product }) {
  const { add } = useCart();
  return (
    <div
      data-bookcard
      className="flex flex-col overflow-hidden rounded-[20px] border border-border bg-card-2 shadow-[0_6px_22px_rgba(60,30,80,.06)] transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-well">
        {book.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.img}
            alt={book.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-5 text-center">
            <span className="font-display text-[15px] font-bold leading-tight text-text">
              {book.title}
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-muted-2">
              {book.cover}
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full border border-border bg-panel/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-text-3 backdrop-blur">
          {book.type}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="min-h-[2.6rem]">
          <h3 className="font-display text-[16px] font-bold leading-tight text-text">
            {book.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-[13px] text-muted">{book.desc}</p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-display text-[15px] font-extrabold text-text">
            {ugx(book.priceVal)}
          </span>
          <button
            type="button"
            onClick={() => add(book.id)}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent-grad px-4 py-2 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(255,45,149,.3)] transition-transform hover:scale-[1.03]"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

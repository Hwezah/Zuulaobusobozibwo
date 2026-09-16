"use client";

import type { Product } from "@/lib/types";
import { useCart } from "@/context/cart-context";
import { ugx } from "@/lib/utils";

export function BookCard({ book }: { book: Product }) {
  const { add } = useCart();
  return (
    <div
      data-bookcard
      className="flex flex-col overflow-hidden rounded-[18px] border border-border bg-card-2 p-3 shadow-[0_6px_22px_rgba(60,30,80,.06)] transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[12px] bg-well">
        {book.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.img}
            alt={book.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="pattern-well grid h-full w-full place-items-center">
            <span className="text-[11px] italic text-muted-2">{book.cover ?? "front cover"}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <span className="mb-2 inline-flex w-fit items-center rounded-full border border-[rgba(255,45,149,.4)] bg-[rgba(255,45,149,.1)] px-3 py-0.5 text-[11px] font-semibold text-pink-hover">
          {book.type}
        </span>
        <h3 className="font-display text-[16px] font-bold leading-tight text-text">{book.title}</h3>
        <p className="mt-1.5 line-clamp-2 min-h-[2.6rem] text-[13.5px] leading-relaxed text-muted">{book.desc}</p>
        <button
          type="button"
          onClick={() => add(book.id)}
          className="mt-4 w-full rounded-[12px] border border-[rgba(255,45,149,.35)] bg-[rgba(255,45,149,.12)] px-4 py-3 font-display text-[13.5px] font-bold text-pink-hover transition-colors hover:bg-[rgba(255,45,149,.2)]"
        >
          {ugx(book.priceVal)} · Add
        </button>
      </div>
    </div>
  );
}

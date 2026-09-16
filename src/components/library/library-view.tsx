"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Chip } from "@/components/common";
import { BookCard } from "@/components/cards/book-card";
import { BOOKS, LIBRARY_FILTERS } from "@/data/products";

export function LibraryView() {
  const params = useSearchParams();
  const initial = params.get("filter");
  const [filter, setFilter] = useState<string>(
    initial && (LIBRARY_FILTERS as readonly string[]).includes(initial) ? initial : "All",
  );

  const books = useMemo(
    () => (filter === "All" ? BOOKS : BOOKS.filter((b) => b.type === filter)),
    [filter],
  );

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2.5">
        {LIBRARY_FILTERS.map((f) => (
          <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </Chip>
        ))}
      </div>

      <div
        data-libgrid
        className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 max-[560px]:grid-cols-1"
      >
        {books.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </>
  );
}

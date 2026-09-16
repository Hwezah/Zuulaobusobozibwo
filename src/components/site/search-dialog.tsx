"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import { BOOKS } from "@/data/products";
import { EVENTS } from "@/data/events";

interface Entry {
  label: string;
  kind: string;
  run: () => void;
}

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();
  const { add } = useCart();
  const [query, setQuery] = useState("");

  const index = useMemo<Entry[]>(() => {
    const go = (href: string) => () => {
      router.push(href);
    };
    return [
      { label: "Home", kind: "Page", run: go("/") },
      { label: "1:1 Mentorship & Coaching", kind: "Page", run: go("/mentorship") },
      { label: "Events & Tickets", kind: "Page", run: go("/events") },
      { label: "Book Joseph to speak", kind: "Page", run: go("/booking") },
      { label: "The Zuula Podcast", kind: "Media", run: go("/podcast") },
      { label: "eBook Library", kind: "Library", run: go("/library") },
      ...BOOKS.map((b) => ({ label: b.title, kind: b.type, run: () => add(b.id) })),
      ...EVENTS.map((e) => ({
        label: e.title,
        kind: "Event",
        run: go(`/events/${e.id}`),
      })),
    ];
  }, [router, add]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? index.filter(
          (i) =>
            i.label.toLowerCase().includes(q) || i.kind.toLowerCase().includes(q),
        )
      : index.slice(0, 6);
    return list.slice(0, 8);
  }, [query, index]);

  function choose(e: Entry) {
    onOpenChange(false);
    setQuery("");
    e.run();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideClose className="top-[12%] translate-y-0 gap-3 p-4 sm:max-w-xl">
        <DialogTitle className="sr-only">Search</DialogTitle>
        <DialogDescription className="sr-only">
          Search pages, events and the library
        </DialogDescription>
        <div className="flex items-center gap-3 rounded-[14px] border border-border-2 bg-card px-4">
          <Search className="h-5 w-5 text-muted" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, events, books…"
            className="h-12 border-0 bg-transparent px-0 focus-visible:ring-0"
          />
        </div>
        <div className="max-h-[50vh] overflow-y-auto">
          {results.length === 0 ? (
            <p className="px-2 py-6 text-center text-[14px] text-muted">
              No results for “{query}”.
            </p>
          ) : (
            <ul className="flex flex-col gap-1">
              {results.map((r, i) => (
                <li key={`${r.label}-${i}`}>
                  <button
                    type="button"
                    onClick={() => choose(r)}
                    className="flex w-full items-center justify-between gap-4 rounded-[12px] px-3 py-3 text-left transition-colors hover:bg-[rgba(255,45,149,.1)]"
                  >
                    <span className="text-[15px] font-semibold text-text">{r.label}</span>
                    <span className="rounded-full border border-border bg-chip px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-2">
                      {r.kind}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

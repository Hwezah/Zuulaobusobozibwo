"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { EVENTS } from "@/data/events";

const KEY = "zuula-ribbon-hidden";

export function EventRibbon() {
  const [hidden, setHidden] = useState(true);
  const ev = EVENTS[0];

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(KEY) === "1";
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only hydration from sessionStorage
    setHidden(dismissed);
  }, []);

  if (hidden || !ev) return null;

  function dismiss(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setHidden(true);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
  }

  return (
    <div className="relative overflow-hidden bg-accent-grad text-white">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-white/20 blur-md"
        style={{ animation: "ribbonshine 3.4s ease-in-out infinite" }}
      />
      <Link
        href={`/events/${ev.id}`}
        data-ribbonrow
        className="relative mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5 text-center text-white hover:text-white"
      >
        <span
          data-ribbontext
          className="text-[13.5px] font-semibold"
        >
          <span aria-hidden className="mr-2 inline-block h-2 w-2 rounded-full bg-white align-middle" style={{ animation: "evdot 1.9s ease-in-out infinite" }} />
          {ev.title} · Sat 24 Oct · {ev.place.split(",")[0]} —{" "}
          <span className="underline underline-offset-2">Get tickets</span>
        </span>
        <button
          data-ribbonclose
          type="button"
          aria-label="Dismiss announcement"
          onClick={dismiss}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
        >
          <X className="h-4 w-4" />
        </button>
      </Link>
    </div>
  );
}

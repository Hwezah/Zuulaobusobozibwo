"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
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

  function dismiss() {
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
      <div
        data-ribbonrow
        className="relative mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8"
      >
        <div data-ribbontext className="flex flex-1 items-center justify-center gap-3 max-[560px]:justify-start">
          <span className="flex items-center gap-2 text-[13.5px] font-semibold max-[560px]:text-[12.5px]">
            <span
              aria-hidden
              className="inline-block h-2 w-2 rounded-full bg-white"
              style={{ animation: "evdot 1.9s ease-in-out infinite" }}
            />
            {ev.title} · Sat 24 Oct · {ev.place.split(",")[0]}
          </span>
          <Link
            href={`/events/${ev.id}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-[13px] font-bold text-white backdrop-blur transition-colors hover:bg-white/30 max-[560px]:hidden"
          >
            Get tickets <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <button
          data-ribbonclose
          type="button"
          aria-label="Dismiss announcement"
          onClick={dismiss}
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white/25"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

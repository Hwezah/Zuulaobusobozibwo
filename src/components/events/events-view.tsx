"use client";

import { useMemo, useState } from "react";
import { CalendarX } from "lucide-react";
import { EventRow } from "./event-row";
import { Chip } from "@/components/common";
import { EVENTS, EVENT_FILTERS, EVENT_FILTER_TAG } from "@/data/events";

export function EventsView() {
  const [filter, setFilter] = useState<string>("All events");

  const groups = useMemo(() => {
    const tag = EVENT_FILTER_TAG[filter];
    const shown = EVENTS.filter((e) => !tag || e.tag === tag);
    const map = new Map<string, typeof EVENTS>();
    for (const e of shown) {
      const arr = map.get(e.monthFull) ?? [];
      arr.push(e);
      map.set(e.monthFull, arr);
    }
    return [...map.entries()].map(([month, items]) => ({ month, items }));
  }, [filter]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2.5">
        {EVENT_FILTERS.map((f) => (
          <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f}
          </Chip>
        ))}
      </div>

      {groups.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <CalendarX className="h-10 w-10 text-muted-2" />
          <p className="text-[16px] text-muted">
            No {filter.toLowerCase()} scheduled right now — check back soon.
          </p>
        </div>
      ) : (
        <div className="mt-12 flex flex-col gap-10">
          {groups.map((g) => (
            <div key={g.month}>
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="font-display text-[18px] font-extrabold text-text">{g.month}</h2>
                <span className="text-[13px] text-muted-3">
                  {g.items.length} event{g.items.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {g.items.map((e) => (
                  <EventRow key={e.id} event={e} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

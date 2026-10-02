"use client";

import * as React from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const sameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Cells for one month, Monday-first; `null` pads the leading blanks. */
function monthCells(year: number, month: number): (Date | null)[] {
  const lead = (new Date(year, month, 1).getDay() + 6) % 7;
  const days = new Date(year, month + 1, 0).getDate();
  return [
    ...Array<null>(lead).fill(null),
    ...Array.from({ length: days }, (_, i) => new Date(year, month, i + 1)),
  ];
}

interface DatePickerProps {
  /** Form field name; submits the chosen date as YYYY-MM-DD. */
  name?: string;
  placeholder?: string;
  "aria-label"?: string;
  /** Earliest selectable day. Defaults to today (no past dates). */
  min?: Date;
  className?: string;
}

export function DatePicker({
  name,
  placeholder = "Select a date",
  "aria-label": ariaLabel,
  min,
  className,
}: DatePickerProps) {
  const today = startOfDay(new Date());
  const earliest = startOfDay(min ?? today);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Date | null>(null);
  const [view, setView] = React.useState({ y: today.getFullYear(), m: today.getMonth() });

  const cells = monthCells(view.y, view.m);
  const atEarliestMonth = view.y === earliest.getFullYear() && view.m === earliest.getMonth();

  function shift(delta: number) {
    setView(({ y, m }) => {
      const d = new Date(y, m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  }

  function choose(d: Date | null) {
    setValue(d);
    setOpen(false);
  }

  function onOpenChange(next: boolean) {
    if (next) {
      const base = value ?? earliest;
      setView({ y: base.getFullYear(), m: base.getMonth() });
    }
    setOpen(next);
  }

  const label = value
    ? value.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" })
    : placeholder;

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {name && <input type="hidden" name={name} value={value ? iso(value) : ""} />}
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={ariaLabel ?? placeholder}
          className={cn(
            "flex h-12 w-full items-center gap-3 rounded-[14px] border border-border-2 bg-card px-4 text-left text-[15px] outline-none transition-colors",
            "focus-visible:border-[var(--pink)] focus-visible:ring-2 focus-visible:ring-[var(--ring)] data-[state=open]:border-[var(--pink)]",
            value ? "text-text" : "text-muted-2",
            className,
          )}
        >
          <CalendarDays className="h-[18px] w-[18px] shrink-0 text-pink" aria-hidden />
          <span className="truncate">{label}</span>
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-[min(320px,calc(100vw-2rem))]">
        <div className="flex items-center justify-between">
          <span className="font-display text-[16px] font-bold text-text">
            {MONTHS[view.m]} {view.y}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => shift(-1)}
              disabled={atEarliestMonth}
              aria-label="Previous month"
              className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-card-strong hover:text-text disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => shift(1)}
              aria-label="Next month"
              className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-card-strong hover:text-text"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-7 text-center">
          {WEEKDAYS.map((w) => (
            <span key={w} className="py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-2">
              {w.slice(0, 2)}
            </span>
          ))}
          {cells.map((d, i) =>
            d === null ? (
              <span key={`b${i}`} />
            ) : (
              <button
                key={iso(d)}
                type="button"
                disabled={d < earliest}
                onClick={() => choose(d)}
                aria-label={d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                aria-pressed={value ? sameDay(d, value) : false}
                className={cn(
                  "mx-auto grid h-10 w-10 place-items-center rounded-full text-[14px] font-medium transition-colors outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-25",
                  value && sameDay(d, value)
                    ? "bg-accent-grad font-bold text-white shadow-[0_6px_16px_rgba(255,45,149,.35)]"
                    : sameDay(d, today)
                      ? "text-pink-hover ring-1 ring-inset ring-[var(--pink)] hover:bg-card-strong"
                      : "text-text-3 hover:bg-card-strong hover:text-text",
                )}
              >
                {d.getDate()}
              </button>
            ),
          )}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[13px] font-semibold">
          <button
            type="button"
            onClick={() => choose(null)}
            className="rounded-full px-3 py-1.5 text-muted transition-colors hover:text-text"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => choose(today)}
            disabled={today < earliest}
            className="rounded-full px-3 py-1.5 text-pink-hover transition-colors hover:bg-card-strong disabled:opacity-30"
          >
            Today
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

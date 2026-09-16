"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** Centered eyebrow + heading block used above most sections. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center rounded-full border border-border bg-chip px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-pink-hover">
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-3xl text-balance text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.08] tracking-[-0.5px] text-text">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-[16px] leading-relaxed text-muted">{subtitle}</p>
      )}
    </div>
  );
}

/** Pill filter chip. */
export function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full border px-5 py-2 text-[13.5px] font-semibold transition-all",
        active
          ? "border-[var(--pink)] bg-accent-grad text-white"
          : "border-border-2 bg-chip text-text-3 hover:border-border-strong",
      )}
    >
      {children}
    </button>
  );
}

/** – value + quantity stepper. */
export function QtyStepper({
  value,
  onInc,
  onDec,
  className,
}: {
  value: number;
  onInc: () => void;
  onDec: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border-2 bg-card p-1",
        className,
      )}
    >
      <button
        type="button"
        onClick={onDec}
        aria-label="Decrease quantity"
        className="grid h-8 w-8 place-items-center rounded-full text-text transition-colors hover:bg-card-strong disabled:opacity-40"
        disabled={value <= 0}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-6 text-center font-display text-[15px] font-bold tabular-nums text-text">
        {value}
      </span>
      <button
        type="button"
        onClick={onInc}
        aria-label="Increase quantity"
        className="grid h-8 w-8 place-items-center rounded-full text-text transition-colors hover:bg-card-strong"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

/** Card surface used across the app. */
export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-border bg-card-2 p-6 shadow-[0_6px_22px_rgba(60,30,80,.06)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/** Consistent page-section wrapper (max width + symmetric side padding). */
export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8", className)}>
      {children}
    </section>
  );
}

/** Number + label stat used in hero/booking/about rows. */
export function Stat({ num, label }: { num: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-[28px] font-extrabold text-text">{num}</div>
      <div className="mt-1 text-[13px] text-muted">{label}</div>
    </div>
  );
}

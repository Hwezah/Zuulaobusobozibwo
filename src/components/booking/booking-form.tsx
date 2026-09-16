"use client";

import { useState } from "react";
import { Sparkles, Lock, ArrowRight, CalendarCheck } from "lucide-react";
import { ICONS } from "@/data/icons";
import {
  BOOKING_TYPE_OPTIONS,
  BOOKING_FORMATS,
  BOOKING_AUDIENCE,
} from "@/data/site";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function BookingForm() {
  const [bType, setBType] = useState("Keynote");
  const [bFormat, setBFormat] = useState("In person");
  const [audience, setAudience] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Faked in the prototype; wire to /api/booking + email/CRM later.
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {}
    }, 900);
  }

  if (done) {
    return (
      <div className="rounded-[24px] border border-border bg-panel-2 p-8 text-center shadow-[0_24px_70px_rgba(60,30,80,.2)] sm:p-10">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-grad text-white">
          <CalendarCheck className="h-8 w-8" />
        </span>
        <h2 className="mt-6 font-display text-[24px] font-extrabold text-text">Request received</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Thank you — we&apos;ll review your {bType.toLowerCase()} request and get
          back to you within 48 hours to confirm details.
        </p>
        <Button variant="ghost" shape="pill" className="mt-6" onClick={() => setDone(false)}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[24px] border border-border bg-panel-2 p-6 shadow-[0_24px_70px_rgba(60,30,80,.2)] sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-[12px] bg-accent-grad text-white">
          <Sparkles className="h-6 w-6" />
        </span>
        <h2 className="font-display text-[20px] font-extrabold text-text">Request a date</h2>
      </div>

      {/* Engagement type */}
      <fieldset className="mt-6">
        <legend className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-2">
          Engagement type
        </legend>
        <div data-typegrid className="mt-3 grid grid-cols-2 gap-3">
          {BOOKING_TYPE_OPTIONS.map((t) => {
            const Icon = ICONS[t.ico];
            const active = bType === t.label;
            return (
              <button
                key={t.label}
                type="button"
                onClick={() => setBType(t.label)}
                className={cn(
                  "flex items-center gap-2.5 rounded-[14px] border px-4 py-4 text-left transition-colors",
                  active
                    ? "border-[var(--pink)] bg-[rgba(255,45,149,.1)]"
                    : "border-border-2 bg-card hover:border-border-strong",
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0", active ? "text-pink-hover" : "text-muted")} />
                <span className={cn("text-[14px] font-bold", active ? "text-text" : "text-muted")}>
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Format */}
      <fieldset className="mt-6">
        <legend className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-2">
          Format
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {BOOKING_FORMATS.map((f) => {
            const active = bFormat === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setBFormat(f)}
                className={cn(
                  "rounded-[14px] px-4 py-3.5 text-center text-[14px] font-bold transition-colors",
                  active
                    ? "bg-accent-grad text-white"
                    : "border border-border-2 bg-card text-muted hover:text-text",
                )}
              >
                {f}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Fields */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Input name="name" required placeholder="Full name" aria-label="Full name" />
        <Input name="org" placeholder="Organization" aria-label="Organization" />
        <Input name="email" type="email" required placeholder="Email address" aria-label="Email address" />
        <Input name="phone" inputMode="tel" placeholder="Phone" aria-label="Phone" />
        <Input name="date" type="date" placeholder="Preferred date" aria-label="Preferred date" className="text-muted" />
        <Select value={audience} onValueChange={setAudience}>
          <SelectTrigger aria-label="Audience size">
            <SelectValue placeholder="Audience size" />
          </SelectTrigger>
          <SelectContent>
            {BOOKING_AUDIENCE.map((a) => (
              <SelectItem key={a} value={a}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Textarea
        name="message"
        className="mt-3"
        placeholder="Tell us about your event, audience and goals…"
        aria-label="About your event"
      />

      {/* Summary */}
      <div className="mt-5 flex items-center justify-between rounded-[14px] border border-border-2 bg-card px-4 py-3.5">
        <span className="text-[14px] text-muted">Your request</span>
        <span className="font-display text-[14px] font-bold text-pink-hover">
          {bType} · {bFormat}
          {audience ? ` · ${audience}` : ""}
        </span>
      </div>

      <Button type="submit" size="lg" className="mt-4 w-full" disabled={submitting}>
        {submitting ? "Sending…" : (<>Send booking request <ArrowRight className="h-4 w-4" /></>)}
      </Button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-muted-2">
        <Lock className="h-3.5 w-3.5" /> No commitment — we&apos;ll confirm availability within 48 hours.
      </p>
    </form>
  );
}

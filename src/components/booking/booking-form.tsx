"use client";

import { useState } from "react";
import { Check, CalendarCheck } from "lucide-react";
import { ICONS } from "@/data/icons";
import {
  BOOKING_TYPE_OPTIONS,
  BOOKING_FORMATS,
  BOOKING_AUDIENCE,
} from "@/data/site";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      <div className="mx-auto max-w-lg rounded-[22px] border border-border bg-card-2 p-10 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-grad text-white">
          <CalendarCheck className="h-8 w-8" />
        </span>
        <h2 className="mt-6 font-display text-[24px] font-extrabold text-text">
          Request received
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Thank you — we&apos;ll review your {bType.toLowerCase()} request and get
          back to you within 48 hours to confirm details.
        </p>
        <Button
          variant="ghost"
          shape="pill"
          className="mt-6"
          onClick={() => setDone(false)}
        >
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-2xl rounded-[22px] border border-border bg-card-2 p-6 sm:p-8">
      {/* Type */}
      <fieldset>
        <legend className="text-[13px] font-semibold text-text-3">Type of engagement</legend>
        <div data-typegrid className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {BOOKING_TYPE_OPTIONS.map((t) => {
            const Icon = ICONS[t.ico];
            const active = bType === t.label;
            return (
              <button
                key={t.label}
                type="button"
                onClick={() => setBType(t.label)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-[14px] border px-3 py-4 text-center transition-colors",
                  active
                    ? "border-[var(--pink)] bg-[linear-gradient(135deg,rgba(255,45,149,.22),rgba(139,47,214,.22))] text-text"
                    : "border-border-2 bg-card text-muted hover:text-text",
                )}
              >
                <Icon className="h-6 w-6" />
                <span className="text-[13px] font-semibold">{t.label}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Format */}
      <fieldset className="mt-6">
        <legend className="text-[13px] font-semibold text-text-3">Format</legend>
        <div data-momotab className="mt-3 flex gap-3">
          {BOOKING_FORMATS.map((f) => {
            const active = bFormat === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setBFormat(f)}
                className={cn(
                  "flex-1 rounded-[14px] border px-4 py-3 text-center text-[14px] font-semibold transition-colors",
                  active
                    ? "border-[var(--pink)] bg-accent-grad text-white"
                    : "border-border-2 bg-card text-muted hover:text-text",
                )}
              >
                {f}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Fields */}
      <div data-formrow className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="bk-name">Full name</Label>
          <Input id="bk-name" name="name" required placeholder="Your name" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bk-email">Email</Label>
          <Input id="bk-email" name="email" type="email" required placeholder="you@example.com" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bk-org">Organization</Label>
          <Input id="bk-org" name="org" placeholder="Church, company or ministry" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bk-date">Preferred date</Label>
          <Input id="bk-date" name="date" type="date" />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Label>Audience size</Label>
        <Select value={audience} onValueChange={setAudience}>
          <SelectTrigger>
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

      <div className="mt-4 flex flex-col gap-2">
        <Label htmlFor="bk-msg">Tell us about your event</Label>
        <Textarea id="bk-msg" name="message" placeholder="Theme, goals, anything we should know…" />
      </div>

      <div className="mt-5 rounded-[14px] border border-border bg-card px-4 py-3 text-[13px] text-muted">
        Summary: <span className="font-semibold text-text-3">{bType} · {bFormat}</span>
        {audience ? ` · ${audience}` : ""}
      </div>

      <Button type="submit" shape="pill" className="mt-6 w-full" disabled={submitting}>
        {submitting ? "Sending…" : (<><Check className="h-4 w-4" /> Send booking request</>)}
      </Button>
    </form>
  );
}

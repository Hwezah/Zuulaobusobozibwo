"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 800);
  }

  if (done) {
    return (
      <div className="rounded-[22px] border border-border bg-card-2 p-10 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-grad text-white">
          <Check className="h-7 w-7" strokeWidth={3} />
        </span>
        <h2 className="mt-5 font-display text-[22px] font-extrabold text-text">
          Message sent
        </h2>
        <p className="mt-2 text-[15px] text-muted">
          Thank you — we&apos;ll reply as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[22px] border border-border bg-card-2 p-6 sm:p-8">
      <div data-formrow className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="ct-name">Name</Label>
          <Input id="ct-name" required placeholder="Your name" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="ct-email">Email</Label>
          <Input id="ct-email" type="email" required placeholder="you@example.com" />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Label htmlFor="ct-msg">Message</Label>
        <Textarea id="ct-msg" required placeholder="How can we help?" />
      </div>
      <Button type="submit" shape="pill" className="mt-6 w-full" disabled={submitting}>
        {submitting ? "Sending…" : (<><Send className="h-4 w-4" /> Send message</>)}
      </Button>
    </form>
  );
}

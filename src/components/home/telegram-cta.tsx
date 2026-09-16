"use client";

import { useState } from "react";
import { Send, Copy, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TELEGRAM, TELEGRAM_PERKS } from "@/data/site";

const INVITE = `Join the Zuula Obusobozibwo Mentorship community on Telegram — daily encouragement, live Q&A with Joseph Prosper, and a tribe walking toward purpose together. Join here: ${TELEGRAM.url}`;

export function TelegramCTA() {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(TELEGRAM.url).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      },
      () => {},
    );
  }

  return (
    <div
      data-tgblock
      className="overflow-hidden rounded-[24px] border border-[rgba(255,45,149,.35)] bg-[linear-gradient(135deg,rgba(255,45,149,.14),rgba(139,47,214,.12))] p-8 sm:p-12"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-grad px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-white">
            <Send className="h-3.5 w-3.5" /> Telegram community
          </span>
          <h2 className="mt-5 font-display text-[clamp(24px,3.4vw,34px)] font-extrabold leading-tight text-text">
            Walk with a tribe headed toward purpose
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Join {TELEGRAM.handle} for daily encouragement, live Q&amp;A with
            Joseph Prosper, and accountability that keeps you moving.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild shape="pill">
              <a href={TELEGRAM.url} target="_blank" rel="noopener noreferrer">
                <Send className="h-4 w-4" /> Join on Telegram
              </a>
            </Button>
            <Button variant="ghost" shape="pill" onClick={copy}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Invite link copied" : "Copy invite link"}
            </Button>
            <Button
              asChild
              variant="ghost"
              shape="pill"
              className="max-sm:w-full"
            >
              <a
                href={`https://wa.me/?text=${encodeURIComponent(INVITE)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Share2 className="h-4 w-4" /> Share
              </a>
            </Button>
          </div>
        </div>

        <ul className="grid gap-3 rounded-[18px] border border-border bg-card-2 p-6 sm:grid-cols-2">
          {TELEGRAM_PERKS.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-[14px] text-text-3">
              <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-pink" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

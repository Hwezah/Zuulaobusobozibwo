"use client";

import { useState } from "react";
import { Send, Star, Copy, Check } from "lucide-react";
import { TELEGRAM, TELEGRAM_PERKS } from "@/data/site";

const TG = "#2aabee";
const INVITE = `Join the Zuula Obusobozibwo Mentorship community on Telegram — daily encouragement, live Q&A with Joseph Prosper, and a tribe walking toward purpose together. Join here: ${TELEGRAM.url}`;

export function TelegramCommunity() {
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
      className="overflow-hidden rounded-[24px] border p-8 sm:p-10"
      style={{
        borderColor: "rgba(42,171,238,.28)",
        background: "linear-gradient(135deg,rgba(42,171,238,.1),rgba(34,158,217,.05))",
      }}
    >
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* left */}
        <div>
          <span
            className="grid h-12 w-12 place-items-center rounded-[14px]"
            style={{ background: "rgba(42,171,238,.16)", color: TG }}
          >
            <Send className="h-6 w-6" />
          </span>
          <div className="mt-4 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: TG }}>
            Mentorship community
          </div>
          <h2 className="mt-2 font-display text-[clamp(24px,3.4vw,34px)] font-extrabold text-text">
            Join our Telegram
          </h2>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
            Walk the journey alongside a tribe of purpose-driven believers. Our
            private Telegram channel is where the mentorship comes alive between
            sessions.
          </p>
          <ul className="mt-5 flex flex-col gap-2.5">
            {TELEGRAM_PERKS.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-[14.5px] text-text-3">
                <Star className="h-[16px] w-[16px] shrink-0" style={{ fill: TG, color: TG }} />
                {p}
              </li>
            ))}
          </ul>
          <a
            href={TELEGRAM.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-[15px] font-bold text-white transition-transform hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg,#2aabee,#229ed9)",
              boxShadow: "0 10px 28px rgba(42,171,238,.4)",
            }}
          >
            <Send className="h-4 w-4" /> Join the channel — {TELEGRAM.handle}
          </a>
        </div>

        {/* right: invite */}
        <div className="rounded-[18px] border border-border bg-card-2 p-6">
          <h3 className="font-display text-[18px] font-bold text-text">Invite someone in</h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
            Know someone who needs this? Share the invite and bring them along.
          </p>

          <div className="mt-5 flex items-center gap-2 rounded-full border border-border-2 bg-card p-1.5">
            <span className="min-w-0 flex-1 truncate pl-3 text-[13px] text-muted">
              {TELEGRAM.url}
            </span>
            <button
              type="button"
              onClick={copy}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent-grad px-4 py-2 text-[13px] font-bold text-white"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Invite link copied" : "Copy invite link"}
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(INVITE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center rounded-full border border-border bg-card px-4 py-3 text-[13.5px] font-bold text-[#25d366] transition-colors hover:bg-card-strong"
            >
              Share on WhatsApp
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent("Join our Mentorship on Telegram")}&body=${encodeURIComponent(INVITE)}`}
              className="flex flex-1 items-center justify-center rounded-full border border-border bg-card px-4 py-3 text-[13.5px] font-bold text-text-3 transition-colors hover:bg-card-strong"
            >
              Share by email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

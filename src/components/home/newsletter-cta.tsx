"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { NEWSLETTER } from "@/data/site";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // Faked — wire to your email provider (Mailchimp / Resend / Supabase table).
    setDone(true);
  }

  return (
    <div
      className="overflow-hidden rounded-[24px] p-8 text-center sm:p-14"
      style={{ background: "linear-gradient(135deg,#ff2d95,#8b1fd4)" }}
    >
      <h2 className="font-display text-[clamp(28px,4.4vw,44px)] font-extrabold tracking-[-0.5px] text-white">
        {NEWSLETTER.title}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-white/85">
        {NEWSLETTER.desc}
      </p>

      {done ? (
        <p className="mt-7 inline-flex items-center gap-2 rounded-full bg-black/25 px-5 py-3 font-semibold text-white">
          <Check className="h-5 w-5" /> You&apos;re on the list — thank you!
        </p>
      ) : (
        <form onSubmit={submit} className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="h-12 w-full shrink-0 rounded-full border border-white/20 bg-black/25 px-5 text-[15px] text-white placeholder:text-white/60 outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:flex-1"
          />
          <button
            type="submit"
            className="h-12 shrink-0 rounded-full bg-[#0b0713] px-7 font-display text-[15px] font-bold text-white transition-transform hover:scale-[1.03]"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}

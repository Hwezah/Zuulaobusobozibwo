import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Pink-tinted "Want Joseph at your event?" banner with a white CTA button. */
export function SpeakerCTA() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6 rounded-[24px] border border-[rgba(255,45,149,.3)] bg-[linear-gradient(135deg,rgba(255,45,149,.16),rgba(139,47,214,.12))] p-8 sm:p-10">
      <div className="max-[560px]:text-center">
        <h2 className="font-display text-[clamp(24px,3.2vw,32px)] font-extrabold tracking-[-0.5px] text-text">
          Want Joseph at your event?
        </h2>
        <p className="mt-2 text-[15px] text-muted">
          Book him for keynotes, corporate sessions and conferences.
        </p>
      </div>
      <Link
        href="/booking"
        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-display text-[15px] font-bold text-[#1a1030] transition-transform hover:scale-[1.03] max-[560px]:w-full max-[560px]:justify-center"
      >
        Book a speaking date <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

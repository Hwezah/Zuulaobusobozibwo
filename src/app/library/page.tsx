import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/common";
import { LibraryView } from "@/components/library/library-view";
import { PodcastBand } from "@/components/home/podcast-band";

export const metadata: Metadata = {
  title: "Library",
  description: "Books, eBooks and audiobooks from Zuula Obusobozibwo.",
};

export default function LibraryPage() {
  return (
    <>
      <Section className="pb-0 text-center">
        <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-pink-hover">
          Library
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl font-display text-[clamp(40px,6vw,64px)] font-extrabold leading-[1.04] tracking-[-1px] text-text">
          Books &amp; audio
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
          Deepen your journey with eBooks, paperbacks and audiobooks — practical,
          biblically-grounded resources for your growth.
        </p>
      </Section>

      <Section>
        <Suspense fallback={null}>
          <LibraryView />
        </Suspense>
        <div className="mt-14">
          <PodcastBand />
        </div>
      </Section>
    </>
  );
}

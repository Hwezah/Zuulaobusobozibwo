import type { Metadata } from "next";
import { Suspense } from "react";
import { Section } from "@/components/common";
import { LibraryView } from "@/components/library/library-view";

export const metadata: Metadata = {
  title: "Library",
  description: "Books, eBooks and audiobooks from Zuula Obusobozibwo.",
};

export default function LibraryPage() {
  return (
    <Section>
      <Suspense fallback={null}>
        <LibraryView />
      </Suspense>
    </Section>
  );
}

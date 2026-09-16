import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";
import { TERMS_SECTIONS } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms governing use of Zuula Obusobozibwo services.",
};

export default function TermsPage() {
  return <LegalPage title="Terms of Use" updated="August 2025" sections={TERMS_SECTIONS} />;
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/legal";
import { PRIVACY_SECTIONS } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Zuula Obusobozibwo collects, uses and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 2025" sections={PRIVACY_SECTIONS} />
  );
}

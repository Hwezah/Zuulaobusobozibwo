import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/common";
import { IconFeatureCard } from "@/components/cards/icon-card";
import { ContactForm } from "@/components/contact/contact-form";
import { CONTACT_METHODS, CONTACTS } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Zuula Obusobozibwo.",
};

export default function ContactPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Contact"
        title="We'd love to hear from you"
        subtitle="Questions about events, mentorship or resources? Reach out any way that suits you."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_minmax(0,460px)]">
        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            {CONTACT_METHODS.map((m) => (
              <IconFeatureCard key={m.title} data={m} />
            ))}
          </div>
          <div className="mt-6 rounded-[18px] border border-border bg-card p-5">
            <div className="text-[12px] uppercase tracking-wide text-muted-2">Enquiries</div>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[15px] font-semibold text-text-3">
              {CONTACTS.enquiries.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}

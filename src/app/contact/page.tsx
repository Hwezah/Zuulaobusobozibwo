import type { Metadata } from "next";
import { Section } from "@/components/common";
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
      <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,480px)]">
        {/* Left: reach us */}
        <div>
          <div className="max-[560px]:text-center">
            <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-pink-hover">
              Contact
            </span>
            <h1 className="mt-4 font-display text-[clamp(40px,5.5vw,60px)] font-extrabold leading-[1.02] tracking-[-1px] text-text">
              We&apos;d love to <span className="text-gradient">hear from you</span>
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted max-[560px]:mx-auto">
              Questions about events, mentorship or resources? Reach out any way
              that suits you — we read every message.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {CONTACT_METHODS.map((m) => (
              <IconFeatureCard key={m.title} data={m} />
            ))}
          </div>

          <div className="mt-6 rounded-[20px] border border-border bg-card p-5">
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-2">
              Enquiries
            </div>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[15px] font-semibold text-text-3">
              {CONTACTS.enquiries.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}

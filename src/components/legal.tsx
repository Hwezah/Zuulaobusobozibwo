import { Section } from "@/components/common";

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { h: string; p: string }[];
}) {
  return (
    <Section className="max-w-3xl">
      <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-pink-hover">
        Legal
      </span>
      <h1 className="mt-4 font-display text-[clamp(30px,5vw,44px)] font-extrabold tracking-[-0.8px] text-text">
        {title}
      </h1>
      <p className="mt-2 text-[13px] text-muted-2">Last updated {updated}</p>

      <div className="mt-10 flex flex-col gap-8">
        {sections.map((s, i) => (
          <section key={s.h}>
            <div className="flex items-center gap-3">
              <span className="font-display text-[14px] font-extrabold text-pink-hover">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-display text-[20px] font-bold text-text">{s.h}</h2>
            </div>
            <p className="mt-3 text-[16px] leading-relaxed text-muted">{s.p}</p>
          </section>
        ))}
      </div>
    </Section>
  );
}

import type { Metadata } from "next";
import { Section } from "@/components/common";
import { ArticleCard } from "@/components/cards/article-card";
import { ARTICLES } from "@/data/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Practical, biblically grounded reflections to help you grow in purpose, wholeness and leadership.",
};

export default function ArticlesPage() {
  return (
    <>
      <Section className="pb-0 text-center">
        <span className="text-[13px] font-bold uppercase tracking-[0.18em] text-pink-hover">
          Articles
        </span>
        <h1 className="mx-auto mt-5 max-w-3xl font-display text-[clamp(40px,6vw,64px)] font-extrabold leading-[1.04] tracking-[-1px] text-text">
          Words for the journey
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
          Practical, biblically grounded reflections to help you grow in purpose,
          wholeness and leadership.
        </p>
      </Section>

      <Section>
        <div data-artcards className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>
    </>
  );
}

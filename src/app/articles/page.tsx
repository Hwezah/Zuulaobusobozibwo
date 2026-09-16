import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/common";
import { ArticleCard } from "@/components/cards/article-card";
import { ARTICLES } from "@/data/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Biblically-grounded reflections on purpose, stewardship, leadership and healing.",
};

export default function ArticlesPage() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Insights"
        title="Kingdom articles"
        subtitle="Reflections to help you discover your gifts, heal your inner world and step into purpose."
      />
      <div
        data-artcards
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {ARTICLES.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </Section>
  );
}

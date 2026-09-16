import Link from "next/link";
import type { Article } from "@/lib/types";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-[20px] border border-border bg-card-2 shadow-[0_6px_22px_rgba(60,30,80,.06)] transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-well">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.img}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-pink-hover">
          {article.cat}
        </span>
        <h3 className="mt-2 font-display text-[19px] font-bold leading-snug text-text">
          {article.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 text-[14px] leading-relaxed text-muted">
          {article.excerpt}
        </p>
        <span className="mt-6 text-[13px] text-muted-2">{article.read}</span>
      </div>
    </Link>
  );
}

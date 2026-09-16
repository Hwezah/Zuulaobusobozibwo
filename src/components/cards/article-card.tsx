import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
        <span className="absolute left-3 top-3 rounded-full bg-accent-grad px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          {article.cat}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2 text-[12px] text-muted-2">
          <span>{article.date}</span>
          <span aria-hidden>·</span>
          <span>{article.read}</span>
        </div>
        <h3 className="font-display text-[18px] font-bold leading-snug text-text">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-[14px] text-muted">{article.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[13px] font-semibold text-pink-hover">
          Read article
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

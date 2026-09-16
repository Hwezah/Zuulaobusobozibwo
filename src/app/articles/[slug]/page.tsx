import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { ARTICLES, getArticle } from "@/data/articles";
import { ArticleCard } from "@/components/cards/article-card";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Article not found" };
  return {
    title: a.title,
    description: a.excerpt,
    openGraph: { title: a.title, description: a.excerpt, images: [a.img] },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const related = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);
  const hasBody = a.sections.length > 0;

  return (
    <article className="pb-8">
      {/* Hero image */}
      <div className="relative h-[38vh] min-h-[280px] w-full overflow-hidden bg-well">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={a.img} alt={a.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      <div className="mx-auto -mt-24 max-w-[720px]">
        <div
          data-artsec
          className="rounded-t-[24px] border border-border bg-panel px-[22px] pb-10 pt-8 sm:px-8"
        >
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-muted transition-colors hover:text-text"
          >
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>

          <div className="mt-5 flex items-center gap-2 text-[13px] text-muted-2">
            <span className="rounded-full bg-accent-grad px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              {a.cat}
            </span>
            <span>{a.date}</span>
            <span aria-hidden>·</span>
            <span>{a.read}</span>
          </div>

          <h1
            data-arttitle
            className="mt-4 font-display text-[clamp(28px,4.4vw,40px)] font-extrabold leading-[1.08] tracking-[-0.8px] text-text"
          >
            {a.title}
          </h1>
          <p className="mt-3 text-[16px] italic text-muted">{a.kicker}</p>
        </div>

        <div
          data-artsec
          className="border-x border-b border-border bg-panel px-[22px] pb-12 sm:px-8"
        >
          {/* Lede */}
          <div className="border-l-2 border-[var(--pink)] pl-5">
            {a.lede.map((t, i) => (
              <p
                key={i}
                className="mb-4 font-serif text-[18px] leading-[1.7] text-text-2 last:mb-0"
              >
                {t}
              </p>
            ))}
          </div>

          {/* Body sections */}
          {hasBody ? (
            <div className="mt-10 flex flex-col gap-10">
              {a.sections.map((s, i) => (
                <section key={s.h}>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[14px] font-extrabold text-pink-hover">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-[22px] font-extrabold text-text">
                      {s.h}
                    </h2>
                  </div>
                  {s.paras.map((p, pi) => (
                    <p key={pi} className="mt-4 font-serif text-[17px] leading-[1.75] text-text-3">
                      {p}
                    </p>
                  ))}
                  {s.bullets.length > 0 && (
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {s.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2.5 text-[16px] text-text-3">
                          <Check className="mt-1 h-[18px] w-[18px] shrink-0 text-pink" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.after && (
                    <p className="mt-4 rounded-[14px] border border-border bg-card px-5 py-4 font-serif text-[16px] italic leading-relaxed text-text-2">
                      {s.after}
                    </p>
                  )}
                </section>
              ))}

              {/* Reflect */}
              {a.reflect.length > 0 && (
                <section className="rounded-[18px] border border-[rgba(255,45,149,.3)] bg-[linear-gradient(135deg,rgba(255,45,149,.08),rgba(139,47,214,.06))] p-6">
                  <h2 className="flex items-center gap-2 font-display text-[18px] font-extrabold text-text">
                    <Sparkles className="h-5 w-5 text-pink" /> Reflect
                  </h2>
                  <ul className="mt-4 flex flex-col gap-3">
                    {a.reflect.map((r, ri) => (
                      <li key={ri} className="flex gap-3 text-[16px] text-text-3">
                        <span className="font-display font-extrabold text-pink-hover">
                          {ri + 1}
                        </span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Actions */}
              {a.actions.length > 0 && (
                <section>
                  <h2 className="font-display text-[20px] font-extrabold text-text">
                    Take action
                  </h2>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {a.actions.map((ac, ai) => (
                      <li key={ai} className="flex items-start gap-2.5 text-[16px] text-text-3">
                        <Check className="mt-1 h-[18px] w-[18px] shrink-0 text-pink" />
                        <span>{ac}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {a.close && (
                <p className="font-serif text-[17px] leading-[1.75] text-text-2">{a.close}</p>
              )}
            </div>
          ) : (
            <p className="mt-8 rounded-[14px] border border-border bg-card px-5 py-6 text-center text-[15px] text-muted">
              The full article is being prepared. Check back soon.
            </p>
          )}
        </div>
      </div>

      {/* Related */}
      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-[22px] font-extrabold text-text">Keep reading</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => (
            <ArticleCard key={r.slug} article={r} />
          ))}
        </div>
      </div>
    </article>
  );
}

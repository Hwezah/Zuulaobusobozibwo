import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { ARTICLES, getArticle } from "@/data/articles";
import { AUTHOR } from "@/data/site";
import { ArticleCard } from "@/components/cards/article-card";
import { ImageWell } from "@/components/image-well";

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
    <article className="pb-4">
      {/* Header */}
      <div data-artsec className="mx-auto max-w-3xl px-6 pt-10 sm:px-8">
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-muted transition-colors hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>

        <header className="mt-8">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[rgba(255,45,149,.4)] bg-[rgba(255,45,149,.1)] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-pink-hover">
              {a.cat}
            </span>
            <span className="text-[13px] text-muted-2">{a.read}</span>
          </div>

          <h1
            data-arttitle
            className="mt-4 font-display text-[clamp(30px,4.6vw,48px)] font-extrabold leading-[1.06] tracking-[-0.8px] text-text"
          >
            {a.title}
          </h1>
          <p className="mt-4 font-serif text-[19px] italic leading-relaxed text-text-2">
            {a.kicker}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <ImageWell
              src={AUTHOR.img}
              initials={AUTHOR.initials}
              className="h-11 w-11 shrink-0 rounded-full text-[14px]"
            />
            <div>
              <div className="font-display text-[14px] font-bold text-text">{AUTHOR.name}</div>
              <div className="text-[13px] text-muted-2">{a.date}</div>
            </div>
          </div>
          <hr className="mt-6 border-t border-border" />
        </header>
      </div>

      {/* Featured image */}
      <div className="mx-auto mt-8 max-w-4xl px-6 sm:px-8">
        <ImageWell
          src={a.img}
          label={a.title}
          className="aspect-[16/9] w-full rounded-[22px] border border-border"
        />
      </div>

      {/* Body */}
      <div data-artsec className="mx-auto mt-10 max-w-3xl px-6 sm:px-8">
        {/* Lede */}
        <div className="flex flex-col gap-4">
          {a.lede.map((t, i) => (
            <p key={i} className="text-[17px] leading-[1.75] text-text-2">
              {t}
            </p>
          ))}
        </div>

        {hasBody ? (
          <div className="mt-10 flex flex-col gap-10">
            {a.sections.map((s, i) => (
              <section key={s.h}>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-[14px] font-extrabold text-pink-hover">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-[24px] font-extrabold text-text">{s.h}</h2>
                </div>
                {s.paras.map((p, pi) => (
                  <p key={pi} className="mt-4 text-[16.5px] leading-[1.75] text-text-3">
                    {p}
                  </p>
                ))}
                {s.bullets.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-3">
                    {s.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 text-[16px] leading-relaxed text-text-3">
                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-pink" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.after && (
                  <blockquote className="mt-5 border-l-2 border-[var(--pink)] pl-5 font-serif text-[17px] leading-relaxed text-text-2">
                    {s.after}
                  </blockquote>
                )}
              </section>
            ))}

            {/* Reflection + Action */}
            {(a.reflect.length > 0 || a.actions.length > 0) && (
              <div className="grid gap-5 sm:grid-cols-2">
                {a.reflect.length > 0 && (
                  <div className="rounded-[18px] border border-border bg-card-2 p-6">
                    <h3 className="font-display text-[16px] font-bold text-text">
                      Reflection questions
                    </h3>
                    <ul className="mt-4 flex flex-col gap-4">
                      {a.reflect.map((r, ri) => (
                        <li key={ri} className="flex gap-3">
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[rgba(139,47,214,.22)] text-[12px] font-bold text-pink-hover">
                            {ri + 1}
                          </span>
                          <span className="text-[14px] leading-relaxed text-text-3">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {a.actions.length > 0 && (
                  <div className="rounded-[18px] border border-[rgba(255,45,149,.3)] bg-[rgba(255,45,149,.06)] p-6">
                    <h3 className="font-display text-[16px] font-bold text-text">Action steps</h3>
                    <ul className="mt-4 flex flex-col gap-4">
                      {a.actions.map((ac, ai) => (
                        <li key={ai} className="flex gap-2.5">
                          <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-pink" />
                          <span className="text-[14px] leading-relaxed text-text-3">{ac}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {a.close && (
              <div className="rounded-[20px] border border-[rgba(139,47,214,.3)] bg-[linear-gradient(135deg,rgba(139,47,214,.14),rgba(255,45,149,.06))] p-8">
                <p className="font-serif text-[18px] leading-relaxed text-text-2">{a.close}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="mt-8 rounded-[14px] border border-border bg-card px-5 py-6 text-center text-[15px] text-muted">
            The full article is being prepared. Check back soon.
          </p>
        )}

        {/* Author */}
        <div className="mt-12 flex items-start gap-5 rounded-[20px] border border-border bg-card-2 p-6 max-[560px]:flex-col max-[560px]:items-center max-[560px]:text-center">
          <ImageWell
            src={AUTHOR.img}
            initials={AUTHOR.initials}
            className="h-16 w-16 shrink-0 rounded-full text-[18px]"
          />
          <div>
            <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-pink-hover">
              Written by
            </div>
            <div className="mt-1 font-display text-[18px] font-bold text-text">{AUTHOR.name}</div>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">{AUTHOR.bio}</p>
            <Link
              href="/booking"
              className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-pink-hover"
            >
              Book Joseph to speak <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Keep reading */}
      <div className="mx-auto mt-16 max-w-4xl px-6 sm:px-8">
        <h2 className="font-display text-[24px] font-extrabold text-text">Keep reading</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => (
            <ArticleCard key={r.slug} article={r} />
          ))}
        </div>
      </div>
    </article>
  );
}

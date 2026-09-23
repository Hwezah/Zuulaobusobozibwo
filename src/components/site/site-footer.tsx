import Link from "next/link";
import { Phone } from "lucide-react";
import { Logo } from "./logo";
import { SOCIAL_LINKS, FOOTER } from "@/data/site";

const COLUMNS: { key: string; heading: string; links: { href: string; label: string }[] }[] = [
  {
    key: "explore",
    heading: "Explore",
    links: [
      { href: "/mentorship", label: "Mentorship" },
      { href: "/events", label: "Events" },
      { href: "/booking", label: "Book Joseph" },
      { href: "/library", label: "Library" },
    ],
  },
  {
    key: "resources",
    heading: "Resources",
    links: [
      { href: "/library?filter=eBook", label: "eBooks" },
      { href: "/library?filter=Audiobook", label: "Audio" },
      { href: "/podcast", label: "Podcast" },
      { href: "/articles", label: "Articles" },
    ],
  },
  {
    key: "company",
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms" },
      { href: "/admin", label: "Team login" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-panel">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div
          data-ftop
          className="flex flex-wrap gap-y-10 lg:grid lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-10"
        >
          <div data-fbrand className="order-1 flex w-full flex-col items-center gap-4 text-center lg:w-auto lg:items-start lg:text-left">
            <Logo />
            <p className="max-w-xs text-[14px] leading-relaxed text-muted">{FOOTER.blurb}</p>
            <div data-fcontacts className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] font-semibold text-text-3 lg:justify-start">
              <Phone className="h-4 w-4 text-pink" />
              {FOOTER.phones.map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>

          {COLUMNS.map((col, i) => (
            <div key={col.key} data-fcol className="min-w-[120px] flex-1" style={{ order: i + 2 }}>
              <h4 className="mb-4 text-[13px] font-bold uppercase tracking-[0.16em] text-muted-2">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-[14px] text-muted transition-colors hover:text-pink-hover">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div data-fsocialrow className="mt-12 flex flex-wrap gap-2.5">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.handle}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-chip px-6 py-2.5 text-[12.5px] font-semibold text-text-3 transition-colors hover:border-border-strong hover:text-text sm:flex-none"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div
          data-fbottom
          className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-6 text-[13px] text-muted-2"
        >
          <span className="flex-1 whitespace-nowrap">
            © {new Date().getFullYear()} Zuula Obusobozibwo. All rights reserved.
          </span>
          <span className="flex-1 text-right max-[560px]:basis-full max-[560px]:text-center">
            Website developed by{" "}
            <span className="font-semibold text-text-3">{FOOTER.developer.name}</span> —{" "}
            {FOOTER.developer.phone}
          </span>
        </div>
      </div>
    </footer>
  );
}

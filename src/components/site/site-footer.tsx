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
      <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 lg:px-8">
        {/* Brand */}
        <div data-fbrand className="flex flex-col items-center gap-4">
          <Logo />
          <p className="max-w-md text-[14px] leading-relaxed text-muted">{FOOTER.blurb}</p>
          <div
            data-fcontacts
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] font-semibold text-text-3"
          >
            <Phone className="h-4 w-4 text-pink" />
            {FOOTER.phones.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>

        {/* Nav — three equal, centered columns at every width */}
        <div data-ftop className="mt-12 grid grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-8">
          {COLUMNS.map((col) => (
            <nav key={col.key} data-fcol aria-label={col.heading}>
              <h4 className="mb-4 text-[13px] font-bold uppercase tracking-[0.16em] text-muted-2">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-[14px] text-muted transition-colors hover:text-pink-hover"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Socials — centered, wrapping row */}
        <div data-fsocialrow className="mt-12 flex flex-wrap justify-center gap-2.5">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.handle}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-chip px-5 py-2.5 text-[12.5px] font-semibold text-text-3 transition-colors hover:border-border-strong hover:text-text"
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Bottom — side by side whenever both fit, else centered stack */}
        <div
          data-fbottom
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-border pt-6 text-center text-[13px] text-muted-2 sm:justify-between sm:text-left"
        >
          <span>© {new Date().getFullYear()} Zuula Obusobozibwo. All rights reserved.</span>
          <span>
            Website developed by{" "}
            <span className="font-semibold text-text-3">{FOOTER.developer.name}</span> —{" "}
            {FOOTER.developer.phone}
          </span>
        </div>
      </div>
    </footer>
  );
}

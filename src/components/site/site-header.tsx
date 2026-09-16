"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { Logo } from "./logo";
import { NAV_LINKS, SECONDARY_LINKS } from "./nav-links";
import { SearchDialog } from "./search-dialog";
import { CartDrawer } from "./cart-drawer";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-chip text-text transition-colors hover:border-border-strong"
    >
      {children}
    </button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border backdrop-blur-xl" style={{ background: "var(--header)" }}>
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <Logo />

          <nav data-nav className="mx-auto hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-semibold transition-colors",
                  isActive(l.href) ? "text-text" : "text-muted hover:text-text",
                )}
              >
                {l.label}
                {"live" in l && l.live && (
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rounded-full bg-pink"
                    style={{ animation: "evdot 1.9s ease-in-out infinite" }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0 lg:gap-3">
            <Link
              href="/booking"
              className="hidden text-[14px] font-semibold text-muted transition-colors hover:text-text lg:inline"
            >
              Book Joseph
            </Link>
            <Button asChild shape="pill" size="sm" className="hidden lg:inline-flex">
              <Link href="/mentorship">Join Mentorship</Link>
            </Button>
            <IconButton label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-[18px] w-[18px]" />
            </IconButton>
            <IconButton label="Open cart" onClick={() => setOpen(true)}>
              <ShoppingBag className="h-[18px] w-[18px]" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent-grad px-1 text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </IconButton>
            <button
              data-mobmenu
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-chip text-text lg:hidden"
            >
              <Menu className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <CartDrawer />

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-4/5 max-w-xs">
          <div className="border-b border-border px-5 py-5">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Logo onClick={() => setMenuOpen(false)} />
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
            {[...NAV_LINKS, ...SECONDARY_LINKS].map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-[12px] px-4 py-3 text-[16px] font-semibold transition-colors",
                  isActive(l.href) ? "bg-chip text-text" : "text-muted hover:bg-card hover:text-text",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-border p-4">
            <Button asChild shape="pill" className="w-full">
              <Link href="/mentorship" onClick={() => setMenuOpen(false)}>
                Join Mentorship
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

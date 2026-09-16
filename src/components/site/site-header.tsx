"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Search, ShoppingBag, Sun } from "lucide-react";
import { Logo } from "./logo";
import { NAV_LINKS, SECONDARY_LINKS } from "./nav-links";
import { SearchDialog } from "./search-dialog";
import { CartDrawer } from "./cart-drawer";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/cart-context";
import { useTheme } from "@/context/theme-context";
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
  const { theme, toggle } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border backdrop-blur-xl" style={{ background: "var(--header)" }}>
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Logo />

          <nav data-nav className="mx-auto hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "rounded-full px-4 py-2 text-[14px] font-semibold transition-colors",
                  isActive(l.href)
                    ? "bg-chip text-text"
                    : "text-muted hover:text-text",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <IconButton label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-[18px] w-[18px]" />
            </IconButton>
            <IconButton label="Toggle theme" onClick={toggle}>
              {theme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </IconButton>
            <IconButton label="Open cart" onClick={() => setOpen(true)}>
              <ShoppingBag className="h-[18px] w-[18px]" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent-grad px-1 text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </IconButton>
            <Button asChild shape="pill" size="sm" className="hidden lg:inline-flex">
              <Link href="/booking">Book Joseph</Link>
            </Button>
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
                key={l.href}
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
              <Link href="/booking" onClick={() => setMenuOpen(false)}>
                Book Joseph to speak
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

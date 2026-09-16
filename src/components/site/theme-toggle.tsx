"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/theme-context";

/** Floating theme switch, fixed bottom-right (matches the design). */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light / dark theme"
      className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-accent-grad text-white shadow-[0_10px_28px_rgba(255,45,149,.4)] transition-transform hover:scale-105"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}

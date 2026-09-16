"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface AdminCtx {
  authed: boolean;
  unlock: (pin: string) => boolean;
  lock: () => void;
}

const Ctx = createContext<AdminCtx | null>(null);
const KEY = "zuula-team-auth";

/**
 * Prototype-parity PIN gate (current year, e.g. "2026").
 * TODO(auth): replace with Supabase Auth — email/password or magic link,
 * server-side sessions, and role checks on every /api/admin/* route.
 * See BACKEND_SPEC.md "Admin auth".
 */
function teamPin() {
  return String(new Date().getFullYear());
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === teamPin()) setAuthed(true);
    } catch {}
  }, []);

  const unlock = useCallback((pin: string) => {
    if (pin.trim() === teamPin()) {
      try {
        localStorage.setItem(KEY, teamPin());
      } catch {}
      setAuthed(true);
      return true;
    }
    return false;
  }, []);

  const lock = useCallback(() => {
    try {
      localStorage.removeItem(KEY);
    } catch {}
    setAuthed(false);
  }, []);

  return <Ctx.Provider value={{ authed, unlock, lock }}>{children}</Ctx.Provider>;
}

export function useAdmin() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAdmin must be used within AdminProvider");
  return c;
}

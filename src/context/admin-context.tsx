"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface UnlockResult {
  ok: boolean;
  error?: string;
}

interface AdminCtx {
  authed: boolean;
  /** false until the first server session check finishes (avoids a login flash). */
  ready: boolean;
  unlock: (pin: string) => Promise<UnlockResult>;
  lock: () => void;
  /** Call when an admin API returns 401 — the session ended; show the login again. */
  expire: () => void;
}

const Ctx = createContext<AdminCtx | null>(null);

/**
 * Admin sign-in state. The server owns the truth: a signed httpOnly cookie set
 * by /api/admin/login and checked by every /api/admin/* route. This context
 * only mirrors it so the screen knows whether to show the passcode gate.
 */
export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((d) => alive && setAuthed(Boolean(d?.authed)))
      .catch(() => {})
      .finally(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, []);

  const unlock = useCallback(async (pin: string): Promise<UnlockResult> => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      if (res.ok) {
        setAuthed(true);
        return { ok: true };
      }
      const d = await res.json().catch(() => null);
      return { ok: false, error: d?.error ?? "Could not sign in." };
    } catch {
      return { ok: false, error: "Network error — try again." };
    }
  }, []);

  const lock = useCallback(() => {
    void fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    setAuthed(false);
  }, []);

  const expire = useCallback(() => setAuthed(false), []);

  return (
    <Ctx.Provider value={{ authed, ready, unlock, lock, expire }}>{children}</Ctx.Provider>
  );
}

export function useAdmin() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAdmin must be used within AdminProvider");
  return c;
}

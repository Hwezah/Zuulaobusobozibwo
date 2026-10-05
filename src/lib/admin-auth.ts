import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Server-checked admin session. The team enters a passcode once; the server
 * checks it against ADMIN_PIN and sets a signed, httpOnly cookie. Every
 * /api/admin/* route calls requireAdmin() — the screen alone is never trusted.
 *
 * Fails closed: in production with no ADMIN_PIN set, nobody can log in. (Local
 * dev falls back to the prototype's "current year" PIN so the demo still works.)
 */
export const ADMIN_COOKIE = "zuula_admin";
export const SESSION_SECONDS = 60 * 60 * 12; // 12h

const isProd = process.env.NODE_ENV === "production";

function pin(): string | null {
  const p = process.env.ADMIN_PIN?.trim();
  if (p) return p;
  return isProd ? null : String(new Date().getFullYear());
}

export function adminConfigured(): boolean {
  return pin() !== null;
}

/** Signing key: ADMIN_SESSION_SECRET if set, else derived from the PIN (so changing the PIN logs everyone out). */
function signingKey(): string {
  return process.env.ADMIN_SESSION_SECRET || `zuula-admin|${pin() ?? ""}`;
}

function sign(exp: string): string {
  return createHmac("sha256", signingKey()).update(exp).digest("base64url");
}

const digest = (s: string) => createHash("sha256").update(s).digest();

export function checkPin(input: string): boolean {
  const expected = pin();
  if (!expected) return false;
  return timingSafeEqual(digest(input.trim()), digest(expected));
}

export function issueToken(): string {
  const exp = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  return `${exp}.${sign(exp)}`;
}

function validToken(token: string | undefined): boolean {
  if (!token || !adminConfigured()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  if (!(Number(exp) > Date.now() / 1000)) return false;
  const a = Buffer.from(sig);
  const b = Buffer.from(sign(exp));
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return validToken(store.get(ADMIN_COOKIE)?.value);
}

/** Returns a 401 response when the caller is not a logged-in admin, else null. */
export async function requireAdmin(): Promise<NextResponse | null> {
  if (await isAdmin()) return null;
  return NextResponse.json({ error: "Not signed in" }, { status: 401 });
}

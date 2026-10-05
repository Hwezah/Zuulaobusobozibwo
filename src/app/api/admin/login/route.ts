import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  SESSION_SECONDS,
  adminConfigured,
  checkPin,
  issueToken,
} from "@/lib/admin-auth";

// Best-effort brute-force brake: 5 wrong tries per IP, then a 15-minute lock.
// In-memory, so it is per server instance (a real limiter needs shared storage).
const fails = new Map<string, { n: number; until: number }>();
const MAX_TRIES = 5;
const LOCK_MS = 15 * 60 * 1000;

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: "Admin login is not configured. Set ADMIN_PIN on the server." },
      { status: 503 },
    );
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const rec = fails.get(ip);
  if (rec && rec.until > now) {
    return NextResponse.json(
      { error: "Too many wrong attempts. Try again in a few minutes." },
      { status: 429 },
    );
  }

  let given = "";
  try {
    const body = await req.json();
    given = typeof body?.pin === "string" ? body.pin : "";
  } catch {
    // fall through: empty PIN is simply wrong
  }

  if (!checkPin(given)) {
    const n = (rec?.n ?? 0) + 1;
    fails.set(ip, n >= MAX_TRIES ? { n: 0, until: now + LOCK_MS } : { n, until: 0 });
    return NextResponse.json({ error: "Incorrect passcode." }, { status: 401 });
  }

  fails.delete(ip);
  const store = await cookies();
  store.set(ADMIN_COOKIE, issueToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  return NextResponse.json({ ok: true });
}

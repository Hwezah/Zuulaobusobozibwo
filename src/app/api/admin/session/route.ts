import { NextResponse } from "next/server";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";

/** Lets the admin screen ask the server whether the cookie is still valid. */
export async function GET() {
  return NextResponse.json({ authed: await isAdmin(), configured: adminConfigured() });
}

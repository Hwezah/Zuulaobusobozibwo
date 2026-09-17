import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { ugx } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/types";

/**
 * Admin order list. When Supabase is configured this returns real orders so the
 * team panel reflects what buyers submit (on any device). Until then it reports
 * { configured: false } and the panel falls back to its local demo store.
 *
 * HOLD SPOT (auth): gate this behind an authenticated admin session before it
 * returns buyer data — never rely on the UI PIN alone (PAYMENT_FLOW.md §5).
 */
interface OrderRow {
  id: string;
  ref: string;
  customer_name: string;
  customer_phone: string;
  provider: string;
  amount: number;
  items_summary: string;
  status: string;
  reject_reason: string | null;
  created_at: string;
}

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const mins = Math.max(0, Math.round((Date.now() - then) / 60000));
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.round(hrs / 24);
  return `${days} d ago`;
}

/** DB status enum -> the client's Order status (which has no awaiting/expired). */
function clientStatus(s: string): OrderStatus {
  if (s === "confirmed" || s === "paid") return "confirmed";
  if (s === "failed" || s === "expired") return "failed";
  return "pending";
}

function toLocalPhone(e164: string): string {
  const d = e164.replace(/[^0-9]/g, "");
  if (d.startsWith("256") && d.length === 12) return "0" + d.slice(3);
  return e164;
}

function rowToOrder(r: OrderRow): Order {
  return {
    id: r.id,
    ref: r.ref,
    name: r.customer_name,
    phone: toLocalPhone(r.customer_phone),
    provider: r.provider === "airtel" ? "Airtel Money" : "MTN Mobile Money",
    amount: r.amount,
    amountLabel: ugx(r.amount),
    items: r.items_summary,
    when: relativeTime(r.created_at),
    status: clientStatus(r.status),
    reason: r.reject_reason ?? undefined,
  };
}

export async function GET(req: Request) {
  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ configured: false, orders: [] });
  }

  const status = new URL(req.url).searchParams.get("status");
  let query = supabase
    .from("orders")
    .select(
      "id, ref, customer_name, customer_phone, provider, amount, items_summary, status, reject_reason, created_at",
    )
    .order("created_at", { ascending: false });
  if (status && status !== "all") query = query.eq("status", status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    configured: true,
    orders: (data as OrderRow[] | null ?? []).map(rowToOrder),
  });
}

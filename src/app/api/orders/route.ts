import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { makeRef, toE164, itemsSummary, type CheckoutItem } from "@/lib/order";

interface Body {
  name: string;
  phone: string;
  provider: string; // "MTN Mobile Money" | "Airtel Money"
  items: CheckoutItem[];
}

function providerEnum(p: string): "mtn" | "airtel" {
  return p.toLowerCase().includes("airtel") ? "airtel" : "mtn";
}

/**
 * Create an order. In production this also initiates a Mobile Money
 * request-to-pay (see BACKEND_SPEC.md) and the client polls GET /api/orders/:id.
 * Without Supabase configured it returns a stub so the prototype flow works.
 */
export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const items = Array.isArray(body.items) ? body.items : [];
  if (name.length < 3 || items.length === 0) {
    return NextResponse.json({ error: "Missing name or items" }, { status: 422 });
  }

  const ref = makeRef();
  const amount = items.reduce((n, i) => n + i.unitPrice * i.qty, 0);
  const phone = toE164(body.phone ?? "");

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ref, orderId: null, amount, stub: true });
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ ref, orderId: null, amount, stub: true });
  }

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      ref,
      customer_name: name,
      customer_phone: phone,
      provider: providerEnum(body.provider),
      amount,
      items_summary: itemsSummary(items),
      status: "pending",
    })
    .select("id")
    .single();

  if (error || !order) {
    return NextResponse.json({ error: error?.message ?? "Insert failed" }, { status: 500 });
  }

  await supabase.from("order_items").insert(
    items.map((i) => ({
      order_id: order.id,
      product_id: i.productId,
      title: i.title,
      tier: i.tier ?? null,
      unit_price: i.unitPrice,
      qty: i.qty,
    })),
  );

  return NextResponse.json({ ref, orderId: order.id, amount });
}

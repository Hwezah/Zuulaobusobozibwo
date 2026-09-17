"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { Order } from "@/lib/types";

interface OrdersCtx {
  orders: Order[];
  addOrder: (o: Order) => void;
  confirm: (ref: string) => void;
  remind: (ref: string) => void;
  reject: (ref: string, reason?: string) => void;
  pendingCount: number;
}

const Ctx = createContext<OrdersCtx | null>(null);

/**
 * Seed orders mirror the prototype's admin console. In production these come
 * from Supabase via /api/admin/orders — this context is the client-side demo
 * store that keeps the faked confirm/remind flow working without a database.
 */
const SEED: Order[] = [
  { ref: "ZB-104882", name: "Sarah Nakato", phone: "0772 431 909", provider: "MTN Mobile Money", amount: 30000, amountLabel: "UGX 30,000", items: "1 × Kingdom Business Summit 2026 — VIP", when: "4 min ago", status: "pending" },
  { ref: "ZB-104881", name: "Daniel Okello", phone: "0754 118 260", provider: "Airtel Money", amount: 10000, amountLabel: "UGX 10,000", items: "1 × Kingdom Business Summit 2026 — Ordinary", when: "18 min ago", status: "pending" },
  { ref: "ZB-104879", name: "Grace Kirabo", phone: "0782 907 344", provider: "MTN Mobile Money", amount: 500000, amountLabel: "UGX 500,000", items: "1 × Kingdom Business Summit 2026 — A Table", when: "1 hr ago", status: "confirmed" },
];

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(SEED);

  const addOrder = useCallback((o: Order) => setOrders((s) => [o, ...s]), []);

  const confirm = useCallback(
    (ref: string) =>
      setOrders((s) => s.map((o) => (o.ref === ref ? { ...o, status: "confirmed" } : o))),
    [],
  );

  const remind = useCallback(
    (ref: string) =>
      setOrders((s) => s.map((o) => (o.ref === ref ? { ...o, status: "reminded" } : o))),
    [],
  );

  // Confirmed orders never leave that state; a declined order is resolved, not
  // pending — so both are excluded from the "awaiting confirmation" count.
  const reject = useCallback(
    (ref: string, reason?: string) =>
      setOrders((s) =>
        s.map((o) =>
          o.ref === ref && o.status !== "confirmed"
            ? { ...o, status: "failed", reason }
            : o,
        ),
      ),
    [],
  );

  const pendingCount = orders.filter(
    (o) => o.status === "pending" || o.status === "reminded",
  ).length;

  return (
    <Ctx.Provider value={{ orders, addOrder, confirm, remind, reject, pendingCount }}>
      {children}
    </Ctx.Provider>
  );
}

export function useOrders() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useOrders must be used within OrdersProvider");
  return c;
}

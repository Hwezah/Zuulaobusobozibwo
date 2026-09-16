"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ALL_PRODUCTS, getProductById } from "@/data/products";
import type { Product } from "@/lib/types";

export interface CartLine {
  product: Product;
  qty: number;
  lineTotal: number;
}

interface CartCtx {
  cart: Record<string, number>;
  add: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  qtyOf: (id: string) => number;
  count: number;
  total: number;
  lines: CartLine[];
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Ctx = createContext<CartCtx | null>(null);
const KEY = "zuula-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = useCallback((next: Record<string, number>) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const add = useCallback(
    (id: string) => {
      setCart((s) => {
        const next = { ...s, [id]: (s[id] || 0) + 1 };
        persist(next);
        return next;
      });
      setOpen(true);
    },
    [persist],
  );

  const inc = useCallback(
    (id: string) =>
      setCart((s) => {
        const next = { ...s, [id]: (s[id] || 0) + 1 };
        persist(next);
        return next;
      }),
    [persist],
  );

  const dec = useCallback(
    (id: string) =>
      setCart((s) => {
        const n = (s[id] || 0) - 1;
        const next = { ...s };
        if (n <= 0) delete next[id];
        else next[id] = n;
        persist(next);
        return next;
      }),
    [persist],
  );

  const remove = useCallback(
    (id: string) =>
      setCart((s) => {
        const next = { ...s };
        delete next[id];
        persist(next);
        return next;
      }),
    [persist],
  );

  const clear = useCallback(() => {
    setCart({});
    persist({});
  }, [persist]);

  const qtyOf = useCallback((id: string) => cart[id] || 0, [cart]);

  const lines = useMemo<CartLine[]>(() => {
    return ALL_PRODUCTS.map((product) => {
      const qty = cart[product.id] || 0;
      return qty > 0 ? { product, qty, lineTotal: product.priceVal * qty } : null;
    }).filter(Boolean) as CartLine[];
  }, [cart]);

  const count = useMemo(
    () => Object.values(cart).reduce((n, q) => n + q, 0),
    [cart],
  );

  const total = useMemo(
    () =>
      Object.entries(cart).reduce((n, [id, q]) => {
        const p = getProductById(id);
        return n + (p ? p.priceVal * q : 0);
      }, 0),
    [cart],
  );

  return (
    <Ctx.Provider
      value={{ cart, add, inc, dec, remove, clear, qtyOf, count, total, lines, open, setOpen }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}

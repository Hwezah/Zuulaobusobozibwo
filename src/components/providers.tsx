"use client";

import { ThemeProvider } from "@/context/theme-context";
import { CartProvider } from "@/context/cart-context";
import { OrdersProvider } from "@/context/orders-context";
import { AdminProvider } from "@/context/admin-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <CartProvider>
        <OrdersProvider>
          <AdminProvider>{children}</AdminProvider>
        </OrdersProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

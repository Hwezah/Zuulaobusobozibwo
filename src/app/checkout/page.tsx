import type { Metadata } from "next";
import { Section } from "@/components/common";
import { CheckoutView } from "@/components/checkout/checkout-view";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Pay by Mobile Money (MTN or Airtel) to confirm your order.",
};

export default function CheckoutPage() {
  return (
    <Section>
      <div className="mb-8">
        <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-pink-hover">
          Checkout
        </span>
        <h1 className="mt-2 font-display text-[clamp(28px,4vw,40px)] font-extrabold tracking-[-0.5px] text-text">
          Complete your order
        </h1>
      </div>
      <CheckoutView />
    </Section>
  );
}

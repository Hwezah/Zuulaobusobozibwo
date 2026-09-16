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
      <h1 className="mb-8 font-display text-[clamp(28px,4vw,40px)] font-extrabold tracking-[-0.5px] text-text">
        Checkout
      </h1>
      <CheckoutView />
    </Section>
  );
}

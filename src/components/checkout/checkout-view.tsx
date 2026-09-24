"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useOrders } from "@/context/orders-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ImageWell } from "@/components/image-well";
import { PAY, PAY_STEPS, NEXT_STEPS } from "@/data/site";
import { isValidUgPhone, makeRef, itemsSummary } from "@/lib/order";
import { ugx, cn } from "@/lib/utils";

const PROVIDERS = ["MTN Mobile Money", "Airtel Money"] as const;

export function CheckoutView() {
  const { lines, total, count, clear } = useCart();
  const { addOrder } = useOrders();

  const [provider, setProvider] = useState<(typeof PROVIDERS)[number]>("MTN Mobile Money");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attested, setAttested] = useState(false);
  const [touched, setTouched] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [paidTotal, setPaidTotal] = useState("");

  const pay = provider === "Airtel Money" ? PAY["Airtel Money"] : PAY["MTN Mobile Money"];
  const nameOk = name.trim().length >= 3;
  const phoneOk = isValidUgPhone(phone);
  const formValid = nameOk && phoneOk && attested;

  function copyNumber() {
    navigator.clipboard?.writeText(pay.raw).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => {},
    );
  }

  async function submit() {
    if (submitting) return;
    if (!formValid) {
      setTouched(true);
      return;
    }
    setSubmitting(true);

    const items = lines.map((l) => ({
      productId: l.product.id,
      title: l.product.title,
      tier: l.product.eventId ? l.product.title.split("—").pop()?.trim() : undefined,
      unitPrice: l.product.priceVal,
      qty: l.qty,
    }));
    const totalLabel = ugx(total);

    // Best-effort: create the order server-side (Supabase-ready). The demo
    // also records it in the client store so the admin console reflects it.
    let ref = makeRef();
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), provider, items }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.ref) ref = data.ref;
      }
    } catch {
      // offline / not configured — keep the local ref
    }

    addOrder({
      ref,
      name: name.trim(),
      phone: phone.trim(),
      provider,
      amount: total,
      amountLabel: totalLabel,
      items: itemsSummary(items),
      when: "Just now",
      status: "pending",
    });

    setTimeout(() => {
      setSubmitting(false);
      setPaidTotal(totalLabel);
      setDone(true);
      clear();
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {}
    }, 900);
  }

  // ----- payment submitted (awaiting manual/SMS confirmation) -----
  if (done) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-[22px] border border-border bg-card-2 p-8 text-center sm:p-10">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-grad text-white">
            <Check className="h-8 w-8" strokeWidth={3} />
          </span>
          <h1 className="mt-6 font-display text-[26px] font-extrabold text-text">
            Payment submitted
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            We&apos;ve received your order for{" "}
            <span className="font-semibold text-text-3">{paidTotal}</span>. We&apos;ll
            confirm your Mobile Money payment and send your ticket by SMS.
          </p>
        </div>

        <ol className="mt-6 flex flex-col gap-3">
          {NEXT_STEPS.map((s, i) => (
            <li key={s.t} className="flex gap-4 rounded-[16px] border border-border bg-card p-5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-grad font-display text-[14px] font-bold text-white">
                {i + 1}
              </span>
              <div>
                <div className="font-display text-[15px] font-bold text-text">{s.t}</div>
                <p className="mt-1 text-[14px] leading-relaxed text-muted">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild shape="pill">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="ghost" shape="pill">
            <Link href="/events">Browse more events</Link>
          </Button>
        </div>
      </div>
    );
  }

  // ----- empty cart -----
  if (count === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-2" />
        <h1 className="font-display text-[24px] font-extrabold text-text">Your cart is empty</h1>
        <p className="text-[15px] text-muted">
          Add a ticket or a resource, then come back to check out.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild shape="pill">
            <Link href="/events">See events</Link>
          </Button>
          <Button asChild variant="ghost" shape="pill">
            <Link href="/library">Browse library</Link>
          </Button>
        </div>
      </div>
    );
  }

  // ----- checkout form -----
  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
      {/* Left: order summary (read-only) */}
      <aside className="order-1 lg:sticky lg:top-24 lg:self-start">
        <div data-cartpanel>
          <div className="rounded-[18px] border border-border bg-card-2 p-6">
            <h2 className="font-display text-[17px] font-bold text-text">Order summary</h2>
            <ul className="mt-5 flex flex-col gap-4">
              {lines.map(({ product, qty, lineTotal }) => (
                <li key={product.id} data-orderitem className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <ImageWell
                      src={product.img}
                      className="h-14 w-14 rounded-[10px] border border-border"
                    />
                    <span className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center rounded-full bg-accent-grad px-1.5 font-display text-[12px] font-bold text-white">
                      {qty}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[14px] font-bold leading-tight text-text">
                      {product.title}
                    </p>
                    <p className="mt-0.5 text-[12px] text-muted">{product.type}</p>
                  </div>
                  <span className="font-display text-[14px] font-bold text-text">
                    {ugx(lineTotal)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
              <span className="text-[15px] text-muted">Total</span>
              <span className="font-display text-[24px] font-extrabold text-text">
                {ugx(total)}
              </span>
            </div>
            <p className="mt-3 text-center text-[12px] text-muted-2">
              Mobile Money only · All prices in UGX
            </p>
          </div>
        </div>
      </aside>

      {/* Right: pay with Mobile Money */}
      <div className="order-2 rounded-[18px] border border-border bg-card-2 p-6 max-[560px]:p-4 sm:p-8">
        <h2 className="font-display text-[20px] font-extrabold text-text">
          Pay with Mobile Money
        </h2>

        {/* provider select */}
        <div className="mt-5">
          <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-2">
            Select provider
          </div>
          <div className="mt-3 flex gap-3">
            {PROVIDERS.map((p) => (
              <button
                key={p}
                type="button"
                data-momotab
                onClick={() => {
                  setProvider(p);
                  setCopied(false);
                }}
                className={cn(
                  "flex-1 rounded-[14px] border px-4 py-3.5 text-center text-[14px] font-semibold transition-colors",
                  provider === p
                    ? "border-[var(--pink)] bg-accent-grad text-white"
                    : "border-border-2 bg-card text-muted hover:text-text",
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* pay-to box */}
        <div
          data-paycard
          className="mt-5 rounded-[18px] border border-[rgba(255,45,149,.4)] bg-[linear-gradient(135deg,rgba(139,47,214,.14),rgba(255,45,149,.08))] p-6 text-center max-[560px]:p-4"
        >
          <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-pink-hover">
            Send {ugx(total)} to
          </div>
          <div className="mt-2 font-display text-[32px] font-extrabold leading-none text-text max-[560px]:text-[26px]">
            {pay.number}
          </div>
          <div className="mt-3 flex justify-center">
            <Button variant="ghost" shape="pill" size="sm" onClick={copyNumber}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy number"}
            </Button>
          </div>
          <p className="mt-3 text-[13px] text-muted">
            {provider} · Registered name:{" "}
            <span className="font-semibold text-text-3">{PAY.name}</span>
          </p>
        </div>

        {/* pay steps */}
        <ol className="mt-6 flex flex-col gap-3">
          {PAY_STEPS.map((s) => (
            <li key={s.n} className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-chip font-display text-[13px] font-bold text-pink-hover">
                {s.n}
              </span>
              <div>
                <div className="text-[14px] font-semibold text-text">{s.t}</div>
                <p className="text-[13px] text-muted">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* your details */}
        <div className="mt-7 border-t border-border pt-6">
          <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-2">
            Your details
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="co-name">Full name</Label>
              <Input
                id="co-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Nakato"
                className={cn(touched && !nameOk && "border-[rgba(255,90,90,.65)]")}
              />
              {touched && !nameOk && (
                <span className="text-[12px] text-[#ff8a8a]">Please enter your full name.</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="co-phone">Mobile Money number used to pay</Label>
              <Input
                id="co-phone"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0772 000 000"
                className={cn(touched && !phoneOk && "border-[rgba(255,90,90,.65)]")}
              />
              {touched && !phoneOk && (
                <span className="text-[12px] text-[#ff8a8a]">Enter a valid 07XX number.</span>
              )}
            </div>

            {/* attest */}
            <label className="flex cursor-pointer items-start gap-3">
              <Checkbox
                checked={attested}
                onCheckedChange={(v) => setAttested(Boolean(v))}
                className={cn(touched && !attested && "border-[rgba(255,90,90,.65)]")}
              />
              <span className="text-[13.5px] leading-relaxed text-muted">
                I confirm I have already sent {ugx(total)} from this number.
              </span>
            </label>
          </div>

          <Button className="mt-6 w-full" size="lg" disabled={submitting} onClick={submit}>
            {submitting ? "Submitting …" : `Submit payment · ${ugx(total)}`}
          </Button>
          <p className="mt-4 text-center text-[12.5px] leading-relaxed text-muted-2">
            Your order is held as pending until we confirm your Mobile Money payment. Unconfirmed
            orders expire on their own — nothing is charged.
          </p>
        </div>
      </div>
    </div>
  );
}

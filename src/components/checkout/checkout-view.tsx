"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Copy,
  ShoppingBag,
  Upload,
  X,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useOrders } from "@/context/orders-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { QtyStepper } from "@/components/common";
import { PAY, PAY_STEPS, NEXT_STEPS } from "@/data/site";
import { isValidUgPhone, makeRef, itemsSummary } from "@/lib/order";
import { ugx, cn } from "@/lib/utils";

const PROVIDERS = ["MTN Mobile Money", "Airtel Money"] as const;

export function CheckoutView() {
  const { lines, total, count, inc, dec, remove, clear } = useCart();
  const { addOrder } = useOrders();

  const [provider, setProvider] = useState<(typeof PROVIDERS)[number]>("MTN Mobile Money");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attested, setAttested] = useState(false);
  const [touched, setTouched] = useState(false);
  const [proofName, setProofName] = useState("");
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
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,380px)]">
      {/* Left: payment */}
      <div className="order-2 flex flex-col gap-6 lg:order-1">
        {/* provider tabs */}
        <div className="flex gap-3">
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

        {/* pay-to card */}
        <div data-paycard className="rounded-[18px] border border-border bg-card-2 p-6 max-[560px]:p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[12px] uppercase tracking-wide text-muted-2">
                Send payment to
              </div>
              <div className="mt-1 font-display text-[26px] font-extrabold text-text">
                {pay.number}
              </div>
              <div className="mt-0.5 text-[14px] text-muted">{PAY.name}</div>
            </div>
            <Button variant="ghost" shape="pill" size="sm" onClick={copyNumber}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>

          <ol className="mt-5 flex flex-col gap-3 border-t border-border pt-5">
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
        </div>

        {/* details form */}
        <div className="rounded-[18px] border border-border bg-card-2 p-6 max-[560px]:p-4">
          <h2 className="font-display text-[17px] font-bold text-text">Your details</h2>
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
              <Label htmlFor="co-phone">Mobile Money number</Label>
              <Input
                id="co-phone"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07XX XXX XXX"
                className={cn(touched && !phoneOk && "border-[rgba(255,90,90,.65)]")}
              />
              {touched && !phoneOk && (
                <span className="text-[12px] text-[#ff8a8a]">Enter a valid 07XX number.</span>
              )}
            </div>

            {/* proof upload (optional manual-verification path) */}
            <div className="flex flex-col gap-2">
              <Label>Proof of payment (optional)</Label>
              {proofName ? (
                <div className="flex items-center justify-between rounded-[12px] border border-border bg-card px-4 py-3 text-[14px]">
                  <span className="truncate text-text-3">{proofName}</span>
                  <button
                    type="button"
                    aria-label="Remove file"
                    onClick={() => setProofName("")}
                    className="text-muted hover:text-pink"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer items-center gap-2 rounded-[12px] border border-dashed border-border-strong bg-card px-4 py-3 text-[14px] text-muted transition-colors hover:text-text">
                  <Upload className="h-4 w-4" />
                  Upload screenshot
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setProofName(e.target.files?.[0]?.name ?? "")}
                  />
                </label>
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
                I confirm I have sent the exact total to the number above via Mobile Money.
              </span>
            </label>
          </div>

          <Button shape="pill" className="mt-6 w-full" disabled={submitting} onClick={submit}>
            {submitting ? "Submitting …" : `Submit payment · ${ugx(total)}`}
          </Button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-muted-2">
            <ShieldCheck className="h-4 w-4" /> We never store your Mobile Money PIN.
          </p>
        </div>
      </div>

      {/* Right: order summary */}
      <aside className="order-1 lg:order-2">
        <div data-cartpanel className="lg:sticky lg:top-24">
          <div className="rounded-[18px] border border-border bg-card-2 p-6">
            <h2 className="font-display text-[17px] font-bold text-text">Order summary</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {lines.map(({ product, qty, lineTotal }) => (
                <li key={product.id} data-orderitem className="flex flex-col gap-2 border-b border-border pb-3 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-display text-[14px] font-bold text-text">{product.title}</p>
                      <p className="text-[12px] uppercase tracking-wide text-muted-2">{product.type}</p>
                    </div>
                    <button
                      type="button"
                      aria-label="Remove"
                      onClick={() => remove(product.id)}
                      className="text-muted transition-colors hover:text-pink"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <QtyStepper value={qty} onInc={() => inc(product.id)} onDec={() => dec(product.id)} />
                    <span className="font-display text-[14px] font-bold text-text">{ugx(lineTotal)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <span className="text-[14px] text-muted">Total</span>
              <span className="font-display text-[22px] font-extrabold text-text">{ugx(total)}</span>
            </div>
            <p className="mt-3 text-center text-[12px] text-muted-2">
              Mobile Money only · All prices in UGX
            </p>
          </div>
          <Button asChild variant="ghost" shape="pill" className="mt-3 w-full">
            <Link href="/events">
              Add more <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </aside>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Lock, LockKeyhole, Check, BellRing, ShieldAlert, X, Ban } from "lucide-react";
import { useAdmin } from "@/context/admin-context";
import { useOrders } from "@/context/orders-context";
import { Chip } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Order } from "@/lib/types";
import { cn } from "@/lib/utils";

function statusMeta(status: Order["status"]) {
  switch (status) {
    case "confirmed":
      return { label: "Confirmed", cls: "border-[var(--ok-border)] bg-[var(--ok-bg)] text-ok" };
    case "failed":
      return { label: "Declined", cls: "border-[rgba(255,90,90,.4)] bg-[rgba(255,90,90,.12)] text-[#ff8a8a]" };
    case "reminded":
      return { label: "Reminder sent", cls: "border-[var(--warn-border)] bg-[var(--warn-bg)] text-warn" };
    default:
      return { label: "Pending", cls: "border-[rgba(255,45,149,.35)] bg-[rgba(255,45,149,.14)] text-pink-hover" };
  }
}

type Filter = "pending" | "confirmed" | "failed" | "all";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "failed", label: "Declined" },
  { key: "all", label: "All" },
];

function matchesFilter(order: Order, filter: Filter): boolean {
  switch (filter) {
    case "pending":
      return order.status === "pending" || order.status === "reminded";
    case "confirmed":
      return order.status === "confirmed";
    case "failed":
      return order.status === "failed";
    default:
      return true;
  }
}

function PinGate() {
  const { unlock } = useAdmin();
  const [pin, setPin] = useState("");
  const [err, setErr] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!unlock(pin)) setErr(true);
    else setPin("");
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-5 py-16 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-accent-grad text-white">
        <LockKeyhole className="h-8 w-8" />
      </span>
      <div>
        <h1 className="font-display text-[24px] font-extrabold text-text">Team access</h1>
        <p className="mt-2 text-[14px] text-muted">
          Enter the team PIN to open the order console.
        </p>
      </div>
      <form onSubmit={submit} className="flex w-full flex-col gap-3">
        <Input
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
            setErr(false);
          }}
          placeholder="••••"
          className={cn("text-center tracking-[0.4em]", err && "border-[rgba(255,90,90,.65)]")}
          autoFocus
        />
        {err && (
          <span className="flex items-center justify-center gap-1.5 text-[13px] text-[#ff8a8a]">
            <ShieldAlert className="h-4 w-4" /> Incorrect PIN — try again.
          </span>
        )}
        <Button type="submit" shape="pill" className="w-full">
          Unlock console
        </Button>
      </form>
      <p className="text-[12px] text-muted-2">
        Prototype gate — replace with real accounts before launch.
      </p>
    </div>
  );
}

function OrderRow({ order }: { order: Order }) {
  const { confirm, remind, reject } = useOrders();
  const [arming, setArming] = useState(false);
  const [reason, setReason] = useState("");
  const meta = statusMeta(order.status);
  const isConfirmed = order.status === "confirmed";
  const isFailed = order.status === "failed";
  const actionable = !isConfirmed && !isFailed;

  function decline() {
    const r = reason.trim();
    if (!r) return;
    reject(order.ref, r);
    setArming(false);
    setReason("");
  }

  return (
    <div data-orderrow className="rounded-[18px] border border-border bg-card-2 p-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-display text-[15px] font-bold text-text">{order.ref}</span>
              <span className="text-[12px] text-muted-2">· {order.when}</span>
            </div>
            <p className="mt-0.5 text-[14px] text-text-3">
              {order.name} · {order.phone}
            </p>
            <p className="mt-1 text-[13px] text-muted" data-orderitem>
              {order.items}
            </p>
            <p className="mt-0.5 text-[12px] text-muted-2">{order.provider}</p>
          </div>
          <span className={cn("shrink-0 rounded-full border px-3 py-1 text-[12px] font-semibold", meta.cls)}>
            {meta.label}
          </span>
        </div>

        <div
          data-ordact
          className="flex flex-row flex-nowrap items-center justify-between gap-3"
        >
          <div className="flex items-center gap-2">
            <span className="font-display text-[17px] font-extrabold text-text">
              {order.amountLabel}
            </span>
            {isConfirmed && (
              <span data-smstail className="inline-flex items-center gap-1 text-[12px] text-ok max-[820px]:hidden">
                <Check className="h-3.5 w-3.5" /> Ticket SMS sent
              </span>
            )}
            {isFailed && (
              <span className="inline-flex items-center gap-1 text-[12px] text-[#ff8a8a] max-[820px]:hidden">
                <Ban className="h-3.5 w-3.5" /> Order declined
              </span>
            )}
          </div>

          {actionable && (
            <div data-ordbtns className="flex min-w-0 flex-[1_1_0] items-center gap-2">
              <Button
                variant="ghost"
                shape="pill"
                size="sm"
                className="flex-[1.5_1_0] min-w-0 px-1.5"
                onClick={() => remind(order.ref)}
              >
                <BellRing className="h-4 w-4" /> Send reminder
              </Button>
              <Button
                shape="pill"
                size="sm"
                className="flex-1 min-w-0 px-1.5"
                onClick={() => confirm(order.ref)}
              >
                <Check className="h-4 w-4" />
                <span data-lbl-full className="max-[560px]:hidden">Confirm &amp; send SMS</span>
                <span data-lbl-short className="hidden max-[560px]:inline">Confirm</span>
              </Button>
            </div>
          )}
        </div>

        {/* Decline lives on its own line so the protected [data-ordact] row
            stays one line, price-left / buttons-right, at every breakpoint. */}
        {actionable &&
          (arming ? (
            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border pt-3">
              <Input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason (e.g. no payment received)"
                className="h-9 min-w-0 flex-1 text-[13px]"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && decline()}
              />
              <Button
                shape="pill"
                size="sm"
                variant="ghost"
                className="shrink-0 text-[#ff8a8a] hover:text-[#ff8a8a]"
                onClick={decline}
                disabled={!reason.trim()}
              >
                <Ban className="h-4 w-4" /> Confirm decline
              </Button>
              <Button
                shape="pill"
                size="sm"
                variant="subtle"
                className="shrink-0"
                onClick={() => {
                  setArming(false);
                  setReason("");
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setArming(true)}
                className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-muted-2 transition-colors hover:text-[#ff8a8a]"
              >
                <X className="h-3.5 w-3.5" /> Decline order
              </button>
            </div>
          ))}

        {isFailed && order.reason && (
          <p className="border-t border-border pt-3 text-[12.5px] text-muted-2">
            <span className="font-semibold text-text-3">Declined:</span> {order.reason}
          </p>
        )}
      </div>
    </div>
  );
}

export function AdminView() {
  const { authed, lock } = useAdmin();
  const { orders, pendingCount } = useOrders();
  const [filter, setFilter] = useState<Filter>("pending");

  if (!authed) return <PinGate />;

  const visible = orders.filter((o) => matchesFilter(o, filter));

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-[clamp(26px,4vw,36px)] font-extrabold tracking-[-0.5px] text-text">
            Order console
          </h1>
          <p className="mt-1 text-[14px] text-muted">
            {pendingCount} awaiting confirmation
          </p>
        </div>
        <Button variant="ghost" shape="pill" size="sm" onClick={lock}>
          <Lock className="h-4 w-4" /> Lock
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Chip key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
            {f.label}
          </Chip>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {visible.length === 0 ? (
          <p className="rounded-[18px] border border-border bg-card-2 p-8 text-center text-[14px] text-muted">
            No orders in this view.
          </p>
        ) : (
          visible.map((o) => <OrderRow key={o.ref} order={o} />)
        )}
      </div>
    </>
  );
}

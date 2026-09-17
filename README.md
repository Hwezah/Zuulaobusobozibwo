# Zuula Obusobozibwo

A Ugandan Kingdom-business ministry platform — event ticketing (Kingdom Business
Summit 2026), a book/audio/podcast library, articles, mentorship tiers, speaker
booking, and an admin order-confirmation console.

This is the production **Next.js App Router** rebuild of the signed-off design
prototype, ported pixel-faithfully with a modern component stack.

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Components | shadcn/ui-style primitives on Radix (authored in `src/components/ui`) |
| State | React Context (theme, cart, orders, admin) |
| Auth + DB | Supabase (`@supabase/ssr`) |
| Icons | `react-icons` (Phosphor) for content, `lucide-react` for chrome |
| Fonts | Sora · Plus Jakarta Sans · Lora (via `next/font`) |

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in Supabase keys (see below)
pnpm dev                     # http://localhost:3000
pnpm build && pnpm start     # production
pnpm lint
```

## Design system

- Tokens live in `src/app/globals.css` as CSS variables. **Dark is the default
  theme**; `:root[data-theme="light"]` swaps to the warm cream palette. A tiny
  pre-paint script (in `layout.tsx`) applies the stored theme before first paint
  to avoid a flash.
- Tokens are exposed as Tailwind utilities via `@theme inline` (`bg-bg`,
  `text-muted`, `border-border`, `text-pink`, `font-display`, …).
- The responsive contract's card-scroller **peek** behaviour is ported verbatim
  as `[data-scroll]` / `[data-scroll-peek]` rules; every key `data-*` hook from
  the design is preserved on its element.

## Routes

`/` · `/events` · `/events/[id]` · `/library` · `/articles` · `/articles/[slug]`
· `/mentorship` · `/booking` · `/checkout` · `/admin` · `/about` · `/contact`
· `/podcast` · `/privacy` · `/terms`

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. **Settings → API**, copy the values into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (secret — server only, never exposed to the browser)
3. Run the schema in **SQL Editor** (or `supabase db push`):
   ```
   supabase/migrations/0001_init.sql
   ```
   This creates `orders`, `order_items`, `tickets`, `sms_log`, `webhook_events`
   with RLS enabled (all writes go through the service-role client server-side).

Until the env vars are present, the app runs in **prototype mode**: checkout and
the admin console work against the in-memory client store, and API routes return
stubbed success — no network, no database.

## SMS setup (Africa's Talking)

The buyer's ticket SMS (sent on **Confirm**) and the admin new-order alert go
through the provider-agnostic seam in `src/lib/sms.ts`, wired for Africa's Talking.

1. Create an account at [africastalking.com](https://africastalking.com) and copy
   your **API key**.
2. Put the values in `.env.local`:
   - `SMS_PROVIDER=africastalking`
   - `SMS_API_KEY=…`
   - `AT_USERNAME=sandbox` — test free in the AT simulator, or your live app
     username for production.
   - `SMS_SENDER_ID=…` — your approved sender ID (apply early; approval takes days).
   - `ADMIN_SMS_RECIPIENTS=+2567…,…` — team number(s) for the new-order alert.
3. Launch the **AT simulator** with a sandbox number to watch messages arrive at
   zero cost. Flip `AT_USERNAME` to your live username to go real.

With no SMS vars set, `sendSms()` just logs — the flow still works end to end.

## Backend status (see `docs/` design contract)

Everything payment- and SMS-related is currently **faked / stubbed** and ready to
wire up:

- `POST /api/orders` — creates an order (persists to Supabase when configured) and
  texts the team (`ADMIN_SMS_RECIPIENTS`) best-effort.
- `GET /api/admin/orders` — team order list when Supabase is on; else the panel
  uses its demo store.
- `POST /api/admin/orders/[id]/confirm` — issues ticket code(s) and sends the buyer
  their ticket SMS on the pending→confirmed transition (idempotent). `/reject`
  declines with a reason; `/remind` re-nudges. **Auth is a prototype PIN**
  (`AdminProvider`) and must be replaced with real accounts before launch.
- `POST /api/webhooks/mtn` · `POST /api/webhooks/airtel` — automated MoMo
  collections (§11): signature verification, idempotency and mark-paid are TODO;
  the manual Confirm flow above is the current path and stays as the fallback.

### Before going live
- [ ] Mobile Money merchant/aggregator account live (Flutterwave / Pesapal / Xente,
      or direct MTN + Airtel). Amounts are **integer UGX**, no decimals.
- [ ] SMS sender ID approved (Africa's Talking / EgoSMS / Yo! Uganda).
- [ ] Webhook signature verification + replay protection tested.
- [ ] Replace the admin PIN with real accounts + audit logging.
- [ ] Self-host book covers & article images (currently hot-linked) and confirm
      the cover→title mapping with the client.
- [ ] Confirm the number of seats issued for an "A Table" (UGX 500,000) purchase.

## Project structure

```
src/
  app/            routes + API handlers
  components/
    ui/           shadcn-style primitives (Radix)
    site/         header, footer, ribbon, cart drawer, search, mobile menu
    cards/        reusable event/book/article/tier/icon cards
    home/ events/ checkout/ admin/ booking/ contact/ library/
  context/        theme, cart, orders, admin providers
  data/           events, articles, products, site content, icon map
  lib/            utils, types, order helpers, supabase clients
supabase/migrations/  SQL schema
public/assets/        flyer + logo
```

## Client preferences (kept)
- **Symmetry** — equal-width siblings, centred stacks on mobile, even grids.
- **Mobile Money only** (MTN 0777 667 080 / Airtel 0757 217 681), all prices UGX.

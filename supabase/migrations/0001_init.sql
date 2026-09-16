-- Zuula Obusobozibwo — orders, tickets, SMS, webhooks
-- Mirrors BACKEND_SPEC.md. Run in the Supabase SQL editor (or `supabase db push`).
-- All amounts are integer UGX — no decimals, ever.

create extension if not exists "pgcrypto";

do $$ begin
  create type payment_provider as enum ('mtn', 'airtel');
exception when duplicate_object then null; end $$;

do $$ begin
  create type order_status as enum
    ('pending', 'awaiting_payment', 'paid', 'confirmed', 'failed', 'expired');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------- orders
create table if not exists orders (
  id              uuid primary key default gen_random_uuid(),
  ref             text unique not null,               -- e.g. ZB-104882
  customer_name   text not null,
  customer_phone  text not null,                       -- E.164, +2567xxxxxxxx
  provider        payment_provider not null,
  amount          integer not null check (amount >= 0),
  items_summary   text not null default '',
  status          order_status not null default 'pending',
  provider_txn_id text,
  proof_url       text,
  sms_sent_at     timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists orders_status_idx on orders (status);
create index if not exists orders_created_idx on orders (created_at desc);

-- ---------------------------------------------------------------- order_items
create table if not exists order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid not null references orders (id) on delete cascade,
  product_id  text not null,
  title       text not null,
  tier        text,
  unit_price  integer not null check (unit_price >= 0),
  qty         integer not null check (qty > 0)
);
create index if not exists order_items_order_idx on order_items (order_id);

-- ---------------------------------------------------------------- tickets
create table if not exists tickets (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid not null references orders (id) on delete cascade,
  code          text unique not null,                 -- ZB-<event>-<base32(6)>
  tier          text not null,
  qr_payload    text not null,
  checked_in_at timestamptz
);
create index if not exists tickets_order_idx on tickets (order_id);

-- ---------------------------------------------------------------- sms_log
create table if not exists sms_log (
  id              uuid primary key default gen_random_uuid(),
  order_id        uuid references orders (id) on delete set null,
  to_phone        text not null,
  template        text not null,                       -- 'ticket' | 'reminder'
  body            text not null,
  provider_msg_id text,
  status          text not null default 'queued',
  created_at      timestamptz not null default now()
);
-- idempotent resend per (order, template)
create unique index if not exists sms_log_order_template_idx
  on sms_log (order_id, template);

-- ---------------------------------------------------------------- webhook_events
create table if not exists webhook_events (
  id            uuid primary key default gen_random_uuid(),
  provider      payment_provider not null,
  raw           jsonb not null,
  signature_ok  boolean not null default false,
  processed_at  timestamptz,
  created_at    timestamptz not null default now()
);

-- ---------------------------------------------------------------- updated_at trigger
create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists orders_set_updated_at on orders;
create trigger orders_set_updated_at
  before update on orders
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------- RLS
-- Lock every table down. All writes happen server-side with the service-role
-- key (webhooks, admin confirm), which bypasses RLS. Add authenticated-admin
-- read policies once Supabase Auth + roles are wired (see BACKEND_SPEC.md).
alter table orders          enable row level security;
alter table order_items     enable row level security;
alter table tickets         enable row level security;
alter table sms_log         enable row level security;
alter table webhook_events  enable row level security;

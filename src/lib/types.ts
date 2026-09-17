export type Provider = "MTN Mobile Money" | "Airtel Money";

export type ProductType =
  | "eBook"
  | "Paperback"
  | "Audiobook"
  | "Event ticket";

export interface Product {
  id: string;
  title: string;
  type: ProductType;
  priceVal: number;
  desc: string;
  img?: string;
  /** cover art label used when no image is available */
  cover?: string;
  eventId?: string;
}

export interface Tier {
  pid: string;
  name: string;
  priceLabel: string;
  val: number;
  note: string;
}

export interface Speaker {
  name: string;
  role: string;
}

export interface EventItem {
  id: string;
  day: string;
  mon: string;
  monthFull: string;
  tag: string;
  edition?: string;
  title: string;
  subtitle: string;
  theme: string;
  themeSub: string;
  place: string;
  dateFull: string;
  time: string;
  flyer: string;
  priceLabel: string;
  cur: string;
  blurb: string;
  speakers: Speaker[];
  highlights: string[];
  enquiries: string[];
  tiers: Tier[];
}

export interface ArticleSection {
  h: string;
  paras: string[];
  bullets: string[];
  after: string;
}

export interface Article {
  slug: string;
  cat: string;
  title: string;
  date: string;
  read: string;
  img: string;
  excerpt: string;
  kicker: string;
  lede: string[];
  sections: ArticleSection[];
  reflect: string[];
  actions: string[];
  close: string;
}

export type OrderStatus = "pending" | "reminded" | "confirmed" | "failed";

export interface Order {
  ref: string;
  name: string;
  phone: string;
  provider: string;
  amount: number;
  amountLabel: string;
  items: string;
  when: string;
  status: OrderStatus;
  /** reason captured when an admin declines the order (status "failed") */
  reason?: string;
}

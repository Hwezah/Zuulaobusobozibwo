import type { IconKey } from "./icons";

export const CONTACTS = {
  enquiries: ["0757 217 681", "0744 929 345", "0777 667 080"],
  whatsapp: "0753 844 033",
  email: "hello@zuulaobusobozibwo.org",
  location: "Kampala, Uganda",
};

export const PAY = {
  "MTN Mobile Money": { number: "0777 667 080", raw: "0777667080" },
  "Airtel Money": { number: "0757 217 681", raw: "0757217681" },
  name: "Joseph Tumusiime",
} as const;

export const TELEGRAM = {
  url: "https://t.me/ZuulaMentorship",
  handle: "@ZuulaMentorship",
};

export const SOCIALS = {
  tiktok: "https://www.tiktok.com/@zuulaobusobozibwo",
  whatsapp: "https://wa.me/256753844033",
  facebook: "https://facebook.com/ZuulaObusobozibwo",
  telegram: "https://t.me/ZuulaMentorship",
};

export const SOCIAL_LINKS: { label: string; handle: string; href: string }[] = [
  { label: "TikTok", handle: "@zuulaobusobozibwo", href: SOCIALS.tiktok },
  { label: "WhatsApp", handle: "0753 844 033", href: SOCIALS.whatsapp },
  { label: "Facebook", handle: "Zuula Obusobozibwo", href: SOCIALS.facebook },
  { label: "Telegram", handle: "@ZuulaMentorship", href: SOCIALS.telegram },
];

export interface IconCard {
  ico: IconKey;
  title: string;
  desc: string;
  cta?: string;
  href?: string;
}

export const SERVICES: IconCard[] = [
  { ico: "mic", title: "Keynote Speaking", desc: "Book Joseph for conferences, churches and corporate stages.", cta: "Book a date", href: "/booking" },
  { ico: "star", title: "1:1 Mentorship", desc: "Personalized coaching to discover your gifts and purpose.", cta: "Join now", href: "/mentorship" },
  { ico: "cap", title: "Courses & Masterclasses", desc: "Self-paced programs on purpose, healing and leadership.", cta: "Start learning", href: "/mentorship" },
  { ico: "ticket", title: "Live Events & Tickets", desc: "Conferences and gatherings, in-person and virtual.", cta: "Get tickets", href: "/events" },
  { ico: "users", title: "Membership Community", desc: "A tribe of purpose-driven believers walking together.", cta: "Join the circle", href: "/mentorship" },
  { ico: "wave", title: "Podcast & Video", desc: "Weekly episodes on Kingdom purpose and wholeness.", cta: "Listen now", href: "/podcast" },
  { ico: "books", title: "Books & eBooks", desc: "A curated library to deepen your faith and potential.", cta: "Browse library", href: "/library" },
  { ico: "building", title: "Corporate Packages", desc: "Tailored keynote and workshop bundles for teams.", cta: "Enquire", href: "/booking" },
  { ico: "camera", title: "Media Kit & Reel", desc: "Speaker bio, photos and video reel for organizers.", cta: "Download kit", href: "/booking" },
];

export const STATS = [
  { num: "15K+", label: "Lives impacted" },
  { num: "40+", label: "Live events" },
  { num: "9", label: "Published books" },
];

export const TESTIMONIALS = [
  { quote: "Joseph helped me rediscover a purpose I had buried under years of noise. Life-changing mentorship.", initial: "A", name: "Aisha N.", role: "Entrepreneur" },
  { quote: "The masterclass gave me practical, biblically-grounded tools I use every single day as a leader.", initial: "D", name: "David M.", role: "Ministry Leader" },
  { quote: "From the first session I felt seen. The community keeps me accountable and growing.", initial: "G", name: "Grace K.", role: "Coach" },
];

export interface PriceTier {
  name: string;
  tagline?: string;
  price: string;
  per: string;
  featured: boolean;
  feats: string[];
  btn: string;
  /** Badge shown on the featured tier (defaults to "Most popular"). */
  badge?: string;
}

/** Home page membership teaser tiers. */
export const MEMBERSHIP_TIERS: PriceTier[] = [
  { name: "Seeker", price: "Free", per: "", featured: false, feats: ["Weekly newsletter", "Free article library", "Community forum access", "1 sample eBook"], btn: "Get started" },
  { name: "Inner Circle", price: "UGX 25K", per: "/mo", featured: true, feats: ["Everything in Seeker", "Full course library", "Monthly group coaching", "Members-only events", "All eBooks & audio"], btn: "Join Inner Circle" },
  { name: "Legacy", price: "UGX 60K", per: "/mo", featured: false, feats: ["Everything in Inner Circle", "Quarterly 1:1 with Joseph", "Priority event tickets", "Exclusive masterminds"], btn: "Go Legacy" },
];

/** Mentorship page packages. */
export const PACKAGES: PriceTier[] = [
  { name: "Clarity", tagline: "Find your direction", price: "UGX 150K", per: "", featured: false, feats: ["2 x 60-min sessions", "Purpose assessment", "Personalized action plan", "Email support"], btn: "Get started" },
  { name: "Transformation", tagline: "The full journey", price: "UGX 400K", per: "/3mo", featured: true, badge: "Recommended", feats: ["Monthly 1:1 sessions", "Personalized roadmap", "Community access", "WhatsApp accountability", "All courses included"], btn: "Apply now" },
  { name: "Legacy Partner", tagline: "Deep, ongoing work", price: "UGX 900K", per: "/6mo", featured: false, feats: ["Bi-weekly 1:1 sessions", "Direct access to Joseph", "Custom growth plan", "Priority event access", "Guest at masterminds"], btn: "Apply now" },
];

export const MENTORSHIP_STEPS = [
  { n: "1", title: "Apply", desc: "Share where you are and what you want to become." },
  { n: "2", title: "Discovery call", desc: "A free conversation to see if we are a fit." },
  { n: "3", title: "Your roadmap", desc: "We craft a personalized plan for your journey." },
  { n: "4", title: "Grow together", desc: "Ongoing sessions, accountability and breakthrough." },
];

export const FAQS = [
  { q: "Who is mentorship for?", a: "Anyone ready to discover their gifts, heal their inner world and step into purpose — from young professionals to seasoned leaders." },
  { q: "Are sessions online or in person?", a: "Most sessions are held over Zoom, with occasional in-person intensives around live events in Kampala." },
  { q: "Is there a faith component?", a: "Yes. Mentorship is biblically grounded, though all sincere seekers are warmly welcome." },
  { q: "How do I get started?", a: "Choose a package and submit an application. We’ll book a free discovery call within 48 hours." },
];

export const MENTOR_PERKS = [
  "Monthly 1:1 sessions with Joseph",
  "Personalized purpose roadmap",
  "Private community access",
  "Accountability & prayer support",
];

export const MENTOR_HERO = {
  eyebrow: "1:1 Mentorship & Coaching",
  headA: "Walk your journey to purpose ",
  headB: "with a guide",
  sub: "Personalized mentorship to help you discover your gifts, heal your inner world and step boldly into your Kingdom destiny.",
};

export const PODCAST_EPISODES = [
  { n: "42", title: "Rediscovering Your Essence", dur: "48 min", date: "Jul 2026", desc: "Strip away the noise and reconnect with who you were made to be." },
  { n: "41", title: "Healing Before Building", dur: "52 min", date: "Jul 2026", desc: "Why inner healing must come before outward success." },
  { n: "40", title: "The Stewardship of Gifts", dur: "39 min", date: "Jun 2026", desc: "How to recognise and steward the gifts already within you." },
  { n: "39", title: "Leading Yourself First", dur: "45 min", date: "Jun 2026", desc: "Self-leadership as the foundation of Kingdom influence." },
  { n: "38", title: "Purpose in the Waiting", dur: "41 min", date: "May 2026", desc: "Finding meaning and direction in seasons of delay." },
];

export const TELEGRAM_PERKS = [
  "Daily devotionals & purpose prompts",
  "Live monthly Q&A with Joseph",
  "First access to events & masterclasses",
  "A supportive tribe keeping you accountable",
];

export const ABOUT_VALUES: IconCard[] = [
  { ico: "sprout", title: "Growth", desc: "We believe every person carries a reservoir of untapped strength waiting to be developed." },
  { ico: "heart", title: "Wholeness", desc: "Lasting impact flows from a healed inner world, not just outward achievement." },
  { ico: "crown", title: "Kingdom purpose", desc: "Practical, biblically-grounded guidance that awakens calling and destiny." },
  { ico: "users", title: "Community", desc: "No one grows alone — we walk together, accountable and encouraged." },
];

export const ABOUT_STATS = [
  { num: "15K+", label: "Lives impacted" },
  { num: "40+", label: "Live events" },
  { num: "9", label: "Published books" },
  { num: "12", label: "Countries reached" },
];

export const CONTACT_METHODS: IconCard[] = [
  { ico: "phone", title: "Call or WhatsApp", desc: "0753 844 033 · 0757 217 681", href: SOCIALS.whatsapp },
  { ico: "mail", title: "Email us", desc: "hello@zuulaobusobozibwo.org", href: "mailto:hello@zuulaobusobozibwo.org" },
  { ico: "pin", title: "Visit", desc: "Kampala, Uganda" },
  { ico: "send", title: "Telegram community", desc: "@ZuulaMentorship", href: SOCIALS.telegram },
];

export const BOOKING_TYPES: IconCard[] = [
  { ico: "mic", title: "Keynote Speaking", desc: "High-energy talks on purpose, healing and Kingdom leadership." },
  { ico: "building", title: "Corporate Workshops", desc: "Interactive sessions for teams and organizations." },
  { ico: "church", title: "Church Conferences", desc: "Multi-session ministry for congregations and youth." },
  { ico: "diamond", title: "Mentorship Intensives", desc: "Deep-dive private sessions for leaders and groups." },
];

export const BOOKING_STATS = [
  { num: "250+", label: "Talks delivered" },
  { num: "4.9★", label: "Avg. rating" },
  { num: "12", label: "Countries" },
];

export const BOOKING_EXPECT = [
  "A tailored talk shaped around your audience & theme",
  "Pre-event planning call with Joseph",
  "Signed books & resources for attendees",
  "Optional Q&A or breakout session",
];

export const BOOKING_TYPE_OPTIONS: { label: string; ico: IconKey }[] = [
  { label: "Keynote", ico: "mic" },
  { label: "Workshop", ico: "building" },
  { label: "Conference", ico: "church" },
  { label: "Mentorship", ico: "diamond" },
];

export const BOOKING_FORMATS = ["In person", "Virtual"];
export const BOOKING_AUDIENCE = ["Under 100", "100–500", "500–1,000", "1,000+"];

export const PAY_STEPS = [
  { n: "1", t: "Dial the USSD code", d: "MTN *165# or Airtel *185# — choose Send Money." },
  { n: "2", t: "Send the exact total", d: "Send to the number shown above, named Joseph Tumusiime." },
  { n: "3", t: "We confirm & send your ticket", d: "Tap Submit payment, so we can confirm your payment through SMS." },
];

export const NEXT_STEPS = [
  { t: "We're checking your payment", d: "Our team receives your order details instantly and checks them against the Mobile Money confirmation on our phone." },
  { t: "Payment confirmed", d: "You'll get a confirmation SMS with your ticket details and a welcome message for the summit." },
  { t: "If we can't find it", d: "We'll send one courteous reminder with the pay-to number in case the transfer didn't go through. Unconfirmed orders expire after 24 hours — nothing is charged." },
];

export const PRIVACY_SECTIONS = [
  { h: "Information we collect", p: "We collect the details you provide when you book a session, purchase a resource, register for an event or join our community — such as your name, email, phone number and payment information processed securely through Mobile Money." },
  { h: "How we use your information", p: "Your information is used to deliver the services you request, send confirmations and download links, respond to enquiries, and keep you informed about events and resources you opt into. We never sell your personal data." },
  { h: "Payments & security", p: "Payments are processed through trusted Mobile Money providers. We do not store your full payment credentials on our servers. All transactions are encrypted in transit." },
  { h: "Communications", p: "You may receive emails or SMS related to your bookings, purchases and community. You can unsubscribe from marketing messages at any time using the link provided or by contacting us." },
  { h: "Your rights", p: "You may request access to, correction of, or deletion of your personal data at any time by emailing hello@zuulaobusobozibwo.org. We will respond within a reasonable period." },
];

export const TERMS_SECTIONS = [
  { h: "Acceptance of terms", p: "By accessing this website, booking sessions, purchasing resources or joining our community, you agree to these terms of use. If you do not agree, please discontinue use of our services." },
  { h: "Bookings & payments", p: "Mentorship, speaking engagements and event tickets are confirmed once payment is received or a booking request is approved. Prices are shown in UGX or USD as indicated and are subject to change." },
  { h: "Refunds & cancellations", p: "Digital products are non-refundable once download links are issued. Event tickets may be transferable; refund eligibility depends on the specific event policy communicated at purchase." },
  { h: "Intellectual property", p: "All content — including books, audio, articles, courses and branding — is the property of Zuula Obusobozibwo and may not be reproduced or redistributed without written permission." },
  { h: "Community conduct", p: "Members of our Telegram and other communities are expected to engage respectfully. We reserve the right to remove members who violate these standards." },
  { h: "Contact", p: "Questions about these terms can be directed to hello@zuulaobusobozibwo.org." },
];

export const ROT_WORDS = [
  "generations",
  "your world",
  "a nation",
  "the next leader",
  "your family",
  "your calling",
];

/** Home hero copy (matches the signed-off design). */
export const HERO = {
  eyebrowPrefix: "Empowering you to impact",
  headA: "Awaken your inner self & ",
  headB: "rediscover your purpose",
  sub: "Step away from the noise and reconnect with who you truly are. Practical, biblically-grounded mentorship, courses and events to heal your inner world and activate your full potential.",
  portraitLabel: "portrait of Joseph on stage",
  nextEventLabel: "Kingdom Business Summit · Oct 24",
};

/** Divider strip under the hero. */
export const TOPIC_STRIP = [
  "Kingdom Stewardship",
  "Purpose & Destiny",
  "Healing & Wholeness",
  "Leadership",
  "Legacy Building",
];

export const FOUNDER = {
  eyebrow: "About the founder",
  name: "I'm Joseph Prosper",
  intro:
    "God has placed unique gifts within you. When you discover and use them, you step into your purpose, influence others, and fulfill your Kingdom destiny.",
  quote:
    "We believe every person carries a reservoir of strength and purpose, though life's challenges can blur that vision and leave us uncertain of who we are and where we're going.",
  cta: "Invite Joseph to speak",
};

export const FLAGSHIP = {
  eyebrow: "Flagship program",
  title: "1:1 Mentorship & Coaching",
  desc: "A guided journey to discover your gifts, heal your inner world, and build a life of Kingdom impact — with personal accountability from Joseph.",
  cta: "Explore mentorship",
  perks: [
    "Monthly 1:1 sessions with Joseph",
    "Personalized purpose roadmap",
    "Private community access",
    "Accountability & prayer support",
  ],
};

export const PODCAST_BAND = {
  title: "The Zuula Podcast",
  desc: "Weekly conversations on purpose, healing and Kingdom leadership. New episodes every Tuesday.",
  cta: "Listen & watch",
};

export const NEWSLETTER = {
  title: "Begin your journey today",
  desc: "Get weekly encouragement, new resources and early event access — straight to your inbox.",
};

export const AUTHOR = {
  name: "Tumusiime Joseph Prosper",
  initials: "JP",
  img: "/assets/joseph-founder.jpg",
  bio: "Founder of Zuula Obusobozibwo — helping people discover their God-given gifts and use them to impact generations.",
};

export const FOOTER = {
  blurb:
    "Transform your life through deeply practical, biblically grounded insights designed to awaken your purpose, heal your inner world, and activate your full potential.",
  phones: ["0753 844 033", "0757 217 681"],
  developer: { name: "Hwezah", phone: "0742 696 385" },
};

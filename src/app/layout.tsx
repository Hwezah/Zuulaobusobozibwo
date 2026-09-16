import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { EventRibbon } from "@/components/site/event-ribbon";
import { themeScript } from "@/context/theme-context";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zuulaobusobozibwo.org"),
  title: {
    default: "Zuula Obusobozibwo — Kingdom Business & Mentorship",
    template: "%s · Zuula Obusobozibwo",
  },
  description:
    "A Ugandan Kingdom-business ministry: the Kingdom Business Summit 2026, a book & audio library, mentorship, speaker booking and more.",
  openGraph: {
    title: "Zuula Obusobozibwo",
    description: "Not Just Priests — We are Kings Too.",
    images: ["/assets/kingdom-business-summit-2026-flyer.png"],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sora.variable} ${jakarta.variable} ${lora.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <Providers>
          <EventRibbon />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}

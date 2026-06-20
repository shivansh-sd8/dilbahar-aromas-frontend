import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Sans_Devanagari, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/config";
import Providers from "@/components/providers";
import SiteChrome from "@/components/layout/SiteChrome";
import Analytics from "@/components/analytics/Analytics";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const hindi = Noto_Sans_Devanagari({
  variable: "--font-hindi",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Pure Essential Oils from Kannauj Since ${site.foundedYear}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${hindi.variable} ${mono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <Analytics />
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}

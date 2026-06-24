import React from "react";
import Link from "next/link";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppBubble from "@/components/layout/WhatsAppBubble";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import AudienceToggle from "@/components/home/AudienceToggle";
import CategoryGrid from "@/components/home/CategoryGrid";
import BestSellers from "@/components/home/BestSellers";
import HeritageSection from "@/components/home/HeritageSection";
import B2BLeadForm from "@/components/home/B2BLeadForm";
import Reviews from "@/components/home/Reviews";
import BlogPreview from "@/components/home/BlogPreview";

type DemoLandingProps = {
  /** Scoped palette class defined in globals.css, e.g. "palette-1" */
  paletteClass: string;
  /** Human label shown in the floating switcher */
  label: string;
};

/**
 * Self-contained clone of the home page used only on /demo1 and /demo2.
 * The whole tree is wrapped in a scoped palette class so CSS variables
 * cascade and re-theme every section without touching the live site.
 */
const DemoLanding: React.FC<DemoLandingProps> = ({ paletteClass, label }) => {
  return (
    <div className={`${paletteClass} flex min-h-screen flex-col bg-background text-foreground`}>
      <PaletteSwitcher label={label} />
      <AnnouncementBar />
      <Header tone="dark" />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <AudienceToggle />
        <CategoryGrid />
        <BestSellers />
        <HeritageSection />
        <B2BLeadForm />
        <Reviews />
        <BlogPreview />
      </main>
      <Footer />
      <WhatsAppBubble />
    </div>
  );
};

const PaletteSwitcher: React.FC<{ label: string }> = ({ label }) => (
  <div className="fixed left-1/2 top-3 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-card/95 px-2 py-1.5 text-xs font-medium shadow-lg backdrop-blur">
    <span className="px-2 text-muted-foreground">Preview:</span>
    <Link
      href="/demo1"
      className="rounded-full px-3 py-1 text-foreground transition-colors hover:bg-secondary"
    >
      Palette 1
    </Link>
    <Link
      href="/demo2"
      className="rounded-full px-3 py-1 text-foreground transition-colors hover:bg-secondary"
    >
      Palette 2
    </Link>
    <span className="ml-1 rounded-full bg-primary px-3 py-1 text-primary-foreground">
      {label}
    </span>
  </div>
);

export default DemoLanding;

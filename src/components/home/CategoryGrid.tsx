import React from "react";
import Link from "next/link";
import { categories } from "@/lib/config";

const tones = [
  "from-[#1f7a5e] to-[#14463a]",
  "from-[#268063] to-[#173f33]",
  "from-[#1c6b52] to-[#103a2f]",
  "from-[#2a7d5f] to-[#1a4a3b]",
  "from-[#237056] to-[#14463a]",
  "from-[#1c6b52] to-[#0f352b]",
];

const icons: Record<string, string> = {
  "essential-oils": "\u{1FAD7}",
  "hair-growth-oils": "\u{1F331}",
  "skin-care-oils": "\u2728",
  "pooja-ritual-oils": "\u{1FA94}",
  "floral-waters": "\u{1F338}",
  "luxury-oils": "\u{1F48E}",
};

const CategoryGrid: React.FC = () => {
  return (
    <section className="container-px py-14">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold text-brand">Shop by category</h2>
          <p className="mt-1 text-muted-foreground">Single-origin oils, distilled at source in Kannauj.</p>
        </div>
        <Link href="/collections" className="hidden text-sm font-semibold text-primary hover:underline sm:inline">
          View all categories →
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c, i) => (
          <Link key={c.slug} href={`/collections/${c.slug}`} className="group text-center">
            <div
              className={`arch-frame relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-gradient-to-b ${tones[i % tones.length]} shadow-md ring-1 ring-gold/40 transition-transform group-hover:-translate-y-1`}
            >
              {/* warm golden spotlight to mimic the lit-bottle look */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_72%,rgba(200,162,74,0.55),transparent_62%)]" />
              <div className="absolute inset-x-3 bottom-3 h-px bg-gold/30" />
              <span className="relative text-5xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110 sm:text-6xl">
                {icons[c.slug] ?? "\u{1FAD7}"}
              </span>
            </div>
            <span className="mt-2 block rounded-md border border-gold/40 bg-gradient-to-b from-gold/90 to-gold-dark/90 px-2 py-1 text-xs font-semibold text-brand shadow-sm">
              {c.name}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link href="/collections" className="text-sm font-semibold text-primary hover:underline">
          View all categories →
        </Link>
      </div>
    </section>
  );
};

export default CategoryGrid;

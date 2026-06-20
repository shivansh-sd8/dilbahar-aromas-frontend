import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { trustSignals, heroStats, products as fallbackProducts } from "@/lib/config";
import { api } from "@/lib/api";

type HeroCard = { slug: string; name: string; emoji?: string; image?: string; price: number };

const Hero = async () => {
  let bestsellers: HeroCard[] = fallbackProducts
    .filter((p) => p.bestseller)
    .slice(0, 3)
    .map((p) => ({ slug: p.slug, name: p.name, emoji: p.emoji, price: p.priceFrom }));
  try {
    const all = await api.listProducts({ limit: 30 });
    if (all.length) {
      const withImg = all.filter((p) => p.images && p.images.length > 0);
      const pick = (withImg.length >= 3 ? withImg : all).slice(0, 3);
      bestsellers = pick.map((p) => ({
        slug: p.slug,
        name: p.name,
        emoji: p.emoji,
        image: p.images?.[0],
        price: p.priceFrom ?? p.variants?.reduce((m, v) => (v.price < m ? v.price : m), p.variants[0]?.price ?? 0) ?? 0,
      }));
    }
  } catch {
    /* fall back to static products */
  }

  const featured = bestsellers[0];
  const others = bestsellers.slice(1, 3);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-background">
      <div className="container-px grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-20">
        {/* Left */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-gold-dark">
            <span>❋</span> Distilled in Kannauj since 1959
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-brand sm:text-5xl">
            Pure Essential Oils from Kannauj —{" "}
            <span className="text-gold-dark">Verified Every Batch</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            Not sourced. Not blended. Distilled by us — in the same copper degs since 1959.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button render={<Link href="/collections" />} size="lg" className="h-11 px-6 text-base">
              Shop Oils
            </Button>
            <Button render={<Link href="/b2b" />} size="lg" variant="outline" className="h-11 px-6 text-base">
              B2B Wholesale
            </Button>
          </div>

          <ul className="mt-7 grid max-w-xl grid-cols-2 gap-x-4 gap-y-2 text-sm text-foreground/80 sm:grid-cols-3">
            {trustSignals.slice(0, 6).map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="text-primary">✓</span> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — bestsellers showcase */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-white to-secondary/40 p-4 shadow-md sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
                ✦ Bestselling oils
              </span>
              <Link href="/collections" className="text-xs font-semibold text-primary hover:underline">
                View all →
              </Link>
            </div>

            {featured && (
              <Link
                href={`/products/${featured.slug}`}
                className="group block overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-44 items-center justify-center overflow-hidden bg-gradient-to-b from-secondary/30 to-white sm:h-52">
                  {featured.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={featured.image} alt={featured.name} className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105" />
                  ) : (
                    <span className="text-6xl">{featured.emoji}</span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-3">
                  <div>
                    <p className="font-display text-sm font-semibold text-brand">{featured.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {featured.price > 0 ? `from ₹${featured.price} / kg` : "Price on request"}
                    </p>
                  </div>
                  <span className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                    View
                  </span>
                </div>
              </Link>
            )}

            {others.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                {others.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    className="group rounded-2xl border border-border bg-white p-2 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <span className="flex h-20 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-secondary/30 to-white">
                      {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt={p.name} className="h-full w-full object-contain p-1 transition-transform duration-300 group-hover:scale-105" />
                      ) : (
                        <span className="text-3xl">{p.emoji}</span>
                      )}
                    </span>
                    <span className="mt-2 block truncate px-1 text-xs font-medium text-foreground">{p.name}</span>
                    <span className="block px-1 pb-1 text-xs text-muted-foreground">
                      {p.price > 0 ? `from ₹${p.price}` : "On request"}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-card py-3 text-center">
            {heroStats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-xl font-bold text-gold-dark">{s.value}</div>
                <div className="text-[0.7rem] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

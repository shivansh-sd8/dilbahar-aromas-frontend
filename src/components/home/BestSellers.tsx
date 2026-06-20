import React from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { products as fallbackProducts } from "@/lib/config";
import ProductCard, { type ProductCardData } from "@/components/products/ProductCard";

const BestSellers = async () => {
  let featured: ProductCardData[] = fallbackProducts.slice(0, 8);
  let total = fallbackProducts.length;
  try {
    const all = await api.listProducts({ limit: 50 });
    if (all.length) {
      const sorted = [...all].sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
      featured = sorted.slice(0, 8);
      total = all.length;
    }
  } catch {
    /* fall back to static products */
  }

  return (
    <section className="bg-secondary/40 py-14">
      <div className="container-px">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-brand">Bestsellers this month</h2>
            <p className="mt-1 text-muted-foreground">GC-MS verified, batch-traceable favourites.</p>
          </div>
          <Link href="/collections" className="hidden text-sm font-semibold text-primary hover:underline sm:inline">
            View all {total} products →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View all {total} products with GC-MS specifications →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;

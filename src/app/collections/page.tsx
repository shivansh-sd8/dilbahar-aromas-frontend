import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import ProductCard from "@/components/products/ProductCard";
import { api } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { categories as fallbackCategories, products as fallbackProducts } from "@/lib/config";
import type { Category, Product } from "@/lib/types";

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Shop All Essential Oils & Categories",
  description:
    "Browse all categories of pure, GC-MS verified Kannauj essential oils — hair growth, skincare, pooja, floral waters and luxury oils.",
  path: "/collections",
});

export default async function CollectionsPage() {
  let cats: Pick<Category, "name" | "slug">[] = fallbackCategories;
  let products: Product[] | typeof fallbackProducts = fallbackProducts;
  try {
    const [fetchedCats, fetchedProducts] = await Promise.all([
      api.listCategories(),
      api.listProducts({ limit: 200 }),
    ]);
    if (fetchedCats.length) cats = fetchedCats;
    if (fetchedProducts.length) products = fetchedProducts;
  } catch {
    /* fall back to static data */
  }

  return (
    <>
      <PageHeader
        title="Shop pure Kannauj essential oils"
        subtitle="Every oil is single-origin, steam-distilled in copper degs and verified by GC-MS — with a batch code you can check online."
        crumbs={[{ label: "Shop" }]}
      />

      <section className="container-px py-12">
        <h2 className="font-display text-2xl font-bold text-brand">Browse by category</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {cats.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              className="group rounded-xl border border-border bg-card p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-3xl">🫙</span>
              <span className="mt-2 block text-sm font-semibold text-brand">{c.name}</span>
            </Link>
          ))}
        </div>

        <h2 className="mt-14 font-display text-2xl font-bold text-brand">All products</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import ProductGallery from "@/components/products/ProductGallery";
import ProductBuyBox from "@/components/products/ProductBuyBox";
import ProductTabs from "@/components/products/ProductTabs";
import ProductCard from "@/components/products/ProductCard";
import FaqAccordion from "@/components/content/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import { api } from "@/lib/api";
import { buildMetadata, productLd, breadcrumbLd, faqLd } from "@/lib/seo";
import type { Product } from "@/lib/types";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const products = await api.listProducts({ limit: 200 });
    return products.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await api.getProduct(slug);
  if (!product) return buildMetadata({ title: "Product not found", path: `/products/${slug}` });
  return buildMetadata({
    title: product.name,
    description: product.shortDescription || product.tagline,
    seo: product.seo,
    path: `/products/${slug}`,
    image: product.images?.[0],
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await api.getProduct(slug);
  if (!product) notFound();

  // Related: prefer explicit relatedSlugs, else same primary category.
  let related: Product[] = [];
  try {
    const all = await api.listProducts({ limit: 100 });
    const wanted = new Set(product.relatedSlugs ?? []);
    related = all.filter((p) => p.slug !== product.slug && wanted.has(p.slug));
    if (related.length < 4) {
      const cat = product.categorySlugs?.[0];
      const more = all.filter(
        (p) => p.slug !== product.slug && !wanted.has(p.slug) && cat && p.categorySlugs?.includes(cat)
      );
      related = [...related, ...more].slice(0, 4);
    }
  } catch {
    /* related is optional */
  }

  const faqs = product.faqs ?? [];
  const defaultSku = product.variants?.find((v) => v.isDefault)?.sku || product.variants?.[0]?.sku;

  return (
    <>
      <JsonLd
        data={[
          productLd({
            name: product.name,
            slug: product.slug,
            description: product.shortDescription || product.tagline,
            images: product.images,
            priceFrom: product.priceFrom,
            ratingAvg: product.ratingAvg,
            ratingCount: product.ratingCount,
            sku: defaultSku,
          }),
          breadcrumbLd([
            { name: "Shop", url: "/collections" },
            { name: product.name, url: `/products/${product.slug}` },
          ]),
          ...(faqs.length ? [faqLd(faqs)] : []),
        ]}
      />

      <section className="container-px py-8 sm:py-12">
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <span className="text-foreground/80">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} emoji={product.emoji} name={product.name} />

          <div>
            <h1 className="font-display text-3xl font-bold text-brand sm:text-4xl">{product.name}</h1>
            {(product.localName || product.tagline) && (
              <p className="mt-1 text-muted-foreground">
                {[product.localName, product.tagline].filter(Boolean).join(" · ")}
              </p>
            )}

            {product.ratingCount ? (
              <div className="mt-2 flex items-center gap-1.5 text-sm">
                <span className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${i < Math.round(product.ratingAvg ?? 0) ? "fill-gold text-gold" : "text-muted-foreground/40"}`}
                    />
                  ))}
                </span>
                <span className="text-muted-foreground">
                  {product.ratingAvg?.toFixed(1)} ({product.ratingCount} reviews)
                </span>
              </div>
            ) : null}

            {product.shortDescription && (
              <p className="mt-4 text-foreground/85">{product.shortDescription}</p>
            )}

            <div className="mt-6">
              <ProductBuyBox product={product} />
            </div>

          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <ProductTabs product={product} />
        </div>

        {faqs.length > 0 && (
          <div className="mx-auto mt-12 max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-brand">Frequently asked questions</h2>
            <div className="mt-4">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl font-bold text-brand">You may also like</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

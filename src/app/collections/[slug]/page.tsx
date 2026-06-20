import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import ProductCard from "@/components/products/ProductCard";
import JsonLd from "@/components/seo/JsonLd";
import FaqAccordion from "@/components/content/FaqAccordion";
import { api } from "@/lib/api";
import { buildMetadata, faqLd, breadcrumbLd } from "@/lib/seo";
import { products as fallbackProducts } from "@/lib/config";
import type { Product } from "@/lib/types";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const cats = await api.listCategories();
    return cats.map((c) => ({ slug: c.slug }));
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
  const category = await api.getCategory(slug);
  if (!category) return buildMetadata({ title: "Category not found", path: `/collections/${slug}` });
  return buildMetadata({
    title: category.heading || category.name,
    description: category.introCopy,
    seo: category.seo,
    path: `/collections/${slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await api.getCategory(slug);
  if (!category) notFound();

  let products: Product[] | typeof fallbackProducts = fallbackProducts;
  try {
    const fetched = await api.listProducts({ category: slug, limit: 200 });
    if (fetched.length) products = fetched;
  } catch {
    /* fall back to static products */
  }

  const faqs = category.faqs ?? [];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Shop", url: "/collections" },
            { name: category.name, url: `/collections/${slug}` },
          ]),
          ...(faqs.length ? [faqLd(faqs)] : []),
        ]}
      />
      <PageHeader
        title={category.heading || category.name}
        subtitle={category.introCopy}
        crumbs={[{ label: "Shop", href: "/collections" }, { label: category.name }]}
      />

      <section className="container-px py-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        {category.seoCopy && (
          <div className="mx-auto mt-14 max-w-3xl space-y-4 text-foreground/85">
            <h2 className="font-display text-2xl font-bold text-brand">About {category.name}</h2>
            <p>{category.seoCopy}</p>
          </div>
        )}

        {faqs.length > 0 && (
          <div className="mx-auto mt-12 max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-brand">Frequently asked questions</h2>
            <div className="mt-4">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>
        )}
      </section>
    </>
  );
}

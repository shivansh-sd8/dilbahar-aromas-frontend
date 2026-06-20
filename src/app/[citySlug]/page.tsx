import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import ProductCard from "@/components/products/ProductCard";
import JsonLd from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { buildMetadata, localBusinessLd, breadcrumbLd } from "@/lib/seo";
import { products, whatsappLink } from "@/lib/config";

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const cities = await api.listCityPages();
    return cities.map((c) => ({ citySlug: c.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}): Promise<Metadata> {
  const { citySlug } = await params;
  const page = await api.getCityPage(citySlug);
  if (!page) return buildMetadata({ title: "Page not found", path: `/${citySlug}`, seo: { noIndex: true } });
  return buildMetadata({
    title: page.heading,
    description: page.intro,
    seo: page.seo,
    path: `/${citySlug}`,
  });
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;
  const page = await api.getCityPage(citySlug);
  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={[
          localBusinessLd({ city: page.city, areaServed: page.areasServed }),
          breadcrumbLd([{ name: page.city, url: `/${page.slug}` }]),
        ]}
      />
      <PageHeader
        title={page.heading}
        subtitle={page.intro}
        crumbs={[{ label: "Locations" }, { label: page.city }]}
      />

      <section className="container-px py-12">
        <div className="mx-auto max-w-3xl space-y-4 text-foreground/85">
          <p>{page.body}</p>
          {page.areasServed.length > 0 && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Areas served:</span>{" "}
              {page.areasServed.join(" · ")}
            </p>
          )}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button render={<Link href="/collections" />}>Shop all oils</Button>
            <Button render={<a href={whatsappLink} target="_blank" rel="noopener noreferrer" />} variant="outline">
              Order on WhatsApp
            </Button>
          </div>
        </div>

        <h2 className="mt-14 font-display text-2xl font-bold text-brand">
          Popular essential oils in {page.city}
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}

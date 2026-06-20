import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, localBusinessLd, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Kannauj Essential Oils & Heritage — The Perfume Capital of India",
  description:
    "Discover Kannauj, the perfume capital of India, where essential oils and attars have been distilled for centuries. Learn why Kannauj origin matters for purity.",
  path: "/about/kannauj-heritage",
  seo: { keywords: ["kannauj essential oils", "kannauj heritage", "GI tag kannauj perfume", "ruh khus kannauj"] },
});

export default function KannaujHeritagePage() {
  return (
    <>
      <JsonLd
        data={[
          localBusinessLd(),
          breadcrumbLd([
            { name: "Our Story", url: "/about-us" },
            { name: "Kannauj Heritage", url: "/about/kannauj-heritage" },
          ]),
        ]}
      />
      <PageHeader
        title="Kannauj — the perfume capital of India"
        subtitle="For over 400 years, the city of Kannauj has been India's heart of attar and essential-oil distillation. This is where we have always made our oils."
        crumbs={[{ label: "Our Story", href: "/about-us" }, { label: "Kannauj Heritage" }]}
      />

      <article className="container-px py-12">
        <div className="prose-dba mx-auto max-w-3xl space-y-6 text-foreground/85">
          <p>
            Kannauj essential oils carry a legacy unlike anywhere else in the world. Known as the
            &ldquo;Kannauj&rdquo; or the perfume capital of India, this small city in Uttar Pradesh has
            distilled <strong>ruh khus, hina, kewra and rose</strong> since the Mughal era. Even today,
            artisans capture the first monsoon rain as <em>mitti attar</em> — the scent of wet earth.
          </p>
          <h2 className="font-display text-2xl font-bold text-brand">Why origin matters</h2>
          <p>
            The soil, climate and centuries-old distilling knowledge of Kannauj cannot be replicated.
            Wild vetiver grown in this region yields <Link href="/products/khus-oil" className="text-primary underline">ruh khus</Link> of
            a depth and coolness prized by perfumers worldwide. Kama Ayurveda and other luxury brands
            reference &ldquo;the roses of Kannauj&rdquo; — we distil at the source.
          </p>
          <h2 className="font-display text-2xl font-bold text-brand">A living craft</h2>
          <p>
            While most suppliers buy and re-bottle, our family still operates copper degs within
            Kannauj. This is not nostalgia — it is quality control. Distilling ourselves means we
            control the botanical, the heat, the timing and the testing of{" "}
            <Link href="/about/deg-bhapka-distillation" className="text-primary underline">every batch</Link>.
          </p>
          <h2 className="font-display text-2xl font-bold text-brand">From Kannauj to 18 countries</h2>
          <p>
            Today our Kannauj oils reach perfumers in Europe, agarbatti and cosmetic manufacturers
            across India, and wellness buyers in every metro. The thread connecting them is trust —
            and a batch code that proves it.
          </p>
        </div>
      </article>
    </>
  );
}

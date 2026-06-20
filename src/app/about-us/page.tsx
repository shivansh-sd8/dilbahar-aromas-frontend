import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { buildMetadata, localBusinessLd } from "@/lib/seo";
import { heroStats } from "@/lib/config";

export const metadata: Metadata = buildMetadata({
  title: "About Dil Bahar Aromas — Kannauj Distillers Since 1959",
  description:
    "Three generations of Kannauj distillers. We distil pure essential oils in copper degs — never source or re-blend — and verify every batch by GC-MS.",
  path: "/about-us",
});

const pillars = [
  { title: "We distil, we don't resell", desc: "Every oil leaves our own copper degs in Kannauj." },
  { title: "GC-MS every batch", desc: "Independent verification you can download by batch code." },
  { title: "65+ years of craft", desc: "Family knowledge passed down three generations since 1959." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={localBusinessLd()} />
      <PageHeader
        title="A Kannauj distilling house, since 1959"
        subtitle="We are a family of distillers in the perfume capital of India, making pure essential oils the traditional way — and proving their purity with modern science."
        crumbs={[{ label: "About Us" }]}
      />

      <section className="container-px py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="font-display text-xl font-semibold text-brand">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4 text-foreground/85">
            <h2 className="font-display text-2xl font-bold text-brand">Our story</h2>
            <p>
              Dil Bahar Aromas began in 1959 in the narrow lanes of Kannauj, Uttar Pradesh — a city
              that has distilled attars and essential oils for over four centuries. What started as a
              single deg has grown into a trusted supplier to perfumers, manufacturers and families
              across 18 countries.
            </p>
            <p>
              We never lost the craft. Our oils are still steam-distilled in copper degs using the
              deg-bhapka method, then tested by GC-MS so every customer — from a Delhi household to a
              Bengaluru agarbatti factory — can verify exactly what is in their bottle.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button render={<Link href="/about/kannauj-heritage" />}>Kannauj heritage</Button>
              <Button render={<Link href="/about/deg-bhapka-distillation" />} variant="outline">
                The deg-bhapka method
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 rounded-2xl border border-border bg-secondary/40 p-6">
            {heroStats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-bold text-gold-dark">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

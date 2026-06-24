import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Factory,
  FlaskConical,
  ShieldCheck,
  Globe2,
  Boxes,
  Leaf,
  PackageCheck,
} from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import B2BLeadForm from "@/components/home/B2BLeadForm";
import { buildMetadata, organizationLd, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Essential Oil & Aromatic Manufacturers in India — Dil Bahar Aromas",
  description:
    "Dil Bahar Aromas is a trusted essential oil, aromatic oil, fragrance compound and floral water manufacturer in India, based in Kannauj since 1959. GC-MS verified, bulk supply for Ayurveda, cosmetics, perfumery, agarbatti and tobacco industries.",
  path: "/manufacturers-in-india",
  seo: {
    keywords: [
      "manufacturers in india",
      "essential oil manufacturers in india",
      "aromatic oil manufacturers india",
      "fragrance compound manufacturers india",
      "perfume manufacturers india",
      "kannauj essential oil manufacturer",
      "bulk essential oil supplier india",
    ],
  },
});

const whatWeMake = [
  {
    icon: FlaskConical,
    title: "Essential Oils",
    desc: "Single-origin, steam-distilled oils — vetiver (ruh khus), eucalyptus (nilgiri), sandalwood, hina and more.",
    href: "/collections",
  },
  {
    icon: Leaf,
    title: "Aromatic & Natural Oils",
    desc: "Natural aromatic oils for wellness, cosmetics and therapeutic formulations, produced at scale.",
    href: "/products",
  },
  {
    icon: Boxes,
    title: "Fragrance Compounds",
    desc: "Ready-to-use compounds for agarbatti, gudaku and tobacco manufacturing — consistent aroma, supplied per kg.",
    href: "/collections/compounds",
  },
  {
    icon: PackageCheck,
    title: "Floral Waters",
    desc: "Food-grade and cosmetic-grade kewra (kewda) water and floral distillates for B2B buyers.",
    href: "/collections/floral-waters",
  },
];

const whyUs = [
  { icon: Factory, title: "Manufacturing since 1959", desc: "Three generations of distillation expertise in Kannauj, India's fragrance capital." },
  { icon: ShieldCheck, title: "GC-MS verified", desc: "Every batch ships with GC-MS, COA, MSDS and IFRA documentation you can verify." },
  { icon: Boxes, title: "Bulk & consistent supply", desc: "Distilled at source — the same aroma profile, batch after batch, at scale." },
  { icon: Globe2, title: "Export-ready", desc: "Documentation and packaging for pan-India and international shipments." },
];

const industries = [
  "Ayurveda & wellness",
  "Cosmetics & personal care",
  "Perfumery & attars",
  "Agarbatti & incense",
  "Tobacco & pan masala",
  "Food & beverage flavour",
];

const guides = [
  { slug: "essential-oils-manufacturers-in-india", title: "Essential Oils Manufacturers in India: Why Dil Bahar Aromas Leads" },
  { slug: "fragrance-manufacturers-in-india", title: "The Expertise of Fragrance Manufacturers in India" },
  { slug: "perfume-manufacturers-india", title: "Perfume Manufacturers in India: Scents That Resonate Globally" },
  { slug: "natural-aromatic-oil-manufacturers-in-india", title: "Natural Aromatic Oil Manufacturers: A B2B Buyer's Guide" },
  { slug: "cooling-essential-oils-for-ayurveda-manufacturers", title: "Cooling Essential Oils for Ayurveda Manufacturers" },
  { slug: "agarbatti-compounds-wholesale-manufacturers", title: "Agarbatti Compounds Wholesale Manufacturers" },
  { slug: "pure-sandalwood-oil-manufacturers-kannauj", title: "Pure Sandalwood Oil Manufacturers in Kannauj" },
  { slug: "kewra-water-manufacturers-in-india", title: "India's Finest Kewra Water Manufacturers" },
];

export default function ManufacturersInIndiaPage() {
  return (
    <>
      <JsonLd
        data={[
          organizationLd(),
          breadcrumbLd([{ name: "Manufacturers in India", url: "/manufacturers-in-india" }]),
        ]}
      />

      <PageHeader
        title="Essential Oil & Aromatic Manufacturers in India"
        subtitle="Dil Bahar Aromas — a trusted Kannauj-based manufacturer of essential oils, aromatic oils, fragrance compounds and floral waters since 1959."
        crumbs={[{ label: "Manufacturers in India" }]}
      />

      {/* Intro */}
      <section className="container-px py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-brand">
            One source for India&apos;s aromatic manufacturing needs
          </h2>
          <p className="mt-4 text-muted-foreground">
            From our distillery in Kannauj — India&apos;s fragrance capital — we supply premium
            essential oils, natural aromatic oils, fragrance compounds and floral waters to
            manufacturers and exporters across Ayurveda, cosmetics, perfumery, agarbatti and tobacco
            industries. Every product is single-origin, never re-blended, and backed by per-batch
            GC-MS documentation.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/b2b"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              See wholesale pricing
            </Link>
            <Link
              href="/contact-us"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      {/* What we manufacture */}
      <section className="bg-secondary/40 py-14">
        <div className="container-px">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-brand">What we manufacture</h2>
            <p className="mt-2 text-muted-foreground">Four product families, all produced at source in Kannauj.</p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeMake.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Icon className="size-7 text-gold-dark" />
                  <h3 className="mt-3 font-display text-lg font-semibold text-brand group-hover:text-gold-dark">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="container-px py-14">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-brand">Why buyers choose Dil Bahar Aromas</h2>
          <p className="mt-2 text-muted-foreground">A manufacturing partner, not just a supplier.</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((d) => {
            const Icon = d.icon;
            return (
              <div key={d.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <Icon className="size-7 text-gold-dark" />
                <h3 className="mt-3 font-display text-lg font-semibold text-brand">{d.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{d.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Industries served */}
      <section className="bg-secondary/40 py-14">
        <div className="container-px mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-brand">Industries we serve</h2>
          <p className="mt-2 text-muted-foreground">
            Our oils and compounds are formulated for the demands of large-scale manufacturing.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            {industries.map((i) => (
              <span
                key={i}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground/80"
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Guides cluster */}
      <section className="container-px py-14">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-brand">Guides for manufacturers</h2>
          <p className="mt-2 text-muted-foreground">In-depth B2B guides on sourcing aromatic ingredients in India.</p>
        </div>
        <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/blog/${g.slug}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-medium text-foreground/85 shadow-sm transition hover:border-primary hover:text-primary"
            >
              <Leaf className="size-4 shrink-0 text-gold-dark" />
              {g.title}
            </Link>
          ))}
        </div>
      </section>

      <B2BLeadForm />
    </>
  );
}

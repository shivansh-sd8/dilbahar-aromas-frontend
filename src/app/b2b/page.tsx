import React from "react";
import type { Metadata } from "next";
import { Boxes, FileCheck2, Truck, Globe2 } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import B2BLeadForm from "@/components/home/B2BLeadForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "B2B Wholesale — Bulk Essential Oils Supplier in India",
  description:
    "Bulk and wholesale essential oils from Kannauj for agarbatti, cosmetic, perfumery and export manufacturers. Tiered MOQ pricing, GC-MS documentation, samples in 48 hours.",
  path: "/b2b",
  seo: { keywords: ["bulk essential oils india wholesale", "agarbatti compound supplier india", "essential oil exporter india", "private label essential oil india"] },
});

const tiers = [
  { name: "Starter", moq: "1–5 kg", desc: "List price per kg. Ideal for trials and small batches.", note: "Standard pricing" },
  { name: "Trade", moq: "5–25 kg", desc: "Volume discount with priority dispatch.", note: "Up to 10% off", highlight: true },
  { name: "Bulk", moq: "25 kg+", desc: "Best per-kg rate, custom packaging and contracts.", note: "Custom quote" },
];

const docs = [
  { icon: FileCheck2, title: "Full documentation", desc: "GC-MS, COA, MSDS, IFRA and allergen statements with every batch." },
  { icon: Boxes, title: "Consistent supply", desc: "Distilled at source in Kannauj — same profile, batch after batch." },
  { icon: Truck, title: "Fast samples", desc: "Samples dispatched in 48 hours, pan-India and export-ready." },
  { icon: Globe2, title: "Export support", desc: "Documentation and packaging for international shipments." },
];

export default function B2BPage() {
  return (
    <>
      <PageHeader
        title="B2B wholesale & manufacturing supply"
        subtitle="The Kannauj essential oil supplier your formulation team can trust — with documentation, consistency and tiered per-kg pricing."
        crumbs={[{ label: "B2B Wholesale" }]}
      />

      {/* Pricing tiers */}
      <section className="container-px py-14">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-brand">Wholesale pricing tiers</h2>
          <p className="mt-2 text-muted-foreground">All oils sold per kg. The more you order, the better the rate.</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl border p-6 shadow-sm ${
                t.highlight ? "border-primary bg-primary/5" : "border-border bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-brand">{t.name}</h3>
                <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-dark">{t.note}</span>
              </div>
              <p className="mt-3 text-2xl font-bold text-foreground">{t.moq}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-secondary/40 py-14">
        <div className="container-px grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {docs.map((d) => {
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

      <B2BLeadForm />
    </>
  );
}

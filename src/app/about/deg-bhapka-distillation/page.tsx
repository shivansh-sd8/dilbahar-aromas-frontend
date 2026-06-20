import React from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Deg-Bhapka Distillation — The Traditional Kannauj Method",
  description:
    "How the deg-bhapka method works: steam distillation in copper degs, the centuries-old Kannauj technique behind our pure essential oils and attars.",
  path: "/about/deg-bhapka-distillation",
  seo: { keywords: ["deg bhapka distillation", "kannauj distillation", "copper deg"] },
});

const steps = [
  { title: "The Deg (still)", desc: "Botanicals and water are loaded into a copper deg and sealed with cotton and clay." },
  { title: "The Bhapka (receiver)", desc: "Steam carrying the aroma travels through a bamboo pipe (chonga) into a receiver, kept cool in water." },
  { title: "Slow heating", desc: "Wood-fired heat is controlled by hand for hours — too fast scorches the note, too slow loses yield." },
  { title: "Capture & rest", desc: "The oil is separated, rested, then GC-MS tested and batch-coded before bottling." },
];

export default function DegBhapkaPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Our Story", url: "/about-us" },
          { name: "Deg-Bhapka Distillation", url: "/about/deg-bhapka-distillation" },
        ])}
      />
      <PageHeader
        title="The deg-bhapka method"
        subtitle="The traditional Kannauj technique of steam distillation in copper degs — unchanged in principle since 1959."
        crumbs={[{ label: "Our Story", href: "/about-us" }, { label: "Deg-Bhapka Method" }]}
      />

      <section className="container-px py-12">
        <div className="mx-auto max-w-3xl space-y-5 text-foreground/85">
          <p>
            Deg-bhapka is the hydro-distillation method that made Kannauj famous. Unlike industrial
            steam plants, it relies on the distiller&apos;s judgement — reading the heat, the steam and
            the aroma by hand. It is slower and more demanding, and it produces oils with a roundness
            that fast methods cannot match.
          </p>
        </div>

        <ol className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="flex size-9 items-center justify-center rounded-full bg-gold font-display text-lg font-bold text-brand">
                {i + 1}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-brand">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

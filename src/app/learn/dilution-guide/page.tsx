import React from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = buildMetadata({
  title: "Essential Oil Dilution Chart & Guide",
  description:
    "Free essential oil dilution chart: exact drops per carrier oil for face, body, children and massage. Safe dilution ratios from Dil Bahar Aromas.",
  path: "/learn/dilution-guide",
  seo: { keywords: ["essential oil dilution chart", "essential oil dilution guide"] },
});

const rows = [
  { use: "Face / sensitive skin", percent: "0.5–1%", drops: "3–6 drops" },
  { use: "Body & general use", percent: "2%", drops: "12 drops" },
  { use: "Massage", percent: "2–3%", drops: "12–18 drops" },
  { use: "Targeted / short-term", percent: "5%", drops: "30 drops" },
  { use: "Children (2+) / elderly", percent: "0.25–0.5%", drops: "1–3 drops" },
];

const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to dilute essential oils safely",
  step: rows.map((r) => ({
    "@type": "HowToStep",
    name: r.use,
    text: `Use ${r.drops} of essential oil per 30 ml (2 tbsp) carrier oil for a ${r.percent} dilution.`,
  })),
};

export default function DilutionGuidePage() {
  return (
    <>
      <JsonLd data={howToLd} />
      <PageHeader
        title="Essential oil dilution guide"
        subtitle="Always dilute essential oils in a carrier oil before applying to skin. Use this chart for safe ratios per 30 ml (2 tbsp) of carrier."
        crumbs={[{ label: "Learn" }, { label: "Dilution Guide" }]}
      />
      <section className="container-px py-12">
        <div className="mx-auto max-w-3xl">
          <Table className="rounded-2xl border border-border bg-card">
            <TableHeader>
              <TableRow>
                <TableHead>Use case</TableHead>
                <TableHead>Dilution</TableHead>
                <TableHead>Drops per 30 ml</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.use}>
                  <TableCell className="font-medium text-brand">{r.use}</TableCell>
                  <TableCell>{r.percent}</TableCell>
                  <TableCell>{r.drops}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="mt-6 text-sm text-muted-foreground">
            Patch-test before first use. Avoid use on infants, during pregnancy, or on broken skin
            without professional guidance. These are general guidelines, not medical advice.
          </p>
        </div>
      </section>
    </>
  );
}

import React from "react";
import Link from "next/link";
import { heroStats } from "@/lib/config";

const steps = [
  { n: 1, title: "Farm sourcing", desc: "Botanicals from trusted Kannauj-region farms" },
  { n: 2, title: "Deg-bhapka", desc: "Steam distillation in traditional copper degs" },
  { n: 3, title: "In-house QC", desc: "GC-MS testing on every single batch" },
  { n: 4, title: "Batch-coded", desc: "Sealed, labelled and traceable to source" },
];

const HeritageSection: React.FC = () => {
  return (
    <section className="bg-brand text-brand-foreground">
      <div className="container-px grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-gold">Our heritage</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            From the copper degs of Kannauj — pure essential oils since 1959
          </h2>
          <div className="mt-5 space-y-4 text-brand-foreground/80">
            <p>
              Kannauj is the perfume capital of India, where attars have been distilled for centuries.
              For three generations our family has worked the same copper degs, coaxing aroma from
              flower, root and resin.
            </p>
            <p>
              Our deg-bhapka method is unhurried and traditional — steam carries the essence from the
              deg into a receiver cooled in water, exactly as it was done in 1959.
            </p>
            <p>
              The proof is in the report. Every batch is GC-MS tested, and every bottle carries a code
              you can verify online. We don&apos;t ask you to trust us — we show you.
            </p>
          </div>

          <div className="mt-7 grid max-w-md grid-cols-3 gap-4">
            {heroStats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-bold text-gold">{s.value}</div>
                <div className="text-xs text-brand-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>

          <Link
            href="/about/kannauj-heritage"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline"
          >
            Read the Kannauj heritage story →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-brand-foreground/15 bg-brand-foreground/5 p-5">
              <span className="flex size-9 items-center justify-center rounded-full bg-gold font-display text-lg font-bold text-brand">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-gold">{s.title}</h3>
              <p className="mt-1 text-sm text-brand-foreground/75">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeritageSection;

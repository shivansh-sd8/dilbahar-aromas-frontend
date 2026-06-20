"use client";

import React from "react";
import Link from "next/link";
import { Sprout, Sparkles, Gift, Factory, FlaskConical, Globe } from "lucide-react";
import { audienceCards } from "@/lib/config";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sprout: Sprout,
  sparkles: Sparkles,
  gift: Gift,
  factory: Factory,
  "flask-conical": FlaskConical,
  globe: Globe,
};

const AudienceToggle: React.FC = () => {
  const [mode, setMode] = React.useState<"d2c" | "b2b">("d2c");
  const cards = audienceCards[mode];

  return (
    <section className="container-px py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-brand">What are you shopping for?</h2>
        <p className="mt-2 text-muted-foreground">
          One house, two ways to buy — personal wellness or business supply.
        </p>
      </div>

      <div className="mx-auto mt-6 inline-flex w-full max-w-xs items-center rounded-full border border-border bg-card p-1 text-sm font-medium sm:mx-auto sm:flex">
        {(["d2c", "b2b"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 rounded-full px-4 py-2 transition-colors ${
              mode === m ? "bg-primary text-primary-foreground" : "text-foreground/70"
            }`}
          >
            {m === "d2c" ? "For personal use" : "For your business"}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {cards.map((c) => {
          const Icon = iconMap[c.icon] ?? Sparkles;
          return (
            <Link
              key={c.title}
              href={mode === "d2c" ? "/collections" : "/b2b"}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-secondary text-gold-dark">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-brand">{c.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default AudienceToggle;

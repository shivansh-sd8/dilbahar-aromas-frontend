import React from "react";
import { Star } from "lucide-react";
import { reviews } from "@/lib/config";

const Reviews: React.FC = () => {
  return (
    <section className="container-px py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-brand">Trusted across three worlds</h2>
        <p className="mt-2 text-muted-foreground">
          International perfumers, Indian manufacturers and wellness buyers — all verified.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <figure key={r.author} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-3 flex-1 text-sm text-foreground/85">“{r.quote}”</blockquote>
            <figcaption className="mt-4 border-t border-border pt-3">
              <div className="font-semibold text-brand">{r.author}</div>
              <div className="text-xs text-muted-foreground">{r.role} · {r.location}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default Reviews;

import React from "react";
import { trustSignals } from "@/lib/config";

const TrustBar: React.FC = () => {
  return (
    <section className="border-y border-brand/20 bg-brand text-brand-foreground">
      <div className="container-px flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-3 text-sm">
        {trustSignals.map((t, i) => (
          <React.Fragment key={t}>
            {i > 0 && <span className="hidden text-gold/50 sm:inline">·</span>}
            <span className="flex items-center gap-1.5">
              <span className="text-gold">✦</span> {t}
            </span>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default TrustBar;

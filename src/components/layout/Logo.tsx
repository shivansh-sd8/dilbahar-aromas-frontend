import React from "react";
import Link from "next/link";

const Logo: React.FC<{ variant?: "light" | "dark"; className?: string }> = ({
  variant = "dark",
  className = "",
}) => {
  const accent = variant === "light" ? "text-gold" : "text-gold-dark";
  const main = variant === "light" ? "text-brand-foreground" : "text-brand";
  const badge =
    variant === "light"
      ? "border-gold/60 text-gold"
      : "border-gold-dark/50 text-gold-dark";
  return (
    <Link href="/" className={`group flex items-center gap-2.5 leading-none ${className}`} aria-label="Dil Bahar Aromas — home">
      <span
        className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full border ${badge} text-lg transition-transform group-hover:rotate-12 sm:size-10`}
      >
        ✿
      </span>
      <span className="flex flex-col">
        <span className={`font-display text-xl font-bold tracking-wide sm:text-2xl ${main}`}>
          Dil Bahar
        </span>
        <span className={`text-[0.6rem] font-medium uppercase tracking-[0.35em] ${accent}`}>
          Aromas · Kannauj
        </span>
      </span>
    </Link>
  );
};

export default Logo;

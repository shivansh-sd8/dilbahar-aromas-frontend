import React from "react";
import Link from "next/link";

const Logo: React.FC<{ variant?: "light" | "dark"; className?: string }> = ({
  variant = "dark",
  className = "",
}) => {
  const accent = variant === "light" ? "text-gold" : "text-gold-dark";
  const main = variant === "light" ? "text-brand-foreground" : "text-brand";
  return (
    <Link href="/" className={`group flex flex-col leading-none ${className}`} aria-label="Dil Bahar Aromas — home">
      <span className="flex items-center gap-1.5">
        <span className={`text-2xl ${accent}`}>❋</span>
        <span className={`font-display text-xl font-bold tracking-wide sm:text-2xl ${main}`}>
          Dil Bahar
        </span>
      </span>
      <span className={`pl-7 text-[0.6rem] font-medium uppercase tracking-[0.35em] ${accent}`}>
        Aromas · Kannauj
      </span>
    </Link>
  );
};

export default Logo;

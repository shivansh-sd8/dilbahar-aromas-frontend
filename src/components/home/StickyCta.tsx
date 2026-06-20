import React from "react";
import Link from "next/link";
import { whatsappLink } from "@/lib/config";

const StickyCta: React.FC = () => {
  return (
    <section className="bg-gold-dark text-white">
      <div className="container-px flex flex-col items-center justify-between gap-4 py-6 text-center sm:flex-row sm:text-left">
        <p className="font-display text-xl font-semibold">
          Ready to experience pure Kannauj oils?
        </p>
        <div className="flex gap-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold backdrop-blur hover:bg-white/25"
          >
            Chat on WhatsApp
          </a>
          <Link
            href="/collections"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gold-dark hover:bg-white/90"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StickyCta;

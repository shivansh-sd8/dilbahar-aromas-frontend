import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { site } from "@/lib/config";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Products",
    links: [
      { label: "Nilgiri Oil", href: "/products/nilgiri-oil" },
      { label: "Eucalyptus Oil", href: "/products/eucalyptus-oil" },
      { label: "Khus Oil", href: "/products/khus-oil" },
      { label: "Sandalwood Oil", href: "/products/sandalwood-oil" },
      { label: "Ambari Hina", href: "/products/ambari-hina" },
      { label: "Kewra", href: "/products/kewra" },
      { label: "Cardamom Oil", href: "/products/cardamom-oil" },
      { label: "All products", href: "/collections" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Dilution Guide", href: "/learn/dilution-guide" },
      { label: "Kannauj Heritage", href: "/about/kannauj-heritage" },
      { label: "Deg-Bhapka Method", href: "/about/deg-bhapka-distillation" },
      { label: "Blog & Guides", href: "/blog" },
      { label: "FAQ", href: "/contact-us" },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "B2B Wholesale", href: "/b2b" },
      { label: "Private Label", href: "/b2b" },
      { label: "Sample Request", href: "/b2b" },
      { label: "Export Inquiry", href: "/b2b" },
      { label: "Certifications", href: "/about-us" },
    ],
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "T&Cs", href: "/terms-and-conditions" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-brand text-brand-foreground">
      <div className="container-px grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <span className="font-display text-2xl font-bold text-gold">Dil Bahar Aromas</span>
          <p className="mt-3 max-w-sm text-sm text-brand-foreground/70">
            Pure essential oils distilled in the copper degs of Kannauj since {site.foundedYear}.
            We distil — we don&apos;t resell. Every batch is GC-MS verified.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-brand-foreground/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              {site.address.street}, {site.address.city} {site.address.pincode}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-gold" />
              <a href={`tel:${site.phone}`} className="hover:text-gold">{site.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-gold" />
              <a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a>
            </li>
          </ul>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-sm text-brand-foreground/75 transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-brand-foreground/10">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-5 text-xs text-brand-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name} · FSSAI Registered · Kannauj, Uttar Pradesh</p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-gold">{l.label}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

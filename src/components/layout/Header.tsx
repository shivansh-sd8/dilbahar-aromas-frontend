"use client";

import React from "react";
import Link from "next/link";
import { Menu, Search, User, ShoppingBag, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { categories } from "@/lib/config";
import { useCart } from "@/lib/cart";

const CartButton: React.FC<{ dark?: boolean }> = ({ dark = false }) => {
  const { count } = useCart();
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Cart"
      className={`relative ${dark ? "text-brand-foreground hover:bg-brand-foreground/10" : ""}`}
      render={<Link href="/cart" />}
    >
      <ShoppingBag className="size-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 inline-flex size-4 items-center justify-center rounded-full bg-primary text-[0.6rem] font-bold text-primary-foreground">
          {count}
        </span>
      )}
    </Button>
  );
};

interface NavGroup {
  label: string;
  href?: string;
  items?: { label: string; href: string; desc?: string }[];
}

const navGroups: NavGroup[] = [
  {
    label: "Shop",
    href: "/collections",
    items: [
      ...categories.map((c) => ({ label: c.name, href: `/collections/${c.slug}`, desc: c.blurb })),
      { label: "View all products", href: "/collections", desc: "Browse the full range" },
    ],
  },
  {
    label: "Our Story",
    items: [
      { label: "About Us", href: "/about-us", desc: "65+ years of Kannauj distillation" },
      { label: "Kannauj Heritage", href: "/about/kannauj-heritage", desc: "The perfume capital of India" },
      { label: "Deg-Bhapka Method", href: "/about/deg-bhapka-distillation", desc: "Our copper-still process" },
    ],
  },
  {
    label: "Learn",
    items: [
      { label: "Blog & Guides", href: "/blog", desc: "Hindi & English guides" },
      { label: "Dilution Guide", href: "/learn/dilution-guide", desc: "Exact carrier ratios" },
      { label: "FAQ", href: "/contact-us", desc: "Common questions" },
    ],
  },
  {
    label: "B2B Wholesale",
    items: [
      { label: "Wholesale Pricing", href: "/b2b", desc: "Tiered MOQ tables" },
      { label: "Request Sample", href: "/b2b", desc: "100ml–500ml dispatch" },
      { label: "Private Label", href: "/b2b", desc: "OEM & custom blends" },
      { label: "Export Inquiry", href: "/b2b", desc: "International buyers" },
    ],
  },
];

const Header: React.FC<{ tone?: "light" | "dark" }> = ({ tone = "light" }) => {
  const [open, setOpen] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  const dark = tone === "dark";

  const headerCls = dark
    ? "sticky top-0 z-50 w-full border-b border-brand-foreground/15 bg-brand/95 text-brand-foreground backdrop-blur supports-[backdrop-filter]:bg-brand/85"
    : "sticky top-0 z-50 w-full border-b border-border bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80";
  const navLinkCls = dark
    ? "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-brand-foreground/85 transition-colors hover:text-gold"
    : "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/85 transition-colors hover:text-primary";

  return (
    <header className={headerCls}>
      <div className="container-px flex h-16 items-center justify-between gap-4 lg:h-20">
        {/* Mobile menu trigger */}
        <div className="flex items-center lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open menu" className={dark ? "text-brand-foreground hover:bg-brand-foreground/10" : undefined} />}>
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto bg-cream p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="border-b border-border p-4">
                <Logo />
              </div>
              <Accordion className="px-2">
                {navGroups.map((g) => (
                  <AccordionItem key={g.label} value={g.label}>
                    <AccordionTrigger className="px-2 text-base font-medium">
                      {g.label}
                    </AccordionTrigger>
                    <AccordionContent className="pb-2">
                      <ul className="space-y-1">
                        {g.items?.map((it) => (
                          <li key={it.href + it.label}>
                            <Link
                              href={it.href}
                              onClick={() => setOpen(false)}
                              className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-secondary"
                            >
                              {it.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="space-y-2 p-4">
                <Button render={<Link href="/collections" onClick={() => setOpen(false)} />} className="w-full">
                  Shop Now
                </Button>
                <Button render={<Link href="/b2b" onClick={() => setOpen(false)} />} variant="outline" className="w-full">
                  B2B Login
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Logo variant={dark ? "light" : "dark"} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setActiveMenu(null)}>
          {navGroups.map((g) => (
            <div key={g.label} className="relative" onMouseEnter={() => setActiveMenu(g.label)}>
              <Link
                href={g.href || "#"}
                className={navLinkCls}
              >
                {g.label}
                {g.items && <ChevronDown className="size-3.5 opacity-60" />}
              </Link>
              {g.items && activeMenu === g.label && (
                <div className="absolute left-0 top-full w-72 rounded-lg border border-border bg-card p-2 shadow-xl">
                  {g.items.map((it) => (
                    <Link
                      key={it.href + it.label}
                      href={it.href}
                      className="block rounded-md px-3 py-2 hover:bg-secondary"
                    >
                      <span className="block text-sm font-medium text-foreground">{it.label}</span>
                      {it.desc && <span className="block text-xs text-muted-foreground">{it.desc}</span>}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search" className={`hidden sm:inline-flex ${dark ? "text-brand-foreground hover:bg-brand-foreground/10" : ""}`}>
            <Search className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Account" className={dark ? "text-brand-foreground hover:bg-brand-foreground/10" : undefined} render={<Link href="/account" />}>
            <User className="size-5" />
          </Button>
          <CartButton dark={dark} />
          <Button render={<Link href="/b2b" />} variant="outline" className={`ml-1 hidden xl:inline-flex ${dark ? "border-brand-foreground/40 bg-transparent text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground" : ""}`}>
            B2B Login
          </Button>
          <Button render={<Link href="/collections" />} className="ml-1 hidden lg:inline-flex">
            Shop Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

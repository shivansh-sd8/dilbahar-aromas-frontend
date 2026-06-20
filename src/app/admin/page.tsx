"use client";

import React from "react";
import Link from "next/link";
import { FileText, MapPin, Tags, Package, ShoppingCart, MessageSquareQuote, Plus } from "lucide-react";
import adminApi from "@/lib/adminApi";

export default function AdminDashboard() {
  const [counts, setCounts] = React.useState({ orders: 0, enquiries: 0, products: 0, blog: 0, cities: 0, categories: 0 });

  React.useEffect(() => {
    Promise.allSettled([
      adminApi.listOrders(),
      adminApi.listEnquiries(),
      adminApi.listProducts(),
      adminApi.listBlog(),
      adminApi.listCities(),
      adminApi.listCategories(),
    ]).then(([o, e, p, b, c, cat]) =>
      setCounts({
        orders: o.status === "fulfilled" ? o.value.length : 0,
        enquiries: e.status === "fulfilled" ? e.value.length : 0,
        products: p.status === "fulfilled" ? p.value.length : 0,
        blog: b.status === "fulfilled" ? b.value.length : 0,
        cities: c.status === "fulfilled" ? c.value.length : 0,
        categories: cat.status === "fulfilled" ? cat.value.length : 0,
      })
    );
  }, []);

  const cards = [
    { label: "Orders", value: counts.orders, href: "/admin/orders", icon: ShoppingCart },
    { label: "Enquiries", value: counts.enquiries, href: "/admin/enquiries", icon: MessageSquareQuote },
    { label: "Products", value: counts.products, href: "/admin/products", icon: Package },
    { label: "Blog posts", value: counts.blog, href: "/admin/blog", icon: FileText },
    { label: "City pages", value: counts.cities, href: "/admin/cities", icon: MapPin },
    { label: "Categories", value: counts.categories, href: "/admin/categories", icon: Tags },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand">Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Manage your SEO content from one place.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              href={c.href}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <Icon className="size-6 text-gold-dark" />
                <span className="font-display text-3xl font-bold text-brand">{c.value}</span>
              </div>
              <p className="mt-3 font-medium text-foreground">{c.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/blog/new" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          <Plus className="size-4" /> New blog post
        </Link>
        <Link href="/admin/products/new" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          <Plus className="size-4" /> New product
        </Link>
        <Link href="/admin/cities/new" className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary">
          <Plus className="size-4" /> New city page
        </Link>
      </div>
    </div>
  );
}

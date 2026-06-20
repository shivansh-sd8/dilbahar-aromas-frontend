"use client";

import React from "react";
import Link from "next/link";
import { Pencil, ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import adminApi from "@/lib/adminApi";
import type { Category } from "@/lib/types";

export default function AdminCategoriesList() {
  const [cats, setCats] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    adminApi.listCategories().then(setCats).catch(() => setCats([])).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-brand">Categories</h1>
        <Button render={<Link href="/admin/categories/new" />}>
          <Plus className="size-4" /> New category
        </Button>
      </div>
      <p className="mt-1 text-muted-foreground">Edit category headings, intro/SEO copy and meta tags.</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <p className="p-6 text-muted-foreground">Loading…</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cats.map((c) => (
                <tr key={c._id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.slug}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <a href={`/collections/${c.slug}`} target="_blank" rel="noopener noreferrer" className="rounded-md p-1.5 hover:bg-secondary" aria-label="View">
                        <ExternalLink className="size-4" />
                      </a>
                      <Link href={`/admin/categories/${c._id}`} className="rounded-md p-1.5 hover:bg-secondary" aria-label="Edit">
                        <Pencil className="size-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

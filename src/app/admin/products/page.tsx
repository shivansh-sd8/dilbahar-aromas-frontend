"use client";

import React from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import adminApi from "@/lib/adminApi";
import type { Product } from "@/lib/types";

export default function AdminProductsList() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(() => {
    setLoading(true);
    adminApi.listProducts().then(setProducts).catch(() => setProducts([])).finally(() => setLoading(false));
  }, []);

  React.useEffect(() => { load(); }, [load]);

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await adminApi.deleteProduct(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-brand">Products</h1>
        <Button render={<Link href="/admin/products/new" />}>
          <Plus className="size-4" /> New product
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <p className="p-6 text-muted-foreground">Loading…</p>
        ) : products.length === 0 ? (
          <p className="p-6 text-muted-foreground">No products yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">From</th>
                <th className="px-4 py-3">Variants</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {p.emoji} {p.name}
                    {p.bestseller && <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-[0.65rem] text-gold-dark">Bestseller</span>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">₹{p.priceFrom ?? 0}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.variants?.length ?? 0}</td>
                  <td className="px-4 py-3">{p.isActive ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <a href={`/products/${p.slug}`} target="_blank" rel="noopener noreferrer" className="rounded-md p-1.5 hover:bg-secondary" aria-label="View">
                        <ExternalLink className="size-4" />
                      </a>
                      <Link href={`/admin/products/${p._id}`} className="rounded-md p-1.5 hover:bg-secondary" aria-label="Edit">
                        <Pencil className="size-4" />
                      </Link>
                      <button onClick={() => remove(p._id)} className="rounded-md p-1.5 text-destructive hover:bg-destructive/10" aria-label="Delete">
                        <Trash2 className="size-4" />
                      </button>
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

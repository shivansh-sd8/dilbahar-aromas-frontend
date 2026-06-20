"use client";

import React from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import adminApi from "@/lib/adminApi";
import type { CityPage } from "@/lib/types";

export default function AdminCitiesList() {
  const [cities, setCities] = React.useState<CityPage[]>([]);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(() => {
    setLoading(true);
    adminApi.listCities().then(setCities).catch(() => setCities([])).finally(() => setLoading(false));
  }, []);

  React.useEffect(() => { load(); }, [load]);

  const remove = async (id: string) => {
    if (!confirm("Delete this city page?")) return;
    await adminApi.deleteCity(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-brand">City pages</h1>
        <Button render={<Link href="/admin/cities/new" />}>
          <Plus className="size-4" /> New city
        </Button>
      </div>
      <p className="mt-1 text-muted-foreground">Template-driven SEO landing pages with per-city overrides.</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <p className="p-6 text-muted-foreground">Loading…</p>
        ) : cities.length === 0 ? (
          <p className="p-6 text-muted-foreground">No city pages yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">State</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((c) => (
                <tr key={c._id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{c.city}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.state}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.slug}</td>
                  <td className="px-4 py-3">{c.isActive ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <a href={`/${c.slug}`} target="_blank" rel="noopener noreferrer" className="rounded-md p-1.5 hover:bg-secondary" aria-label="View">
                        <ExternalLink className="size-4" />
                      </a>
                      <Link href={`/admin/cities/${c._id}`} className="rounded-md p-1.5 hover:bg-secondary" aria-label="Edit">
                        <Pencil className="size-4" />
                      </Link>
                      <button onClick={() => remove(c._id)} className="rounded-md p-1.5 text-destructive hover:bg-destructive/10" aria-label="Delete">
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

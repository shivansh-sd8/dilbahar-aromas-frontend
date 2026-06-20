"use client";

import React from "react";
import adminApi from "@/lib/adminApi";
import type { Enquiry } from "@/lib/types";

const STATUSES = ["new", "contacted", "quoted", "closed"] as const;

const statusColor: Record<string, string> = {
  new: "bg-amber-100 text-amber-800",
  contacted: "bg-blue-100 text-blue-800",
  quoted: "bg-indigo-100 text-indigo-800",
  closed: "bg-green-100 text-green-800",
};

const typeColor: Record<string, string> = {
  quote: "bg-primary/15 text-primary",
  b2b: "bg-gold/20 text-gold-dark",
  sample: "bg-secondary text-secondary-foreground",
  wholesale: "bg-gold/20 text-gold-dark",
  export: "bg-secondary text-secondary-foreground",
};

export default function AdminEnquiriesPage() {
  const [items, setItems] = React.useState<Enquiry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [expanded, setExpanded] = React.useState<string | null>(null);
  const [typeFilter, setTypeFilter] = React.useState("");

  const load = React.useCallback(() => {
    setLoading(true);
    adminApi
      .listEnquiries(typeFilter ? { type: typeFilter } : {})
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [typeFilter]);

  React.useEffect(() => { load(); }, [load]);

  const changeStatus = async (id: string, status: string) => {
    await adminApi.updateEnquiryStatus(id, status);
    setItems((prev) => prev.map((e) => (e._id === id ? { ...e, status: status as Enquiry["status"] } : e)));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand">Enquiries</h1>
          <p className="mt-1 text-muted-foreground">Quote requests, B2B leads and sample requests.</p>
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">All types</option>
          <option value="quote">Quote</option>
          <option value="b2b">B2B</option>
          <option value="sample">Sample</option>
          <option value="wholesale">Wholesale</option>
          <option value="export">Export</option>
        </select>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <p className="p-6 text-muted-foreground">Loading…</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-muted-foreground">No enquiries yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((e) => (
                <React.Fragment key={e._id}>
                  <tr className="cursor-pointer border-t border-border hover:bg-secondary/30" onClick={() => setExpanded(expanded === e._id ? null : e._id)}>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${typeColor[e.type] ?? ""}`}>
                        {e.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{e.name}</div>
                      {e.company && <div className="text-xs text-muted-foreground">{e.company}</div>}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <div>{e.email}</div>
                      {e.phone && <div className="text-xs">{e.phone}</div>}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{e.items?.length || 0}</td>
                    <td className="px-4 py-3" onClick={(ev) => ev.stopPropagation()}>
                      <select
                        value={e.status}
                        onChange={(ev) => changeStatus(e._id, ev.target.value)}
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${statusColor[e.status] ?? ""}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {new Date(e.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                  {expanded === e._id && (
                    <tr className="border-t border-border bg-secondary/20">
                      <td colSpan={6} className="px-4 py-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <p className="text-xs font-semibold uppercase text-muted-foreground">Items</p>
                            {e.items?.length ? (
                              <ul className="mt-2 space-y-1">
                                {e.items.map((it, i) => (
                                  <li key={i} className="text-sm">
                                    {it.name} {it.size ? `· ${it.size}` : ""} × {it.qty}
                                    {it.price ? ` — ₹${it.price}` : ""}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="mt-2 text-sm text-muted-foreground">—</p>
                            )}
                            {(e.gstin || e.city) && (
                              <p className="mt-3 text-xs text-muted-foreground">
                                {e.city && <>City: {e.city} </>}
                                {e.gstin && <>· GSTIN: {e.gstin}</>}
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase text-muted-foreground">Message</p>
                            <p className="mt-2 whitespace-pre-line text-sm text-foreground/85">
                              {e.message || "—"}
                            </p>
                            <p className="mt-3 text-xs text-muted-foreground">Source: {e.source || "website"}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

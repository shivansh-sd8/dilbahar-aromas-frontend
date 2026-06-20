"use client";

import React from "react";
import adminApi from "@/lib/adminApi";
import type { Order } from "@/lib/types";

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [expanded, setExpanded] = React.useState<string | null>(null);

  const load = React.useCallback(() => {
    setLoading(true);
    adminApi.listOrders().then(setOrders).catch(() => setOrders([])).finally(() => setLoading(false));
  }, []);

  React.useEffect(() => { load(); }, [load]);

  const changeStatus = async (id: string, status: string) => {
    await adminApi.updateOrder(id, { status });
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status: status as Order["status"] } : o)));
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand">Orders</h1>
      <p className="mt-1 text-muted-foreground">Retail orders placed through checkout.</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <p className="p-6 text-muted-foreground">Loading…</p>
        ) : orders.length === 0 ? (
          <p className="p-6 text-muted-foreground">No orders yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <React.Fragment key={o._id}>
                  <tr className="cursor-pointer border-t border-border hover:bg-secondary/30" onClick={() => setExpanded(expanded === o._id ? null : o._id)}>
                    <td className="px-4 py-3 font-mono font-medium text-foreground">{o.orderNumber}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{o.customer.name}</div>
                      <div className="text-xs text-muted-foreground">{o.customer.phone}</div>
                    </td>
                    <td className="px-4 py-3 font-semibold">₹{o.total}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {o.paymentMethod.toUpperCase()} · {o.paymentStatus}
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={o.status}
                        onChange={(e) => changeStatus(o._id, e.target.value)}
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${statusColor[o.status] ?? ""}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {new Date(o.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                  {expanded === o._id && (
                    <tr className="border-t border-border bg-secondary/20">
                      <td colSpan={6} className="px-4 py-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <p className="text-xs font-semibold uppercase text-muted-foreground">Items</p>
                            <ul className="mt-2 space-y-1">
                              {o.items.map((it, i) => (
                                <li key={i} className="flex justify-between text-sm">
                                  <span>{it.name} · {it.size} × {it.qty}</span>
                                  <span className="font-medium">₹{it.price * it.qty}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase text-muted-foreground">Shipping to</p>
                            <p className="mt-2 text-sm text-foreground/85">
                              {o.customer.name}<br />
                              {o.customer.address}, {o.customer.city} {o.customer.state} {o.customer.pincode}<br />
                              {o.customer.email} · {o.customer.phone}
                            </p>
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

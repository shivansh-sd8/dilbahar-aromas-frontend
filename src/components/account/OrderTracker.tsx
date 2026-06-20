"use client";

import React from "react";
import { Search, CheckCircle2, Clock, Package, Truck, Home, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api, type TrackedOrder } from "@/lib/api";

const steps = [
  { key: "pending", label: "Placed", icon: Clock },
  { key: "confirmed", label: "Confirmed", icon: CheckCircle2 },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Home },
] as const;

const OrderTracker: React.FC = () => {
  const [orderNumber, setOrderNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [order, setOrder] = React.useState<TrackedOrder | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const result = await api.trackOrder(orderNumber.trim(), email.trim());
      if (!result) {
        setError("No matching order found. Double-check the order number and email.");
      } else {
        setOrder(result);
      }
    } catch {
      setError("Could not look up your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const activeIndex = order ? steps.findIndex((s) => s.key === order.status) : -1;
  const cancelled = order?.status === "cancelled";

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <Package className="size-5 text-gold-dark" />
        <h2 className="font-display text-xl font-bold text-brand">Track your order</h2>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter your order number and the email you used at checkout.
      </p>

      <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <div>
          <Label htmlFor="orderNumber">Order number</Label>
          <Input
            id="orderNumber"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="DBA-XXXX-XXXX"
            required
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            className="mt-1.5"
          />
        </div>
        <Button type="submit" disabled={loading} className="h-10">
          <Search className="size-4" /> {loading ? "Checking…" : "Track"}
        </Button>
      </form>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      {order && (
        <div className="mt-6 rounded-xl border border-border bg-secondary/30 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-mono font-semibold text-brand">{order.orderNumber}</p>
              <p className="text-xs text-muted-foreground">
                Placed {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold capitalize text-primary">
              {order.status}
            </span>
          </div>

          {cancelled ? (
            <div className="mt-5 flex items-center gap-2 text-sm text-destructive">
              <XCircle className="size-5" /> This order was cancelled.
            </div>
          ) : (
            <ol className="mt-6 flex items-center">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const done = i <= activeIndex;
                return (
                  <li key={s.key} className="flex flex-1 items-center last:flex-none">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex size-9 items-center justify-center rounded-full border-2 ${
                          done ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"
                        }`}
                      >
                        <Icon className="size-4" />
                      </span>
                      <span className={`mt-1.5 text-[0.7rem] ${done ? "font-semibold text-brand" : "text-muted-foreground"}`}>
                        {s.label}
                      </span>
                    </div>
                    {i < steps.length - 1 && (
                      <span className={`mx-1 h-0.5 flex-1 ${i < activeIndex ? "bg-primary" : "bg-border"}`} />
                    )}
                  </li>
                );
              })}
            </ol>
          )}

          <div className="mt-6 border-t border-border pt-4">
            <ul className="space-y-1.5 text-sm">
              {order.items.map((it, i) => (
                <li key={i} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">
                    {it.name} · {it.size} × {it.qty}
                  </span>
                  <span className="font-medium text-foreground">₹{it.price * it.qty}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between border-t border-border pt-3 text-sm font-semibold">
              <span className="text-brand">Total ({order.paymentMethod.toUpperCase()} · {order.paymentStatus})</span>
              <span className="text-brand">₹{order.total}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracker;

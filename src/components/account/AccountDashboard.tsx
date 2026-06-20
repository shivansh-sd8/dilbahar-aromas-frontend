"use client";

import React from "react";
import Link from "next/link";
import { LogOut, User as UserIcon, Package, MessageCircle, FileText, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCustomerAuth, customerToken } from "@/lib/customerAuth";
import type { Order } from "@/lib/types";
import OrderTracker from "./OrderTracker";
import { whatsappLink } from "@/lib/config";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:5050/api";

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const HelpCard: React.FC = () => (
  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
    <h2 className="font-display text-lg font-bold text-brand">Need help?</h2>
    <p className="mt-1 text-sm text-muted-foreground">Order changes, wholesale quotes or anything else.</p>
    <div className="mt-4 space-y-2">
      <Button className="w-full" render={<a href={whatsappLink} target="_blank" rel="noopener noreferrer" />}>
        <MessageCircle className="size-4" /> Chat on WhatsApp
      </Button>
      <Button variant="outline" className="w-full" render={<Link href="/b2b" />}>
        <FileText className="size-4" /> Request a wholesale quote
      </Button>
      <Button variant="outline" className="w-full" render={<Link href="/collections" />}>
        <ShoppingBag className="size-4" /> Continue shopping
      </Button>
    </div>
  </div>
);

const AccountDashboard: React.FC = () => {
  const { user, loading, logout } = useCustomerAuth();

  if (loading) {
    return <p className="text-muted-foreground">Loading…</p>;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">{user ? <LoggedIn /> : <AuthForms />}</div>
      <div className="space-y-4">
        <HelpCard />
        {user && (
          <div className="rounded-2xl border border-border bg-secondary/40 p-6">
            <h3 className="font-display text-base font-semibold text-brand">Signed in</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              You&apos;re viewing orders placed with <strong>{user.email}</strong>.
            </p>
            <Button variant="outline" className="mt-3 w-full" onClick={logout}>
              <LogOut className="size-4" /> Log out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const LoggedIn: React.FC = () => {
  const { user } = useCustomerAuth();
  const [orders, setOrders] = React.useState<Order[] | null>(null);

  React.useEffect(() => {
    const token = customerToken();
    if (!token) return;
    fetch(`${API_BASE}/orders/mine`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => setOrders(json.data))
      .catch(() => setOrders([]));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
          <UserIcon className="size-6" />
        </span>
        <div>
          <p className="font-display text-xl font-bold text-brand">Welcome back, {user?.name}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2">
          <Package className="size-5 text-gold-dark" />
          <h2 className="font-display text-xl font-bold text-brand">Your orders</h2>
        </div>

        {orders === null ? (
          <p className="mt-4 text-sm text-muted-foreground">Loading your orders…</p>
        ) : orders.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <p className="text-muted-foreground">No orders yet.</p>
            <Button className="mt-4" render={<Link href="/collections" />}>Start shopping</Button>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            {orders.map((o) => (
              <div key={o._id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-mono font-semibold text-brand">{o.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                      {" · "}{o.paymentMethod.toUpperCase()} · {o.paymentStatus}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusColor[o.status] ?? ""}`}>
                    {o.status}
                  </span>
                </div>
                <ul className="mt-3 space-y-1 border-t border-border pt-3 text-sm">
                  {o.items.map((it, i) => (
                    <li key={i} className="flex justify-between gap-2">
                      <span className="text-muted-foreground">{it.name} · {it.size} × {it.qty}</span>
                      <span className="font-medium text-foreground">₹{it.price * it.qty}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex justify-between border-t border-border pt-2 text-sm font-semibold text-brand">
                  <span>Total</span>
                  <span>₹{o.total}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const AuthForms: React.FC = () => {
  const { login, signup } = useCustomerAuth();
  const [mode, setMode] = React.useState<"login" | "signup">("login");
  const [form, setForm] = React.useState({ name: "", email: "", password: "" });
  const [error, setError] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (mode === "login") await login(form.email, form.password);
      else await signup(form.name, form.email, form.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-5 inline-flex rounded-lg border border-border p-1">
          <button
            type="button"
            onClick={() => { setMode("login"); setError(""); }}
            className={`rounded-md px-4 py-1.5 text-sm font-semibold ${mode === "login" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => { setMode("signup"); setError(""); }}
            className={`rounded-md px-4 py-1.5 text-sm font-semibold ${mode === "signup" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
          >
            Sign up
          </button>
        </div>

        <h2 className="font-display text-xl font-bold text-brand">
          {mode === "login" ? "Log in to your account" : "Create your account"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "login" ? "Access your orders and reorder faster." : "Save your details and track all your orders."}
        </p>

        <form onSubmit={submit} className="mt-4 space-y-4">
          {mode === "signup" && (
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={form.name} onChange={set("name")} required className="mt-1.5" />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={set("email")} required className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={form.password} onChange={set("password")} required minLength={6} className="mt-1.5" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
          </Button>
        </form>
      </div>

      <div>
        <h3 className="font-display text-base font-semibold text-brand">Or track a guest order</h3>
        <p className="mt-1 text-sm text-muted-foreground">Ordered without an account? Track it with your order number.</p>
        <div className="mt-3">
          <OrderTracker />
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;

"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, FileText, CreditCard, Truck } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart";
import { useCustomerAuth } from "@/lib/customerAuth";
import { api, type OrderResult } from "@/lib/api";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function CheckoutInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, subtotal, clear, hasPricedItems } = useCart();
  const { user } = useCustomerAuth();

  // Quote mode when explicitly requested, or when there are no priced items.
  const quoteMode = searchParams.get("mode") === "quote" || !hasPricedItems;

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    gstin: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });
  const [paymentMethod, setPaymentMethod] = React.useState<"cod" | "razorpay">("cod");

  // Prefill name/email for logged-in customers (so orders link to their account).
  React.useEffect(() => {
    if (user) {
      setForm((p) => ({ ...p, name: p.name || user.name, email: p.email || user.email }));
    }
  }, [user]);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [done, setDone] = React.useState<{ ref: string; quote: boolean } | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  const lineItems = items.map((i) => ({ slug: i.slug, name: i.name, size: i.size, qty: i.qty, price: i.price }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      if (quoteMode) {
        const res = await api.createEnquiry({
          type: "quote",
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          gstin: form.gstin,
          city: form.city,
          message: form.notes,
          items: lineItems,
          source: "checkout",
        });
        clear();
        setDone({ ref: res.id.slice(-6).toUpperCase(), quote: true });
        return;
      }

      const priced = items.filter((i) => i.price > 0).map((i) => ({
        slug: i.slug, name: i.name, size: i.size, qty: i.qty, price: i.price,
      }));
      const res: OrderResult = await api.createOrder({
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },
        items: priced,
        paymentMethod,
        notes: form.notes,
      });

      if (paymentMethod === "razorpay" && res.razorpay?.orderId && res.razorpay.keyId) {
        const ok = await loadRazorpay();
        if (ok && window.Razorpay) {
          const rzp = new window.Razorpay({
            key: res.razorpay.keyId,
            amount: res.razorpay.amount,
            currency: "INR",
            name: "Dil Bahar Aromas",
            order_id: res.razorpay.orderId,
            prefill: { name: form.name, email: form.email, contact: form.phone },
            handler: async (resp: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
              try {
                await fetch(`${api.base}/orders/verify`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    razorpayOrderId: resp.razorpay_order_id,
                    razorpayPaymentId: resp.razorpay_payment_id,
                    razorpaySignature: resp.razorpay_signature,
                  }),
                });
              } finally {
                clear();
                setDone({ ref: res.orderNumber, quote: false });
              }
            },
          });
          rzp.open();
          setSubmitting(false);
          return;
        }
      }

      // COD (or Razorpay not configured) — order is placed as pending.
      clear();
      setDone({ ref: res.orderNumber, quote: false });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <>
        <PageHeader title={done.quote ? "Quote requested" : "Order placed"} crumbs={[{ label: "Checkout" }]} />
        <section className="container-px py-16">
          <div className="mx-auto max-w-lg rounded-2xl border border-primary/30 bg-card p-10 text-center shadow-sm">
            <CheckCircle2 className="mx-auto size-12 text-primary" />
            <h2 className="mt-4 font-display text-2xl font-bold text-brand">
              {done.quote ? "Thank you — we'll be in touch" : "Thank you for your order"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {done.quote
                ? "Our team will email you wholesale per-kg pricing shortly."
                : "We've received your order and will confirm it on WhatsApp/email soon."}
            </p>
            <p className="mt-4 text-sm">
              Reference: <span className="font-mono font-semibold text-brand">{done.ref}</span>
            </p>
            <Button className="mt-6" render={<Link href="/collections" />}>
              Continue shopping
            </Button>
          </div>
        </section>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <PageHeader title="Checkout" crumbs={[{ label: "Checkout" }]} />
        <section className="container-px py-16 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Button className="mt-6" render={<Link href="/collections" />}>Shop products</Button>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={quoteMode ? "Request a quote" : "Checkout"}
        crumbs={[{ label: "Cart", href: "/cart" }, { label: quoteMode ? "Quote" : "Checkout" }]}
      />
      <section className="container-px py-12">
        <form onSubmit={submit} className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-display text-lg font-bold text-brand">Your details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" required value={form.name} onChange={set("name")} />
                <Field label="Email" type="email" required value={form.email} onChange={set("email")} />
                <Field label="Phone" required value={form.phone} onChange={set("phone")} />
                <Field label="Company (optional)" value={form.company} onChange={set("company")} />
                {quoteMode && <Field label="GSTIN (optional)" value={form.gstin} onChange={set("gstin")} />}
              </div>
            </div>

            {!quoteMode && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="font-display text-lg font-bold text-brand">Shipping address</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field label="Address" required value={form.address} onChange={set("address")} />
                  </div>
                  <Field label="City" required value={form.city} onChange={set("city")} />
                  <Field label="State" value={form.state} onChange={set("state")} />
                  <Field label="Pincode" required value={form.pincode} onChange={set("pincode")} />
                </div>
              </div>
            )}

            {quoteMode && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="font-display text-lg font-bold text-brand">Quote details</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="City" value={form.city} onChange={set("city")} />
                </div>
                <div className="mt-4">
                  <Label htmlFor="notes">Requirements / message</Label>
                  <textarea
                    id="notes"
                    value={form.notes}
                    onChange={set("notes")}
                    rows={4}
                    placeholder="Quantities, packaging, delivery location, etc."
                    className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
            )}

            {!quoteMode && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="font-display text-lg font-bold text-brand">Payment</h2>
                <div className="mt-4 space-y-3">
                  <PayOption
                    icon={<Truck className="size-5 text-gold-dark" />}
                    label="Cash on Delivery"
                    desc="Pay when your order arrives."
                    checked={paymentMethod === "cod"}
                    onSelect={() => setPaymentMethod("cod")}
                  />
                  <PayOption
                    icon={<CreditCard className="size-5 text-gold-dark" />}
                    label="Pay online (UPI / Card)"
                    desc="Secure payment via Razorpay."
                    checked={paymentMethod === "razorpay"}
                    onSelect={() => setPaymentMethod("razorpay")}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-display text-lg font-bold text-brand">
                {quoteMode ? "Items in quote" : "Order summary"}
              </h2>
              <ul className="mt-4 space-y-2 text-sm">
                {items.map((i) => (
                  <li key={`${i.slug}-${i.size}`} className="flex justify-between gap-2">
                    <span className="text-muted-foreground">
                      {i.name} · {i.size} × {i.qty}
                    </span>
                    <span className="font-medium text-foreground">
                      {i.price > 0 ? `₹${i.price * i.qty}` : "On request"}
                    </span>
                  </li>
                ))}
              </ul>
              {!quoteMode && (
                <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Subtotal</dt>
                    <dd className="font-medium">₹{subtotal}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Shipping</dt>
                    <dd className="font-medium">{shipping === 0 ? "Free" : `₹${shipping}`}</dd>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 text-base">
                    <dt className="font-semibold text-brand">Total</dt>
                    <dd className="font-bold text-brand">₹{subtotal + shipping}</dd>
                  </div>
                </dl>
              )}

              {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

              <Button type="submit" className="mt-5 w-full" disabled={submitting}>
                {submitting ? "Submitting…" : quoteMode ? (
                  <><FileText className="size-4" /> Submit quote request</>
                ) : (
                  <>Place order</>
                )}
              </Button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div>
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input id={id} type={type} value={value} onChange={onChange} required={required} className="mt-1.5" />
    </div>
  );
}

function PayOption({
  icon,
  label,
  desc,
  checked,
  onSelect,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
        checked ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
      }`}
    >
      {icon}
      <span className="flex-1">
        <span className="block text-sm font-medium text-foreground">{label}</span>
        <span className="block text-xs text-muted-foreground">{desc}</span>
      </span>
      <span className={`size-4 rounded-full border-2 ${checked ? "border-primary bg-primary" : "border-muted-foreground"}`} />
    </button>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="container-px py-16 text-center text-muted-foreground">Loading…</div>}>
      <CheckoutInner />
    </Suspense>
  );
}

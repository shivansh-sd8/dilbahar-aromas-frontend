"use client";

import React from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, FileText } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { items, setQty, remove, subtotal, hasPricedItems, hasQuoteItems } = useCart();

  if (items.length === 0) {
    return (
      <>
        <PageHeader title="Your cart" crumbs={[{ label: "Cart" }]} />
        <section className="container-px py-16">
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
            <ShoppingBag className="mx-auto size-10 text-muted-foreground" />
            <h2 className="mt-4 font-display text-2xl font-bold text-brand">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">
              Browse our Kannauj oils and compounds, then add them here to order or request a quote.
            </p>
            <Button className="mt-6" render={<Link href="/collections" />}>
              Shop all products
            </Button>
          </div>
        </section>
      </>
    );
  }

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;

  return (
    <>
      <PageHeader title="Your cart" crumbs={[{ label: "Cart" }]} />
      <section className="container-px py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Items */}
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => {
              const onRequest = item.price <= 0;
              return (
                <div
                  key={`${item.slug}-${item.size}`}
                  className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm"
                >
                  <Link
                    href={`/products/${item.slug}`}
                    className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white text-3xl"
                  >
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                    ) : (
                      item.emoji
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link href={`/products/${item.slug}`} className="font-display font-semibold text-brand hover:underline">
                          {item.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{item.size}</p>
                      </div>
                      <button
                        onClick={() => remove(item.slug, item.size)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="inline-flex items-center rounded-lg border border-border">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => setQty(item.slug, item.size, item.qty - 1)}
                          className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => setQty(item.slug, item.size, item.qty + 1)}
                          className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {onRequest ? (
                          <span className="text-gold-dark">Price on request</span>
                        ) : (
                          <>₹{item.price * item.qty}</>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-display text-lg font-bold text-brand">Order summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal (priced items)</dt>
                  <dd className="font-medium text-foreground">₹{subtotal}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="font-medium text-foreground">{shipping === 0 ? "Free" : `₹${shipping}`}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-base">
                  <dt className="font-semibold text-brand">Total</dt>
                  <dd className="font-bold text-brand">₹{subtotal + shipping}</dd>
                </div>
              </dl>

              {hasQuoteItems && (
                <p className="mt-4 rounded-lg bg-secondary/60 p-3 text-xs text-secondary-foreground">
                  Some items are <strong>priced on request</strong>. Submit a quote request and our team
                  will send you per-kg wholesale pricing.
                </p>
              )}

              <div className="mt-5 space-y-3">
                {hasPricedItems && (
                  <Button className="w-full" render={<Link href="/checkout" />}>
                    Checkout (₹{subtotal + shipping}) <ArrowRight className="size-4" />
                  </Button>
                )}
                {hasQuoteItems && (
                  <Button
                    variant={hasPricedItems ? "outline" : "default"}
                    className="w-full"
                    render={<Link href="/checkout?mode=quote" />}
                  >
                    <FileText className="size-4" /> Request a quote
                  </Button>
                )}
              </div>

              <Link
                href="/collections"
                className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
              >
                ← Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

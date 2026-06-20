"use client";

import React from "react";
import Link from "next/link";
import { Minus, Plus, ShieldCheck, Truck, FlaskConical, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/config";
import { useCart } from "@/lib/cart";
import type { Product, ProductVariant } from "@/lib/types";

function defaultVariant(variants: ProductVariant[]): number {
  const idx = variants.findIndex((v) => v.isDefault);
  return idx >= 0 ? idx : 0;
}

const ProductBuyBox: React.FC<{ product: Product }> = ({ product }) => {
  const variants = product.variants ?? [];
  const [selected, setSelected] = React.useState(() => defaultVariant(variants));
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);
  const { add } = useCart();

  const variant = variants[selected];
  const price = variant?.price ?? product.priceFrom ?? 0;
  const mrp = variant?.mrp;
  const discount = mrp && mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const inStock = (variant?.stock ?? 1) > 0;
  const onRequest = price <= 0;

  const orderMessage = encodeURIComponent(
    onRequest
      ? `Hi Dil Bahar Aromas, I'd like a quote for:\n${product.name} — ${variant?.size ?? "1 kg"} × ${qty}`
      : `Hi Dil Bahar Aromas, I'd like to order:\n${product.name} — ${variant?.size ?? ""} × ${qty}\nTotal: ₹${price * qty}`
  );

  const handleAdd = () => {
    add(
      {
        slug: product.slug,
        name: product.name,
        image: product.images?.[0],
        emoji: product.emoji,
        size: variant?.size ?? "1 kg",
        price,
      },
      qty
    );
    setAdded(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-baseline gap-3">
        {onRequest ? (
          <span className="font-display text-2xl font-bold text-brand">Price on request</span>
        ) : (
          <span className="font-display text-3xl font-bold text-brand">₹{price * qty}</span>
        )}
        {!onRequest && mrp && mrp > price && (
          <>
            <span className="text-lg text-muted-foreground line-through">₹{mrp * qty}</span>
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">
              {discount}% off
            </span>
          </>
        )}
        {!onRequest && <span className="text-xs text-muted-foreground">incl. taxes</span>}
      </div>

      {variants.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Size</p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v, i) => {
              const active = i === selected;
              return (
                <button
                  key={v.size + i}
                  onClick={() => { setSelected(i); setAdded(false); }}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-foreground hover:border-primary/50"
                  }`}
                >
                  {v.size}
                  <span className="ml-1.5 text-xs text-muted-foreground">₹{v.price}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="inline-flex items-center rounded-lg border border-border">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-8 text-center text-sm font-semibold">{qty}</span>
          <button
            aria-label="Increase quantity"
            onClick={() => setQty((q) => q + 1)}
            className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <span className={`text-sm ${inStock ? "text-primary" : "text-destructive"}`}>
          {inStock ? "In stock" : "Out of stock"}
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="flex-1" disabled={!inStock} onClick={handleAdd}>
          {added ? "Added ✓" : onRequest ? "Add to quote" : "Add to cart"}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="flex-1"
          render={<a href={`${whatsappLink}?text=${orderMessage}`} target="_blank" rel="noopener noreferrer" />}
        >
          <MessageCircle className="size-4" /> {onRequest ? "Quote on WhatsApp" : "Order on WhatsApp"}
        </Button>
      </div>
      {added && (
        <Link
          href="/cart"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          {onRequest ? "View quote request" : "View cart & checkout"} <ArrowRight className="size-4" />
        </Link>
      )}

      <ul className="grid grid-cols-1 gap-2 border-t border-border pt-4 text-sm text-foreground/80 sm:grid-cols-3">
        <li className="flex items-center gap-2"><FlaskConical className="size-4 text-gold-dark" /> GC-MS verified</li>
        <li className="flex items-center gap-2"><Truck className="size-4 text-gold-dark" /> Ships in 48h</li>
        <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-gold-dark" /> COD available</li>
      </ul>
    </div>
  );
};

export default ProductBuyBox;

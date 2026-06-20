"use client";

import React from "react";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";

// Structural shape satisfied by both lib/config Product and API Product.
export interface ProductCardData {
  name: string;
  localName?: string;
  slug: string;
  emoji?: string;
  images?: string[];
  tagline?: string;
  useTags?: string[];
  audience: "D2C" | "B2B" | "Both";
  bestseller?: boolean;
  priceFrom?: number;
  variants?: { size?: string; price: number; isDefault?: boolean }[];
}

const audienceLabel: Record<ProductCardData["audience"], string> = {
  D2C: "Retail",
  B2B: "B2B only",
  Both: "Retail + B2B",
};

function resolvePrice(product: ProductCardData): number {
  if (typeof product.priceFrom === "number" && product.priceFrom > 0) return product.priceFrom;
  if (product.variants && product.variants.length) {
    return product.variants.reduce((min, v) => (v.price < min ? v.price : min), product.variants[0].price);
  }
  return 0;
}

const ProductCard: React.FC<{ product: ProductCardData }> = ({ product }) => {
  const price = resolvePrice(product);
  const image = product.images?.[0];
  const { add } = useCart();
  const [added, setAdded] = React.useState(false);

  const defaultVariant = product.variants?.find((v) => v.isDefault) ?? product.variants?.[0];
  const size = defaultVariant?.size ?? "1 unit";

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    add({ slug: product.slug, name: product.name, image, emoji: product.emoji, size, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  return (
    <div className="group relative flex flex-col rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <Badge variant="secondary" className="absolute left-3 top-3 text-[0.65rem]">
        {audienceLabel[product.audience]}
      </Badge>

      <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col">
        <div className="flex h-32 items-center justify-center overflow-hidden rounded-lg bg-white text-5xl">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={product.name} className="h-full w-full object-contain" />
          ) : (
            product.emoji
          )}
        </div>
        <h3 className="mt-3 font-display text-base font-semibold text-brand">{product.name}</h3>
        <p className="text-xs text-muted-foreground">
          {[product.localName, product.tagline].filter(Boolean).join(" \u00b7 ")}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {(product.useTags ?? []).map((t) => (
            <span key={t} className="rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] text-secondary-foreground">
              {t}
            </span>
          ))}
        </div>
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">
          {price > 0 ? (
            <>from <span className="text-gold-dark">₹{price}</span></>
          ) : (
            <span className="text-gold-dark">Price on request</span>
          )}
        </span>
        <button
          onClick={handleAdd}
          aria-label={price > 0 ? `Add ${product.name} to cart` : `Add ${product.name} to quote`}
          className="inline-flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
        >
          {added ? <Check className="size-4" /> : <Plus className="size-4" />}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

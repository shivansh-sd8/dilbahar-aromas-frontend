"use client";

import React from "react";

export interface CartItem {
  slug: string;
  name: string;
  image?: string;
  emoji?: string;
  size: string;
  price: number; // 0 means "price on request"
  qty: number;
}

interface CartState {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  hasPricedItems: boolean;
  hasQuoteItems: boolean;
}

const CartContext = React.createContext<CartState | null>(null);

const STORAGE_KEY = "dba_cart_v1";

const sameLine = (a: CartItem, slug: string, size: string) => a.slug === slug && a.size === size;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add: CartState["add"] = (item, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => sameLine(i, item.slug, item.size));
      if (existing) {
        return prev.map((i) => (sameLine(i, item.slug, item.size) ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { ...item, qty }];
    });
  };

  const remove: CartState["remove"] = (slug, size) =>
    setItems((prev) => prev.filter((i) => !sameLine(i, slug, size)));

  const setQty: CartState["setQty"] = (slug, size, qty) =>
    setItems((prev) =>
      prev
        .map((i) => (sameLine(i, slug, size) ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0)
    );

  const clear = () => setItems([]);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const hasPricedItems = items.some((i) => i.price > 0);
  const hasQuoteItems = items.some((i) => i.price <= 0);

  const value: CartState = {
    items,
    add,
    remove,
    setQty,
    clear,
    count,
    subtotal,
    hasPricedItems,
    hasQuoteItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

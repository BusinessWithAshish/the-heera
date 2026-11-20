"use client";

// The shopping bag. It lives in the shopper's browser (so it survives a refresh)
// and only stores slug, size and quantity; names and prices always come from
// products.json, so a price change shows up straight away.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { getProduct, type Product } from "@/lib/catalog";

export type CartItem = { slug: string; size: number | null; qty: number };
export type CartLine = CartItem & { product: Product; lineTotal: number };

const STORAGE_KEY = "heera-bag-v1";
export const MAX_QTY = 5;

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  ready: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (item: CartItem) => void;
  setQty: (slug: string, size: number | null, qty: number) => void;
  remove: (slug: string, size: number | null) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const same = (a: CartItem, slug: string, size: number | null) => a.slug === slug && a.size === size;

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as CartItem[]) : [];
    return Array.isArray(parsed) ? parsed.filter((i) => getProduct(i.slug)?.inStock) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Reading the browser's saved bag has to wait until the page is in the browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(readStorage());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Private browsing or storage turned off: the bag still works until the tab closes.
    }
  }, [items, ready]);

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => same(i, item.slug, item.size));
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, qty: Math.min(MAX_QTY, i.qty + item.qty) } : i));
      }
      return [...prev, { ...item, qty: Math.min(MAX_QTY, item.qty) }];
    });
  }, []);

  const setQty = useCallback((slug: string, size: number | null, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => !same(i, slug, size))
        : prev.map((i) => (same(i, slug, size) ? { ...i, qty: Math.min(MAX_QTY, qty) } : i)),
    );
  }, []);

  const remove = useCallback((slug: string, size: number | null) => {
    setItems((prev) => prev.filter((i) => !same(i, slug, size)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = items.flatMap((i) => {
      const product = getProduct(i.slug);
      return product ? [{ ...i, product, lineTotal: product.price * i.qty }] : [];
    });
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
      ready,
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear,
    };
  }, [items, ready, open, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

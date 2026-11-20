"use client";

import Image from "next/image";
import Link from "next/link";
import { MinusIcon, PlusIcon, ShoppingBagIcon, XIcon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { site } from "@/config/site";
import { MAX_QTY, useCart, type CartLine } from "@/lib/cart";
import { formatPrice } from "@/lib/catalog";
import { cn } from "@/lib/utils";

// The bag icon in the header, with a small count once something is added.
export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={count ? `Open bag, ${count} item${count > 1 ? "s" : ""}` : "Open bag"}
      className="relative inline-flex size-10 items-center justify-center transition-colors hover:text-gold"
    >
      <ShoppingBagIcon className="size-5" strokeWidth={1.4} />
      {count > 0 && (
        <span className="absolute top-1 right-0.5 flex size-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-background">
          {count}
        </span>
      )}
    </button>
  );
}

export function QtyStepper({ line, className }: { line: CartLine; className?: string }) {
  const { setQty } = useCart();
  return (
    <div className={cn("inline-flex h-8 items-center border border-foreground/20", className)}>
      <button
        type="button"
        aria-label={`One less ${line.product.name}`}
        onClick={() => setQty(line.slug, line.size, line.qty - 1)}
        className="flex h-full w-8 items-center justify-center hover:bg-foreground/5"
      >
        <MinusIcon className="size-3" />
      </button>
      <span className="w-7 text-center text-xs tabular-nums">{line.qty}</span>
      <button
        type="button"
        aria-label={`One more ${line.product.name}`}
        disabled={line.qty >= MAX_QTY}
        onClick={() => setQty(line.slug, line.size, line.qty + 1)}
        className="flex h-full w-8 items-center justify-center hover:bg-foreground/5 disabled:opacity-30"
      >
        <PlusIcon className="size-3" />
      </button>
    </div>
  );
}

export function CartLineRow({ line, onNavigate }: { line: CartLine; onNavigate?: () => void }) {
  const { remove } = useCart();
  return (
    <li className="flex gap-4 py-5">
      <Link
        href={`/products/${line.slug}`}
        onClick={onNavigate}
        className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-muted"
      >
        <Image src={line.product.images[0]} alt={line.product.name} fill sizes="80px" className="object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/products/${line.slug}`}
            onClick={onNavigate}
            className="text-xs leading-snug tracking-[0.14em] uppercase hover:text-gold"
          >
            {line.product.name}
          </Link>
          <button
            type="button"
            onClick={() => remove(line.slug, line.size)}
            aria-label={`Remove ${line.product.name}`}
            className="-mt-1 -mr-1 p-1 text-muted-foreground hover:text-foreground"
          >
            <XIcon className="size-3.5" />
          </button>
        </div>
        {line.size && <p className="text-xs text-muted-foreground">Size {line.size} (Euro)</p>}
        <div className="mt-auto flex items-center justify-between pt-2">
          <QtyStepper line={line} />
          <span className="text-sm tabular-nums">{formatPrice(line.lineTotal)}</span>
        </div>
      </div>
    </li>
  );
}

export function CartDrawer() {
  const { lines, subtotal, open, setOpen } = useCart();
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full gap-0 bg-background sm:max-w-md">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="font-heading text-2xl font-normal tracking-[0.14em] uppercase">Your bag</SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <ShoppingBagIcon className="size-8 text-gold" strokeWidth={1} />
            <p className="text-sm text-muted-foreground">Your bag is empty.</p>
            <Link
              href="/shop"
              onClick={close}
              className={cn(buttonVariants(), "h-11 rounded-none px-8 text-[11px] tracking-[0.2em] uppercase")}
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y overflow-y-auto px-6">
              {lines.map((line) => (
                <CartLineRow key={`${line.slug}-${line.size}`} line={line} onNavigate={close} />
              ))}
            </ul>
            <SheetFooter className="gap-3 border-t px-6 py-5">
              <div className="flex items-baseline justify-between text-sm">
                <span className="tracking-[0.14em] uppercase">Subtotal</span>
                <span className="text-base tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {site.shipping.freeInIndia ? "Free shipping across India." : ""}
              </p>
              <Link
                href="/checkout"
                onClick={close}
                className={cn(buttonVariants(), "h-12 w-full rounded-none text-[11px] tracking-[0.22em] uppercase")}
              >
                Checkout
              </Link>
              <Button variant="ghost" onClick={close} className="h-9 rounded-none text-[11px] tracking-[0.2em] uppercase">
                Continue shopping
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

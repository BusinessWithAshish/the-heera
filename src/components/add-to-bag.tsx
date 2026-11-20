"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/components/ui/toast";
import { site } from "@/config/site";
import { useCart } from "@/lib/cart";
import { type Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function AddToBag({ product }: { product: Product }) {
  const { add, setOpen } = useCart();
  const needsSize = product.category !== "bags";
  const [size, setSize] = useState<number | null>(null);
  const [missingSize, setMissingSize] = useState(false);

  function onAdd() {
    if (needsSize && size === null) {
      setMissingSize(true);
      return;
    }
    add({ slug: product.slug, size: needsSize ? size : null, qty: 1 });
    toast.add({ type: "success", title: `${product.name} added to your bag` });
    setOpen(true);
  }

  return (
    <div className="space-y-5">
      {needsSize && (
        <div className="space-y-2.5">
          <div className="flex items-baseline justify-between">
            <p className="text-[11px] tracking-[0.18em] uppercase">Size (Euro)</p>
            {missingSize && <p className="text-xs text-destructive">Please pick a size</p>}
          </div>
          <ToggleGroup
            value={size === null ? [] : [String(size)]}
            onValueChange={(v) => {
              const next = v[0];
              setSize(next ? Number(next) : null);
              if (next) setMissingSize(false);
            }}
            spacing={2}
            className="flex-wrap"
            aria-label="Size"
          >
            {site.footwearSizes.map((s) => (
              <ToggleGroupItem
                key={s}
                value={String(s)}
                variant="outline"
                className={cn(
                  "h-11 w-12 rounded-none border-foreground/25 bg-transparent text-sm aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:text-background aria-pressed:hover:bg-foreground aria-pressed:hover:text-background",
                  missingSize && "border-destructive/60",
                )}
              >
                {s}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      )}
      <Button onClick={onAdd} className="h-12 w-full rounded-none text-[11px] tracking-[0.22em] uppercase">
        Add to bag
      </Button>
    </div>
  );
}

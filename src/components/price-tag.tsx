import { discountPercent, formatPrice, type Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function PriceTag({ product, className, showSaving }: { product: Product; className?: string; showSaving?: boolean }) {
  const off = discountPercent(product);
  return (
    <p className={cn("flex flex-wrap items-baseline gap-x-2", className)}>
      <span className="font-medium">{formatPrice(product.price)}</span>
      {product.compareAtPrice && (
        <>
          <span className="text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
          {showSaving && off > 0 && <span className="text-gold">{off}% off</span>}
        </>
      )}
    </p>
  );
}

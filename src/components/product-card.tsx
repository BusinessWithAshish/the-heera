import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { PriceTag } from "@/components/price-tag";
import { type Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function ProductCard({ product, priority, className }: { product: Product; priority?: boolean; className?: string }) {
  const [first, second] = product.images;
  return (
    <Link href={`/products/${product.slug}`} className={cn("group block", className)}>
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {first && (
          <Image
            src={first}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className={cn(
              "object-cover transition duration-700 group-hover:scale-[1.03]",
              second && "group-hover:opacity-0",
              !product.inStock && "opacity-60",
            )}
          />
        )}
        {second && (
          <Image
            src={second}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover opacity-0 transition duration-700 group-hover:opacity-100"
          />
        )}
        {!product.inStock ? (
          <Badge variant="secondary" className="absolute top-3 left-3 rounded-none uppercase tracking-wider">
            Sold out
          </Badge>
        ) : product.compareAtPrice ? (
          <Badge className="absolute top-3 left-3 rounded-none bg-background text-foreground uppercase tracking-wider">
            Sale
          </Badge>
        ) : null}
      </div>
      <div className="space-y-1 pt-3">
        <h3 className="font-heading text-lg leading-snug sm:text-xl">{product.name}</h3>
        <PriceTag product={product} className="text-sm" />
      </div>
    </Link>
  );
}

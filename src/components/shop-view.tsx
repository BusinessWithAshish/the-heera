import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { Eyebrow } from "@/components/section-heading";
import { byCategory, categories, categoryKeys, type Category } from "@/lib/catalog";
import { cn } from "@/lib/utils";

export function ShopView({ category }: { category?: Category }) {
  const list = byCategory(category);
  const info = category ? categories[category] : null;
  const tabs = [{ key: "all", label: "All", href: "/shop" }, ...categoryKeys.map((k) => ({ key: k, label: categories[k].label, href: `/shop/${k}` }))];
  const current = category ?? "all";

  return (
    <div className="mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 sm:pt-14">
      <div className="mb-8 max-w-2xl space-y-3">
        <Eyebrow>{list.length} styles</Eyebrow>
        <h1 className="text-5xl leading-tight sm:text-6xl">{info?.title ?? "Shop all"}</h1>
        <p className="text-muted-foreground">
          {info?.blurb ?? "Every heel, flat, platform and bag, embellished by hand and made in India."}
        </p>
      </div>

      <nav aria-label="Categories" className="-mx-4 mb-10 flex gap-2 overflow-x-auto border-b px-4 sm:mx-0 sm:px-0">
        {tabs.map((t) => (
          <Link
            key={t.key}
            href={t.href}
            aria-current={current === t.key ? "page" : undefined}
            className={cn(
              "-mb-px shrink-0 border-b-2 px-3 py-3 text-xs tracking-[0.16em] uppercase transition-colors",
              current === t.key ? "border-foreground text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
        {list.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i < 4} />
        ))}
      </div>
    </div>
  );
}

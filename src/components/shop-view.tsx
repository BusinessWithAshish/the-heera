import Link from "next/link";

import { ProductCard } from "@/components/product-card";
import { Eyebrow } from "@/components/section-heading";
import { byCategory, categories, categoryKeys, type Category, type Product } from "@/lib/catalog";
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
        <h1 className="text-4xl leading-tight tracking-[0.12em] uppercase sm:text-5xl">{info?.title ?? "Shop all"}</h1>
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

      {category ? (
        <Grid products={list} />
      ) : (
        // "Shop all" keeps each type together so the page reads calmly.
        <div className="space-y-16">
          {categoryKeys.map((key) => (
            <section key={key} aria-labelledby={`shop-${key}`}>
              <div className="mb-6 flex items-baseline justify-between border-b pb-3">
                <h2 id={`shop-${key}`} className="text-2xl tracking-[0.14em] uppercase sm:text-3xl">
                  {categories[key].label}
                </h2>
                <Link href={`/shop/${key}`} className="text-[11px] tracking-[0.2em] text-gold uppercase">
                  View {categories[key].label.toLowerCase()}
                </Link>
              </div>
              <Grid products={byCategory(key)} priority={key === categoryKeys[0]} />
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

function Grid({ products, priority }: { products: Product[]; priority?: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} priority={(priority ?? true) && i < 4} />
      ))}
    </div>
  );
}

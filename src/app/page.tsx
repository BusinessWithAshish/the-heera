import Image from "next/image";
import Link from "next/link";
import { GemIcon, RefreshCwIcon, TruckIcon } from "lucide-react";

import { InstagramIcon } from "@/components/site-footer";
import { PriceTag } from "@/components/price-tag";
import { ProductCard } from "@/components/product-card";
import { Eyebrow, SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/config/site";
import { byCategory, categories, categoryKeys, eveningSlugs, featuredSlugs, getProduct, pick } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const ctaClass = "h-12 rounded-none px-8 text-xs tracking-[0.18em] uppercase";

// Which product photo fronts each category tile.
const tileImage: Record<string, string> = {
  heels: "/images/products/goldmine-1.webp",
  flats: "/images/products/studded-black-flats-1.webp",
  platforms: "/images/products/denim-starliner-platforms-1.webp",
  bags: "/images/products/all-pearl-bag-1.webp",
};

export default function Home() {
  const featured = pick(featuredSlugs);
  const evening = pick(eveningSlugs);
  const heroPick = getProduct("trophy-wife");

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-8 pb-16 sm:px-6 md:grid-cols-[1fr_1.05fr] md:gap-16 md:pt-14 md:pb-24">
        <div className="order-2 space-y-7 md:order-1">
          <Eyebrow>Hand-embellished in India</Eyebrow>
          <h1 className="text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
            Made to be <em className="text-gold">noticed.</em>
          </h1>
          <p className="max-w-md text-base text-muted-foreground sm:text-lg">
            Crystal-wrapped heels, pearl-studded flats and bags that catch every light. Each piece is finished by hand
            by our artisans, for weddings, nights out and everything in between.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop/heels" className={cn(buttonVariants(), ctaClass)}>
              Shop heels
            </Link>
            <Link href="/shop/bags" className={cn(buttonVariants({ variant: "outline" }), ctaClass, "bg-transparent")}>
              Shop bags
            </Link>
          </div>
          <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
            {byCategory().length} styles · Free shipping across India
          </p>
        </div>

        <div className="relative order-1 md:order-2">
          <div className="relative aspect-[4/5] overflow-hidden bg-muted">
            <Image
              src="/images/brand/bestseller.webp"
              alt="Crystal wrap heels being fastened at the ankle"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-[50%_70%]"
            />
          </div>
          {heroPick && (
            <Link
              href={`/products/${heroPick.slug}`}
              className="absolute -bottom-6 left-4 flex w-60 items-center gap-3 border bg-background/95 p-3 shadow-sm backdrop-blur transition hover:shadow-md sm:left-auto sm:-left-8"
            >
              <div className="relative size-14 shrink-0 overflow-hidden bg-muted">
                <Image src={heroPick.images[0]} alt="" fill sizes="56px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.18em] text-gold uppercase">Bestseller</p>
                <p className="truncate font-heading text-lg leading-tight">{heroPick.name}</p>
                <PriceTag product={heroPick} className="text-xs" />
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <SectionHeading eyebrow="Shop by type" title="Find your sparkle" />
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categoryKeys.map((key) => (
            <Link key={key} href={`/shop/${key}`} className="group relative aspect-[3/4] overflow-hidden bg-muted">
              <Image
                src={tileImage[key]}
                alt={categories[key].title}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                <p className="font-heading text-2xl sm:text-3xl">{categories[key].label}</p>
                <p className="text-[11px] tracking-[0.18em] uppercase opacity-80">
                  {byCategory(key).length} styles
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <SectionHeading eyebrow="Most loved" title="The pieces everyone asks about" link={{ href: "/shop", label: "Shop all" }} />
        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Promises */}
      <section className="border-y bg-secondary/60">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
          {[
            { icon: TruckIcon, title: "Free shipping in India", body: `Dispatched in ${site.shipping.dispatchDays} days, delivered in ${site.shipping.deliveryDays}.` },
            { icon: GemIcon, title: "Embellished by hand", body: "Every crystal and pearl is sewn on by our artisans." },
            { icon: RefreshCwIcon, title: "Size exchange", body: `Wrong size? Exchange within ${site.exchangeDays} days of delivery.` },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <Icon className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.4} />
              <div>
                <p className="font-heading text-xl">{title}</p>
                <p className="text-sm text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Evening edit */}
      <section className="dark bg-background text-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div className="space-y-5">
            <Eyebrow>The evening edit</Eyebrow>
            <h2 className="text-4xl leading-tight sm:text-5xl">
              After dark, <em className="text-gold">everything shines.</em>
            </h2>
            <p className="max-w-sm text-muted-foreground">
              Rhinestone straps, velvet brooches and starry crystals, picked for sangeets, receptions and late dinners.
            </p>
            <Link href="/shop" className={cn(buttonVariants(), ctaClass)}>
              Explore the edit
            </Link>
          </div>
          <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0">
            {evening.map((p) => (
              <ProductCard key={p.slug} product={p} className="w-[62vw] shrink-0 snap-start sm:w-auto" />
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-blush/50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src="/images/products/pearl-me-up-flap-bag-1.webp"
              alt="Pearl Me Up bag with hand-strung pearl tassels"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="space-y-5">
            <Eyebrow>Our story</Eyebrow>
            <h2 className="text-4xl leading-tight sm:text-5xl">Sewn by hand, one crystal at a time.</h2>
            <p className="text-muted-foreground">
              Every piece is designed by our founder, Heera, and made in India by skilled artisans who sew each
              embellishment by hand, so the sparkle lasts long after the party.
            </p>
            <p className="text-muted-foreground">
              Most of our pairs come with cushioned padding, because looking this good shouldn&apos;t have to hurt.
            </p>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow={site.instagram.handle} title={<>Babes of <em>Heera</em></>} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <a
              key={n}
              href={site.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-[3/4] overflow-hidden bg-muted"
            >
              <Image
                src={`/images/brand/community-${n}.webp`}
                alt="A customer wearing The Heera"
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
            </a>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), ctaClass, "gap-2 bg-transparent")}
          >
            <InstagramIcon className="size-4" /> Tag us to be featured
          </a>
        </div>
      </section>
    </>
  );
}

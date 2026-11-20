import Image from "next/image";
import Link from "next/link";
import { GemIcon, ShoppingBagIcon, SparklesIcon, TruckIcon } from "lucide-react";

import { InstagramIcon } from "@/components/instagram-icon";
import { ProductCard } from "@/components/product-card";
import { Ornament, SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { home } from "@/config/home";
import { site } from "@/config/site";
import { bestsellerSlugs, byCategory, categories, categoryKeys, newInSlugs, pick } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const outlineCta =
  "inline-flex h-11 items-center justify-center border border-current px-7 text-[11px] tracking-[0.22em] uppercase transition-colors hover:bg-foreground hover:text-background";

const promiseIcons = { gem: GemIcon, sparkles: SparklesIcon, bag: ShoppingBagIcon, truck: TruckIcon } as const;

// Which product photo fronts each category tile.
const tileImage: Record<string, string> = {
  heels: "/images/products/goldmine-1.webp",
  flats: "/images/products/studded-black-flats-1.webp",
  platforms: "/images/products/denim-starliner-platforms-1.webp",
  bags: "/images/products/all-pearl-bag-1.webp",
};

export default function Home() {
  const newIn = pick(newInSlugs);
  const bestsellers = pick(bestsellerSlugs);
  const { hero, glamour } = home;

  return (
    <>
      {/* Banner: six photo strips with the title over them */}
      <section className="dark relative isolate overflow-hidden bg-background text-foreground">
        <div className="grid h-[460px] grid-cols-3 sm:h-[500px] md:grid-cols-6 lg:h-[520px]">
          {hero.images.map((img, i) => (
            <div key={img.src} className={cn("relative", i > 2 && "hidden md:block")}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={i < 3}
                sizes="(min-width: 768px) 17vw, 34vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(0_0_0/0.55),transparent_70%)]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-[3.4rem] leading-none font-light tracking-[0.2em] text-gold uppercase sm:text-7xl lg:text-8xl">
            {hero.title}
          </h1>
          <p className="-mt-2 font-script text-[5.5rem] leading-[0.9] text-gold sm:-mt-3 sm:text-[8rem] lg:text-[9.5rem]">
            {hero.script}
          </p>
          <Ornament className="mt-4" />
          <p className="mt-5 text-[11px] tracking-[0.32em] text-foreground/90 uppercase sm:text-sm">{hero.subtitle}</p>
          <Link href={hero.button.href} className={cn(outlineCta, "mt-8 text-gold hover:border-gold hover:bg-gold")}>
            {hero.button.label}
          </Link>
        </div>
      </section>

      {/* Four promises */}
      <section className="border-b bg-secondary">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-4 py-6 sm:px-6 lg:grid-cols-4 lg:py-5">
          {home.promises.map(({ icon, title, body }, i) => {
            const Icon = promiseIcons[icon];
            return (
              <div
                key={title}
                className={cn(
                  "flex items-center gap-3 px-2 sm:gap-4 lg:justify-center lg:px-6",
                  i > 0 && "lg:border-l lg:border-foreground/15",
                )}
              >
                <Icon className="size-6 shrink-0 text-foreground/80" strokeWidth={1.1} />
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase sm:text-[11px]">{title}</p>
                  <p className="text-[11px] text-muted-foreground sm:text-xs">{body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* New in, with the "everyday glamour" panel beside it */}
      <section id="new-in" className="mx-auto grid max-w-7xl scroll-mt-28 gap-10 px-4 pt-14 pb-14 sm:px-6 lg:grid-cols-[1fr_minmax(0,0.55fr)] lg:pt-16">
        <div>
          <SectionHeading title="New in" link={{ href: "/shop", label: "View all" }} />
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-4 sm:gap-x-4">
            {newIn.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>

        <Link
          href={glamour.button.href}
          className="dark group relative isolate flex min-h-[420px] overflow-hidden bg-espresso text-foreground lg:min-h-0"
        >
          <div className="absolute inset-0 -z-10 sm:left-[38%]">
            <Image
              src={glamour.image.src}
              alt={glamour.image.alt}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 60vw, 100vw"
              className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso via-espresso/50 to-transparent sm:bg-gradient-to-r sm:from-espresso sm:from-35% sm:via-espresso/70 sm:via-50% sm:to-transparent" />
          <div className="mt-auto max-w-[15rem] space-y-5 p-7 sm:my-auto sm:p-9">
            <h2 className="text-4xl leading-[1.1] font-light tracking-[0.12em] uppercase">{glamour.title}</h2>
            <Ornament className="justify-start" />
            <p className="text-sm leading-relaxed text-foreground/85">{glamour.body}</p>
            <span className={cn(outlineCta, "group-hover:bg-foreground group-hover:text-background")}>
              {glamour.button.label}
            </span>
          </div>
        </Link>
      </section>

      {/* Bestsellers */}
      <section id="bestsellers" className="mx-auto max-w-7xl scroll-mt-28 px-4 pb-20 sm:px-6">
        <div className="border-t pt-12">
          <SectionHeading title="Bestsellers" link={{ href: "/shop", label: "View all" }} />
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-6">
            {bestsellers.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <SectionHeading title="Shop by type" />
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-center text-white sm:p-6">
                <p className="font-heading text-2xl tracking-[0.16em] uppercase sm:text-3xl">{categories[key].label}</p>
                <p className="mt-1 text-[10px] tracking-[0.22em] uppercase opacity-80">
                  {byCategory(key).length} styles
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="dark bg-background text-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-16 md:py-20">
          <div className="relative mx-auto aspect-[1131/1391] w-full max-w-sm">
            <Image
              src="/images/brand/heera-luxe-logo-full.webp"
              alt={`${site.name} logo`}
              fill
              sizes="(min-width: 768px) 384px, 90vw"
              className="object-contain"
            />
          </div>
          <div className="space-y-6 text-center md:text-left">
            <p className="text-[11px] tracking-[0.24em] text-gold uppercase">Our story</p>
            <h2 className="text-4xl leading-tight font-light tracking-[0.08em] uppercase sm:text-5xl">
              Sewn by hand, one crystal at a time
            </h2>
            <Ornament className="md:justify-start" />
            <p className="text-muted-foreground">
              Every piece is designed by our founder, Heena, and made in India by skilled artisans who sew each
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
        <SectionHeading eyebrow={site.instagram.handle} title="Babes of Heera" />
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
        <div className="mt-10 flex justify-center">
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), outlineCta, "h-11 gap-2 rounded-none bg-transparent")}
          >
            <InstagramIcon className="size-4" /> Tag us to be featured
          </a>
        </div>
      </section>
    </>
  );
}

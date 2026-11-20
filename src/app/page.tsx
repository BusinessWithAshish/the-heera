import Image from "next/image";
import Link from "next/link";
import { GemIcon, ShoppingBagIcon, SparklesIcon, TruckIcon } from "lucide-react";

import { InstagramIcon } from "@/components/instagram-icon";
import { ProductCard } from "@/components/product-card";
import { Ornament, SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { home } from "@/config/home";
import { site } from "@/config/site";
import { bestsellerSlugs, byCategory, categories, categoryKeys, edits, newInSlugs, pick } from "@/lib/catalog";
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
  const { hero, glamour, founder } = home;

  return (
    <>
      {/* "Coming soon" poster: the tall version on phones, the wide one (filling most of the screen) on bigger screens. */}
      <div className="dark bg-background">
        <Image
          src={hero.mobile.src}
          alt={hero.alt}
          width={hero.mobile.width}
          height={hero.mobile.height}
          priority
          sizes="100vw"
          className="h-auto w-full md:hidden"
        />
        <div className="relative hidden h-[min(calc(100svh-110px),640px)] min-h-[480px] md:block">
          <Image src={hero.desktop} alt={hero.alt} fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>

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
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-5">
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
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {bestsellers.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* The two edits, side by side */}
      <section id="edits" aria-label="The edits" className="dark grid scroll-mt-28 grid-cols-2 gap-px bg-background">
        {home.edits.map(({ key, image }) => {
          const edit = edits[key];
          return (
            <Link key={key} href={`/edits/${key}`} className="group relative isolate aspect-[3/5] overflow-hidden sm:aspect-[4/5] lg:aspect-[6/7]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="50vw"
                className="-z-10 object-cover transition duration-1000 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
              <div className="flex h-full flex-col items-center justify-end gap-3 px-3 pb-8 text-center text-foreground sm:gap-4 sm:pb-14">
                <p className="text-[9px] tracking-[0.3em] text-gold uppercase sm:text-[11px]">The collection</p>
                <h2 className="text-2xl leading-tight font-light tracking-[0.14em] uppercase sm:text-4xl lg:text-5xl">
                  {edit.title}
                </h2>
                <Ornament className="hidden sm:flex" />
                <p className="hidden max-w-xs text-sm text-foreground/85 sm:block">{edit.blurb}</p>
                <span className={cn(outlineCta, "mt-1 h-9 px-4 text-[9px] sm:mt-2 sm:h-11 sm:px-7 sm:text-[11px]", "group-hover:bg-foreground group-hover:text-background")}>
                  Explore
                </span>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-20 sm:px-6">
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

      {/* Message from the founder (last section) */}
      <section className="dark bg-linear-to-b from-cocoa to-cocoa-deep text-foreground md:bg-linear-to-r md:from-cocoa md:from-46% md:to-cocoa-deep">
        <div className="grid md:grid-cols-[minmax(0,0.85fr)_1fr] md:items-stretch">
          <div className="relative aspect-[760/821] w-full md:aspect-auto md:min-h-[600px]">
            <Image
              src={founder.image.src}
              alt={founder.image.alt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-cocoa to-transparent md:hidden" />
            <div className="absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-cocoa via-cocoa/60 to-transparent md:block" />
          </div>
          <div className="max-w-2xl space-y-4 self-center px-6 pt-2 pb-14 sm:px-10 md:py-14 md:pr-10 md:pl-4 lg:pr-16">
            <h2 className="text-[2.5rem] leading-[1.05] text-cream sm:text-5xl lg:text-6xl">{founder.title}</h2>
            <div className="space-y-4 text-[15px] leading-relaxed font-light text-cream/90 lg:text-[17px]">
              {founder.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
            <div className="pt-1">
              <p className="font-script text-5xl leading-none text-gold sm:text-6xl">{founder.signature}</p>
              <p className="mt-2 text-[15px] text-cream/90">{founder.role}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

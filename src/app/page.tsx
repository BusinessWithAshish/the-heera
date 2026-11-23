import Image from "next/image";
import Link from "next/link";
import { GemIcon, ShoppingBagIcon, SparklesIcon, TruckIcon } from "lucide-react";

import { HeroSlider } from "@/components/hero-slider";
import { MobileBestsellers, MobileChapter, MobileEdits, MobileFounder, MobileGlamour, MobileTiles, MobileTrust } from "@/components/home-mobile";
import { FounderPicture, LovedByYou, Reels, ShopByType } from "@/components/home-sections";
import { ProductCard } from "@/components/product-card";
import { Ornament, SectionHeading } from "@/components/section-heading";
import { home } from "@/config/home";
import { bestsellerSlugs, newInSlugs, pick } from "@/lib/catalog";
import { cn } from "@/lib/utils";

// Page order (bigger screens): sliding banner, promises, New In + Everyday glamour,
// Shop by type, Bestsellers, Style. Love. Shop. (reels), Loved by you, founder's message.
// Phones add their own sections from home-mobile.tsx in between.

const outlineCta =
  "inline-flex h-11 items-center justify-center border border-current px-7 text-[11px] tracking-[0.22em] uppercase transition-colors hover:bg-foreground hover:text-background";

const promiseIcons = { gem: GemIcon, sparkles: SparklesIcon, bag: ShoppingBagIcon, truck: TruckIcon } as const;

export default function Home() {
  const newIn = pick(newInSlugs);
  const bestsellers = pick(bestsellerSlugs);
  const { glamour } = home;

  return (
    <>
      <HeroSlider />

      <MobileChapter />

      {/* Four promises */}
      <section className="border-y md:border-t-0 md:bg-secondary">
        <div className="mx-auto grid max-w-6xl grid-cols-4 gap-x-1 px-2 py-5 md:grid-cols-2 md:gap-y-6 md:px-6 md:py-6 lg:grid-cols-4 lg:py-5">
          {home.promises.map(({ icon, title, body }, i) => {
            const Icon = promiseIcons[icon];
            return (
              <div
                key={title}
                className={cn(
                  "flex flex-col items-center gap-2 text-center md:flex-row md:gap-4 md:px-2 md:text-left lg:justify-center lg:px-6",
                  i > 0 && "lg:border-l lg:border-foreground/15",
                )}
              >
                <Icon className="size-5 shrink-0 text-foreground/80 md:size-6" strokeWidth={1.1} />
                <div>
                  <p className="text-[8.5px] leading-snug tracking-[0.14em] uppercase md:text-[11px] md:tracking-[0.18em]">{title}</p>
                  <p className="mt-0.5 text-[9.5px] leading-snug text-muted-foreground md:mt-0 md:text-xs">{body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* New in, with the "everyday glamour" panel beside it */}
      <section
        id="new-in"
        className="mx-auto grid max-w-7xl scroll-mt-28 gap-10 px-4 pt-10 pb-12 sm:px-6 md:pt-14 md:pb-16 lg:grid-cols-[1fr_minmax(0,0.55fr)]"
      >
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
          className="dark group relative isolate hidden min-h-[420px] overflow-hidden bg-espresso text-foreground md:flex lg:min-h-0"
        >
          <div className="absolute inset-0 -z-10 sm:left-[38%]">
            <Image
              src={glamour.image.src}
              alt={glamour.image.alt}
              fill
              sizes="(min-width: 1024px) 25vw, 60vw"
              className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso from-35% via-espresso/70 via-50% to-transparent" />
          <div className="my-auto max-w-[15rem] space-y-5 p-9">
            <h2 className="text-4xl leading-[1.1] font-light tracking-[0.12em] uppercase">{glamour.title}</h2>
            <Ornament className="justify-start" />
            <p className="text-sm leading-relaxed text-foreground/85">{glamour.body}</p>
            <span className={cn(outlineCta, "group-hover:bg-foreground group-hover:text-background")}>
              {glamour.button.label}
            </span>
          </div>
        </Link>
      </section>

      <MobileGlamour />

      <ShopByType className="hidden md:block" />

      {/* Bestsellers */}
      <section id="bestsellers" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-10 pb-10 sm:px-6 md:pt-0 md:pb-16">
        <SectionHeading title="Bestsellers" link={{ href: "/shop", label: "View all" }} />
        <MobileBestsellers products={bestsellers.slice(0, 4)} />
        <div className="hidden gap-x-5 gap-y-10 md:grid md:grid-cols-3 lg:grid-cols-6">
          {bestsellers.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Phones keep the two edits and the shop tiles */}
      <div id="edits" className="scroll-mt-28 md:hidden">
        <MobileEdits />
      </div>
      <MobileTiles />

      <Reels className="pt-12 md:pt-0" />

      <LovedByYou />

      <MobileTrust />

      {/* Message from the founder (last section) */}
      <div id="founder" className="scroll-mt-28">
        <MobileFounder />
        <FounderPicture className="hidden md:block" />
      </div>
    </>
  );
}

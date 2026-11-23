import Image from "next/image";
import Link from "next/link";
import { GemIcon, ShoppingBagIcon, SparklesIcon, TruckIcon } from "lucide-react";

import { HeeraRail } from "@/components/heera-rail";
import { VitrineHero } from "@/components/vitrine-hero";
import { Bestsellers, CategoryTiles, EditRow, FounderPicture, LovedByYou, Reels } from "@/components/home-sections";
import { ProductCard } from "@/components/product-card";
import { Ornament, SectionHeading } from "@/components/section-heading";
import { home } from "@/config/home";
import { bestsellerSlugs, edits, newInSlugs, pick, pickInOrder, railSlugs } from "@/lib/catalog";
import { cn } from "@/lib/utils";

// Page order: opening screen (layout), the shop-window banner (VitrineHero), promises, Shop the house (four tiles),
// New In (+ Everyday glamour on bigger screens), On the rail (3D), the Crystal Edit row,
// Bestsellers, Style. Love. Shop. (reels), Loved by you, and the founder's message.

const outlineCta =
  "inline-flex h-11 items-center justify-center border border-current px-7 text-[11px] tracking-[0.22em] uppercase transition-colors hover:bg-foreground hover:text-background";

const promiseIcons = { gem: GemIcon, sparkles: SparklesIcon, bag: ShoppingBagIcon, truck: TruckIcon } as const;

export default function Home() {
  const newIn = pick(newInSlugs);
  const bestsellers = pick(bestsellerSlugs);
  const crystal = pick(edits.crystal.slugs).filter((p) => p.inStock).slice(0, 8);
  const { glamour } = home;

  return (
    <>
      <VitrineHero />

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

      <CategoryTiles className="pt-10 md:pt-14" />

      {/* New in, with the "everyday glamour" panel beside it */}
      <section
        id="new-in"
        className="mx-auto grid max-w-7xl scroll-mt-28 gap-10 px-4 pt-2 pb-12 sm:px-6 md:pt-14 md:pb-16 lg:grid-cols-[1fr_minmax(0,0.55fr)]"
      >
        <div>
          <SectionHeading title="New in" link={{ href: "/shop", label: "View all" }} className="reveal" />
          <div className="reveal-stagger grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-5">
            {newIn.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>

        <Link
          href={glamour.button.href}
          className="reveal-clip dark group relative isolate hidden min-h-[420px] overflow-hidden bg-espresso text-foreground md:flex lg:min-h-0"
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

      {/* On the rail: pieces on gold hangers in 3D, on a dark band */}
      <section id="on-the-rail" className="reveal-band dark scroll-mt-28 overflow-hidden bg-espresso bg-[radial-gradient(ellipse_at_50%_30%,oklch(0.36_0.04_60),transparent_65%)] pt-12 pb-12 text-foreground md:pt-16 md:pb-16">
        <SectionHeading eyebrow={home.rail.eyebrow} title={home.rail.title} className="reveal mb-2 px-4 sm:mb-2" />
        <p className="px-4 text-center text-sm text-foreground/70">{home.rail.body}</p>
        <HeeraRail products={pickInOrder(railSlugs)} />
      </section>

      <EditRow products={crystal} className="mb-12 md:mb-16" />

      {/* Phones show the reels before Bestsellers; bigger screens show Bestsellers first. */}
      <div className="flex flex-col">
        <Bestsellers products={bestsellers} className="order-2 md:order-1" />
        <Reels className="order-1 w-full md:order-2" />
      </div>

      <LovedByYou />

      {/* Message from the founder (last section) */}
      <div id="founder" className="scroll-mt-28">
        <FounderPicture />
      </div>
    </>
  );
}

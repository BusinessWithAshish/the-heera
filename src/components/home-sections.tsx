// Home page sections shared by phones and bigger screens.
import Image from "next/image";
import Link from "next/link";

import { InstagramIcon } from "@/components/instagram-icon";
import { ReelVideo } from "@/components/reel-video";
import { ProductCard } from "@/components/product-card";
import { Eyebrow, Ornament, SectionHeading } from "@/components/section-heading";
import { home } from "@/config/home";
import { site } from "@/config/site";
import { type Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const outline =
  "inline-flex h-10 items-center justify-center border border-current px-6 text-[10px] tracking-[0.24em] uppercase transition-colors group-hover:bg-foreground group-hover:text-background";

// "Style. Love. Shop.": Instagram reels that play on their own once videos are added.
export function Reels({ className }: { className?: string }) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 pb-14 sm:px-6", className)}>
      <SectionHeading title="Style. Love. Shop." eyebrow={site.instagram.handle} />
      <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-6">
        {home.reels.map((r) => (
          <a
            key={r.poster}
            href={r.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Watch on Instagram: ${r.alt}`}
            className="group relative aspect-[9/16] w-[calc(50vw-2rem)] shrink-0 snap-start overflow-hidden bg-muted md:w-auto"
          >
            {r.video ? (
              <ReelVideo src={r.video} poster={r.poster} />
            ) : (
              <Image src={r.poster} alt={r.alt} fill sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <InstagramIcon className="absolute top-3 right-3 size-5 text-white drop-shadow" />
          </a>
        ))}
      </div>
    </section>
  );
}

// "Loved by you": customer photos drifting slowly sideways (stops on hover, and
// stays still for shoppers who turn motion off).
export function LovedByYou({ className }: { className?: string }) {
  const photos = home.lovedByYou;
  return (
    <section className={cn("pb-14 md:pb-20", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading title="Loved by you" />
      </div>
      <div className="group overflow-hidden">
        <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none md:gap-4">
          {[...photos, ...photos].map((src, i) => (
            <a
              key={`${src}-${i}`}
              href={site.instagram.url}
              target="_blank"
              rel="noreferrer"
              aria-hidden={i >= photos.length}
              tabIndex={i >= photos.length ? -1 : undefined}
              className="relative aspect-[3/4] w-[42vw] shrink-0 overflow-hidden bg-muted md:w-[22vw] lg:w-[18vw]"
            >
              <Image src={src} alt={i < photos.length ? "A customer wearing Heera Luxe" : ""} fill sizes="(min-width: 1024px) 18vw, (min-width: 768px) 22vw, 42vw" className="object-cover" />
            </a>
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <a href={site.instagram.url} target="_blank" rel="noreferrer" className={cn(outline, "group h-11 gap-2 px-7 hover:bg-foreground hover:text-background")}>
          <InstagramIcon className="size-4" /> Tag us to be featured
        </a>
      </div>
    </section>
  );
}

// The founder's message exactly as the owner's pictures: the tall one on phones,
// the wide one on bigger screens.
export function FounderPicture({ className }: { className?: string }) {
  const { picture, phonePicture, image, title, paragraphs, signature, role } = home.founder;
  return (
    <section className={cn("bg-cocoa-deep", className)}>
      {/* The words in the picture, for screen readers and search engines. */}
      <div className="sr-only">
        <h2>{title}</h2>
        {paragraphs.map((t) => (
          <p key={t}>{t}</p>
        ))}
        <p>{signature}, {role}</p>
      </div>
      <Image src={phonePicture.src} alt={`Message from the founder. ${image.alt}`} width={phonePicture.width} height={phonePicture.height} sizes="100vw" className="h-auto w-full md:hidden" />
      <Image src={picture.src} alt={`Message from the founder. ${image.alt}`} width={picture.width} height={picture.height} sizes="100vw" className="mx-auto hidden h-auto w-full max-w-[1920px] md:block" />
    </section>
  );
}

// "Shop the house": four tall photos with the name over each (Heels, Flats,
// Platforms, Bags). Phones show two across.
export function CategoryTiles({ className }: { className?: string }) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 pb-12 sm:px-6 md:pb-16", className)}>
      <SectionHeading title="Shop the house" />
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
        {home.categoryTiles.map((t) => (
          <Link key={t.href} href={t.href} className="dark group relative isolate block aspect-[3/4] overflow-hidden bg-espresso text-foreground">
            <Image
              src={t.image}
              alt={t.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="-z-10 object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 pb-5 md:pb-7">
              <h3 className="text-lg font-light tracking-[0.16em] uppercase sm:text-xl md:text-2xl md:tracking-[0.28em]">{t.title}</h3>
              <span className="h-px w-8 bg-gold transition-all duration-500 group-hover:w-16" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// The Crystal Edit row: a short story on the left, its pieces sliding on the right.
export function EditRow({ products, className }: { products: Product[]; className?: string }) {
  const { eyebrow, title, body, button } = home.editRow;
  return (
    <section className={cn("border-y bg-card py-12 md:py-16", className)}>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.32fr)_1fr] lg:items-center lg:gap-12">
        <div className="space-y-4 text-center lg:text-left">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="text-3xl leading-tight font-light tracking-[0.08em] sm:text-4xl">{title}</h2>
          <Ornament className="lg:justify-start" />
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-muted-foreground lg:mx-0">{body}</p>
          <Link
            href={button.href}
            className="inline-flex h-11 items-center justify-center border border-foreground px-7 text-[11px] tracking-[0.22em] uppercase transition-colors hover:bg-foreground hover:text-background"
          >
            {button.label}
          </Link>
        </div>
        <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} className="w-[44vw] shrink-0 snap-start sm:w-56" />
          ))}
        </div>
      </div>
    </section>
  );
}

// Bestsellers: on bigger screens a tall photo on the left, six pieces on the right.
export function Bestsellers({ products, className }: { products: Product[]; className?: string }) {
  const f = home.bestsellerFeature;
  return (
    <section id="bestsellers" className={cn("mx-auto w-full max-w-7xl scroll-mt-28 px-4 pb-12 sm:px-6 md:pb-16", className)}>
      <SectionHeading title="Bestsellers" link={{ href: "/shop", label: "View all" }} />
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.42fr)_1fr]">
        <Link href="/shop" className="dark group relative isolate hidden overflow-hidden bg-espresso text-foreground lg:block">
          <Image src={f.image} alt={f.alt} fill sizes="35vw" className="-z-10 object-cover transition duration-[1200ms] group-hover:scale-[1.04]" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 space-y-3">
            <p className="font-heading text-4xl font-light tracking-[0.1em]">{f.title}</p>
            <span className="inline-block border-b border-gold pb-1 text-[10px] tracking-[0.24em] text-gold uppercase">Shop the favourites</span>
          </div>
        </Link>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-5">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

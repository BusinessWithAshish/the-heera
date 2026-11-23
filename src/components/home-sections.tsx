// Home page sections shared by phones and bigger screens.
import Image from "next/image";
import Link from "next/link";

import { InstagramIcon } from "@/components/instagram-icon";
import { ReelVideo } from "@/components/reel-video";
import { SectionHeading } from "@/components/section-heading";
import { home } from "@/config/home";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const outline =
  "inline-flex h-10 items-center justify-center border border-current px-6 text-[10px] tracking-[0.24em] uppercase transition-colors group-hover:bg-foreground group-hover:text-background";

// Two wide dark panels: Heels and Bags.
export function ShopByType({ className }: { className?: string }) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 pb-16 sm:px-6", className)}>
      <SectionHeading title="Shop by type" />
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {home.shopByType.map((t) => (
          <Link
            key={t.title}
            href={t.href}
            className="dark group relative isolate flex h-60 overflow-hidden bg-espresso text-foreground lg:h-72"
          >
            <div className="absolute inset-y-0 right-0 -z-10 w-3/5">
              <Image src={t.image} alt={t.alt} fill sizes="(min-width: 768px) 30vw, 60vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-espresso to-transparent" />
            </div>
            <div className="flex flex-col justify-center gap-3 pl-8 lg:pl-12">
              <h3 className="text-4xl font-light tracking-[0.14em] uppercase lg:text-5xl">{t.title}</h3>
              <p className="text-sm text-foreground/85">{t.body}</p>
              <span className={cn(outline, "mt-2 self-start text-gold")}>Explore</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

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

// Bigger screens: the founder's message exactly as the owner's picture.
export function FounderPicture({ className }: { className?: string }) {
  const { picture, image, title, paragraphs, signature, role } = home.founder;
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
      <Image src={picture.src} alt={`Message from the founder. ${image.alt}`} width={picture.width} height={picture.height} sizes="100vw" className="mx-auto h-auto w-full max-w-[1920px]" />
    </section>
  );
}

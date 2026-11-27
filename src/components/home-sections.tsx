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
  "inline-flex h-10 items-center justify-center rounded-full border border-current px-6 text-[10px] tracking-[0.24em] uppercase transition-colors group-hover:bg-foreground group-hover:text-background";

// Two wide dark panels: Heels and Bags.
export function ShopByType({ className }: { className?: string }) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 pb-12 sm:px-6 md:pb-16", className)}>
      <SectionHeading title="Shop by type" className="reveal" />
      <div className="-mx-4 grid sm:-mx-6 md:mx-0 md:grid-cols-2 md:gap-5">
        {home.shopByType.map((t, i) => {
          // Phones stack the panels: the first has its words on the left, the
          // second on the right. Bigger screens show both with words on the left.
          const flip = i % 2 === 1;
          // Alternate the two colours: deep navy, then warm sand.
          const sand = i % 2 === 1;
          return (
            <Link
              key={t.title}
              href={t.href}
              className={cn(
                "reveal-clip gold-frame group relative isolate flex h-56 overflow-hidden text-foreground md:rounded-[1.75rem] md:h-60 md:justify-start md:text-left lg:h-72",
                sand ? "tone-sand bg-sand" : "dark bg-navy",
                flip ? "justify-end rounded-b-[1.75rem] text-right" : "rounded-t-[1.75rem]",
              )}
            >
              <div className={cn("absolute inset-y-0 -z-10 w-3/5 overflow-hidden md:right-0 md:left-auto", flip ? "left-0" : "right-0")}>
                <Image src={t.image} alt={t.alt} fill sizes="(min-width: 768px) 30vw, 60vw" className="parallax-img object-cover transition duration-700 group-hover:scale-[1.04]" />
                <div
                  className={cn(
                    "absolute inset-y-0 w-1/2 to-transparent md:right-auto md:left-0 md:bg-gradient-to-r",
                    sand ? "from-sand" : "from-navy",
                    flip ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r",
                  )}
                />
              </div>
              <div className={cn("flex flex-col justify-center gap-3 lg:pl-12", flip ? "pr-7 md:pr-0 md:pl-8" : "pl-7 md:pl-8")}>
                <h3 className="text-[1.75rem] font-light tracking-[0.1em] uppercase md:text-3xl lg:text-4xl">{t.title}</h3>
                <p className="text-sm text-foreground/85">{t.body}</p>
                <span className={cn(outline, "mt-2 text-gold md:self-start", flip ? "self-end" : "self-start")}>Explore</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// "Style. Love. Shop.": Instagram reels that play on their own once videos are added.
export function Reels({ className }: { className?: string }) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 pb-14 sm:px-6", className)}>
      <SectionHeading title="Style. Love. Shop." eyebrow={site.instagram.handle} className="reveal" />
      <div className="reveal -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-6">
        {home.reels.map((r) => (
          <a
            key={r.poster}
            href={r.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Watch on Instagram: ${r.alt}`}
            className="group relative aspect-[9/16] w-[calc(50vw-2rem)] shrink-0 snap-start overflow-hidden rounded-2xl bg-muted md:w-auto"
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
    <section className={cn("py-14 md:py-20", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading title="Loved by you" className="reveal" />
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
              className="relative aspect-[3/4] w-[42vw] shrink-0 overflow-hidden rounded-2xl bg-muted md:w-[22vw] lg:w-[18vw]"
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
    <section className={cn("reveal-clip bg-cocoa-deep", className)}>
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

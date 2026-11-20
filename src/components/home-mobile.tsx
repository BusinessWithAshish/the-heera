// Home page sections shown on phones only (below the `md` width).
// Bigger screens use the sections in src/app/page.tsx instead.
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, HandIcon, RefreshCwIcon, TruckIcon } from "lucide-react";

import { QuickAdd } from "@/components/add-to-bag";
import { PriceTag } from "@/components/price-tag";
import { Ornament } from "@/components/section-heading";
import { home } from "@/config/home";
import { edits, type EditKey, type Product } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const { mobile, glamour, founder } = home;
const outline =
  "inline-flex h-10 items-center justify-center border border-current px-6 text-[10px] tracking-[0.24em] uppercase";

// A dark panel with words on one side and a photo fading in from the other.
function Panel({
  href,
  image,
  alt,
  side = "right",
  tone = "espresso",
  children,
  className,
}: {
  href: string;
  image: string;
  alt: string;
  side?: "left" | "right";
  tone?: "espresso" | "black";
  children: React.ReactNode;
  className?: string;
}) {
  const bg = tone === "black" ? "from-background" : "from-espresso";
  return (
    <Link
      href={href}
      className={cn(
        "dark group relative isolate flex min-h-[230px] overflow-hidden text-foreground",
        tone === "black" ? "bg-background" : "bg-espresso",
        side === "left" && "justify-end text-right",
        className,
      )}
    >
      <div className={cn("absolute inset-y-0 -z-10 w-[58%]", side === "right" ? "right-0" : "left-0")}>
        <Image src={image} alt={alt} fill sizes="60vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
        <div
          className={cn(
            "absolute inset-y-0 w-2/5 to-transparent",
            bg,
            side === "right" ? "left-0 bg-gradient-to-r" : "right-0 bg-gradient-to-l",
          )}
        />
      </div>
      <div className="flex w-[56%] flex-col justify-center gap-3 px-5 py-8">{children}</div>
    </Link>
  );
}

export function MobileChapter() {
  return (
    <section className="space-y-2.5 px-6 pt-6 pb-5 text-center md:hidden">
      <h2 className="text-[1.3rem] leading-tight tracking-[0.12em] uppercase">{mobile.chapter.title}</h2>
      <Ornament />
      <p className="mx-auto max-w-[17rem] text-[13px] leading-relaxed text-muted-foreground">{mobile.chapter.body}</p>
      <a href={mobile.chapter.button.href} target="_blank" rel="noreferrer" className={cn(outline, "mt-1 h-9 px-7")}>
        {mobile.chapter.button.label}
      </a>
    </section>
  );
}

export function MobileGlamour() {
  return (
    <Panel href={glamour.button.href} image={mobile.glamourImage} alt={glamour.image.alt} className="min-h-[260px] md:hidden">
      <h2 className="text-[1.6rem] leading-[1.1] font-light tracking-[0.12em] uppercase">{glamour.title}</h2>
      <Ornament className="justify-start" />
      <p className="text-[13px] leading-relaxed text-foreground/85">{glamour.body}</p>
      <span className={cn(outline, "mt-1 self-start")}>{glamour.button.label}</span>
    </Panel>
  );
}

// Bestsellers as a list: photo on the left, name, price and a button on the right.
export function MobileBestsellers({ products }: { products: Product[] }) {
  return (
    <ul className="divide-y md:hidden">
      {products.map((p) => (
        <li key={p.slug} className="flex items-center gap-5 py-4 first:pt-0">
          <Link href={`/products/${p.slug}`} className="relative aspect-[4/5] w-[42%] shrink-0 overflow-hidden bg-muted">
            <Image src={p.images[0]} alt={p.name} fill sizes="42vw" className="object-cover" />
          </Link>
          <div className="min-w-0 space-y-2">
            <Link href={`/products/${p.slug}`} className="block text-xs leading-snug tracking-[0.14em] uppercase">
              {p.name}
            </Link>
            <PriceTag product={p} className="text-[13px]" />
            <QuickAdd product={p} className="mt-2" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function MobileEdits() {
  const keys: EditKey[] = ["crystal", "beaded"];
  return (
    <div className="md:hidden">
      {keys.map((key, i) => (
        <Panel
          key={key}
          href={`/edits/${key}`}
          image={mobile.edits[key].image}
          alt={edits[key].title}
          tone={i === 0 ? "black" : "espresso"}
          className="min-h-[250px] border-b border-white/10"
        >
          <h2 className="text-[1.6rem] leading-[1.1] font-light tracking-[0.12em] uppercase">{edits[key].title}</h2>
          <Ornament className="justify-start" />
          <p className="text-[13px] leading-relaxed text-foreground/85">{mobile.edits[key].body}</p>
          <span className={cn(outline, "mt-1 self-start px-4")}>Explore the edit</span>
        </Panel>
      ))}
    </div>
  );
}

export function MobileTiles() {
  return (
    <div className="md:hidden">
      {mobile.tiles.map((tile, i) => {
        const left = i % 2 === 1;
        return (
          <Panel
            key={tile.title}
            href={tile.href}
            image={tile.image}
            alt={tile.title}
            side={left ? "left" : "right"}
            className="min-h-[220px] border-b border-white/10"
          >
            <h2 className="text-2xl font-light tracking-[0.14em] uppercase">{tile.title}</h2>
            <p className="text-[13px] leading-relaxed text-foreground/85">{tile.body}</p>
            <span className={cn("mt-1 inline-flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase", left && "justify-end")}>
              Shop now <ArrowRightIcon className="size-3.5" strokeWidth={1.3} />
            </span>
          </Panel>
        );
      })}
    </div>
  );
}

const trustIcons = { truck: TruckIcon, refresh: RefreshCwIcon, hand: HandIcon } as const;

export function MobileTrust() {
  return (
    <section className="grid grid-cols-3 border-t px-3 py-6 md:hidden">
      {mobile.trust.map(({ icon, title, body }) => {
        const Icon = trustIcons[icon];
        return (
          <div key={title} className="flex flex-col items-center gap-1.5 text-center">
            <Icon className="size-5 text-foreground/80" strokeWidth={1.1} />
            <p className="text-[9px] tracking-[0.18em] uppercase">{title}</p>
            <p className="text-[10px] text-muted-foreground">{body}</p>
          </div>
        );
      })}
    </section>
  );
}

// The founder's message as a framed card, like the printed version.
export function MobileFounder() {
  const [first, ...rest] = founder.signature.split(" ");
  return (
    <section className="dark bg-linear-to-b from-taupe to-taupe-deep px-3 py-3 text-foreground md:hidden">
      <div className="relative overflow-hidden rounded-xl border border-cream/30">
        <div className="relative aspect-[479/693] w-full">
          <Image src={mobile.founderImage} alt={founder.image.alt} fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-taupe to-transparent" />
        </div>
        <div className="relative -mt-16 space-y-5 px-6 pb-10 text-cream">
          <div className="text-center">
            <h2 className="text-[2rem] leading-none font-light tracking-[0.06em] uppercase">Message from</h2>
            <p className="-mt-1 font-script text-5xl leading-tight text-cream/95">the founder</p>
            <Ornament className="mt-2 [&>span]:w-16" />
          </div>
          <div className="space-y-4 text-[15px] leading-relaxed font-light">
            {founder.paragraphs.map((text, i) => (
              <p key={text} className={cn(i >= 3 && "italic")}>
                {text}
              </p>
            ))}
          </div>
          <div className="pt-2 text-center">
            <p className="font-script text-4xl leading-none text-cream/95">
              {first.charAt(0).toUpperCase() + first.slice(1)} {rest.slice(0, -1).join(" ")},
            </p>
            <p className="font-script text-6xl leading-tight text-cream">{rest.at(-1)}</p>
            <p className="mt-1 text-sm text-cream/80">{founder.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

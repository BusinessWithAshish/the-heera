import Link from "next/link";
import { ClockIcon, HandIcon, MailIcon, RefreshCwIcon, TruckIcon } from "lucide-react";

import { InstagramIcon } from "@/components/instagram-icon";
import { Ornament } from "@/components/section-heading";
import { Wordmark } from "@/components/wordmark";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { home } from "@/config/home";
import { helpNav, nav, site } from "@/config/site";

// The footer on every page: a strip of promises, the logo with a line about the
// brand, four columns of links, and a large "Heera Luxe" across the bottom.
// Phones fold the links into tap-to-open rows.

// Cached so pages can be prerendered; refreshes whenever the site is rebuilt.
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

// Every line here comes from src/config/site.ts, so it stays true when that changes.
const promises = [
  { icon: TruckIcon, title: "Free shipping", body: "Anywhere in India" },
  { icon: RefreshCwIcon, title: "Size exchange", body: `Within ${site.exchangeDays} days` },
  { icon: ClockIcon, title: "Ready to ship", body: `Dispatched in ${site.shipping.dispatchDays} days` },
  { icon: HandIcon, title: "Made by hand", body: "Embellished in India" },
];

type FooterLink = { label: string; href: string; external?: boolean };

const linkGroups: { title: string; links: FooterLink[] }[] = [
  { title: "Shop", links: [{ label: "Shop all", href: "/shop" }, { label: "Footwear", href: "/shop/footwear" }, ...nav] },
  { title: "Customer care", links: [...helpNav, { label: "Order on Instagram", href: site.instagram.dm, external: true }] },
  {
    title: "The house",
    links: [
      { label: "Message from the founder", href: "/#founder" },
      { label: "The Crystal Edit", href: "/edits/crystal" },
      { label: "The Beaded Edit", href: "/edits/beaded" },
      { label: "Babes of Heera Luxe", href: site.instagram.url, external: true },
    ],
  },
];

const headingClass = "mb-5 font-sans text-[11px] font-normal tracking-[0.24em] text-gold uppercase";

function FooterLinkItem({ link }: { link: FooterLink }) {
  const cls = "text-foreground/80 transition-colors hover:text-gold";
  return link.external ? (
    <a href={link.href} target="_blank" rel="noreferrer" className={cls}>{link.label}</a>
  ) : (
    <Link href={link.href} className={cls}>{link.label}</Link>
  );
}

function Promises() {
  return (
    <div className="border-b border-gold/20">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 py-7 sm:px-6 md:grid-cols-4 md:py-8">
        {promises.map(({ icon: Icon, title, body }, i) => (
          <li
            key={title}
            className={`flex flex-col items-center gap-2 text-center md:flex-row md:justify-center md:gap-4 md:text-left ${i > 0 ? "md:border-l md:border-gold/15" : ""}`}
          >
            <Icon className="size-5 shrink-0 text-gold" strokeWidth={1.1} />
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase md:text-[11px]">{title}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Contact({ className }: { className?: string }) {
  return (
    <ul className={className}>
      <li>
        <a href={site.instagram.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 text-foreground/80 hover:text-gold">
          <InstagramIcon className="size-4" /> {site.instagram.handle}
        </a>
      </li>
      <li>
        <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 text-foreground/80 hover:text-gold">
          <MailIcon className="size-4" strokeWidth={1.4} /> {site.email}
        </a>
      </li>
    </ul>
  );
}

export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="dark relative mt-auto overflow-hidden bg-cocoa-deep text-foreground">
      {/* A soft gold glow from the top edge. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_50%_0%,rgba(217,169,106,0.16),transparent_70%)]" />

      <div className="relative">
        <Promises />

        {/* Bigger screens: brand on the left, links on the right. */}
        <div className="mx-auto hidden max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid md:grid-cols-[1.5fr_1fr_1fr_1fr_1.25fr]">
          <div className="space-y-6">
            <Wordmark className="h-16" />
            <Ornament className="justify-start" />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Heels, flats and bags embellished by hand in India, crystal by crystal, for every moment that deserves a little sparkle.
            </p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2.5 border border-gold/60 px-6 text-[10px] tracking-[0.24em] text-gold uppercase transition-colors hover:bg-gold hover:text-background"
            >
              <InstagramIcon className="size-4" /> Follow the sparkle
            </a>
          </div>
          {linkGroups.map((g) => (
            <div key={g.title}>
              <h3 className={headingClass}>{g.title}</h3>
              <ul className="space-y-3 text-sm">
                {g.links.map((l) => (
                  <li key={l.href + l.label}><FooterLinkItem link={l} /></li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className={headingClass}>Say hello</h3>
            <Contact className="space-y-3 text-sm" />
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Message us on Instagram to order, ask about sizes or see a piece on video.
            </p>
          </div>
        </div>

        {/* Phones: logo, a line, icons, then the links in tap-to-open rows. */}
        <div className="px-5 pt-10 pb-4 md:hidden">
          <div className="flex flex-col items-center gap-4 text-center">
            <Wordmark className="h-12" />
            <Ornament />
            <p className="max-w-[17rem] text-[13px] leading-relaxed text-muted-foreground">{home.mobile.tagline}</p>
          </div>
          <Accordion className="mt-8 border-t border-gold/20">
            {[...linkGroups, { title: "Say hello", links: [] as FooterLink[] }].map((g) => (
              <AccordionItem key={g.title} value={g.title} className="border-b border-gold/20">
                <AccordionTrigger className="py-4 text-[11px] font-normal tracking-[0.22em] uppercase hover:no-underline">
                  {g.title}
                </AccordionTrigger>
                <AccordionContent>
                  {g.links.length ? (
                    <ul className="space-y-3 pb-2 text-sm">
                      {g.links.map((l) => (
                        <li key={l.href + l.label}><FooterLinkItem link={l} /></li>
                      ))}
                    </ul>
                  ) : (
                    <Contact className="space-y-3 pb-2 text-sm" />
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* The big name across the bottom, in a soft gold. */}
        <p
          aria-hidden
          className="pointer-events-none -mb-[0.18em] bg-gradient-to-b from-[#d9a96a]/45 to-[#d9a96a]/5 bg-clip-text text-center font-heading text-[12.5vw] leading-none font-light tracking-[0.05em] whitespace-nowrap text-transparent uppercase select-none md:text-[13.5vw] md:tracking-[0.08em]"
        >
          {site.name}
        </p>

        <div className="border-t border-gold/20">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-5 text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:px-6 md:flex-row md:justify-between md:text-[11px]">
            <span>© {year} {site.name} · Made in India</span>
            <nav className="flex gap-5">
              {helpNav.map((l) => (
                <Link key={l.href} href={l.href} className="hover:text-gold">{l.label}</Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

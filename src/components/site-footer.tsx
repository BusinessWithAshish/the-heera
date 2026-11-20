import Link from "next/link";
import { MailIcon } from "lucide-react";

import { InstagramIcon } from "@/components/instagram-icon";
import { Ornament } from "@/components/section-heading";
import { Wordmark } from "@/components/wordmark";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { home } from "@/config/home";
import { helpNav, nav, site } from "@/config/site";

// Cached so pages can be prerendered; refreshes whenever the site is rebuilt.
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

const headingClass = "mb-5 font-sans text-[11px] font-normal tracking-[0.22em] text-gold uppercase";

const linkGroups = [
  { title: "Shop", links: [{ label: "Shop all", href: "/shop" }, ...nav, { label: "The Crystal Edit", href: "/edits/crystal" }, { label: "The Beaded Edit", href: "/edits/beaded" }] },
  { title: "Customer care", links: helpNav },
  { title: "About", links: [{ label: "Message from the founder", href: "/#founder" }, { label: "Babes of Heera Luxe", href: site.instagram.url }] },
];

// Phones: logo, a line of words, icons, then the links folded into tap-to-open rows.
function MobileFooter() {
  return (
    <div className="px-5 pt-12 pb-6 md:hidden">
      <div className="flex flex-col items-center gap-4 text-center">
        <Wordmark className="h-12" />
        <p className="max-w-[16rem] text-[13px] leading-relaxed text-muted-foreground">{home.mobile.tagline}</p>
        <div className="flex gap-6">
          <a href={site.instagram.url} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-gold">
            <InstagramIcon className="size-5" />
          </a>
          <a href={`mailto:${site.email}`} aria-label={`Email ${site.email}`} className="hover:text-gold">
            <MailIcon className="size-5" strokeWidth={1.4} />
          </a>
        </div>
      </div>
      <Accordion className="mt-8 border-t">
        {linkGroups.map((g) => (
          <AccordionItem key={g.title} value={g.title} className="border-b">
            <AccordionTrigger className="py-4 text-[11px] font-normal tracking-[0.22em] uppercase hover:no-underline">
              {g.title}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-3 pb-2 text-sm text-muted-foreground">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-foreground">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="dark mt-auto bg-background text-foreground">
      <MobileFooter />
      <div className="mx-auto hidden max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-5">
          <Wordmark className="h-14" />
          <Ornament className="justify-start" />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            Heels, flats and bags embellished by hand in India, for every occasion that deserves a little sparkle.
          </p>
        </div>
        <div>
          <h3 className={headingClass}>Shop</h3>
          <ul className="space-y-3 text-sm">
            <li><Link href="/shop" className="hover:text-gold">Shop all</Link></li>
            {nav.map((item) => (
              <li key={item.href}><Link href={item.href} className="hover:text-gold">{item.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={headingClass}>Help</h3>
          <ul className="space-y-3 text-sm">
            {helpNav.map((item) => (
              <li key={item.href}><Link href={item.href} className="hover:text-gold">{item.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={headingClass}>Say hello</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={site.instagram.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-gold">
                <InstagramIcon className="size-4" /> {site.instagram.handle}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-gold">
                <MailIcon className="size-4" strokeWidth={1.4} /> {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden border-t md:block">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5 text-[11px] tracking-[0.14em] text-muted-foreground uppercase sm:flex-row sm:justify-between sm:px-6">
          <span>© {year} {site.name}. Made in India.</span>
          <span>Free shipping across India</span>
        </div>
      </div>
      <p className="pb-6 text-center text-[10px] tracking-[0.14em] text-muted-foreground uppercase md:hidden">
        © {year} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}

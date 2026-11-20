import Link from "next/link";
import { MailIcon } from "lucide-react";

import { InstagramIcon } from "@/components/instagram-icon";
import { Ornament } from "@/components/section-heading";
import { Wordmark } from "@/components/wordmark";
import { helpNav, nav, site } from "@/config/site";

// Cached so pages can be prerendered; refreshes whenever the site is rebuilt.
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

const headingClass = "mb-5 font-sans text-[11px] font-normal tracking-[0.22em] text-gold uppercase";

export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="dark mt-auto bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
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
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5 text-[11px] tracking-[0.14em] text-muted-foreground uppercase sm:flex-row sm:justify-between sm:px-6">
          <span>© {year} {site.name}. Made in India.</span>
          <span>Free shipping across India</span>
        </div>
      </div>
    </footer>
  );
}

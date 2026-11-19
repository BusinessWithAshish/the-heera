import Link from "next/link";
import { MailIcon } from "lucide-react";

import { Wordmark } from "@/components/wordmark";
import { helpNav, nav, site } from "@/config/site";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

// Cached so pages can be prerendered; refreshes whenever the site is rebuilt.
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="dark mt-auto bg-background text-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-4">
          <Wordmark className="text-lg" />
          <p className="max-w-xs text-sm text-muted-foreground">
            Heels, flats and bags embellished by hand in India, for every occasion that deserves a little sparkle.
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-xs tracking-[0.18em] text-muted-foreground uppercase">Shop</h3>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/shop" className="hover:text-gold">Shop all</Link></li>
            {nav.map((item) => (
              <li key={item.href}><Link href={item.href} className="hover:text-gold">{item.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-xs tracking-[0.18em] text-muted-foreground uppercase">Help</h3>
          <ul className="space-y-2.5 text-sm">
            {helpNav.map((item) => (
              <li key={item.href}><Link href={item.href} className="hover:text-gold">{item.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-sans text-xs tracking-[0.18em] text-muted-foreground uppercase">Say hello</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={site.instagram.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-gold">
                <InstagramIcon className="size-4" /> {site.instagram.handle}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-gold">
                <MailIcon className="size-4" /> {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
          <span>© {year} {site.name}. Made in India.</span>
          <span>Free shipping across India</span>
        </div>
      </div>
    </footer>
  );
}

export { InstagramIcon };

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { helpNav, nav, site } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-foreground px-4 py-2 text-center text-[11px] tracking-[0.18em] text-background uppercase">
        Free shipping across India<span className="hidden sm:inline"> · Ships in {site.shipping.dispatchDays} days</span>
      </div>
      <div className="border-b bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/75">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger render={<Button variant="ghost" size="icon" className="-ml-2 md:hidden" aria-label="Open menu" />}>
                <MenuIcon />
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] max-w-sm">
                <SheetHeader>
                  <SheetTitle>
                    <Wordmark />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col px-4">
                  {[{ label: "Shop all", href: "/shop" }, ...nav].map((item) => (
                    <SheetClose
                      key={item.href}
                      render={
                        <Link
                          href={item.href}
                          className="border-b py-4 font-heading text-2xl"
                        />
                      }
                    >
                      {item.label}
                    </SheetClose>
                  ))}
                  <Separator className="my-4 opacity-0" />
                  {helpNav.map((item) => (
                    <SheetClose
                      key={item.href}
                      render={<Link href={item.href} className="py-2 text-sm text-muted-foreground" />}
                    >
                      {item.label}
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <nav className="hidden items-center gap-7 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-xs tracking-[0.16em] uppercase transition-colors hover:text-foreground",
                    isActive(item.href) ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link href="/" aria-label={`${site.name} home`} className="text-base sm:text-lg">
            <Wordmark />
          </Link>

          <div className="flex items-center justify-end gap-6">
            <Link
              href="/faq"
              className="hidden text-xs tracking-[0.16em] text-muted-foreground uppercase hover:text-foreground md:inline"
            >
              Help
            </Link>
            <a
              href={site.instagram.dm}
              target="_blank"
              rel="noreferrer"
              className="text-xs tracking-[0.16em] uppercase underline-offset-4 hover:underline"
            >
              Order on DM
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

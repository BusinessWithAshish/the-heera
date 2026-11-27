"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, SearchIcon } from "lucide-react";

import { CartButton } from "@/components/cart-drawer";
import { InstagramIcon } from "@/components/instagram-icon";
import { Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { home } from "@/config/home";
import { helpNav, mainNav, nav, site } from "@/config/site";
import { cn } from "@/lib/utils";

const linkClass = "text-[13px] tracking-[0.16em] uppercase transition-colors hover:text-gold";

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="dark sticky top-0 z-40 bg-background text-foreground">
      <div className="hidden border-b px-4 py-2 text-center text-[9px] md:block tracking-[0.14em] whitespace-pre-wrap text-gold uppercase sm:text-[11px] sm:tracking-[0.2em]">
        {home.announcement}
      </div>
      <div className="border-b">
        <div className="mx-auto grid h-16 max-w-[96rem] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 md:h-[76px] lg:px-10">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger
                render={<Button variant="ghost" size="icon" className="-ml-2 md:hidden" aria-label="Open menu" />}
              >
                <MenuIcon />
              </SheetTrigger>
              <SheetContent side="left" className="dark w-[85vw] max-w-sm bg-background text-foreground">
                <SheetHeader>
                  <SheetTitle>
                    <Wordmark className="h-9" />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col px-4">
                  {[
                    { label: "New in", href: "/#new-in" },
                    ...nav,
                    { label: "Crystal Edit", href: "/edits/crystal" },
                    { label: "Beaded Edit", href: "/edits/beaded" },
                    { label: "Bestsellers", href: "/#bestsellers" },
                    { label: "Shop all", href: "/shop" },
                  ].map(
                    (item) => (
                      <SheetClose
                        key={item.href}
                        render={<Link href={item.href} className="border-b py-4 font-heading text-2xl tracking-[0.12em] uppercase" />}
                      >
                        {item.label}
                      </SheetClose>
                    ),
                  )}
                  <div className="mt-6 flex flex-col">
                    {helpNav.map((item) => (
                      <SheetClose
                        key={item.href}
                        render={<Link href={item.href} className="py-2 text-sm text-muted-foreground" />}
                      >
                        {item.label}
                      </SheetClose>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" aria-label={`${site.name} home`} className="hidden md:block">
              <Wordmark className="h-11 lg:h-12" priority />
            </Link>
          </div>

          <Link href="/" aria-label={`${site.name} home`} className="md:hidden">
            <Wordmark className="h-10" priority />
          </Link>

          <NavigationMenu className="hidden md:flex" align="center">
            <NavigationMenuList className="gap-6 lg:gap-12">
              {mainNav.map((item) =>
                "children" in item ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger
                      className={cn(
                        linkClass,
                        "h-auto rounded-none bg-transparent px-0 py-2 font-normal hover:bg-transparent focus:bg-transparent data-popup-open:bg-transparent data-popup-open:hover:bg-transparent data-open:bg-transparent",
                      )}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-52 gap-0.5 p-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink
                              render={<Link href={child.href} />}
                              className="rounded-lg px-3 py-2.5 text-xs tracking-[0.16em] uppercase"
                            >
                              {child.label}
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.label}>
                    <Link href={item.href} className={cn(linkClass, "py-2", isActive(item.href) && "text-gold")}>
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center justify-end gap-1 sm:gap-3">
            <Link
              href="/shop"
              aria-label="Browse every style"
              className="inline-flex size-10 items-center justify-center transition-colors hover:text-gold"
            >
              <SearchIcon className="size-5" strokeWidth={1.4} />
            </Link>
            <a
              href={site.instagram.dm}
              target="_blank"
              rel="noreferrer"
              aria-label="Message us on Instagram"
              className="hidden size-10 items-center justify-center transition-colors hover:text-gold sm:inline-flex"
            >
              <InstagramIcon className="size-5" />
            </a>
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
}

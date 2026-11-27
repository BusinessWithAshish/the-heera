import Link from "next/link";

import { Eyebrow } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-32 text-center">
      <Eyebrow>Page not found</Eyebrow>
      <h1 className="text-5xl">This sparkle has moved.</h1>
      <p className="text-muted-foreground">The page you&apos;re looking for isn&apos;t here, but the collection is.</p>
      <Link href="/shop" className={cn(buttonVariants(), "h-12 rounded-full px-8 text-xs tracking-[0.18em] uppercase")}>
        Shop the collection
      </Link>
    </div>
  );
}

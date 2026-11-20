import Image from "next/image";

import { site } from "@/config/site";
import { cn } from "@/lib/utils";

// Heera Luxe logo (rose-gold lettering on a see-through background).
// It's light, so only use it on dark bands. Set the height with className, e.g. "h-10".
export function Wordmark({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/images/brand/heera-luxe-logo.webp"
      alt={site.name}
      width={698}
      height={232}
      priority={priority}
      className={cn("h-10 w-auto", className)}
    />
  );
}

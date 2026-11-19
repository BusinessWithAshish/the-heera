import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-[11px] tracking-[0.24em] text-gold uppercase", className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  link,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  link?: { href: string; label: string };
  className?: string;
}) {
  return (
    <div className={cn("mb-8 flex items-end justify-between gap-6 sm:mb-10", className)}>
      <div className="space-y-2">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="text-3xl leading-tight sm:text-4xl">{title}</h2>
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-1.5 pb-1 text-xs tracking-[0.16em] uppercase"
        >
          {link.label}
          <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}

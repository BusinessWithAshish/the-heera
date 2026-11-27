import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-[11px] tracking-[0.24em] text-gold uppercase", className)}>{children}</p>;
}

// The thin line, little four-point star, thin line flourish from the design.
export function Ornament({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("flex items-center justify-center gap-2 text-gold", className)}>
      <span className="h-px w-10 bg-current opacity-60" />
      <svg viewBox="0 0 10 10" className="size-2.5 fill-current">
        <path d="M5 0 6 4 10 5 6 6 5 10 4 6 0 5 4 4z" />
      </svg>
      <span className="h-px w-10 bg-current opacity-60" />
    </span>
  );
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
    <div className={cn("mb-8 grid grid-cols-[1fr_auto_1fr] items-end gap-3 sm:mb-10", className)}>
      <span />
      <div className="space-y-2 text-center">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="text-[1.4rem] leading-tight tracking-[0.12em] uppercase sm:text-4xl sm:tracking-[0.14em]">{title}</h2>
        <Ornament />
      </div>
      {link ? (
        <Link
          href={link.href}
          className="group inline-flex items-center justify-self-end gap-2 pb-4 text-[10px] tracking-[0.2em] text-gold uppercase sm:text-[11px]"
        >
          <span className="hidden sm:inline">{link.label}</span>
          <span className="sm:hidden">All</span>
          <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-1" strokeWidth={1.4} />
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}

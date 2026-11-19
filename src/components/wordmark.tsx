import { cn } from "@/lib/utils";

// The Heera wordmark: a small faceted diamond and the name set in the display serif.
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-foreground", className)}>
      <svg viewBox="0 0 24 20" aria-hidden className="h-[0.9em] w-auto text-gold" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M5 1h14l4 6-11 12L1 7z" />
        <path d="M1 7h22M9 1 7 7l5 12 5-12-2-6" />
      </svg>
      <span className="font-heading text-[1.35em] leading-none font-medium tracking-[0.28em] uppercase">
        Heera
      </span>
    </span>
  );
}

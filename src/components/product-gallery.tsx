"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

// Phones: swipe through photos. Larger screens: one big photo with thumbnails.
export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState(0);

  return (
    <div>
      <div
        className="-mx-4 flex snap-x snap-mandatory overflow-x-auto sm:hidden"
        onScroll={(e) => {
          const el = e.currentTarget;
          setSeen(Math.round(el.scrollLeft / el.clientWidth));
        }}
      >
        {images.map((src, i) => (
          <div key={src} className="relative aspect-[4/5] w-full shrink-0 snap-center bg-muted">
            <Image src={src} alt={`${name}, photo ${i + 1}`} fill priority={i === 0} sizes="100vw" className="object-cover" />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5 sm:hidden" aria-hidden>
          {images.map((src, i) => (
            <span key={src} className={cn("h-1 rounded-full transition-all", i === seen ? "w-5 bg-foreground" : "w-1.5 bg-border")} />
          ))}
        </div>
      )}

      <div className="hidden gap-4 sm:grid sm:grid-cols-[72px_1fr]">
        <div className="flex flex-col gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl bg-muted ring-offset-2 ring-offset-background transition",
                i === active ? "ring-1 ring-foreground" : "opacity-70 hover:opacity-100",
              )}
            >
              <Image src={src} alt="" fill sizes="72px" className="object-cover" />
            </button>
          ))}
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
          <Image
            key={images[active]}
            src={images[active]}
            alt={`${name}, photo ${active + 1}`}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 80vw"
            className="animate-in object-cover fade-in duration-500"
          />
        </div>
      </div>
    </div>
  );
}

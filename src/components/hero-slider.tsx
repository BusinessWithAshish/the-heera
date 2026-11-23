"use client";

// The banner at the top of the home page: slides move right to left on their own
// every few seconds, pause while a shopper hovers or taps, and each slide is a link.
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { Ornament } from "@/components/section-heading";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { home } from "@/config/home";
import { cn } from "@/lib/utils";

const DELAY_MS = 5000;
const slides = home.slides;

// Phones: the tall poster's shape. Bigger screens: most of the screen height.
const frame = "relative block aspect-[1024/1536] w-full md:aspect-auto md:h-[min(calc(100svh-110px),640px)] md:min-h-[480px]";

function Slide({ slide, first }: { slide: (typeof slides)[number]; first: boolean }) {
  if (slide.kind === "poster") {
    return (
      <Link href={slide.href} className={frame} aria-label={slide.alt}>
        <Image src={slide.mobile} alt={slide.alt} fill priority={first} sizes="100vw" className="object-cover md:hidden" />
        <Image src={slide.desktop} alt={slide.alt} fill priority={first} sizes="100vw" className="hidden object-cover md:block" />
      </Link>
    );
  }
  return (
    <Link href={slide.href} className={cn(frame, "group isolate overflow-hidden bg-background")}>
      <div className="absolute inset-0 -z-10 md:left-[40%]">
        <Image src={slide.image} alt={slide.alt} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover object-top" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background from-15% via-background/60 to-transparent md:bg-gradient-to-r md:from-background md:from-42% md:via-background/60 md:via-55% md:to-transparent" />
      <div className="flex h-full flex-col items-center justify-end gap-4 px-6 pb-16 text-center md:w-[48%] md:items-start md:justify-center md:pb-0 md:pl-[8%] md:text-left">
        <p className="text-[10px] tracking-[0.3em] text-gold uppercase md:text-[11px]">{slide.eyebrow}</p>
        <h2 className="text-4xl leading-[1.05] font-light tracking-[0.12em] text-gold uppercase md:text-6xl">{slide.title}</h2>
        <Ornament className="md:justify-start" />
        <p className="max-w-xs text-sm text-foreground/85 md:text-base">{slide.body}</p>
        <span className="mt-2 inline-flex h-11 items-center border border-gold px-7 text-[11px] tracking-[0.22em] text-gold uppercase transition-colors group-hover:bg-gold group-hover:text-background">
          {slide.button}
        </span>
      </div>
    </Link>
  );
}

export function HeroSlider() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const onSelect = useCallback((a: NonNullable<CarouselApi>) => setCurrent(a.selectedScrollSnap()), []);

  useEffect(() => {
    if (!api) return;
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => api.scrollNext(), DELAY_MS);
    return () => window.clearInterval(id);
  }, [api, paused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="dark relative bg-background text-foreground"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <Carousel setApi={setApi} opts={{ loop: true, duration: 32 }}>
        <CarouselContent className="ml-0">
          {slides.map((slide, i) => (
            <CarouselItem key={slide.href} className="pl-0" aria-label={`${i + 1} of ${slides.length}`}>
              <Slide slide={slide} first={i === 0} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 md:bottom-6">
        {slides.map((slide, i) => (
          <button
            key={slide.href}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            aria-current={current === i}
            onClick={() => api?.scrollTo(i)}
            className="flex h-6 items-center"
          >
            <span className={cn("block h-px transition-all duration-500", current === i ? "w-8 bg-gold" : "w-4 bg-foreground/50")} />
          </button>
        ))}
      </div>
    </section>
  );
}

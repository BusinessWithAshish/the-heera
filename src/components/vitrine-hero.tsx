"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { home } from "@/config/home";
import { cn } from "@/lib/utils";

// The top of the home page, built around the silver crystal bag clip. Three designs:
//   "arch"  one large arched shop window with a gold frame
//   "full"  the clip blurred across the whole banner, the sharp clip on the right,
//           the words on the left like a magazine cover
//   "trio"  three arched windows, each playing the clip from a different moment
// All three tilt gently in 3D with the pointer, respond to scroll, and have gold dust
// drifting behind. Shoppers who turn motion off see the still picture, no movement.
// While `home.hero.compare` is on, a small switcher at the bottom picks the design
// (also ?hero=1, 2 or 3 in the address, so a link can open a chosen one).

const { hero } = home;
type Design = "arch" | "full" | "trio";
const designs: { key: Design; label: string }[] = [
  { key: "arch", label: "One window" },
  { key: "full", label: "Full width" },
  { key: "trio", label: "Three windows" },
];

function Clip({ start = 0, eager, className }: { start?: number; eager?: boolean; className?: string }) {
  return (
    <video
      poster={hero.poster}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "metadata"}
      aria-label={hero.videoAlt}
      data-start={start}
      className={cn("absolute inset-0 size-full object-cover", className)}
    >
      {/* Bigger screens get the sharp 1080p file, phones the lighter 720p one (both 60 fps). */}
      <source src={hero.video.large} type="video/mp4" media="(min-width: 768px)" />
      <source src={hero.video.small} type="video/mp4" />
    </video>
  );
}

function Window({ side, delay, start, eager }: { side: "left" | "center" | "right"; delay: number; start?: number; eager?: boolean }) {
  return (
    <div className={cn("vitrine-window", `is-${side}`)} style={{ animationDelay: `${delay}s` }}>
      <div className="vitrine-frame">
        <div className="vitrine-glass">
          <Clip start={start} eager={eager} />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-cocoa-deep/60 via-transparent to-transparent" />
          <span aria-hidden className="vitrine-shine" />
        </div>
      </div>
    </div>
  );
}

function Words({ align = "center" }: { align?: "center" | "left" }) {
  const left = align === "left";
  return (
    <div className={cn("flex flex-col", left ? "items-center text-center md:items-start md:text-left" : "items-center text-center")}>
      <p className="vitrine-in text-[10px] tracking-[0.42em] text-gold uppercase md:text-[11px]" style={{ animationDelay: "0.7s" }}>
        {hero.eyebrow}
      </p>
      <h1 className={cn("mt-3 leading-[1.02] font-light tracking-[0.06em]", left ? "text-[2.6rem] sm:text-6xl lg:text-[5.5rem]" : "text-[2.6rem] sm:text-6xl md:text-7xl")}>
        {hero.title.split(" ").map((word, i) => (
          <span key={word + i} className="inline-block overflow-hidden pb-1 align-bottom">
            <span className="vitrine-word inline-block" style={{ animationDelay: `${0.85 + i * 0.12}s` }}>
              {word}&nbsp;
            </span>
          </span>
        ))}
        {left && <br className="hidden md:block" />}
        <span className="-mr-3 inline-block overflow-hidden pr-4 pb-3 pl-1 align-bottom">
          <span className="vitrine-word inline-block font-script text-[1.35em] leading-none tracking-normal text-gold" style={{ animationDelay: "1.15s" }}>
            {hero.script}
          </span>
        </span>
      </h1>
      <p className="vitrine-in mt-5 max-w-md text-sm leading-relaxed text-foreground/80 md:text-base" style={{ animationDelay: "1.35s" }}>
        {hero.body}
      </p>
      <div className={cn("vitrine-in mt-7 flex flex-wrap gap-3", left ? "justify-center md:justify-start" : "justify-center")} style={{ animationDelay: "1.5s" }}>
        {hero.buttons.map((b, i) => (
          <Link
            key={b.href}
            href={b.href}
            className={cn(
              "inline-flex h-12 items-center justify-center px-8 text-[11px] tracking-[0.24em] uppercase transition-colors",
              i === 0 ? "bg-gold text-background hover:bg-foreground" : "border border-foreground/50 hover:border-gold hover:text-gold",
            )}
          >
            {b.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function VitrineHero() {
  const rootRef = useRef<HTMLElement>(null);
  const dustRef = useRef<HTMLCanvasElement>(null);
  const [design, setDesign] = useState<Design>(hero.design);

  // Preview only: open the design named in the address (?hero=1, 2 or 3).
  useEffect(() => {
    if (!hero.compare) return;
    const n = Number(new URLSearchParams(window.location.search).get("hero"));
    const picked = designs[n - 1]?.key;
    if (picked) {
      const t = window.setTimeout(() => setDesign(picked), 0);
      return () => window.clearTimeout(t);
    }
  }, []);

  const choose = (d: Design) => {
    setDesign(d);
    const url = new URL(window.location.href);
    url.searchParams.set("hero", String(designs.findIndex((x) => x.key === d) + 1));
    window.history.replaceState(null, "", url);
  };

  // Videos: start each at its own moment, play only while on screen.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const videos = [...root.querySelectorAll("video")];
    videos.forEach((v) => {
      const start = Number(v.dataset.start || 0);
      const seek = () => {
        if (start && v.duration) v.currentTime = start % v.duration;
      };
      if (v.readyState >= 1) seek();
      else v.addEventListener("loadedmetadata", seek, { once: true });
    });
    if (reduced) return;
    const io = new IntersectionObserver(([entry]) => {
      videos.forEach((v) => (entry.isIntersecting ? v.play().catch(() => {}) : v.pause()));
    });
    io.observe(root);
    return () => io.disconnect();
  }, [design]);

  // Pointer tilt, scroll progress and the gold dust, eased in one loop.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = true;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const target = { x: 0, y: 0 };
    const now = { x: 0, y: 0, p: 0 };
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    if (fine) window.addEventListener("pointermove", onPointer, { passive: true });

    const canvas = dustRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const motes = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.4 + Math.random() * 1.4,
      v: 0.006 + Math.random() * 0.018,
      t: Math.random() * Math.PI * 2,
    }));
    const size = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    size();
    window.addEventListener("resize", size);

    let raf = 0;
    let last = performance.now();
    const tick = () => {
      cancelAnimationFrame(raf);
      if (!visible) return;
      raf = requestAnimationFrame(tick);
      const t = performance.now();
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      const ease = 1 - Math.exp(-dt * 4);

      const rect = root.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
      now.x += (target.x - now.x) * ease;
      now.y += (target.y - now.y) * ease;
      now.p += (p - now.p) * (1 - Math.exp(-dt * 10));
      root.style.setProperty("--tx", now.x.toFixed(4));
      root.style.setProperty("--ty", now.y.toFixed(4));
      root.style.setProperty("--p", now.p.toFixed(4));

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.y -= m.v * dt;
        m.t += dt * 1.6;
        if (m.y < -0.02) {
          m.y = 1.02;
          m.x = Math.random();
        }
        const glow = 0.25 + 0.75 * Math.pow(0.5 + 0.5 * Math.sin(m.t), 3);
        ctx.beginPath();
        ctx.fillStyle = `rgba(246, 220, 184, ${0.55 * glow})`;
        ctx.arc((m.x + now.x * 0.01 * m.r) * w, m.y * h, m.r * dpr * (0.8 + glow * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) tick();
    });
    io.observe(root);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", size);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="Heera Luxe"
      data-design={design}
      className="vitrine dark relative isolate overflow-hidden bg-cocoa-deep text-foreground"
    >
      {design === "full" ? (
        // The clip blurred across the whole banner, darkened so the words read.
        <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
          <Clip className="vitrine-backdrop" />
          <div className="absolute inset-0 bg-gradient-to-r from-cocoa-deep via-cocoa-deep/75 to-cocoa-deep/30" />
        </div>
      ) : (
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_18%,rgba(217,169,106,0.22),transparent_70%)]" />
      )}
      <canvas ref={dustRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10 size-full" />

      {design === "full" ? (
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pt-8 pb-14 md:min-h-[min(calc(100svh-132px),760px)] md:grid-cols-[1.1fr_1fr] md:py-12 lg:px-10">
          <div className="order-2 md:order-1">
            <Words align="left" />
          </div>
          <div className="vitrine-feature order-1 mx-auto w-[min(78vw,330px)] md:order-2 md:w-[min(34vw,440px)]">
            <div className="vitrine-feature-frame relative aspect-[3/4]">
              <Clip eager />
              <span aria-hidden className="vitrine-shine" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className={cn(
              "vitrine-stage relative mx-auto flex max-w-6xl items-end justify-center",
              design === "arch" ? "h-[min(60svh,560px,128vw)] md:h-[min(64svh,660px)]" : "h-[min(54svh,500px,112vw)] md:h-[min(62svh,640px)]",
            )}
          >
            {design === "trio" && <Window side="left" delay={0.35} start={1.6} />}
            <Window side="center" delay={0.15} eager />
            {design === "trio" && <Window side="right" delay={0.55} start={3.2} />}
          </div>
          <div className="relative z-10 mx-auto -mt-10 max-w-2xl px-6 pb-14 md:-mt-16 md:pb-20">
            <Words />
          </div>
        </>
      )}

      {hero.compare && (
        <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
          <div role="group" aria-label="Compare banner designs (preview only)" className="flex items-center gap-1 border border-gold/40 bg-cocoa-deep/90 p-1 shadow-2xl backdrop-blur">
            <span className="hidden px-2 text-[9px] tracking-[0.2em] text-gold uppercase sm:inline">Banner</span>
            {designs.map((d, i) => (
              <button
                key={d.key}
                type="button"
                onClick={() => choose(d.key)}
                aria-pressed={design === d.key}
                className={cn(
                  "h-9 px-3 text-[10px] tracking-[0.16em] uppercase transition-colors",
                  design === d.key ? "bg-gold text-background" : "text-foreground/80 hover:text-gold",
                )}
              >
                {i + 1} · {d.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

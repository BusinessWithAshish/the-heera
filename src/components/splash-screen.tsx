"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { site } from "@/config/site";

// The opening screen, on deep navy: two gold waves made of glitter sparkle in, a spark runs along them, stars glint, the Heera Luxe logo
// rises out of a soft blur and a beam of light runs across it, then the screen parts
// like curtains onto the site. Shown once per visit (until the tab is closed). Shoppers who turn motion off never see it. The little script in layout.tsx
// hides it before the first paint on repeat visits, so the page never flashes.

export const SPLASH_KEY = "heera-splash-seen";
const HOLD_MS = 2500; // how long the logo shows before the curtains open
const OPEN_MS = 1100; // how long the curtains take

// Bigger stars that glint once.
const stars = [
  { x: "22%", y: "28%", s: 16, d: 0.55 },
  { x: "75%", y: "34%", s: 20, d: 0.95 },
  { x: "66%", y: "70%", s: 13, d: 1.35 },
  { x: "31%", y: "66%", s: 11, d: 1.6 },
];

// Tiny sparkles near the ribbon that keep twinkling.
const sparkles = [
  { x: "57%", y: "21%", s: 6, d: 0.3 },
  { x: "62%", y: "31%", s: 4, d: 1.1 },
  { x: "69%", y: "40%", s: 7, d: 0.7 },
  { x: "64%", y: "52%", s: 5, d: 1.9 },
  { x: "54%", y: "58%", s: 6, d: 0.9 },
  { x: "44%", y: "57%", s: 4, d: 1.5 },
  { x: "40%", y: "49%", s: 6, d: 0.4 },
  { x: "47%", y: "43%", s: 4, d: 2.1 },
  { x: "58%", y: "66%", s: 5, d: 1.2 },
  { x: "63%", y: "76%", s: 6, d: 0.6 },
  { x: "36%", y: "36%", s: 3, d: 1.7 },
  { x: "73%", y: "58%", s: 3, d: 2.4 },
  { x: "51%", y: "27%", s: 3, d: 1.9 },
  { x: "28%", y: "48%", s: 3, d: 0.8 },
];

// The two gold waves, as their curve points: [start, then control, control, end per curve].
type Pt = [number, number];
const RIBBON: Pt[] = [[640, -40], [520, 120], [560, 230], [690, 330], [820, 430], [760, 560], [600, 600], [420, 645], [300, 560], [360, 470], [420, 380], [560, 420], [600, 520], [650, 650], [760, 760], [820, 1040]];
const RIBBON_THIN: Pt[] = [[600, -40], [470, 140], [520, 250], [660, 350], [790, 450], [740, 585], [585, 620], [430, 655], [330, 590], [380, 500]];
const toPath = (p: Pt[]) => `M${p[0]} ` + p.slice(1).map((q, i) => (i % 3 === 0 ? "C " : "") + q.join(" ")).join(", ");

// Glitter: tiny gold specks and the odd little star scattered along each wave, so
// the wave itself sparkles. Worked out once from the curves (same on every visit).
type Speck = { x: number; y: number; r: number; star: boolean; color: string; appear: number; twinkle: number };
const glitterColors = ["#fff7e8", "#f6dcb8", "#ecc999", "#d9a96a", "#ffffff"];
function glitter(points: Pt[], count: number, seed: number, spread: number): Speck[] {
  let n = seed;
  const rand = () => ((n = (n * 16807) % 2147483647) - 1) / 2147483646;
  // walk the curves finely, then pick evenly spaced spots along the length
  const walk: { x: number; y: number; nx: number; ny: number; len: number }[] = [];
  let total = 0;
  let prev: Pt | null = null;
  for (let c = 0; c + 3 < points.length; c += 3) {
    const [a, b, d, e] = [points[c], points[c + 1], points[c + 2], points[c + 3]];
    for (let i = 0; i <= 60; i++) {
      const t = i / 60, u = 1 - t;
      const x = u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * d[0] + t * t * t * e[0];
      const y = u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * d[1] + t * t * t * e[1];
      if (prev) total += Math.hypot(x - prev[0], y - prev[1]);
      const dx = prev ? x - prev[0] : 1, dy = prev ? y - prev[1] : 0, m = Math.hypot(dx, dy) || 1;
      walk.push({ x, y, nx: -dy / m, ny: dx / m, len: total });
      prev = [x, y];
    }
  }
  const specks: Speck[] = [];
  let j = 0;
  for (let k = 0; k < count; k++) {
    const target = (k / (count - 1)) * total;
    while (j < walk.length - 1 && walk[j].len < target) j++;
    const w = walk[j];
    const off = (rand() - 0.5) * spread;
    const star = rand() < 0.14;
    specks.push({
      x: w.x + w.nx * off,
      y: w.y + w.ny * off,
      r: star ? 7 + rand() * 7 : 2 + rand() * 3.6,
      star,
      color: glitterColors[Math.floor(rand() * glitterColors.length)],
      appear: 0.15 + (target / total) * 1.7,
      twinkle: rand() * 1.6,
    });
  }
  return specks;
}
const specks = [...glitter(RIBBON, 150, 7, 16), ...glitter(RIBBON_THIN, 80, 13, 10)];
const starPath = (x: number, y: number, r: number) =>
  `M${x} ${y - r} L${x + r * 0.18} ${y - r * 0.18} L${x + r} ${y} L${x + r * 0.18} ${y + r * 0.18} L${x} ${y + r} L${x - r * 0.18} ${y + r * 0.18} L${x - r} ${y} L${x - r * 0.18} ${y - r * 0.18}Z`;

function Star({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden className="fill-[#f6dcb8] drop-shadow-[0_0_6px_rgba(246,220,184,0.9)]">
      <path d="M10 0 11.3 8.7 20 10 11.3 11.3 10 20 8.7 11.3 0 10 8.7 8.7z" />
    </svg>
  );
}

export function SplashScreen() {
  const [phase, setPhase] = useState<"show" | "open" | "gone">("show");

  useEffect(() => {
    if (document.documentElement.dataset.splash === "off") {
      const skip = window.setTimeout(() => setPhase("gone"), 0);
      return () => window.clearTimeout(skip);
    }
    try {
      sessionStorage.setItem(SPLASH_KEY, "1");
    } catch {}
    document.documentElement.style.overflow = "hidden";
    const open = window.setTimeout(() => setPhase("open"), HOLD_MS);
    return () => window.clearTimeout(open);
  }, []);

  useEffect(() => {
    if (phase === "show") return;
    const done = window.setTimeout(() => {
      setPhase("gone");
      document.documentElement.style.overflow = "";
      document.documentElement.dataset.splash = "off";
    }, phase === "open" ? OPEN_MS : 0);
    return () => window.clearTimeout(done);
  }, [phase]);

  if (phase === "gone") return null;
  const opening = phase === "open";

  return (
    <div
      aria-hidden
      className="splash fixed inset-0 z-[100] select-none"
      data-opening={opening || undefined}
    >
      {/* Two curtains, each half of the screen, that slide apart at the end. */}
      <div className="splash-curtain splash-curtain-top" />
      <div className="splash-curtain splash-curtain-bottom" />

      <div className="splash-stage absolute inset-0 overflow-hidden">
        {/* The gold ribbon from the brand artwork, drawn as a line. */}
        <svg className="absolute inset-0 size-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <defs>
            <linearGradient id="splash-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8a5a34" />
              <stop offset="0.45" stopColor="#f6dcb8" />
              <stop offset="0.6" stopColor="#d9a96a" />
              <stop offset="1" stopColor="#6e452a" />
            </linearGradient>
          </defs>
          {/* Drawn smaller than the screen, around the middle: a faint gold line with
              glitter scattered along it, and a spark of light running along it. */}
          <g transform="translate(500 500) scale(0.62) translate(-500 -500)">
            <path className="splash-ribbon" pathLength={1} d={toPath(RIBBON)} fill="none" stroke="url(#splash-gold)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
            <path className="splash-ribbon splash-ribbon-thin" pathLength={1} d={toPath(RIBBON_THIN)} fill="none" stroke="url(#splash-gold)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
            {specks.map((g, i) =>
              g.star ? (
                <path
                  key={i}
                  className="splash-glitter"
                  d={starPath(g.x, g.y, g.r)}
                  fill={g.color}
                  style={{ ["--appear" as string]: `${g.appear}s`, ["--twinkle" as string]: `${g.twinkle}s` }}
                />
              ) : (
                <circle
                  key={i}
                  className="splash-glitter"
                  cx={g.x}
                  cy={g.y}
                  r={g.r}
                  fill={g.color}
                  style={{ ["--appear" as string]: `${g.appear}s`, ["--twinkle" as string]: `${g.twinkle}s` }}
                />
              ),
            )}
            <path className="splash-glint" pathLength={1} d={toPath(RIBBON)} fill="none" stroke="#fff6e8" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
            <path className="splash-glint splash-glint-2" pathLength={1} d={toPath(RIBBON_THIN)} fill="none" stroke="#fff6e8" strokeWidth="1.4" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
          </g>
        </svg>

        {stars.map((s) => (
          <span
            key={s.x}
            className="splash-star absolute"
            style={{ left: s.x, top: s.y, animationDelay: `${s.d}s` }}
          >
            <Star size={s.s} />
          </span>
        ))}

        {sparkles.map((s) => (
          <span
            key={`${s.x}-${s.y}`}
            className="splash-twinkle absolute"
            style={{ left: s.x, top: s.y, animationDelay: `${s.d}s` }}
          >
            <Star size={s.s} />
          </span>
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6">
          <div className="splash-logo relative">
            <Image
              src="/images/brand/heera-luxe-logo.webp"
              alt=""
              width={698}
              height={232}
              priority
              className="h-auto w-[min(72vw,26rem)]"
            />
            {/* A beam of light that runs across the lettering only. */}
            <span
              className="splash-shine absolute inset-0"
              style={{ ["--splash-logo" as string]: "url(/images/brand/heera-luxe-logo.webp)" }}
            />
          </div>
          <span className="splash-line h-px w-40 bg-gradient-to-r from-transparent via-[#d9a96a] to-transparent" />
          <p className="splash-tagline text-[10px] tracking-[0.42em] text-[#e9cfae] uppercase sm:text-[11px]">
            Embellished by hand in India
          </p>
        </div>
      </div>

      <span className="sr-only">{site.name}</span>
    </div>
  );
}

// Runs before the page paints: skip the splash on repeat visits in the same tab and
// for shoppers who turn motion off. Kept tiny on purpose.
export const splashGateScript = `try{if(sessionStorage.getItem("${SPLASH_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.splash="off"}catch(e){}`;

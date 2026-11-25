"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Smooth, gliding scroll on computers (mouse and trackpad). Phones keep their own
// natural scrolling, and shoppers who turn motion off get the normal scroll.
// It waits while the opening screen is showing, so the page can't move underneath it.
export function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: true, lerp: 0.09, anchors: { offset: -120 }, allowNestedScroll: true });
    const html = document.documentElement;
    const sync = () => (html.dataset.splash === "off" ? lenis.start() : lenis.stop());
    sync();
    const watch = new MutationObserver(sync);
    watch.observe(html, { attributes: true, attributeFilter: ["data-splash"] });

    return () => {
      watch.disconnect();
      lenis.destroy();
    };
  }, []);
  return null;
}

"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import { loadGsap, prefersReducedMotion, whenInteractive } from "./loadGsap";

let lenis: Lenis | null = null;

const HEADER_OFFSET = -80;

/**
 * Scrolls to an element on the current page, smoothly when motion is allowed,
 * and moves keyboard focus there. Returns false if the id isn't on the page.
 */
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return false;

  if (lenis) {
    lenis.scrollTo(target, { offset: HEADER_OFFSET });
  } else {
    target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
  window.history.pushState(null, "", `#${id}`);
  target.focus({ preventScroll: true });
  return true;
}

/** Locks page scrolling while a menu or dialog is open. */
export function pauseScrolling(paused: boolean) {
  document.documentElement.style.overflow = paused ? "hidden" : "";
  if (paused) lenis?.stop();
  else lenis?.start();
}

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in
 * sync. Starts on the first scroll or touch, and stays off for reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    let cancelled = false;
    let teardown = () => {};

    const cancelStart = whenInteractive(async () => {
      const [{ gsap, ScrollTrigger }, { default: LenisClass }] = await Promise.all([
        loadGsap(),
        import("lenis"),
      ]);
      if (cancelled) return;

      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      const tick = (time: number) => lenis?.raf(time * 1000);

      const stop = () => {
        gsap.ticker.remove(tick);
        lenis?.destroy();
        lenis = null;
      };

      const sync = () => {
        stop();
        if (media.matches) return;
        lenis = new LenisClass({ lerp: 0.12 });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      };

      sync();
      media.addEventListener("change", sync);
      teardown = () => {
        media.removeEventListener("change", sync);
        stop();
      };
    });

    return () => {
      cancelled = true;
      cancelStart();
      teardown();
    };
  }, []);

  return null;
}

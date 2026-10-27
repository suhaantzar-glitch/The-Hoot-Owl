"use client";

import type { gsap as Gsap } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type Motion = { gsap: typeof Gsap; ScrollTrigger: typeof ScrollTriggerType };

let loading: Promise<Motion> | null = null;

/**
 * GSAP and ScrollTrigger, fetched on first use so they stay out of the
 * initial page load. Every caller shares the same copy.
 */
export function loadGsap(): Promise<Motion> {
  loading ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, s]) => {
    g.gsap.registerPlugin(s.ScrollTrigger);
    return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
  });
  return loading;
}

const FIRST_INPUT = ["scroll", "wheel", "touchstart", "pointerdown", "keydown"] as const;

/**
 * Runs `callback` on the visitor's first scroll, touch, click or key press.
 * All of the motion is scroll-driven, so there's no reason to fetch it for
 * someone who never moves. Returns a cancel function.
 */
export function whenInteractive(callback: () => void): () => void {
  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    cancel();
    callback();
  };
  const cancel = () => FIRST_INPUT.forEach((type) => window.removeEventListener(type, run));
  FIRST_INPUT.forEach((type) => window.addEventListener(type, run, { passive: true }));
  return () => {
    done = true;
    cancel();
  };
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

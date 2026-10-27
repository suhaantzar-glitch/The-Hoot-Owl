"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadGsap, prefersReducedMotion, whenInteractive } from "./loadGsap";

/** Fades its content up as it scrolls into view. Static for reduced motion. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let cancelled = false;
    let revert = () => {};

    const cancelStart = whenInteractive(async () => {
      const { gsap } = await loadGsap();
      // Anything already on screen (or scrolled past) stays put rather than flashing out.
      if (cancelled || el.getBoundingClientRect().top < window.innerHeight) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          delay,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
      revert = () => mm.revert();
    });

    return () => {
      cancelled = true;
      cancelStart();
      revert();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

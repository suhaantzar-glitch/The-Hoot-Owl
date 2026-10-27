"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { TIME_ZONE } from "@/content/hours";
import { useNow } from "@/lib/useNow";
import { loadGsap, prefersReducedMotion, whenInteractive } from "./motion/loadGsap";

const FLAP_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const BLANK = "\u00a0";

let clockFormat: Intl.DateTimeFormat | null = null;

/** Canton's current time, for the board's header. */
export function LocalClock({ className }: { className?: string }) {
  const now = useNow();
  if (now === null) return <time className={className}>--:--</time>;
  clockFormat ??= new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
  });
  return <time className={className}>{clockFormat.format(now)}</time>;
}

const randomChar = () => FLAP_CHARS[Math.floor(Math.random() * FLAP_CHARS.length)];

/**
 * Flips the board's cells (`[data-final]` inside `[data-row]`) through random
 * characters onto their real text when it scrolls into view. The server
 * renders the final text, so reduced motion and no-JS visitors just see it.
 */
export function SplitFlapMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const board = ref.current;
    if (!board || played.current || prefersReducedMotion()) return;

    const rows = Array.from(board.querySelectorAll<HTMLElement>("[data-row]"));
    const cells = rows.flatMap((row, r) =>
      Array.from(row.querySelectorAll<HTMLElement>("[data-final]")).map((cell, c) => ({
        face: cell,
        final: cell.dataset.final === " " ? BLANK : (cell.dataset.final ?? BLANK),
        delay: r * 0.14 + c * 0.022,
      })),
    );
    const restore = () =>
      cells.forEach(({ face, final }) => {
        face.textContent = final;
        face.style.transform = "";
      });

    let cancelled = false;
    let teardown = () => {};

    const cancelStart = whenInteractive(() => {
      loadGsap()
        .then(({ gsap, ScrollTrigger }) => {
          // A board that's already in view keeps its text instead of blanking.
          if (cancelled || board.getBoundingClientRect().top < window.innerHeight * 0.8) return;
          // Blank the board until it flips in.
          cells.forEach(({ face }) => (face.textContent = BLANK));
          let ctx: ReturnType<typeof gsap.context> | null = null;

          const flipIn = () => {
            ctx = gsap.context(() => {
              cells.forEach(({ face, final, delay }) => {
                const flips = 3 + Math.floor(Math.random() * 5);
                let segment = 0;
                // Each flip is a fold down then back up; swap the character at the fold.
                gsap.to(face, {
                  rotationX: -90,
                  transformPerspective: 200,
                  duration: 0.05,
                  ease: "power1.in",
                  delay,
                  repeat: flips * 2 - 1,
                  yoyo: true,
                  onRepeat: () => {
                    segment += 1;
                    if (segment % 2 === 1) {
                      face.textContent = segment === flips * 2 - 1 ? final : randomChar();
                    }
                  },
                });
              });
            });
            gsap.delayedCall(4, () => (played.current = true));
          };

          const trigger = ScrollTrigger.create({
            trigger: board,
            start: "top 80%",
            once: true,
            onEnter: flipIn,
          });
          teardown = () => {
            trigger.kill();
            ctx?.revert();
            restore();
          };
        })
        .catch(restore);
    });

    return () => {
      cancelled = true;
      cancelStart();
      teardown();
      restore();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}

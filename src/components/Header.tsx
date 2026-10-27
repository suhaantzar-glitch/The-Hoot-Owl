"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { navLinks, site } from "@/content/site";
import { OwlMark } from "./OwlMark";
import { CashStamp } from "./Decor";
import { pauseScrolling, scrollToId } from "./motion/SmoothScroll";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    pauseScrolling(true);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current || !buttonRef.current) return;
      // Keep focus inside the open menu (the toggle button plus its links).
      const items = [buttonRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a")];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      pauseScrolling(false);
    };
  }, [open]);

  const onNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    const [path, hash] = href.split("#");
    // Same-page anchors scroll smoothly instead of jumping.
    if (hash && (path || "/") === pathname && scrollToId(hash)) event.preventDefault();
  };

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-brass bg-depot text-cream">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-cream focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <OwlMark tone="dark" className="h-10 w-10 transition-transform group-hover:-rotate-6" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.65rem] font-extrabold tracking-wide uppercase">
              The Hoot Owl
            </span>
            <span className="font-mono text-[0.68rem] tracking-[0.2em] text-cream-soft uppercase">
              Canton, N.Y.<span className="hidden sm:inline"> · Track 40</span>
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const current = link.href === pathname;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => onNavClick(e, link.href)}
                    aria-current={current ? "page" : undefined}
                    className="font-display rounded px-3 py-2 text-xl font-bold tracking-[0.08em] uppercase transition-colors hover:bg-depot-light hover:text-brass-light aria-[current=page]:text-brass-light aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="font-display flex items-center gap-2 rounded border-2 border-cream/40 px-3 py-1.5 text-lg font-bold tracking-[0.12em] uppercase md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-[4.2rem] bottom-0 overflow-y-auto bg-depot px-4 pt-6 pb-10 md:hidden"
      >
        <p className="font-mono text-sm tracking-[0.2em] text-cream-soft uppercase">Departures · Track 40</p>
        <nav aria-label="Mobile">
          <ol className="mt-4 divide-y divide-cream/15 border-y border-cream/15">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => onNavClick(e, link.href)}
                  aria-current={link.href === pathname ? "page" : undefined}
                  className="flex items-baseline gap-4 py-4 aria-[current=page]:text-brass-light"
                >
                  <span className="font-mono text-sm text-brass-light">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-4xl font-extrabold tracking-wide uppercase">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <CashStamp size="sm" />
          <p className="font-mono text-sm text-cream-soft">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region}
          </p>
        </div>
      </div>
    </header>
  );
}

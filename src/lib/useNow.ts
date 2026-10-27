"use client";

import { useSyncExternalStore } from "react";

const MINUTE = 60_000;

// Rounded to the minute so the value only changes when the clock does.
let now: number | null = null;
const listeners = new Set<() => void>();
let interval: number | undefined;

function tick() {
  now = Math.floor(Date.now() / MINUTE) * MINUTE;
  listeners.forEach((listener) => listener());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  if (listeners.size === 1) {
    // Start the clock in its own task, after hydration, so the first
    // render matches the prerendered HTML and the page stays responsive.
    window.setTimeout(tick, 0);
    interval = window.setInterval(tick, 15_000);
  }
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) window.clearInterval(interval);
  };
}

const getSnapshot = () => now;

// The page is prerendered, so the server never knows the visitor's time.
const getServerSnapshot = () => null;

/** The current time in ms, ticking each minute. `null` until the clock starts. */
export function useNow(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

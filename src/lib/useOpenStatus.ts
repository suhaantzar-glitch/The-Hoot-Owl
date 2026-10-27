"use client";

import { useSyncExternalStore } from "react";
import { hours, TIME_ZONE } from "@/content/hours";
import { getOpenStatus, type OpenStatus } from "./hours";

// One shared status for every lamp, timetable and countdown on the page,
// worked out once a second rather than once per component.
let status: OpenStatus | null = null;
let shownKey = "";
const listeners = new Set<() => void>();
let timer: number | undefined;

function update() {
  const next = getOpenStatus(new Date(), hours, TIME_ZONE);
  // Only notify when something on screen would change: the state, the
  // wording, or the countdown's whole second.
  const seconds = next.state === "closed" && next.opensInMs !== null ? Math.ceil(next.opensInMs / 1000) : "";
  const key = `${next.state}|${next.serviceDay}|${next.detail}|${seconds}`;
  if (key === shownKey) return;
  shownKey = key;
  status = next;
  listeners.forEach((listener) => listener());
}

// Tick just after each second boundary so the countdown never skips.
function scheduleNext() {
  timer = window.setTimeout(
    () => {
      update();
      scheduleNext();
    },
    1000 - (Date.now() % 1000) + 5,
  );
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  if (listeners.size === 1) {
    // First reading in its own task, after hydration, so the first render
    // matches the prerendered HTML and the page stays responsive.
    timer = window.setTimeout(() => {
      update();
      scheduleNext();
    }, 0);
  }
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) window.clearTimeout(timer);
  };
}

const getSnapshot = () => status;

// The page is prerendered, so the server never knows the visitor's time.
const getServerSnapshot = () => null;

/** Whether the bar is open right now, on Canton time. `null` until the first reading. */
export function useOpenStatus(): OpenStatus | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

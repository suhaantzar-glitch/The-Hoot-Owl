"use client";

import { hours, TIME_ZONE } from "@/content/hours";
import { getOpenStatus } from "@/lib/hours";
import { useNow } from "@/lib/useNow";

/** Live "Open now / Closed · Opens at 8 PM" lamp, judged on Canton time. */
export function OpenStatus({ className = "" }: { className?: string }) {
  const now = useNow();
  const status = now === null ? null : getOpenStatus(new Date(now), hours, TIME_ZONE);
  const open = status?.state === "open";

  return (
    <p
      className={`inline-flex min-h-12 items-center gap-3 rounded-full bg-cream py-2 pr-5 pl-3 text-ink shadow-[0_0.5rem_1rem_-0.5rem_rgb(0_0_0/0.5)] ${className}`}
      aria-live="polite"
    >
      <span
        aria-hidden
        className={`h-4 w-4 shrink-0 rounded-full border-2 border-ink/30 ${
          status === null
            ? "bg-ink/20"
            : open
              ? "bg-signal shadow-[0_0_0.75rem_0.15rem_rgb(76_194_122/0.8)]"
              : "bg-scarlet"
        }`}
      />
      {status === null ? (
        <span className="font-mono text-sm tracking-wide">Checking the timetable…</span>
      ) : (
        <span className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-xl font-extrabold tracking-[0.08em] uppercase">
            {status.label}
          </span>
          {status.detail ? <span className="font-mono text-sm">{status.detail}</span> : null}
        </span>
      )}
    </p>
  );
}

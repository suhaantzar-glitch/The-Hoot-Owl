"use client";

import { describeCountdown, formatCountdown } from "@/lib/hours";
import { useOpenStatus } from "@/lib/useOpenStatus";

/**
 * Live "Open now / Closed · Opens at 8 PM" lamp, judged on Canton time,
 * with a running countdown to the doors opening while closed.
 */
export function OpenStatus({ className = "" }: { className?: string }) {
  const status = useOpenStatus();
  const open = status?.state === "open";
  const opensInMs = status?.state === "closed" ? status.opensInMs : null;

  return (
    <div
      className={`inline-flex min-h-12 items-center gap-3 rounded-[1.75rem] bg-cream py-2 pr-5 pl-3 text-ink shadow-[0_0.5rem_1rem_-0.5rem_rgb(0_0_0/0.5)] ring-2 ring-ink/10 ${className}`}
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
      <span className="flex flex-col">
        {/* Announced when it changes; the per-second timer below is not. */}
        <span aria-live="polite" className="flex flex-wrap items-baseline gap-x-2">
          {status === null ? (
            <span className="font-mono text-sm tracking-wide">Checking the timetable…</span>
          ) : (
            <>
              <span className="font-display text-xl font-extrabold tracking-[0.08em] uppercase">
                {status.label}
              </span>
              {status.detail ? <span className="font-mono text-sm">{status.detail}</span> : null}
            </>
          )}
        </span>
        {opensInMs !== null ? (
          <span role="timer" className="font-mono text-sm text-ink-soft">
            Doors in{" "}
            <span aria-hidden className="font-bold text-scarlet tabular-nums">
              {formatCountdown(opensInMs)}
            </span>
            <span className="sr-only">{describeCountdown(opensInMs)}</span>
          </span>
        ) : null}
      </span>
    </div>
  );
}

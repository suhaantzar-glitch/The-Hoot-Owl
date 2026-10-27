import { weeklyLineup } from "@/content/events";
import { formatTime } from "@/lib/hours";
import { LocalClock, SplitFlapMotion } from "./SplitFlapMotion";

function Flaps({
  text,
  width,
  amber = false,
  alignRight = false,
}: {
  text: string;
  width: number;
  amber?: boolean;
  alignRight?: boolean;
}) {
  const upper = text.toUpperCase();
  const chars = (alignRight ? upper.padStart(width, " ") : upper.padEnd(width, " "))
    .slice(0, width)
    .split("");
  return (
    <span className="flex gap-[2px]">
      {chars.map((char, i) => (
        <span key={i} className={`flap ${amber ? "flap-amber" : ""}`} data-final={char}>
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}

/** The weekly lineup as a split-flap departures board. */
export function DepartureBoard() {
  return (
    <div className="rounded-xl bg-board p-3 text-cream shadow-[0_1.5rem_3rem_-1.5rem_rgb(0_0_0/0.8)] ring-4 ring-ink sm:p-5">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2 border-b border-cream/15 pb-3">
        <p className="font-display text-3xl font-extrabold tracking-[0.12em] text-brass-light uppercase sm:text-4xl">
          Departures
        </p>
        <p className="font-mono text-sm tracking-wider text-cream-soft uppercase">
          Track 40 · Canton <LocalClock className="text-cream" />
        </p>
      </div>

      <div
        aria-hidden
        className="mb-1 hidden grid-cols-[auto_auto_1fr_auto] gap-x-6 font-mono text-xs tracking-[0.2em] text-cream-soft uppercase lg:grid"
      >
        <span className="w-[calc(3*2.15rem+4px)]">Day</span>
        <span className="w-[calc(5*2.15rem+8px)]">Departs</span>
        <span>Event</span>
        <span>Track</span>
      </div>

      <SplitFlapMotion>
        <ol className="divide-y divide-cream/10">
          {weeklyLineup.map((event) => (
            <li key={event.day} className="py-2.5 lg:py-3">
              <span className="sr-only">
                {event.day}, {formatTime(event.starts)}: {event.name}.
              </span>
              <div
                data-row
                aria-hidden
                className="grid gap-y-1.5 lg:grid-cols-[auto_auto_1fr_auto] lg:items-center lg:gap-x-6"
              >
                <div className="flex items-center justify-between lg:contents">
                  <Flaps text={event.short} width={3} amber />
                  <Flaps text={formatTime(event.starts)} width={5} alignRight />
                </div>
                <Flaps text={event.board} width={14} />
                <span className="hidden lg:block">
                  <Flaps text="40" width={2} amber />
                </span>
              </div>
            </li>
          ))}
        </ol>
      </SplitFlapMotion>
    </div>
  );
}

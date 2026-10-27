import type { Metadata } from "next";
import Link from "next/link";
import { DepotScene } from "@/components/DepotScene";

export const metadata: Metadata = {
  title: "You missed the train",
  robots: { index: false },
};

const board = ["DEPARTED", "TRACK 404"];

export default function NotFound() {
  return (
    <section aria-labelledby="missed-title" className="relative overflow-hidden bg-depot text-cream">
      <div aria-hidden className="lamp-glow absolute inset-0" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 pt-16 pb-6 text-center sm:px-6 sm:pt-24">
        <div
          aria-hidden
          className="flex flex-col items-center gap-1.5 rounded-xl bg-board p-4 ring-4 ring-ink"
        >
          {board.map((line) => (
            <span key={line} className="flex gap-[2px]">
              {line.split("").map((char, i) => (
                <span key={i} className="flap flap-amber">
                  {char === " " ? "\u00a0" : char}
                </span>
              ))}
            </span>
          ))}
        </div>
        <h1 id="missed-title" className="mt-10 text-6xl sm:text-8xl">
          You missed the train.
        </h1>
        <p className="mt-5 max-w-md text-lg text-cream-soft">
          This page has already left the station, or it never ran on this line. Scary, isn&apos;t it?
        </p>
        <Link
          href="/"
          className="font-display mt-8 rounded bg-brass px-6 py-3 text-xl font-bold tracking-[0.1em] text-ink uppercase shadow-[0_0.25rem_0_var(--color-brass-deep)]"
        >
          Back to the depot
        </Link>
      </div>
      <DepotScene className="relative block h-40 w-full sm:h-56" />
    </section>
  );
}

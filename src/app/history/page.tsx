import type { Metadata } from "next";
import Link from "next/link";
import { StationSign, TrackDivider } from "@/components/Decor";
import { Reveal } from "@/components/motion/Reveal";
import { Tribute } from "@/components/Tribute";
import { timeline } from "@/content/history";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "History: The Line Since 1970",
  description:
    "From New York Central Railroad depot to Canton's college bar: the Hoot Owl opened March 10, 1970, founded by Danny Fay and Bill Helmer, and is still run by the Fay family.",
  alternates: { canonical: "/history" },
  openGraph: { url: "/history" },
};

export default function HistoryPage() {
  return (
    <>
      <section aria-labelledby="history-title" className="relative overflow-hidden bg-depot text-cream">
        <div aria-hidden className="lamp-glow absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
          <StationSign
            as="h1"
            id="history-title"
            kicker={`Canton depot · Since ${site.foundedDisplay}`}
            tone="cream"
          >
            The Line Since 1970
          </StationSign>
          <p className="mt-6 max-w-2xl text-lg text-cream-soft">
            One building, one family, and more than half a century of St. Lawrence nights. Here are the stops
            along the way.
          </p>
        </div>
        <TrackDivider tone="dark" />
      </section>

      <section aria-label="Timeline" className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="relative">
            <div
              aria-hidden
              className="track track-vertical absolute top-2 bottom-2 left-[0.6875rem] -translate-x-1/2"
            />
            <ol>
              {timeline.map((stop, i) => (
                <li key={stop.era} className="relative pb-14 pl-14 last:pb-0 sm:pl-20">
                  <span
                    aria-hidden
                    className="absolute top-1 left-0 grid h-[1.375rem] w-[1.375rem] place-items-center rounded-full border-4 border-depot bg-brass ring-4 ring-cream"
                  />
                  <Reveal>
                    <p className="font-mono text-xs tracking-[0.25em] text-ink-soft uppercase">
                      Stop {String(i + 1).padStart(2, "0")}
                    </p>
                    <p
                      className={`enamel ${i % 2 ? "enamel-scarlet" : ""} font-display mt-2 inline-block px-5 pt-2.5 pb-2 text-2xl font-extrabold tracking-[0.06em] uppercase sm:text-3xl`}
                    >
                      {stop.era}
                    </p>
                    <h2 className="mt-5 text-4xl text-depot sm:text-5xl">{stop.title}</h2>
                    <p className="mt-3 max-w-prose text-lg">{stop.body}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Tribute />

      <section className="bg-paper py-14 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="font-serif-italic text-2xl italic">The next stop is yours.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/#departures"
              className="font-display rounded bg-depot px-5 py-3 text-xl font-bold tracking-[0.1em] text-cream uppercase"
            >
              This week&apos;s lineup
            </Link>
            <Link
              href="/gallery"
              className="font-display rounded border-2 border-depot px-5 py-3 text-xl font-bold tracking-[0.1em] text-depot uppercase"
            >
              See the gallery
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

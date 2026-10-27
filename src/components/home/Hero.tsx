import { site } from "@/content/site";
import { AnchorLink } from "../AnchorLink";
import { CashStamp } from "../Decor";
import { DepotScene } from "../DepotScene";
import { OpenStatus } from "../OpenStatus";
import { OwlMark } from "../OwlMark";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-depot text-cream">
      <div aria-hidden className="lamp-glow absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 pt-8 pb-4 sm:px-6 sm:pt-14 lg:pt-20">
        <p className="font-mono text-xs tracking-[0.14em] text-cream-soft uppercase xs:text-sm sm:tracking-[0.2em]">
          Canton, N.Y. · Est. {site.foundedDisplay}
        </p>

        <div className="mt-4 flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h1
            id="hero-title"
            className="enamel enamel-cream flex items-center gap-5 px-6 pt-4 pb-3 sm:px-9 sm:pt-6 sm:pb-5"
          >
            <OwlMark tone="light" className="hidden h-28 w-28 shrink-0 sm:block lg:h-36 lg:w-36" />
            <span className="flex flex-col">
              <span className="text-[clamp(1.5rem,6vw,2.75rem)] tracking-[0.3em]">The</span>
              <span className="text-[clamp(3.6rem,18vw,9.5rem)] leading-[0.85] tracking-[0.02em]">
                Hoot Owl
              </span>
            </span>
          </h1>

          <CashStamp size="lg" className="self-end sm:self-auto lg:mb-4" />
        </div>

        <p className="mt-6 font-serif-italic text-2xl text-brass-light italic sm:text-3xl">{site.tagline}</p>
        <p className="mt-2 max-w-xl text-lg text-cream-soft">
          The old New York Central depot on Park Street. Cheap beer, the Lime Rickey, darts, pool and free
          popcorn since 1970.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <OpenStatus />
          <p className="font-mono text-sm text-cream-soft">{site.ageNotice}</p>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <AnchorLink
            to="departures"
            className="font-display rounded bg-brass px-5 py-3 text-xl font-bold tracking-[0.1em] text-ink uppercase shadow-[0_0.25rem_0_var(--color-brass-deep)] transition-transform hover:-translate-y-0.5"
          >
            This week&apos;s lineup
          </AnchorLink>
          <AnchorLink
            to="visit"
            className="font-display rounded border-2 border-cream/70 px-5 py-3 text-xl font-bold tracking-[0.1em] uppercase transition-colors hover:bg-cream hover:text-depot"
          >
            Plan your visit
          </AnchorLink>
        </div>
      </div>

      <DepotScene className="relative block h-40 w-full sm:h-56 lg:h-72" />
    </section>
  );
}

import Link from "next/link";
import { lineupFootnote } from "@/content/events";
import { derby, games } from "@/content/games";
import { beerPreview, featuredDrink, formatPrice, menu, pricesNote } from "@/content/menu";
import { fullAddress, site } from "@/content/site";
import { CashStamp, StationSign } from "../Decor";
import { DepartureBoard } from "../DepartureBoard";
import { GameIcon } from "../GameIcon";
import { HoursTable } from "../HoursTable";
import { Reveal } from "../motion/Reveal";
import { OwlMark } from "../OwlMark";

const container = "mx-auto max-w-6xl px-4 sm:px-6";

export function Departures() {
  return (
    <section
      id="departures"
      tabIndex={-1}
      aria-labelledby="departures-title"
      className="bg-depot-deep py-16 text-cream sm:py-24"
    >
      <div className={container}>
        <StationSign id="departures-title" kicker="The weekly lineup" tone="cream">
          Track 40
        </StationSign>
        <p className="mt-5 max-w-2xl text-lg text-cream-soft">
          Five nights, five names, and Saturday&apos;s open too. What happens after that? You never know.
        </p>
        <div className="mt-10">
          <DepartureBoard />
        </div>
        <p className="mt-5 font-mono text-sm text-cream-soft">{lineupFootnote}</p>
      </div>
    </section>
  );
}

export function Station() {
  return (
    <section id="station" tabIndex={-1} aria-labelledby="station-title" className="py-16 sm:py-24">
      <div className={`${container} grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16`}>
        <div>
          <StationSign id="station-title" kicker="Platform 1 · Our story">
            The Station
          </StationSign>
          <div className="mt-8 max-w-prose space-y-5 text-lg">
            <p>
              The Hoot Owl lives in Canton&apos;s old <strong>New York Central Railroad station</strong>,
              right beside the tracks off Park Street. Danny Fay and Bill Helmer converted the depot
              themselves and opened the doors on <strong>{site.foundedDisplay}</strong>. It has been pouring
              ever since.
            </p>
            <p>
              It&apos;s St. Lawrence&apos;s bar first and everybody else&apos;s too: SUNY Canton, locals,
              alumni, and the parents who come up for hockey weekends and graduation. For SLU families,
              it&apos;s a must-go.
            </p>
            <p>
              About four rooms, walls covered in signed jerseys and photos of local athletes who went pro and
              Olympic, free popcorn, and a crowd that likes it the way it is. It hasn&apos;t really changed.{" "}
              <em>Scary, isn&apos;t it?</em>
            </p>
          </div>
          <Link
            href="/history"
            className="font-display mt-8 inline-flex items-center gap-2 text-xl font-bold tracking-[0.1em] text-depot uppercase underline decoration-brass decoration-[3px] underline-offset-8 hover:text-scarlet"
          >
            Ride the line since 1970 <span aria-hidden>→</span>
          </Link>
        </div>

        <Reveal className="ticket-shadow flex flex-col gap-8">
          <figure className="relative rounded-lg bg-depot p-8 text-cream sm:p-10">
            <span
              aria-hidden
              className="font-display absolute -top-6 left-6 text-8xl leading-none text-brass"
            >
              &ldquo;
            </span>
            <blockquote className="font-serif-italic text-2xl leading-snug italic sm:text-3xl">
              The guard house between the village and the student side of town.
            </blockquote>
            <figcaption className="mt-5 font-mono text-sm tracking-wider text-cream-soft uppercase">
              A local photographer, on the Hoot
            </figcaption>
          </figure>

          <dl className="ticket ticket-cream grid grid-cols-2 gap-x-6 gap-y-5 px-7 pt-5 pb-7 [--tear:4.5rem]">
            <div className="col-span-2 flex h-10 items-center justify-between">
              <dt className="font-mono text-xs tracking-[0.2em] uppercase">Station record</dt>
              <dd>
                <OwlMark className="h-9 w-9" />
              </dd>
            </div>
            {[
              ["Opened", site.foundedDisplay],
              ["Founded by", "Danny Fay & Bill Helmer"],
              ["Building", "New York Central depot"],
              ["Rooms", "About four"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-xs tracking-[0.2em] text-ink-soft uppercase">{label}</dt>
                <dd className="font-display mt-1 text-2xl leading-tight font-bold uppercase">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

export function TicketCounter() {
  const beers = menu
    .flatMap((section) => section.items)
    .filter((item) => (beerPreview as readonly string[]).includes(item.name));

  return (
    <section
      id="ticket-counter"
      tabIndex={-1}
      aria-labelledby="counter-title"
      className="bg-paper py-16 sm:py-24"
    >
      <div className={container}>
        <StationSign id="counter-title" kicker="Fares · Cash only" tone="scarlet">
          Ticket Counter
        </StationSign>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal className="ticket-shadow">
            <article className="ticket ticket-cream flex h-full flex-col px-7 pt-5 pb-8 sm:px-10 [--tear:4.75rem]">
              <div className="flex h-12 items-center justify-between font-mono text-xs tracking-[0.25em] uppercase">
                <span>Admit one</span>
                <span>House drink · No. 1</span>
              </div>
              <div className="mt-8 flex flex-1 flex-col justify-between gap-8 sm:flex-row sm:items-end">
                <div>
                  <h3 className="text-6xl text-depot sm:text-7xl">{featuredDrink.name}</h3>
                  <p className="mt-3 text-lg">{featuredDrink.blurb}</p>
                </div>
                <p className="shrink-0 text-right font-mono">
                  <span className="font-display block text-6xl font-extrabold text-scarlet">
                    {formatPrice(featuredDrink.price)}
                  </span>
                  <span className="text-sm tracking-wider uppercase">
                    Double {formatPrice(featuredDrink.double)}
                  </span>
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1} className="ticket-shadow">
            <div className="ticket flex h-full flex-col bg-cream px-7 pt-5 pb-8 [--tear:4.25rem]">
              <h3 className="flex h-11 items-center text-3xl">A few bottles</h3>
              <ul className="mt-6 space-y-3 font-mono text-lg">
                {beers.map((beer) => (
                  <li key={beer.name} className="flex items-baseline">
                    <span>{beer.name}</span>
                    <span aria-hidden className="leader" />
                    <span className="font-bold">{beer.price ? formatPrice(beer.price) : ""}</span>
                  </li>
                ))}
                <li className="flex items-baseline">
                  <span>Popcorn</span>
                  <span aria-hidden className="leader" />
                  <span className="font-bold text-scarlet">Free</span>
                </li>
              </ul>
              <p className="mt-auto pt-6 font-mono text-xs text-ink-soft">{pricesNote}</p>
            </div>
          </Reveal>
        </div>

        <Link
          href="/menu"
          className="font-display mt-10 inline-flex items-center gap-2 rounded bg-depot px-6 py-3 text-xl font-bold tracking-[0.1em] text-cream uppercase shadow-[0_0.25rem_0_var(--color-ink)] transition-transform hover:-translate-y-0.5"
        >
          See the full fare table <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}

export function GamesRoom() {
  return (
    <section
      id="games"
      tabIndex={-1}
      aria-labelledby="games-title"
      className="bg-depot py-16 text-cream sm:py-24"
    >
      <div className={container}>
        <StationSign id="games-title" kicker="The waiting room" tone="cream">
          Games Room
        </StationSign>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game, i) => (
            <li key={game.name}>
              <Reveal delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col gap-4 rounded-lg border-2 border-cream/20 bg-depot-deep p-6">
                  <GameIcon name={game.icon} className="h-14 w-14 text-brass-light" />
                  <h3 className="text-3xl">{game.name}</h3>
                  <p className="text-cream-soft">{game.line}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-8">
          <div className="enamel enamel-scarlet flex flex-col gap-4 px-7 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] uppercase">Reserved · Ask at the bar</p>
              <h3 className="mt-2 text-4xl sm:text-5xl">{derby.name}</h3>
              <p className="mt-2 max-w-xl text-lg">{derby.teaser}</p>
            </div>
            <p className="font-display shrink-0 text-2xl font-extrabold tracking-[0.1em] uppercase">
              {derby.prompt}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Visit() {
  return (
    <section id="visit" tabIndex={-1} aria-labelledby="visit-title" className="py-16 sm:py-24">
      <div className={container}>
        <StationSign id="visit-title" kicker="Plan your trip · 40 Park St">
          Visit
        </StationSign>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div className="ticket-shadow">
              <div className="ticket ticket-cream px-7 pt-5 pb-7 [--tear:4.25rem]">
                <h3 className="flex h-11 items-center text-3xl">Timetable</h3>
                <div className="mt-5">
                  <HoursTable />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-lg border-2 border-ink/15 p-6 sm:flex-row sm:items-center">
              <CashStamp />
              <div>
                <p className="font-display text-2xl font-extrabold uppercase">Bring cash</p>
                <p className="text-ink-soft">There&apos;s no ATM on site, so stop at the bank on the way.</p>
                <p className="font-display mt-3 text-2xl font-extrabold uppercase">21+ with valid ID</p>
                <p className="text-ink-soft">Bring a valid ID. Please drink responsibly.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-3xl">Getting here</h3>
              <address className="mt-3 font-mono text-lg not-italic">{fullAddress}</address>
              <p className="mt-3 text-lg">{site.directions}</p>
              <a
                href={site.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display mt-4 inline-flex items-center gap-2 text-xl font-bold tracking-[0.1em] text-depot uppercase underline decoration-brass decoration-[3px] underline-offset-8 hover:text-scarlet"
              >
                Open in Google Maps <span aria-hidden>↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
            <div className="overflow-hidden rounded-lg border-4 border-depot bg-depot">
              <iframe
                title={`Map showing ${site.name} at ${fullAddress}`}
                src={site.mapEmbedUrl}
                className="block aspect-[4/3] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

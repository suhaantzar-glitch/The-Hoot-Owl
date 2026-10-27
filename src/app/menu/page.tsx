import type { Metadata } from "next";
import Link from "next/link";
import { CashStamp, StationSign, TrackDivider } from "@/components/Decor";
import { Reveal } from "@/components/motion/Reveal";
import { featuredDrink, formatPrice, menu, pricesNote, type MenuItem } from "@/content/menu";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Menu & Prices",
  description:
    "The Hoot Owl's fare table: $2.75 PBR, the $3.50 Lime Rickey, bottled beer, seltzers, mixed drinks and top-shelf liquor. Free popcorn, always. Cash only.",
  alternates: { canonical: "/menu" },
  openGraph: { url: "/menu" },
};

function Price({ item }: { item: MenuItem }) {
  if (item.priceText) {
    return <span className="text-right font-bold text-scarlet">{item.priceText}</span>;
  }
  if (item.price === undefined) return null;
  if (item.double === undefined) {
    return <span className="font-bold">{formatPrice(item.price)}</span>;
  }
  return (
    <span className="font-bold whitespace-nowrap">
      <span className="sr-only">Single </span>
      {formatPrice(item.price)}
      <span aria-hidden className="mx-1 font-normal text-ink-soft">
        /
      </span>
      <span className="sr-only">, double </span>
      {formatPrice(item.double)}
    </span>
  );
}

export default function MenuPage() {
  return (
    <>
      <section aria-labelledby="menu-title" className="relative overflow-hidden bg-depot text-cream">
        <div aria-hidden className="lamp-glow absolute inset-0" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-20 md:flex-row md:items-end md:justify-between">
          <div>
            <StationSign as="h1" id="menu-title" kicker="Ticket prices · Track 40" tone="cream">
              Fare Table
            </StationSign>
            <p className="mt-6 max-w-xl text-lg text-cream-soft">
              Cheap beer, the house Lime Rickey and a bowl of free popcorn. Pay at the bar, in cash.
            </p>
            <p className="mt-3 font-mono text-sm text-brass-light">{pricesNote}</p>
          </div>
          <CashStamp size="lg" className="self-start md:self-end" />
        </div>
        <TrackDivider tone="dark" />
      </section>

      <div className="bg-paper py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="ticket-shadow">
            <article
              aria-labelledby="featured-title"
              className="ticket ticket-cream flex flex-col gap-6 px-7 pt-5 pb-8 sm:px-10 [--tear:4.25rem] md:flex-row md:items-end md:justify-between"
            >
              <div>
                <p className="flex h-11 items-center font-mono text-xs tracking-[0.25em] uppercase">
                  Featured · The house drink
                </p>
                <h2 id="featured-title" className="mt-8 text-6xl text-depot sm:text-8xl">
                  {featuredDrink.name}
                </h2>
                <p className="mt-3 max-w-md text-lg">{featuredDrink.blurb}</p>
              </div>
              <p className="font-mono md:text-right">
                <span className="font-display block text-7xl font-extrabold text-scarlet">
                  {formatPrice(featuredDrink.price)}
                </span>
                <span className="text-base tracking-wider uppercase">
                  Double {formatPrice(featuredDrink.double)}
                </span>
              </p>
            </article>
          </div>

          <div className="mt-12 columns-1 gap-8 md:columns-2">
            {menu.map((section, i) => (
              <Reveal key={section.id} className="ticket-shadow mb-8 break-inside-avoid">
                <section
                  aria-labelledby={`${section.id}-title`}
                  className="overflow-hidden rounded-md bg-cream"
                >
                  <div className="flex items-center justify-between gap-4 bg-depot px-6 py-3 text-cream">
                    <h2 id={`${section.id}-title`} className="text-3xl tracking-[0.06em]">
                      {section.title}
                    </h2>
                    <span aria-hidden className="font-mono text-xs tracking-[0.2em] text-brass-light">
                      No. {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {section.note ? (
                    <p className="border-b border-dashed border-ink/25 px-6 py-2 text-right font-mono text-xs tracking-[0.15em] text-ink-soft uppercase">
                      {section.note}
                    </p>
                  ) : null}
                  <ul className="space-y-2.5 px-6 py-5 font-mono text-base sm:text-lg">
                    {section.items.map((item) => (
                      <li key={item.name} className="flex items-baseline">
                        <span>
                          {item.name}
                          {item.note ? (
                            <span className="block font-serif-italic text-sm text-ink-soft italic">
                              {item.note}
                            </span>
                          ) : null}
                        </span>
                        {item.price !== undefined || item.priceText ? (
                          <>
                            <span aria-hidden className="leader" />
                            <Price item={item} />
                          </>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-6 rounded-lg border-2 border-ink/15 bg-cream p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-2xl font-extrabold uppercase">Cash only. No ATM on site.</p>
              <p className="text-ink-soft">{site.ageNotice}. Please drink responsibly.</p>
            </div>
            <Link
              href="/#visit"
              className="font-display shrink-0 rounded bg-depot px-5 py-3 text-xl font-bold tracking-[0.1em] text-cream uppercase"
            >
              Hours & directions
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

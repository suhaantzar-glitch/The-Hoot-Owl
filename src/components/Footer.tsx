import Link from "next/link";
import { hours } from "@/content/hours";
import { fullAddress, isPlaceholder, navLinks, site } from "@/content/site";
import { formatHoursRange } from "@/lib/hours";
import { CashStamp, TrackDivider } from "./Decor";
import { OwlMark } from "./OwlMark";

// Monday first, the way the week reads on a timetable.
const week = [...hours.slice(1), hours[0]];

export function Footer() {
  const socials = [
    { label: "Facebook", href: site.social.facebook },
    { label: "Instagram", href: site.social.instagram },
  ].filter((s) => !isPlaceholder(s.href));
  const phone = isPlaceholder(site.phone) ? null : site.phone;
  const email = isPlaceholder(site.email) ? null : site.email;

  return (
    <footer className="bg-depot-deep text-cream">
      <TrackDivider tone="dark" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3">
            <OwlMark tone="dark" className="h-14 w-14" />
            <span className="font-display text-3xl leading-none font-extrabold uppercase">
              The Hoot
              <br />
              Owl
            </span>
          </Link>
          <p className="font-serif-italic text-cream-soft italic">{site.tagline}</p>
          <p className="font-mono text-sm text-cream-soft">Est. {site.foundedDisplay}</p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl text-brass-light">Find the depot</h2>
          <address className="font-mono text-sm leading-relaxed not-italic">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postalCode}
            {phone ? (
              <>
                <br />
                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="underline underline-offset-4">
                  {phone}
                </a>
              </>
            ) : null}
            {email ? (
              <>
                <br />
                <a href={`mailto:${email}`} className="underline underline-offset-4">
                  {email}
                </a>
              </>
            ) : null}
          </address>
          <a
            href={site.mapLinkUrl}
            className="mt-3 inline-block font-mono text-sm text-brass-light underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get directions <span aria-hidden>↗</span>
            <span className="sr-only"> to {fullAddress} (opens in a new tab)</span>
          </a>
        </div>

        <div>
          <h2 className="mb-3 text-2xl text-brass-light">Hours</h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-sm">
            {week.map((d) => (
              <div key={d.day} className="contents">
                <dt>{d.short}</dt>
                <dd className={d.open ? "" : "text-cream-soft"}>{formatHoursRange(d)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col items-start gap-5">
          <CashStamp size="sm" />
          <p className="font-display text-xl font-bold tracking-wide uppercase">
            21+ with valid ID
            <span className="block font-serif text-base font-normal tracking-normal normal-case text-cream-soft">
              Please drink responsibly.
            </span>
          </p>
          {socials.length > 0 ? (
            <ul className="flex gap-4 font-mono text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="underline underline-offset-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 font-mono text-xs text-cream-soft sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {site.name}, Canton, N.Y. · 21+ · Please drink responsibly.</p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-cream hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

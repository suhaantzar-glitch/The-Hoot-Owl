import { tribute } from "@/content/history";
import { site } from "@/content/site";
import { OwlMark } from "./OwlMark";

/** "In Memory of Danny 'Danno' Fay". Turn off with `showTribute` in site config. */
export function Tribute() {
  if (!site.showTribute) return null;

  return (
    <section aria-labelledby="tribute-title" className="bg-depot-deep py-16 text-cream sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-lg border border-cream/30 p-2">
          <div className="rounded-md border-2 border-brass/70 px-6 py-10 text-center sm:px-12 sm:py-14">
            <OwlMark tone="dark" className="mx-auto h-16 w-16 opacity-90" />
            <p className="mt-6 font-mono text-xs tracking-[0.3em] text-brass-light uppercase">
              {tribute.years}
            </p>
            <h2 id="tribute-title" className="mt-3 text-4xl leading-tight sm:text-5xl">
              {tribute.heading}
            </h2>
            <p className="mt-3 font-serif-italic text-cream-soft italic">{tribute.dates}</p>
            <div className="mx-auto mt-8 max-w-prose space-y-4 text-left text-lg text-cream sm:text-center">
              {tribute.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

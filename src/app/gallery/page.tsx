import type { Metadata } from "next";
import { StationSign, TrackDivider } from "@/components/Decor";
import { Gallery } from "@/components/Gallery";
import { gallery } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Inside the Hoot Owl: the front bar, the wall of signed jerseys, the pool room and the old depot by the tracks in Canton, N.Y.",
  alternates: { canonical: "/gallery" },
  openGraph: { url: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <section aria-labelledby="gallery-title" className="relative overflow-hidden bg-depot text-cream">
        <div aria-hidden className="lamp-glow absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
          <StationSign as="h1" id="gallery-title" kicker="Postcards from the depot" tone="cream">
            Gallery
          </StationSign>
          <p className="mt-6 max-w-2xl text-lg text-cream-soft">
            The front bar, the jerseys on the wall, the pool room and the old station by the tracks. Tap any
            photo for a closer look.
          </p>
        </div>
        <TrackDivider tone="dark" />
      </section>

      <section aria-label="Photos" className="bg-paper py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Gallery items={gallery} />
        </div>
      </section>
    </>
  );
}

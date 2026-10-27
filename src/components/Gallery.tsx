"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import type { GalleryItem } from "@/content/gallery";
import { OwlMark } from "./OwlMark";
import { pauseScrolling } from "./motion/SmoothScroll";

function Photo({ item, sizes, large = false }: { item: GalleryItem; sizes: string; large?: boolean }) {
  if (item.src) {
    return (
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes={sizes}
        className={large ? "mx-auto h-auto max-h-[75vh] w-auto max-w-full" : "h-auto w-full"}
      />
    );
  }

  // Placeholder until a real photo is added in src/content/gallery.ts.
  return (
    <div
      role="img"
      aria-label={`${item.alt} (photo coming soon)`}
      className={`placeholder-photo flex flex-col items-center justify-center gap-3 text-cream ${
        large ? "mx-auto max-h-[75vh] w-full" : "w-full"
      }`}
      style={{ aspectRatio: `${item.width} / ${item.height}` }}
    >
      <OwlMark tone="dark" className={large ? "h-24 w-24 opacity-70" : "h-14 w-14 opacity-60"} />
      <span className="font-mono text-xs tracking-[0.25em] text-cream-soft uppercase">Photo coming soon</span>
    </div>
  );
}

export function Gallery({ items }: { items: readonly GalleryItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const item = items[current];

  const open = (index: number) => {
    setCurrent(index);
    pauseScrolling(true);
    dialogRef.current?.showModal();
  };

  const step = (delta: number) => setCurrent((i) => (i + delta + items.length) % items.length);

  const onClose = () => {
    pauseScrolling(false);
    triggers.current[current]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  };

  return (
    <>
      <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {items.map((photo, i) => (
          <li key={photo.id} className="mb-5 break-inside-avoid">
            <figure className="overflow-hidden rounded-md bg-cream shadow-[0_0.6rem_1rem_-0.6rem_rgb(0_0_0/0.35)]">
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                onClick={() => open(i)}
                className="group relative block w-full cursor-zoom-in overflow-hidden"
                aria-label={`Open “${photo.caption}” in the photo viewer`}
                aria-haspopup="dialog"
              >
                <span className="block transition-transform duration-500 group-hover:scale-[1.03]">
                  <Photo item={photo} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                </span>
              </button>
              <figcaption className="flex items-baseline justify-between gap-3 border-t-2 border-dashed border-ink/20 px-4 py-3">
                <span className="font-display text-xl font-bold tracking-wide uppercase">
                  {photo.caption}
                </span>
                <span className="font-mono text-xs text-ink-soft">No. {String(i + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby="lightbox-caption"
        onClose={onClose}
        onKeyDown={onKeyDown}
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        data-lenis-prevent
        className="m-auto w-[calc(100%-2rem)] max-w-5xl bg-transparent p-0 text-cream backdrop:bg-ink/90"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-sm text-cream-soft" aria-live="polite">
              {current + 1} / {items.length}
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="font-display rounded border-2 border-cream/50 px-3 py-1 text-lg font-bold tracking-[0.12em] uppercase hover:bg-cream hover:text-ink"
            >
              Close <span aria-hidden>✕</span>
            </button>
          </div>

          <figure>
            <div className="overflow-hidden rounded-md">
              <Photo key={item.id} item={item} sizes="(min-width: 1024px) 64rem, 100vw" large />
            </div>
            <figcaption
              id="lightbox-caption"
              className="font-display mt-4 text-center text-3xl font-bold tracking-wide uppercase"
            >
              {item.caption}
            </figcaption>
          </figure>

          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={() => step(-1)}
              className="font-display rounded bg-cream px-4 py-2 text-lg font-bold tracking-[0.1em] text-ink uppercase hover:bg-brass"
            >
              <span aria-hidden>←</span> Previous<span className="sr-only"> photo</span>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="font-display rounded bg-cream px-4 py-2 text-lg font-bold tracking-[0.1em] text-ink uppercase hover:bg-brass"
            >
              Next<span className="sr-only"> photo</span> <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

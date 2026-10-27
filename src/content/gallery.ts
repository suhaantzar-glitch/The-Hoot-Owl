/**
 * Gallery photos.
 *
 * To add a real photo: drop the file in /public/photos/, then set `src`
 * (e.g. "/photos/front-bar.jpg") plus its pixel `width` and `height`.
 * Items without a `src` render as a styled placeholder card.
 *
 * TODO_PHOTOS: use your own photos only, never images copied from other
 * sites or Facebook.
 */

export type GalleryItem = {
  id: string;
  caption: string;
  alt: string;
  src?: string;
  width: number;
  height: number;
};

export const gallery: readonly GalleryItem[] = [
  {
    id: "front-bar",
    caption: "The front bar",
    alt: "The front bar at the Hoot Owl",
    width: 1200,
    height: 900,
  },
  {
    id: "jerseys",
    caption: "Signed jerseys wall",
    alt: "Signed jerseys and banners on the wall",
    width: 900,
    height: 1200,
  },
  { id: "pool-room", caption: "Pool room", alt: "The pool table in the back room", width: 1200, height: 800 },
  {
    id: "exterior-dusk",
    caption: "Depot exterior at dusk",
    alt: "The old railroad depot building at dusk",
    width: 1200,
    height: 750,
  },
  {
    id: "lime-rickey",
    caption: "Lime Rickeys on the bar",
    alt: "Lime Rickeys lined up on the bar",
    width: 900,
    height: 1100,
  },
  {
    id: "tracks",
    caption: "The tracks out back",
    alt: "The railroad tracks beside the Hoot Owl",
    width: 1200,
    height: 800,
  },
  { id: "dartboard", caption: "Darts, mid-game", alt: "The dartboard mid-game", width: 900, height: 1200 },
  {
    id: "popcorn",
    caption: "Free popcorn, always",
    alt: "A basket of free popcorn",
    width: 1000,
    height: 1000,
  },
  {
    id: "hockey-weekend",
    caption: "Hockey weekend crowd",
    alt: "A full house on a hockey weekend",
    width: 1200,
    height: 800,
  },
];

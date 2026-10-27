# The Hoot Owl, Canton N.Y.

Marketing site for **The Hoot Owl**, Canton's college bar in the old New York Central depot at 40 Park Street, pouring since March 10, 1970.

Built with Next.js (App Router, TypeScript), Tailwind CSS, GSAP + ScrollTrigger and Lenis. There is no CMS, database or backend: every page is prerendered as static HTML, and all the words live in small data files you can edit.

## Run it locally

You need Node.js 20.9 or newer.

```bash
npm install
npm run dev      # http://localhost:3000, reloads as you edit
npm run build    # production build (also type-checks)
npm run start    # serve the production build
npm run lint
npm test         # open/closed logic tests
```

## Editing the site

Everything you'd normally change is in `src/content/`. Edit a file, save, and the dev server updates. You never need to touch the components.

| What                                   | File                     |
| -------------------------------------- | ------------------------ |
| Phone, email, socials, address, map    | `src/content/site.ts`    |
| Opening hours                          | `src/content/hours.ts`   |
| Weekly lineup (the departures board)   | `src/content/events.ts`  |
| Menu and prices                        | `src/content/menu.ts`    |
| History timeline and the tribute       | `src/content/history.ts` |
| Games Room cards and the Derby teaser  | `src/content/games.ts`   |
| Gallery photos and captions            | `src/content/gallery.ts` |

### Contact details and socials

In `src/content/site.ts`, replace the `TODO_` values (`TODO_PHONE`, `TODO_EMAIL`, `TODO_FACEBOOK_URL`, `TODO_INSTAGRAM_URL`) with the real ones. Anything still set to a `TODO_` value is **hidden on the site** and left out of the search-engine data, so nothing half-finished ever shows. Once you fill one in, it appears in the footer (and the phone number becomes tap-to-call).

### Hours

`src/content/hours.ts` lists each day with 24-hour `open` and `close` times in Canton time. A closing time earlier than the opening time means the shift runs past midnight, so `{ open: "20:00", close: "01:30" }` on Friday is Friday 8 PM to 1:30 AM Saturday. Use `open: null` for a closed day.

The "Open now / Closed / Opens at 8 PM" lamp, the highlighted row in the hours table and the opening hours Google sees are all generated from this one file. The lamp always judges by the bar's clock (America/New_York), whatever time zone the visitor is in, and treats 12:45 AM Saturday as part of Friday night.

### Weekly lineup

`src/content/events.ts`. Each entry has a display `name` and a `board` version that the split-flap board spells out. Keep `board` to 14 characters or fewer so it fits on a phone.

### Menu and prices

`src/content/menu.ts`. Prices are plain numbers in dollars (`3.75`). Add `double` for a double, or `priceText` for things like "Ask the bartender". Update `pricesAsOf` whenever you confirm prices; it feeds the "Prices as of …, subject to change" line on the site.

The current prices came from the bar's old website (March 2025) and are marked `// VERIFY PRICES` until someone checks them.

### History and the tribute

`src/content/history.ts` holds the timeline stops and the "In Memory of Danny 'Danno' Fay" text. To hide the tribute, set `showTribute: false` in `src/content/site.ts`.

### Photos

1. Put the image in `public/photos/` (e.g. `public/photos/front-bar.jpg`). JPG or WebP around 2000px on the long side is plenty; Next.js resizes it for each screen.
2. In `src/content/gallery.ts`, add `src: "/photos/front-bar.jpg"` to the matching item and set its real pixel `width` and `height`.
3. Write a short, plain `alt` description of what's in the photo.

Items without a `src` show a styled "Photo coming soon" card. Only use photos you own or have permission to use.

## Deploying (Vercel)

**First time, from your computer:**

```bash
npm i -g vercel
vercel login                         # opens a browser to sign in
vercel link --project hoot-owl-canton
vercel                               # preview deployment, prints a *.vercel.app URL
vercel --prod                        # when you're happy with the preview
```

**Or connect the GitHub repo** in the Vercel dashboard (Add New → Project → import this repository). After that, every push to the main branch deploys to production and every other branch gets a preview URL. No build settings need changing.

**Site address.** Canonical links, the sitemap and social share cards use `NEXT_PUBLIC_SITE_URL` if it's set (e.g. `https://thehootowl.com`), and otherwise fall back to the project's `*.vercel.app` production address automatically. When the custom domain is live, add `NEXT_PUBLIC_SITE_URL` under Project → Settings → Environment Variables and redeploy.

**Custom domain.** Add it under Project → Settings → Domains, then point DNS where Vercel tells you.

## How it's put together

- `src/app/` holds the pages (`/`, `/menu`, `/history`, `/gallery`, plus the "You missed the train" 404), per-page social share images (`opengraph-image.tsx`), `sitemap.ts`, `robots.ts` and the icons.
- `src/components/` holds the station signs, ticket stubs, CASH ONLY stamp, track dividers, the split-flap board, the gallery lightbox and the header and footer.
- `src/lib/hours.ts` has the open/closed logic (tested in `tests/hours.test.ts`), and `src/lib/jsonld.ts` has the `BarOrPub` structured data.
- The colors are defined once as theme tokens at the top of `src/app/globals.css` (depot green, station cream, scarlet, brass, ink).

**Motion.** Smooth scrolling (Lenis), the departure-board flips and the scroll reveals load on the visitor's first scroll or tap, so they never slow down the first paint. With "reduce motion" turned on in the visitor's device settings, smooth scrolling and flips are off and everything shows in its final state.

**Fonts.** Big Shoulders (signage), Courier Prime (timetables) and Source Serif 4 (body), all under the SIL Open Font License. Big Shoulders' display cut is self-hosted from `src/assets/fonts/` with `next/font/local` (license files alongside it); the other two come from Google Fonts through `next/font/google`, which downloads them at build time and serves them from the site itself. The owl mark is original artwork drawn for this site.

## Still to do before launch

- [ ] Phone number (`TODO_PHONE` in `src/content/site.ts`)
- [ ] Email (`TODO_EMAIL`)
- [ ] Facebook page URL (`TODO_FACEBOOK_URL`)
- [ ] Instagram URL, if there is one (`TODO_INSTAGRAM_URL`)
- [ ] Exact map coordinates for 40 Park St (`geo` in `src/content/site.ts`, marked `VERIFY GEO`)
- [ ] Real photos for the gallery (`src/content/gallery.ts`)
- [ ] Confirm every price (`src/content/menu.ts`, marked `VERIFY PRICES`)
- [ ] Confirm the hours (`src/content/hours.ts`)
- [ ] Confirm with the Fay family that the tribute on the History page is welcome (`showTribute` in `src/content/site.ts`)
- [ ] Set `NEXT_PUBLIC_SITE_URL` once the custom domain is connected

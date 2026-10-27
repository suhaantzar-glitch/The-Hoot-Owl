/**
 * Site-wide settings. This is the one file for contact details and links.
 *
 * Anything still set to a `TODO_` value is treated as "not set yet": it is
 * hidden on the site and left out of search-engine data until you replace it
 * with the real thing. Search this repo for "TODO_" to find every placeholder.
 */

export const site = {
  name: "The Hoot Owl",
  nickname: "the Hoot",
  tagline: "Have a Hoot of a time.",
  description:
    "The Hoot Owl is Canton, New York's college bar, pouring since March 10, 1970 in the old New York Central Railroad depot at 40 Park Street. Cheap beer, the Lime Rickey, darts, pool and free popcorn. Cash only.",

  /** Production URL, used for canonical links, the sitemap and social cards. */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  foundingDate: "1970-03-10",
  foundedDisplay: "March 10, 1970",
  founders: ["Danny Fay", "Bill Helmer"],

  address: {
    street: "40 Park Street",
    city: "Canton",
    region: "NY",
    postalCode: "13617",
    country: "US",
  },

  // VERIFY GEO: approximate coordinates for the village of Canton. Replace
  // with the exact pin for 40 Park St (right-click the spot in Google Maps).
  geo: { latitude: 44.5953, longitude: -75.1666 },

  directions:
    "Off Park Street, right beside the railroad tracks. Heading south on Park, turn into the driveway that runs along the tracks. The old depot is at the end of it.",

  mapEmbedUrl: "https://www.google.com/maps?q=The+Hoot+Owl,+40+Park+St,+Canton,+NY+13617&output=embed",
  mapLinkUrl:
    "https://www.google.com/maps/search/?api=1&query=The+Hoot+Owl%2C+40+Park+St%2C+Canton%2C+NY+13617",

  phone: "TODO_PHONE",
  email: "TODO_EMAIL",
  social: {
    facebook: "TODO_FACEBOOK_URL",
    instagram: "TODO_INSTAGRAM_URL",
  },

  payment: "Cash only. No ATM on site.",
  ageNotice: "21+ with valid ID",

  /**
   * Shows the "In Memory of Danny 'Danno' Fay" block on the History page.
   * TODO_CONFIRM_TRIBUTE: confirm with the Fay family before launch.
   */
  showTribute: true,
} as const;

export const isPlaceholder = (value: string) => value.startsWith("TODO_");

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

export const navLinks = [
  { href: "/#departures", label: "Lineup" },
  { href: "/menu", label: "Menu" },
  { href: "/history", label: "History" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#visit", label: "Visit" },
] as const;

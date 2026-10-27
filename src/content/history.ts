/**
 * Stops on the History page's railroad-line timeline, top to bottom.
 * `era` is the short label on the station sign.
 */

export type TimelineStop = {
  era: string;
  title: string;
  body: string;
};

export const timeline: readonly TimelineStop[] = [
  {
    era: "The Depot Era",
    title: "A New York Central station",
    body: "Before it poured a single beer, the building was Canton's New York Central Railroad station, sitting right beside the tracks off Park Street.",
  },
  {
    era: "March 10, 1970",
    title: "The Hoot Owl opens",
    body: "Danny Fay and Bill Helmer converted the old depot themselves, with Danny's company, Hoot Owl Enterprises, doing the work. The Hoot opened its doors on March 10, 1970.",
  },
  {
    era: "The '70s to Now",
    title: "St. Lawrence's bar",
    body: "For decades it has been the place St. Lawrence students find first, along with SUNY Canton, locals, alumni and visiting parents. Hockey weekends and graduation pack the house.",
  },
  {
    era: "The Wall",
    title: "Signed jerseys, banners and photos",
    body: "The walls fill up with signed jerseys, banners and photos of local athletes who went on to pro and Olympic careers. Ask about any of them.",
  },
  {
    era: "Giving Back",
    title: "Charity nights and Thanksgiving",
    body: "The Hoot hosts charity nights like Golden Bears Night, and the Fay family has hosted Thanksgiving at the Hoot for people with nowhere else to go.",
  },
  {
    era: "Today",
    title: "Still the Hoot",
    body: "Still run by the Fay family, and it hasn't really changed: about four rooms, darts and pool, free popcorn, cash on the bar. Scary, isn't it?",
  },
];

export const tribute = {
  heading: "In Memory of Danny “Danno” Fay",
  dates: "August 3, 1944 – September 13, 2025",
  years: "1944–2025",
  paragraphs: [
    "Danny Fay opened the Hoot Owl with Bill Helmer on March 10, 1970, and ran it for more than fifty-five years.",
    "Away from the bar he taught accounting at SUNY Canton for five decades and served as a St. Lawrence County legislator. He was a standout in wrestling and lacrosse at Clarkson, and a member of the 1971 U.S. Bobsled team.",
    "Under his watch the walls filled with the jerseys and photos of local athletes, and the Fay family set a Thanksgiving table at the Hoot for anyone with nowhere else to go.",
    "The Fay family keeps the lights on today. Thank you, Danno.",
  ],
} as const;

/** Cards in the Games Room section. `icon` picks one of the drawings in GameIcon. */

export type Game = {
  name: string;
  icon: "darts" | "pool" | "foosball" | "cornhole";
  line: string;
};

export const games: readonly Game[] = [
  { name: "Darts", icon: "darts", line: "Throw a round. Somebody's keeping score." },
  { name: "Pool", icon: "pool", line: "Rack 'em up and call your shots." },
  { name: "Foosball", icon: "foosball", line: "No spinning. Everybody says it. Nobody listens." },
  { name: "Cornhole", icon: "cornhole", line: "Two boards, four bags, endless debates about the rules." },
];

export const derby = {
  name: "The Hoot Owl Derby",
  teaser: "A horse-race tradition run by the house. How it works? You'll have to ask.",
  prompt: "Ask the bartender.",
} as const;

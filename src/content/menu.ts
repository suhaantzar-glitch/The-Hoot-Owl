// VERIFY PRICES: copied from the bar's old website (last updated March 2025).
// Confirm every price with the bar before launch, then update `pricesAsOf`.

export const pricesAsOf = "March 2025";
export const pricesNote = `Prices as of ${pricesAsOf}, subject to change. Cash only.`;

export type MenuItem = {
  name: string;
  /** Price in dollars. Leave out when there is no listed price. */
  price?: number;
  /** Price of a double, for spirits and mixed drinks. */
  double?: number;
  /** Shown instead of a price, e.g. "Ask the bartender" or "Free". */
  priceText?: string;
  note?: string;
};

export type MenuSection = {
  id: string;
  title: string;
  board: string;
  note?: string;
  items: readonly MenuItem[];
};

export const featuredDrink = {
  name: "Lime Rickey",
  price: 3.5,
  double: 7,
  blurb: "The house drink. Ask anyone who's been.",
} as const;

export const menu: readonly MenuSection[] = [
  {
    id: "bottled-beer",
    title: "Bottled Beer",
    board: "BOTTLES",
    items: [
      { name: "PBR", price: 2.75 },
      { name: "Labatt Blue", price: 3.75 },
      { name: "Labatt Blue Light", price: 3.75 },
      { name: "Budweiser", price: 3.75 },
      { name: "Bud Light", price: 3.75 },
      { name: "Molson Canadian", price: 3.75 },
      { name: "Miller Lite", price: 3.75 },
      { name: "Coors Light", price: 3.75 },
      { name: "Michelob Ultra", price: 3.75 },
      { name: "Landshark", price: 4 },
      { name: "Heineken", price: 4 },
      { name: "Yuengling", price: 4 },
      { name: "Sam Adams", price: 4 },
      { name: "Goose Island IPA", price: 4.25 },
      { name: "Stella Artois", price: 4.25 },
      { name: "Blue Moon", price: 4.25 },
      { name: "Guinness", price: 4.25 },
      { name: "Modelo", price: 4.25 },
    ],
  },
  {
    id: "seltzers",
    title: "Seltzers & Cans",
    board: "CANS",
    items: [
      { name: "White Claw", price: 4 },
      { name: "High Noon", price: 4.5 },
      { name: "Jose Cuervo Margarita", price: 4.5, note: "Canned cocktail" },
    ],
  },
  {
    id: "mixed-drinks",
    title: "Mixed Drinks",
    board: "MIXED",
    note: "Single / double",
    items: [
      { name: "Lime Rickey", price: 3.5, double: 7, note: "The house drink" },
      { name: "Red Bull Vodka", price: 4, double: 8 },
      { name: "Mind Eraser", price: 4 },
      { name: "Long Island Iced Tea", price: 8 },
      { name: "Tahitian Sunset", price: 8 },
      { name: "Sex on the Beach", price: 8 },
      { name: "Brass Fiddle", price: 8 },
      { name: "6.0.2", price: 8 },
      { name: "L.S.", price: 8 },
    ],
  },
  {
    id: "liquor",
    title: "Liquor",
    board: "SPIRITS",
    note: "Top shelf, single / double",
    items: [
      { name: "Vodka", price: 4, double: 8 },
      { name: "Whiskey", price: 4, double: 8 },
      { name: "Rum", price: 4, double: 8 },
      { name: "Scotch", price: 4, double: 8 },
      { name: "Gin", price: 4, double: 8 },
      { name: "Tequila", price: 4, double: 8 },
    ],
  },
  {
    id: "shooters",
    title: "Shooters",
    board: "SHOOTERS",
    items: [{ name: "House shooters", priceText: "Ask the bartender" }],
  },
  {
    id: "bubbly",
    title: "Champagne",
    board: "BUBBLY",
    items: [{ name: "Bottle of champagne", price: 14 }],
  },
  {
    id: "soda",
    title: "Soda & Snacks",
    board: "SODA",
    items: [
      { name: "Pepsi" },
      { name: "Sprite" },
      { name: "Ginger Ale" },
      { name: "Popcorn", priceText: "Free, always" },
    ],
  },
];

/** The handful of beers shown on the home page's ticket counter. */
export const beerPreview = ["PBR", "Labatt Blue", "Yuengling", "Guinness"] as const;

export function formatPrice(dollars: number) {
  return `$${dollars.toFixed(2)}`;
}

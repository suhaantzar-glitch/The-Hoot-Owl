/**
 * The weekly lineup shown on the departures board.
 *
 * `board` is what the split-flap board spells out. Keep it to 14 characters
 * or fewer (letters, numbers, spaces and ' & - . ? !) so it fits on a phone.
 */

export type WeeklyEvent = {
  day: string;
  short: string;
  name: string;
  board: string;
  /** 24-hour "HH:MM" start time. */
  starts: string;
  note?: string;
};

export const weeklyLineup: readonly WeeklyEvent[] = [
  { day: "Monday", short: "MON", name: "Scary Isn't It", board: "SCARY ISN'T IT", starts: "20:00" },
  { day: "Tuesday", short: "TUE", name: "Night Blues", board: "NIGHT BLUES", starts: "20:00" },
  { day: "Wednesday", short: "WED", name: "Quiz Night", board: "QUIZ NIGHT", starts: "20:00" },
  { day: "Thursday", short: "THU", name: "You Never Know", board: "YOU NEVER KNOW", starts: "20:00" },
  {
    day: "Friday",
    short: "FRI",
    name: "Happy Hour",
    board: "HAPPY HOUR",
    starts: "16:00",
    note: "Doors at 4 PM",
  },
];

export const lineupFootnote = "Saturday: doors at 8 PM · Sunday: closed, the train's in the yard.";

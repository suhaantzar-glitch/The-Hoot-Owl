/**
 * Opening hours, in Canton's local time (America/New_York).
 *
 * Times are 24-hour "HH:MM". A closing time earlier than the opening time
 * means the shift runs past midnight into the next morning, so
 * `{ open: "20:00", close: "01:30" }` on Friday means Friday 8 PM until
 * 1:30 AM Saturday. Set `open: null` for a day the bar is closed.
 *
 * TODO_CONFIRM_HOURS: confirm with the bar before launch.
 */

export const TIME_ZONE = "America/New_York";

export type DayHours = {
  day: string;
  short: string;
  open: string | null;
  close: string | null;
};

// Index 0 is Sunday, matching JavaScript's Date#getDay().
export const hours: readonly DayHours[] = [
  { day: "Sunday", short: "Sun", open: null, close: null },
  { day: "Monday", short: "Mon", open: "20:00", close: "01:30" },
  { day: "Tuesday", short: "Tue", open: "20:00", close: "01:30" },
  { day: "Wednesday", short: "Wed", open: "20:00", close: "01:30" },
  { day: "Thursday", short: "Thu", open: "20:00", close: "01:30" },
  { day: "Friday", short: "Fri", open: "16:00", close: "01:30" },
  { day: "Saturday", short: "Sat", open: "20:00", close: "01:30" },
];

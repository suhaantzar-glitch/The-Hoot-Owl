import type { DayHours } from "../content/hours";

const MINUTES_PER_DAY = 24 * 60;
const MINUTES_PER_WEEK = 7 * MINUTES_PER_DAY;

export type OpenStatus =
  | {
      state: "open";
      /** Weekday (0 = Sunday) whose shift is running, e.g. Friday at 12:45 AM Saturday. */
      serviceDay: number;
      closesAt: string;
      label: string;
      detail: string;
    }
  | {
      state: "closed";
      serviceDay: number;
      opensAt: string | null;
      label: string;
      detail: string;
    };

export function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** "20:00" -> "8 PM", "01:30" -> "1:30 AM" */
export function formatTime(time: string): string {
  const total = toMinutes(time);
  const h24 = Math.floor(total / 60);
  const m = total % 60;
  const suffix = h24 < 12 ? "AM" : "PM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function formatHoursRange(day: DayHours): string {
  if (!day.open || !day.close) return "Closed";
  return `${formatTime(day.open)} – ${formatTime(day.close)}`;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Building a time-zone-aware formatter is slow, so keep one per zone.
const clockFormats = new Map<string, Intl.DateTimeFormat>();

function clockFormat(timeZone: string) {
  let format = clockFormats.get(timeZone);
  if (!format) {
    format = new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    clockFormats.set(timeZone, format);
  }
  return format;
}

/** Weekday and minutes-past-midnight on the wall clock in `timeZone`. */
export function getZonedClock(date: Date, timeZone: string) {
  const parts = clockFormat(timeZone).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    weekday: WEEKDAYS.indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

/**
 * Works out whether the bar is open at `date`, judged on the bar's own
 * clock. Shifts that run past midnight belong to the day they started, so
 * 12:45 AM Saturday falls inside Friday's 4 PM – 1:30 AM shift.
 */
export function getOpenStatus(date: Date, week: readonly DayHours[], timeZone: string): OpenStatus {
  const { weekday, minutes } = getZonedClock(date, timeZone);
  const now = weekday * MINUTES_PER_DAY + minutes;

  let nextStart: number | null = null;
  let nextDay: DayHours | null = null;

  for (let d = 0; d < 7; d++) {
    const day = week[d];
    if (!day.open || !day.close) continue;

    const start = d * MINUTES_PER_DAY + toMinutes(day.open);
    const length =
      (toMinutes(day.close) - toMinutes(day.open) + MINUTES_PER_DAY) % MINUTES_PER_DAY || MINUTES_PER_DAY;

    // Check this week's shift and the same shift seen from last week, so
    // Saturday night's shift still counts in the first minutes of Sunday.
    for (const offset of [0, -MINUTES_PER_WEEK]) {
      const s = start + offset;
      if (now >= s && now < s + length) {
        return {
          state: "open",
          serviceDay: d,
          closesAt: day.close,
          label: "Open now",
          detail: `Until ${formatTime(day.close)}`,
        };
      }
    }

    const upcoming = start > now ? start : start + MINUTES_PER_WEEK;
    if (nextStart === null || upcoming < nextStart) {
      nextStart = upcoming;
      nextDay = day;
    }
  }

  if (nextStart === null || !nextDay?.open) {
    return { state: "closed", serviceDay: weekday, opensAt: null, label: "Closed", detail: "" };
  }

  const daysAhead = Math.floor(nextStart / MINUTES_PER_DAY) - weekday;
  const at = formatTime(nextDay.open);
  const detail =
    daysAhead === 0
      ? `Opens at ${at}`
      : daysAhead === 1
        ? `Opens tomorrow at ${at}`
        : `Opens ${nextDay.day} at ${at}`;

  return { state: "closed", serviceDay: weekday, opensAt: nextDay.open, label: "Closed", detail };
}

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
      /** Real time until the doors open, or null if no day has hours. */
      opensInMs: number | null;
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

/** The wall clock in `timeZone` at `date`. */
export function getZonedClock(date: Date, timeZone: string) {
  const parts = clockFormat(timeZone).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekday = WEEKDAYS.indexOf(get("weekday"));
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));

  // The zone's offset is how far its minute-of-the-week is from UTC's,
  // wrapped into half a week either way (real offsets are -12h to +14h).
  const utcMinuteOfWeek = date.getUTCDay() * MINUTES_PER_DAY + date.getUTCHours() * 60 + date.getUTCMinutes();
  let offsetMinutes = weekday * MINUTES_PER_DAY + minutes - utcMinuteOfWeek;
  if (offsetMinutes > MINUTES_PER_WEEK / 2) offsetMinutes -= MINUTES_PER_WEEK;
  if (offsetMinutes <= -MINUTES_PER_WEEK / 2) offsetMinutes += MINUTES_PER_WEEK;

  return {
    weekday,
    minutes,
    seconds: date.getUTCSeconds(),
    /** How far the zone's clock is ahead of UTC, e.g. -4 hours in summer. */
    offsetMs: offsetMinutes * 60_000,
  };
}

/**
 * Works out whether the bar is open at `date`, judged on the bar's own
 * clock. Shifts that run past midnight belong to the day they started, so
 * 12:45 AM Saturday falls inside Friday's 4 PM – 1:30 AM shift.
 */
export function getOpenStatus(date: Date, week: readonly DayHours[], timeZone: string): OpenStatus {
  const { weekday, minutes, seconds, offsetMs } = getZonedClock(date, timeZone);
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
    return {
      state: "closed",
      serviceDay: weekday,
      opensAt: null,
      opensInMs: null,
      label: "Closed",
      detail: "",
    };
  }

  // Time to opening on the bar's wall clock, then corrected for the hour the
  // clock gains or loses if daylight saving changes before the doors open.
  const wallMs = (nextStart - now) * 60_000 - seconds * 1000 - (date.getTime() % 1000);
  const opensAtInstant = new Date(date.getTime() + wallMs);
  const opensInMs = wallMs - (getZonedClock(opensAtInstant, timeZone).offsetMs - offsetMs);

  const daysAhead = Math.floor(nextStart / MINUTES_PER_DAY) - weekday;
  const at = formatTime(nextDay.open);
  const detail =
    daysAhead === 0
      ? `Opens at ${at}`
      : daysAhead === 1
        ? `Opens tomorrow at ${at}`
        : `Opens ${nextDay.day} at ${at}`;

  return {
    state: "closed",
    serviceDay: weekday,
    opensAt: nextDay.open,
    opensInMs,
    label: "Closed",
    detail,
  };
}

/** 8_100_000 -> "2h 15m 00s"; over a day -> "1d 02h 15m 00s". */
export function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const days = Math.floor(total / 86_400);
  const hours = Math.floor((total % 86_400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  if (days) return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(secs)}s`;
  if (hours) return `${hours}h ${pad(minutes)}m ${pad(secs)}s`;
  return `${minutes}m ${pad(secs)}s`;
}

/** The same countdown in words, to the minute, for screen readers. */
export function describeCountdown(ms: number): string {
  const totalMinutes = Math.ceil(Math.max(0, ms) / 60_000);
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  const unit = (n: number, word: string) => (n ? `${n} ${word}${n === 1 ? "" : "s"}` : "");
  return (
    [unit(days, "day"), unit(hours, "hour"), unit(minutes, "minute")].filter(Boolean).join(" ") ||
    "less than a minute"
  );
}

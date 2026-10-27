import { test } from "node:test";
import assert from "node:assert/strict";
import { hours, TIME_ZONE } from "../src/content/hours.ts";
import { describeCountdown, formatCountdown, formatTime, getOpenStatus } from "../src/lib/hours.ts";

const at = (iso: string) => getOpenStatus(new Date(iso), hours, TIME_ZONE);

test("formats times the way the bar writes them", () => {
  assert.equal(formatTime("20:00"), "8 PM");
  assert.equal(formatTime("16:00"), "4 PM");
  assert.equal(formatTime("01:30"), "1:30 AM");
  assert.equal(formatTime("00:00"), "12 AM");
  assert.equal(formatTime("12:00"), "12 PM");
});

test("1:00 AM Saturday is still Friday's shift", () => {
  const s = at("2026-10-31T01:00:00-04:00");
  assert.equal(s.state, "open");
  assert.equal(s.serviceDay, 5);
  assert.equal(s.detail, "Until 1:30 AM");
});

test("12:45 AM Saturday is still Friday's shift", () => {
  const s = at("2026-10-31T00:45:00-04:00");
  assert.equal(s.state, "open");
  assert.equal(s.serviceDay, 5);
});

test("the same moment given in UTC gives the same answer", () => {
  assert.equal(at("2026-10-31T05:00:00Z").state, "open");
});

test("1:30 AM on the dot is closing time", () => {
  const s = at("2026-10-31T01:30:00-04:00");
  assert.equal(s.state, "closed");
  assert.equal(s.detail, "Opens at 8 PM");
});

test("early Sunday morning belongs to Saturday's shift", () => {
  const s = at("2026-11-01T00:30:00-04:00");
  assert.equal(s.state, "open");
  assert.equal(s.serviceDay, 6);
});

test("Sunday evening is closed and opens Monday", () => {
  const s = at("2026-11-01T19:00:00-05:00");
  assert.equal(s.state, "closed");
  assert.equal(s.detail, "Opens tomorrow at 8 PM");
});

test("after Saturday's shift ends, Sunday is skipped", () => {
  const s = at("2026-11-01T01:45:00-04:00");
  assert.equal(s.state, "closed");
  assert.equal(s.detail, "Opens tomorrow at 8 PM");
});

test("1:45 AM Monday: Sunday had no shift, so it opens tonight", () => {
  const s = at("2026-10-26T01:45:00-04:00");
  assert.equal(s.state, "closed");
  assert.equal(s.detail, "Opens at 8 PM");
});

test("Friday afternoon waits for 4 PM happy hour", () => {
  assert.equal(at("2026-10-30T14:00:00-04:00").detail, "Opens at 4 PM");
  assert.equal(at("2026-10-30T16:00:00-04:00").state, "open");
});

test("weeknight just before midnight is open", () => {
  const s = at("2026-10-29T23:59:00-04:00");
  assert.equal(s.state, "open");
  assert.equal(s.serviceDay, 4);
});

test("winter (EST) evenings work too", () => {
  assert.equal(at("2027-01-13T21:00:00-05:00").state, "open");
  assert.equal(at("2027-01-13T19:59:00-05:00").detail, "Opens at 8 PM");
});

test("Monday morning lunchtime opens tonight", () => {
  assert.equal(at("2026-10-26T12:00:00-04:00").detail, "Opens at 8 PM");
});

const HOUR = 3_600_000;
const opensIn = (iso: string) => {
  const s = at(iso);
  assert.equal(s.state, "closed");
  return s.state === "closed" ? s.opensInMs : null;
};

test("counts down to Friday's 4 PM happy hour", () => {
  assert.equal(opensIn("2026-10-30T14:00:00-04:00"), 2 * HOUR);
  assert.equal(opensIn("2026-10-30T15:59:30-04:00"), 30_000);
  assert.equal(opensIn("2026-10-30T15:59:59.250-04:00"), 750);
});

test("counts down from Sunday evening to Monday night", () => {
  assert.equal(opensIn("2026-11-01T19:00:00-05:00"), 25 * HOUR);
});

test("countdown includes the extra hour when clocks fall back", () => {
  // Sun 1:45 AM EDT -> Mon 8 PM EST is 42h15m on the wall clock, 43h15m in real time.
  assert.equal(opensIn("2026-11-01T01:45:00-04:00"), 43.25 * HOUR);
});

test("countdown drops the lost hour when clocks spring forward", () => {
  // Sun 1:45 AM EST -> Mon 8 PM EDT is 42h15m on the wall clock, 41h15m in real time.
  assert.equal(opensIn("2027-03-14T01:45:00-05:00"), 41.25 * HOUR);
});

test("open shifts have no countdown to open", () => {
  assert.equal(at("2026-10-31T01:00:00-04:00").state, "open");
});

test("formats the countdown for the sign and for screen readers", () => {
  assert.equal(formatCountdown(2 * HOUR + 14 * 60_000 + 5_000), "2h 14m 05s");
  assert.equal(formatCountdown(30_000), "0m 30s");
  assert.equal(formatCountdown(750), "0m 01s");
  assert.equal(formatCountdown(25 * HOUR), "1d 01h 00m 00s");
  assert.equal(describeCountdown(2 * HOUR + 14 * 60_000 + 5_000), "2 hours 15 minutes");
  assert.equal(describeCountdown(25 * HOUR), "1 day 1 hour");
  assert.equal(describeCountdown(30_000), "1 minute");
});

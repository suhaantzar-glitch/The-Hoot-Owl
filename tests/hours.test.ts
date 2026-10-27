import { test } from "node:test";
import assert from "node:assert/strict";
import { hours, TIME_ZONE } from "../src/content/hours.ts";
import { formatTime, getOpenStatus } from "../src/lib/hours.ts";

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

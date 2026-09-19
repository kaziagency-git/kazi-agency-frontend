import { ACC_DISPLAY_TIMEZONE, ACC_LOCALE } from './constants';

/**
 * Timezone helpers. Everything is STORED in UTC; the agency reads its books in
 * America/New_York, so a filter like `from=2026-03-01` has to mean midnight in
 * New York, not midnight UTC — otherwise the first (or last) few hours of a
 * day land in the wrong month.
 *
 * Implemented with Intl so no date library is needed.
 */

const partsFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: ACC_DISPLAY_TIMEZONE,
  hour12: false,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

/** Offset of the display zone from UTC, in ms, at the given instant. */
function zoneOffsetMs(instant: Date): number {
  const parts = partsFormatter.formatToParts(instant);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value ?? '0');

  // Some ICU builds render midnight as hour 24 under hour12:false.
  const hour = get('hour') % 24;

  const asIfUtc = Date.UTC(
    get('year'), get('month') - 1, get('day'), hour, get('minute'), get('second')
  );
  return asIfUtc - instant.getTime();
}

/** Turns a wall-clock time in the display zone into the matching UTC instant. */
function zonedToUtc(y: number, m: number, d: number, h: number, min: number, s: number, ms: number): Date {
  const naive = Date.UTC(y, m - 1, d, h, min, s, ms);
  // First pass uses the offset at the naive instant, second corrects the rare
  // case where that guess fell on the other side of a DST transition.
  const firstPass = new Date(naive - zoneOffsetMs(new Date(naive)));
  return new Date(naive - zoneOffsetMs(firstPass));
}

const YMD = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * Parses a filter boundary. A bare `YYYY-MM-DD` is read as a New York day —
 * `end: true` snaps to the last millisecond of it. Anything else is parsed as
 * a normal ISO timestamp.
 */
export function parseBoundary(value: string, end = false): Date {
  const match = YMD.exec(value.trim());

  if (match) {
    const [, y, m, d] = match;
    return end
      ? zonedToUtc(Number(y), Number(m), Number(d), 23, 59, 59, 999)
      : zonedToUtc(Number(y), Number(m), Number(d), 0, 0, 0, 0);
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) throw new Error(`Invalid date: ${value}`);
  return parsed;
}

/** First millisecond of `year` in the display zone. */
export function startOfYearNY(year: number): Date {
  return zonedToUtc(year, 1, 1, 0, 0, 0, 0);
}

/** `YYYY-MM-DD` of an instant as seen in the display zone. */
export function toYmdNY(date: Date): string {
  const parts = partsFormatter.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')}`;
}

/** Human-readable date in the display zone, e.g. `Mar 14, 2026`. */
export function formatDateNY(date: Date): string {
  return new Intl.DateTimeFormat(ACC_LOCALE, {
    timeZone: ACC_DISPLAY_TIMEZONE,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/** Whole days from now until `date` (negative once it is in the past). */
export function daysUntil(date: Date, from: Date = new Date()): number {
  return Math.ceil((date.getTime() - from.getTime()) / 86_400_000);
}

/** `now + days`, as a UTC instant. */
export function addDays(days: number, from: Date = new Date()): Date {
  return new Date(from.getTime() + days * 86_400_000);
}

// ── Zone-aware day countdown ───────────────────────────────────────────────

const zoneYmdFormatters = new Map<string, Intl.DateTimeFormat>();

function ymdFormatterFor(timeZone: string): Intl.DateTimeFormat {
  const cached = zoneYmdFormatters.get(timeZone);
  if (cached) return cached;

  let formatter: Intl.DateTimeFormat;
  try {
    formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch {
    // An unknown zone must not throw on an alert run; fall back to the display
    // zone, which the settings helper also validates against.
    formatter = partsFormatter;
  }

  zoneYmdFormatters.set(timeZone, formatter);
  return formatter;
}

function ymdPartsInZone(date: Date, timeZone: string): { y: number; m: number; d: number } {
  const parts = ymdFormatterFor(timeZone).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value ?? '0');
  return { y: get('year'), m: get('month'), d: get('day') };
}

/**
 * Whole CALENDAR days from `from` until `date`, as the two are dated in
 * `timeZone`. Negative once `date` is in the past.
 *
 * Unlike `daysUntil()`, which divides raw milliseconds, this compares the two
 * calendar dates themselves — so an alert configured for "7 days before"
 * matches on the whole of that day no matter what time the daily workflow
 * runs, which is what exact-threshold matching depends on.
 */
export function daysUntilInZone(date: Date, timeZone: string, from: Date = new Date()): number {
  const a = ymdPartsInZone(from, timeZone);
  const b = ymdPartsInZone(date, timeZone);
  return Math.round(
    (Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)) / 86_400_000
  );
}

/** `YYYY-MM-DD` of an instant as seen in `timeZone`. */
export function toYmdInZone(date: Date, timeZone: string): string {
  const { y, m, d } = ymdPartsInZone(date, timeZone);
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

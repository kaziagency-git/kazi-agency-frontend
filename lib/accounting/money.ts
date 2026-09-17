import { ACC_CURRENCY, ACC_LOCALE } from './constants';

/**
 * Money helpers. Every amount in the accounting module is an INTEGER number
 * of cents — floats are never used for money, so `0.1 + 0.2` style drift
 * cannot reach the database.
 */

/** Largest amount we accept: keeps cent arithmetic inside the safe-integer range. */
const MAX_CENTS = Number.MAX_SAFE_INTEGER;

/**
 * Converts a dollar amount to integer cents, rounding half-up at the cent.
 *
 * The conversion shifts the decimal point on the STRING form rather than
 * multiplying by 100, because `19.99 * 100` is `1998.9999999999998` — correct
 * after rounding here, but not for every input.
 *
 * Accepts `"$1,234.56"`, `"1234.56"`, `1234.56`, `"-5"`.
 */
export function toCents(dollars: number | string): number {
  if (typeof dollars === 'number' && !Number.isFinite(dollars)) {
    throw new Error('Amount must be a finite number');
  }

  const normalized = String(dollars).trim().replace(/[$,\s]/g, '');
  if (!/^-?(\d+(\.\d*)?|\.\d+)$/.test(normalized)) {
    throw new Error(`Invalid money amount: ${String(dollars)}`);
  }

  const negative = normalized.startsWith('-');
  const unsigned = negative ? normalized.slice(1) : normalized;
  const [whole = '0', fraction = ''] = unsigned.split('.');

  // Three fraction digits: two become cents, the third decides the rounding.
  const digits = (fraction + '000').slice(0, 3);
  const base = Number(whole) * 100 + Number(digits.slice(0, 2));
  const cents = Number(digits[2]) >= 5 ? base + 1 : base;

  if (!Number.isSafeInteger(cents)) throw new Error('Amount is too large');

  return negative ? -cents : cents;
}

/** Converts integer cents back to a dollar number — for display/export only. */
export function fromCents(cents: number): number {
  assertCents(cents);
  return cents / 100;
}

/** Renders cents as `$1,234.56` (negatives as `-$1,234.56`). */
export function formatUSD(cents: number): string {
  assertCents(cents);
  return formatter().format(cents / 100);
}

/** True when the value is a safe integer number of cents. */
export function isValidCents(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && Math.abs(value) <= MAX_CENTS;
}

function assertCents(cents: number): void {
  if (!isValidCents(cents)) {
    throw new Error(`Expected an integer number of cents, received: ${String(cents)}`);
  }
}

// Intl.NumberFormat construction is expensive; build it once, lazily.
let cached: Intl.NumberFormat | null = null;
function formatter(): Intl.NumberFormat {
  cached ??= new Intl.NumberFormat(ACC_LOCALE, {
    style: 'currency',
    currency: ACC_CURRENCY,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return cached;
}

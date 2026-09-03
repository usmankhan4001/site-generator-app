/** Formatting helpers shared by the site kit (studio preview + generated sites). */

const ZERO_DECIMAL = new Set(['JPY', 'KRW', 'VND', 'CLP', 'IDR', 'HUF']);

/** Format a numeric price with its currency. Falls back to a plain
 *  `<code> <amount>` string if Intl throws on an unknown currency code. */
export function formatPrice(
  amount: number,
  currency = 'USD',
  opts: { unit?: string } = {},
): string {
  const code = (currency || 'USD').toUpperCase();
  let body: string;
  try {
    body = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: code,
      minimumFractionDigits: ZERO_DECIMAL.has(code) ? 0 : Number.isInteger(amount) ? 0 : 2,
      maximumFractionDigits: ZERO_DECIMAL.has(code) ? 0 : 2,
    }).format(amount);
  } catch {
    body = `${code} ${amount.toLocaleString('en-US')}`;
  }
  return opts.unit ? `${body}${opts.unit}` : body;
}

/** Current year, evaluated at render time. */
export function currentYear(): number {
  return new Date().getFullYear();
}

/** Turn a route like `/policies/privacy` into `policies-privacy` for ids/keys. */
export function slugifyPath(path: string): string {
  return path.replace(/^\/+|\/+$/g, '').replace(/\//g, '-') || 'home';
}

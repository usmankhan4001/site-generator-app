/**
 * Currency and price formatting utilities for the commerce subsystem.
 * Handles standard ISO currencies, localized symbols, and zero-decimal currencies.
 */

const ZERO_DECIMAL_CURRENCIES = new Set([
  'BIF', 'CLP', 'DJF', 'GNF', 'HUF', 'IDR', 'JPY', 'KMF', 'KRW', 'MGA',
  'PYG', 'RWF', 'UGX', 'VND', 'VUV', 'XAF', 'XOF', 'XPF'
]);

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'CA$',
  AUD: 'AU$',
  SGD: 'S$',
  HKD: 'HK$',
  JPY: '¥',
  CNY: '¥',
  NZD: 'NZ$',
  CHF: 'CHF',
  AED: 'AED',
  SAR: 'SAR',
};

/**
 * Format a numeric amount into a localized currency string.
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  const code = (currency || 'USD').toUpperCase().trim();
  const isZeroDecimal = ZERO_DECIMAL_CURRENCIES.has(code);

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: code,
      minimumFractionDigits: isZeroDecimal ? 0 : Number.isInteger(amount) ? 0 : 2,
      maximumFractionDigits: isZeroDecimal ? 0 : 2,
    }).format(amount);
  } catch {
    const symbol = CURRENCY_SYMBOLS[code] || `${code} `;
    const formattedNum = isZeroDecimal
      ? Math.round(amount).toLocaleString(locale)
      : amount.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${symbol}${formattedNum}`;
  }
}

/**
 * Convenience alias for formatCurrency
 */
export const formatPrice = formatCurrency;

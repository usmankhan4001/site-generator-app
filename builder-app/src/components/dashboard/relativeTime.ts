/**
 * Tiny relative-time formatter — no dependencies.
 * `relativeTime('2026-09-03T09:00:00.000Z')` -> `"3h ago"`.
 */
export function relativeTime(input: string | number | Date): string {
  const then = new Date(input).getTime();
  if (!Number.isFinite(then)) return '';

  const diffMs = Date.now() - then;
  const future = diffMs < 0;
  const s = Math.floor(Math.abs(diffMs) / 1000);

  const fmt = (value: number, unit: string) => {
    const label = `${value} ${unit}${value === 1 ? '' : 's'}`;
    return future ? `in ${label}` : `${label} ago`;
  };

  if (s < 45) return future ? 'in a moment' : 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return fmt(m, 'min');
  const h = Math.floor(m / 60);
  if (h < 24) return fmt(h, 'hour');
  const d = Math.floor(h / 24);
  if (d < 7) return fmt(d, 'day');
  const w = Math.floor(d / 7);
  if (w < 5) return fmt(w, 'week');
  const mo = Math.floor(d / 30);
  if (mo < 12) return fmt(mo, 'month');
  const y = Math.floor(d / 365);
  return fmt(y, 'year');
}

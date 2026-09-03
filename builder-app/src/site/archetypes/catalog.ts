// extracted from normalizeTemplates.ts — that file retires in 5.4-E; this is the surviving copy

/**
 * `CatalogItem` fold — normalises the three source shapes
 * (ServiceTierInput | ProductItem | ServerPlanItem) onto one `CatalogItem`.
 *
 * Ported verbatim from `src/lib/normalizeTemplates.ts` (with its small local
 * `str` / `num` / `arr` / `slugify` / `compact` helpers inlined here so the
 * module is self-contained). The archetype composer / starter-set mining use
 * this to fold mined catalogue data.
 */

import type { CatalogItem } from '@/site/schema';

const str = (v: unknown, d = ''): string => (typeof v === 'string' ? v : d);
const num = (v: unknown): number =>
  typeof v === 'number' && Number.isFinite(v) ? v : 0;
const arr = <T = any>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

function slugify(name: unknown): string {
  return String(name ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function compact(obj: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) if (v && v.trim()) out[k] = v;
  return out;
}

export function toCatalogItem(x: any): CatalogItem {
  x = x || {};
  const isServer = x.priceMonthly != null || 'priceMonthly' in x;
  const isProduct = !isServer && (x.sku != null || x.image != null);

  const item: CatalogItem = {
    id: str(x.id) || str(x.sku) || slugify(x.name) || 'item',
    name: str(x.name),
    price: num(isServer ? x.priceMonthly : x.price),
    description: str(x.description),
    features: arr(x.features).map(String),
    popular: !!x.popular,
  };

  if (isServer) {
    item.currency = str(x.currency) || 'USD';
    item.priceUnit = '/mo';
    if (x.setupFee != null) item.setupFee = num(x.setupFee);
    const specs = compact({
      CPU: str(x.cpu),
      RAM: str(x.ram),
      Storage: str(x.storage),
      Bandwidth: str(x.bandwidth),
      'Port Speed': str(x.portSpeed),
    });
    if (Object.keys(specs).length) item.specs = specs;
    if (arr(x.locations).length) item.locations = arr(x.locations).map(String);
    if (str(x.sla)) item.sla = str(x.sla);
    if (str(x.category)) item.category = str(x.category);
    if (!item.description) {
      item.description = [str(x.category), str(x.cpu)].filter(Boolean).join(' — ');
    }
  } else if (isProduct) {
    if (str(x.currency)) item.currency = str(x.currency);
    if (str(x.image)) item.image = str(x.image);
    if (str(x.sku)) item.sku = str(x.sku);
    if (str(x.category)) item.category = str(x.category);
    if (typeof x.inStock === 'boolean') item.inStock = x.inStock;
    if (typeof x.rating === 'number') item.rating = x.rating;
    if (typeof x.reviewCount === 'number') item.reviewCount = x.reviewCount;
    if (x.moq != null) item.moq = num(x.moq);
    if (str(x.unit)) item.unit = str(x.unit);
    if (str(x.leadTime)) item.leadTime = str(x.leadTime);
    if (x.specs && typeof x.specs === 'object') item.specs = { ...x.specs };
  } else {
    // ServiceTierInput
    item.currency = str(x.currency) || 'USD';
    const interval = str(x.interval);
    item.priceUnit =
      interval === 'month'
        ? '/mo'
        : interval === 'year'
          ? '/yr'
          : interval
            ? `/${interval}`
            : undefined;
    if (x.setupFee != null) item.setupFee = num(x.setupFee);
    if (str(x.sla)) item.sla = str(x.sla);
    const specs = compact({
      Commitment: str(x.commitment),
      Turnaround: str(x.turnaround),
      'Ideal for': str(x.idealFor),
    });
    if (Object.keys(specs).length) item.specs = specs;
  }

  return item;
}

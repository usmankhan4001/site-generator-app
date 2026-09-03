'use client';

/**
 * Feature-detection for data modules that a sibling agent may or may not have
 * created yet (`src/data/jurisdictions.ts`, `src/data/entities.ts`,
 * `src/data/imagePool.ts`). Each import is dynamic + `@ts-ignore`d so the build
 * compiles whether or not the file exists; a missing module simply rejects the
 * promise and the affordance is skipped.
 */

import { useEffect, useState } from 'react';

function useOptional<T>(load: () => Promise<T | null>): T | null {
  const [value, setValue] = useState<T | null>(null);
  useEffect(() => {
    let alive = true;
    load()
      .then((v) => {
        if (alive) setValue(v);
      })
      .catch(() => {
        /* module absent — skip gracefully */
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return value;
}

export interface JurisdictionPreset {
  id: string;
  label: string;
  jurisdiction: string;
  governingLaw: string;
  addressHint?: string;
  regNumberFormat?: string;
}

export function useJurisdictionPresets(): JurisdictionPreset[] | null {
  return useOptional<JurisdictionPreset[]>(async () => {
    // @ts-ignore optional module — created by a sibling agent, may not exist
    const mod: any = await import('@/data/jurisdictions');
    const list = mod?.JURISDICTION_PRESETS ?? mod?.default ?? null;
    return Array.isArray(list) ? (list as JurisdictionPreset[]) : null;
  });
}

/** Loose shape — the harvested-entity dataset is authored elsewhere. */
export interface HarvestedEntity {
  id?: string;
  name?: string;
  legalName?: string;
  shortName?: string;
  registrationNumber?: string;
  regNumber?: string;
  jurisdiction?: string;
  governingLaw?: string;
  registeredAddress?: string;
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
  taxId?: string;
  asNumber?: string;
  [key: string]: unknown;
}

export function useHarvestedEntities(): HarvestedEntity[] | null {
  return useOptional<HarvestedEntity[]>(async () => {
    // @ts-ignore optional module — created by a sibling agent, may not exist
    const mod: any = await import('@/data/entities');
    const list = mod?.HARVESTED_ENTITIES ?? mod?.default ?? null;
    return Array.isArray(list) ? (list as HarvestedEntity[]) : null;
  });
}

export interface ImagePoolEntry {
  url: string;
  label?: string;
  category?: string;
}

function normalizeImage(raw: unknown): ImagePoolEntry | null {
  if (typeof raw === 'string') return { url: raw };
  if (raw && typeof raw === 'object') {
    const o = raw as Record<string, unknown>;
    const url = (o.url ?? o.src ?? o.href) as string | undefined;
    if (typeof url === 'string') {
      return {
        url,
        label: typeof o.label === 'string' ? o.label : (o.alt as string | undefined),
        category: typeof o.category === 'string' ? o.category : undefined,
      };
    }
  }
  return null;
}

export function useImagePool(): ImagePoolEntry[] | null {
  return useOptional<ImagePoolEntry[]>(async () => {
    // @ts-ignore optional module — created by a sibling agent, may not exist
    const mod: any = await import('@/data/imagePool');
    const raw =
      mod?.IMAGE_POOL ?? mod?.IMAGES ?? mod?.imagePool ?? mod?.default ?? null;
    if (!Array.isArray(raw)) return null;
    const list = raw.map(normalizeImage).filter(Boolean) as ImagePoolEntry[];
    return list.length ? list : null;
  });
}

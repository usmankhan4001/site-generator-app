export interface StockImage {
  url: string;
  thumb: string;
  alt: string;
  credit?: string;
}

export type {
  VaultDomain,
  VaultSubCategory,
  VaultRole,
  VaultAspectRatio,
  VaultBackground,
  CuratedVaultImage,
  QueryCuratedVaultParams,
} from './vault';

import React from 'react';

export type PuckFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'radio'
  | 'boolean'
  | 'array'
  | 'object'
  | 'custom';

export interface PuckFieldOption {
  label: string;
  value: string | number | boolean;
}

export interface PuckField<T = unknown> {
  type: PuckFieldType;
  label?: string;
  options?: PuckFieldOption[];
  arrayFields?: Record<string, PuckField>;
  objectFields?: Record<string, PuckField>;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: T;
}

export interface PuckComponentConfig<Props = Record<string, unknown>> {
  label?: string;
  render: React.ComponentType<Props>;
  defaultProps?: Partial<Props>;
  fields?: {
    [K in keyof Props]?: PuckField<Props[K]>;
  };
}

export interface PuckConfig {
  categories?: Record<
    string,
    {
      title?: string;
      visible?: boolean;
      defaultExpanded?: boolean;
      components: string[];
    }
  >;
  components: Record<string, PuckComponentConfig<any>>;
}

export interface BlockMeta {
  id: string;
  name: string;
  category: 'headers' | 'heros' | 'logos' | 'bentos' | 'stats' | 'pricing' | 'testimonials' | 'faqs' | 'contact' | 'footers' | 'policies' | 'ctas';
  subcategory: string;
  description: string;
  previewImage?: string;
  tags?: string[];
}

export interface HeaderNavBlockProps {
  logoText?: string;
  logoBadge?: string;
  tagline?: string;
  links?: Array<{ label: string; href: string }>;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  badgeText?: string;
  enableSearch?: boolean;
  enableCart?: boolean;
  cartCount?: number;
  phone?: string;
  announcementText?: string;
  themeMode?: 'auto' | 'dark' | 'light';
  variant?: string;
}

export interface HeroBlockProps {
  badge?: string;
  badgeHref?: string;
  headline?: string;
  accentText?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  primaryImageUrl?: string;
  secondaryImageUrl?: string;
  videoUrl?: string;
  stats?: Array<{ label: string; value: string }>;
  trustText?: string;
  ratingScore?: string;
  reviewCount?: string;
  codeSnippet?: string;
  deviceType?: 'browser' | 'phone' | 'tablet' | 'dual';
  variant?: string;
}

export interface LogoProofBlockProps {
  eyebrow?: string;
  headline?: string;
  description?: string;
  logos?: Array<{ name: string; symbol?: string; rating?: string; label?: string }>;
  ratingScore?: string;
  reviewCount?: string;
  trustBadge?: string;
  tickerSpeed?: number;
  variant?: string;
}

export interface BentoBlockProps {
  badge?: string;
  headline?: string;
  accentText?: string;
  description?: string;
  cards?: Array<{
    title: string;
    description: string;
    badge?: string;
    icon?: string;
    colSpan?: number;
    statValue?: string;
    statLabel?: string;
    image?: string;
    codeSnippet?: string;
  }>;
  variant?: string;
}

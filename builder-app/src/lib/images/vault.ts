import type { StockImage } from './types';

export type VaultDomain =
  | 'ecommerce'
  | 'corporate'
  | 'healthcare'
  | 'legal'
  | 'construction';

export type VaultSubCategory =
  | 'women_tops'
  | 'men_footwear'
  | 'watches'
  | 'bags_leather'
  | 'jewelry_accessories'
  | 'corporate_boardroom'
  | 'office_coworking'
  | 'executive_suite'
  | 'consulting_finance'
  | 'medical_clinic'
  | 'surgical_lab'
  | 'dental_care'
  | 'telehealth_wellness'
  | 'courtroom_legal'
  | 'law_library'
  | 'legal_counsel'
  | 'attorney_portrait'
  | 'heavy_construction'
  | 'logistics_cargo'
  | 'architecture_building'
  | 'civil_engineering';

export type VaultRole =
  | 'hero_banner'
  | 'product_thumbnail'
  | 'feature_photo'
  | 'team_portrait';

export type VaultAspectRatio = '1:1' | '4:5' | '16:9' | '3:2';

export type VaultBackground =
  | 'studio_white'
  | 'lifestyle_natural'
  | 'dark_mode';

export interface CuratedVaultImage extends StockImage {
  id: string;
  domain: VaultDomain;
  category: string;
  subCategory: VaultSubCategory;
  role: VaultRole;
  aspectRatio: VaultAspectRatio;
  background: VaultBackground;
  tags: string[];
  width?: number;
  height?: number;
}

export interface QueryCuratedVaultParams {
  domain?: VaultDomain | VaultDomain[];
  category?: string | string[];
  subCategory?: VaultSubCategory | VaultSubCategory[] | string | string[];
  role?: VaultRole | VaultRole[];
  aspectRatio?: VaultAspectRatio | VaultAspectRatio[];
  background?: VaultBackground | VaultBackground[];
  tags?: string[] | string;
  search?: string;
  limit?: number;
  offset?: number;
  fallbackToDomain?: boolean;
}

/**
 * Curated Image Vault with 80 high-resolution, production-grade Unsplash photo references.
 * Structured by domain, category, subcategory, role, aspect ratio, and background style.
 */
export const CURATED_IMAGE_VAULT: readonly CuratedVaultImage[] = [
  // =========================================================================
  // DOMAIN: E-COMMERCE (20 Assets)
  // =========================================================================
  {
    id: 'ecom-wt-001',
    domain: 'ecommerce',
    category: 'apparel',
    subCategory: 'women_tops',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
    alt: 'High fashion editorial model wearing bright yellow cropped top in modern urban setting',
    credit: 'Photo by Dom Hill on Unsplash',
    tags: ['fashion', 'streetwear', 'crop top', 'summer', 'editorial', 'apparel', 'women_tops'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'ecom-wt-002',
    domain: 'ecommerce',
    category: 'apparel',
    subCategory: 'women_tops',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=400&q=80',
    alt: 'Minimalist white silk designer blouse on female model with clean studio lighting',
    credit: 'Photo by Brooke Cagle on Unsplash',
    tags: ['blouse', 'silk', 'minimalist', 'white top', 'apparel', 'studio', 'women_tops'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'ecom-wt-003',
    domain: 'ecommerce',
    category: 'apparel',
    subCategory: 'women_tops',
    role: 'feature_photo',
    aspectRatio: '3:2',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1500&q=80',
    thumb: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80',
    alt: 'Tailored luxury neutral overshirt and stylish layers against white backdrop',
    credit: 'Photo by Valerie Elash on Unsplash',
    tags: ['overshirt', 'layering', 'autumn', 'chic', 'minimal', 'apparel', 'women_tops'],
    width: 1500,
    height: 1000,
  },
  {
    id: 'ecom-wt-004',
    domain: 'ecommerce',
    category: 'apparel',
    subCategory: 'women_tops',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
    alt: 'Classic premium organic cotton crewneck t-shirt on white background',
    credit: 'Photo by Keagan Henman on Unsplash',
    tags: ['tshirt', 'cotton', 'basic', 'casual', 'white t-shirt', 'mockup', 'women_tops'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'ecom-wt-005',
    domain: 'ecommerce',
    category: 'apparel',
    subCategory: 'women_tops',
    role: 'feature_photo',
    aspectRatio: '4:5',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80',
    alt: 'Vintage denim jacket styled top under cinematic dark studio neon lighting',
    credit: 'Photo by Laura Chouette on Unsplash',
    tags: ['denim', 'jacket', 'dark mood', 'streetwear', 'vintage', 'apparel', 'women_tops'],
    width: 1200,
    height: 1500,
  },
  {
    id: 'ecom-wt-006',
    domain: 'ecommerce',
    category: 'apparel',
    subCategory: 'women_tops',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    alt: 'Woman wearing contemporary oversized knit sweater walking along sunlit city boulevard',
    credit: 'Photo by Seth Doyle on Unsplash',
    tags: ['knitwear', 'sweater', 'lifestyle', 'city', 'winter collection', 'women_tops'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'ecom-wt-007',
    domain: 'ecommerce',
    category: 'apparel',
    subCategory: 'women_tops',
    role: 'team_portrait',
    aspectRatio: '4:5',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80',
    alt: 'Apparel fashion creative director and stylist posing in boutique design workshop',
    credit: 'Photo by Christopher Campbell on Unsplash',
    tags: ['designer', 'stylist', 'creative', 'apparel studio', 'team', 'women_tops'],
    width: 1200,
    height: 1500,
  },
  {
    id: 'ecom-mf-008',
    domain: 'ecommerce',
    category: 'footwear',
    subCategory: 'men_footwear',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80',
    alt: 'Modern designer sneakers on clean white product photography platform',
    credit: 'Photo by Hermès Rivera on Unsplash',
    tags: ['sneakers', 'kicks', 'athletic', 'footwear', 'shoes', 'studio', 'men_footwear'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'ecom-mf-009',
    domain: 'ecommerce',
    category: 'footwear',
    subCategory: 'men_footwear',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=400&q=80',
    alt: 'High-performance running shoes in vivid colors suspended in mid-air',
    credit: 'Photo by Giorgio Trovato on Unsplash',
    tags: ['running shoes', 'performance', 'sports', 'footwear', 'hero', 'men_footwear'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'ecom-mf-010',
    domain: 'ecommerce',
    category: 'footwear',
    subCategory: 'men_footwear',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=80',
    alt: 'Classic low-top canvas skateboard sneakers on raw concrete background',
    credit: 'Photo by Lefteris kallergis on Unsplash',
    tags: ['canvas shoes', 'skate', 'streetwear', 'casual', 'men_footwear'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'ecom-mf-011',
    domain: 'ecommerce',
    category: 'footwear',
    subCategory: 'men_footwear',
    role: 'feature_photo',
    aspectRatio: '3:2',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1500&q=80',
    thumb: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=400&q=80',
    alt: 'Handcrafted Italian brown leather oxford brogue shoes with dark moody patina',
    credit: 'Photo by Arthur Edelmans on Unsplash',
    tags: ['oxford', 'brogue', 'leather shoes', 'dress shoes', 'luxury', 'men_footwear'],
    width: 1500,
    height: 1000,
  },
  {
    id: 'ecom-mf-012',
    domain: 'ecommerce',
    category: 'footwear',
    subCategory: 'men_footwear',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
    alt: 'Iconic crimson red sports trainer sneaker isolated on seamless pure white',
    credit: 'Photo by REVOLT on Unsplash',
    tags: ['red sneakers', 'trainer', 'isolated', 'product shot', 'ecommerce', 'men_footwear'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'ecom-mf-013',
    domain: 'ecommerce',
    category: 'footwear',
    subCategory: 'men_footwear',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80',
    alt: 'Minimalist white high-top sneaker collection presented in aesthetic natural light',
    credit: 'Photo by Paul Volkmer on Unsplash',
    tags: ['white sneakers', 'lifestyle', 'banner', 'modern footwear', 'men_footwear'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'ecom-wtch-014',
    domain: 'ecommerce',
    category: 'accessories',
    subCategory: 'watches',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
    alt: 'Minimalist contemporary wristwatch with white dial and tan genuine leather strap',
    credit: 'Photo by Rachit Tank on Unsplash',
    tags: ['wrist watch', 'leather strap', 'minimal watch', 'timepiece', 'watches'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'ecom-wtch-015',
    domain: 'ecommerce',
    category: 'accessories',
    subCategory: 'watches',
    role: 'feature_photo',
    aspectRatio: '3:2',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1500&q=80',
    thumb: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=400&q=80',
    alt: 'Luxury automatic mechanical wrist watch resting on natural rustic wood surface',
    credit: 'Photo by Fernando Andrade on Unsplash',
    tags: ['automatic watch', 'horology', 'rustic', 'gentleman', 'luxury', 'watches'],
    width: 1500,
    height: 1000,
  },
  {
    id: 'ecom-wtch-016',
    domain: 'ecommerce',
    category: 'accessories',
    subCategory: 'watches',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80',
    alt: 'Swiss chronograph watch luxury dial detail illuminated by dramatic dark rim lighting',
    credit: 'Photo by John Torcasio on Unsplash',
    tags: ['chronograph', 'swiss watch', 'dark luxury', 'macro horology', 'watches'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'ecom-wtch-017',
    domain: 'ecommerce',
    category: 'accessories',
    subCategory: 'watches',
    role: 'feature_photo',
    aspectRatio: '4:5',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=400&q=80',
    alt: 'Modern smartwatch with black digital interface worn on wrist outdoors',
    credit: 'Photo by Luke Chesser on Unsplash',
    tags: ['smartwatch', 'wearable tech', 'fitness tracker', 'digital', 'watches'],
    width: 1200,
    height: 1500,
  },
  {
    id: 'ecom-wtch-018',
    domain: 'ecommerce',
    category: 'accessories',
    subCategory: 'watches',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
    alt: 'Luxury 18k gold vintage timepiece on dark slate background',
    credit: 'Photo by Andrew Neel on Unsplash',
    tags: ['gold watch', 'vintage timepiece', 'luxury accessories', 'horology', 'watches'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'ecom-acc-019',
    domain: 'ecommerce',
    category: 'accessories',
    subCategory: 'bags_leather',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=400&q=80',
    alt: 'High fashion accessories including handcrafted leather handbag and designer sunglasses',
    credit: 'Photo by Cleo Vermij on Unsplash',
    tags: ['handbag', 'leather bag', 'accessories', 'luxury fashion', 'sunglasses'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'ecom-acc-020',
    domain: 'ecommerce',
    category: 'apparel',
    subCategory: 'women_tops',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80',
    alt: 'Curated apparel boutique store interior with clothing racks and warm lighting',
    credit: 'Photo by Clark Street Mercantile on Unsplash',
    tags: ['boutique', 'clothing store', 'retail interior', 'shopping', 'apparel', 'women_tops'],
    width: 1920,
    height: 1080,
  },

  // =========================================================================
  // DOMAIN: CORPORATE (15 Assets)
  // =========================================================================
  {
    id: 'corp-cowork-021',
    domain: 'corporate',
    category: 'workspace',
    subCategory: 'office_coworking',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80',
    alt: 'Spacious architectural modern open-plan corporate headquarters with glass partitions',
    credit: 'Photo by Nastuh Abootalebi on Unsplash',
    tags: ['office', 'modern workplace', 'corporate interior', 'architecture', 'headquarters'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'corp-cowork-022',
    domain: 'corporate',
    category: 'workspace',
    subCategory: 'office_coworking',
    role: 'feature_photo',
    aspectRatio: '3:2',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1500&q=80',
    thumb: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80',
    alt: 'Bright executive workspace desk with modern laptop, notebook, and green potted plant',
    credit: 'Photo by Alesia Kazantceva on Unsplash',
    tags: ['workspace', 'desk setup', 'laptop', 'minimal office', 'productivity'],
    width: 1500,
    height: 1000,
  },
  {
    id: 'corp-board-023',
    domain: 'corporate',
    category: 'leadership',
    subCategory: 'corporate_boardroom',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
    alt: 'Collaborative diverse corporate team brainstorming around table in tech office',
    credit: 'Photo by Annie Spratt on Unsplash',
    tags: ['teamwork', 'collaboration', 'startup team', 'meeting', 'strategy'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'corp-fin-024',
    domain: 'corporate',
    category: 'consulting',
    subCategory: 'consulting_finance',
    role: 'team_portrait',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    alt: 'Confident female senior corporate executive consultant smiling in modern office',
    credit: 'Photo by Christina @ wocintechchat.com on Unsplash',
    tags: ['executive', 'business woman', 'consultant', 'leadership', 'portrait'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'corp-fin-025',
    domain: 'corporate',
    category: 'consulting',
    subCategory: 'consulting_finance',
    role: 'team_portrait',
    aspectRatio: '4:5',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    alt: 'Professional senior enterprise manager in navy suit looking directly into camera',
    credit: 'Photo by Ali Morshedlou on Unsplash',
    tags: ['executive portrait', 'businessman', 'navy suit', 'consultant', 'leadership'],
    width: 1200,
    height: 1500,
  },
  {
    id: 'corp-exec-026',
    domain: 'corporate',
    category: 'leadership',
    subCategory: 'executive_suite',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
    alt: 'Executive business leader adjusting tie with dark moody city skyline behind',
    credit: 'Photo by Hunters Race on Unsplash',
    tags: ['executive', 'ceo', 'luxury corporate', 'dark mood', 'leadership'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'corp-board-027',
    domain: 'corporate',
    category: 'leadership',
    subCategory: 'corporate_boardroom',
    role: 'feature_photo',
    aspectRatio: '3:2',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1500&q=80',
    thumb: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80',
    alt: 'Executive presentation and business team reviewing growth analytics on digital board',
    credit: 'Photo by Amy Hirschi on Unsplash',
    tags: ['boardroom', 'presentation', 'analytics', 'business review', 'team'],
    width: 1500,
    height: 1000,
  },
  {
    id: 'corp-exec-028',
    domain: 'corporate',
    category: 'workspace',
    subCategory: 'executive_suite',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
    alt: 'Low-angle view of gleaming corporate glass skyscraper reflecting blue sky and clouds',
    credit: 'Photo by Sean Pollock on Unsplash',
    tags: ['skyscraper', 'financial district', 'corporate tower', 'architecture', 'glass facade'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'corp-cowork-029',
    domain: 'corporate',
    category: 'workspace',
    subCategory: 'office_coworking',
    role: 'feature_photo',
    aspectRatio: '3:2',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1500&q=80',
    thumb: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    alt: 'Agile software engineers and product designers working collectively on laptops',
    credit: 'Photo by Marvin Meyer on Unsplash',
    tags: ['agile', 'developers', 'laptops', 'coworking', 'team collaboration'],
    width: 1500,
    height: 1000,
  },
  {
    id: 'corp-fin-030',
    domain: 'corporate',
    category: 'consulting',
    subCategory: 'consulting_finance',
    role: 'team_portrait',
    aspectRatio: '1:1',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    alt: 'Professional management consultant in corporate conference center',
    credit: 'Photo by Christina @ wocintechchat.com on Unsplash',
    tags: ['financial advisor', 'consultant', 'headshot', 'corporate professional'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'corp-board-031',
    domain: 'corporate',
    category: 'leadership',
    subCategory: 'corporate_boardroom',
    role: 'feature_photo',
    aspectRatio: '4:5',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
    alt: 'Corporate colleagues participating in strategic planning seminar',
    credit: 'Photo by Campaign Creators on Unsplash',
    tags: ['seminar', 'workshop', 'business strategy', 'board meeting'],
    width: 1200,
    height: 1500,
  },
  {
    id: 'corp-fin-032',
    domain: 'corporate',
    category: 'consulting',
    subCategory: 'consulting_finance',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80',
    alt: 'Corporate business partners shaking hands finalizing partnership contract',
    credit: 'Photo by Cytonn Photography on Unsplash',
    tags: ['handshake', 'partnership', 'deal', 'agreement', 'consulting'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'corp-exec-033',
    domain: 'corporate',
    category: 'workspace',
    subCategory: 'executive_suite',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
    alt: 'High-tech executive command center analytics dashboard in darkened modern office',
    credit: 'Photo by Sean Pollock on Unsplash',
    tags: ['command center', 'fintech', 'dark ui', 'analytics', 'enterprise tech'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'corp-board-034',
    domain: 'corporate',
    category: 'workspace',
    subCategory: 'corporate_boardroom',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=400&q=80',
    alt: 'Sleek corporate boardroom table with ergonomic executive leather chairs',
    credit: 'Photo by Nastuh Abootalebi on Unsplash',
    tags: ['boardroom table', 'executive chairs', 'office furniture', 'meeting room'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'corp-fin-035',
    domain: 'corporate',
    category: 'consulting',
    subCategory: 'consulting_finance',
    role: 'team_portrait',
    aspectRatio: '16:9',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80',
    alt: 'Large corporate advisory leadership group assembled in modern auditorium',
    credit: 'Photo by Headway on Unsplash',
    tags: ['corporate team', 'advisory board', 'leadership team', 'all hands'],
    width: 1920,
    height: 1080,
  },

  // =========================================================================
  // DOMAIN: HEALTHCARE (15 Assets)
  // =========================================================================
  {
    id: 'health-clin-036',
    domain: 'healthcare',
    category: 'medical_facilities',
    subCategory: 'medical_clinic',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80',
    alt: 'Ultra-clean modern hospital patient room and medical ward with sterile equipment',
    credit: 'Photo by Martha Dominguez de Gouveia on Unsplash',
    tags: ['hospital', 'clinic', 'medical ward', 'sterile', 'patient room', 'medical_clinic'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'health-clin-037',
    domain: 'healthcare',
    category: 'clinical_care',
    subCategory: 'medical_clinic',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80',
    alt: 'Doctor stethoscope resting on medical diagnostic clipboard with clinical notes',
    credit: 'Photo by Hush Naidoo Jade Photography on Unsplash',
    tags: ['stethoscope', 'medical chart', 'diagnostic', 'doctor tools', 'medical_clinic'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'health-clin-038',
    domain: 'healthcare',
    category: 'medical_facilities',
    subCategory: 'medical_clinic',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80',
    alt: 'State of the art medical clinic reception foyer and comfortable patient lounge',
    credit: 'Photo by Marcelo Leal on Unsplash',
    tags: ['reception', 'waiting room', 'clinic lobby', 'modern healthcare', 'medical_clinic'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'health-tele-039',
    domain: 'healthcare',
    category: 'clinical_care',
    subCategory: 'telehealth_wellness',
    role: 'team_portrait',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    alt: 'Approachable male chief physician smiling in white doctor lab coat',
    credit: 'Photo by Austin Distel on Unsplash',
    tags: ['doctor portrait', 'physician', 'headshot', 'healthcare practitioner', 'telehealth_wellness'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'health-tele-040',
    domain: 'healthcare',
    category: 'clinical_care',
    subCategory: 'telehealth_wellness',
    role: 'team_portrait',
    aspectRatio: '4:5',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1594824813590-78965a3d7350?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1594824813590-78965a3d7350?auto=format&fit=crop&w=400&q=80',
    alt: 'Compassionate female resident doctor with stethoscope smiling in modern hospital corridor',
    credit: 'Photo by CDC on Unsplash',
    tags: ['female doctor', 'stethoscope', 'hospital staff', 'caregiver', 'telehealth_wellness'],
    width: 1200,
    height: 1500,
  },
  {
    id: 'health-dent-041',
    domain: 'healthcare',
    category: 'dental_care',
    subCategory: 'dental_care',
    role: 'feature_photo',
    aspectRatio: '3:2',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1500&q=80',
    thumb: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80',
    alt: 'High-tech ergonomic dental patient chair with precision lighting and examination instruments',
    credit: 'Photo by Jonathan Borba on Unsplash',
    tags: ['dental chair', 'dentistry', 'orthodontics', 'dental clinic', 'dental_care'],
    width: 1500,
    height: 1000,
  },
  {
    id: 'health-dent-042',
    domain: 'healthcare',
    category: 'dental_care',
    subCategory: 'dental_care',
    role: 'feature_photo',
    aspectRatio: '4:5',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=400&q=80',
    alt: 'Dentist performing gentle oral hygiene examination on smiling patient',
    credit: 'Photo by Caroline LM on Unsplash',
    tags: ['dentist', 'oral health', 'teeth cleaning', 'dental exam', 'dental_care'],
    width: 1200,
    height: 1500,
  },
  {
    id: 'health-surg-043',
    domain: 'healthcare',
    category: 'medical_facilities',
    subCategory: 'surgical_lab',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
    alt: 'Advanced biomedical laboratory scientist researching through digital electron microscope',
    credit: 'Photo by National Cancer Institute on Unsplash',
    tags: ['laboratory', 'microscope', 'biomedical research', 'science lab', 'surgical_lab'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'health-surg-044',
    domain: 'healthcare',
    category: 'medical_facilities',
    subCategory: 'surgical_lab',
    role: 'feature_photo',
    aspectRatio: '3:2',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1500&q=80',
    thumb: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=400&q=80',
    alt: 'Overhead view of surgical operating room lamps and sterile surgical theatre setup',
    credit: 'Photo by Piron Guillaume on Unsplash',
    tags: ['operating room', 'surgery', 'surgical lamps', 'hospital tech', 'surgical_lab'],
    width: 1500,
    height: 1000,
  },
  {
    id: 'health-surg-045',
    domain: 'healthcare',
    category: 'clinical_care',
    subCategory: 'surgical_lab',
    role: 'team_portrait',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1583912267670-6575ad4ce2e3?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1583912267670-6575ad4ce2e3?auto=format&fit=crop&w=400&q=80',
    alt: 'Board certified orthopedic surgeon in protective medical scrubs and surgical cap',
    credit: 'Photo by JC Gellidon on Unsplash',
    tags: ['surgeon', 'scrubs', 'operating specialist', 'medical doctor', 'surgical_lab'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'health-tele-046',
    domain: 'healthcare',
    category: 'clinical_care',
    subCategory: 'telehealth_wellness',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
    alt: 'Telehealth digital tablet displaying patient vital stats and health metrics',
    credit: 'Photo by National Cancer Institute on Unsplash',
    tags: ['telehealth', 'digital health', 'tablet', 'medical app', 'telehealth_wellness'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'health-clin-047',
    domain: 'healthcare',
    category: 'clinical_care',
    subCategory: 'medical_clinic',
    role: 'feature_photo',
    aspectRatio: '3:2',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1500&q=80',
    thumb: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=400&q=80',
    alt: 'Caring practitioner holding elderly patient hands offering support and comfort',
    credit: 'Photo by Dominik Lange on Unsplash',
    tags: ['patient care', 'compassion', 'elderly care', 'nursing', 'medical_clinic'],
    width: 1500,
    height: 1000,
  },
  {
    id: 'health-clin-048',
    domain: 'healthcare',
    category: 'medical_facilities',
    subCategory: 'medical_clinic',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=400&q=80',
    alt: 'Primary physician in modern consultation suite reviewing treatment plan with patient',
    credit: 'Photo by CDC on Unsplash',
    tags: ['doctor consultation', 'patient checkup', 'medical exam', 'medical_clinic'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'health-surg-049',
    domain: 'healthcare',
    category: 'medical_facilities',
    subCategory: 'surgical_lab',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?auto=format&fit=crop&w=400&q=80',
    alt: 'Automated clinical centrifuge and pipette samples in molecular diagnostics lab',
    credit: 'Photo by Louis Reed on Unsplash',
    tags: ['test tubes', 'pipette', 'diagnostics', 'laboratory', 'surgical_lab'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'health-tele-050',
    domain: 'healthcare',
    category: 'clinical_care',
    subCategory: 'telehealth_wellness',
    role: 'team_portrait',
    aspectRatio: '16:9',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    alt: 'Multidisciplinary healthcare medical staff team standing proud in hospital corridor',
    credit: 'Photo by LinkedIn Sales Solutions on Unsplash',
    tags: ['medical team', 'nurses and doctors', 'hospital staff', 'healthcare team', 'telehealth_wellness'],
    width: 1920,
    height: 1080,
  },

  // =========================================================================
  // DOMAIN: LEGAL (15 Assets)
  // =========================================================================
  {
    id: 'legal-court-051',
    domain: 'legal',
    category: 'legal_services',
    subCategory: 'courtroom_legal',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80',
    alt: 'Classic wooden judge gavel and brass scales of justice on dark mahogany table',
    credit: 'Photo by Tingey Injury Law Firm on Unsplash',
    tags: ['gavel', 'scales of justice', 'courtroom', 'law firm', 'legal advice', 'courtroom_legal'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'legal-court-052',
    domain: 'legal',
    category: 'legal_services',
    subCategory: 'courtroom_legal',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=400&q=80',
    alt: 'Polished brass justice scales balance icon isolated on bright clean background',
    credit: 'Photo by Tingey Injury Law Firm on Unsplash',
    tags: ['scales of justice', 'balance', 'fairness', 'law', 'icon', 'courtroom_legal'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'legal-lib-053',
    domain: 'legal',
    category: 'legal_research',
    subCategory: 'law_library',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=400&q=80',
    alt: 'Distinguished university law library filled with thousands of leather-bound jurisprudence volumes',
    credit: 'Photo by Giammarco Boscaro on Unsplash',
    tags: ['law library', 'legal books', 'jurisprudence', 'academic law', 'law_library'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'legal-lib-054',
    domain: 'legal',
    category: 'legal_research',
    subCategory: 'law_library',
    role: 'feature_photo',
    aspectRatio: '3:2',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1453733197781-70d2de828ce5?auto=format&fit=crop&w=1500&q=80',
    thumb: 'https://images.unsplash.com/photo-1453733197781-70d2de828ce5?auto=format&fit=crop&w=400&q=80',
    alt: 'Legal scholar reviewing ancient constitutional statutes under warm reading lamp',
    credit: 'Photo by Mikhail Pavstyuk on Unsplash',
    tags: ['statutes', 'reading', 'legal research', 'case law', 'law_library'],
    width: 1500,
    height: 1000,
  },
  {
    id: 'legal-couns-055',
    domain: 'legal',
    category: 'legal_services',
    subCategory: 'legal_counsel',
    role: 'feature_photo',
    aspectRatio: '3:2',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1500&q=80',
    thumb: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=80',
    alt: 'Corporate attorney and client shaking hands over signed legal contract papers',
    credit: 'Photo by Cytonn Photography on Unsplash',
    tags: ['contract', 'signing', 'handshake', 'deal closing', 'legal_counsel'],
    width: 1500,
    height: 1000,
  },
  {
    id: 'legal-port-056',
    domain: 'legal',
    category: 'attorneys',
    subCategory: 'attorney_portrait',
    role: 'team_portrait',
    aspectRatio: '4:5',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    alt: 'Senior partner trial attorney in tailored dark suit posing for corporate law firm directory',
    credit: 'Photo by Ali Morshedlou on Unsplash',
    tags: ['senior partner', 'trial lawyer', 'lawyer portrait', 'barrister', 'attorney_portrait'],
    width: 1200,
    height: 1500,
  },
  {
    id: 'legal-port-057',
    domain: 'legal',
    category: 'attorneys',
    subCategory: 'attorney_portrait',
    role: 'team_portrait',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    alt: 'Managing partner and general counsel attorney headshot in executive office',
    credit: 'Photo by Christina @ wocintechchat.com on Unsplash',
    tags: ['female attorney', 'general counsel', 'law firm partner', 'legal headshot', 'attorney_portrait'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'legal-court-058',
    domain: 'legal',
    category: 'legal_services',
    subCategory: 'courtroom_legal',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1436450412740-6b988f486c6b?auto=format&fit=crop&w=400&q=80',
    alt: 'Grand neoclassical courthouse pillars and marble judicial hall',
    credit: 'Photo by William Warby on Unsplash',
    tags: ['courthouse', 'pillars', 'justice', 'judiciary', 'architecture', 'courtroom_legal'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'legal-couns-059',
    domain: 'legal',
    category: 'legal_services',
    subCategory: 'legal_counsel',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=400&q=80',
    alt: 'Luxury fountain pen signing legal agreement document with black ink',
    credit: 'Photo by Romain Dancre on Unsplash',
    tags: ['fountain pen', 'signature', 'contract signing', 'legal document', 'legal_counsel'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'legal-couns-060',
    domain: 'legal',
    category: 'legal_services',
    subCategory: 'legal_counsel',
    role: 'feature_photo',
    aspectRatio: '4:5',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80',
    alt: 'Corporate attorney advising executive client on compliance and regulatory matters',
    credit: 'Photo by Austin Distel on Unsplash',
    tags: ['consultation', 'corporate legal', 'client meeting', 'advisory', 'legal_counsel'],
    width: 1200,
    height: 1500,
  },
  {
    id: 'legal-lib-061',
    domain: 'legal',
    category: 'legal_research',
    subCategory: 'law_library',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=400&q=80',
    alt: 'Stack of heavy law books bound in leather on antique dark wood desk',
    credit: 'Photo by Wesley Tingey on Unsplash',
    tags: ['law books', 'statute books', 'legal library', 'study', 'law_library'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'legal-port-062',
    domain: 'legal',
    category: 'attorneys',
    subCategory: 'attorney_portrait',
    role: 'team_portrait',
    aspectRatio: '3:2',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1500&q=80',
    thumb: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
    alt: 'Litigation attorney preparing legal trial arguments in moody private chambers',
    credit: 'Photo by Hunters Race on Unsplash',
    tags: ['trial attorney', 'litigation', 'law firm', 'counsel', 'attorney_portrait'],
    width: 1500,
    height: 1000,
  },
  {
    id: 'legal-court-063',
    domain: 'legal',
    category: 'legal_services',
    subCategory: 'courtroom_legal',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?auto=format&fit=crop&w=400&q=80',
    alt: 'Classical courthouse exterior with grand monumental stone columns and pediment',
    credit: 'Photo by Claire Anderson on Unsplash',
    tags: ['supreme court', 'judicial building', 'courthouse facade', 'pillars', 'courtroom_legal'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'legal-court-064',
    domain: 'legal',
    category: 'legal_services',
    subCategory: 'courtroom_legal',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=400&q=80',
    alt: 'Bronze blindfolded Lady Justice statue holding scales with dramatic moody contrast',
    credit: 'Photo by Tingey Injury Law Firm on Unsplash',
    tags: ['lady justice', 'bronze statue', 'themis', 'justice symbol', 'courtroom_legal'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'legal-couns-065',
    domain: 'legal',
    category: 'legal_services',
    subCategory: 'legal_counsel',
    role: 'feature_photo',
    aspectRatio: '16:9',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80',
    alt: 'Legal counsel panel convening in corporate conference room for settlement review',
    credit: 'Photo by Austin Distel on Unsplash',
    tags: ['legal panel', 'advisory meeting', 'arbitration', 'settlement', 'legal_counsel'],
    width: 1920,
    height: 1080,
  },

  // =========================================================================
  // DOMAIN: CONSTRUCTION (15 Assets)
  // =========================================================================
  {
    id: 'const-heavy-066',
    domain: 'construction',
    category: 'infrastructure',
    subCategory: 'heavy_construction',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80',
    alt: 'Tower cranes building modern high-rise skyscraper silhouette against golden sunset sky',
    credit: 'Photo by Saad Salim on Unsplash',
    tags: ['tower cranes', 'high rise', 'skyscraper construction', 'sunset building', 'heavy_construction'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'const-heavy-067',
    domain: 'construction',
    category: 'trades',
    subCategory: 'heavy_construction',
    role: 'team_portrait',
    aspectRatio: '4:5',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=400&q=80',
    alt: 'Construction site foreman with yellow safety helmet and high-visibility vest',
    credit: 'Photo by Jeriden Villegas on Unsplash',
    tags: ['builder', 'hardhat', 'safety vest', 'construction worker', 'foreman', 'heavy_construction'],
    width: 1200,
    height: 1500,
  },
  {
    id: 'const-civil-068',
    domain: 'construction',
    category: 'engineering',
    subCategory: 'civil_engineering',
    role: 'feature_photo',
    aspectRatio: '3:2',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1500&q=80',
    thumb: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400&q=80',
    alt: 'Civil engineer and project superintendent reviewing structural blueprints on site',
    credit: 'Photo by ThisisEngineering RAEng on Unsplash',
    tags: ['civil engineering', 'blueprints', 'site inspection', 'structural', 'civil_engineering'],
    width: 1500,
    height: 1000,
  },
  {
    id: 'const-heavy-069',
    domain: 'construction',
    category: 'infrastructure',
    subCategory: 'heavy_construction',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=400&q=80',
    alt: 'Heavy steel beam structural framing and architectural girders of new commercial building',
    credit: 'Photo by Ricardo Gomez Angel on Unsplash',
    tags: ['steel frame', 'structural engineering', 'girders', 'industrial build', 'heavy_construction'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'const-cargo-070',
    domain: 'construction',
    category: 'logistics',
    subCategory: 'logistics_cargo',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80',
    alt: 'Automated global distribution warehouse and material handling high-bay storage',
    credit: 'Photo by Petre Babiceanu on Unsplash',
    tags: ['warehouse', 'supply chain', 'freight logistics', 'cargo storage', 'logistics_cargo'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'const-cargo-071',
    domain: 'construction',
    category: 'logistics',
    subCategory: 'logistics_cargo',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=400&q=80',
    alt: 'Intermodal cargo shipping container ship docked at industrial sea port terminal',
    credit: 'Photo by Ian Taylor on Unsplash',
    tags: ['container ship', 'sea freight', 'shipping port', 'global trade', 'logistics_cargo'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'const-cargo-072',
    domain: 'construction',
    category: 'logistics',
    subCategory: 'logistics_cargo',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=400&q=80',
    alt: 'Heavy duty warehouse electric forklift stacking wooden cargo pallets in aisle',
    credit: 'Photo by Adrian Sulyok on Unsplash',
    tags: ['forklift', 'pallets', 'warehouse equipment', 'material handling', 'logistics_cargo'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'const-arch-073',
    domain: 'construction',
    category: 'architecture',
    subCategory: 'architecture_building',
    role: 'product_thumbnail',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80',
    alt: 'Architectural drafting drawing tools, scale rulers, and building floor plans',
    credit: 'Photo by Daniel McCullough on Unsplash',
    tags: ['architecture tools', 'floor plans', 'blueprints', 'drafting', 'architecture_building'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'const-arch-074',
    domain: 'construction',
    category: 'architecture',
    subCategory: 'architecture_building',
    role: 'feature_photo',
    aspectRatio: '3:2',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1500&q=80',
    thumb: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
    alt: 'Striking modern concrete architectural facade with clean geometric lines',
    credit: 'Photo by Simone Hutsch on Unsplash',
    tags: ['concrete facade', 'modern architecture', 'geometric', 'building design', 'architecture_building'],
    width: 1500,
    height: 1000,
  },
  {
    id: 'const-civil-075',
    domain: 'construction',
    category: 'engineering',
    subCategory: 'civil_engineering',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=400&q=80',
    alt: 'Dramatic suspension bridge steel cables and structural civil engineering feats at dusk',
    credit: 'Photo by Lance Anderson on Unsplash',
    tags: ['suspension bridge', 'infrastructure', 'civil engineering', 'cables', 'civil_engineering'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'const-heavy-076',
    domain: 'construction',
    category: 'infrastructure',
    subCategory: 'heavy_construction',
    role: 'feature_photo',
    aspectRatio: '3:2',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1500&q=80',
    thumb: 'https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=400&q=80',
    alt: 'Heavy crawler excavator moving earth on massive civil infrastructure development site',
    credit: 'Photo by Shane McLendon on Unsplash',
    tags: ['excavator', 'earth moving', 'heavy machinery', 'earthworks', 'heavy_construction'],
    width: 1500,
    height: 1000,
  },
  {
    id: 'const-heavy-077',
    domain: 'construction',
    category: 'trades',
    subCategory: 'heavy_construction',
    role: 'team_portrait',
    aspectRatio: '1:1',
    background: 'studio_white',
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
    alt: 'Lead female industrial construction project engineer holding safety helmet',
    credit: 'Photo by ThisisEngineering RAEng on Unsplash',
    tags: ['construction engineer', 'project manager', 'safety helmet', 'portrait', 'heavy_construction'],
    width: 1000,
    height: 1000,
  },
  {
    id: 'const-cargo-078',
    domain: 'construction',
    category: 'logistics',
    subCategory: 'logistics_cargo',
    role: 'hero_banner',
    aspectRatio: '16:9',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1920&q=80',
    thumb: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=400&q=80',
    alt: 'Air cargo freight carrier jet loading international shipment containers on night runway tarmac',
    credit: 'Photo by Lucas van Oort on Unsplash',
    tags: ['air freight', 'aviation logistics', 'cargo plane', 'runway', 'logistics_cargo'],
    width: 1920,
    height: 1080,
  },
  {
    id: 'const-arch-079',
    domain: 'construction',
    category: 'architecture',
    subCategory: 'architecture_building',
    role: 'feature_photo',
    aspectRatio: '4:5',
    background: 'lifestyle_natural',
    url: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=1200&q=80',
    thumb: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=400&q=80',
    alt: 'Senior architect examining contemporary sustainable commercial building exterior',
    credit: 'Photo by Hunters Race on Unsplash',
    tags: ['architect', 'building design', 'commercial architecture', 'architecture_building'],
    width: 1200,
    height: 1500,
  },
  {
    id: 'const-heavy-080',
    domain: 'construction',
    category: 'infrastructure',
    subCategory: 'heavy_construction',
    role: 'feature_photo',
    aspectRatio: '1:1',
    background: 'dark_mode',
    url: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=1000&q=80',
    thumb: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=400&q=80',
    alt: 'Heavy hydraulic digger bucket operating at construction site during twilight',
    credit: 'Photo by Ricardo Gomez Angel on Unsplash',
    tags: ['hydraulic excavator', 'industrial construction', 'earth moving', 'heavy_construction'],
    width: 1000,
    height: 1000,
  },
] as const;

/**
 * Normalizes input filter to a lowercase trimmed array of strings
 */
function toArray<T>(item?: T | T[]): T[] {
  if (!item) return [];
  return Array.isArray(item) ? item : [item];
}

/**
 * Filter the curated image vault by taxonomy attributes.
 *
 * Supports single or multi-valued criteria:
 * - `domain`: 'ecommerce' | 'corporate' | 'healthcare' | 'legal' | 'construction'
 * - `subCategory`: e.g. 'women_tops' | 'men_footwear' | 'watches' | 'medical_clinic' | 'courtroom_legal' | 'heavy_construction' | 'logistics_cargo'
 * - `role`: 'hero_banner' | 'product_thumbnail' | 'feature_photo' | 'team_portrait'
 * - `aspectRatio`: '1:1' | '4:5' | '16:9' | '3:2'
 * - `background`: 'studio_white' | 'lifestyle_natural' | 'dark_mode'
 * - `category`: string or array of category strings
 * - `tags`: string or array of tags to match
 * - `search`: general text search in alt, tags, category, and credit
 * - `fallbackToDomain`: if no exact match found, fall back to matching domain
 */
export function queryCuratedVault(params: QueryCuratedVaultParams = {}): CuratedVaultImage[] {
  const {
    domain,
    category,
    subCategory,
    role,
    aspectRatio,
    background,
    tags,
    search,
    limit,
    offset = 0,
    fallbackToDomain = false,
  } = params;

  const domains = toArray(domain);
  const categories = toArray(category).map((c) => c.toLowerCase());
  const subCategories = toArray(subCategory).map((s) => s.toLowerCase());
  const roles = toArray(role);
  const aspectRatios = toArray(aspectRatio);
  const backgrounds = toArray(background);
  const searchTags = toArray(tags).map((t) => t.toLowerCase().trim());
  const searchTerm = search?.toLowerCase().trim();

  const matchesFilter = (img: CuratedVaultImage): boolean => {
    if (domains.length > 0 && !domains.includes(img.domain)) {
      return false;
    }
    if (categories.length > 0 && !categories.includes(img.category.toLowerCase())) {
      return false;
    }
    if (subCategories.length > 0 && !subCategories.includes(img.subCategory.toLowerCase())) {
      return false;
    }
    if (roles.length > 0 && !roles.includes(img.role)) {
      return false;
    }
    if (aspectRatios.length > 0 && !aspectRatios.includes(img.aspectRatio)) {
      return false;
    }
    if (backgrounds.length > 0 && !backgrounds.includes(img.background)) {
      return false;
    }
    if (searchTags.length > 0) {
      const imgTags = img.tags.map((t) => t.toLowerCase());
      const hasMatchingTag = searchTags.some(
        (st) => imgTags.includes(st) || imgTags.some((t) => t.includes(st))
      );
      if (!hasMatchingTag) {
        return false;
      }
    }
    if (searchTerm) {
      const matchInAlt = img.alt.toLowerCase().includes(searchTerm);
      const matchInCredit = img.credit ? img.credit.toLowerCase().includes(searchTerm) : false;
      const matchInCat = img.category.toLowerCase().includes(searchTerm);
      const matchInSub = img.subCategory.toLowerCase().includes(searchTerm);
      const matchInTags = img.tags.some((t) => t.toLowerCase().includes(searchTerm));
      if (!matchInAlt && !matchInCredit && !matchInCat && !matchInSub && !matchInTags) {
        return false;
      }
    }
    return true;
  };

  let results = CURATED_IMAGE_VAULT.filter(matchesFilter);

  // If strict filtering returned no results and fallbackToDomain is requested
  if (results.length === 0 && fallbackToDomain && domains.length > 0) {
    results = CURATED_IMAGE_VAULT.filter((img) => domains.includes(img.domain));
  }

  const start = Math.max(0, offset);
  if (limit && limit > 0) {
    return results.slice(start, start + limit);
  }
  return results.slice(start);
}

/**
 * Lookup a curated vault image by its unique ID.
 */
export function getCuratedImageById(id: string): CuratedVaultImage | undefined {
  return CURATED_IMAGE_VAULT.find((img) => img.id === id);
}

/**
 * Retrieve a random image matching query parameters, or undefined if no match.
 */
export function getRandomCuratedImage(
  params: QueryCuratedVaultParams = {}
): CuratedVaultImage | undefined {
  const matches = queryCuratedVault(params);
  if (matches.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * matches.length);
  return matches[randomIndex];
}

/**
 * Retrieve all curated images belonging to a specific domain.
 */
export function getCuratedImagesByDomain(domain: VaultDomain): CuratedVaultImage[] {
  return queryCuratedVault({ domain });
}

/**
 * Retrieve all curated images matching a specific UI role.
 */
export function getCuratedImagesByRole(role: VaultRole): CuratedVaultImage[] {
  return queryCuratedVault({ role });
}

/**
 * Retrieve all curated images matching a specific subcategory.
 */
export function getCuratedImagesBySubCategory(
  subCategory: VaultSubCategory | string
): CuratedVaultImage[] {
  return queryCuratedVault({ subCategory });
}

/**
 * Get summary breakdown and metadata statistics about the curated vault.
 */
export function getCuratedVaultStats(): {
  total: number;
  byDomain: Record<VaultDomain, number>;
  byRole: Record<VaultRole, number>;
  byAspectRatio: Record<VaultAspectRatio, number>;
  byBackground: Record<VaultBackground, number>;
  uniqueSubCategories: string[];
} {
  const byDomain: Record<VaultDomain, number> = {
    ecommerce: 0,
    corporate: 0,
    healthcare: 0,
    legal: 0,
    construction: 0,
  };

  const byRole: Record<VaultRole, number> = {
    hero_banner: 0,
    product_thumbnail: 0,
    feature_photo: 0,
    team_portrait: 0,
  };

  const byAspectRatio: Record<VaultAspectRatio, number> = {
    '1:1': 0,
    '4:5': 0,
    '16:9': 0,
    '3:2': 0,
  };

  const byBackground: Record<VaultBackground, number> = {
    studio_white: 0,
    lifestyle_natural: 0,
    dark_mode: 0,
  };

  const subCategoriesSet = new Set<string>();

  for (const img of CURATED_IMAGE_VAULT) {
    if (img.domain in byDomain) byDomain[img.domain]++;
    if (img.role in byRole) byRole[img.role]++;
    if (img.aspectRatio in byAspectRatio) byAspectRatio[img.aspectRatio]++;
    if (img.background in byBackground) byBackground[img.background]++;
    subCategoriesSet.add(img.subCategory);
  }

  return {
    total: CURATED_IMAGE_VAULT.length,
    byDomain,
    byRole,
    byAspectRatio,
    byBackground,
    uniqueSubCategories: Array.from(subCategoriesSet),
  };
}

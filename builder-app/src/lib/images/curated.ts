import type { StockImage } from './types';

export interface CuratedPhoto extends StockImage {
  id: string;
  industry: string;
  category: string;
  tags: string[];
  aspectRatio: '16:9' | '4:3' | '1:1' | '3:2' | '21:9';
}

export interface IndustryMetadata {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export const CURATED_INDUSTRIES: IndustryMetadata[] = [
  { id: 'saas', name: 'SaaS & Cloud', description: 'Modern software interfaces, engineering workspaces, cloud architecture', icon: 'Layers' },
  { id: 'fintech', name: 'Fintech & Banking', description: 'Digital payments, currency exchange, treasury desks, financial charts', icon: 'CreditCard' },
  { id: 'ecommerce', name: 'E-Commerce & Retail', description: 'Omnichannel shopping, package unboxing, minimalist storefronts', icon: 'ShoppingBag' },
  { id: 'luxury-goods', name: 'Luxury Goods & Haute Horlogerie', description: 'Swiss timepieces, fine jewelry, haute couture, premium leather', icon: 'Crown' },
  { id: 'perfume-cosmetics', name: 'Perfume & Cosmetics', description: 'Fragrance flacons, botanical serums, skincare rituals, beauty minimalism', icon: 'Sparkles' },
  { id: 'logistics', name: 'Logistics & Supply Chain', description: 'Automated fulfillment, global freight, intermodal transport, cargo ports', icon: 'Truck' },
  { id: 'real-estate', name: 'Prime Real Estate', description: 'Modernist penthouses, glass facades, architectural interiors', icon: 'Building' },
  { id: 'creative-agency', name: 'Creative Agency & Design', description: 'Typography sprints, brand design studios, moodboards, color swatches', icon: 'Palette' },
  { id: 'consulting', name: 'Management Consulting', description: 'Executive strategy briefings, corporate boardrooms, glass suites', icon: 'Briefcase' },
  { id: 'legal', name: 'Legal & Law Firms', description: 'Partner counsel, law libraries, courtroom architecture, leather bindings', icon: 'Scale' },
  { id: 'healthcare', name: 'Healthcare & Biotech', description: 'Clinical diagnostics, precision labs, modern hospital suites, genomics', icon: 'Activity' },
  { id: 'hospitality', name: 'Hospitality & Boutique Hotels', description: 'Bespoke resort lounges, artisan concierge, luxury travel, suites', icon: 'Compass' },
  { id: 'food-beverage', name: 'Food & Beverage / Fine Dining', description: 'Culinary plating, artisan espresso, farm-to-table, micro-roasters', icon: 'Utensils' },
  { id: 'fitness', name: 'Fitness & High Performance', description: 'Performance athletics, pilates studios, precision training, wellness', icon: 'Zap' },
  { id: 'education', name: 'Education & EdTech', description: 'Modern lecture amphitheatres, collaborative research, digital learning', icon: 'GraduationCap' },
  { id: 'cybersecurity', name: 'Cybersecurity & InfoSec', description: 'Network defense centers, cryptographic code matrices, hardware keys', icon: 'ShieldCheck' },
  { id: 'architecture', name: 'Modern Architecture', description: 'Brutalist concrete, parametric pavilions, cantilevered glass pavilions', icon: 'Maximize2' },
  { id: 'web3', name: 'Web3 & Decentralized', description: 'Hardware wallets, holographic crypto nodes, digital asset vaults', icon: 'Cpu' },
  { id: 'sustainability', name: 'Sustainability & CleanTech', description: 'Wind energy arrays, solar farms, circular economy, eco laboratories', icon: 'Leaf' },
  { id: 'artificial-intelligence', name: 'Artificial Intelligence', description: 'Neural cluster compute, generative algorithms, robotics laboratories', icon: 'Bot' },
  { id: 'entertainment-media', name: 'Entertainment & Media', description: 'Virtual production studios, audio synthesis consoles, broadcast sets', icon: 'Film' },
];

function unsplashUrl(photoId: string, width = 1400, height = 900, crop = 'entropy'): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&h=${height}&q=85&crop=${crop}`;
}

function unsplashThumb(photoId: string): string {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=480&h=320&q=80&crop=entropy`;
}

export const CURATED_STOCK_PHOTOS: CuratedPhoto[] = [
  // 1. SaaS & Cloud
  {
    id: 'saas-1',
    industry: 'saas',
    category: 'Workspaces',
    url: unsplashUrl('1498050108023-c5249f4df085'),
    thumb: unsplashThumb('1498050108023-c5249f4df085'),
    alt: 'Minimalist software engineer workstation with clean dual code displays and mechanical keyboard',
    credit: 'Photo by Christopher Gower on Unsplash',
    tags: ['saas', 'software', 'developer', 'coding', 'tech', 'workspace', 'computer'],
    aspectRatio: '16:9',
  },
  {
    id: 'saas-2',
    industry: 'saas',
    category: 'Data & Dashboard',
    url: unsplashUrl('1551288049-bebda4e38f71'),
    thumb: unsplashThumb('1551288049-bebda4e38f71'),
    alt: 'Analytics dashboard and telemetry visualization on modern monitor in dark studio',
    credit: 'Photo by Luke Chesser on Unsplash',
    tags: ['saas', 'analytics', 'dashboard', 'data', 'metrics', 'charts', 'cloud'],
    aspectRatio: '16:9',
  },
  {
    id: 'saas-3',
    industry: 'saas',
    category: 'Infrastructure',
    url: unsplashUrl('1558494949-ef010cbdcc31'),
    thumb: unsplashThumb('1558494949-ef010cbdcc31'),
    alt: 'Enterprise datacenter server rack blue illumination and fiber optic routing',
    credit: 'Photo by Taylor Vick on Unsplash',
    tags: ['saas', 'server', 'datacenter', 'cloud', 'infrastructure', 'devops', 'hardware'],
    aspectRatio: '16:9',
  },
  {
    id: 'saas-4',
    industry: 'saas',
    category: 'Collaboration',
    url: unsplashUrl('1522071820081-009f0129c71c'),
    thumb: unsplashThumb('1522071820081-009f0129c71c'),
    alt: 'Product design sprint team collaborating around laptop in sunlight loft',
    credit: 'Photo by Annie Spratt on Unsplash',
    tags: ['saas', 'team', 'collaboration', 'startup', 'planning', 'meeting', 'agile'],
    aspectRatio: '16:9',
  },

  // 2. Fintech & Banking
  {
    id: 'fintech-1',
    industry: 'fintech',
    category: 'Payments',
    url: unsplashUrl('1559526324-4b87b5e36e44'),
    thumb: unsplashThumb('1559526324-4b87b5e36e44'),
    alt: 'Sleek metal contactless card transaction at modern retail POS terminal',
    credit: 'Photo by Blake Wisz on Unsplash',
    tags: ['fintech', 'banking', 'payment', 'card', 'checkout', 'money', 'contactless'],
    aspectRatio: '16:9',
  },
  {
    id: 'fintech-2',
    industry: 'fintech',
    category: 'Trading & Markets',
    url: unsplashUrl('1611974789855-9c2a0a7236a3'),
    thumb: unsplashThumb('1611974789855-9c2a0a7236a3'),
    alt: 'Financial candlestick chart and market volume graph showing bullish growth trend',
    credit: 'Photo by Maxim Hopman on Unsplash',
    tags: ['fintech', 'finance', 'investing', 'market', 'trading', 'stocks', 'forex'],
    aspectRatio: '16:9',
  },
  {
    id: 'fintech-3',
    industry: 'fintech',
    category: 'Mobile Banking',
    url: unsplashUrl('1563986768609-322da13575f3'),
    thumb: unsplashThumb('1563986768609-322da13575f3'),
    alt: 'User checking banking application balance and wealth portfolio on smartphone',
    credit: 'Photo by rupixen on Unsplash',
    tags: ['fintech', 'mobile', 'banking', 'wallet', 'crypto', 'app', 'transfer'],
    aspectRatio: '16:9',
  },
  {
    id: 'fintech-4',
    industry: 'fintech',
    category: 'Treasury',
    url: unsplashUrl('1590283603385-17ffb3a7f29f'),
    thumb: unsplashThumb('1590283603385-17ffb3a7f29f'),
    alt: 'Currency trading desk with real-time multi-currency charts and liquidity analysis',
    credit: 'Photo by Markus Spiske on Unsplash',
    tags: ['fintech', 'treasury', 'fx', 'global', 'crossborder', 'settlement'],
    aspectRatio: '16:9',
  },

  // 3. E-Commerce & Retail
  {
    id: 'ecommerce-1',
    industry: 'ecommerce',
    category: 'Packaging',
    url: unsplashUrl('1549465220-1a8b9238cd48'),
    thumb: unsplashThumb('1549465220-1a8b9238cd48'),
    alt: 'Luxury minimalist packaging with bespoke ribbon and tactile gift box',
    credit: 'Photo by Jazmin Quaynor on Unsplash',
    tags: ['ecommerce', 'packaging', 'unboxing', 'retail', 'brand', 'delivery', 'luxury'],
    aspectRatio: '16:9',
  },
  {
    id: 'ecommerce-2',
    industry: 'ecommerce',
    category: 'Storefront',
    url: unsplashUrl('1441986300917-64674bd600d8'),
    thumb: unsplashThumb('1441986300917-64674bd600d8'),
    alt: 'Curated architectural boutique interior with natural lighting and wood shelving',
    credit: 'Photo by Clark Street Mercantile on Unsplash',
    tags: ['ecommerce', 'store', 'boutique', 'fashion', 'retail', 'shop', 'interior'],
    aspectRatio: '16:9',
  },
  {
    id: 'ecommerce-3',
    industry: 'ecommerce',
    category: 'Apparel',
    url: unsplashUrl('1489987707025-afc232f7ea0f'),
    thumb: unsplashThumb('1489987707025-afc232f7ea0f'),
    alt: 'Minimalist hanger display of sustainable organic cotton linen garments',
    credit: 'Photo by Priscilla Du Preez on Unsplash',
    tags: ['ecommerce', 'clothing', 'fashion', 'apparel', 'cotton', 'store'],
    aspectRatio: '16:9',
  },

  // 4. Luxury Goods & Haute Horlogerie
  {
    id: 'luxury-1',
    industry: 'luxury-goods',
    category: 'Horology',
    url: unsplashUrl('1523275335684-37898b6baf30'),
    thumb: unsplashThumb('1523275335684-37898b6baf30'),
    alt: 'High precision luxury automatic wristwatch on muted matte background with chamfered dial',
    credit: 'Photo by Rachit Tank on Unsplash',
    tags: ['luxury-goods', 'watch', 'horology', 'swiss', 'luxury', 'timepiece', 'precision'],
    aspectRatio: '16:9',
  },
  {
    id: 'luxury-2',
    industry: 'luxury-goods',
    category: 'Jewelry',
    url: unsplashUrl('1535632066927-ab7c9ab60908'),
    thumb: unsplashThumb('1535632066927-ab7c9ab60908'),
    alt: 'Solid 18k gold diamond pendant and earrings catching soft studio ambient highlights',
    credit: 'Photo by Sabrianna on Unsplash',
    tags: ['luxury-goods', 'jewelry', 'gold', 'diamonds', 'elegance', 'gems'],
    aspectRatio: '16:9',
  },
  {
    id: 'luxury-3',
    industry: 'luxury-goods',
    category: 'Leatherware',
    url: unsplashUrl('1548036328-c9fa89d128fa'),
    thumb: unsplashThumb('1548036328-c9fa89d128fa'),
    alt: 'Full grain calfskin leather luxury briefcase handcrafted with saddle stitching',
    credit: 'Photo by Creative Exchange on Unsplash',
    tags: ['luxury-goods', 'leather', 'handbag', 'bag', 'artisan', 'craftsmanship'],
    aspectRatio: '16:9',
  },

  // 5. Perfume & Cosmetics
  {
    id: 'perfume-1',
    industry: 'perfume-cosmetics',
    category: 'Fragrance',
    url: unsplashUrl('1592945403244-b3fbafd7f539'),
    thumb: unsplashThumb('1592945403244-b3fbafd7f539'),
    alt: 'Glass flacon perfume bottle on stone plinth with soft sunlight shadows and botanicals',
    credit: 'Photo by Laura Chouette on Unsplash',
    tags: ['perfume-cosmetics', 'perfume', 'fragrance', 'cosmetics', 'beauty', 'luxury', 'serum'],
    aspectRatio: '16:9',
  },
  {
    id: 'perfume-2',
    industry: 'perfume-cosmetics',
    category: 'Skincare',
    url: unsplashUrl('1556228720-195a672e8a03'),
    thumb: unsplashThumb('1556228720-195a672e8a03'),
    alt: 'Amber dropper bottle containing botanical face oil beside raw ceramic dish',
    credit: 'Photo by Curology on Unsplash',
    tags: ['perfume-cosmetics', 'skincare', 'serum', 'dropper', 'wellness', 'cosmetics'],
    aspectRatio: '16:9',
  },
  {
    id: 'perfume-3',
    industry: 'perfume-cosmetics',
    category: 'Beauty Rituals',
    url: unsplashUrl('1522337360788-8b13dee7a37e'),
    thumb: unsplashThumb('1522337360788-8b13dee7a37e'),
    alt: 'Velvet matte makeup pigments and minimalist brush in editorial fashion layout',
    credit: 'Photo by Raphael Lovaski on Unsplash',
    tags: ['perfume-cosmetics', 'makeup', 'beauty', 'cosmetics', 'pigments'],
    aspectRatio: '16:9',
  },

  // 6. Logistics & Supply Chain
  {
    id: 'logistics-1',
    industry: 'logistics',
    category: 'Maritime Cargo',
    url: unsplashUrl('1586528116311-ad8dd3c8310d'),
    thumb: unsplashThumb('1586528116311-ad8dd3c8310d'),
    alt: 'Intermodal container terminal with automated cranes and freight vessels at sunset',
    credit: 'Photo by CHUTTERSNAP on Unsplash',
    tags: ['logistics', 'shipping', 'freight', 'cargo', 'containers', 'supply chain', 'port'],
    aspectRatio: '16:9',
  },
  {
    id: 'logistics-2',
    industry: 'logistics',
    category: 'Fulfillment',
    url: unsplashUrl('1553413077-190dd305871c'),
    thumb: unsplashThumb('1553413077-190dd305871c'),
    alt: 'High-bay robotic automated distribution fulfillment center warehouse',
    credit: 'Photo by Petre Bimblis on Unsplash',
    tags: ['logistics', 'warehouse', 'automation', 'storage', 'distribution', 'inventory'],
    aspectRatio: '16:9',
  },
  {
    id: 'logistics-3',
    industry: 'logistics',
    category: 'Fleet Transport',
    url: unsplashUrl('1519003722824-194d4455a60c'),
    thumb: unsplashThumb('1519003722824-194d4455a60c'),
    alt: 'Commercial highway freight logistics truck moving through mountain pass',
    credit: 'Photo by Matthew T Rader on Unsplash',
    tags: ['logistics', 'truck', 'fleet', 'transport', 'delivery', 'express'],
    aspectRatio: '16:9',
  },

  // 7. Prime Real Estate
  {
    id: 'real-estate-1',
    industry: 'real-estate',
    category: 'Penthouse',
    url: unsplashUrl('1600596542815-ffad4c1539a9'),
    thumb: unsplashThumb('1600596542815-ffad4c1539a9'),
    alt: 'Modernist luxury estate with cantilevered glass terrace, infinity pool, and landscaped courtyard',
    credit: 'Photo by R Architecture on Unsplash',
    tags: ['real-estate', 'villa', 'mansion', 'luxury home', 'property', 'interior', 'pool'],
    aspectRatio: '16:9',
  },
  {
    id: 'real-estate-2',
    industry: 'real-estate',
    category: 'Architecture Living',
    url: unsplashUrl('1600585154340-be6161a56a0c'),
    thumb: unsplashThumb('1600585154340-be6161a56a0c'),
    alt: 'Floor-to-ceiling glass living salon opening out to lush botanical valley vista',
    credit: 'Photo by R Architecture on Unsplash',
    tags: ['real-estate', 'interior', 'salon', 'penthouse', 'architecture', 'residence'],
    aspectRatio: '16:9',
  },
  {
    id: 'real-estate-3',
    industry: 'real-estate',
    category: 'Skyline Residence',
    url: unsplashUrl('1512917774080-9991f1c4c750'),
    thumb: unsplashThumb('1512917774080-9991f1c4c750'),
    alt: 'Contemporary residence with immaculate wood cladding and perimeter ambient illumination',
    credit: 'Photo by Frames For Your Heart on Unsplash',
    tags: ['real-estate', 'home', 'facade', 'modern', 'architectural', 'development'],
    aspectRatio: '16:9',
  },

  // 8. Creative Agency & Design
  {
    id: 'agency-1',
    industry: 'creative-agency',
    category: 'Design Studio',
    url: unsplashUrl('1531403009284-440f080d1e12'),
    thumb: unsplashThumb('1531403009284-440f080d1e12'),
    alt: 'Designers reviewing typographic grid wireframes and UI interaction flow on desk',
    credit: 'Photo by Balázs Kétyi on Unsplash',
    tags: ['creative-agency', 'design', 'agency', 'branding', 'creative', 'wireframe', 'ui'],
    aspectRatio: '16:9',
  },
  {
    id: 'agency-2',
    industry: 'creative-agency',
    category: 'Art Direction',
    url: unsplashUrl('1507238691740-187a5b1d37b8'),
    thumb: unsplashThumb('1507238691740-187a5b1d37b8'),
    alt: 'Creative director working on laptop with Pantone color swatch fans and sketchbook',
    credit: 'Photo by Farzad Nazifi on Unsplash',
    tags: ['creative-agency', 'pantone', 'color', 'brand', 'art direction', 'studio'],
    aspectRatio: '16:9',
  },
  {
    id: 'agency-3',
    industry: 'creative-agency',
    category: 'Workshop',
    url: unsplashUrl('1497366216548-37526070297c'),
    thumb: unsplashThumb('1497366216548-37526070297c'),
    alt: 'Airy creative loft studio with concrete polished floors, skylights, and design library',
    credit: 'Photo by Sean Pollock on Unsplash',
    tags: ['creative-agency', 'loft', 'office', 'studio', 'agency', 'interior'],
    aspectRatio: '16:9',
  },

  // 9. Management Consulting
  {
    id: 'consulting-1',
    industry: 'consulting',
    category: 'Boardroom',
    url: unsplashUrl('1486406146926-c627a92ad1ab'),
    thumb: unsplashThumb('1486406146926-c627a92ad1ab'),
    alt: 'Modern glass corporate skyscraper reflective facade rising into clear morning sky',
    credit: 'Photo by Sean Pollock on Unsplash',
    tags: ['consulting', 'corporate', 'business', 'skyscraper', 'finance', 'advisory'],
    aspectRatio: '16:9',
  },
  {
    id: 'consulting-2',
    industry: 'consulting',
    category: 'Executive Meeting',
    url: unsplashUrl('1557804506-669a67965ba0'),
    thumb: unsplashThumb('1557804506-669a67965ba0'),
    alt: 'Strategic consulting advisory presentation to executive leadership at mahogany table',
    credit: 'Photo by Austin Distel on Unsplash',
    tags: ['consulting', 'strategy', 'advisory', 'presentation', 'leadership', 'meeting'],
    aspectRatio: '16:9',
  },
  {
    id: 'consulting-3',
    industry: 'consulting',
    category: 'Client Briefing',
    url: unsplashUrl('1573496359142-b8d87734a5a2'),
    thumb: unsplashThumb('1573496359142-b8d87734a5a2'),
    alt: 'Senior management consultant reviewing business transformation documents with partner',
    credit: 'Photo by Christina @ wocintechchat.com on Unsplash',
    tags: ['consulting', 'consultant', 'interview', 'audit', 'corporate', 'expert'],
    aspectRatio: '16:9',
  },

  // 10. Legal & Law Firms
  {
    id: 'legal-1',
    industry: 'legal',
    category: 'Law Library',
    url: unsplashUrl('1589829545856-d10d557cf95f'),
    thumb: unsplashThumb('1589829545856-d10d557cf95f'),
    alt: 'Bronze Lady Justice balance scale resting on polished walnut desk before law volumes',
    credit: 'Photo by Tingey Injury Law Firm on Unsplash',
    tags: ['legal', 'law', 'scales', 'justice', 'attorney', 'court', 'counsel'],
    aspectRatio: '16:9',
  },
  {
    id: 'legal-2',
    industry: 'legal',
    category: 'Partner Office',
    url: unsplashUrl('1450133064473-71024230f91b'),
    thumb: unsplashThumb('1450133064473-71024230f91b'),
    alt: 'Classical jurisprudence marble courthouse columns with ceremonial staircase',
    credit: 'Photo by Willian Justen de Vasconcellos on Unsplash',
    tags: ['legal', 'courthouse', 'pillars', 'justice', 'litigation', 'government'],
    aspectRatio: '16:9',
  },
  {
    id: 'legal-3',
    industry: 'legal',
    category: 'Contract Signing',
    url: unsplashUrl('1453733197781-7040c5798993'),
    thumb: unsplashThumb('1453733197781-7040c5798993'),
    alt: 'Fountain pen resting on executed commercial contract and verified affidavit seal',
    credit: 'Photo by Scott Graham on Unsplash',
    tags: ['legal', 'contract', 'signature', 'compliance', 'agreement', 'document'],
    aspectRatio: '16:9',
  },

  // 11. Healthcare & Biotech
  {
    id: 'healthcare-1',
    industry: 'healthcare',
    category: 'Laboratory',
    url: unsplashUrl('1532187863486-abf9dbad1b69'),
    thumb: unsplashThumb('1532187863486-abf9dbad1b69'),
    alt: 'Clinical biomedical scientist pipetting genomics samples in sterile research cleanroom',
    credit: 'Photo by Louis Reed on Unsplash',
    tags: ['healthcare', 'biotech', 'laboratory', 'medical', 'science', 'genomics', 'pharma'],
    aspectRatio: '16:9',
  },
  {
    id: 'healthcare-2',
    industry: 'healthcare',
    category: 'Clinic',
    url: unsplashUrl('1519494026892-80bbd2d6fd0d'),
    thumb: unsplashThumb('1519494026892-80bbd2d6fd0d'),
    alt: 'Architectural healthcare center atrium with natural greenery and calming patient lounge',
    credit: 'Photo by Martha Dominguez de Gouveia on Unsplash',
    tags: ['healthcare', 'hospital', 'clinic', 'medicine', 'wellness', 'health', 'patient'],
    aspectRatio: '16:9',
  },
  {
    id: 'healthcare-3',
    industry: 'healthcare',
    category: 'Consultation',
    url: unsplashUrl('1576091160399-112ba8d25d1d'),
    thumb: unsplashThumb('1576091160399-112ba8d25d1d'),
    alt: 'Physician explaining digital diagnostic scan telemetry on high-resolution medical tablet',
    credit: 'Photo by National Cancer Institute on Unsplash',
    tags: ['healthcare', 'doctor', 'physician', 'telehealth', 'diagnostics', 'telemetry'],
    aspectRatio: '16:9',
  },

  // 12. Hospitality & Boutique Hotels
  {
    id: 'hospitality-1',
    industry: 'hospitality',
    category: 'Resort Lounge',
    url: unsplashUrl('1566073771259-6a8506099945'),
    thumb: unsplashThumb('1566073771259-6a8506099945'),
    alt: 'Boutique resort infinity pool at dusk reflecting warm amber illumination and palm silhouettes',
    credit: 'Photo by Edvin Johansson on Unsplash',
    tags: ['hospitality', 'hotel', 'resort', 'travel', 'vacation', 'luxury', 'pool'],
    aspectRatio: '16:9',
  },
  {
    id: 'hospitality-2',
    industry: 'hospitality',
    category: 'Bespoke Suite',
    url: unsplashUrl('1582719478250-c89cae4dc85b'),
    thumb: unsplashThumb('1582719478250-c89cae4dc85b'),
    alt: 'Architectural hotel master suite with crisp tailored linen and scenic ocean terrace',
    credit: 'Photo by Roberto Nickson on Unsplash',
    tags: ['hospitality', 'bedroom', 'suite', 'stay', 'tourism', 'interior'],
    aspectRatio: '16:9',
  },
  {
    id: 'hospitality-3',
    industry: 'hospitality',
    category: 'Concierge',
    url: unsplashUrl('1542314831-c6a4d27f677b'),
    thumb: unsplashThumb('1542314831-c6a4d27f677b'),
    alt: 'Artisan marble reception foyer in historic landmark grand hotel',
    credit: 'Photo by Manuel Moreno on Unsplash',
    tags: ['hospitality', 'concierge', 'reception', 'lobby', 'grand hotel'],
    aspectRatio: '16:9',
  },

  // 13. Food & Beverage / Fine Dining
  {
    id: 'food-1',
    industry: 'food-beverage',
    category: 'Haute Cuisine',
    url: unsplashUrl('1504674900247-0877df9cc836'),
    thumb: unsplashThumb('1504674900247-0877df9cc836'),
    alt: 'Michelin star culinary plating with edible florals, microgreens, and reduced emulsion',
    credit: 'Photo by Lily Banse on Unsplash',
    tags: ['food-beverage', 'food', 'culinary', 'dining', 'gourmet', 'restaurant', 'chef'],
    aspectRatio: '16:9',
  },
  {
    id: 'food-2',
    industry: 'food-beverage',
    category: 'Artisan Coffee',
    url: unsplashUrl('1495474472287-4d71bcdd2085'),
    thumb: unsplashThumb('1495474472287-4d71bcdd2085'),
    alt: 'Barista pouring specialty single-origin espresso with microfoam latte art',
    credit: 'Photo by Nathan Dumlao on Unsplash',
    tags: ['food-beverage', 'coffee', 'cafe', 'espresso', 'barista', 'roaster'],
    aspectRatio: '16:9',
  },
  {
    id: 'food-3',
    industry: 'food-beverage',
    category: 'Cocktail Craft',
    url: unsplashUrl('1514362545857-3bc16c4c7d1b'),
    thumb: unsplashThumb('1514362545857-3bc16c4c7d1b'),
    alt: 'Smoked botanical craft cocktail served over hand-cut crystal clear ice sphere',
    credit: 'Photo by Kobby Mendez on Unsplash',
    tags: ['food-beverage', 'cocktail', 'mixology', 'bar', 'lounge', 'spirits'],
    aspectRatio: '16:9',
  },

  // 14. Fitness & High Performance
  {
    id: 'fitness-1',
    industry: 'fitness',
    category: 'Athletics',
    url: unsplashUrl('1517838277536-f5f99be501cd'),
    thumb: unsplashThumb('1517838277536-f5f99be501cd'),
    alt: 'High-performance athlete conditioning workout in dramatic chiaroscuro industrial gym',
    credit: 'Photo by Scott Webb on Unsplash',
    tags: ['fitness', 'workout', 'training', 'gym', 'athlete', 'performance', 'strength'],
    aspectRatio: '16:9',
  },
  {
    id: 'fitness-2',
    industry: 'fitness',
    category: 'Pilates & Yoga',
    url: unsplashUrl('1544367567-0f2fcb009e0b'),
    thumb: unsplashThumb('1544367567-0f2fcb009e0b'),
    alt: 'Reformer pilates practitioner in serene daylight wood sanctuary focusing on mindfulness',
    credit: 'Photo by Jared Rice on Unsplash',
    tags: ['fitness', 'yoga', 'pilates', 'wellness', 'mindfulness', 'stretch', 'balance'],
    aspectRatio: '16:9',
  },
  {
    id: 'fitness-3',
    industry: 'fitness',
    category: 'Recovery',
    url: unsplashUrl('1571019614242-c5c5dee9f50b'),
    thumb: unsplashThumb('1571019614242-c5c5dee9f50b'),
    alt: 'Modern cold plunge cryotherapy and cedar sauna facility for elite athlete recovery',
    credit: 'Photo by Jonathan Borba on Unsplash',
    tags: ['fitness', 'recovery', 'sauna', 'athletics', 'therapy', 'vitality'],
    aspectRatio: '16:9',
  },

  // 15. Education & EdTech
  {
    id: 'education-1',
    industry: 'education',
    category: 'University Campus',
    url: unsplashUrl('1523240795612-9a054b0db644'),
    thumb: unsplashThumb('1523240795612-9a054b0db644'),
    alt: 'Collegiate academic lecture atrium with students engaged in interactive seminar',
    credit: 'Photo by Priscilla Du Preez on Unsplash',
    tags: ['education', 'learning', 'university', 'students', 'college', 'school', 'academy'],
    aspectRatio: '16:9',
  },
  {
    id: 'education-2',
    industry: 'education',
    category: 'Digital Learning',
    url: unsplashUrl('1501504905252-473c47e087f8'),
    thumb: unsplashThumb('1501504905252-473c47e087f8'),
    alt: 'Remote scholar conducting computational research on notebook with library archives',
    credit: 'Photo by Nick Morrison on Unsplash',
    tags: ['education', 'research', 'edtech', 'online learning', 'study', 'course'],
    aspectRatio: '16:9',
  },
  {
    id: 'education-3',
    industry: 'education',
    category: 'Maker Lab',
    url: unsplashUrl('1581092918056-0c4c3acd3789'),
    thumb: unsplashThumb('1581092918056-0c4c3acd3789'),
    alt: 'Engineering students testing prototype robotics arm and embedded circuits',
    credit: 'Photo by Science in HD on Unsplash',
    tags: ['education', 'stem', 'engineering', 'robotics', 'workshop'],
    aspectRatio: '16:9',
  },

  // 16. Cybersecurity & InfoSec
  {
    id: 'cyber-1',
    industry: 'cybersecurity',
    category: 'SOC Center',
    url: unsplashUrl('1550751827-4bd374c3f58b'),
    thumb: unsplashThumb('1550751827-4bd374c3f58b'),
    alt: 'Network security operations defense room with real-time packet threat maps and firewalls',
    credit: 'Photo by Markus Spiske on Unsplash',
    tags: ['cybersecurity', 'security', 'infosec', 'hacker', 'firewall', 'encryption', 'code'],
    aspectRatio: '16:9',
  },
  {
    id: 'cyber-2',
    industry: 'cybersecurity',
    category: 'Zero Trust',
    url: unsplashUrl('1563089145-599997674d42'),
    thumb: unsplashThumb('1563089145-599997674d42'),
    alt: 'Abstract cyber defense node grid glowing with indigo cryptographic authentication tokens',
    credit: 'Photo by FlyD on Unsplash',
    tags: ['cybersecurity', 'cryptography', 'auth', 'zerotrust', 'network', 'identity'],
    aspectRatio: '16:9',
  },
  {
    id: 'cyber-3',
    industry: 'cybersecurity',
    category: 'Hardware Security',
    url: unsplashUrl('1618005182384-a83a8bd57fbe'),
    thumb: unsplashThumb('1618005182384-a83a8bd57fbe'),
    alt: 'Cryptographic silicon key chip microarchitecture with laser-etched security perimeter',
    credit: 'Photo by Milad Fakurian on Unsplash',
    tags: ['cybersecurity', 'hardware', 'chip', 'vault', 'privacy', 'keys'],
    aspectRatio: '16:9',
  },

  // 17. Modern Architecture
  {
    id: 'arch-1',
    industry: 'architecture',
    category: 'Cantilever Structure',
    url: unsplashUrl('1513694203232-719a280e022f'),
    thumb: unsplashThumb('1513694203232-719a280e022f'),
    alt: 'Parametric geometric facade on contemporary museum with sweeping shadow play',
    credit: 'Photo by Danist Soh on Unsplash',
    tags: ['architecture', 'building', 'facade', 'modern', 'geometric', 'design', 'structure'],
    aspectRatio: '16:9',
  },
  {
    id: 'arch-2',
    industry: 'architecture',
    category: 'Brutalism & Glass',
    url: unsplashUrl('1486406146926-c627a92ad1ab'),
    thumb: unsplashThumb('1486406146926-c627a92ad1ab'),
    alt: 'Polished architectural glass curtain wall reflecting geometric azure sky',
    credit: 'Photo by Sean Pollock on Unsplash',
    tags: ['architecture', 'glass', 'skyline', 'monument', 'urban'],
    aspectRatio: '16:9',
  },
  {
    id: 'arch-3',
    industry: 'architecture',
    category: 'Atrium',
    url: unsplashUrl('1497366811353-6870744d04b2'),
    thumb: unsplashThumb('1497366811353-6870744d04b2'),
    alt: 'Volumetric architectural light well with sculptural concrete staircase',
    credit: 'Photo by Sean Pollock on Unsplash',
    tags: ['architecture', 'staircase', 'concrete', 'atrium', 'interior'],
    aspectRatio: '16:9',
  },

  // 18. Web3 & Decentralized
  {
    id: 'web3-1',
    industry: 'web3',
    category: 'Consensus',
    url: unsplashUrl('1639762681485-074b7f938ba0'),
    thumb: unsplashThumb('1639762681485-074b7f938ba0'),
    alt: 'Decentralized distributed ledger nodes rendered in iridescent 3D topology mesh',
    credit: 'Photo by Shubham Dhage on Unsplash',
    tags: ['web3', 'crypto', 'blockchain', 'ethereum', 'bitcoin', 'nodes', 'defi'],
    aspectRatio: '16:9',
  },
  {
    id: 'web3-2',
    industry: 'web3',
    category: 'Digital Assets',
    url: unsplashUrl('1622979135225-d2ba269bc1df'),
    thumb: unsplashThumb('1622979135225-d2ba269bc1df'),
    alt: 'Futuristic holographic digital token coin floating over dark reflective matrix',
    credit: 'Photo by Executium on Unsplash',
    tags: ['web3', 'token', 'cryptocurrency', 'asset', 'smartcontract', 'wallet'],
    aspectRatio: '16:9',
  },
  {
    id: 'web3-3',
    industry: 'web3',
    category: 'Cryptographic Protocol',
    url: unsplashUrl('1639322537228-f710d846310a'),
    thumb: unsplashThumb('1639322537228-f710d846310a'),
    alt: 'Complex polyhedral mathematical structure illustrating zero knowledge proofs',
    credit: 'Photo by Shubham Dhage on Unsplash',
    tags: ['web3', 'zkp', 'protocol', 'decentralized', 'p2p', 'chain'],
    aspectRatio: '16:9',
  },

  // 19. Sustainability & CleanTech
  {
    id: 'sustain-1',
    industry: 'sustainability',
    category: 'Renewable Power',
    url: unsplashUrl('1466611653911-95081537e5b7'),
    thumb: unsplashThumb('1466611653911-95081537e5b7'),
    alt: 'Offshore wind turbine generators emerging from azure mist at sunrise',
    credit: 'Photo by Nicholas Doherty on Unsplash',
    tags: ['sustainability', 'energy', 'wind', 'green', 'clean tech', 'renewable', 'climate'],
    aspectRatio: '16:9',
  },
  {
    id: 'sustain-2',
    industry: 'sustainability',
    category: 'Solar Array',
    url: unsplashUrl('1509391365360-2e959784a276'),
    thumb: unsplashThumb('1509391365360-2e959784a276'),
    alt: 'High-efficiency photovoltaic solar farm panel tracking morning sunlight rays',
    credit: 'Photo by American Public Power Association on Unsplash',
    tags: ['sustainability', 'solar', 'photovoltaic', 'clean', 'panels', 'power'],
    aspectRatio: '16:9',
  },
  {
    id: 'sustain-3',
    industry: 'sustainability',
    category: 'Circular Ecology',
    url: unsplashUrl('1542601906990-b4d3fb778b09'),
    thumb: unsplashThumb('1542601906990-b4d3fb778b09'),
    alt: 'Lush temperate rain forest canopy celebrating ecological conservation and balance',
    credit: 'Photo by Casey Horner on Unsplash',
    tags: ['sustainability', 'forest', 'nature', 'carbon', 'ecology', 'biodiversity'],
    aspectRatio: '16:9',
  },

  // 20. Artificial Intelligence
  {
    id: 'ai-1',
    industry: 'artificial-intelligence',
    category: 'Neural Networks',
    url: unsplashUrl('1677442136019-21780ecad995'),
    thumb: unsplashThumb('1677442136019-21780ecad995'),
    alt: 'Neural network deep learning computational graph visualization with luminous connection nodes',
    credit: 'Photo by Steve Johnson on Unsplash',
    tags: ['artificial-intelligence', 'ai', 'machine learning', 'neural', 'deep learning', 'tech'],
    aspectRatio: '16:9',
  },
  {
    id: 'ai-2',
    industry: 'artificial-intelligence',
    category: 'GPU Clusters',
    url: unsplashUrl('1618005182384-a83a8bd57fbe'),
    thumb: unsplashThumb('1618005182384-a83a8bd57fbe'),
    alt: 'High-density GPU tensor accelerator processor board with iridescent light diffraction',
    credit: 'Photo by Milad Fakurian on Unsplash',
    tags: ['artificial-intelligence', 'tensor', 'gpu', 'accelerator', 'compute', 'hardware'],
    aspectRatio: '16:9',
  },
  {
    id: 'ai-3',
    industry: 'artificial-intelligence',
    category: 'Robotics',
    url: unsplashUrl('1485827404703-89b55fcc595e'),
    thumb: unsplashThumb('1485827404703-89b55fcc595e'),
    alt: 'Autonomous robotic arm performing micro-precision assembly in advanced clean laboratory',
    credit: 'Photo by Alex Knight on Unsplash',
    tags: ['artificial-intelligence', 'robotics', 'automation', 'future', 'cybernetics'],
    aspectRatio: '16:9',
  },

  // 21. Entertainment & Media
  {
    id: 'media-1',
    industry: 'entertainment-media',
    category: 'Virtual Production',
    url: unsplashUrl('1598488035139-bdbb2231ce04'),
    thumb: unsplashThumb('1598488035139-bdbb2231ce04'),
    alt: 'Professional soundstage recording studio console with motorized analog faders',
    credit: 'Photo by Wes Hicks on Unsplash',
    tags: ['entertainment-media', 'music', 'studio', 'audio', 'sound', 'production', 'broadcast'],
    aspectRatio: '16:9',
  },
  {
    id: 'media-2',
    industry: 'entertainment-media',
    category: 'Cinematography',
    url: unsplashUrl('1485846234645-a62644f84728'),
    thumb: unsplashThumb('1485846234645-a62644f84728'),
    alt: 'Cinema anamorphic lens filming on location under cinematic spotlight rigging',
    credit: 'Photo by Jakob Owens on Unsplash',
    tags: ['entertainment-media', 'film', 'cinema', 'camera', 'movie', 'video'],
    aspectRatio: '16:9',
  },
];

/**
 * Intelligent image matching function that queries against industry, tags, categories, and alt descriptions.
 *
 * CRITICAL ZERO-SLOP GUARANTEE:
 * If a query has zero matches or is empty, this function falls back to top editorial images across
 * categories so an empty array is NEVER returned!
 */
export function getCuratedStockImages(
  queryOrIndustry?: string | null,
  count = 20,
): StockImage[] {
  const normalized = (queryOrIndustry || '').toLowerCase().trim();

  // If no query, return an editorial curated cross-section
  if (!normalized || normalized === 'all' || normalized === 'featured') {
    return CURATED_STOCK_PHOTOS.slice(0, Math.max(1, count)).map(toStockImage);
  }

  // Check direct industry slug match first
  const byIndustry = CURATED_STOCK_PHOTOS.filter(
    (photo) => photo.industry.toLowerCase() === normalized,
  );
  if (byIndustry.length > 0) {
    const list = byIndustry.slice(0, count);
    if (list.length >= count) return list.map(toStockImage);
    // Fill remainder with general editorial
    const fill = CURATED_STOCK_PHOTOS.filter((p) => !byIndustry.includes(p)).slice(
      0,
      count - list.length,
    );
    return [...list, ...fill].map(toStockImage);
  }

  // Token-based fuzzy match across tags, alt, industry name, category
  const tokens = normalized.split(/[\s,+/_-]+/).filter(Boolean);

  const scored = CURATED_STOCK_PHOTOS.map((photo) => {
    let score = 0;
    const pInd = photo.industry.toLowerCase();
    const pCat = photo.category.toLowerCase();
    const pAlt = photo.alt.toLowerCase();
    const pTags = photo.tags.map((t) => t.toLowerCase());

    for (const token of tokens) {
      if (pInd.includes(token)) score += 10;
      if (pCat.includes(token)) score += 7;
      if (pTags.some((t) => t.includes(token))) score += 5;
      if (pAlt.includes(token)) score += 3;
    }

    return { photo, score };
  });

  const matching = scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.photo);

  if (matching.length >= count) {
    return matching.slice(0, count).map(toStockImage);
  }

  // If some matches exist, append editorial favorites to reach requested count
  if (matching.length > 0) {
    const existingIds = new Set(matching.map((m) => m.id));
    const fallbacks = CURATED_STOCK_PHOTOS.filter((p) => !existingIds.has(p.id));
    return [...matching, ...fallbacks.slice(0, count - matching.length)].map(
      toStockImage,
    );
  }

  // Zero-slop fallback guarantee: Never return empty array!
  // Return the best editorial photos across varied industries.
  return CURATED_STOCK_PHOTOS.slice(0, Math.max(1, count)).map(toStockImage);
}

function toStockImage(curated: CuratedPhoto): StockImage {
  return {
    url: curated.url,
    thumb: curated.thumb,
    alt: curated.alt,
    credit: curated.credit,
  };
}

export function getCuratedIndustries(): IndustryMetadata[] {
  return CURATED_INDUSTRIES;
}

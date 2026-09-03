/**
 * Starter content set — `store-coffee`: Specialty Coffee Beans & Precision Brewing Instruments.
 * Authentic copy for direct-trade single origins, precision stepless burr grinders, temperature-controlled kettles, and manual espresso tools.
 */

import type { StarterContentSet } from '@/site/archetypes/types';
import type { CatalogItem } from '@/site/schema';

const coffeeProducts: CatalogItem[] = [
  {
    id: 'cb-burr-grinder',
    name: 'Precision Stepless Electric Burr Grinder',
    price: 420,
    priceUnit: ' AUD',
    sku: 'AR-GRD-ELEC-64MM',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    description:
      '64mm DLC-coated flat burr electric grinder with single-dose zero-retention bellows, brushless DC motor, and micrometric stepless dial for espresso to cold brew.',
    category: 'Grinders',
    badge: 'Barista Choice',
    popular: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 94,
    features: [
      '64mm Diamond-Like-Carbon (DLC) flat burrs',
      'True single-dosing with sub-0.1g retention bellows',
      'Ultra-quiet 1400 RPM brushless motor with auto-stop',
      'Anti-static plasma generator eliminating grounds clumping',
    ],
  },
  {
    id: 'cb-gooseneck-kettle',
    name: 'Gooseneck Temperature-Controlled Pour-Over Kettle',
    price: 185,
    priceUnit: ' AUD',
    sku: 'AR-KTL-GOOSE-09L',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80',
    description:
      '900ml precision pour kettle in matte black stainless steel featuring 1200W rapid heating, 1-degree temperature hold, and balanced counterweighted ergonomic handle.',
    category: 'Brewing Equipment',
    badge: 'Bestseller',
    popular: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 118,
    features: [
      '1°C precision PID digital temperature control (40°C–100°C)',
      'Patented fluted gooseneck spout for laminar pour flow',
      '60-minute automatic temperature hold mode',
      'High-contrast OLED brew stopwatch display',
    ],
  },
  {
    id: 'cb-ethiopian-yirgacheffe',
    name: 'Ethiopian Yirgacheffe Single-Origin Natural (250g)',
    price: 26,
    priceUnit: ' AUD',
    sku: 'AR-BEA-YIRG-NAT250',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    description:
      'Grade 1 heirloom micro-lot from the Idido washing station, sun-dried on raised African beds. Notes of wild blueberry, jasmine blossoms, and bergamot citrus.',
    category: 'Single Origins',
    badge: 'Fresh Roast',
    popular: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 165,
    features: [
      'SCA Cup Score: 89.5 Points',
      'Altitude: 2,150m MASL (Idido, Yirgacheffe)',
      'Natural anaerobic sun-dried processing',
      'Roasted weekly in Melbourne on Bellwether zero-emission roasters',
    ],
  },
  {
    id: 'cb-v60-station',
    name: 'Ceramic V60 Hand-Drip Brewing Station',
    price: 78,
    priceUnit: ' AUD',
    sku: 'AR-BRW-V60-CERAM',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    description:
      'Handcrafted Arita-yaki porcelain size-02 dripper seated on a solid walnut and brushed brass drip stand with a 600ml borosilicate glass server.',
    category: 'Brewing Equipment',
    inStock: true,
    rating: 4.8,
    reviewCount: 52,
    features: [
      'Traditional 60-degree conical geometry with spiral thermal ribs',
      'High-density Japanese porcelain for optimal heat retention',
      'Solid FSC American walnut base with silicone spill tray',
      'Includes 100-pack unbleached natural paper filters',
    ],
  },
  {
    id: 'cb-travel-tumbler',
    name: 'Double-Wall Vacuum Insulated Travel Tumbler 350ml',
    price: 42,
    priceUnit: ' AUD',
    sku: 'AR-ACC-TMBL-350',
    image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80',
    description:
      '18/8 kitchen-grade stainless steel travel mug lined with ceramic coating to eliminate metallic taste, featuring a 360-degree leak-proof drinking lid.',
    category: 'Drinkware',
    inStock: true,
    rating: 4.8,
    reviewCount: 140,
    features: [
      'True Taste interior ceramic coating (preserves delicate coffee aromatics)',
      'Keeps coffee hot for 6 hours / cold for 12 hours',
      '100% Leak-proof 360° aroma-releasing lid',
      'Fits standard automotive and bicycle bottle cages',
    ],
  },
  {
    id: 'cb-hand-grinder',
    name: 'Stainless Steel Manual Hand Coffee Grinder',
    price: 145,
    priceUnit: ' AUD',
    sku: 'AR-GRD-HND-48SS',
    image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&w=800&q=80',
    description:
      'CNC-machined aluminum body hand grinder equipped with 48mm 420-stainless heptagonal burrs, dual ball bearings, and external click adjustment ring.',
    category: 'Grinders',
    inStock: true,
    rating: 4.9,
    reviewCount: 76,
    features: [
      '48mm High-nitrogen stainless steel 7-star conical burrs',
      'External top adjustment ring with 0.022mm per click step',
      'Dual precision bearings eliminate burr wobble',
      'Includes padded EVA travel case and camel-hair cleaning brush',
    ],
  },
  {
    id: 'cb-coldbrew-carafe',
    name: 'Micro-Filter Cold Brew Immersion Carafe 1L',
    price: 64,
    priceUnit: ' AUD',
    sku: 'AR-BRW-COLD-1L',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    description:
      'Thermal shock-resistant borosilicate glass carafe with an ultra-fine 15-micron laser-etched stainless steel core filter for silky, sediment-free cold brew concentrate.',
    category: 'Brewing Equipment',
    inStock: true,
    rating: 4.7,
    reviewCount: 68,
    features: [
      '1000ml capacity (yields 4–6 servings of concentrate)',
      'Ultrafine 15-micron dual mesh eliminates fines and sludge',
      'Airtight silicone seal keeps brew fresh in fridge for up to 14 days',
      'Dishwasher safe and BPA-free construction',
    ],
  },
  {
    id: 'cb-precision-scale',
    name: 'Digital High-Precision Coffee Scale with Timer',
    price: 88,
    priceUnit: ' AUD',
    sku: 'AR-SCL-PREC-01G',
    image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80',
    description:
      '0.1g ultra-responsive digital brewing scale with auto-tare, flow-rate indicator, integrated brew stopwatch, and water-resistant matte silicone pad.',
    category: 'Precision Tools',
    badge: 'Essential',
    popular: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 89,
    features: [
      '0.1g measurement sensitivity with instant 20ms response time',
      'Real-time flow rate display (g/s) for consistent pour distribution',
      'Auto-detect pour start and auto-timer activation',
      'Rechargeable USB-C lithium battery with 30-hour continuous life',
    ],
  },
  {
    id: 'cb-gesha-reserve',
    name: 'Colombian Gesha Reserve Limited Harvest (200g)',
    price: 52,
    priceUnit: ' AUD',
    sku: 'AR-BEA-GSH-COL200',
    image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=800&q=80',
    description:
      'Competition-grade Gesha from Finca El Paraíso in Cauca, Colombia. 48-hour thermal shock anaerobic fermentation yielding explosive aromas of peach nectar, rose water, and lychee.',
    category: 'Rare Reserves',
    badge: 'Rare Lot (92+ Cup)',
    popular: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 41,
    features: [
      'SCA Cup Score: 92.25 Points',
      'Thermal Shock Anaerobic Fermentation',
      'Varietal: 100% Green Tip Gesha (1,950m MASL)',
      'Shipped in nitrogen-flushed, resealable degassing pouch',
    ],
  },
  {
    id: 'cb-tamping-kit',
    name: 'Espresso Tamping & Distribution Kit (58.5mm)',
    price: 110,
    priceUnit: ' AUD',
    sku: 'AR-ESP-TMP-SET58',
    image: 'https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?auto=format&fit=crop&w=800&q=80',
    description:
      'Precision 58.5mm calibrated spring-loaded constant-pressure tamper paired with a 9-needle WDT clump distribution tool and walnut docking station.',
    category: 'Espresso Tools',
    inStock: true,
    rating: 4.9,
    reviewCount: 63,
    features: [
      '30 lb constant spring-loaded compression with leveling rim',
      '58.5mm CNC stainless steel base tailored for precision baskets',
      '0.25mm stainless steel WDT distribution needles',
      'Hand-turned solid walnut stand with non-slip silicone base',
    ],
  },
  {
    id: 'cb-lever-espresso',
    name: 'Lever-Style Manual Espresso Machine',
    price: 680,
    priceUnit: ' AUD',
    sku: 'AR-ESP-LVR-MAN',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    description:
      'Solid forged brass and mirror-polished steel manual lever espresso press capable of genuine 9-bar extraction with real-time pressure gauge profiling.',
    category: 'Espresso Machines',
    badge: 'Masterwork',
    inStock: true,
    rating: 5.0,
    reviewCount: 31,
    features: [
      'Full manual control over pre-infusion and pressure profile (up to 12 bar)',
      'Precision top-mounted analogue pressure gauge',
      'Commercial 58mm portafilter with bottomless walnut handle',
      'Requires zero electricity—engineered for a lifetime of espressos',
    ],
  },
  {
    id: 'cb-chemex-glass',
    name: 'Chemex 8-Cup Handblown Glass Coffeemaker',
    price: 95,
    priceUnit: ' AUD',
    sku: 'AR-BRW-CHMX-8CP',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    description:
      'Iconic hourglass pour-over brewer crafted from non-porous handblown borosilicate glass, complete with polished wood collar and leather tie.',
    category: 'Brewing Equipment',
    inStock: true,
    rating: 4.8,
    reviewCount: 83,
    features: [
      'Handblown non-porous borosilicate glass that will not absorb odors',
      '40 oz (1200ml) capacity for brewing multiple cups simultaneously',
      'Solid birch collar with rawhide leather lace',
      'Produces clean, crystal-clear, sediment-free coffee without bitterness',
    ],
  },
];

export const storeCoffee: StarterContentSet = {
  id: 'store-coffee',
  archetype: 'store',
  name: 'Artisan Roast & Precision Brew Lab',
  description:
    'Direct-trade single-origin coffees, precision stepless burr grinders, temperature-controlled kettles, and manual espresso tools crafted in Melbourne.',
  niche: 'Specialty coffee beans & precision brewing instruments',
  tags: [
    'specialty-coffee',
    'single-origin',
    'coffee-beans',
    'espresso-tools',
    'pour-over',
    'burr-grinders',
    'melbourne-coffee',
    'dtc-store',
  ],
  needsPersonalization: false,
  themeId: 'espresso-amber',
  business: {
    name: 'Artisan Roast & Brew Lab Ltd',
    shortName: 'Artisan Roast Lab',
    registrationNumber: 'ACN 618 920 411',
    jurisdiction: 'Melbourne, Victoria, Australia (ASIC)',
    governingLaw: 'the laws of Victoria and the Commonwealth of Australia',
    registeredAddress: '142 Flinders Lane, Melbourne, VIC 3000, Australia',
    email: 'hello@artisanroastlab.example',
    phone: '+61 3 9654 8120',
    website: 'artisanroastlab.example',
    supportHours: 'Monday – Saturday, 07:00 – 16:00 (AEST)',
  },
  brand: { logoText: 'Artisan Roast Lab' },
  meta: {
    title: 'Artisan Roast Lab — Specialty Coffee Beans & Precision Brewing Instruments',
    description:
      'Direct-trade micro-lots, precision stepless grinders, digital scales, and manual lever espresso machines roasted and calibrated in Melbourne.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Roasted Weekly in Melbourne • 100% Direct Trade',
        headline: 'Precision instruments for the pursuit of the',
        accentText: 'perfect morning extraction',
        subtitle:
          'From high-altitude Ethiopian and Colombian Gesha micro-lots to 64mm flat burr grinders and PID temperature kettles, Artisan Roast Lab elevates coffee brewing into an exact science.',
        primaryCta: { label: 'Explore The Roastery', href: '/catalog' },
        secondaryCta: { label: 'Brewing Ratio Guides', href: '/about' },
        trustBadges: ['Roasted Within 48 Hours of Dispatch', '100% Direct-Trade Farm Partnerships', 'Precision Barista Calibration'],
      },
      trust: {
        variant: 'pills',
        title: 'Specialty coffee roastery standards & barista equipment',
        items: [
          'SCA Cup Scores Exceeding 88+ Points',
          'Zero-Emission Eco-Roasters',
          'Micro-Metric Burr Alignment Guaranteed',
          'Complimentary Australia & Worldwide Express Over $80',
        ],
      },
      catalogue: {
        eyebrow: 'Roastery & Gear Edit',
        title: 'The Melbourne Coffee Capsule',
        description:
          'Freshly roasted single-origin coffees, calibrated tamping tools, and precision electric grinders designed for espresso and filter purists.',
        currency: 'AUD',
        layout: 'products',
        items: coffeeProducts,
      },
      highlights: {
        eyebrow: 'Craft Pillars',
        title: 'Where agronomic terroir meets thermal precision',
        description:
          'Great coffee is not accidental. It is the result of dedicated smallholder farmers, zero-defect roasting, and micron-accurate water flow.',
        items: [
          {
            icon: 'Flame',
            title: 'Weekly Small-Batch Roasting',
            description:
              'Every batch is profiled with infrared cropster curves and roasted on all-electric zero-emission roasters to preserve delicate floral volatiles.',
          },
          {
            icon: 'Scale',
            title: 'Micrometric Burr Geometry',
            description:
              'Our titanium and DLC burr sets undergo optical laser interferometry alignment to eliminate grind fines and ensure uniform particle distribution.',
          },
          {
            icon: 'HeartHandshake',
            title: 'Direct-Trade Farm Equity',
            description:
              'We pay on average 280% above Fair Trade minimums directly to farming families in Yirgacheffe, Huila, Antigua, and Nyeri.',
          },
          {
            icon: 'Sparkles',
            title: 'Nitrogen-Flushed Freshness',
            description:
              'Bags are sealed with one-way degassing valves and flushed with food-grade nitrogen to preserve origin aromatics for up to 90 days.',
          },
        ],
      },
      reviews: {
        eyebrow: 'Barista & Enthusiast Reviews',
        title: 'Poured in cafes and home kitchens',
        items: [
          {
            name: 'Liam Connelly',
            role: 'Australian Aeropress Champion',
            location: 'Melbourne',
            rating: 5,
            text: 'The Ethiopian Yirgacheffe Natural is an absolute fruit bomb. Brewed on the V60 with their Gooseneck kettle, the clarity of blueberry and bergamot is mind-blowing.',
          },
          {
            name: 'Sarah Nakamura',
            role: 'Head Barista & Trainer',
            location: 'Sydney',
            rating: 5,
            text: 'The 64mm Stepless Burr Grinder delivers fluffier, clump-free espresso grounds than machines costing triple the price. The sub-0.1g retention is genuine.',
          },
          {
            name: 'Daniel Moreau',
            role: 'Coffee Roaster & Q Grader',
            location: 'Perth',
            rating: 5,
            text: 'The Colombian Gesha Reserve is one of the cleanest thermal shock coffees I’ve evaluated this year. Impeccable roasting profile with zero baking or astringency.',
          },
        ],
      },
      cta: {
        headline: 'Upgrade your morning coffee ritual today',
        subtitle:
          'Orders placed before 2 PM AEST ship same-day with nitrogen-flushed roast freshness and our 100% taste satisfaction guarantee.',
        primaryCta: { label: 'Shop The Entire Coffee Lineup', href: '/catalog' },
        secondaryCta: { label: 'Explore Extraction Guides', href: '/about' },
        guarantee: '100% Freshness Guarantee • 30-Day Hassle-Free Equipment Returns',
      },
    },
    offerings: {
      header: {
        headline: 'The Roastery & Brewing Laboratory',
        subtitle:
          'Explore our complete collection of direct-trade single origin beans, rare competition micro-lots, and precision manual & electric coffee instruments.',
      },
      catalogue: {
        eyebrow: 'Complete Inventory',
        title: 'Beans, Grinders & Brewing Instruments',
        description: '12 precision coffee instruments and roasted origins calibrated for the ultimate cup.',
        currency: 'AUD',
        layout: 'products',
        categories: [
          'Single Origins',
          'Rare Reserves',
          'Grinders',
          'Brewing Equipment',
          'Espresso Tools',
          'Espresso Machines',
          'Precision Tools',
          'Drinkware',
        ],
        items: coffeeProducts,
      },
      trust: {
        variant: 'pills',
        title: 'Specialty coffee credentials',
        items: [
          'SCA 88+ Point Specialty Grade',
          'Zero-Emission Eco-Roasting',
          'DLC & Titanium Flat Burrs',
          'Free Express Shipping Over $80',
        ],
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            q: 'When was my coffee roasted and how should I store it?',
            a: 'All our coffees are roasted within 48 hours of dispatch and stamped with the exact roast date. We recommend resting whole beans 7–10 days post-roast for peak CO2 degassing and flavor clarity. Store in a cool, dark place in the original one-way valve pouch.',
          },
          {
            q: 'Can the 64mm Stepless Electric Grinder grind for both espresso and filter pour-over?',
            a: 'Yes. The micrometric stepless dial offers 0.01mm resolution across 90 steps, allowing seamless transitions from fine Turkish and 9-bar espresso to medium pour-over and coarse cold brew without retention.',
          },
          {
            q: 'Do you offer whole bean or ground coffee?',
            a: 'We strongly recommend ordering Whole Bean to preserve delicate aromatics. However, we also offer custom grind settings (Espresso, Aeropress, Pour-Over, Chemex, French Press) ground to order immediately before packing.',
          },
          {
            q: 'What is your equipment warranty?',
            a: 'All electric grinders, kettles, and scales come with a 2-Year Comprehensive Barista Warranty with rapid repair and replacement support in Australia and worldwide.',
          },
        ],
      },
      cta: {
        headline: 'Need tailored advice for your espresso or pour-over setup?',
        subtitle: 'Our Melbourne baristas are on standby to help you choose the ideal grind size, origin, or brewing method.',
        primaryCta: { label: 'Ask A Barista', href: '/contact' },
        secondaryCta: { label: 'Explore Origin Stories', href: '/about' },
        guarantee: 'Express courier delivery • Free returns on unused hardware within 30 days',
      },
    },
    about: {
      header: {
        headline: 'Born in the Laneways of Melbourne',
        subtitle: 'Founded on Flinders Lane with an obsessive passion for origin transparency and extraction science.',
      },
      story: {
        eyebrow: 'Our Philosophy',
        title: 'From farm soil to the final 30-second pour',
        description: 'Artisan Roast Lab bridges the gap between dedicated coffee farmers and discerning home brewers who care deeply about taste clarity.',
        blocks: [
          {
            heading: 'Direct-Trade Relationships',
            body: 'We visit our farming partners annually in Colombia, Ethiopia, Kenya, and Guatemala. By skipping multinational brokers, we ensure farmers receive premium compensation for rigorous lot separation, organic composting, and selective ripe-cherry hand picking.',
          },
          {
            heading: 'Zero-Emission Infrared Roasting',
            body: 'Traditional gas drum roasters emit significant greenhouse gases and scorch delicate bean chaff. Our Melbourne roastery is powered by 100% renewable electricity using precision closed-loop air convection to reveal the pure terroir of each coffee lot.',
          },
        ],
        highlights: [
          '100% Specialty Arabica with certified SCA scores above 88+',
          'Weekly small-batch roasting in Melbourne, Australia',
          'Home-compostable coffee bags with renewable bio-valves',
          'Free brewing guides and extraction ratio charts with every order',
        ],
      },
      values: {
        eyebrow: 'Core Standards',
        title: 'The four cornerstones of our lab',
        items: [
          {
            icon: 'HeartHandshake',
            title: 'Farm Price Transparency',
            description: 'We publish the FOB purchase price paid to every farming family directly on our product packaging.',
          },
          {
            icon: 'Sparkles',
            title: 'Micron Precision',
            description: 'We test all brewing gear with digital refractometers to ensure optimal 18–22% total dissolved solids (TDS).',
          },
          {
            icon: 'Leaf',
            title: 'Zero Waste & Carbon Neutral',
            description: 'From 100% compostable bags to recyclable aluminum canisters, we treat the planet with reverence.',
          },
          {
            icon: 'GraduationCap',
            title: 'Brewing Education',
            description: 'We believe knowledge belongs to all coffee lovers. We host open cupping sessions and free dial-in workshops.',
          },
        ],
      },
      cta: {
        headline: 'Start your specialty coffee journey',
        subtitle: 'Discover our seasonal single origin lots and precision extraction instruments.',
        primaryCta: { label: 'Browse The Collection', href: '/catalog' },
        secondaryCta: { label: 'Contact The Lab', href: '/contact' },
      },
    },
    contact: {
      header: {
        headline: 'Contact The Roastery & Lab',
        subtitle: 'Have a question about a coffee lot, grind calibration, subscription, or wholesale supply? Reach out to our Flinders Lane team.',
      },
      form: {
        showDetails: true,
      },
      faq: {
        title: 'Roastery & Order Inquiries',
        items: [
          {
            q: 'Can I pick up fresh coffee beans directly from the Melbourne roastery?',
            a: 'Yes, select "Local Roastery Pickup" at checkout to collect your beans from 142 Flinders Lane, Melbourne during lab opening hours.',
          },
          {
            q: 'Do you offer wholesale beans and machinery for specialty cafes?',
            a: 'Yes. We supply bespoke cafe blends, single-origin rotating micro-lots, commercial espresso machines, and barista training programs.',
          },
        ],
      },
    },
  },
};

export default storeCoffee;

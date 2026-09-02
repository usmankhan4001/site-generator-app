import { PuckComponent, PuckPageData } from '../tech/types';
import { RetailTemplate, RetailTemplateMetadata, ProductItem } from './types';

export interface RetailBentoItem {
  title: string;
  description: string;
  badge: string;
  image: string;
}

export interface RetailTestimonial {
  quote: string;
  author: string;
  role: string;
  location?: string;
  avatar: string;
  rating: number;
}

export interface RetailFaq {
  q: string;
  a: string;
}

export interface RetailFactoryInput {
  metadata: RetailTemplateMetadata;
  home: {
    hero: {
      badge: string;
      headline: string;
      accentText: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
      image: string;
      trustBadges: string[];
    };
    trustBar: {
      guarantees: string[];
      metrics: { value: string; label: string }[];
    };
    bento: {
      title: string;
      subtitle: string;
      items: RetailBentoItem[];
    };
    featuredProducts: ProductItem[];
    storyHighlight?: {
      title: string;
      subtitle: string;
      description: string;
      image: string;
      highlights: string[];
    };
    testimonials: RetailTestimonial[];
    faq: RetailFaq[];
    cta: {
      headline: string;
      subtitle: string;
      primaryCta: string;
      secondaryCta: string;
      guarantee: string;
    };
  };
  about: {
    heroHeadline: string;
    heroSubtitle: string;
    story: string;
    craftsmanship: string;
    values: { title: string; description: string }[];
    milestones: { year: string; title: string; description: string }[];
  };
  catalog: {
    heroHeadline: string;
    heroSubtitle: string;
    products: ProductItem[];
    categories?: string[];
  };
  contact: {
    heroHeadline: string;
    heroSubtitle: string;
    responseTime: string;
    showroomOrHub?: { name: string; address: string; hours: string; phone: string };
  };
  policies?: {
    customPrivacy?: { heading: string; body: string }[];
    customTerms?: { heading: string; body: string }[];
    customRefund?: { heading: string; body: string }[];
    customShipping?: { heading: string; body: string }[];
  };
}

export function buildRetailTemplate(input: RetailFactoryInput): RetailTemplate {
  const { metadata, home, about, catalog, contact, policies } = input;
  const reg = metadata.corporateRegistration;
  const currency = metadata.currency || 'USD';

  const headerComponent: PuckComponent = {
    type: 'Header',
    props: {
      brandName: metadata.name,
      logoText: metadata.name.split(' ')[0],
      navItems: [
        { label: 'Home', href: '/' },
        { label: 'Catalog', href: '/catalog' },
        { label: 'Our Story', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
      ctaText: metadata.subCategory === 'wholesale' ? 'Request Trade Catalog' : 'Shop Collections',
      ctaHref: '/catalog',
    },
  };

  const footerComponent: PuckComponent = {
    type: 'Footer',
    props: {
      companyName: metadata.name,
      entityName: reg.entityName,
      registrationNumber: reg.registrationNumber,
      registeredAddress: reg.registeredAddress,
      contactEmail: reg.contactEmail,
      contactPhone: reg.contactPhone,
      governingLaw: reg.governingLaw,
      links: [
        { label: 'Catalog & Inventory', href: '/catalog' },
        { label: 'Brand Heritage', href: '/about' },
        { label: 'Contact & Support', href: '/contact' },
        { label: 'Privacy Policy', href: '/policies/privacy' },
        { label: 'Terms of Sale', href: '/policies/terms' },
        { label: 'Returns & Refunds', href: '/policies/refund' },
        { label: 'Shipping & Delivery', href: '/policies/shipping' },
      ],
      copyright: `© ${new Date().getFullYear()} ${reg.entityName}. All rights reserved.`,
    },
  };

  // 1. Home Page ('/')
  const homePage: PuckPageData = {
    title: `${metadata.name} | ${metadata.industry}`,
    root: { title: metadata.name, props: { theme: metadata.recommendedTheme } },
    content: [
      headerComponent,
      {
        type: 'RetailHero',
        props: {
          badge: home.hero.badge,
          headline: home.hero.headline,
          accentText: home.hero.accentText,
          subtitle: home.hero.subtitle,
          primaryCta: { label: home.hero.primaryCta, href: '/catalog' },
          secondaryCta: { label: home.hero.secondaryCta, href: '/about' },
          image: home.hero.image,
          trustBadges: home.hero.trustBadges,
        },
      },
      {
        type: 'TrustBadgesBar',
        props: {
          guarantees: home.trustBar.guarantees,
          metrics: home.trustBar.metrics,
        },
      },
      {
        type: 'BentoCollections',
        props: {
          title: home.bento.title,
          subtitle: home.bento.subtitle,
          items: home.bento.items,
        },
      },
      {
        type: 'ProductShowcase',
        props: {
          title: metadata.subCategory === 'wholesale' ? 'Featured Wholesale Inventories' : 'Curated Signature Items',
          subtitle: metadata.subCategory === 'wholesale' ? 'Bulk MOQ commercial grade supplies ready for immediate dispatch.' : 'Artisanal masterpieces crafted with rare materials and uncompromising precision.',
          currency,
          products: home.featuredProducts,
          ctaText: 'View Complete Catalog',
          ctaHref: '/catalog',
        },
      },
      ...(home.storyHighlight
        ? [
            {
              type: 'StoryBanner',
              props: home.storyHighlight,
            },
          ]
        : []),
      {
        type: 'Testimonials',
        props: {
          title: metadata.subCategory === 'wholesale' ? 'Endorsed by Commercial Procurement Directors' : 'Loved by Discerning Patrons',
          subtitle: 'Verified feedback from genuine clients and institutional accounts.',
          testimonials: home.testimonials,
        },
      },
      {
        type: 'FAQ',
        props: {
          title: 'Frequently Asked Questions',
          subtitle: 'Orders, fulfillment standards, warranties, and international logistics.',
          faqs: home.faq,
        },
      },
      {
        type: 'RetailCTA',
        props: {
          headline: home.cta.headline,
          subtitle: home.cta.subtitle,
          primaryCta: { label: home.cta.primaryCta, href: '/catalog' },
          secondaryCta: { label: home.cta.secondaryCta, href: '/contact' },
          guarantee: home.cta.guarantee,
        },
      },
      footerComponent,
    ],
  };

  // 2. About Page ('/about')
  const aboutPage: PuckPageData = {
    title: `Our Heritage & Craftsmanship | ${metadata.name}`,
    root: { title: `About Us | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'AboutHero',
        props: {
          badge: 'Brand Heritage & Provenance',
          headline: about.heroHeadline,
          subtitle: about.heroSubtitle,
        },
      },
      {
        type: 'BrandStory',
        props: {
          title: 'The Art of Uncompromising Quality',
          story: about.story,
          craftsmanship: about.craftsmanship,
        },
      },
      {
        type: 'CoreValues',
        props: {
          title: 'Foundational Principles',
          subtitle: 'The non-negotiable commitments governing every product we release.',
          values: about.values,
        },
      },
      {
        type: 'CompanyHistory',
        props: {
          title: 'Milestones & Provenance',
          subtitle: 'Our journey from bespoke workshop to international recognition.',
          milestones: about.milestones,
        },
      },
      {
        type: 'CorporateRegistration',
        props: {
          title: 'Corporate Identity & Statutory Compliance',
          subtitle: 'Transparent corporate governance and legal disclosures.',
          entityName: reg.entityName,
          registrationNumber: reg.registrationNumber,
          jurisdiction: reg.jurisdiction,
          registeredAddress: reg.registeredAddress,
          governingLaw: reg.governingLaw,
          taxId: reg.vatOrTaxId || 'Applicable upon invoice',
          contactEmail: reg.contactEmail,
          contactPhone: reg.contactPhone,
        },
      },
      {
        type: 'RetailCTA',
        props: {
          headline: 'Experience Our Collections First-Hand',
          subtitle: 'Explore our latest releases or consult with our private concierge team.',
          primaryCta: { label: 'Explore Catalog', href: '/catalog' },
          secondaryCta: { label: 'Contact Concierge', href: '/contact' },
          guarantee: 'Insured worldwide courier delivery with white-glove inspection.',
        },
      },
      footerComponent,
    ],
  };

  // 3. Catalog Page ('/catalog')
  const catalogPage: PuckPageData = {
    title: `Catalog & Inventory | ${metadata.name}`,
    root: { title: `Catalog | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'CatalogHero',
        props: {
          badge: metadata.subCategory === 'wholesale' ? 'Commercial B2B Catalog' : 'Curated Masterpieces',
          headline: catalog.heroHeadline,
          subtitle: catalog.heroSubtitle,
          categories: catalog.categories || ['All Collections', 'Signature Series', 'Limited Editions', 'New Arrivals'],
        },
      },
      {
        type: 'ProductCatalogGrid',
        props: {
          currency,
          products: catalog.products,
          isWholesale: metadata.subCategory === 'wholesale',
        },
      },
      {
        type: 'ShippingGuaranteeBanner',
        props: {
          title: 'Direct From Workshop with Guaranteed Integrity',
          items: [
            { icon: 'ShieldCheck', title: 'Authenticity Guaranteed', description: 'Every item accompanied by serialized documentation and certificate of origin.' },
            { icon: 'Truck', title: 'Insured Courier Freight', description: 'Dispatched via premium express carriers with real-time GPS tracking and transit insurance.' },
            { icon: 'RefreshCw', title: '30-Day Inspection Period', description: 'Hassle-free return and exchange policy for total customer peace of mind.' },
            { icon: 'Headphones', title: 'Dedicated Product Support', description: 'Direct access to specialist consultants for sizing, care, or technical integration.' },
          ],
        },
      },
      {
        type: 'RetailCTA',
        props: {
          headline: metadata.subCategory === 'wholesale' ? 'Need Custom Volume Specifications or OEM?' : 'Looking for a Bespoke Custom Commission?',
          subtitle: 'Our specialist client advisors are available to handle custom dimensions, materials, and private requests.',
          primaryCta: { label: 'Inquire with Specialists', href: '/contact' },
          secondaryCta: { label: 'Review Shipping Policy', href: '/policies/shipping' },
          guarantee: 'Comprehensive warranties and dedicated after-sales service on all items.',
        },
      },
      footerComponent,
    ],
  };

  // 4. Contact Page ('/contact')
  const contactPage: PuckPageData = {
    title: `Contact & Client Services | ${metadata.name}`,
    root: { title: `Contact | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'ContactHero',
        props: {
          headline: contact.heroHeadline,
          subtitle: contact.heroSubtitle,
          responseTime: contact.responseTime,
        },
      },
      {
        type: 'RetailContactForm',
        props: {
          title: metadata.subCategory === 'wholesale' ? 'Request Wholesale Quotation / Open Account' : 'Client Concierge & Order Inquiries',
          subtitle: 'Submit your inquiry below. Our dedicated advisors will respond with itemized details.',
          isWholesale: metadata.subCategory === 'wholesale',
          fields: [
            { name: 'fullName', label: 'Full Name / Representative', type: 'text', required: true },
            { name: 'email', label: 'Email Address', type: 'email', required: true },
            { name: 'phone', label: 'Direct Telephone', type: 'tel', required: false },
            { name: 'inquiryType', label: 'Nature of Inquiry', type: 'select', options: metadata.subCategory === 'wholesale' ? ['Bulk Purchase / RFQ', 'Custom OEM Specification', 'Sample Order Request', 'Payment & Credit Terms'] : ['Order Status & Tracking', 'Bespoke / Custom Order', 'Product Sizing & Materials', 'General Inquiry'], required: true },
            { name: 'message', label: 'Message & Requirements', type: 'textarea', required: true },
          ],
          submitButtonText: metadata.subCategory === 'wholesale' ? 'Submit Commercial Inquiry' : 'Send Message',
        },
      },
      {
        type: 'ContactDetails',
        props: {
          entityName: reg.entityName,
          registrationNumber: reg.registrationNumber,
          registeredAddress: reg.registeredAddress,
          contactEmail: reg.contactEmail,
          contactPhone: reg.contactPhone,
          supportHours: 'Monday - Friday: 09:00 - 18:00 (Local Time)',
          showroomOrHub: contact.showroomOrHub || {
            name: 'Corporate Headquarters & Logistics Hub',
            address: reg.registeredAddress,
            hours: 'Mon-Fri 09:00-18:00',
            phone: reg.contactPhone,
          },
        },
      },
      footerComponent,
    ],
  };

  // 5. Policies: Privacy ('/policies/privacy')
  const privacyPage: PuckPageData = {
    title: `Privacy Policy | ${metadata.name}`,
    root: { title: `Privacy Policy | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'PolicyDocument',
        props: {
          title: 'E-Commerce & Consumer Privacy Policy',
          lastUpdated: 'September 2026',
          entityName: reg.entityName,
          registrationNumber: reg.registrationNumber,
          jurisdiction: reg.jurisdiction,
          sections: policies?.customPrivacy || [
            {
              heading: '1. Regulatory Identification & Data Controller',
              body: `${reg.entityName} (Company Registration No. ${reg.registrationNumber}), located at ${reg.registeredAddress}, acts as the registered Data Controller under applicable international privacy laws (including EU GDPR, UK GDPR, and CCPA). We process personal data strictly in connection with transaction fulfillment, order logistics, account administration, and statutory merchant compliance.`,
            },
            {
              heading: '2. Information We Collect for Order Fulfillment',
              body: 'When placing an order or registering for trade accounts, we collect contact details (name, email, telephone), shipping and billing addresses, and payment transaction tokens. Payment card data is processed exclusively through certified Level-1 PCI-DSS payment gateways; our servers never store raw credit card numbers or security CVVs.',
            },
            {
              heading: '3. Logistics and Sub-Processor Disclosures',
              body: 'To deliver your goods, we securely transfer recipient names, delivery addresses, and phone numbers to contracted express freight couriers (e.g., DHL, FedEx, UPS, or localized freight carriers) strictly for delivery routing, SMS shipment updates, and customs clearances. All service providers are bound by strict confidentiality and data protection covenants.',
            },
            {
              heading: '4. Data Retention & Subject Rights',
              body: `We retain transaction records only as required by corporate tax regulations and commercial accounting laws. Consumers possess the right to inspect, update, or request deletion of their personal information at any time by contacting our Data Protection Officer at ${reg.contactEmail}.`,
            },
          ],
        },
      },
      footerComponent,
    ],
  };

  // 6. Policies: Terms ('/policies/terms')
  const termsPage: PuckPageData = {
    title: `Terms of Sale | ${metadata.name}`,
    root: { title: `Terms of Sale | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'PolicyDocument',
        props: {
          title: 'Commercial Terms of Sale & Service',
          lastUpdated: 'September 2026',
          entityName: reg.entityName,
          registrationNumber: reg.registrationNumber,
          jurisdiction: reg.jurisdiction,
          sections: policies?.customTerms || [
            {
              heading: '1. Contract Formation & Acceptance',
              body: `These Terms govern the purchase and sale of all items sold by ${reg.entityName} ("Vendor") to the purchaser ("Customer"). An order becomes binding upon written order confirmation or electronic dispatch notice. Vendor reserves the right to decline or cancel orders in cases of verified pricing errors, inventory unavailability, or failed payment security verification.`,
            },
            {
              heading: '2. Pricing, Currencies & Payment Processing',
              body: `All prices are stated in ${currency} unless expressly designated otherwise. For international shipments, local import duties, VAT, customs tariffs, and clearance surcharges are the sole responsibility of the purchaser unless Delivered Duty Paid (DDP) is explicitly selected at checkout. Payments are accepted via major debit/credit cards, wire transfers, and authorized payment gateways.`,
            },
            {
              heading: '3. Title, Risk of Loss & Inspection',
              body: 'Title and risk of loss pass to Customer upon transfer of goods to the shipping carrier. Customer agrees to inspect all packages immediately upon receipt. Any patent damage or missing cartons must be noted on the carrier delivery receipt and reported to Vendor within 5 business days of delivery.',
            },
            {
              heading: '4. Warranty Disclaimers & Limitation of Liability',
              body: `Vendor warrants that goods conform to published technical and material specifications. In no event shall Vendor be liable for indirect, incidental, or consequential damages. Vendor's total cumulative liability for any breach or claim is strictly limited to the actual purchase price paid by Customer for the specific unit giving rise to the claim. These Terms are governed by the laws of ${reg.governingLaw}.`,
            },
          ],
        },
      },
      footerComponent,
    ],
  };

  // 7. Policies: Refund ('/policies/refund')
  const refundPage: PuckPageData = {
    title: `Returns & Refund Policy | ${metadata.name}`,
    root: { title: `Returns & Refunds | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'PolicyDocument',
        props: {
          title: 'Return, Replacement & Refund Policy',
          lastUpdated: 'September 2026',
          entityName: reg.entityName,
          registrationNumber: reg.registrationNumber,
          jurisdiction: reg.jurisdiction,
          sections: policies?.customRefund || [
            {
              heading: '1. 30-Day Inspection & Return Window',
              body: 'We want you to be completely satisfied with your purchase. You may return undamaged, unopened, or gently inspected items within 30 calendar days of delivery for a full refund or exchange, provided items remain in their original packaging with all serialized cards, tags, and protective accessories intact.',
            },
            {
              heading: '2. Return Merchandise Authorization (RMA) Process',
              body: `To initiate a return, contact our customer service desk at ${reg.contactEmail} with your order number, photo documentation of the item, and the reason for return. Our team will issue an official RMA number and pre-addressed return shipping label within 24 business hours.`,
            },
            {
              heading: '3. Inspection and Refund Disbursement',
              body: 'Upon receipt at our central logistics hub, returns are inspected within 2-3 business days. Once validated, refunds are credited back to the original method of payment within 5 to 7 business days. Banks and credit card issuers may take an additional 2-4 days to reflect the credit on your statement.',
            },
            {
              heading: '4. Non-Returnable & Custom Commission Items',
              body: 'Customized products, personalized engravings, custom dimensions, bespoke formulations, and perishable wholesale shipments with broken tamper-evident seals are non-returnable unless defective upon arrival.',
            },
          ],
        },
      },
      footerComponent,
    ],
  };

  // 8. Policies: Shipping ('/policies/shipping')
  const shippingPage: PuckPageData = {
    title: `Shipping & Delivery Policy | ${metadata.name}`,
    root: { title: `Shipping & Delivery | ${metadata.name}` },
    content: [
      headerComponent,
      {
        type: 'PolicyDocument',
        props: {
          title: 'Global Shipping, Freight & Customs Delivery Policy',
          lastUpdated: 'September 2026',
          entityName: reg.entityName,
          registrationNumber: reg.registrationNumber,
          jurisdiction: reg.jurisdiction,
          sections: policies?.customShipping || [
            {
              heading: '1. Processing Times & Dispatch Schedules',
              body: 'Orders for in-stock products are processed and dispatched within 1 to 2 business days (Monday through Friday, excluding public holidays). Bespoke, handmade, or wholesale bulk freight orders adhere to specified lead times communicated in your order confirmation.',
            },
            {
              heading: '2. Domestic & International Delivery Speeds',
              body: 'Standard domestic deliveries typically arrive within 2 to 4 business days. Express international air courier shipments (via DHL Express or FedEx International Priority) arrive within 3 to 6 business days worldwide. Tracking numbers are transmitted via email as soon as parcels are scanned by the carrier.',
            },
            {
              heading: '3. Transit Insurance & Secure Packaging',
              body: 'Every parcel dispatched from our facilities is securely packaged using shock-absorbing, tamper-evident protective materials and is fully insured against theft, loss, or transit damage until signed for by the recipient.',
            },
            {
              heading: '4. Customs Tariffs, Duties & Regulatory Clearances',
              body: `International shipments may be subject to import inspection and duties as determined by the customs authority in the destination country. For inquiries regarding shipping status or customs clearance documentation, contact ${reg.contactEmail}.`,
            },
          ],
        },
      },
      footerComponent,
    ],
  };

  return {
    ...metadata,
    pages: {
      '/': homePage,
      '/about': aboutPage,
      '/catalog': catalogPage,
      '/contact': contactPage,
      '/policies/privacy': privacyPage,
      '/policies/terms': termsPage,
      '/policies/refund': refundPage,
      '/policies/shipping': shippingPage,
    },
  };
}

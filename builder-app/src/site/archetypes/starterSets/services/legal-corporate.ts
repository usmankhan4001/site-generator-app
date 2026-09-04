/**
 * Starter content set — `legal_corporate`: Blackwood & Stone Legal Advisory.
 * Authentic copy for cross-border M&A diligence, contentious regulatory disputes,
 * corporate governance, and international commercial arbitration.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const legalCorporate: StarterContentSet = {
  id: 'legal_corporate',
  archetype: 'services',
  name: 'Blackwood & Stone Legal Advisory',
  description:
    'Board-level legal advisory, contentious regulatory enforcement defense, cross-border M&A diligence, and international commercial arbitration for enterprise leaders.',
  niche: 'Corporate Law & International Commercial Arbitration',
  tags: [
    'legal-advisory',
    'corporate-law',
    'm-and-a',
    'arbitration',
    'regulatory-compliance',
    'litigation',
    'governance',
  ],
  needsPersonalization: false,
  themeId: 'blueprint-navy',
  accent: '#1e3a8a',
  business: {
    name: 'Blackwood & Stone Legal Advisory LLP',
    shortName: 'Blackwood & Stone',
    registrationNumber: 'OC419823',
    jurisdiction: 'England & Wales (Solicitors Regulation Authority No. 642819)',
    governingLaw: 'the laws of England & Wales',
    registeredAddress: '100 Bishopsgate, Level 24, London EC2N 4AG, United Kingdom',
    email: 'advisory@blackwoodstone.example',
    phone: '+44 (0)20 7946 0892',
    website: 'blackwoodstone.example',
    taxId: 'GB 384 9201 45',
    supportHours: 'Monday – Friday, 08:30 – 19:30 (GMT)',
  },
  brand: {
    logoText: 'Blackwood & Stone',
  },
  header: {
    variant: 'corporate_utility',
    sticky: true,
    showAnnouncement: true,
    announcementText: 'Ranked Band 1 Corporate Advisory & International M&A — Chambers UK 2026',
    announcementLink: { label: 'View Accreditations', href: '/about' },
    utilityLinks: [
      { label: 'London HQ', href: '/contact' },
      { label: 'Partner Directory', href: '/about' },
      { label: '+44 (0)20 7946 0892', href: 'tel:+442079460892' },
    ],
  },
  headerCta: {
    label: 'Request Partner Briefing',
    href: '/contact',
  },
  meta: {
    title: 'Blackwood & Stone Legal Advisory LLP — London & Global Counsel',
    description:
      'Senior partner-led corporate counsel for cross-border M&A transactions, contentious regulatory defense, and international commercial arbitration.',
    ogImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  footer: {
    variant: 'corporate_utility',
    tagline:
      'Blackwood & Stone Legal Advisory LLP is an authorized and regulated Limited Liability Partnership registered in England and Wales (SRA No. 642819). Providing decisive counsel across London, Zurich, and Singapore.',
    secondaryLegalText:
      'Solicitors Regulation Authority (SRA) Regulated Entity. The information on this site is for general advisory awareness and does not constitute formal statutory legal advice until a formal engagement letter is countersigned.',
    badgeText: 'The Legal 500 Top Tier 2026 · Chambers UK Band 1 · SRA Regulated #642819',
    columns: [
      {
        title: 'Practice Disciplines',
        links: [
          { label: 'Cross-Border M&A Diligence', href: '/services' },
          { label: 'International Commercial Arbitration', href: '/services' },
          { label: 'Contentious Regulatory Defense', href: '/services' },
          { label: 'Corporate Governance & Board Counsel', href: '/services' },
          { label: 'Cross-Border Sanctions & Trade', href: '/services' },
        ],
      },
      {
        title: 'The Firm',
        links: [
          { label: 'Managing Partners', href: '/about' },
          { label: 'Representative Mandates', href: '/about' },
          { label: 'Global Affiliate Desks', href: '/contact' },
          { label: 'Statutory Disclosures', href: '/policies/terms' },
          { label: 'Direct Partner Briefing', href: '/contact' },
        ],
      },
      {
        title: 'Statutory Registry',
        links: [
          { label: 'Companies House: OC419823', href: '/contact' },
          { label: 'SRA Registry: #642819', href: '/contact' },
          { label: 'VAT: GB 384 9201 45', href: '/contact' },
          { label: 'London EC2N 4AG', href: '/contact' },
        ],
      },
    ],
  },
  slots: {
    home: {
      hero: {
        variant: 'lead_form',
        badge: 'Executive Legal Advisory & Dispute Resolution',
        headline: 'Strategic counsel for decisive, high-stakes',
        accentText: 'cross-border corporate mandates',
        subtitle:
          'Blackwood & Stone represents FTSE 250 boards, sovereign investment funds, and global financial sponsors in complex cross-border M&A transactions, contentious regulatory defense, and international commercial arbitration.',
        primaryCta: { label: 'Explore Practice Areas', href: '/services' },
        secondaryCta: { label: 'Partner Briefing', href: '/contact' },
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        trustBadges: [
          'Chambers UK Band 1 Practice',
          'SRA Regulated Entity #642819',
          '£42B+ Transaction Volume Advised',
          'Zero Junior Leverage Policy',
        ],
        leadForm: {
          title: 'Request Confidential Counsel',
          description: 'Direct escalation to a senior equity partner within 2 business hours.',
          submitLabel: 'Submit Mandate Inquiry',
          fields: ['name', 'email', 'phone', 'company', 'message'],
        },
      },
      stats: {
        items: [
          { value: '£42.8B', label: 'Cumulative M&A and transactional volume advised' },
          { value: '94.6%', label: 'Arbitration and tribunal success rate (LCIA & ICC)' },
          { value: '28', label: 'Senior equity partners across London & Zurich' },
          { value: '100%', label: 'Partner-led direct engagement model' },
        ],
      },
      principles: {
        variant: 'sticky_scroll',
        eyebrow: 'Practice Areas',
        title: 'Core legal & corporate advisory disciplines',
        description:
          'Direct, uncompromised counsel designed for boardroom clarity, transaction certainty, and litigation dominance.',
        items: [
          {
            icon: 'Briefcase',
            title: 'Cross-Border M&A & Private Equity',
            description:
              'Comprehensive buy-side and sell-side transaction execution, FDI clearance, CMA and EU merger filings, and warranty & indemnity structuring.',
            badge: 'Transactional',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'Scale',
            title: 'International Commercial Arbitration',
            description:
              'High-value dispute advocacy before LCIA, ICC, SIAC, and ICSID tribunals. Multi-jurisdictional enforcement of arbitral awards and interim asset preservation orders.',
            badge: 'Contentious',
            image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'ShieldCheck',
            title: 'Contentious Regulatory & Financial Services',
            description:
              'FCA enforcement defense, Serious Fraud Office (SFO) corporate investigations, anti-money laundering compliance audits, and cross-border sanctions defense.',
            badge: 'Regulatory',
            image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'Building2',
            title: 'Corporate Governance & Board Counsel',
            description:
              'Fiduciary risk mitigation, hostile takeover defense, executive remuneration governance, shareholder activist engagement, and special committee mandates.',
            badge: 'Governance',
            image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
          },
        ],
      },
      engagements: {
        variant: 'cards',
        eyebrow: 'Engagement Structures',
        title: 'Transparent, aligned retainer & mandate tiers',
        description:
          'Structured around clear deliverables, dedicated senior partner allocation, and statutory alignment.',
        currency: 'GBP',
        tiers: [
          {
            id: 'general-counsel-retainer',
            name: 'Retained Board Advisory',
            price: 15000,
            priceUnit: '/mo',
            description: 'Ongoing strategic governance, regulatory escalation, and senior partner board attendance.',
            features: [
              'Dedicated senior partner escalation channel (24/7)',
              'Monthly board meeting attendance and governance review',
              'Proactive regulatory horizon scanning (FCA, CMA, SRA)',
              'Priority mandate intake on emergency transactional matters',
            ],
          },
          {
            id: 'transaction-mandate',
            name: 'Transactional M&A Mandate',
            price: 75000,
            priceUnit: ' /mandate base',
            description: 'Comprehensive legal diligence, drafting, and regulatory closing for corporate acquisitions.',
            popular: true,
            badge: 'Flagship Mandate',
            features: [
              'End-to-end SPA, disclosure letter, and financing negotiation',
              'Cross-border regulatory filings (CMA & FDI clearance)',
              'Data room management and red-flag risk matrix reporting',
              'Post-completion integration covenants and escrow management',
            ],
          },
          {
            id: 'arbitration-tribunal',
            name: 'Arbitration & Litigation Defense',
            price: 120000,
            priceUnit: ' /stage retainer',
            description: 'Lead trial counsel and procedural advocacy before international arbitral institutions.',
            features: [
              'LCIA / ICC / SIAC tribunal pleadings and memorial preparation',
              'Multi-jurisdictional asset tracing and interim freezing injunctions',
              'Expert witness cross-examination and damages valuation defense',
              'Enforcement proceedings under the New York Convention',
            ],
          },
        ],
      },
      process: {
        eyebrow: 'Mandate Execution',
        title: 'Rigorous 4-stage governance framework',
        description:
          'From initial conflict checks to decisive tribunal or closing execution, our methodology guarantees absolute diligence.',
        steps: [
          {
            step: '01',
            title: 'Conflict Clearance & Jurisdictional Assessment',
            description:
              'Rapid 4-hour conflict check against our global registry, followed by preliminary statutory risk scoping.',
            duration: 'Day 1',
          },
          {
            step: '02',
            title: 'Partner-Led Diligence & Red-Flag Audit',
            description:
              'Direct review of contractual exposures, regulatory liabilities, and counterparty litigation risks by equity partners.',
            duration: 'Weeks 1–2',
          },
          {
            step: '03',
            title: 'Tactical Negotiation & Memorial Filing',
            description:
              'Rigorous drafting of transactional covenants or substantive arbitral submissions designed for maximum leverage.',
            duration: 'Weeks 3–6',
          },
          {
            step: '04',
            title: 'Closing Execution & Award Enforcement',
            description:
              'Final regulatory clearances, escrow releases, or multi-jurisdictional enforcement of court and arbitral orders.',
            duration: 'Ongoing',
          },
        ],
      },
      testimonials: {
        variant: 'editorial_pullquote',
        eyebrow: 'Client Endorsements',
        title: 'Trusted by FTSE 250 Leadership & Global Sponsors',
        description: 'Direct feedback from General Counsels and Executive Chairpersons.',
        items: [
          {
            name: 'Sir Alistair Sterling',
            role: 'Group Chairman',
            company: 'Sterling Pacific Holdings PLC',
            text: 'Blackwood & Stone navigated our £1.4B dual-track divestment with unflinching precision. Their senior partner model meant we never spoke to a junior; every negotiation was handled with consummate authority and strategic brilliance.',
            rating: 5,
          },
          {
            name: 'Elena Rostova',
            role: 'General Counsel',
            company: 'Vanguard Infrastructure Capital',
            text: 'In our LCIA commercial dispute involving a multi-jurisdictional concession, Blackwood & Stone secured a complete dismissal of all counter-claims and recovered 100% of our enforcement costs. Truly exceptional trial advocates.',
            rating: 5,
          },
        ],
      },
      faq: {
        eyebrow: 'Client Advisory FAQ',
        title: 'Frequently Asked Questions',
        description: 'Details on engagement governance, conflict checks, and fee transparency.',
        items: [
          {
            q: 'How does Blackwood & Stone guarantee zero junior leverage?',
            a: 'Unlike traditional City firms where work is delegated down a pyramid of junior associates, all Blackwood & Stone mandates are directly led and executed by senior equity partners with minimum 15 years of qualified practice.',
          },
          {
            q: 'What is your procedure for emergency injunctive relief or freezing orders?',
            a: 'We maintain a 24/7 senior partner response desk with standing rights of audience before the High Court of Justice in London, enabling emergency ex-parte applications within hours.',
          },
          {
            q: 'Are your fees structured on a fixed-fee or capped basis?',
            a: 'Yes. We offer transparent stage-capped billing and value-aligned milestone structures for corporate M&A transactions and international arbitration proceedings.',
          },
          {
            q: 'What regulatory standards govern the firm?',
            a: 'Blackwood & Stone Legal Advisory LLP is authorized and regulated by the Solicitors Regulation Authority (SRA #642819) and complies with all anti-money laundering regulations and professional indemnity insurance mandates.',
          },
        ],
      },
      cta: {
        headline: 'Secure decisive legal counsel for your next strategic corporate moment',
        subtitle:
          'Connect directly with our senior managing partners in London for a confidential briefing on your pending M&A transaction or regulatory mandate.',
        primaryCta: { label: 'Schedule Confidential Briefing', href: '/contact' },
        secondaryCta: { label: 'Review Practice Capabilities', href: '/services' },
        guarantee: 'All inquiries protected by statutory legal professional privilege under English law.',
      },
    },
    about: {
      header: {
        eyebrow: 'About The Practice',
        headline: 'A premier corporate advisory firm built on partner accountability',
        subtitle:
          'Founded in the City of London, Blackwood & Stone was established to provide FTSE boards and private equity sponsors with uncompromised senior counsel.',
      },
      story: {
        eyebrow: 'Our Heritage',
        title: 'Decisive counsel when the stakes are existential',
        description:
          'We reject billable-hour inflation and junior associate leverage in favour of surgical, high-impact advocacy.',
        blocks: [
          {
            heading: 'The Pure Partner Model',
            body: 'Our firm was built around a singular tenet: high-stakes commercial transactions and contentious disputes demand the unmediated intellect and judgment of battle-tested senior partners.',
          },
          {
            heading: 'Global Reach, City of London Discipline',
            body: 'Operating from our 100 Bishopsgate headquarters, we represent clients across the UK, Continental Europe, North America, and the Asia-Pacific region in complex cross-border proceedings.',
          },
        ],
        highlights: [
          'Ranked Top Tier in Corporate Advisory by The Legal 500 UK',
          'Over £42B in cumulative transactional volume advised since inception',
          'Licensed rights of audience before the High Court and Court of Appeal',
          'Full Solicitors Regulation Authority (SRA) compliance and statutory oversight',
        ],
      },
      values: {
        eyebrow: 'Our Code',
        title: 'Core governance principles',
        description: 'The operational and ethical pillars that govern every client engagement.',
        items: [
          {
            icon: 'Scale',
            title: 'Fiduciary Integrity',
            description: 'Zero conflicting commercial interests; our loyalty to client objectives is total and unyielding.',
          },
          {
            icon: 'Target',
            title: 'Commercial Precision',
            description: 'Legal solutions designed to unlock shareholder value, not create theoretical administrative drag.',
          },
          {
            icon: 'Lock',
            title: 'Absolute Discretion',
            description: 'Rigorous military-grade confidentiality protocols protecting sensitive board communications.',
          },
          {
            icon: 'Zap',
            title: 'Decisive Speed',
            description: 'Immediate partner availability for emergency injunctions, regulatory notices, and hostile offers.',
          },
        ],
      },
      team: {
        eyebrow: 'Leadership',
        title: 'Managing Partners',
        description: 'Senior practitioners leading our transactional and contentious practice groups.',
        members: [
          {
            name: 'Edward Blackwood, KC',
            role: 'Senior Partner — International Arbitration',
            bio: '30+ years of advocacy before LCIA, ICC, and SIAC tribunals. Former Chairman of the Commercial Bar Association advisory committee.',
            credentials: 'MA (Oxon), KC, Solicitor Advocate',
          },
          {
            name: 'Victoria Stone',
            role: 'Managing Partner — Corporate & M&A',
            bio: 'Specialist in cross-border public takeovers, private equity carve-outs, and contested shareholder governance mandates.',
            credentials: 'LL.M (Harvard), Solicitor of the Senior Courts',
          },
          {
            name: 'Julian Montgomery',
            role: 'Partner — Financial Regulatory Defense',
            bio: 'Former senior counsel at the Financial Conduct Authority (FCA). Advises Tier-1 investment banks on contentious enforcement investigations.',
            credentials: 'BA Law (Cantab), SRA Registered',
          },
        ],
      },
      cta: {
        headline: 'Partner with seasoned corporate counsel in the City of London',
        subtitle: 'Our managing partners are available for confidential consultations on board mandates.',
        primaryCta: { label: 'Request Partner Consultation', href: '/contact' },
      },
    },
    offerings: {
      header: {
        eyebrow: 'Practice Areas',
        headline: 'Comprehensive corporate counsel and dispute resolution',
        subtitle:
          'Explore our specialized practice areas covering the full lifecycle of cross-border transactions, regulatory compliance, and international arbitration.',
      },
      engagements: {
        variant: 'cards',
        eyebrow: 'Mandate Structures',
        title: 'Transparent, accountable engagement models',
        description:
          'Tailored retainer and mandate pricing designed for enterprise governance and budget predictability.',
        currency: 'GBP',
        tiers: [
          {
            id: 'general-counsel-retainer',
            name: 'Retained Board Advisory',
            price: 15000,
            priceUnit: '/mo',
            description: 'Ongoing strategic governance, regulatory escalation, and senior partner board attendance.',
            features: [
              'Dedicated senior partner escalation channel (24/7)',
              'Monthly board meeting attendance and governance review',
              'Proactive regulatory horizon scanning (FCA, CMA, SRA)',
              'Priority mandate intake on emergency transactional matters',
            ],
          },
          {
            id: 'transaction-mandate',
            name: 'Transactional M&A Mandate',
            price: 75000,
            priceUnit: ' /mandate base',
            description: 'Comprehensive legal diligence, drafting, and regulatory closing for corporate acquisitions.',
            popular: true,
            badge: 'Flagship Mandate',
            features: [
              'End-to-end SPA, disclosure letter, and financing negotiation',
              'Cross-border regulatory filings (CMA & FDI clearance)',
              'Data room management and red-flag risk matrix reporting',
              'Post-completion integration covenants and escrow management',
            ],
          },
          {
            id: 'arbitration-tribunal',
            name: 'Arbitration & Litigation Defense',
            price: 120000,
            priceUnit: ' /stage retainer',
            description: 'Lead trial counsel and procedural advocacy before international arbitral institutions.',
            features: [
              'LCIA / ICC / SIAC tribunal pleadings and memorial preparation',
              'Multi-jurisdictional asset tracing and interim freezing injunctions',
              'Expert witness cross-examination and damages valuation defense',
              'Enforcement proceedings under the New York Convention',
            ],
          },
        ],
      },
      process: {
        eyebrow: 'Workflow',
        title: 'Disciplined legal execution',
        description: 'A structured approach that guarantees complete regulatory compliance and transaction certainty.',
        steps: [
          {
            step: '01',
            title: 'Conflict Scoping & Engagement',
            description: 'Full conflict checks and formal engagement letter issuance within 4 hours.',
          },
          {
            step: '02',
            title: 'Strategic Analysis & Fact Ingestion',
            description: 'Deep audit of transaction data rooms, contracts, and relevant regulatory disclosures.',
          },
          {
            step: '03',
            title: 'Execution & Representation',
            description: 'Drafting of definitive transaction documents or robust tribunal advocacy.',
          },
          {
            step: '04',
            title: 'Post-Closing Governance',
            description: 'Closing binders, statutory filings with Companies House, and regulatory sign-offs.',
          },
        ],
      },
      faq: {
        eyebrow: 'Inquiries',
        title: 'Frequently asked engagement questions',
        description: 'Details on fee structures, partner availability, and international mandates.',
        items: [
          {
            q: 'Do you accept international arbitration mandates under foreign law?',
            a: 'Yes. Our arbitration group regularly appears in proceedings governed by English law, Swiss law, New York law, and international public law frameworks under LCIA, ICC, and UNCITRAL rules.',
          },
          {
            q: 'What professional indemnity insurance does the firm maintain?',
            a: 'Blackwood & Stone maintains comprehensive top-tier professional indemnity coverage with leading Lloyd’s of London syndicates exceeding SRA minimum statutory requirements.',
          },
        ],
      },
      cta: {
        headline: 'Retain premier legal counsel for your organization',
        subtitle: 'Speak directly with an equity partner regarding your transaction or dispute.',
        primaryCta: { label: 'Submit Mandate Inquiry', href: '/contact' },
      },
    },
    contact: {
      header: {
        eyebrow: 'Contact The Firm',
        headline: 'Request a confidential partner briefing',
        subtitle:
          'All communications are handled with strict statutory confidentiality under English legal professional privilege.',
      },
      form: {
        eyebrow: 'Direct Inquiries',
        title: 'Executive Consultation Request',
        description:
          'Submit your mandate parameters. A managing partner will contact you directly within two business hours.',
        formVariant: 'enterprise',
        submitLabel: 'Send Confidential Inquiry',
        showDetails: true,
        supportHours: 'Monday – Friday, 08:30 – 19:30 (GMT)',
        inquiryOptions: [
          'Cross-Border M&A & Private Equity',
          'International Commercial Arbitration',
          'Contentious Financial Regulatory Defense',
          'Corporate Governance & Board Advisory',
          'General Retained Board Counsel',
        ],
        offices: [
          {
            city: 'London HQ',
            facility: '100 Bishopsgate, Level 24',
            address: 'London EC2N 4AG, United Kingdom',
            role: 'Global Headquarters & Primary Chambers',
          },
          {
            city: 'Zurich Desk',
            facility: 'Bahnhofstrasse 45',
            address: '8001 Zürich, Switzerland',
            role: 'Affiliate Arbitration & European Banking Desk',
          },
        ],
      },
      registration: {
        eyebrow: 'Regulatory Disclosure',
        title: 'Statutory Corporate Information',
        description:
          'Blackwood & Stone Legal Advisory LLP is an entity authorized and regulated by the Solicitors Regulation Authority.',
        entityName: 'Blackwood & Stone Legal Advisory LLP',
        registrationNumber: 'OC419823 (Companies House England & Wales)',
        jurisdiction: 'England & Wales (SRA Registration No. 642819)',
        registeredAddress: '100 Bishopsgate, Level 24, London EC2N 4AG, United Kingdom',
        governingLaw: 'the laws of England & Wales',
        taxId: 'GB 384 9201 45',
        contactEmail: 'advisory@blackwoodstone.example',
        contactPhone: '+44 (0)20 7946 0892',
      },
    },
  },
};

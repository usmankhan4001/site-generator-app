/**
 * Starter content set — `construction_engineering`: Vanguard Heavy Infrastructure.
 * Authentic copy for turnkey EPC contracting, heavy civil engineering, maritime terminals,
 * tunnel boring, high-speed rail corridors, and modern energy grid installations.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const constructionEngineering: StarterContentSet = {
  id: 'construction_engineering',
  archetype: 'services',
  name: 'Vanguard Heavy Infrastructure',
  description:
    'Turnkey Engineering, Procurement, and Construction (EPC) leader delivering megaproject civil engineering, maritime deep-water terminals, transit tunnels, and energy grid modernisation.',
  niche: 'Heavy Civil Infrastructure & EPC Engineering',
  tags: [
    'civil-engineering',
    'infrastructure',
    'epc-contracting',
    'construction',
    'heavy-transit',
    'energy-grid',
    'megaprojects',
  ],
  needsPersonalization: false,
  themeId: 'sunset-amber',
  accent: '#d97706',
  business: {
    name: 'Vanguard Heavy Infrastructure & Engineering Corp.',
    shortName: 'Vanguard Infrastructure',
    registrationNumber: 'TX-080392184',
    jurisdiction: 'State of Texas, USA (OSHA VPP Star & ISO 9001/14001/45001 Certified)',
    governingLaw: 'the laws of the State of Texas',
    registeredAddress: '1200 Smith Street, Suite 3200, Houston, TX 77002, USA',
    email: 'procurement@vanguardinfra.example',
    phone: '+1 (713) 555-0198',
    website: 'vanguardinfra.example',
    taxId: 'US-EIN 76-0928415',
    supportHours: 'Monday – Friday, 07:00 – 18:00 (CST) · 24/7 Incident Dispatch',
  },
  brand: {
    logoText: 'Vanguard Infrastructure',
  },
  header: {
    variant: 'corporate_utility',
    sticky: true,
    showAnnouncement: true,
    announcementText: 'Awarded 2026 National Civil Infrastructure Contractor of the Year — ENR Top 10',
    announcementLink: { label: 'View EPC Portfolio', href: '/services' },
    utilityLinks: [
      { label: 'Houston HQ', href: '/contact' },
      { label: 'Field Safety & Compliance', href: '/about' },
      { label: '+1 (713) 555-0198', href: 'tel:+17135550198' },
    ],
  },
  headerCta: {
    label: 'Request EPC Procurement RFP',
    href: '/contact',
  },
  meta: {
    title: 'Vanguard Heavy Infrastructure — Turnkey EPC & Civil Megaprojects',
    description:
      'Multi-billion dollar heavy civil engineering, maritime ports, rail corridors, and clean energy infrastructure delivered with safety and schedule certainty.',
    ogImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
  },
  footer: {
    variant: 'corporate_utility',
    tagline:
      'Vanguard Heavy Infrastructure & Engineering Corp. — 1200 Smith Street, Suite 3200, Houston, TX. Registered under Texas SOS #080392184. Engineering resilient civil assets across North America and global maritime corridors.',
    secondaryLegalText:
      'All engineering services performed by licensed Professional Engineers (PE). OSHA VPP Star Contractor. Bonded and insured up to $2.5B single-project capacity through Zurich North America & Liberty Mutual.',
    badgeText: 'ENR Top 10 EPC Contractor · OSHA VPP Star Site · ISO 9001:2015 · ISO 45001:2018',
    columns: [
      {
        title: 'Core EPC Disciplines',
        links: [
          { label: 'Subterranean & Tunnel Boring', href: '/services' },
          { label: 'Deep-Water Maritime Terminals', href: '/services' },
          { label: 'High-Speed Rail Corridors', href: '/services' },
          { label: 'HVDC Grid & Clean Power Sub-stations', href: '/services' },
          { label: 'Major Cable-Stayed Bridges', href: '/services' },
        ],
      },
      {
        title: 'The Enterprise',
        links: [
          { label: 'Executive Engineering Board', href: '/about' },
          { label: 'Zero-Harm Safety Protocol', href: '/about' },
          { label: 'Heavy Equipment Fleet', href: '/services' },
          { label: 'Sustainability & Low-Carbon Concrete', href: '/about' },
          { label: 'Emergency Civil Rapid Response', href: '/contact' },
        ],
      },
      {
        title: 'Procurement & Bidding',
        links: [
          { label: 'Submit RFP / Tender Package', href: '/contact' },
          { label: 'Subcontractor Pre-Qualification', href: '/contact' },
          { label: 'Bonding & Financial Audits', href: '/policies/terms' },
          { label: 'Statutory Registrations', href: '/contact' },
        ],
      },
    ],
  },
  slots: {
    home: {
      hero: {
        variant: 'stats_banner_split',
        badge: 'Turnkey EPC Civil Engineering & Megaprojects',
        headline: 'Pioneering heavy civil infrastructure for',
        accentText: 'resilient future transportation & energy',
        subtitle:
          'Vanguard delivers multi-billion dollar heavy civil engineering, maritime deep-water terminals, transit tunnels, and clean energy grid installations on schedule and within budget.',
        primaryCta: { label: 'Explore EPC Capabilities', href: '/services' },
        secondaryCta: { label: 'Submit RFP Package', href: '/contact' },
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?auto=format&fit=crop&w=1200&q=80',
        trustBadges: [
          'ENR Top 10 Heavy Contractor',
          'OSHA VPP Star Certified Safety',
          '$2.5B Single-Project Bonding Capacity',
          'Zero Lost-Time Incidents in 2025',
        ],
        stats: [
          { value: '$14.8B', label: 'Megaproject capital value delivered' },
          { value: '0.00', label: 'Lost-time incident rate (14M man-hours)' },
          { value: '48+', label: 'Major civil infrastructure mandates completed' },
          { value: '100%', label: 'On-schedule commercial delivery record' },
        ],
      },
      stats: {
        items: [
          { value: '$14.8B', label: 'Completed EPC project capital value' },
          { value: '0.00', label: 'Lost-time incident rate over 14M man-hours' },
          { value: '52', label: 'Megaprojects delivered across North America' },
          { value: '$2.5B', label: 'Single-project surety bonding capacity' },
        ],
      },
      principles: {
        variant: 'asymmetric_bento',
        eyebrow: 'Capabilities',
        title: 'Industrial engineering & megaproject disciplines',
        description:
          'We execute high-risk, complex civil engineering projects using proprietary precast methodologies and automated heavy equipment fleets.',
        items: [
          {
            icon: 'HardHat',
            title: 'Subterranean Transit & Tunnel Boring',
            description:
              'Large-diameter earth pressure balance (EPB) and slurry TBM operations for metro transit, utility tunnels, and underground subterranean storage caverns.',
            badge: 'Subterranean',
            image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'Anchor',
            title: 'Deep-Water Maritime Ports & Terminals',
            description:
              'Quay wall construction, heavy-lift container berths, automated gantry foundations, and breakwater protection for international deep-sea logistics hubs.',
            badge: 'Maritime',
            image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'Zap',
            title: 'HVDC Grid Modernization & Power Stations',
            description:
              'Turnkey substations, offshore wind grid interconnects, high-voltage underground transmission corridors, and battery energy storage foundations.',
            badge: 'Energy Grid',
            image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
          },
          {
            icon: 'Building',
            title: 'Cable-Stayed Bridges & Elevated Corridors',
            description:
              'Long-span post-tensioned segmental concrete bridges, seismic retrofitting, and high-load viaduct spans engineered for 100-year design lifespans.',
            badge: 'Structural',
            image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
          },
        ],
      },
      engagements: {
        variant: 'cards',
        eyebrow: 'Contracting Models',
        title: 'Flexible delivery frameworks for public & private infrastructure',
        description:
          'We engage through Design-Build (DB), Progressive EPC, Public-Private Partnerships (P3), or Construction Manager at Risk (CMAR).',
        currency: 'USD',
        tiers: [
          {
            id: 'epc-cmar',
            name: 'Construction Manager at Risk (CMAR)',
            price: 5000000,
            priceUnit: ' + target budget',
            description: 'Early contractor involvement, value engineering, and Guaranteed Maximum Price (GMP) certainty.',
            features: [
              'Pre-construction feasibility & constructability analysis',
              'Subcontractor trade packaging and open-book bidding',
              'Guaranteed Maximum Price (GMP) schedule commitment',
              'Integrated BIM 5D cost-and-clash detection modeling',
            ],
          },
          {
            id: 'design-build-epc',
            name: 'Progressive Turnkey EPC Mandate',
            price: 25000000,
            priceUnit: ' + lump sum',
            description: 'Single-point accountability from preliminary geotechnical engineering through commercial operation.',
            popular: true,
            badge: 'Preferred Framework',
            features: [
              'Full engineering, procurement, and field construction',
              'Surety bonding up to $2.5B backed by Tier-1 insurers',
              'Automated telemetry drone survey & digital twin reporting',
              'Substantial completion liquidated damages guarantee',
            ],
          },
          {
            id: 'p3-concession',
            name: 'P3 / Concession Infrastructure Delivery',
            price: 100000000,
            priceUnit: ' + capital stack',
            description: 'Long-term design, build, finance, operate, and maintain (DBFOM) partnership with equity participation.',
            features: [
              'Comprehensive project financing structuring & sponsor equity',
              '30-year lifecycle maintenance and asset health SLAs',
              'Revenue risk-sharing and availability payment models',
              'Full environmental permitting and stakeholder mitigation',
            ],
          },
        ],
      },
      process: {
        eyebrow: 'Project Execution',
        title: 'Industrialized 4-phase megaproject delivery',
        description:
          'From initial geotechnical boreholes to final commissioning, our digital construction framework eliminates budget creep.',
        steps: [
          {
            step: '01',
            title: 'Geotechnical & BIM 5D Modeling',
            description:
              'Comprehensive subsurface LiDAR scans, soil stabilization modeling, and parametric 5D schedule simulation.',
            duration: 'Months 1–3',
          },
          {
            step: '02',
            title: 'Global Supply Chain & Precast Staging',
            description:
              'Procurement of raw structural steel, heavy TBM components, and off-site modular precast batch manufacturing.',
            duration: 'Months 4–8',
          },
          {
            step: '03',
            title: 'Heavy Civil Field Execution',
            description:
              '24/7 continuous pour and mechanized excavation supervised by on-site licensed professional engineers.',
            duration: 'Months 9–24',
          },
          {
            step: '04',
            title: 'Commissioning, Load-Testing & Turnover',
            description:
              'Full structural deflection stress testing, SCADA integration, and statutory handover to the operating authority.',
            duration: 'Month 25+',
          },
        ],
      },
      testimonials: {
        variant: 'rating_masonry',
        eyebrow: 'Client Validation',
        title: 'Endorsed by Port Authorities & Transportation Commissions',
        description: 'Verifiable performance feedback on major public works and private EPC contracts.',
        items: [
          {
            name: 'Marcus Vance, PE',
            role: 'Chief Infrastructure Officer',
            company: 'Gulf Coast Maritime Port Authority',
            text: 'Vanguard completed our $420M container berth expansion two months ahead of schedule despite severe hurricane season disruptions. Their engineering precision, zero-incident safety record, and transparent GMP accounting are unmatched in North America.',
            rating: 5,
          },
          {
            name: 'Dr. Rebecca Hastings',
            role: 'Executive Director of Transit Delivery',
            company: 'Midwest High-Speed Rail Commission',
            text: 'The subterranean tunnel boring through complex karst limestone was the highest-risk segment of our 40-mile corridor. Vanguard’s specialized EPB slurry shield executed 4.8 miles of continuous boring without a single surface settlement incident.',
            rating: 5,
          },
          {
            name: 'David K. O’Connor',
            role: 'VP of Generation & Grid',
            company: 'Lone Star Energy Transmission LLC',
            text: 'On our 500kV HVDC substation interconnect project, Vanguard mobilized heavy specialized crane crews within 72 hours of regulatory sign-off. Outstanding leadership and complete surety bond backing.',
            rating: 5,
          },
        ],
      },
      faq: {
        eyebrow: 'Procurement FAQ',
        title: 'Frequently Asked Questions for Bidders & Sponsors',
        description: 'Details on safety standards, bonding capacity, and joint venture partnerships.',
        items: [
          {
            q: 'What is Vanguard’s maximum single-project surety bonding capacity?',
            a: 'Vanguard maintains a $2.5B single-project and $6.0B aggregate bonding program underwritten by Zurich North America and Liberty Mutual Surety, supporting major state and federal infrastructure bids.',
          },
          {
            q: 'How does Vanguard maintain an OSHA VPP Star safety rating?',
            a: 'Our Zero-Harm safety program requires mandatory daily hazard assessments, automated computer-vision exclusion zone monitoring, and over 100 hours of continuous safety training per tradesperson annually.',
          },
          {
            q: 'Does Vanguard accept joint venture (JV) partnerships on mega-tenders?',
            a: 'Yes. We frequently form integrated joint ventures (IJVs) with international specialty contractors and local Disadvantaged Business Enterprises (DBEs) for multi-billion dollar procurements.',
          },
        ],
      },
      cta: {
        headline: 'Ready to break ground on your next major civil infrastructure asset?',
        subtitle:
          'Connect directly with our Chief Estimator and Executive EPC Board in Houston for pre-construction constructability analysis and RFP review.',
        primaryCta: { label: 'Submit RFP Tender Package', href: '/contact' },
        secondaryCta: { label: 'Download Corporate Qualifications', href: '/services' },
        guarantee: 'All RFP submissions evaluated with formal pricing models within 10 business days.',
      },
    },
    about: {
      header: {
        eyebrow: 'About Vanguard',
        headline: 'Engineering the physical backbone of modern commerce',
        subtitle:
          'Headquartered in Houston, Texas, Vanguard combines heavy industrial machinery with digital BIM engineering to build enduring civil assets.',
      },
      story: {
        eyebrow: 'Our Foundation',
        title: 'A four-decade legacy of zero-compromise engineering',
        description:
          'We take pride in solving the toughest structural and subterranean challenges in the civil construction industry.',
        blocks: [
          {
            heading: 'Industrial Might Meets Digital Precision',
            body: 'With over $800M in company-owned specialized equipment—including multi-diameter tunnel boring machines, heavy-lift crawler cranes, and automated concrete batching plants—we eliminate subcontractor bottlenecks.',
          },
          {
            heading: 'Uncompromising Commitment to Safety & Environment',
            body: 'We lead the heavy construction industry in low-carbon geopolymer concrete mixes, electrified field equipment, and an unblemished OSHA VPP Star safety record across every active job site.',
          },
        ],
        highlights: [
          'Over $14.8B in completed infrastructure capital value',
          'Licensed Professional Engineers (PE) overseeing every active project',
          'Proprietary off-site precast manufacturing facilities in Texas and Ohio',
          'Comprehensive ISO 9001, ISO 14001, and ISO 45001 corporate certifications',
        ],
      },
      values: {
        eyebrow: 'Core Tenets',
        title: 'The principles that guide our field crews',
        description: 'Safety, engineering integrity, and schedule certainty on every job site.',
        items: [
          {
            icon: 'Shield',
            title: 'Zero-Harm Safety',
            description: 'Every worker returns home safe every day; no milestone ever supersedes human safety.',
          },
          {
            icon: 'Cpu',
            title: 'BIM 5D Technology',
            description: 'Digital twins, LiDAR drone surveys, and automated machine control for sub-millimeter tolerances.',
          },
          {
            icon: 'Leaf',
            title: 'Sustainable Infrastructure',
            description: 'Pioneering low-carbon concrete mixes and 100% recycled structural steel sourcing.',
          },
          {
            icon: 'CheckCircle2',
            title: 'Schedule Certainty',
            description: 'Relentless execution backed by substantial completion performance bonds.',
          },
        ],
      },
      team: {
        eyebrow: 'Leadership',
        title: 'Executive Engineering Board',
        description: 'Seasoned heavy civil leaders guiding our operations and project delivery.',
        members: [
          {
            name: 'Jackson R. Vance, PE',
            role: 'Chief Executive Officer & Managing Director',
            bio: '35 years leading major civil EPC megaprojects including deep-water ports, high-speed rail corridors, and suspension bridges across North America.',
            credentials: 'BS Civil Eng (Texas A&M), MS Geotechnical (Stanford), Licensed PE',
          },
          {
            name: 'Dr. Sarah Lin, PE, SE',
            role: 'Chief Technical Officer — Structural & Tunnels',
            bio: 'World authority on tunnel boring machine (TBM) mechanics and seismic design of long-span bridges. Former lead consultant for federal DOT projects.',
            credentials: 'Ph.D Structural Eng (UC Berkeley), Licensed PE & SE',
          },
          {
            name: 'Col. Thomas Reynolds (Ret.)',
            role: 'VP of Safety, Quality & Environmental Compliance',
            bio: 'Former Commander in the US Army Corps of Engineers. Spearheaded Vanguard’s OSHA VPP Star safety qualification across all project divisions.',
            credentials: 'MS Construction Management, CSP, OSHA Master Trainer',
          },
        ],
      },
      cta: {
        headline: 'Partner with an ENR Top 10 infrastructure contractor',
        subtitle: 'Our executive estimating team is ready to review your project specifications.',
        primaryCta: { label: 'Contact Procurement Team', href: '/contact' },
      },
    },
    offerings: {
      header: {
        eyebrow: 'EPC Capabilities',
        headline: 'Comprehensive turnkey engineering & construction solutions',
        subtitle:
          'Explore our core delivery divisions spanning subterranean tunneling, deep-water maritime ports, clean energy grids, and structural bridges.',
      },
      engagements: {
        variant: 'cards',
        eyebrow: 'Tender Options',
        title: 'Delivery models structured for risk mitigation',
        description:
          'Transparent, bonded contract structures designed for municipal authorities, state agencies, and private developers.',
        currency: 'USD',
        tiers: [
          {
            id: 'epc-cmar',
            name: 'Construction Manager at Risk (CMAR)',
            price: 5000000,
            priceUnit: ' + target budget',
            description: 'Early contractor involvement, value engineering, and Guaranteed Maximum Price (GMP) certainty.',
            features: [
              'Pre-construction feasibility & constructability analysis',
              'Subcontractor trade packaging and open-book bidding',
              'Guaranteed Maximum Price (GMP) schedule commitment',
              'Integrated BIM 5D cost-and-clash detection modeling',
            ],
          },
          {
            id: 'design-build-epc',
            name: 'Progressive Turnkey EPC Mandate',
            price: 25000000,
            priceUnit: ' + lump sum',
            description: 'Single-point accountability from preliminary geotechnical engineering through commercial operation.',
            popular: true,
            badge: 'Preferred Framework',
            features: [
              'Full engineering, procurement, and field construction',
              'Surety bonding up to $2.5B backed by Tier-1 insurers',
              'Automated telemetry drone survey & digital twin reporting',
              'Substantial completion liquidated damages guarantee',
            ],
          },
          {
            id: 'p3-concession',
            name: 'P3 / Concession Infrastructure Delivery',
            price: 100000000,
            priceUnit: ' + capital stack',
            description: 'Long-term design, build, finance, operate, and maintain (DBFOM) partnership with equity participation.',
            features: [
              'Comprehensive project financing structuring & sponsor equity',
              '30-year lifecycle maintenance and asset health SLAs',
              'Revenue risk-sharing and availability payment models',
              'Full environmental permitting and stakeholder mitigation',
            ],
          },
        ],
      },
      process: {
        eyebrow: 'Turnkey Protocol',
        title: 'From preliminary engineering to commercial turnover',
        description: 'A disciplined approach that eliminates delay, cost overrun, and regulatory friction.',
        steps: [
          {
            step: '01',
            title: 'RFP Analysis & Subsurface Geotechnical Modeling',
            description: 'Comprehensive evaluation of ground conditions, utility relocations, and environmental permits.',
          },
          {
            step: '02',
            title: 'Value Engineering & Guaranteed Pricing',
            description: 'Optimizing structural design to reduce raw material cost while increasing design lifespan.',
          },
          {
            step: '03',
            title: 'Heavy Field Execution & Mechanized Erection',
            description: 'Execution using company-owned heavy equipment, crawler cranes, and precast segmental erection.',
          },
          {
            step: '04',
            title: 'Commissioning, Load-Testing & Closeout',
            description: 'Formal regulatory sign-off, warranty binders, and operational turnover to the client authority.',
          },
        ],
      },
      faq: {
        eyebrow: 'Inquiries',
        title: 'Frequently asked procurement questions',
        description: 'Information regarding safety compliance, subcontractor opportunities, and bidding deadlines.',
        items: [
          {
            q: 'What is Vanguard’s standard warranty on completed civil works?',
            a: 'We offer statutory multi-year contractor warranties backed by formal maintenance bonds, with optional 10 to 30-year asset lifecycle maintenance programs for P3 concessions.',
          },
          {
            q: 'How do subcontractors pre-qualify to bid on Vanguard project packages?',
            a: 'Subcontractors must submit our digital pre-qualification form, providing 3-year safety records (EMR < 0.85), financial statements, and relevant trade certifications.',
          },
        ],
      },
      cta: {
        headline: 'Have an upcoming major capital project ready for tender?',
        subtitle: 'Our pre-construction estimating team can review bid documents and provide preliminary cost benchmarking.',
        primaryCta: { label: 'Submit RFP For Review', href: '/contact' },
      },
    },
    contact: {
      header: {
        eyebrow: 'Procurement & Bidding',
        headline: 'Request an EPC Proposal or Subcontractor Information',
        subtitle:
          'Connect directly with our Estimating Department at our Houston headquarters for RFP submissions and joint venture inquiries.',
      },
      form: {
        eyebrow: 'RFP Submission',
        title: 'Project Tender & Inquiry Form',
        description:
          'Provide initial project scope, estimated capital expenditure, and timeline parameters. An Estimating Director will respond within 24 hours.',
        formVariant: 'enterprise',
        submitLabel: 'Submit RFP Inquiry Package',
        showDetails: true,
        supportHours: 'Monday – Friday, 07:00 – 18:00 (CST) · 24/7 Incident Dispatch',
        inquiryOptions: [
          'Turnkey EPC Megaproject Bid ($25M+)',
          'Design-Build & CMAR Infrastructure Tender',
          'P3 Concession & Project Finance Partnership',
          'Subcontractor / Supplier Pre-Qualification',
          'Emergency Civil Engineering Rapid Response',
        ],
        offices: [
          {
            city: 'Houston Headquarters',
            facility: '1200 Smith Street, Suite 3200',
            address: 'Houston, TX 77002, USA',
            role: 'Corporate Headquarters, Executive Engineering & Primary Estimating',
          },
          {
            city: 'Midwest Regional Operations',
            facility: '150 North Riverside Plaza',
            address: 'Chicago, IL 60606, USA',
            role: 'Rail Transit & Subterranean Tunneling Division',
          },
        ],
      },
      registration: {
        eyebrow: 'Corporate Credentials',
        title: 'Statutory Registration & Compliance',
        description:
          'Vanguard Heavy Infrastructure & Engineering Corp. is an active Texas corporation licensed in all 50 US states.',
        entityName: 'Vanguard Heavy Infrastructure & Engineering Corp.',
        registrationNumber: 'TX-080392184 (Texas Secretary of State)',
        jurisdiction: 'State of Texas, USA (OSHA VPP Star Certified)',
        registeredAddress: '1200 Smith Street, Suite 3200, Houston, TX 77002, USA',
        governingLaw: 'the laws of the State of Texas',
        taxId: 'US-EIN 76-0928415',
        contactEmail: 'procurement@vanguardinfra.example',
        contactPhone: '+1 (713) 555-0198',
      },
    },
  },
};

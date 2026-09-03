/**
 * Starter content set — `services-fintech`: regulatory compliance & fintech licensing advisory.
 * Authentic copy for MAS, FCA, SEC/FINRA payment institution licensing, AML/CFT compliance, and risk frameworks.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const servicesFintech: StarterContentSet = {
  id: 'services-fintech',
  archetype: 'services',
  name: 'Fintech Licensing & Regulatory Compliance',
  description:
    'Institutional regulatory licensing, AML/CFT frameworks, payment institution authorization (MAS, FCA, EMI, VASP), and risk governance for global fintechs.',
  niche: 'Fintech licensing & regulatory compliance',
  tags: ['fintech-compliance', 'licensing', 'mas-licensing', 'fca-authorization', 'aml-cft', 'payments-regulatory', 'crypto-vasp'],
  needsPersonalization: false,
  themeId: 'emerald-precision',
  business: {
    name: 'Aegis Regulatory Advisory Pte. Ltd.',
    shortName: 'Aegis Compliance',
    registrationNumber: '201934812G',
    jurisdiction: 'Singapore (ACRA)',
    governingLaw: 'the laws of Singapore',
    registeredAddress: '10 Collyer Quay, #22-01 Ocean Financial Centre, Singapore 049315',
    email: 'advisory@aegisregulatory.example',
    phone: '+65 6812 9400',
    website: 'aegisregulatory.example',
    supportHours: 'Monday – Friday, 09:00 – 18:00 (SGT)',
  },
  brand: { logoText: 'Aegis Regulatory' },
  meta: {
    title: 'Aegis Regulatory — Global Fintech Licensing & Compliance Advisory',
    description:
      'We secure MAS MPI/SPI, UK FCA EMI, and European payment licenses while architecting institutional AML/CFT risk governance frameworks.',
  },
  slots: {
    home: {
      hero: {
        badge: 'Financial Services Regulatory Advisory',
        headline: 'Authoritative licensing & compliance for',
        accentText: 'global financial innovators',
        subtitle:
          'Aegis guides payment institutions, digital banks, cross-border remittance providers, and digital asset exchanges through complex authorization with regulators worldwide.',
        primaryCta: { label: 'Explore Licensing Tracks', href: '/services' },
        secondaryCta: { label: 'Book Regulatory Consult', href: '/contact' },
        trustBadges: ['100% MAS & FCA License Approval Track Record', 'Ex-Central Bank Regulators', 'Over 120+ Licensures Secured'],
      },
      stats: {
        items: [
          { value: '120+', label: 'Regulatory licenses approved' },
          { value: '100%', label: 'First-round audit pass rate' },
          { value: '14', label: 'Global financial jurisdictions covered' },
          { value: '$45B+', label: 'Annual transaction flow compliant' },
        ],
      },
      principles: {
        eyebrow: 'Practice Areas',
        title: 'End-to-end regulatory navigation',
        description:
          'From initial jurisdictional arbitrage and license application drafting to external AML independent audits and outsourced MLRO functions.',
        items: [
          {
            icon: 'Shield',
            title: 'Payment & EMI Licensing',
            description:
              'Full preparation and management of MAS Major Payment Institution (MPI), UK FCA Authorized Payment Institution (API/EMI), and EU MiCA filings.',
          },
          {
            icon: 'FileCheck',
            title: 'Institutional AML/CFT Governance',
            description:
              'Custom Enterprise-Wide Risk Assessments (EWRA), transaction monitoring rule parameterization, and sanction screening policy architecture.',
          },
          {
            icon: 'Scale',
            title: 'Digital Asset & VASP Authorization',
            description:
              'Regulatory roadmapping for tokenization platforms, digital asset custodians, and cross-border crypto settlement rails.',
          },
          {
            icon: 'UserCheck',
            title: 'Independent Regulatory Audits',
            description:
              'Mandatory annual AML audits, regulatory inspections remediation, cybersecurity risk reviews (MAS TRM / FCA SYSC), and mock examinations.',
          },
        ],
      },
      engagements: {
        eyebrow: 'Advisory Retainers',
        title: 'Institutional compliance packages',
        description:
          'Transparently priced regulatory programs tailored for early-stage fintech applicants through to scaled multi-license global conglomerates.',
        currency: 'USD',
        tiers: [
          {
            id: 'readiness',
            name: 'Regulatory Readiness & Gap Audit',
            price: 28000,
            priceUnit: ' one-off',
            description: 'Comprehensive 3-week evaluation of business model, flow of funds, and compliance deficiencies prior to license application.',
            features: [
              'Detailed jurisdictional feasibility & licensing roadmap',
              'Flow of funds & safeguarding structure legal review',
              'Enterprise-Wide AML Risk Assessment (EWRA) draft',
              'Executive board regulatory strategy debrief',
            ],
          },
          {
            id: 'full-license',
            name: 'Turnkey License Mandate (MAS / FCA)',
            price: 75000,
            priceUnit: ' /filing',
            description: 'Full-cycle preparation, drafting, submission, and regulatory defense through to license grant.',
            popular: true,
            badge: 'Most Popular',
            features: [
              'Complete compliance policy suite (AML, TRM, BCP, Conduct)',
              'Business plan, 3-year financial pro-forma & capital modeling',
              'Direct regulator liaison & formal clarification response defense',
              'Senior management interview preparation & coaching',
            ],
          },
          {
            id: 'ongoing-compliance',
            name: 'Retained Compliance Officer (MLRO Support)',
            price: 8500,
            priceUnit: '/mo',
            description: 'Ongoing outsourced regulatory advisory, regulatory filing management, and suspicious transaction reporting support.',
            features: [
              'Dedicated ex-regulator Senior Compliance Director',
              'Quarterly compliance health audits & board reporting',
              'Annual statutory AML/CFT independent audit fulfillment',
              'Immediate escalation hotline for urgent regulatory inquiries',
            ],
          },
        ],
      },
      process: {
        eyebrow: 'Licensing Pathway',
        title: 'From regulatory scoping to license issuance',
        description:
          'A proven four-stage methodology that accelerates regulatory approval and minimizes deficiency notices.',
        steps: [
          {
            step: '01',
            title: 'Jurisdiction & Flow of Funds Structuring',
            description:
              'We map legal entity structures, customer fund safeguarding, capital requirements, and statutory director eligibility criteria.',
            duration: 'Weeks 1–2',
          },
          {
            step: '02',
            title: 'Comprehensive Policy Drafting & Operational Build',
            description:
              'Creation of over 30 bespoke policy manuals tailored specifically to your tech stack, payment gateways, and KYC/AML vendors.',
            duration: 'Weeks 3–6',
          },
          {
            step: '03',
            title: 'Formal Regulatory Submission & Defense',
            description:
              'Submission of the statutory application pack followed by rapid turnarounds on formal Request for Information (RFI) rounds with case officers.',
            duration: 'Months 2–4',
          },
          {
            step: '04',
            title: 'In-Principle Approval (IPA) to Live Launch',
            description:
              'Assistance with capital injection verification, safeguarding bank account openings, and final statutory conditions sign-off.',
            duration: 'Months 4–6',
          },
        ],
      },
      testimonials: {
        eyebrow: 'Client Testimonials',
        title: 'Proven results across regulated fintechs',
        items: [
          {
            name: 'Kavitha Sundaram',
            role: 'Chief Operating Officer',
            company: 'PayFlow Global (MPI Licensee)',
            rating: 5,
            text: 'Aegis secured our Major Payment Institution license with MAS in record time with zero formal deficiency rejections. Their understanding of payment safeguarding regulations is unparalleled.',
          },
          {
            name: 'Dominic Sterling',
            role: 'CEO & Founder',
            company: 'Aether Custody (FCA Authorized)',
            rating: 5,
            text: 'Navigating FCA cryptoasset registration seemed insurmountable until we engaged Aegis. They restructured our institutional custody workflow into absolute compliance.',
          },
          {
            name: 'David Chen',
            role: 'Head of Risk & Legal',
            company: 'CrossBridge FX',
            rating: 5,
            text: 'Their ongoing compliance retainer gives our executive committee complete peace of mind. The ex-regulators on their team anticipate regulatory policy shifts months ahead of time.',
          },
        ],
      },
      faq: {
        eyebrow: 'Common Inquiries',
        title: 'Fintech licensing & advisory questions',
        items: [
          {
            q: 'How long does a Singapore MAS Payment Services Act license typically take?',
            a: 'Standard Standard Payment Institution (SPI) and Major Payment Institution (MPI) approvals generally take between 6 to 12 months depending on the applicant’s readiness, track record, and safeguarding arrangements.',
          },
          {
            q: 'Can Aegis provide local resident compliance officer (MLRO) nominations?',
            a: 'Yes. Through our executive advisory network, we help pre-screen and place certified resident Compliance Directors and MLROs that meet statutory fit-and-proper criteria.',
          },
          {
            q: 'What minimum base capital is required for payment institution licensing?',
            a: 'Under Singapore PS Act, base capital ranges from SGD 100,000 (SPI) to SGD 250,000 (MPI). Under UK FCA regulations, initial capital ranges between €20,000 and €350,000 depending on service scope.',
          },
          {
            q: 'Do you help fintechs establish safeguarding accounts with tier-1 banks?',
            a: 'Yes. We prepare institutional safeguarding dossiers and introduce licensed applicants to tier-1 partner banks and custodial trust providers in Singapore, London, and Frankfurt.',
          },
        ],
      },
      cta: {
        headline: 'Secure your institutional regulatory license',
        subtitle:
          'Schedule an introductory regulatory consultation with our former central bank examiners and legal directors.',
        primaryCta: { label: 'Book Advisory Consultation', href: '/contact' },
        secondaryCta: { label: 'View Regulatory Retainers', href: '/services' },
        guarantee: 'Complete confidentiality protected under mutual non-disclosure agreement.',
      },
    },
  },
};

export default servicesFintech;

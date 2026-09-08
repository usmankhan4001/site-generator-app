import type { SiteContent } from "@/site/schema";

export const SITE: SiteContent = {
  version: 1,
  mode: "services",
  themeId: "indigo-enterprise",
  archetype: "saas",
  business: {
    name: "Acme Studio Pte Ltd",
    shortName: "Acme",
    registrationNumber: "202400001N",
    jurisdiction: "Singapore",
    governingLaw: "the laws of Singapore",
    registeredAddress: "1 Raffles Place #20-00, Singapore 048616",
    email: "hello@acme.site",
    phone: "+65 6000 0000",
    website: "acme.site",
  },
  brand: { logoText: "Acme" },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    variant: "columns",
    tagline: "Built in the studio.",
    columns: [
      { title: "Product", links: [{ label: "Overview", href: "/about" }] },
    ],
    legalLinks: [
      { label: "Privacy Policy", href: "/policies/privacy" },
      { label: "Terms", href: "/policies/terms" },
      { label: "Refund Policy", href: "/policies/refund" },
    ],
    showLegalBar: true,
    showPaymentBadges: false,
  },
  meta: {
    title: "Acme Studio — Websites for growing teams",
    description: "Acme helps growing teams ship clean, fast websites.",
  },
  source: {
    templateId: "sample",
    sector: "tech",
    needsPersonalization: false,
    niche: "digital agency",
    tags: [],
  },
  pages: [
    {
      key: "home",
      path: "/",
      title: "Home",
      nav: true,
      sections: [
        {
          id: "home-hero",
          enabled: true,
          type: "hero",
          props: {
            headline: "Great websites, shipped fast",
            subtitle: "We design and build for growing teams.",
            badge: "Bonus 15% welcome",
            primaryCta: { label: "Get started", href: "/about" },
            trustBadges: [],
          },
        },
        {
          id: "home-cta",
          enabled: true,
          type: "ctaBanner",
          props: {
            headline: "Ready to start?",
            primaryCta: { label: "Contact us", href: "/contact" },
          },
        },
      ],
    },
    {
      key: "about",
      path: "/about",
      title: "About",
      nav: true,
      sections: [
        {
          id: "about-pageheader",
          enabled: true,
          type: "pageHeader",
          props: { headline: "About Acme", subtitle: "A quick overview." },
        },
      ],
    },
    {
      key: "contact",
      path: "/contact",
      title: "Contact",
      nav: true,
      sections: [
        {
          id: "contact-panel",
          enabled: true,
          type: "contactPanel",
          props: { showDetails: true },
        },
      ],
    },
    {
      key: "policy:privacy",
      path: "/policies/privacy",
      title: "Privacy Policy",
      nav: false,
      sections: [
        {
          id: "privacy-doc",
          enabled: true,
          type: "policyDocument",
          props: {
            title: "Privacy Policy",
            lastUpdated: "2026-01-01",
            sections: [{ heading: "Introduction", body: "Acme values your privacy." }],
          },
        },
      ],
    },
  ],
};
/**
 * Generated site content — the single data object this website renders from.
 * Produced by the Airwallex Site Cloner studio. Edit in the studio, not here.
 */
import type { SiteContent } from '@/site/schema';

export const SITE: SiteContent = {
  "version": 1,
  "business": {
    "name": "KubeForge Systems Inc.",
    "shortName": "KubeForge",
    "registrationNumber": "DE-SR-7492104",
    "jurisdiction": "Delaware, United States",
    "governingLaw": "State of Delaware, USA",
    "registeredAddress": "1209 Orange Street, Wilmington, DE 19801, USA",
    "email": "sales@kubeforge.io",
    "phone": "+1 (415) 890-5821",
    "website": "kubeforge.io",
    "taxId": "US-84-3921840"
  },
  "mode": "services",
  "themeId": "indigo-enterprise",
  "accent": "#6366f1",
  "formspreeId": "xbjnkyrq",
  "brand": {
    "logoText": "KubeForge"
  },
  "nav": [
    {
      "label": "Home",
      "href": "/"
    },
    {
      "label": "Services",
      "href": "/services"
    },
    {
      "label": "About",
      "href": "/about"
    },
    {
      "label": "Contact",
      "href": "/contact"
    }
  ],
  "headerCta": {
    "label": "Get Started",
    "href": "/contact"
  },
  "footer": {
    "tagline": "Eliminate production release anxiety with automated ephemeral staging environments, progressive canary traffic shifting, and instant rollbacks.",
    "columns": [
      {
        "title": "KubeForge",
        "links": [
          {
            "label": "Services",
            "href": "/services"
          },
          {
            "label": "About Us",
            "href": "/about"
          },
          {
            "label": "Contact",
            "href": "/contact"
          }
        ]
      }
    ],
    "legalLinks": [
      {
        "label": "Privacy Policy",
        "href": "/policies/privacy"
      },
      {
        "label": "Terms of Service",
        "href": "/policies/terms"
      },
      {
        "label": "Refund & SLA Policy",
        "href": "/policies/refund"
      }
    ],
    "showLegalBar": true,
    "showPaymentBadges": false
  },
  "pages": [
    {
      "key": "home",
      "path": "/",
      "title": "KubeForge CI/CD | DevOps & Kubernetes Automation",
      "navLabel": "Home",
      "nav": true,
      "sections": [
        {
          "id": "home-hero-0",
          "enabled": true,
          "type": "hero",
          "props": {
            "badge": "GitOps Engine v4.2 Released",
            "headline": "Deterministic Cloud-Native Delivery",
            "accentText": "Zero-Downtime Releases",
            "subtitle": "Eliminate production release anxiety with automated ephemeral staging environments, progressive canary traffic shifting, and instant rollbacks.",
            "primaryCta": {
              "label": "Start 14-Day Free Cluster Trial",
              "href": "/contact"
            },
            "secondaryCta": {
              "label": "Inspect Architecture Spec",
              "href": "/services"
            },
            "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80",
            "trustBadges": [
              "99.995% Pipeline SLA",
              "SOC2 Type II Certified",
              "CNCF Silver Member"
            ],
            "layout": "split"
          }
        },
        {
          "id": "home-trustBar-1",
          "enabled": true,
          "type": "trustBar",
          "props": {
            "variant": "logos",
            "title": "Trusted by platform engineering leads worldwide",
            "items": [
              "Stripe",
              "Datadog",
              "Coinbase",
              "Figma",
              "Shopify"
            ]
          }
        },
        {
          "id": "home-statsBar-2",
          "enabled": true,
          "type": "statsBar",
          "props": {
            "items": [
              {
                "value": "4.2M+",
                "label": "Monthly Builds"
              },
              {
                "value": "< 42s",
                "label": "Median Canary Analysis"
              },
              {
                "value": "99.995%",
                "label": "Infrastructure Availability"
              },
              {
                "value": "0",
                "label": "Rollout Outages"
              }
            ]
          }
        },
        {
          "id": "home-featureGrid-3",
          "enabled": true,
          "type": "featureGrid",
          "props": {
            "title": "Built for High-Frequency Deployment Fleets",
            "description": "Everything your SRE team needs to scale from 10 to 10,000 microservices without build queue bottlenecks.",
            "items": [
              {
                "title": "Argo & Flux Native GitOps Engine",
                "description": "Bidirectional sync continuously detects and remediates Kubernetes cluster drift against versioned repository declarations.",
                "badge": "Continuous Reconciliation",
                "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
              },
              {
                "title": "Automated Metric Canary Gates",
                "description": "Autonomous statistical analysis evaluates Prometheus latency, error rates, and saturation before increasing live production traffic.",
                "badge": "Canary Analysis",
                "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
              },
              {
                "title": "Hermetic Build Sandboxes",
                "description": "Containerized isolated builders with distributed layer caching deliver 6x faster compilation cycles.",
                "badge": "Build Velocity",
                "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
              }
            ]
          }
        },
        {
          "id": "home-statsBar-4",
          "enabled": true,
          "type": "statsBar",
          "props": {
            "items": [
              {
                "value": "78%",
                "label": "Reduction in Deployment Failure Rate"
              },
              {
                "value": "6.4x",
                "label": "Faster Release Cadence"
              },
              {
                "value": "18 min",
                "label": "Average Onboarding Time"
              },
              {
                "value": "25,000+",
                "label": "Active Clusters Managed"
              }
            ]
          }
        },
        {
          "id": "home-pricingTiers-5",
          "enabled": true,
          "type": "pricingTiers",
          "props": {
            "title": "Transparent Enterprise Tiering",
            "description": "Fixed-capacity nodes and predictable concurrency without surprise per-seat penalties.",
            "currency": "USD",
            "tiers": [
              {
                "id": "starter",
                "name": "Team Cluster",
                "price": 1850,
                "description": "Ideal for venture-backed engineering organizations managing up to 15 production Kubernetes clusters.",
                "features": [
                  "Up to 15 production clusters",
                  "30 concurrent build pipelines",
                  "Automated canary analysis gates",
                  "GitHub, GitLab, and Bitbucket sync",
                  "Standard 99.9% uptime SLA"
                ],
                "popular": false,
                "currency": "USD",
                "priceUnit": "/mo"
              },
              {
                "id": "enterprise",
                "name": "Scale Fleet",
                "price": 4950,
                "description": "For multi-region organizations requiring high availability, air-gapped runners, and strict compliance.",
                "features": [
                  "Unlimited Kubernetes clusters",
                  "120 concurrent build runners",
                  "Private VPC runner peering (AWS/GCP/Azure)",
                  "SOC2 Type II and FedRAMP compliance pack",
                  "24/7/365 dedicated SRE bridge (15-min SLA)"
                ],
                "popular": true,
                "currency": "USD",
                "priceUnit": "/mo"
              },
              {
                "id": "custom",
                "name": "Global Sovereign",
                "price": 9800,
                "description": "Self-hosted air-gapped deployment for defense, banking, and critical infrastructure operators.",
                "features": [
                  "Full air-gapped / on-premise installation",
                  "Custom hardware acceleration (GPU build caches)",
                  "Dedicated technical account manager",
                  "Custom SLA credit contract up to 100%",
                  "Source code escrow agreement"
                ],
                "popular": false,
                "currency": "USD",
                "priceUnit": "/mo"
              }
            ],
            "ctaHref": "/contact"
          }
        },
        {
          "id": "home-testimonials-6",
          "enabled": true,
          "type": "testimonials",
          "props": {
            "title": "Validated by Engineering & Technical Leaders",
            "description": "Proven impact across mission-critical enterprise workloads.",
            "items": [
              {
                "name": "Elena Rostova",
                "role": "VP of Platform Engineering",
                "text": "KubeForge shifted our deployment frequency from weekly tense releases to 80+ automated daily deploys with zero downtime incidents.",
                "rating": 5,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
                "company": "Veloce FinTech"
              },
              {
                "name": "Marcus Vance",
                "role": "Chief Architect",
                "text": "The automated Prometheus canary gating saved our revenue ledger three times in Q2 alone by halting tainted builds before user exposure.",
                "rating": 5,
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
                "company": "HyperScale Systems"
              }
            ]
          }
        },
        {
          "id": "home-faq-7",
          "enabled": true,
          "type": "faq",
          "props": {
            "title": "Frequently Asked Questions",
            "description": "Commercial terms, technical compliance, and deployment SLAs.",
            "items": [
              {
                "q": "How does KubeForge connect to our private Kubernetes clusters?",
                "a": "KubeForge uses an open-source, non-privileged cluster agent that initiates outbound-only mTLS connections to our control plane or runs entirely within your private VPC."
              },
              {
                "q": "What build systems and container registries are supported?",
                "a": "We natively support Docker, Kaniko, Buildah, OCI images, and direct pushing to ECR, GCR, Harbor, and ACR with automated cryptographic image signing via Cosign."
              },
              {
                "q": "What is your uptime and availability SLA?",
                "a": "Enterprise plans include a contractual 99.99% availability guarantee backed by financial penalty credits."
              }
            ]
          }
        },
        {
          "id": "home-ctaBanner-8",
          "enabled": true,
          "type": "ctaBanner",
          "props": {
            "headline": "Modernize Your Kubernetes Delivery Pipeline Today",
            "subtitle": "Connect your repository and launch your first automated canary release in less than 20 minutes.",
            "primaryCta": {
              "label": "Request Architectural Review",
              "href": "/contact"
            },
            "secondaryCta": {
              "label": "Explore Enterprise Tiers",
              "href": "/services"
            },
            "guarantee": "14-day production proof-of-concept with dedicated platform engineer support."
          }
        }
      ]
    },
    {
      "key": "about",
      "path": "/about",
      "title": "About Us | KubeForge CI/CD",
      "navLabel": "About",
      "nav": true,
      "sections": [
        {
          "id": "about-pageHeader-0",
          "enabled": true,
          "type": "pageHeader",
          "props": {
            "headline": "Pioneering Deterministic Cloud Delivery",
            "subtitle": "Founded by senior infrastructure engineers from Google and Red Hat to eradicate deployment stress."
          }
        },
        {
          "id": "about-prose-1",
          "enabled": true,
          "type": "prose",
          "props": {
            "blocks": [
              {
                "heading": "Our Mission",
                "body": "To empower engineering organizations with unassailable deployment confidence through declarative automation and statistical reliability."
              },
              {
                "heading": "Our Story",
                "body": "KubeForge was born out of the painful reality of 3:00 AM production outages caused by silent configuration drift. Our founders set out to build an immutable control plane that bridges version control and multi-cloud container runtimes with mathematical determinism."
              }
            ]
          }
        },
        {
          "id": "about-timeline-2",
          "enabled": true,
          "type": "timeline",
          "props": {
            "title": "Our Evolution & Technical Milestones",
            "description": "Track record of engineering excellence and institutional delivery.",
            "milestones": [
              {
                "year": "2021",
                "title": "Founding & Open Core Launch",
                "description": "Core GitOps orchestration engine released to CNCF community with 5,000+ GitHub stars."
              },
              {
                "year": "2023",
                "title": "SOC 2 Type II Certification",
                "description": "Achieved institutional enterprise security accreditation across all control planes."
              },
              {
                "year": "2025",
                "title": "Global Multi-Region Mesh",
                "description": "Expanded autonomous edge runner fleet to 32 global cloud regions."
              }
            ]
          }
        },
        {
          "id": "about-teamGrid-3",
          "enabled": true,
          "type": "teamGrid",
          "props": {
            "title": "Principal Leadership & Technical Fellows",
            "description": "Decades of domain expertise spanning tier-1 tech, research labs, and scaleups.",
            "members": [
              {
                "name": "Dr. Henrik Lindqvist",
                "role": "Chief Executive Officer & Co-Founder",
                "bio": "Former Staff SRE at Google Cloud. 18 years specializing in high-availability distributed systems and consensus protocols.",
                "credentials": "Ph.D. Computer Science, ETH Zürich",
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
              },
              {
                "name": "Siddharth Rao",
                "role": "Chief Technology Officer",
                "bio": "Ex-Kubernetes Core Maintainer. Designed scalable scheduler enhancements supporting 50k nodes in production.",
                "credentials": "M.S. Distributed Systems, Carnegie Mellon",
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
              }
            ]
          }
        },
        {
          "id": "about-corporateRegistration-4",
          "enabled": true,
          "type": "corporateRegistration",
          "props": {
            "title": "Corporate Governance & Entity Verification",
            "description": "Full legal standing and regulatory compliance disclosures.",
            "entityName": "KubeForge Systems Inc.",
            "registrationNumber": "DE-SR-7492104",
            "jurisdiction": "Delaware, United States",
            "registeredAddress": "1209 Orange Street, Wilmington, DE 19801, USA",
            "governingLaw": "State of Delaware, USA",
            "taxId": "US-84-3921840",
            "contactEmail": "sales@kubeforge.io",
            "contactPhone": "+1 (415) 890-5821"
          }
        },
        {
          "id": "about-ctaBanner-5",
          "enabled": true,
          "type": "ctaBanner",
          "props": {
            "headline": "Partner with Our Engineering Principals",
            "subtitle": "Schedule a discovery session to evaluate architecture compatibility and timelines.",
            "primaryCta": {
              "label": "Contact Leadership",
              "href": "/contact"
            },
            "secondaryCta": {
              "label": "Explore Service Specs",
              "href": "/services"
            },
            "guarantee": "NDA-backed architecture reviews within 24 business hours."
          }
        }
      ]
    },
    {
      "key": "offerings",
      "path": "/services",
      "title": "Services & Unit Economics | KubeForge CI/CD",
      "navLabel": "Services",
      "nav": true,
      "sections": [
        {
          "id": "offerings-pageHeader-0",
          "enabled": true,
          "type": "pageHeader",
          "props": {
            "eyebrow": "Commercial Offerings & Unit Economics",
            "headline": "Engineered Infrastructure & Commercial Subscriptions",
            "subtitle": "Fixed, predictable commercial pricing structured for high-throughput development teams."
          }
        },
        {
          "id": "offerings-pricingTiers-1",
          "enabled": true,
          "type": "pricingTiers",
          "props": {
            "title": "Enterprise Service Packages & Transparent Pricing",
            "description": "Predictable commercial models with rigorous contractual SLAs.",
            "currency": "USD",
            "tiers": [
              {
                "id": "team-cluster",
                "name": "Team Cluster Tier",
                "price": 1850,
                "description": "Targeted for growing engineering teams deploying up to 15 production microservice clusters.",
                "features": [
                  "Full ArgoCD/Flux orchestration integration",
                  "30 parallel concurrent build workers",
                  "Automated ephemeral PR environments",
                  "Standard community & email support"
                ],
                "popular": false,
                "currency": "USD",
                "priceUnit": "/mo",
                "setupFee": 0,
                "sla": "99.9% Uptime SLA",
                "specs": {
                  "Commitment": "Monthly or Annual (-15%)",
                  "Turnaround": "Instant Provisioning (< 5 min)"
                }
              },
              {
                "id": "scale-fleet",
                "name": "Scale Fleet Tier",
                "price": 4950,
                "description": "Complete platform solution for enterprise fleets with dedicated private runners and compliance auditing.",
                "features": [
                  "Unlimited production clusters & namespaces",
                  "120 dedicated VPC build runners",
                  "Granular RBAC, SSO/SAML, and audit trail streaming",
                  "Dedicated enterprise Slack channel with SRE engineers"
                ],
                "popular": false,
                "currency": "USD",
                "priceUnit": "/mo",
                "setupFee": 1500,
                "sla": "99.99% Uptime SLA (15-min Response)",
                "specs": {
                  "Commitment": "Annual Contract",
                  "Turnaround": "24-hour VPC Peering Setup"
                }
              },
              {
                "id": "sovereign-appliance",
                "name": "Air-Gapped Sovereign Edition",
                "price": 9800,
                "description": "Self-hosted air-gapped platform designed for regulated financial and defense installations.",
                "features": [
                  "Binary distribution for on-premise OpenShift/K8s",
                  "Zero outbound telemetry dependency",
                  "Custom cryptographic hardware security module (HSM) binding",
                  "Quarterly dedicated on-site architecture audit"
                ],
                "popular": false,
                "currency": "USD",
                "priceUnit": "/mo",
                "setupFee": 5000,
                "sla": "99.999% SLA with Custom Penalties",
                "specs": {
                  "Commitment": "Multi-year Master Services Agreement",
                  "Turnaround": "7-Day Guided Implementation"
                }
              }
            ],
            "ctaHref": "/contact"
          }
        },
        {
          "id": "offerings-processSteps-2",
          "enabled": true,
          "type": "processSteps",
          "props": {
            "title": "Engagement Lifecycle & Delivery Methodology",
            "description": "From initial technical audit to continuous production support.",
            "steps": [
              {
                "step": "01",
                "title": "Architecture Audit & VPC Mapping",
                "description": "Review security policies, IAM boundaries, and Kubernetes ingress topology.",
                "duration": "Days 1-2"
              },
              {
                "step": "02",
                "title": "Agent Deployment & Repo Linking",
                "description": "Deploy non-privileged cluster agents and establish cryptographic GitOps mirrors.",
                "duration": "Days 3-5"
              },
              {
                "step": "03",
                "title": "Pipeline Dry-Run & Canary Gating",
                "description": "Simulate progressive releases with synthetic traffic to validate rollback metrics.",
                "duration": "Days 6-8"
              },
              {
                "step": "04",
                "title": "Production Cutover & SRE Handoff",
                "description": "Transition team pipelines with live 24/7 pairing and compliance sign-off.",
                "duration": "Day 10"
              }
            ]
          }
        },
        {
          "id": "offerings-ctaBanner-3",
          "enabled": true,
          "type": "ctaBanner",
          "props": {
            "headline": "Ready to Formalize Your Statement of Work?",
            "subtitle": "Speak directly with our solutions architects to tailor scope and onboarding.",
            "primaryCta": {
              "label": "Request Proposal",
              "href": "/contact"
            },
            "secondaryCta": {
              "label": "Review About Details",
              "href": "/about"
            },
            "guarantee": "Fixed-price and retainer options with guaranteed milestone acceptance criteria."
          }
        }
      ]
    },
    {
      "key": "contact",
      "path": "/contact",
      "title": "Contact & Commercial Engagement | KubeForge CI/CD",
      "navLabel": "Contact",
      "nav": true,
      "sections": [
        {
          "id": "contact-pageHeader-0",
          "enabled": true,
          "type": "pageHeader",
          "props": {
            "headline": "Connect with Our Solutions Engineering Team",
            "subtitle": "Direct technical discussions with architects who understand Kubernetes, not sales scripts.",
            "meta": "Guaranteed response within 4 business hours"
          }
        },
        {
          "id": "contact-contactPanel-1",
          "enabled": true,
          "type": "contactPanel",
          "props": {
            "title": "Initiate Technical Inquiry",
            "description": "Complete the form below to connect with our designated account director.",
            "formVariant": "enterprise",
            "inquiryOptions": [
              "Team Cluster Tier ($1,850/month)",
              "Scale Fleet Tier ($4,950/month)",
              "Air-Gapped Sovereign Edition ($9,800/month)"
            ],
            "submitLabel": "Submit Inquiry",
            "showDetails": true,
            "supportHours": "Monday - Friday: 08:00 - 18:00 (UTC)",
            "offices": [
              {
                "city": "San Francisco (HQ)",
                "address": "535 Mission St, 14th Floor, San Francisco, CA 94105",
                "role": "Engineering & Executive"
              },
              {
                "city": "London",
                "address": "1 Fore Street Ave, Moorgate, London EC2Y 9DT, UK",
                "role": "EMEA Support"
              }
            ]
          }
        }
      ]
    },
    {
      "key": "policy:privacy",
      "path": "/policies/privacy",
      "title": "Privacy Policy",
      "navLabel": "Privacy Policy",
      "nav": false,
      "sections": [
        {
          "id": "policy-privacy-policyDocument-0",
          "enabled": true,
          "type": "policyDocument",
          "props": {
            "title": "Privacy Policy",
            "lastUpdated": "August 1, 2026",
            "sections": [
              {
                "heading": "Overview",
                "body": "This Privacy Policy describes how **KubeForge Systems Inc.** (\"we,\" \"our,\" or \"us\"), registered in Delaware, United States (Registration No. DE-SR-7492104), collects, uses, and protects your personal information when you visit our website (kubeforge.io) or engage our services."
              },
              {
                "heading": "1. Information We Collect",
                "body": "- **Contact Details:** Name, business email, telephone number, job title, and company name.\n- **Billing Information:** Invoicing address, tax identification numbers, and payment details processed via secure, PCI-DSS compliant payment gateways.\n- **Technical Telemetry:** IP address, browser type, device identifiers, and website usage telemetry collected via secure cookies."
              },
              {
                "heading": "2. How We Use Your Information",
                "body": "- To deliver, maintain, and optimize our services and deliverables.\n- To execute contracts, invoice services, and comply with statutory financial auditing obligations under State of Delaware, USA.\n- To communicate project milestones, service updates, and security notices."
              },
              {
                "heading": "3. Data Protection & Security",
                "body": "We employ industry-standard 256-bit SSL encryption, role-based access control (RBAC), and SOC2-compliant cloud storage to safeguard your data against unauthorized access, alteration, or disclosure."
              },
              {
                "heading": "4. Third-Party Disclosures",
                "body": "We do not sell, rent, or trade your personal data. Data is shared strictly with essential service partners bound by strict confidentiality agreements."
              },
              {
                "heading": "5. Your Rights",
                "body": "Under applicable data protection laws, you have the right to access, rectify, or request deletion of your personal information. Contact our Data Protection Officer at **sales@kubeforge.io**."
              },
              {
                "heading": "6. Contact Information",
                "body": "**KubeForge Systems Inc.** — Business Registration No. DE-SR-7492104. Registered Address: 1209 Orange Street, Wilmington, DE 19801, USA. Email: sales@kubeforge.io | Phone: +1 (415) 890-5821."
              }
            ]
          }
        }
      ]
    },
    {
      "key": "policy:terms",
      "path": "/policies/terms",
      "title": "Terms and Conditions of Service",
      "navLabel": "Terms and Conditions of Service",
      "nav": false,
      "sections": [
        {
          "id": "policy-terms-policyDocument-0",
          "enabled": true,
          "type": "policyDocument",
          "props": {
            "title": "Terms and Conditions of Service",
            "lastUpdated": "August 1, 2026",
            "sections": [
              {
                "heading": "Overview",
                "body": "These Terms and Conditions (\"Terms\") constitute a legally binding agreement between the client (\"you\") and **KubeForge Systems Inc.** (\"we,\" \"us\"), registered under the laws of Delaware, United States (Registration No. DE-SR-7492104)."
              },
              {
                "heading": "1. Services & Deliverables",
                "body": "We provide professional technology, retail, or infrastructure services as described in the service tier, catalogue, or agreed Scope of Work (SOW). All deliverables are produced to professional commercial standards."
              },
              {
                "heading": "2. Payment Terms",
                "body": "- All fees are quoted in the currency indicated on our website or order confirmation.\n- Payments may be remitted via corporate bank transfer, credit card, or authorized invoice gateway.\n- Invoices are due upon receipt unless agreed otherwise in writing."
              },
              {
                "heading": "3. Intellectual Property Rights",
                "body": "Upon full payment of all fees due, all custom code, configurations, and deliverables developed specifically for the client shall become the exclusive intellectual property of the client. Pre-existing frameworks and reusable libraries remain the property of KubeForge Systems Inc.."
              },
              {
                "heading": "4. Limitation of Liability",
                "body": "To the maximum extent permitted by State of Delaware, USA, our maximum aggregate liability arising out of or related to our services shall not exceed the total fees paid by the client in the preceding three (3) months."
              },
              {
                "heading": "5. Governing Law & Jurisdiction",
                "body": "These Terms shall be governed by and construed in accordance with **State of Delaware, USA**. Any disputes shall be subject to the exclusive jurisdiction of the competent courts of Delaware, United States."
              },
              {
                "heading": "6. Contact Information",
                "body": "**KubeForge Systems Inc.** — Registration No. DE-SR-7492104. Address: 1209 Orange Street, Wilmington, DE 19801, USA. Email: sales@kubeforge.io | Phone: +1 (415) 890-5821."
              }
            ]
          }
        }
      ]
    },
    {
      "key": "policy:refund",
      "path": "/policies/refund",
      "title": "Refund and Cancellation Policy",
      "navLabel": "Refund and Cancellation Policy",
      "nav": false,
      "sections": [
        {
          "id": "policy-refund-policyDocument-0",
          "enabled": true,
          "type": "policyDocument",
          "props": {
            "title": "Refund and Cancellation Policy",
            "lastUpdated": "August 1, 2026",
            "sections": [
              {
                "heading": "Overview",
                "body": "At **KubeForge Systems Inc.**, we are committed to delivering the highest caliber of service. This policy outlines our refund and cancellation terms in accordance with consumer protection standards and payment card network requirements."
              },
              {
                "heading": "1. Professional Engagements & Products",
                "body": "- If you request cancellation before project initiation, you are entitled to a **100% full refund**.\n- If you are dissatisfied with an initial milestone delivery within **14 calendar days**, contact our support team to request a review or prorated refund for unperformed scope."
              },
              {
                "heading": "2. Managed & Subscription Services",
                "body": "- Monthly support retainers may be cancelled at any time with 30 days written notice prior to the next billing cycle.\n- Annual commitments cancelled within the first 30 days are eligible for a prorated refund of unused months."
              },
              {
                "heading": "3. Physical Product / Hardware Purchases",
                "body": "- Physical items may be returned in original, unopened packaging within **30 days of delivery** for a full refund.\n- Defective items will be replaced immediately with express shipping at our expense."
              },
              {
                "heading": "4. Refund Processing Time",
                "body": "Approved refunds are processed to the original payment method (bank account or credit card) within **5 to 10 business days**."
              },
              {
                "heading": "5. How to Request a Refund",
                "body": "Please email **sales@kubeforge.io** with your Order ID, invoice number, and reason for the request. Our management team responds within 2 business days."
              },
              {
                "heading": "6. Contact Information",
                "body": "**KubeForge Systems Inc.** — Registration No. DE-SR-7492104. Address: 1209 Orange Street, Wilmington, DE 19801, USA. Governed by State of Delaware, USA."
              }
            ]
          }
        }
      ]
    }
  ],
  "meta": {
    "title": "KubeForge CI/CD | DevOps & Kubernetes Automation",
    "description": "Autonomous Kubernetes continuous delivery platform with automated canary rollouts, GitOps drift reconciliation, and multi-cloud build pipelines.",
    "ogImage": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80"
  },
  "source": {
    "templateId": "saas-devops-cicd",
    "sector": "tech",
    "needsPersonalization": false
  }
} as const satisfies SiteContent;

export default SITE;

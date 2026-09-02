const fs = require('fs');
const path = require('path');

const archetypes = {
  "tech-cloud-devops": {
    "id": "tech-cloud-devops",
    "industry": "Software Development / Tech Consulting",
    "name": "Enterprise Cloud & DevOps Architecture",
    "hero": {
      "badge": "Enterprise Cloud Solutions",
      "headline": "Mission-Critical Cloud & DevOps",
      "accentText": "Engineered for Scale",
      "subtitle": "We architect high-availability Kubernetes clusters, automated multi-cloud CI/CD pipelines, and zero-downtime migration strategies for high-growth enterprises.",
      "primaryCta": "Schedule Architecture Review",
      "secondaryCta": "Explore Service Tiers",
      "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["99.99% Uptime SLA", "AWS & GCP Certified", "Zero-Downtime Guarantee"]
    },
    "stats": [
      { "value": "99.99%", "label": "Infrastructure Uptime SLA" },
      { "value": "500+", "label": "Production Clusters Deployed" },
      { "value": "< 15min", "label": "Incident Response Time" },
      { "value": "45%", "label": "Average Cloud Spend Reduction" }
    ],
    "bentoFeatures": [
      {
        "title": "Automated Multi-Cloud CI/CD",
        "description": "Deterministic, immutable deployment pipelines with automated canary releases and rollback gates.",
        "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
        "badge": "Automation"
      },
      {
        "title": "Kubernetes & Microservices Mesh",
        "description": "Production-hardened service meshes with Istio and Cilium for zero-trust service communication.",
        "image": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
        "badge": "Orchestration"
      },
      {
        "title": "24/7 SRE & Threat Telemetry",
        "description": "Continuous Prometheus/Grafana observability with automated self-healing infrastructure triggers.",
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        "badge": "Observability"
      }
    ],
    "offerings": [
      {
        "id": "cloud-audit",
        "name": "Cloud Infrastructure & Security Audit",
        "price": 1499,
        "description": "Complete architecture deep dive, cost optimization report, and threat surface vulnerability mapping.",
        "features": [
          "Full AWS/GCP architecture review",
          "Cost optimization analysis (FinOps)",
          "Security & IAM gap assessment",
          "Actionable Terraform remediation roadmap",
          "Executive summary & technical report"
        ],
        "popular": false
      },
      {
        "id": "devops-acceleration",
        "name": "DevOps & CI/CD Pipeline Modernization",
        "price": 3899,
        "description": "Turnkey implementation of end-to-end GitOps pipelines, container orchestration, and staging environments.",
        "features": [
          "Automated GitHub Actions / GitLab CI pipelines",
          "Kubernetes cluster configuration & Helm charts",
          "Infrastructure as Code (Terraform / OpenTofu)",
          "Staging & preview deployment automation",
          "3 months dedicated engineering support"
        ],
        "popular": true
      },
      {
        "id": "enterprise-sre",
        "name": "24/7 Managed Cloud & SRE Partnership",
        "price": 7499,
        "description": "Complete outsourced Site Reliability Engineering with guaranteed 15-minute SLA and disaster recovery.",
        "features": [
          "24/7/365 active monitoring & on-call SRE",
          "99.99% uptime guarantee with SLA credits",
          "Continuous disaster recovery & backup drills",
          "Monthly cost governance & optimization",
          "Dedicated Lead DevOps Architect"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Alexander Hayes",
        "role": "CTO, Vantage FinTech Group",
        "text": "The cloud architecture overhaul reduced our server costs by 42% while handling 10x traffic spikes during our Series B launch without a stutter.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Marcus Vance",
        "role": "VP of Engineering, CloudStream",
        "text": "Their GitOps implementation turned our fragile 4-hour deployment cycle into a reliable 6-minute automated release process.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "What cloud providers do you support?",
        "a": "We specialize in AWS, Google Cloud Platform (GCP), Microsoft Azure, and hybrid on-premise Kubernetes clusters."
      },
      {
        "q": "How is billing handled and what are the payment terms?",
        "a": "We support wire transfers, corporate credit cards, and milestone invoices. Audit packages are billed upfront; retainers are billed monthly."
      },
      {
        "q": "Do you provide SLAs and non-disclosure agreements?",
        "a": "Yes, all engagements include binding mutual NDAs, intellectual property transfer upon payment, and guaranteed uptime SLAs."
      }
    ]
  },
  "tech-ai-studio": {
    "id": "tech-ai-studio",
    "industry": "Software Development / Tech Consulting",
    "name": "Applied AI & Machine Learning Studio",
    "hero": {
      "badge": "Applied Intelligence",
      "headline": "Enterprise AI Systems",
      "accentText": "Built for Real-World ROI",
      "subtitle": "We engineer production-grade LLM architectures, bespoke retrieval pipelines (RAG), and proprietary computer vision models integrated seamlessly into your software stack.",
      "primaryCta": "Explore AI Capabilities",
      "secondaryCta": "View Model Showcase",
      "image": "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["SOC2 Compliant AI", "Private Data Isolation", "Sub-100ms Inference"]
    },
    "stats": [
      { "value": "99.4%", "label": "Model Inference Accuracy" },
      { "value": "85M+", "label": "Daily Vector Embeddings Processed" },
      { "value": "< 80ms", "label": "Average Token Latency" },
      { "value": "100%", "label": "Enterprise Data Privacy Isolation" }
    ],
    "bentoFeatures": [
      {
        "title": "Private LLM Fine-Tuning & RAG",
        "description": "Secure enterprise knowledge retrieval grounded in your proprietary documents with zero data leakage.",
        "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
        "badge": "Generative AI"
      },
      {
        "title": "Autonomous Agentic Workflows",
        "description": "Multi-agent orchestration systems that autonomously execute complex business and data analysis tasks.",
        "image": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
        "badge": "Agents"
      },
      {
        "title": "Real-Time Edge Computer Vision",
        "description": "High-throughput object detection and visual quality control running directly on edge hardware.",
        "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
        "badge": "Vision"
      }
    ],
    "offerings": [
      {
        "id": "ai-feasibility",
        "name": "AI Architecture & Feasibility Blueprint",
        "price": 1899,
        "description": "Technical audit of your data pipeline, model selection matrix, latency benchmarks, and cost projection.",
        "features": [
          "Data readiness and cleanliness audit",
          "Proprietary vs OSS model evaluation",
          "Vector database sizing & architecture",
          "Security & privacy compliance blueprint",
          "Interactive prototype proof of concept"
        ],
        "popular": false
      },
      {
        "id": "custom-rag-agent",
        "name": "Custom Enterprise RAG & Agent Pipeline",
        "price": 4999,
        "description": "Turnkey production deployment of an enterprise knowledge retrieval engine with custom UI and API endpoints.",
        "features": [
          "Multi-format document ingestion pipeline",
          "Hybrid semantic & keyword search",
          "Custom guardrails & hallucination filters",
          "SOC2-ready tenant isolation",
          "Full source code & model weights handover"
        ],
        "popular": true
      },
      {
        "id": "fullstack-ai-system",
        "name": "End-to-End Bespoke AI Platform",
        "price": 9800,
        "description": "Comprehensive AI platform development from custom model fine-tuning to web/mobile frontend deployment.",
        "features": [
          "Domain-specific model fine-tuning",
          "High-throughput distributed inference cluster",
          "React / Next.js enterprise UI dashboard",
          "Comprehensive evaluation suite",
          "12 months SLA support & retraining"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Dr. Elena Rostova",
        "role": "Chief Science Officer, BioGenix Labs",
        "text": "Their RAG architecture accurately indexed 400,000 biomedical research papers, enabling our researchers to query complex gene interactions in seconds.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Harrison Cole",
        "role": "Managing Director, Apex Analytics",
        "text": "The custom automated document synthesis agents delivered a 70% reduction in manual data processing time within the first month.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "Will our proprietary company data be used to train external public models?",
        "a": "Never. We enforce strict private tenant isolation with zero-data-retention APIs and self-hosted open-source model weights."
      },
      {
        "q": "What is the typical deployment timeline for a custom AI pipeline?",
        "a": "A typical enterprise RAG or agent pipeline is architected, benchmarked, and deployed to staging within 2 to 4 weeks."
      },
      {
        "q": "How do you prevent hallucinations and ensure enterprise accuracy?",
        "a": "We implement multi-step citation verification, deterministic guardrails, semantic similarity thresholds, and automated regression evaluation suites."
      }
    ]
  },
  "tech-fintech-core": {
    "id": "tech-fintech-core",
    "industry": "Software Development / Tech Consulting",
    "name": "Core Banking & Payment Gateway Engineering",
    "hero": {
      "badge": "Financial Infrastructure",
      "headline": "Ultra-Reliable FinTech Ledgers &",
      "accentText": "Global Payment Rails",
      "subtitle": "We engineer double-entry immutable ledgers, high-throughput payment gateways, multi-currency FX settlement engines, and PCI-DSS Level 1 compliant platforms.",
      "primaryCta": "Consult FinTech Architects",
      "secondaryCta": "Explore Payment Rails",
      "image": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["PCI-DSS Level 1 Compliant", "Sub-50ms Settlement", "Zero-Discrepancy Ledgers"]
    },
    "stats": [
      { "value": "$4.2B+", "label": "Annual Transaction Volume Processed" },
      { "value": "99.999%", "label": "Ledger Reliability & Uptime" },
      { "value": "< 45ms", "label": "End-to-End Payment Routing" },
      { "value": "0.00%", "label": "Double-Spend / Reconciliation Error Rate" }
    ],
    "bentoFeatures": [
      {
        "title": "Double-Entry Immutable Ledgers",
        "description": "Cryptographically auditable financial ledgers with ACID compliance and real-time balance reconciliation.",
        "image": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
        "badge": "Ledgers"
      },
      {
        "title": "Multi-Currency FX Settlement Rails",
        "description": "Automated routing across SWIFT, SEPA, ACH, and Faster Payments with live FX spread optimization.",
        "image": "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
        "badge": "Treasury"
      },
      {
        "title": "Real-Time Fraud & AML Anomaly Engine",
        "description": "Sub-second behavioral risk scoring, PEP sanctions screening, and suspicious transaction isolation.",
        "image": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
        "badge": "Compliance"
      }
    ],
    "offerings": [
      {
        "id": "fintech-audit",
        "name": "FinTech Architecture & Compliance Audit",
        "price": 2499,
        "description": "Complete security, PCI-DSS gap analysis, and payment routing optimization review.",
        "features": [
          "PCI-DSS Level 1 gap assessment",
          "Ledger architecture & concurrency review",
          "Payment gateway redundancy roadmap",
          "KYC/AML vendor integration matrix",
          "Executive compliance & risk report"
        ],
        "popular": false
      },
      {
        "id": "payment-engine",
        "name": "Custom Payment Gateway & Ledger Engine",
        "price": 6499,
        "description": "Turnkey payment routing engine with webhooks, idempotency keys, and multi-PSP failover.",
        "features": [
          "Double-entry ledger database schema",
          "Multi-PSP smart routing & auto-failover",
          "Tokenized card vault & 3D-Secure 2.0",
          "Real-time webhook reconciliation",
          "6 months dedicated regulatory support"
        ],
        "popular": true
      },
      {
        "id": "core-banking",
        "name": "Enterprise Core Banking & Settlement Core",
        "price": 14500,
        "description": "End-to-end multi-currency neo-banking core with treasury management and automated FX clearing.",
        "features": [
          "Full multi-currency virtual account engine",
          "Automated treasury & clearing pipelines",
          "Custom admin back-office & compliance portal",
          "Complete API suite for web & mobile apps",
          "12 months 24/7 mission-critical SLA"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Julian Vance",
        "role": "VP of Payments, GlobalPay Solutions",
        "text": "Their ledger architecture handles over 15,000 transactions per second during peak hours with zero reconciliation discrepancies. Truly tier-one engineering.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Sarah Lin",
        "role": "Chief Product Officer, NexoLedger",
        "text": "They delivered our multi-currency FX settlement core ahead of schedule, enabling us to secure our European banking license on first submission.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "How do you guarantee zero transaction discrepancies in high-throughput ledgers?",
        "a": "We design immutable append-only event streams using pessimistic locking and idempotent transaction tokens to eliminate race conditions and double spending."
      },
      {
        "q": "Does your architecture comply with PCI-DSS Level 1 and SOC2 standards?",
        "a": "Yes, our financial software architecture follows strict tokenization, end-to-end envelope encryption, and SOC2 / PCI-DSS Level 1 compliance blueprints."
      },
      {
        "q": "Can your payment routing engine connect with local rails like SEPA, ACH, and Faster Payments?",
        "a": "Yes, we build standardized ISO 20022 connectors and REST integrations for global banking rails, local ACH, SEPA Instant, and SWIFT networks."
      }
    ]
  },
  "tech-saas-velocity": {
    "id": "tech-saas-velocity",
    "industry": "Software Development / Tech Consulting",
    "name": "Rapid SaaS MVP & Venture Engineering Studio",
    "hero": {
      "badge": "Venture-Grade SaaS Development",
      "headline": "Ship Production-Ready SaaS",
      "accentText": "From Zero to Scale in 6 Weeks",
      "subtitle": "We turn ambitious SaaS concepts into enterprise-grade, multi-tenant software platforms complete with billing, authentication, role-based access, and modern React/Next.js interfaces.",
      "primaryCta": "Build Your SaaS MVP",
      "secondaryCta": "View Startup Portfolio",
      "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["6-Week Rapid Delivery", "100% Full IP Transfer", "Built for Series-A Scale"]
    },
    "stats": [
      { "value": "6 Weeks", "label": "Average Time to Production Launch" },
      { "value": "48+", "label": "Venture-Backed MVPs Shipped" },
      { "value": "$120M+", "label": "Total Funding Raised by Portfolio" },
      { "value": "100%", "label": "Intellectual Property Transferred" }
    ],
    "bentoFeatures": [
      {
        "title": "Multi-Tenant Architecture & Auth",
        "description": "Secure tenant isolation, role-based permissions (RBAC), and enterprise SSO/SAML out of the box.",
        "image": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
        "badge": "Multi-Tenancy"
      },
      {
        "title": "Turnkey Subscription Billing",
        "description": "Pre-integrated Stripe/Airwallex billing with usage metering, recurring tiers, invoices, and customer portals.",
        "image": "https://images.unsplash.com/photo-1556742049-0a67e5572263?auto=format&fit=crop&w=800&q=80",
        "badge": "Monetization"
      },
      {
        "title": "Serverless & Edge API Scalability",
        "description": "Engineered on Next.js, Node, and Postgres with global edge caching and instantaneous database branching.",
        "image": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
        "badge": "Performance"
      }
    ],
    "offerings": [
      {
        "id": "saas-blueprint",
        "name": "SaaS Technical Blueprint & Wireframes",
        "price": 1999,
        "description": "Comprehensive product specification, database schema, API documentation, and clickable UX prototype.",
        "features": [
          "Complete multi-tenant database ERD schema",
          "Figma interactive clickable UI wireframes",
          "REST & GraphQL API endpoint architecture",
          "Third-party vendor & billing integration plan",
          "Detailed engineering sprint breakdown"
        ],
        "popular": false
      },
      {
        "id": "mvp-accelerator",
        "name": "Complete Production SaaS MVP",
        "price": 5899,
        "description": "Full-stack development, authentication, billing, admin dashboard, and deployment in 6 weeks.",
        "features": [
          "Production Next.js / TypeScript web application",
          "PostgreSQL database with Prisma ORM",
          "Stripe / Airwallex subscription integration",
          "Admin management & metrics dashboard",
          "3 months post-launch bug warranty"
        ],
        "popular": true
      },
      {
        "id": "venture-partnership",
        "name": "Enterprise SaaS Platform & Dedicated Pod",
        "price": 11900,
        "description": "Dedicated engineering pod delivering enterprise features, AI integrations, and high-concurrency scale.",
        "features": [
          "Full dedicated full-stack development pod",
          "Enterprise SSO (SAML/Okta) & audit logging",
          "Custom generative AI / vector search integration",
          "CI/CD staging and production environments",
          "12 months ongoing engineering SLA"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Liam Sterling",
        "role": "Founder & CEO, TaskFlow HQ",
        "text": "They took us from an idea on a napkin to a fully functional SaaS product with paying enterprise customers in just 5 weeks. The code quality is immaculate.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Rachel Thorne",
        "role": "Co-Founder, MetricsBridge",
        "text": "The subscription billing and tenant isolation worked flawlessly from day one. We raised our $2.5M seed round using the exact platform they built.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "What modern technology stack do you build SaaS applications with?",
        "a": "We build on modern, enterprise-proven stacks: TypeScript, Next.js / React, Tailwind CSS, Node.js, PostgreSQL (Prisma), Redis, and Docker."
      },
      {
        "q": "Do we retain 100% intellectual property ownership of the codebase?",
        "a": "Yes. You own 100% of all intellectual property, source code, design assets, and database schemas with no licensing fees or vendor lock-in."
      },
      {
        "q": "What happens after the SaaS MVP is launched?",
        "a": "We provide a comprehensive handover workshop, full technical documentation, and optional dedicated monthly engineering pods for ongoing feature development."
      }
    ]
  },
  "tech-cybersecurity": {
    "id": "tech-cybersecurity",
    "industry": "Software Development / Tech Consulting",
    "name": "Zero-Trust & Enterprise Cybersecurity Engineering",
    "hero": {
      "badge": "Defensive Security & Compliance",
      "headline": "Battle-Tested Zero-Trust",
      "accentText": "Cybersecurity Architecture",
      "subtitle": "We harden cloud perimeters, automate SOC2 / ISO 27001 compliance frameworks, execute red-team penetration testing, and protect corporate attack surfaces against sophisticated threats.",
      "primaryCta": "Request Security Assessment",
      "secondaryCta": "View Compliance Matrix",
      "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["SOC2 & ISO 27001 Certified", "Zero-Trust Architecture", "Continuous Pen-Testing"]
    },
    "stats": [
      { "value": "0", "label": "Breaches Across Managed Infrastructures" },
      { "value": "2,400+", "label": "Vulnerabilities Remediated" },
      { "value": "100%", "label": "SOC2 / ISO First-Time Pass Rate" },
      { "value": "< 5min", "label": "Threat Isolation & Containment" }
    ],
    "bentoFeatures": [
      {
        "title": "Identity & Zero-Trust Access Control",
        "description": "Context-aware authentication, ephemeral credentials, and micro-segmented perimeter boundaries.",
        "image": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
        "badge": "Zero-Trust"
      },
      {
        "title": "Automated Continuous Pen-Testing",
        "description": "Rigorous red-team attack simulations targeting APIs, web applications, and cloud IAM roles.",
        "image": "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80",
        "badge": "Offensive Sec"
      },
      {
        "title": "Real-Time SIEM & Incident Response",
        "description": "24/7 cloud threat telemetry, anomaly detection, and automated containment playbooks.",
        "image": "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80",
        "badge": "SOC Telemetry"
      }
    ],
    "offerings": [
      {
        "id": "security-audit",
        "name": "Full Infrastructure Pen-Test & Assessment",
        "price": 2299,
        "description": "Comprehensive white-box and black-box penetration testing covering cloud, APIs, and networks.",
        "features": [
          "Cloud infrastructure & IAM vulnerability mapping",
          "Web application & API penetration testing",
          "OWASP Top 10 threat surface exploitation",
          "Detailed executive & remediation report",
          "Free re-test validation after remediation"
        ],
        "popular": false
      },
      {
        "id": "soc2-compliance",
        "name": "SOC2 / ISO 27001 Readiness & Hardening",
        "price": 4799,
        "description": "Turnkey policy generation, automated compliance evidence collection, and cloud hardening.",
        "features": [
          "Complete policy suite tailored to your org",
          "Automated evidence collection setup (Vanta/Drata)",
          "Cloud infrastructure hardening scripts",
          "Employee security awareness program",
          "Guaranteed audit preparation support"
        ],
        "popular": true
      },
      {
        "id": "vciso-managed",
        "name": "24/7 Managed SOC & Virtual CISO Retainer",
        "price": 8900,
        "description": "Dedicated executive security leadership, continuous threat monitoring, and SLA incident response.",
        "features": [
          "Dedicated virtual CISO executive advisory",
          "24/7 SIEM monitoring & automated alerts",
          "Guaranteed 15-minute critical incident response",
          "Quarterly red-team penetration testing",
          "Vendor risk & third-party assessment reviews"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Gregory Vance",
        "role": "CISO, Sentinel Health Technologies",
        "text": "Their red team uncovered three critical API logic flaws that two previous audit firms missed. Their remediation scripts made fixing them effortless.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Nadia Al-Mansoor",
        "role": "Head of Security, CloudKite",
        "text": "We achieved SOC2 Type II certification in under 45 days with zero non-conformities thanks to their automated compliance pipelines.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "How do you prepare our company for SOC2 Type II and ISO 27001 audits?",
        "a": "We automate evidence collection, implement required IAM controls, write tailored policy documentation, and conduct mock audits before the external auditor arrives."
      },
      {
        "q": "What does your penetration testing methodology cover?",
        "a": "Our testing aligns with OWASP ASVS and NIST 800-115 standards, including cloud posture, API endpoints, business logic flaws, and network infrastructure."
      },
      {
        "q": "Can your team handle 24/7 security incident response and containment?",
        "a": "Yes, our managed security service includes 24/7 telemetry monitoring with automated host isolation and active on-call security engineer intervention."
      }
    ]
  },
  "tech-agile-apps": {
    "id": "tech-agile-apps",
    "industry": "Software Development / Tech Consulting",
    "name": "High-Performance Mobile & Cross-Platform App Studio",
    "hero": {
      "badge": "Next-Gen Mobile Applications",
      "headline": "Fluid Mobile Experiences",
      "accentText": "Built for iOS, Android & Web",
      "subtitle": "We engineer silky 120fps native iOS, Android, and React Native mobile applications with offline-first synchronization, biometrics, and enterprise backend integrations.",
      "primaryCta": "Start Your App Project",
      "secondaryCta": "Explore App Showcase",
      "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["120fps Native Performance", "Offline-First Sync Engine", "App Store Approval Guarantee"]
    },
    "stats": [
      { "value": "4.9★", "label": "Average App Store Rating" },
      { "value": "10M+", "label": "Global End-Users Supported" },
      { "value": "99.98%", "label": "Crash-Free Session Rate" },
      { "value": "60%", "label": "Faster Delivery with Cross-Platform" }
    ],
    "bentoFeatures": [
      {
        "title": "Seamless 120fps Native UI & Motion",
        "description": "Hardware-accelerated gesture physics, micro-interactions, and adaptive dark/light interface systems.",
        "image": "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
        "badge": "Interface"
      },
      {
        "title": "Offline-First Data Synchronization",
        "description": "Local SQLite caching with conflict-free replicated data types (CRDTs) for instant responsiveness without network.",
        "image": "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=800&q=80",
        "badge": "Sync Engine"
      },
      {
        "title": "Biometrics, Push & In-App Subscriptions",
        "description": "Turnkey integration of FaceID, Apple Pay, Google Pay, RevenueCat in-app subscriptions, and rich push notifications.",
        "image": "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80",
        "badge": "Platform Services"
      }
    ],
    "offerings": [
      {
        "id": "app-design-prototype",
        "name": "Mobile UI/UX Design & Clickable Prototype",
        "price": 1799,
        "description": "End-to-end design system, user journeys, interactive Figma prototypes, and technical architecture spec.",
        "features": [
          "Complete iOS & Android design system",
          "High-fidelity interactive Figma prototype",
          "User experience journey & wireframe maps",
          "API integration contract & data spec",
          "Developer-ready asset exports & tokens"
        ],
        "popular": false
      },
      {
        "id": "app-core-build",
        "name": "Production Cross-Platform App (iOS & Android)",
        "price": 5499,
        "description": "Turnkey React Native / Flutter mobile app published directly to the Apple App Store and Google Play Store.",
        "features": [
          "Unified React Native / Flutter codebase",
          "Offline-first local caching & background sync",
          "Push notifications & deep linking setup",
          "App Store & Google Play submission management",
          "3 months post-launch performance maintenance"
        ],
        "popular": true
      },
      {
        "id": "enterprise-suite",
        "name": "Enterprise Mobile Ecosystem & Custom Backend",
        "price": 10800,
        "description": "Complete mobile product ecosystem with custom GraphQL/REST backend, admin portal, and real-time sockets.",
        "features": [
          "Native iOS (Swift) & Android (Kotlin) or RN build",
          "Custom Node.js / Go backend microservices",
          "Real-time WebSockets & live telemetry",
          "Web admin management portal & analytics",
          "12 months enterprise SLA & update support"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Marcus Chen",
        "role": "VP of Digital, OmniRetail Group",
        "text": "Our mobile conversion increased by 58% after launching the new React Native app. The offline-first sync ensures our customers never see a loading spinner.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Sofia Rodriguez",
        "role": "Founder, FitPulse Global",
        "text": "The 120fps animations and biometric login make our app feel like an Apple Design Award winner. Delivered on time and within budget.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "Should we build natively in Swift/Kotlin or use React Native / Flutter?",
        "a": "For 90% of business applications, React Native or Flutter delivers identical 120fps native performance at 50% lower development and maintenance cost."
      },
      {
        "q": "Do you guarantee App Store and Google Play Store publication approval?",
        "a": "Yes, we handle all store compliance, privacy manifests, screenshot generation, and submission reviews until your app is live."
      },
      {
        "q": "How do your apps handle offline functionality and data synchronization?",
        "a": "We implement local embedded databases (WatermelonDB / SQLite) that queue local mutations and seamlessly sync with the server when connectivity resumes."
      }
    ]
  },
  "tech-data-analytics": {
    "id": "tech-data-analytics",
    "industry": "Software Development / Tech Consulting",
    "name": "Modern Data Stack & Real-Time Analytics Consulting",
    "hero": {
      "badge": "Modern Data Architecture",
      "headline": "Turn Complex Raw Data into",
      "accentText": "Real-Time Business Alpha",
      "subtitle": "We design enterprise data warehouses on Snowflake, Databricks, and dbt with automated streaming pipelines and interactive executive BI dashboards.",
      "primaryCta": "Architect Your Data Stack",
      "secondaryCta": "View BI Dashboards",
      "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["Sub-Second Query Speeds", "Snowflake & Databricks Certified", "100% Data Governance"]
    },
    "stats": [
      { "value": "10TB+", "label": "Daily Streaming Telemetry Processed" },
      { "value": "85%", "label": "Query Latency Reduction" },
      { "value": "300+", "label": "Automated ETL / dbt Pipelines Live" },
      { "value": "100%", "label": "Single Source of Truth Alignment" }
    ],
    "bentoFeatures": [
      {
        "title": "Real-Time Streaming Pipelines",
        "description": "High-throughput Kafka and Apache Flink pipelines streaming millions of events per second with zero message loss.",
        "image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
        "badge": "Streaming"
      },
      {
        "title": "Snowflake & Databricks Lakehouse",
        "description": "Centralized, cost-optimized data warehousing with modular dbt transformations and data versioning.",
        "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        "badge": "Lakehouse"
      },
      {
        "title": "Executive BI Dashboards",
        "description": "Sub-second visual dashboards built on Lightdash, Metabase, and Tableau with automated executive reports.",
        "image": "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&q=80",
        "badge": "Visualization"
      }
    ],
    "offerings": [
      {
        "id": "data-audit",
        "name": "Data Warehouse & Pipeline Audit",
        "price": 1699,
        "description": "Comprehensive data hygiene, query cost optimization, schema normalization, and security review.",
        "features": [
          "Warehouse spend & query performance analysis",
          "Data modeling & schema normalization review",
          "Pipeline latency & bottleneck diagnosis",
          "Data governance & GDPR/SOC2 compliance check",
          "Actionable optimization blueprint"
        ],
        "popular": false
      },
      {
        "id": "modern-data-stack",
        "name": "Modern Data Stack Implementation (Snowflake + dbt)",
        "price": 4699,
        "description": "End-to-end cloud data warehouse setup with automated extraction, dbt modeling, and BI dashboards.",
        "features": [
          "Snowflake / BigQuery / Databricks provisioning",
          "Automated ETL connectors (Fivetran/Airbyte)",
          "Production dbt transformation models & tests",
          "Interactive BI dashboard with executive KPIs",
          "3 months dedicated data engineering support"
        ],
        "popular": true
      },
      {
        "id": "enterprise-data-mesh",
        "name": "Enterprise Real-Time Analytics & Data Mesh",
        "price": 9400,
        "description": "Domain-driven data mesh architecture with real-time streaming, feature stores, and automated alerts.",
        "features": [
          "Real-time event streaming (Kafka/Flink)",
          "Domain-driven data mesh governance",
          "ML feature store & predictive modeling rails",
          "Automated data quality & anomaly alerts",
          "12 months enterprise data support SLA"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Patrick O'Connor",
        "role": "Head of Analytics, ClearScale Media",
        "text": "Our daily executive reports used to take 4 hours to compile. Their dbt and Snowflake setup automated everything in under 90 seconds with zero discrepancies.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Ananya Patel",
        "role": "Chief Data Officer, Valuence Logistics",
        "text": "The real-time streaming pipeline gives our operations team instant visibility across 14 global fulfillment centers. Outstanding ROI.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "Which cloud data warehouse is best for our scale (Snowflake, BigQuery, or Databricks)?",
        "a": "We evaluate your query patterns, concurrency, and existing cloud infrastructure to recommend the most cost-effective and scalable warehouse platform."
      },
      {
        "q": "How do you guarantee data accuracy and eliminate broken reports?",
        "a": "We implement automated dbt unit tests, schema drift alerts, and anomaly detection checks that block faulty data before it reaches production dashboards."
      },
      {
        "q": "Can you migrate our existing legacy SQL databases without downtime?",
        "a": "Yes, we use Change Data Capture (CDC) streaming to continuously replicate and validate data in parallel without impacting production databases."
      }
    ]
  },
  "tech-legacy-modern": {
    "id": "tech-legacy-modern",
    "industry": "Software Development / Tech Consulting",
    "name": "Legacy System Modernization & Cloud Refactoring",
    "hero": {
      "badge": "Enterprise Architecture Modernization",
      "headline": "Deconstruct Legacy Monoliths into",
      "accentText": "Scalable Cloud Microservices",
      "subtitle": "We migrate fragile legacy monolithic architectures into decoupled, high-velocity microservices with zero operational downtime and complete data integrity.",
      "primaryCta": "Plan Monolith Migration",
      "secondaryCta": "View Modernization Case Studies",
      "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["Zero Downtime Cutover", "Incremental Strangler Pattern", "100% Codebase Ownership"]
    },
    "stats": [
      { "value": "0 Disruption", "label": "Minutes During Live Cutover" },
      { "value": "75%", "label": "Reduction in Release Cycles" },
      { "value": "10x", "label": "Throughput Post-Refactoring" },
      { "value": "50+", "label": "Enterprise Systems Modernized" }
    ],
    "bentoFeatures": [
      {
        "title": "Strangler Fig Incremental Migration",
        "description": "Gradually carve out business domains into independent services without risky big-bang cutovers.",
        "image": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
        "badge": "Migration"
      },
      {
        "title": "Decoupled Microservices & Event Mesh",
        "description": "Event-driven asynchronous communication with Kafka/RabbitMQ ensuring high resilience and fault tolerance.",
        "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
        "badge": "Decoupling"
      },
      {
        "title": "Automated Testing & Regression Safety Net",
        "description": "Comprehensive integration test harnesses that prove functional parity between legacy and new services.",
        "image": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
        "badge": "Reliability"
      }
    ],
    "offerings": [
      {
        "id": "legacy-discovery",
        "name": "Monolith Assessment & Migration Roadmap",
        "price": 2199,
        "description": "Codebase dependency mapping, technical debt quantification, and phased migration blueprint.",
        "features": [
          "Legacy code dependency & database mapping",
          "Domain-driven design service boundary plan",
          "Technical debt & security risk audit",
          "Phased risk-mitigated cutover schedule",
          "Executive modernization presentation"
        ],
        "popular": false
      },
      {
        "id": "service-decoupling",
        "name": "Core Service Extraction & Microservices",
        "price": 5299,
        "description": "Extraction of your most critical business domain into a high-performance, containerized microservice.",
        "features": [
          "Service extraction using Strangler pattern",
          "Dual-write database synchronization pipeline",
          "Automated API proxy routing & canary releases",
          "Containerization (Docker & Kubernetes Helm)",
          "3 months dedicated engineering handover"
        ],
        "popular": true
      },
      {
        "id": "enterprise-overhaul",
        "name": "Full Enterprise Cloud Transformation",
        "price": 12500,
        "description": "Complete architectural transformation of your legacy software portfolio into modern cloud-native systems.",
        "features": [
          "Complete multi-service architecture overhaul",
          "Cloud-native CI/CD GitOps automation",
          "Comprehensive regression testing suite",
          "Full internal engineering upskilling workshops",
          "12 months enterprise architectural support"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Robert Vance",
        "role": "Chief Architect, Heritage Insurance Group",
        "text": "They decoupled our 14-year-old monolithic claims engine into modern services with zero downtime. Deployment times dropped from 3 weeks to 12 minutes.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Claire Dupond",
        "role": "VP Engineering, LogiTrans Global",
        "text": "The regression testing harness gave our leadership total confidence. Not a single customer experienced downtime during the entire migration.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "How do you ensure our existing business operations continue without downtime during migration?",
        "a": "We use the Strangler Fig pattern with dual-write proxy routing, keeping the legacy system operational while verifying parity before redirecting traffic."
      },
      {
        "q": "What migration patterns do you use to safely decouple monolithic databases?",
        "a": "We implement event-driven CDC (Change Data Capture) replication and saga orchestrations to decouple shared schemas into independent databases."
      },
      {
        "q": "How do you train our internal engineering team to maintain the new cloud architecture?",
        "a": "Every engagement includes pair programming, detailed architectural documentation, and hands-on runbook workshops for your engineering staff."
      }
    ]
  },
  "tech-iot-automation": {
    "id": "tech-iot-automation",
    "industry": "Software Development / Tech Consulting",
    "name": "Industrial IoT & Smart Automation Systems",
    "hero": {
      "badge": "Connected Hardware & Telemetry",
      "headline": "Intelligent IoT Platforms &",
      "accentText": "Industrial Edge Automation",
      "subtitle": "We engineer ultra-reliable firmware, MQTT edge telemetry gateways, and low-latency cloud control hubs for smart hardware and industrial manufacturing.",
      "primaryCta": "Explore IoT Architecture",
      "secondaryCta": "View Industrial Solutions",
      "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["MQTT / CoAP Hardened", "Sub-10ms Edge Control", "OTA Secure Firmware"]
    },
    "stats": [
      { "value": "1.5M+", "label": "Connected Edge Devices in Field" },
      { "value": "99.995%", "label": "Telemetry Ingestion Reliability" },
      { "value": "< 10ms", "label": "Edge Command Latency" },
      { "value": "100%", "label": "Encrypted Over-the-Air (OTA) Updates" }
    ],
    "bentoFeatures": [
      {
        "title": "Edge Telemetry & MQTT Mesh",
        "description": "High-efficiency binary serialization (Protobuf) transmitting sensor data over constrained cellular and satellite links.",
        "image": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        "badge": "Edge Data"
      },
      {
        "title": "Secure Cryptographic OTA Firmware",
        "description": "Cryptographically signed dual-partition bootloaders ensuring fail-safe rollbacks if updates are interrupted.",
        "image": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
        "badge": "Firmware"
      },
      {
        "title": "Real-Time Industrial SCADA Dashboards",
        "description": "Interactive digital twin visualization and automated threshold alerts running in browser web apps.",
        "image": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
        "badge": "Automation"
      }
    ],
    "offerings": [
      {
        "id": "iot-blueprint",
        "name": "IoT Architecture & Hardware Blueprint",
        "price": 2199,
        "description": "Microcontroller selection, power budget analysis, network protocol design, and cloud sizing.",
        "features": [
          "Hardware SoC & sensor selection matrix",
          "Power consumption & battery life modeling",
          "MQTT/CoAP telemetry protocol design",
          "End-to-end device security architecture",
          "Proof-of-concept prototype schema"
        ],
        "popular": false
      },
      {
        "id": "edge-gateway",
        "name": "Custom Edge Gateway & Telemetry Platform",
        "price": 5699,
        "description": "Production edge firmware with cloud ingestion broker, time-series database, and real-time dashboard.",
        "features": [
          "Custom embedded firmware (C++ / Rust / FreeRTOS)",
          "Scalable MQTT message broker cluster (EMQX)",
          "Time-series database (TimescaleDB / InfluxDB)",
          "Real-time web monitoring dashboard",
          "3 months dedicated hardware integration support"
        ],
        "popular": true
      },
      {
        "id": "enterprise-iiot",
        "name": "Turnkey Industrial IoT Fleet & SCADA Cloud",
        "price": 11500,
        "description": "Full-scale industrial automation cloud with predictive maintenance algorithms and cryptographic OTA updates.",
        "features": [
          "Complete fleet management & OTA server",
          "Edge ML predictive maintenance engine",
          "Modbus / OPC-UA industrial protocol bridges",
          "Custom multi-tenant enterprise portal",
          "12 months 24/7 mission-critical SLA"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Thomas Lindqvist",
        "role": "VP Operations, Nordic Automation AG",
        "text": "Their MQTT gateway and predictive maintenance algorithms reduced unpredicted factory downtime by 38% across our 6 manufacturing plants.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Megan Walsh",
        "role": "Lead Hardware Architect, Sensora Grid",
        "text": "The dual-partition cryptographic OTA update system deployed 45,000 firmware updates in the field without a single bricked device.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "Which wireless protocols and hardware chips does your firmware support?",
        "a": "We support ESP32, STM32, Nordic nRF52/53, Raspberry Pi CM4, and protocols including Cellular LTE-M/NB-IoT, LoRaWAN, BLE, and Wi-Fi."
      },
      {
        "q": "How are over-the-air (OTA) firmware updates secured against tampering?",
        "a": "All binaries are signed with ECDSA private keys and verified via hardware root-of-trust crypto chips (e.g. ATECC608) before execution."
      },
      {
        "q": "Can your cloud telemetry platform scale to millions of connected devices?",
        "a": "Yes, our distributed MQTT cluster and time-series backends are architected to ingest hundreds of thousands of concurrent data streams effortlessly."
      }
    ]
  },
  "ecommerce-luxury-fashion": {
    "id": "ecommerce-luxury-fashion",
    "industry": "Ecommerce / Retail",
    "name": "Minimalist Luxury Fashion & Atelier",
    "hero": {
      "badge": "Autumn / Winter '26 Collection",
      "headline": "Modern Minimalism in",
      "accentText": "Pure Cashmere & Silk",
      "subtitle": "Ethically sourced fabrics, architectural tailoring, and timeless silhouettes crafted in small artisan batches in Northern Italy.",
      "primaryCta": "Shop The Collection",
      "secondaryCta": "View Lookbook",
      "image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["100% Organic Fibers", "Complimentary Worldwide Express", "30-Day Atelier Returns"]
    },
    "stats": [
      { "value": "100%", "label": "Grade-A Mongolian Cashmere" },
      { "value": "35+", "label": "Artisan Craftsmanship Steps" },
      { "value": "2-Day", "label": "Express Global Delivery" },
      { "value": "0%", "label": "Plastic Packaging Used" }
    ],
    "bentoFeatures": [
      {
        "title": "Architectural Tailoring",
        "description": "Structured drape and refined proportion designed for effortless day-to-evening versatility.",
        "image": "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80",
        "badge": "Design"
      },
      {
        "title": "Ethical Sourcing & Traceability",
        "description": "Direct partnerships with certified organic pastures guaranteeing animal welfare and fair living wages.",
        "image": "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
        "badge": "Heritage"
      },
      {
        "title": "Lifetime Garment Care",
        "description": "Complimentary seasonal conditioning and de-pilling repair service included with every outerwear piece.",
        "image": "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
        "badge": "Guarantee"
      }
    ],
    "offerings": [
      {
        "id": "cashmere-overcoat",
        "name": "The Double-Faced Cashmere Overcoat",
        "price": 890,
        "description": "Unlined, hand-stitched double-faced Mongolian cashmere with horn button closures and raglan sleeves.",
        "features": [
          "100% Pure Mongolian Cashmere",
          "Hand-finished rolled edges",
          "Horn button closures",
          "Includes wooden cedar hanger & garment bag",
          "Free global express shipping"
        ],
        "popular": true
      },
      {
        "id": "silk-trousers",
        "name": "Pleated Mulberry Silk Trousers",
        "price": 420,
        "description": "High-waisted fluid trousers cut from heavy 28-momme mulberry silk with discreet slash pockets.",
        "features": [
          "100% Mulberry Silk (28-momme weight)",
          "High-rise tailored fit",
          "Hidden zip closure with mother-of-pearl tab",
          "Breathable natural fiber weave",
          "Complimentary custom hem alteration"
        ],
        "popular": false
      },
      {
        "id": "knit-sweater",
        "name": "Seamless Ribbed Cashmere Turtleneck",
        "price": 360,
        "description": "3D-knitted seamless construction for zero bulk and an impeccably smooth silhouette under tailored jackets.",
        "features": [
          "Seamless 3D knit technology",
          "Superfine 12-gauge yarn",
          "Ribbed collar, cuffs, and hem",
          "Hypoallergenic and ultra-soft against skin",
          "Machine washable on wool cycle"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Victoria St. Claire",
        "role": "Fashion Director, L'Édition Magazine",
        "text": "The drape and hand-feel of the double-faced cashmere overcoat rivals heritage luxury houses charging triple the price. A true masterpiece.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Camilla Thorne",
        "role": "Architect & Designer",
        "text": "Flawless packaging, fast delivery, and the fit of the pleated silk trousers is absolute perfection. My new favorite staple brand.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "What is your shipping and international delivery policy?",
        "a": "We offer complimentary express courier shipping worldwide (2-4 business days). All orders are tracked and insured with signature required on delivery."
      },
      {
        "q": "What is your return and exchange policy?",
        "a": "We accept returns and exchanges on unworn items within 30 days of delivery. Prepaid return shipping labels are included inside every parcel."
      },
      {
        "q": "How should I care for and clean 100% pure cashmere garments?",
        "a": "We recommend hand-washing in cool water with specialized wool detergent or gentle dry cleaning. Every coat includes our cedar hanger and protective canvas garment bag."
      }
    ]
  },
  "ecommerce-smart-tech": {
    "id": "ecommerce-smart-tech",
    "industry": "Ecommerce / Retail",
    "name": "Smart Tech & Precision Electronics",
    "hero": {
      "badge": "Next-Gen Audio Hardware",
      "headline": "Acoustic Engineering",
      "accentText": "Without Compromise",
      "subtitle": "Precision-milled aerospace aluminum, planar magnetic transducers, and hybrid active noise cancellation delivering audiophile-grade fidelity anywhere.",
      "primaryCta": "Order Now",
      "secondaryCta": "View Technical Specs",
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["2-Year Hardware Warranty", "Hi-Res Wireless Certified", "45-Day In-Home Trial"]
    },
    "stats": [
      { "value": "45hr", "label": "Continuous Battery Life" },
      { "value": "-42dB", "label": "Active Noise Cancellation Depth" },
      { "value": "5Hz-40kHz", "label": "Ultra-Wide Frequency Response" },
      { "value": "< 18ms", "label": "Low-Latency Gaming Mode" }
    ],
    "bentoFeatures": [
      {
        "title": "Planar Magnetic Drivers",
        "description": "Ultra-thin nanometer diaphragms deliver instantaneous transient response and zero harmonic distortion.",
        "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
        "badge": "Acoustics"
      },
      {
        "title": "Aerospace CNC Aluminum",
        "description": "Precision milled from single billets of 6000-series aluminum with memory foam lambskin earcups.",
        "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
        "badge": "Materials"
      },
      {
        "title": "Quad-Mic Beamforming ANC",
        "description": "Dual feedback and feedforward microphones process ambient frequencies 50,000 times per second.",
        "image": "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
        "badge": "Processing"
      }
    ],
    "offerings": [
      {
        "id": "apex-wireless",
        "name": "Apex Wireless Planar Headphones",
        "price": 389,
        "description": "Flagship wireless headphones featuring hybrid ANC, LDAC lossless codec, and 45-hour battery life.",
        "features": [
          "Planar magnetic 50mm transducers",
          "Hybrid 4-mic Active Noise Cancellation",
          "LDAC, aptX Adaptive & AAC support",
          "Aerospace aluminum frame with lambskin cups",
          "Hard travel case & braided USB-C cable"
        ],
        "popular": true
      },
      {
        "id": "magnetic-dock",
        "name": "MagDesk 3-in-1 Fast Charging Station",
        "price": 129,
        "description": "CNC aluminum charging hub powering your smartphone, earbuds, and smartwatch with intelligent thermals.",
        "features": [
          "15W Qi2 certified fast charging",
          "Heavy weighted aluminum anti-slip base",
          "Hidden cable routing channel",
          "Over-current & temperature protection",
          "Includes 65W GaN power adapter"
        ],
        "popular": false
      },
      {
        "id": "dac-amplifier",
        "name": "PocketStudio Portable Hi-Fi DAC/Amp",
        "price": 179,
        "description": "Dual ESS Sabre DAC chips providing balanced 4.4mm and 3.5mm output for studio monitors on the go.",
        "features": [
          "Dual ESS ES9038Q2M Sabre DACs",
          "Supports DSD512 & 32-bit/768kHz PCM",
          "Balanced 4.4mm + Single-ended 3.5mm outputs",
          "CNC chassis with OLED volume display",
          "Works with iOS, Android, macOS & Windows"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Julian Miller",
        "role": "Music Producer & Sound Engineer",
        "text": "The instrument separation and sub-bass clarity on the Apex Wireless matches studio open-backs costing well over $1,000. Incredible build quality.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Samantha Wu",
        "role": "Hardware Reviewer, TechPulse",
        "text": "The build quality is stunning—not a single piece of cheap plastic in sight. Battery lasts all week on a single charge.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "What is included in the 2-Year Hardware Warranty?",
        "a": "Our warranty covers all manufacturing defects, battery health degradation below 80%, and hardware malfunctions with immediate express replacement."
      },
      {
        "q": "How does the 45-day in-home trial work?",
        "a": "You have 45 days from delivery to test the audio in your own space. If not completely thrilled, return it for a 100% full refund with prepaid return shipping."
      },
      {
        "q": "Are these headphones compatible with iOS, Android, macOS, and Windows?",
        "a": "Yes, our headphones feature Bluetooth 5.3 Multipoint and USB-C Lossless Audio, allowing simultaneous connection to your phone and computer."
      }
    ]
  },
  "ecommerce-clean-skincare": {
    "id": "ecommerce-clean-skincare",
    "industry": "Ecommerce / Retail",
    "name": "Organic Botanical Skincare & Wellness",
    "hero": {
      "badge": "Cold-Pressed Botanical Potency",
      "headline": "Pure Botanical Science for",
      "accentText": "Luminous, Restored Skin",
      "subtitle": "Formulated with bioactive alpine botanicals, cold-pressed cold-filtered oils, and clinically proven adaptogens for deep cellular hydration.",
      "primaryCta": "Explore Formulations",
      "secondaryCta": "Take Skin Diagnostic",
      "image": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["100% Certified Organic", "Dermatologist Tested", "Cruelty-Free & Vegan"]
    },
    "stats": [
      { "value": "98%", "label": "Bioactive Natural Ingredient Purity" },
      { "value": "72hr", "label": "Clinically Proven Moisture Retention" },
      { "value": "0%", "label": "Parabens, Sulfates, or Synthetics" },
      { "value": "100%", "label": "Recyclable Amber Glass Packaging" }
    ],
    "bentoFeatures": [
      {
        "title": "Cold-Pressed Bioactive Potency",
        "description": "Small-batch cold extraction preserves active phytosterols, polyphenols, and essential fatty acids.",
        "image": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
        "badge": "Formulation"
      },
      {
        "title": "Wildcrafted Alpine Botanicals",
        "description": "Sustainably harvested edelweiss, sea buckthorn, and rosehip rich in natural antioxidants.",
        "image": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
        "badge": "Ingredients"
      },
      {
        "title": "Clinically Proven Moisture Barrier",
        "description": "Plant-derived bio-identical ceramides that strengthen the skin lipid barrier and lock in hydration.",
        "image": "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
        "badge": "Efficacy"
      }
    ],
    "offerings": [
      {
        "id": "renewing-serum",
        "name": "Alpine Flora Cellular Renewal Serum",
        "price": 88,
        "description": "Concentrated plant stem cells, multi-weight hyaluronic acid, and niacinamide for radiant skin renewal.",
        "features": [
          "Bioactive Edelweiss Stem Cells",
          "Triple-molecular weight Hyaluronic Acid",
          "5% Niacinamide & Bakuchiol (gentle retinol alternative)",
          "Amber glass bottle with precision pipette",
          "Suitable for all skin types including sensitive"
        ],
        "popular": true
      },
      {
        "id": "barrier-cream",
        "name": "Bioactive Ceramide Velvet Hydration Cream",
        "price": 74,
        "description": "Rich nourishing emulsion with oat ceramides, squalane, and cupuaçu butter for 72-hour moisture lock.",
        "features": [
          "3% Oat Lipid Complex & Phyto-Ceramides",
          "Cold-pressed Olive Squalane",
          "Unscented & essential oil free",
          "Strengthens compromised skin barrier",
          "Matte non-greasy velvet finish"
        ],
        "popular": false
      },
      {
        "id": "ritual-duo",
        "name": "The Complete Radiant Barrier Set",
        "price": 145,
        "description": "Our complete two-step daily protocol: Alpine Renewal Serum and Velvet Hydration Cream with ceramic bowl.",
        "features": [
          "Full-size Renewal Serum (30ml)",
          "Full-size Velvet Hydration Cream (50ml)",
          "Handmade ceramic mixing dish & spatula",
          "Complimentary travel botanical mist (15ml)",
          "Free express carbon-neutral shipping"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Dr. Isabelle Mercier",
        "role": "Board-Certified Dermatologist",
        "text": "The formulation integrity is exemplary. The ceramide ratio in the Velvet Cream visibly restores compromised lipid barriers in under a week.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Hannah Lindstrom",
        "role": "Beauty Editor, Glow Journal",
        "text": "My skin has never looked so calm and hydrated. The Alpine Flora Serum gives an effortless, glass-like radiance without clogging pores.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "Are your skincare formulations suitable for sensitive or acne-prone skin?",
        "a": "Yes, our formulas are 100% non-comedogenic, free of essential oils and synthetic fragrances, and dermatologist-tested on sensitive skin types."
      },
      {
        "q": "Where are your botanical ingredients sourced and produced?",
        "a": "Our botanicals are ethically wildcrafted and organic certified from alpine farms in Switzerland and France, bottled in small batches in certified laboratories."
      },
      {
        "q": "What is your return policy if a product is incompatible with my skin?",
        "a": "We offer a 30-day skin satisfaction guarantee. If our formulations do not agree with your skin, contact us for an immediate 100% refund."
      }
    ]
  },
  "ecommerce-scandi-living": {
    "id": "ecommerce-scandi-living",
    "industry": "Ecommerce / Retail",
    "name": "Scandinavian Architectural Living & Decor",
    "hero": {
      "badge": "Nordic Living Collection",
      "headline": "Architectural Harmony in",
      "accentText": "Solid Oak & Linen",
      "subtitle": "Timeless Nordic minimalism crafted from FSC-certified sustainable hardwoods, natural wool, and hand-finished oiled oak.",
      "primaryCta": "Shop Furniture",
      "secondaryCta": "Browse Interior Catalog",
      "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["FSC Certified Hardwoods", "White Glove Home Delivery", "10-Year Frame Warranty"]
    },
    "stats": [
      { "value": "100%", "label": "FSC-Certified European White Oak" },
      { "value": "10 Years", "label": "Structural Frame Warranty" },
      { "value": "0 VOC", "label": "Natural Oiled Wood Finishes" },
      { "value": "5-Star", "label": "White Glove Room-of-Choice Delivery" }
    ],
    "bentoFeatures": [
      {
        "title": "Traditional Mortise & Tenon Joinery",
        "description": "Precision wood joints engineered for generational structural integrity without metal brackets.",
        "image": "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
        "badge": "Craftsmanship"
      },
      {
        "title": "Architectural Nordic Proportions",
        "description": "Low-profile silhouettes and organic curved geometry inspired by mid-century Scandinavian masters.",
        "image": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        "badge": "Design"
      },
      {
        "title": "Sustainable Low-Impact Living",
        "description": "Certified non-toxic plant wax finishes and natural OEKO-TEX wool and linen upholstery.",
        "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
        "badge": "Sustainability"
      }
    ],
    "offerings": [
      {
        "id": "oak-lounge-chair",
        "name": "The Stockholm Solid Oak Lounge Chair",
        "price": 680,
        "description": "Sculptural solid European white oak frame with high-resilience foam and Danish wool upholstery.",
        "features": [
          "FSC-certified solid European white oak",
          "Danish Kvadrat virgin wool blend cushion",
          "Hand-rubbed organic matte oil finish",
          "Mortise and tenon joinery",
          "10-year structural warranty"
        ],
        "popular": true
      },
      {
        "id": "dining-table",
        "name": "Oiled Oak Architectural Dining Table",
        "price": 1450,
        "description": "Generous 8-seater dining table crafted from solid continuous-grain oak planks with beveled edge profile.",
        "features": [
          "Solid 35mm thick European oak top",
          "Seats 8-10 adults comfortably (240cm length)",
          "Zero-VOC natural protective hardwax oil",
          "Detachable architectural tapered legs",
          "Includes wood care & maintenance oil kit"
        ],
        "popular": false
      },
      {
        "id": "linen-credenza",
        "name": "Minimalist Oak & Slatted Credenza",
        "price": 1180,
        "description": "Six-compartment storage sideboard featuring tambour slatted sliding doors and integrated cable passages.",
        "features": [
          "Seamless tambour slatted oak sliding doors",
          "Soft-close internal dovetailed drawers",
          "Concealed media & wire routing channels",
          "Adjustable interior solid oak shelving",
          "White-glove room-of-choice setup included"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Henrik Lindqvist",
        "role": "Principal Architect, Studio Nord",
        "text": "The joinery and finish of the Stockholm lounge chair is comparable to bespoke Danish workshop pieces. Impeccable balance of comfort and form.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Mia Davenport",
        "role": "Interior Stylist, Habitat Weekly",
        "text": "The white glove delivery team was fantastic, and the oak dining table has become the stunning centerpiece of our open-plan living room.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "How does white-glove delivery and in-home assembly work?",
        "a": "Our logistics team delivers your furniture directly to your room of choice, completes full assembly, and removes all packaging materials."
      },
      {
        "q": "How do I maintain and protect the natural oiled wood finish?",
        "a": "We provide a complimentary maintenance kit with organic wax oil. Applying oil once or twice a year keeps the wood nourished and stain-resistant."
      },
      {
        "q": "Can I order wood and fabric swatch samples before purchasing?",
        "a": "Yes! You can request our complimentary designer sample box containing real oak finishes and Danish fabric swatches with free 2-day delivery."
      }
    ]
  },
  "ecommerce-activewear": {
    "id": "ecommerce-activewear",
    "industry": "Ecommerce / Retail",
    "name": "High-Performance Athletic Apparel & Gear",
    "hero": {
      "badge": "Pro Performance Engineered",
      "headline": "Zero-Distraction Athletic Wear",
      "accentText": "Engineered for Peak Output",
      "subtitle": "Seamless four-way stretch fabrics, targeted gradient compression, and moisture-wicking thermoregulation built for endurance and power.",
      "primaryCta": "Shop Activewear",
      "secondaryCta": "View Performance Tech",
      "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["4-Way Aeroflex Stretch", "Silver-Ion Anti-Odor Tech", "Free Returns & Exchanges"]
    },
    "stats": [
      { "value": "4-Way", "label": "Seamless Gradient Compression" },
      { "value": "3x Faster", "label": "Sweat Evaporation Rate" },
      { "value": "99.9%", "label": "Silver-Ion Anti-Odor Efficacy" },
      { "value": "60-Day", "label": "In-Motion Satisfaction Guarantee" }
    ],
    "bentoFeatures": [
      {
        "title": "3D Seamless Knit Construction",
        "description": "Zero chafing seams with engineered micro-perforations for optimal ventilation during high-intensity training.",
        "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
        "badge": "Seamless"
      },
      {
        "title": "Targeted Muscle Zone Compression",
        "description": "Graduated elasticity stabilizes major muscle groups, reducing micro-tears and speeding lactate recovery.",
        "image": "https://images.unsplash.com/photo-1483721074579-b0f76d62d564?auto=format&fit=crop&w=800&q=80",
        "badge": "Compression"
      },
      {
        "title": "Breathable Thermal Body-Mapping",
        "description": "Phase-change fibers that absorb excess body heat during sprints and release warmth during recovery.",
        "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
        "badge": "Thermoregulation"
      }
    ],
    "offerings": [
      {
        "id": "aero-tights",
        "name": "Kinetic Seamless Compression Tights",
        "price": 118,
        "description": "High-waisted 3D knitted compression tights with bounce-free phone pocket and anti-slip waistband.",
        "features": [
          "Targeted quad & hamstring compression",
          "High-rise stay-put bonded waistband",
          "Deep bounce-free dual side pockets",
          "Reflective 360-degree night visibility",
          "Squat-proof opaque 240gsm Aeroflex fabric"
        ],
        "popular": false
      },
      {
        "id": "velocity-hoodie",
        "name": "AeroGrid Thermal Performance Hoodie",
        "price": 148,
        "description": "Lightweight wind-resistant training hoodie with thermal grid lining, thumbholes, and concealed zip pocket.",
        "features": [
          "Micro-grid thermal fleece interior",
          "DWR water-repellent outer shell",
          "Ergonomic scuba hood with ponytail port",
          "Articulated raglan sleeve construction",
          "Anti-microbial silver-ion treatment"
        ],
        "popular": true
      },
      {
        "id": "training-short",
        "name": "Pro-Series 2-in-1 Lined Training Short",
        "price": 78,
        "description": "Ultralight perforated outer shell combined with a compressive boxer-brief liner and shirt loop.",
        "features": [
          "Built-in 7-inch compression liner",
          "Sweat-proof zippered rear media pocket",
          "Integrated towel or t-shirt storage loop",
          "Laser-cut ventilation hem slits",
          "Ultra-durable four-way ripstop stretch"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Caleb Foster",
        "role": "Ultra-Marathon Runner & Coach",
        "text": "Ran 50 miles in the Kinetic Compression Tights with zero chafing and no adjustments needed. The moisture management is superior to any major athletic brand.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Lauren Taylor",
        "role": "Olympic Weightlifting Athlete",
        "text": "The 2-in-1 training shorts are lightweight yet extremely durable. They hold up to heavy barbell cleans without catching or riding up.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "What makes your seamless fabric more durable than traditional athletic wear?",
        "a": "Our 3D circular knitting eliminates sewn seams that typically fray, creating an interwoven matrix of high-tenacity nylon and elastane."
      },
      {
        "q": "How do I find the right compression size for my training?",
        "a": "Check our precise size guide with height and weight charts. For targeted recovery compression, select your true size; for a relaxed fit, size up."
      },
      {
        "q": "What is your 60-day in-motion satisfaction guarantee?",
        "a": "Test our gear in real workouts, runs, and washes for 60 days. If you're not completely satisfied with the performance, return it for a full refund."
      }
    ]
  },
  "ecommerce-artisan-coffee": {
    "id": "ecommerce-artisan-coffee",
    "industry": "Ecommerce / Retail",
    "name": "Specialty Single-Origin Artisan Coffee Roasters",
    "hero": {
      "badge": "Micro-Lot Direct Trade",
      "headline": "Exceptional Single-Origin Coffee",
      "accentText": "Freshly Roasted to Order",
      "subtitle": "Direct-trade micro-lots sourced from high-altitude estates in Ethiopia, Colombia, and Guatemala, precision-roasted in small 12kg batches.",
      "primaryCta": "Discover Single Origins",
      "secondaryCta": "Join Roaster Subscription",
      "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["Direct Trade Certified", "Roasted Within 48h of Dispatch", "100% Compostable Bags"]
    },
    "stats": [
      { "value": "88+", "label": "Specialty Coffee Cup Score" },
      { "value": "48hr", "label": "Max Roasting-to-Dispatch Window" },
      { "value": "100%", "label": "Direct-Trade Premiums Paid" },
      { "value": "0%", "label": "Artificial Flavors or Additives" }
    ],
    "bentoFeatures": [
      {
        "title": "Direct Trade Farm Partnerships",
        "description": "We pay 2.5x Fair Trade prices directly to partner farmers, investing in regenerative soil health and processing.",
        "image": "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
        "badge": "Origin"
      },
      {
        "title": "Small-Batch Precision Roasting",
        "description": "Custom thermodynamic roast curves profiling delicate floral aromatics and vibrant fruity acidity.",
        "image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
        "badge": "Roasting"
      },
      {
        "title": "Barista-Grade Micro-Lot Selection",
        "description": "Rigorous cupping scores over 88 points with detailed terroir, elevation, and varietal tasting notes.",
        "image": "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80",
        "badge": "Brewing"
      }
    ],
    "offerings": [
      {
        "id": "ethiopia-microlot",
        "name": "Yirgacheffe Natural Process Micro-Lot",
        "price": 24,
        "description": "Heirloom varietals from 2,100m elevation featuring tasting notes of wild blueberry, jasmine, and bergamot.",
        "features": [
          "Origin: Yirgacheffe, Gedeb District, Ethiopia",
          "Elevation: 2,050m - 2,200m",
          "Process: Natural Sun-Dried on Raised Beds",
          "Cup Score: 89.5 Points (Specialty Grade)",
          "Freshly roasted and nitrogen-sealed (250g bag)"
        ],
        "popular": false
      },
      {
        "id": "roaster-curation",
        "name": "Monthly Roaster's Reserve Subscription",
        "price": 46,
        "description": "Two freshly roasted 250g bags of rare single-origin micro-lots delivered to your door every month.",
        "features": [
          "2x 250g Bags of rotating single-origin harvests",
          "Includes roaster cupping notes & brew recipes",
          "Free shipping with letterbox-friendly packaging",
          "Pause, skip, or cancel anytime with one click",
          "Exclusive subscriber-only early harvests"
        ],
        "popular": true
      },
      {
        "id": "coldbrew-blend",
        "name": "Altitude Reserve Cold Brew & Espresso Blend",
        "price": 22,
        "description": "Rich Colombian and washed Guatemalan beans delivering dark chocolate, toasted hazelnut, and brown sugar notes.",
        "features": [
          "Origins: Huila (Colombia) & Antigua (Guatemala)",
          "Tasting Notes: Dark Chocolate, Praline, Caramel",
          "Ideal for espresso, moka pot, and cold brew",
          "Medium roast profile with sweet crema",
          "100% compostable valve packaging (350g)"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Simon Dubois",
        "role": "Master Barista & Q-Grader",
        "text": "The Yirgacheffe natural is one of the cleanest, most vibrant Ethiopian coffees I've tasted this year. The blueberry aroma fills the entire room upon grinding.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Emma Vance",
        "role": "Head of Beverage, Artisan Cafés",
        "text": "The monthly roaster reserve subscription has transformed our morning ritual. Always roasted within 48 hours and consistently extraordinary.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "How fresh is the coffee when it arrives at my doorstep?",
        "a": "All coffee is roasted within 24 to 48 hours of shipment and packaged in one-way degassing valve bags to ensure peak freshness."
      },
      {
        "q": "Can I choose between whole bean and specific grind sizes?",
        "a": "Yes! We offer Whole Bean, Espresso, Pour-Over / Filter, Aeropress, and French Press / Cold Brew grind options."
      },
      {
        "q": "How does the flexible coffee subscription work?",
        "a": "You can select weekly, bi-weekly, or monthly delivery schedules and change bean selections, pause, or cancel at any time from your customer account."
      }
    ]
  },
  "ecommerce-sustainable": {
    "id": "ecommerce-sustainable",
    "industry": "Ecommerce / Retail",
    "name": "Zero-Waste Sustainable Living & Home Goods",
    "hero": {
      "badge": "Circular Design & Zero-Waste",
      "headline": "Thoughtful Everyday Goods for",
      "accentText": "A Zero-Waste Home",
      "subtitle": "Plastic-free, toxin-free kitchenware, organic bath essentials, and closed-loop refill solutions designed to last a lifetime.",
      "primaryCta": "Shop Sustainable Essentials",
      "secondaryCta": "Explore Refill System",
      "image": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["100% Plastic-Free", "Certified B-Corporation", "Carbon-Neutral Shipping"]
    },
    "stats": [
      { "value": "100%", "label": "Plastic-Free & Toxin-Free" },
      { "value": "250k+", "label": "Single-Use Containers Diverted" },
      { "value": "1%", "label": "for the Planet Certified Member" },
      { "value": "100%", "label": "Carbon-Neutral Global Logistics" }
    ],
    "bentoFeatures": [
      {
        "title": "Zero-Waste Circular Kitchenware",
        "description": "Lifetime-grade cast iron, stainless steel food containers, and organic beeswax food wraps.",
        "image": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
        "badge": "Zero-Waste"
      },
      {
        "title": "Organic GOTS-Certified Fibers",
        "description": "Unbleached organic cotton towels and Belgian linen home textiles free from harmful chemical dyes.",
        "image": "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80",
        "badge": "Organic"
      },
      {
        "title": "Refillable Glass & Aluminum Systems",
        "description": "Concentrated plant-based household cleaning and personal care tablets in infinitely recyclable vessels.",
        "image": "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
        "badge": "Circular"
      }
    ],
    "offerings": [
      {
        "id": "zero-waste-starter",
        "name": "The Zero-Waste Home Starter Kit",
        "price": 85,
        "description": "Complete curated collection of bamboo kitchen brushes, organic cotton produce bags, and glass soap dispensers.",
        "features": [
          "Set of 4 sisal & coconut fiber dish brushes",
          "Set of 5 organic GOTS cotton mesh produce bags",
          "2x Amber glass refillable pump bottles (500ml)",
          "Set of 3 organic beeswax food wraps",
          "Comes in 100% recycled biodegradable gift box"
        ],
        "popular": true
      },
      {
        "id": "cast-iron-skillet",
        "name": "Pre-Seasoned Heirloom Cast Iron Skillet",
        "price": 120,
        "description": "Hand-cast non-toxic skillet pre-seasoned with organic flaxseed oil, designed to be passed down generations.",
        "features": [
          "Smooth machine-polished cooking surface",
          "Triple-seasoned with organic flaxseed oil",
          "Naturally non-stick with zero PTFE/PFOA chemicals",
          "Compatible with induction, gas, oven, and campfires",
          "Lifetime heirloom guarantee"
        ],
        "popular": false
      },
      {
        "id": "organic-linen-set",
        "name": "GOTS Certified Belgian Linen Bedding Bundle",
        "price": 240,
        "description": "Stonewashed pure Belgian flax duvet cover and pillowcase set that gets softer with every wash.",
        "features": [
          "100% Organic European Flax Linen",
          "GOTS & OEKO-TEX Standard 100 Certified",
          "Naturally temperature-regulating & hypoallergenic",
          "Coconut shell button closures",
          "Includes linen storage tote bag"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Claire Beauchamp",
        "role": "Sustainability Director, EcoLiving Org",
        "text": "The heirloom cast iron skillet is truly remarkable. The machined surface cooks like high-end non-stick without any toxic chemicals or microplastics.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "David Thorne",
        "role": "Minimalist Home Enthusiast",
        "text": "Every single item in the zero-waste kit arrived in paper-tape packaging with zero plastic. Beautiful craftsmanship and true environmental commitment.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "How does your 100% plastic-free packaging and shipping work?",
        "a": "All orders are packaged in recycled kraft cardboard, sealed with water-activated paper tape, and protected with compostable cornstarch peanuts."
      },
      {
        "q": "Are your products backed by third-party sustainability certifications?",
        "a": "Yes, our products carry GOTS Organic, OEKO-TEX Standard 100, and FSC Wood certifications, and our company is a certified B-Corporation."
      },
      {
        "q": "How does the closed-loop refill program work for cleaning and body care?",
        "a": "You order compact dissolvable tablet refills that ship in compostable paper pouches, eliminating 95% of shipping weight and plastic waste."
      }
    ]
  },
  "ecommerce-ergonomic-office": {
    "id": "ecommerce-ergonomic-office",
    "industry": "Ecommerce / Retail",
    "name": "Ergonomic Office Furniture & Active Workstations",
    "hero": {
      "badge": "Precision Workplace Ergonomics",
      "headline": "Engineered Workstations for",
      "accentText": "Peak Focus & Posture",
      "subtitle": "Dual-motor solid hardwood standing desks, dynamic lumbar seating, and modular aluminum monitor arms designed for healthy, high-output workdays.",
      "primaryCta": "Shop Workstations",
      "secondaryCta": "Explore Ergonomic Guide",
      "image": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["15-Year Desk Frame Warranty", "100-Day Risk-Free Trial", "Quiet Dual-Motor Lift"]
    },
    "stats": [
      { "value": "350lbs", "label": "Lift Capacity on Dual Motors" },
      { "value": "15 Years", "label": "Comprehensive Frame Warranty" },
      { "value": "< 45dB", "label": "Whisper-Quiet Height Adjustment" },
      { "value": "100-Day", "label": "In-Office Risk-Free Trial" }
    ],
    "bentoFeatures": [
      {
        "title": "Solid Walnut & Oak Desktops",
        "description": "Sustainably harvested 1.5-inch thick solid hardwoods with contoured comfort edges and grommet pass-throughs.",
        "image": "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
        "badge": "Hardwoods"
      },
      {
        "title": "Adaptive Tri-Zone Lumbar Support",
        "description": "Dynamic synchro-tilt mechanism with self-adjusting lumbar tension that responds to posture changes.",
        "image": "https://images.unsplash.com/photo-1580481077197-98782a20839e?auto=format&fit=crop&w=800&q=80",
        "badge": "Ergonomics"
      },
      {
        "title": "Modular Cable & Monitor Management",
        "description": "Magnetic under-desk cable raceways, integrated power hubs, and gas-spring dual monitor arms.",
        "image": "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=80",
        "badge": "Modularity"
      }
    ],
    "offerings": [
      {
        "id": "vertex-standing-desk",
        "name": "Vertex Pro Solid Walnut Standing Desk",
        "price": 799,
        "description": "Dual-motor motorized standing desk with OLED digital handset, 4 memory presets, and solid American walnut top.",
        "features": [
          "Solid American Walnut top (60 x 30 inches)",
          "Dual German-engineered quiet motors (350 lbs lift)",
          "Height range: 24.5\" to 50.2\" with anti-collision sensors",
          "Digital OLED memory controller with 4 presets",
          "15-year warranty on frame, motors, and electronics"
        ],
        "popular": true
      },
      {
        "id": "lumbar-chair",
        "name": "Ergoflex Pro Adaptive Mesh Task Chair",
        "price": 489,
        "description": "High-back breathable elastomeric mesh chair with 4D armrests and auto-tuning lumbar support.",
        "features": [
          "German elastomeric breathable mesh back & seat",
          "Dynamic tri-zone adaptive lumbar support",
          "4D adjustable armrests (height, angle, depth, width)",
          "Smooth synchro-tilt with 4 recline lock positions",
          "12-year structural warranty & rollerblade casters"
        ],
        "popular": false
      },
      {
        "id": "dual-monitor-arm",
        "name": "Aerospace CNC Dual Monitor Arm System",
        "price": 189,
        "description": "Heavy-duty gas spring dual monitor mount supporting up to two 34-inch ultrawide screens with integrated cables.",
        "features": [
          "Precision CNC machined aerospace aluminum",
          "Supports 2x monitors from 17\" up to 34\" ultrawide",
          "Smooth 360-degree rotation, 90-degree swivel, and tilt",
          "Integrated concealed cable management track",
          "Quick-release VESA 75/100 mounting plates"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Jonathan Reed",
        "role": "Senior Software Engineer, Apex Systems",
        "text": "The Vertex Pro standing desk transformed my workday. The walnut desktop is gorgeous, and the dual motors adjust effortlessly between sitting and standing.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Dr. Melissa Chen",
        "role": "Occupational Ergonomist & Physical Therapist",
        "text": "I recommend the Ergoflex Pro to all my patients suffering from lower back fatigue. The adaptive lumbar mechanism provides genuine spinal relief.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "How easy is it to assemble the standing desk?",
        "a": "The desk ships with pre-assembled sub-frames and quick-connect electronic cables. Most customers complete setup in under 20 minutes with our included tool kit."
      },
      {
        "q": "What is covered under the 15-Year Frame Warranty?",
        "a": "Our 15-year warranty covers the solid steel desk frame, dual electric motors, digital control box, power supply, and anti-collision mechanisms."
      },
      {
        "q": "How does the 100-day risk-free in-office trial work?",
        "a": "Try our furniture in your workspace for 100 days. If you are not completely satisfied, we arrange free pickup and issue a 100% full refund."
      }
    ]
  },
  "ecommerce-heritage-leather": {
    "id": "ecommerce-heritage-leather",
    "industry": "Ecommerce / Retail",
    "name": "Handcrafted Heritage Leather Goods & Footwear",
    "hero": {
      "badge": "Full-Grain Tuscan Leather",
      "headline": "Handcrafted Heritage Leather",
      "accentText": "Made to Last a Lifetime",
      "subtitle": "Vegetable-tanned full-grain leather, hand-pegged Goodyear welted boots, and solid brass hardware crafted by multi-generational artisans in Tuscany.",
      "primaryCta": "Shop Leather Goods",
      "secondaryCta": "Discover Leather Craft",
      "image": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["100% Full-Grain Tuscan Leather", "Lifetime Craftsmanship Warranty", "Natural Vegetable-Tanned"]
    },
    "stats": [
      { "value": "100%", "label": "Vegetable-Tanned Full-Grain Leather" },
      { "value": "Lifetime", "label": "Craftsmanship & Stitching Guarantee" },
      { "value": "40+ Yrs", "label": "Rich Patina Aging Longevity" },
      { "value": "0%", "label": "Synthetic Fillers or Bonded Leather" }
    ],
    "bentoFeatures": [
      {
        "title": "Full-Grain Tuscan Vegetable Tanning",
        "description": "Tanned with natural oak and chestnut barks over 60 days in historical Santa Croce sull'Arno tanneries.",
        "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        "badge": "Tannery"
      },
      {
        "title": "Goodyear Welt Construction",
        "description": "Time-honored resolable welt construction with cork filler that molds to your unique foot shape.",
        "image": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
        "badge": "Footwear"
      },
      {
        "title": "Solid Cast Brass Hardware & Saddle Stitching",
        "description": "Heavy gauge solid brass buckles and hand-waxed bonded polyester thread that will never tear.",
        "image": "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
        "badge": "Stitching"
      }
    ],
    "offerings": [
      {
        "id": "executive-briefcase",
        "name": "The Tuscan Full-Grain Briefcase",
        "price": 580,
        "description": "Classic double-gusset leather briefcase with padded 16-inch laptop compartment, solid brass hardware, and shoulder strap.",
        "features": [
          "100% Full-Grain Vegetable-Tanned Tuscan Leather",
          "Solid cast brass hardware & Swiss Amiet locks",
          "Dedicated padded sleeve for up to 16\" laptops",
          "Adjustable leather shoulder strap with ergonomic pad",
          "Lifetime warranty on stitching and hardware"
        ],
        "popular": true
      },
      {
        "id": "welted-boots",
        "name": "Goodyear Welted Service Boot",
        "price": 390,
        "description": "Rugged service boot crafted from 5oz pull-up leather, Vibram rubber lug outsole, and natural cork insole.",
        "features": [
          "Full 360-degree Goodyear welted construction (resolable)",
          "Vibram Mini-Lug rubber outsole for all-weather grip",
          "Full-grain calfskin glove leather interior lining",
          "Natural cork footbed that custom molds over time",
          "Includes 2 pairs of waxed cotton & leather laces"
        ],
        "popular": false
      },
      {
        "id": "bifold-wallet",
        "name": "Hand-Stitched Vegetable-Tanned Bifold",
        "price": 95,
        "description": "Slim minimalist 6-card bifold wallet with full-length cash slot, hand-beveled edges, and beeswax finish.",
        "features": [
          "Hand-stitched with heavy waxed saddle thread",
          "6 card slots plus 2 hidden interior pockets",
          "Full-length currency slot for international banknotes",
          "Burnished and beeswax-sealed edges",
          "Develops rich unique patina with daily carry"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Arthur Pendelton",
        "role": "Heritage Goods Collector & Writer",
        "text": "The leather aroma and rich pull-up effect on the Tuscan Briefcase is extraordinary. Three years of international travel and it looks even better than day one.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Marcus Vance",
        "role": "Creative Director, Atelier Studio",
        "text": "The Goodyear welted service boots broke in comfortably within three days. Incredible attention to detail, from the brass eyelets to the leather lining.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "How will full-grain vegetable-tanned leather age and develop patina over time?",
        "a": "As you use your leather goods, exposure to sun, natural oils from your hands, and daily wear will deepen the color into a lustrous golden-caramel patina."
      },
      {
        "q": "What is covered by the Lifetime Craftsmanship Warranty?",
        "a": "Our lifetime warranty covers all structural leather stitching, rivets, solid brass hardware, and zippers. If any hardware fails, we repair or replace it free of charge."
      },
      {
        "q": "How should I condition and maintain my handcrafted leather goods?",
        "a": "Wipe with a damp cloth to remove dust and apply natural beeswax or jojoba-based leather balm once or twice a year to keep the grain supple."
      }
    ]
  },
  "hosting-cloud-vps": {
    "id": "hosting-cloud-vps",
    "industry": "Web Hosting",
    "name": "High-Performance NVMe Cloud VPS & Compute",
    "hero": {
      "badge": "Enterprise Cloud Infrastructure",
      "headline": "High-Frequency NVMe Cloud Compute",
      "accentText": "Built for Peak Performance",
      "subtitle": "Deploy dedicated AMD EPYC 9004 processors, Gen4 NVMe enterprise storage, and 10Gbps unmetered uplinks across 18 global datacenter locations in under 45 seconds.",
      "primaryCta": "Deploy Cloud VPS",
      "secondaryCta": "Compare Instance Specs",
      "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["99.999% SLA Guarantee", "10Gbps Unmetered Uplink", "Free Automated Daily Snapshots"]
    },
    "stats": [
      { "value": "99.999%", "label": "Network & Power Uptime SLA" },
      { "value": "< 45s", "label": "Instant Server Provisioning" },
      { "value": "18", "label": "Global Tier-4 Datacenters" },
      { "value": "10Gbps", "label": "Redundant DDoS Protected Uplink" }
    ],
    "bentoFeatures": [
      {
        "title": "AMD EPYC 9004 Compute",
        "description": "Guaranteed dedicated CPU cycles with 4.1GHz turbo frequencies and zero CPU throttling.",
        "image": "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80",
        "badge": "Processors"
      },
      {
        "title": "Enterprise PCIe 4.0 NVMe Storage",
        "description": "Blazing read/write performance reaching over 700,000 IOPS with RAID-10 data redundancy.",
        "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
        "badge": "Storage"
      },
      {
        "title": "Automated BGP & DDoS Shield",
        "description": "Real-time 3.2Tbps global mitigation scrubbing malicious traffic before it reaches your instances.",
        "image": "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
        "badge": "Security"
      }
    ],
    "offerings": [
      {
        "id": "vps-starter",
        "name": "Cloud Pro (4 vCPU / 8GB RAM)",
        "price": 39,
        "description": "Ideal for production web applications, high-traffic API servers, and database backends.",
        "features": [
          "4 Dedicated AMD EPYC vCPUs",
          "8GB ECC DDR5 RAM",
          "160GB Gen4 NVMe RAID-10 Storage",
          "5TB Monthly Transfer @ 10Gbps",
          "1 Dedicated IPv4 + /64 IPv6 Subnet",
          "Daily automated backup snapshots"
        ],
        "popular": true
      },
      {
        "id": "vps-scale",
        "name": "Cloud Enterprise (8 vCPU / 16GB RAM)",
        "price": 79,
        "description": "Heavy multi-tenant clusters, analytics processing, and enterprise Docker/Kubernetes workloads.",
        "features": [
          "8 Dedicated AMD EPYC vCPUs",
          "16GB ECC DDR5 RAM",
          "320GB Gen4 NVMe RAID-10 Storage",
          "10TB Monthly Transfer @ 10Gbps",
          "2 Dedicated IPv4 + /64 IPv6 Subnet",
          "Free automated failover routing"
        ],
        "popular": false
      },
      {
        "id": "vps-dedicated",
        "name": "Bare-Metal Compute (16 vCPU / 64GB RAM)",
        "price": 199,
        "description": "Maximum dedicated performance with root access, zero virtualization overhead, and IPMI console.",
        "features": [
          "16 Physical High-Freq CPU Cores",
          "64GB ECC DDR5 RAM",
          "2x 1TB NVMe Storage (Hardware RAID-1)",
          "Unlimited Bandwidth @ 10Gbps",
          "5 Usable Dedicated IPv4 Addresses",
          "24/7 Priority Data Center Support"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Derek Lindqvist",
        "role": "Head of DevOps, QuantStream",
        "text": "We migrated our trading simulation instances to their NVMe Cloud VPS and saw a 3.4x IOPS throughput increase with zero downtime in 14 months.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Siddharth Nair",
        "role": "Lead Architect, PayScale Cloud",
        "text": "The 10Gbps uplink and automated BGP failover have been rock solid. Deployment takes under a minute, and support answers technical tickets in under 5 minutes.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "Where are your datacenter facilities located?",
        "a": "We operate in 18 global tier-4 facilities including Singapore, Tokyo, Hong Kong, Frankfurt, London, New York, and Silicon Valley."
      },
      {
        "q": "What SLA guarantee do you offer on compute uptime?",
        "a": "We guarantee 99.999% network and compute uptime backed by financial SLA credits directly credited to your account upon any disruption."
      },
      {
        "q": "Can I scale CPU, RAM, and NVMe disk storage without server downtime?",
        "a": "Yes, our cloud compute instances support dynamic hot-plugging of RAM and CPU, and storage volumes can be expanded in seconds without rebooting."
      }
    ]
  },
  "hosting-managed-infra": {
    "id": "hosting-managed-infra",
    "industry": "Web Hosting",
    "name": "Enterprise Managed Web Infrastructure & Global Edge CDN",
    "hero": {
      "badge": "Managed Enterprise Hosting",
      "headline": "Mission-Critical Web Infrastructure",
      "accentText": "Fully Managed at the Edge",
      "subtitle": "High-availability cloud clusters, automated Anycast CDN edge caching, web application firewalls (WAF), and 24/7 dedicated DevOps engineering support.",
      "primaryCta": "Get Managed Infrastructure",
      "secondaryCta": "Explore Edge Capabilities",
      "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1920&q=80",
      "trustBadges": ["100% Managed SLA Support", "Global Anycast Edge CDN", "Instant 15-Minute Response"]
    },
    "stats": [
      { "value": "99.999%", "label": "High-Availability Cluster SLA" },
      { "value": "< 25ms", "label": "Global Edge CDN Latency" },
      { "value": "320+", "label": "Anycast Edge PoPs Worldwide" },
      { "value": "24/7/365", "label": "Dedicated Senior SRE On-Call" }
    ],
    "bentoFeatures": [
      {
        "title": "Global Anycast CDN & Edge Caching",
        "description": "Sub-25ms global response times with automatic asset optimization, image transcoding, and HTTP/3 support.",
        "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
        "badge": "Global CDN"
      },
      {
        "title": "Auto-Scaling Kubernetes Web Clusters",
        "description": "Self-healing container clusters that automatically scale pod replicas during viral traffic spikes.",
        "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
        "badge": "Clusters"
      },
      {
        "title": "Real-Time WAF & Threat Telemetry",
        "description": "Deep packet inspection blocking Layer-7 DDoS, SQL injection, and bot attacks before they reach your origin.",
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        "badge": "Security"
      }
    ],
    "offerings": [
      {
        "id": "managed-business",
        "name": "Managed Cloud Cluster (High Traffic Web & API)",
        "price": 149,
        "description": "Fully managed dual-node high-availability cloud cluster with automated daily backups and edge CDN.",
        "features": [
          "2x High-Availability Load-Balanced Instances",
          "Automated Anycast CDN & SSL termination",
          "Managed Redis caching & PostgreSQL database",
          "Automated hourly snapshots & offsite backups",
          "24/7 server monitoring & security patch updates"
        ],
        "popular": false
      },
      {
        "id": "managed-enterprise",
        "name": "High-Availability Multi-Region Web Cluster",
        "price": 349,
        "description": "Multi-region redundant Kubernetes cluster with automated geo-routing, WAF, and 15-minute SLA.",
        "features": [
          "Multi-region active-passive cluster failover",
          "Global Anycast CDN with 320+ edge locations",
          "Layer 7 Web Application Firewall (WAF)",
          "15-minute emergency response SLA guarantee",
          "Dedicated named Senior DevOps Engineer"
        ],
        "popular": true
      },
      {
        "id": "managed-custom",
        "name": "Bespoke Enterprise Infrastructure & Dedicated SRE Pod",
        "price": 899,
        "description": "Complete custom infrastructure design, PCI/SOC2 compliance architecture, and dedicated 24/7 SRE pod.",
        "features": [
          "Custom multi-cloud hybrid architecture design",
          "Dedicated 24/7/365 on-call SRE engineering team",
          "Real-time SOC & threat hunting monitoring",
          "Quarterly disaster recovery & failover simulations",
          "Tailored FinOps cloud cost optimization"
        ],
        "popular": false
      }
    ],
    "testimonials": [
      {
        "name": "Christian Vance",
        "role": "CTO, NovaMedia Digital",
        "text": "During our global product launch with 500,000 concurrent visitors, their managed cluster scaled seamlessly with zero lag or 502 errors. Superb engineering.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=200&q=80"
      },
      {
        "name": "Amanda Ross",
        "role": "Director of Infrastructure, Omnichannel Retail Inc.",
        "text": "Having a dedicated SRE pod take total ownership of our infrastructure, patches, and security has freed our internal team to focus 100% on product features.",
        "rating": 5,
        "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
      }
    ],
    "faqs": [
      {
        "q": "What does 'Fully Managed' include in your infrastructure tier?",
        "a": "We handle 100% of OS provisioning, kernel security patches, database tuning, SSL certificate renewals, DDoS mitigation, and 24/7 uptime monitoring."
      },
      {
        "q": "How does your global Anycast Edge CDN accelerate site performance?",
        "a": "Our CDN routes visitors to the nearest of 320+ global edge locations, serving cached dynamic and static assets with sub-25ms latency."
      },
      {
        "q": "How quickly do your on-call SRE engineers respond to infrastructure alerts?",
        "a": "We guarantee a sub-15 minute response SLA for any critical infrastructure incidents 24/7/365, backed by financial SLA credits."
      }
    ]
  }
};

// Validation checks
console.log("Validating archetypes...");
const keys = Object.keys(archetypes);
console.log(`Total archetypes: ${keys.length}`);

if (keys.length !== 20) {
  throw new Error(`Expected 20 archetypes, got ${keys.length}`);
}

const requiredArchetypes = [
  "tech-cloud-devops",
  "tech-ai-studio",
  "tech-fintech-core",
  "tech-saas-velocity",
  "tech-cybersecurity",
  "tech-agile-apps",
  "tech-data-analytics",
  "tech-legacy-modern",
  "tech-iot-automation",
  "ecommerce-luxury-fashion",
  "ecommerce-smart-tech",
  "ecommerce-clean-skincare",
  "ecommerce-scandi-living",
  "ecommerce-activewear",
  "ecommerce-artisan-coffee",
  "ecommerce-sustainable",
  "ecommerce-ergonomic-office",
  "ecommerce-heritage-leather",
  "hosting-cloud-vps",
  "hosting-managed-infra"
];

for (const req of requiredArchetypes) {
  if (!archetypes[req]) {
    throw new Error(`Missing archetype: ${req}`);
  }
}

for (const key of keys) {
  const a = archetypes[key];
  if (a.id !== key) throw new Error(`${key}: id mismatch (${a.id} vs ${key})`);
  if (!a.industry) throw new Error(`${key}: missing industry`);
  if (!a.name) throw new Error(`${key}: missing name`);
  
  // Hero checks
  if (!a.hero.badge) throw new Error(`${key}: missing hero.badge`);
  if (!a.hero.headline) throw new Error(`${key}: missing hero.headline`);
  if (!a.hero.accentText) throw new Error(`${key}: missing hero.accentText`);
  if (!a.hero.subtitle) throw new Error(`${key}: missing hero.subtitle`);
  if (!a.hero.primaryCta) throw new Error(`${key}: missing hero.primaryCta`);
  if (!a.hero.secondaryCta) throw new Error(`${key}: missing hero.secondaryCta`);
  if (!a.hero.image || !a.hero.image.startsWith('https://images.unsplash.com/')) throw new Error(`${key}: invalid hero.image`);
  if (!Array.isArray(a.hero.trustBadges) || a.hero.trustBadges.length !== 3) throw new Error(`${key}: trustBadges must have 3 items`);
  
  // Stats checks
  if (!Array.isArray(a.stats) || a.stats.length !== 4) throw new Error(`${key}: stats must have exactly 4 items`);
  for (const s of a.stats) {
    if (!s.value || !s.label) throw new Error(`${key}: invalid stat item ${JSON.stringify(s)}`);
  }
  
  // Bento features checks
  if (!Array.isArray(a.bentoFeatures) || a.bentoFeatures.length !== 3) throw new Error(`${key}: bentoFeatures must have exactly 3 items`);
  for (const f of a.bentoFeatures) {
    if (!f.title || !f.description || !f.image || !f.badge) throw new Error(`${key}: invalid bento feature ${JSON.stringify(f)}`);
    if (!f.image.startsWith('https://images.unsplash.com/')) throw new Error(`${key}: bento image not unsplash`);
  }
  
  // Offerings checks
  if (!Array.isArray(a.offerings) || a.offerings.length !== 3) throw new Error(`${key}: offerings must have exactly 3 items`);
  let hasPopular = false;
  for (const o of a.offerings) {
    if (!o.id || !o.name || typeof o.price !== 'number' || !o.description || !Array.isArray(o.features) || typeof o.popular !== 'boolean') {
      throw new Error(`${key}: invalid offering ${JSON.stringify(o)}`);
    }
    if (o.popular) hasPopular = true;
  }
  if (!hasPopular) throw new Error(`${key}: at least one offering must be popular`);
  
  // Testimonials checks
  if (!Array.isArray(a.testimonials) || a.testimonials.length !== 2) throw new Error(`${key}: testimonials must have exactly 2 items`);
  for (const t of a.testimonials) {
    if (!t.name || !t.role || !t.text || typeof t.rating !== 'number' || !t.avatar) {
      throw new Error(`${key}: invalid testimonial ${JSON.stringify(t)}`);
    }
    if (!t.avatar.startsWith('https://images.unsplash.com/')) throw new Error(`${key}: avatar not unsplash`);
  }
  
  // FAQs checks
  if (!Array.isArray(a.faqs) || a.faqs.length !== 3) throw new Error(`${key}: faqs must have exactly 3 items, got ${a.faqs ? a.faqs.length : 0}`);
  for (const f of a.faqs) {
    if (!f.q || !f.a) throw new Error(`${key}: invalid faq ${JSON.stringify(f)}`);
  }
}

console.log("All 20 archetypes validated successfully!");

const targetPath = path.join(__dirname, '..', 'resources', 'archetypes.json');
fs.writeFileSync(targetPath, JSON.stringify(archetypes, null, 2) + '\n', 'utf8');
console.log(`Wrote JSON to: ${targetPath}`);

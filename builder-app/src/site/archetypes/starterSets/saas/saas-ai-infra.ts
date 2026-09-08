/**
 * Starter content set — `saas-lattice`: Lattice — AI model & agent training infrastructure.
 * Hand-written. Authentic copy for GPU orchestration, experiment tracking, and
 * guardrailed agent deployment for ML teams.
 */

import type { StarterContentSet } from '@/site/archetypes/types';

export const saasLatticeInfra: StarterContentSet = {
  id: 'saas-lattice-infra',
  archetype: 'saas',
  name: 'Lattice',
  description:
    'A unified control plane for training and running LLMs — multi-vendor GPU orchestration, experiment tracking, evaluation harnesses, and governed agent deployments.',
  niche: 'AI model & agent training infrastructure',
  tags: ['ai', 'ml-infrastructure', 'gpu-orchestration', 'llm-training', 'experiment-tracking', 'agents', 'mlops'],
  needsPersonalization: false,
  themeId: 'midnight-obsidian',
  accent: '#a855f7',
  business: {
    name: 'Lattice',
    legalName: 'Lattice Model Systems, Inc.',
    shortName: 'Lattice',
    registrationNumber: 'DE-7341109',
    jurisdiction: 'Delaware, USA',
    governingLaw: 'the laws of the State of Delaware',
    registeredAddress: '2548 Fillmore Street, Suite 800, San Francisco, CA 94123, USA',
    email: 'research@latticeml.example',
    phone: '+1 (415) 555-0179',
    website: 'latticeml.example',
    supportHours: '24/7 on-call MLOps support for Pro and Enterprise tiers',
  },
  brand: { logoText: 'Lattice' },
  meta: {
    title: 'Lattice — GPU clusters & ML experiment infrastructure',
    description:
      'Provision multi-vendor GPU fleets in minutes, track every run with zero-friction experiment logging, and ship governed agents with built-in evals and guardrails.',
  },
  slots: {
    home: {
      hero: {
        badge: 'AI infrastructure platform',
        headline: 'Train, eval, and ship models',
        accentText: 'on one unified floor',
        subtitle:
          'Lattice unifies spot and reserved GPUs from AWS, GCP, Azure, Crusoe, and Lambda into one on-demand floor. Attach a dataset, launch a run, and move to production with guardrailed agent serve.',
        primaryCta: { label: 'Provision first GPU', href: '/pricing' },
        secondaryCta: { label: 'Read the architecture', href: '/about' },
        image: 'seed',
        trustBadges: ['SOC 2 Type II', '99.9% availability', 'US + EU data residency'],
      },
      trust: {
        variant: 'logos',
        title: 'Powering high-leverage research teams at',
        items: [
          { name: 'Axiom Research', domain: 'axiomresearch.example' },
          { name: 'Cortex Labs', domain: 'cortexlabs.example' },
          { name: 'Northbeam Bio', domain: 'northbeambio.example' },
          { name: 'Quantastica', domain: 'quantastica.example' },
          { name: 'Mire & Halstrom', domain: 'andvar.example' },
        ],
      },
      features: {
        eyebrow: 'Platform',
        title: 'One control plane for the whole model lifecycle',
        description:
          'Provisioning, tracking, evals, and serving are glued together so an idea becomes a deployed agent without pipework.',
        tabs: [
          { id: 'gpu', label: 'Elastic GPU Pool', icon: 'Cpu' },
          { id: 'track', label: 'Run Tracking', icon: 'Activity' },
          { id: 'serve', label: 'Agent Serve', icon: 'Bot' },
        ],
        items: [
          {
            icon: 'Cpu',
            title: 'Multi-vendor elastic GPU pool',
            description:
              'One YAML or Python `@lattice.job` reserves H100, A100, L40S, or 4090s across providers. Spot reclaims are rerun automatically; reserved quotas never sit idle.',
            badge: 'Up to 60% cheaper',
            category: 'gpu',
          },
          {
            icon: 'FlaskConical',
            title: 'Zero-friction experiment tracking',
            description:
              'Every launch auto-logs params, metrics, artifacts, and the full dataset lineage. Compare sweeps in the UI or in notebooks without bolting on a second tool.',
            badge: 'Native lineage',
            category: 'track',
          },
          {
            icon: 'Bot',
            title: 'Guard-railed agent deployments',
            description:
              'Deploy agent loops that behave: tool allow-lists, sandboxed code execution, automatic eval suites on every prompt, and a human-in-the-loop approval rail for high-stakes actions.',
            badge: 'Policy-first',
            category: 'serve',
          },
          {
            icon: 'ShieldCheck',
            title: 'Private and governed by default',
            description:
              'All training data and model weights are encrypted at rest and in transit, with fine-grained RBAC, SSO, audit logs, and your choice of US or EU residency.',
            badge: 'SOC 2 / HIPAA',
            category: 'track',
          },
        ],
      },
      stats: {
        items: [
          { value: '2.1x', label: 'Average wall-clock speed-up vs. single-provider fleets' },
          { value: '48 hrs', label: 'From pipeline to first checkpoint' },
          { value: '9.2 PFLOPS', label: 'Peak training throughput on demand' },
          { value: '99.99%', label: 'Job completion reliability (with resume)' },
        ],
      },
      pricing: {
        eyebrow: 'Pricing',
        title: 'Pay for hours on the iron, not seats',
        description:
          'Provisioning and orchestration are always free. You pay only for GPU-hours actually consumed, plus optional reserved capacity for fleets you want to guarantee.',
        currency: 'USD',
        discountBadge: 'Save 15% on annual commit',
        billingIntervals: ['monthly', 'annually'],
        tiers: [
          {
            id: 'startup',
            name: 'Startup',
            price: 0,
            priceUnit: '/mo + GPU-hours',
            description: 'For teams evaluating the platform and training small models.',
            features: [
              'Up to 4 concurrent GPU-hours',
              'Full experiment tracking',
              'Community PlainText support',
              'US residency only',
            ],
          },
          {
            id: 'team',
            name: 'Team',
            price: 39,
            priceUnit: '/mo + GPU-hours',
            description: 'For research teams shipping weekly and sharing a pool.',
            popular: true,
            badge: 'Most Popular',
            features: [
              'Unlimited seats & projects',
              'Prioritized GPU access',
              'Agent serve with guardrails',
              'SSO & audit log',
              'Slack / email support, 4h SLA',
            ],
          },
          {
            id: 'enterprise',
            name: 'Enterprise',
            price: 0,
            priceUnit: 'Custom',
            description: 'For regulated orgs with bespoke residency, quotas, and support.',
            features: [
              'Reserved capacity & custom SLAs',
              'Any AWS / GCP / Azure landing zone',
              'Dedicated MLOps engineer',
              'Data residency & DPA negotiation',
            ],
          },
        ],
      },
      testimonials: {
        eyebrow: 'From the field',
        title: 'What research leads say',
        items: [
          {
            name: 'Dr. Maya Osei',
            role: 'Head of ML',
            company: 'Cortex Labs',
            rating: 5,
            text: 'We went from borrowing dark fiber to holding a warm floor of H100s in a day. Lattice made the infra invisible so we could actually focus on the science.',
          },
          {
            name: 'Rina Larson',
            role: 'Engineering Manager',
            company: 'Northbeam Bio',
            rating: 5,
            text: 'The eval suite on agent serve caught three unsafe tool calls in our first week that would have shipped to the clinic otherwise. This is the tooling we were missing.',
          },
          {
            name: 'Tomas Bergström',
            role: 'Founder',
            company: 'Verastica',
            rating: 5,
            text: 'We compared four GPU orchestrators. Lattice is the only one where reclaim launches just resume the job instead of failing the run.',
          },
        ],
      },
      faq: {
        eyebrow: 'Questions',
        title: 'Before you spin up iron',
        items: [
          {
            q: 'Can we bring our own GPUs or on-prem nodes?',
            a: 'Yes. Enterprise customers can connect self-managed nodes — bare metal, on-prem, or dedicated — and schedule them alongside the managed pool with the same commands and tooling.',
          },
          {
            q: 'Are framework jobs like PyTorch Lightning and JAX supported?',
            a: 'Yes. Package exactly as you do today, including PyTorch, JAX, Axolotl, and Lightning. Lattice only orchestrates schedulers; it never owns your model code.',
          },
          {
            q: 'How is GPU-hours pricing calculated?',
            a: 'Per-second from container start to stop, rounded up. Idle wait time and model download time are not billed. Reserved quotas are billed monthly regardless of utilization.',
          },
          {
            q: 'What happens if a node is reclaimed mid-job?',
            a: 'Checkpointing is built in. On any interruption, the scheduler restarts from the last checkpoint on free capacity — no manual recovery and no lost progress.',
          },
        ],
      },
      cta: {
        headline: 'Point your first training run at Lattice',
        subtitle:
          'Attach a dataset and watch the run begin. No credit card to start, and free Startup tier stays free.',
        primaryCta: { label: 'Provision a GPU', href: '/pricing' },
        secondaryCta: { label: 'Talk to an ML engineer', href: '/contact' },
        guarantee: 'Free tier forever — not a timed trial',
      },
    },
  },
};

export default saasLatticeInfra;
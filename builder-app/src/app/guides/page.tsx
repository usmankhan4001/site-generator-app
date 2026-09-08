import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Globe, Rocket, Server, TerminalSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Deployment guides — Site Studio',
  description:
    'Step-by-step guides for deploying your exported site to Vercel, Netlify, or Hostinger on your own domain.',
};

const PLATFORMS = [
  {
    href: '/guides/vercel',
    name: 'Vercel',
    tagline: 'Fastest path — import from Git or push with the CLI.',
    description:
      'Attach a custom domain, set framework to Next.js, and get global edge hosting with automatic HTTPS.',
    icon: TerminalSquare,
    accent: 'text-foreground',
  },
  {
    href: '/guides/netlify',
    name: 'Netlify',
    tagline: 'Drag-and-drop or Git-based deploys with managed HTTPS.',
    description:
      'Build command npm run build, publish directory .next, then attach your domain in Site settings.',
    icon: Server,
    accent: 'text-foreground',
  },
  {
    href: '/guides/hostinger',
    name: 'Hostinger',
    tagline: 'Full control on your own VPS — Docker or Node + PM2.',
    description:
      'Run the site on a Hostinger VPS, point your domain via DNS, and serve HTTPS with Nginx or Certbot.',
    icon: Rocket,
    accent: 'text-foreground',
  },
];

export default function GuidesPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-10">
      <nav className="mb-10 flex items-center justify-between text-sm">
        <span className="font-semibold text-foreground">Site Studio</span>
        <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
          Back to the app
        </Link>
      </nav>

      <header className="mb-10 border-b border-border pb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
          Deployment guides
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Deploy your site to your own domain
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Your exported site is a production-ready Next.js App Router build with a{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            Dockerfile
          </code>{' '}
          and a{' '}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            DEPLOY.md
          </code>
          . Pick a platform below for a step-by-step walkthrough — from grabbing the export to
          going live on your own domain.
        </p>
      </header>

      {/* Before you start */}
      <section className="mb-10 rounded-lg border border-border bg-card p-5">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Globe className="h-4 w-4 text-primary" />
          Before you start
        </h2>
        <ul className="space-y-2.5 text-[13px] leading-relaxed text-muted-foreground">
          <li className="flex gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              <strong className="font-medium text-foreground">Grab the export.</strong> In the
              studio, open the <strong className="font-medium text-foreground">Publish panel</strong>{' '}
              and click <strong className="font-medium text-foreground">Export source (.zip)</strong>{' '}
              to download the complete Next.js package.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              <strong className="font-medium text-foreground">Or push to GitHub.</strong> For
              Vercel and Netlify Git imports, put the exported folder in a repository first.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              <strong className="font-medium text-foreground">Have your domain ready.</strong> Apex
              (e.g.{' '}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
                acme.com
              </code>
              ) or subdomain — you&apos;ll point its DNS at your host.
            </span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              <strong className="font-medium text-foreground">Optional env vars.</strong> If you use
              a form, set{' '}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
                FORMSPREE_ID
              </code>
              ; for a canonical URL set{' '}
              <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
                NEXT_PUBLIC_APP_URL
              </code>
              .
            </span>
          </li>
        </ul>
      </section>

      {/* Platform cards */}
      <section className="grid gap-4 sm:grid-cols-1">
        {PLATFORMS.map((p) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.href}
              href={p.href}
              className="group flex items-start gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-muted/40"
            >
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                <Icon className={p.accent} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-foreground">{p.name}</h3>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <p className="mt-0.5 text-[13px] font-medium text-primary">{p.tagline}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

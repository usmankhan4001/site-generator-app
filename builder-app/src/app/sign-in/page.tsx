import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  CloudLightning,
  Palette,
  Smartphone,
  CheckCircle2,
} from 'lucide-react';
import { SignInForm } from '@/components/auth/SignInForm';

export const metadata: Metadata = {
  title: 'Sign in — Next-Gen AI Web Builder Studio',
  description: 'Design, theme, and ship publication-ready sovereign business sites in minutes.',
};

function sanitizeRedirect(redirectParam?: string): string {
  if (!redirectParam) return '/';
  if (redirectParam.startsWith('/') && !redirectParam.startsWith('//') && !redirectParam.startsWith('/\\')) {
    return redirectParam;
  }
  return '/';
}

const HIGHLIGHTS = [
  {
    icon: Sparkles,
    title: '12 New Modern Components',
    desc: 'Bento Grid, Comparison Matrix, Marquee, ROI Calculator, Video Showcase, and more.',
  },
  {
    icon: Palette,
    title: 'Visual Theme Studio & Surface Engine',
    desc: '20 OKLCH themes with Glassmorphism, 1px Crisp Borders, and live typography pairing.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Engine & Hardware Bezels',
    desc: 'Realistic iPhone 16 Pro and iPad frames with fluid clamp typography.',
  },
  {
    icon: CloudLightning,
    title: '1-Click Cloudflare & Vercel Deploy',
    desc: 'Instant production URLs, zero-config custom domains, and bundled deploy scripts.',
  },
];

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;
  const safeRedirect = sanitizeRedirect(redirect);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12 sm:px-6 lg:px-8">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[700px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-10 h-80 w-80 rounded-full bg-indigo-600/10 blur-[100px]" />

      <div className="relative z-10 grid w-full max-w-5xl items-center gap-12 lg:grid-cols-12">
        {/* Left Feature Showcase */}
        <div className="flex flex-col lg:col-span-7">
          <Link href="/" className="group inline-flex items-center gap-2.5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/20">
              <Layers className="size-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-foreground">Site Studio</span>
              <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                v2.0 ZERO SLOP
              </span>
            </div>
          </Link>

          <h1 className="mt-8 text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-5xl">
            Sovereign AI Web Creation &amp; Visual Studio.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Generate and customize publication-grade business sites with zero-key editorial photography,
            in-canvas floating HUD editing, and 1-click edge deployments.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {HIGHLIGHTS.map((h) => {
              const Icon = h.icon;
              return (
                <div
                  key={h.title}
                  className="group rounded-xl border border-border/80 bg-card/60 p-3.5 backdrop-blur-md transition-all hover:border-primary/50 hover:bg-card"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </div>
                    <span className="text-xs font-semibold text-foreground">{h.title}</span>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">{h.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-indigo-600 px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:opacity-95 hover:shadow-primary/35"
            >
              <span>⚡ Enter Live Demo Studio (No Sign-In Required)</span>
              <ArrowRight className="size-3.5" />
            </Link>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="size-3.5 text-emerald-500" />
              <span>Airwallex Compliance Certified</span>
            </div>
          </div>
        </div>

        {/* Right Auth Card */}
        <div className="mx-auto w-full max-w-md lg:col-span-5">
          <SignInForm redirect={safeRedirect} />
        </div>
      </div>
    </main>
  );
}

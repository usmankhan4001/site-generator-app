import type { Metadata } from 'next';
import Link from 'next/link';
import { Layers } from 'lucide-react';
import { SignInForm } from '@/components/auth/SignInForm';

export const metadata: Metadata = {
  title: 'Sign in — Airwallex Site Cloner',
  description: 'Sign in to your autonomous site generator workspace.',
};

function sanitizeRedirect(redirectParam?: string): string {
  if (!redirectParam) return '/';
  if (redirectParam.startsWith('/') && !redirectParam.startsWith('//') && !redirectParam.startsWith('/\\')) {
    return redirectParam;
  }
  return '/';
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;
  const safeRedirect = sanitizeRedirect(redirect);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div className="h-[420px] w-[540px] rounded-full bg-primary/[0.04] blur-3xl" />
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            className="group mb-2 inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card p-2.5 shadow-subtle transition-transform hover:scale-[1.02]"
          >
            <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-xs shadow-xs">
              <Layers className="size-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Airwallex Site Cloner
            </span>
          </Link>
        </div>

        {/* Form */}
        <SignInForm redirect={safeRedirect} />
      </div>
    </main>
  );
}


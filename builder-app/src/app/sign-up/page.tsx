import type { Metadata } from 'next';
import Link from 'next/link';
import { Layers } from 'lucide-react';
import { prisma } from '@/lib/db';
import { SignUpForm } from '@/components/auth/SignUpForm';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Create your account — Airwallex Site Cloner',
  description: 'Create an account to start generating and deploying high-converting sites.',
};

function sanitizeRedirect(redirectParam?: string): string {
  if (!redirectParam) return '/onboarding';
  if (redirectParam.startsWith('/') && !redirectParam.startsWith('//') && !redirectParam.startsWith('/\\')) {
    return redirectParam;
  }
  return '/onboarding';
}

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; redirect?: string }>;
}) {
  const { token, redirect } = await searchParams;
  const safeRedirect = sanitizeRedirect(redirect);

  let inviteEmail: string | undefined;
  let isInvite = false;
  let inviteNotice: string | undefined;

  if (token) {
    try {
      const invite = await prisma.invite.findUnique({ where: { token } });
      if (!invite) {
        inviteNotice = 'Invite link not found or invalid. You can still create an open account below.';
      } else if (invite.acceptedAt !== null) {
        inviteNotice = 'This invite has already been accepted. You can sign in or register below.';
      } else if (invite.expiresAt.getTime() < Date.now()) {
        inviteNotice = 'This invite link has expired. You can still register directly below.';
      } else {
        isInvite = true;
        inviteEmail = invite.email;
      }
    } catch {
      inviteNotice = 'Could not verify invite token. You can create an open account below.';
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Subtle background ambient glow */}
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

        {/* Auth Card */}
        <SignUpForm
          token={isInvite ? token : undefined}
          initialEmail={inviteEmail}
          isInvite={isInvite}
          inviteNotice={inviteNotice}
          redirect={safeRedirect}
        />
      </div>
    </main>
  );
}


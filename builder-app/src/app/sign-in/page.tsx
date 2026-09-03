import type { Metadata } from 'next';
import { SignInForm } from '@/components/auth/SignInForm';

export const metadata: Metadata = {
  title: 'Sign in — Airwallex Site Cloner',
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;
  const safeRedirect = redirect && redirect.startsWith('/') ? redirect : '/';

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <SignInForm redirect={safeRedirect} />
    </main>
  );
}

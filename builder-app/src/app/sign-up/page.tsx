import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { SignUpForm } from '@/components/auth/SignUpForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Create your account — Airwallex Site Cloner',
};

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  const invite = token
    ? await prisma.invite.findUnique({ where: { token } })
    : null;

  const invalid =
    !invite || invite.acceptedAt !== null || invite.expiresAt.getTime() < Date.now();

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      {invalid ? (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Invalid or expired invite</CardTitle>
            <CardDescription>
              This sign-up link is no longer valid. Ask your administrator for a
              fresh invite.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/sign-in" className="text-sm text-primary underline-offset-4 hover:underline">
              Back to sign in
            </Link>
          </CardContent>
        </Card>
      ) : (
        <SignUpForm token={invite.token} email={invite.email} />
      )}
    </main>
  );
}

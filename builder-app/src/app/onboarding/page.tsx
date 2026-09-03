import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { getActor } from '@/lib/session';
import { prisma } from '@/lib/db';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Welcome — set up your site',
};

export default async function OnboardingPage() {
  const actor = await getActor();
  if (!actor) redirect('/sign-in');

  const user = await prisma.user.findUnique({
    where: { id: actor.userId },
    select: { name: true, onboardingCompletedAt: true },
  });

  if (user?.onboardingCompletedAt) redirect('/');

  const firstName = (user?.name ?? '').trim().split(/\s+/)[0] ?? '';

  return <OnboardingFlow firstName={firstName} />;
}

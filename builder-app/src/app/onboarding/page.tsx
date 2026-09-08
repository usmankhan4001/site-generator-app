import { redirect } from 'next/navigation';

/**
 * The onboarding questionnaire has been retired in favour of the single
 * consolidated site-creation flow at `/create`. This route only exists so
 * stale links and bookmarks still land somewhere useful.
 */
export default function OnboardingPage() {
  redirect('/create');
}

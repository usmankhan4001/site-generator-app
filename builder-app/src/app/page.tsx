import type { Metadata } from 'next';
import { listTemplateOptions } from '@/lib/studio/projects';
import { DashboardClient } from '@/components/dashboard/DashboardClient';

export const metadata: Metadata = {
  title: 'Your sites — Airwallex Site Cloner',
};

export default function DashboardPage() {
  // Pure catalogue read (no DB) — safe to run at build time. The project list
  // itself is fetched client-side so Duplicate/Delete can refresh without a
  // full navigation.
  const templates = listTemplateOptions();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-10">
      <DashboardClient templates={templates} />
    </main>
  );
}

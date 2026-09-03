import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getActor } from '@/lib/session';
import { AdminNav } from '@/components/admin/AdminNav';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin — Airwallex Site Cloner',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const actor = await getActor();
  if (!actor) redirect('/sign-in');
  if (!actor.isAdmin) redirect('/');

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl gap-8 px-6 py-8">
      <aside className="w-52 shrink-0">
        <Link href="/admin" className="mb-6 block text-sm font-semibold tracking-tight">
          Studio Admin
        </Link>
        <AdminNav />
        <Link
          href="/"
          className="mt-6 block px-3 text-xs text-muted-foreground hover:text-foreground"
        >
          ← Back to studio
        </Link>
      </aside>
      <main className="min-w-0 flex-1 pb-16">{children}</main>
    </div>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Layers } from 'lucide-react';
import { SignInForm } from '@/components/auth/SignInForm';

export const metadata: Metadata = {
  title: 'Sign in — Site Studio',
  description: 'Sign in to your Site Studio workspace.',
};

function sanitizeRedirect(redirectParam?: string): string {
  if (!redirectParam) return '/';
  if (redirectParam.startsWith('/') && !redirectParam.startsWith('//') && !redirectParam.startsWith('/\\')) {
    return redirectParam;
  }
  return '/';
}

const previews = [
  { src: '/template-previews/saas.jpg', alt: 'SaaS template preview' },
  { src: '/template-previews/store.jpg', alt: 'Store template preview' },
  { src: '/template-previews/luxury.jpg', alt: 'Luxury template preview' },
];

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;
  const safeRedirect = sanitizeRedirect(redirect);

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2">
        {/* Brand panel (hidden on small screens) */}
        <div className="hidden flex-col lg:flex">
          <Link href="/" className="group inline-flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold shadow-xs">
              <Layers className="size-5" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">Site Studio</span>
          </Link>

          <h1 className="mt-8 text-3xl font-semibold leading-tight tracking-tight text-foreground">
            Design, theme, and ship multi-page business sites.
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Start from a curated archetype, tune the sections and theme, and deploy a compliant
            storefront or business site in minutes.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {previews.map((p) => (
              <div
                key={p.src}
                className="overflow-hidden rounded-lg border border-border/70 shadow-subtle"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={320}
                  height={200}
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Auth card */}
        <div className="mx-auto w-full max-w-md">
          <SignInForm redirect={safeRedirect} />
        </div>
      </div>
    </main>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function getSafeRedirect(path?: string | null): string {
  if (!path) return '/';
  if (path.startsWith('/') && !path.startsWith('//') && !path.startsWith('/\\')) {
    return path;
  }
  return '/';
}

export function SignInForm({ redirect }: { redirect?: string }) {
  const router = useRouter();
  const safeRedirect = getSafeRedirect(redirect);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);

    const normalizedEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!normalizedEmail || !cleanPassword) {
      setError('Please enter both email and password.');
      setPending(false);
      return;
    }

    try {
      const res = await authClient.signIn.email({
        email: normalizedEmail,
        password: cleanPassword,
      });

      if (res.error) {
        setError(res.error.message || 'Invalid email or password. Please check your credentials.');
        setPending(false);
        return;
      }

      router.push(safeRedirect);
      router.refresh();
    } catch {
      setError('Connection error or invalid credentials. Please try again.');
      setPending(false);
    }
  }

  const signUpHref =
    safeRedirect && safeRedirect !== '/'
      ? `/sign-up?redirect=${encodeURIComponent(safeRedirect)}`
      : '/sign-up';

  return (
    <Card className="w-full max-w-md border-border/80 bg-card/95 shadow-subtle backdrop-blur-xs">
      <CardHeader className="space-y-1.5 pb-6">
        <CardTitle className="text-xl font-semibold tracking-tight text-foreground">
          Sign in to studio
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Enter your credentials to access your autonomous sites.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs leading-relaxed text-destructive animate-in fade-in-50 duration-200"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <div className="flex-1 font-medium">{error}</div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="signin-email" className="text-xs font-medium text-foreground">
              Email address
            </Label>
            <Input
              id="signin-email"
              type="email"
              autoComplete="email"
              required
              disabled={pending}
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 bg-background text-sm placeholder:text-muted-foreground/60 focus-visible:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="signin-password" className="text-xs font-medium text-foreground">
                Password
              </Label>
            </div>
            <div className="relative">
              <Input
                id="signin-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                disabled={pending}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 pr-10 bg-background text-sm placeholder:text-muted-foreground/60 focus-visible:ring-primary/20"
              />
              <button
                type="button"
                tabIndex={-1}
                disabled={pending}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={pending}
            className="mt-2 h-10 w-full font-medium shadow-xs transition-all active:scale-[0.99]"
          >
            {pending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Signing in…
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                Sign in
                <ArrowRight className="size-3.5 opacity-80" />
              </span>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex items-center justify-center border-t border-border/60 bg-muted/20 py-4 text-xs text-muted-foreground">
        <span>Don&apos;t have an account?&nbsp;</span>
        <Link
          href={signUpHref}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </CardFooter>
    </Card>
  );
}


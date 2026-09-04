'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, AlertCircle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
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

interface SignUpFormProps {
  token?: string;
  initialEmail?: string;
  isInvite?: boolean;
  inviteNotice?: string;
  redirect?: string;
}

export function SignUpForm({
  token,
  initialEmail = '',
  isInvite = false,
  inviteNotice,
  redirect = '/onboarding',
}: SignUpFormProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState(initialEmail);
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
    const cleanName = name.trim();

    if (!cleanName) {
      setError('Please enter your full name.');
      setPending(false);
      return;
    }

    if (!normalizedEmail) {
      setError('Please enter a valid email address.');
      setPending(false);
      return;
    }

    if (cleanPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      setPending(false);
      return;
    }

    try {
      const { error: signUpError } = await authClient.signUp.email({
        email: normalizedEmail,
        password: cleanPassword,
        name: cleanName,
      });

      if (signUpError) {
        setError(signUpError.message || 'Could not create your account. Please check your details.');
        setPending(false);
        return;
      }

      // If signed up via invite token, accept the invite
      if (token) {
        try {
          await fetch('/api/admin/invites/accept', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          });
        } catch {
          /* ignore — invite stamping is not critical to the signed-up user */
        }
      }

      const targetPath = redirect && redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/onboarding';
      router.push(targetPath);
      router.refresh();
    } catch {
      setError('An unexpected error occurred during sign up. Please try again.');
      setPending(false);
    }
  }

  return (
    <Card className="w-full max-w-md border-border/80 bg-card/95 shadow-subtle backdrop-blur-xs">
      <CardHeader className="space-y-1.5 pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold tracking-tight text-foreground">
            {isInvite ? 'Accept your invitation' : 'Create your account'}
          </CardTitle>
          {isInvite && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
              <Sparkles className="size-3" />
              Invited
            </span>
          )}
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {isInvite
            ? 'Complete your profile to join the workspace and launch sites.'
            : 'Get started with the autonomous site studio in seconds.'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {inviteNotice && (
            <div className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground animate-in fade-in-50 duration-200">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div className="flex-1">{inviteNotice}</div>
            </div>
          )}

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
            <Label htmlFor="signup-name" className="text-xs font-medium text-foreground">
              Full name
            </Label>
            <Input
              id="signup-name"
              type="text"
              autoComplete="name"
              required
              disabled={pending}
              placeholder="Alex Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 bg-background text-sm placeholder:text-muted-foreground/60 focus-visible:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="signup-email" className="text-xs font-medium text-foreground">
                Email address
              </Label>
              {isInvite && initialEmail && (
                <span className="text-[11px] text-muted-foreground">Linked to invite</span>
              )}
            </div>
            <Input
              id="signup-email"
              type="email"
              autoComplete="email"
              required
              disabled={pending || (isInvite && Boolean(initialEmail))}
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 bg-background text-sm placeholder:text-muted-foreground/60 focus-visible:ring-primary/20 disabled:opacity-75 disabled:bg-muted/30"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="signup-password" className="text-xs font-medium text-foreground">
              Password <span className="text-muted-foreground font-normal">(min 8 characters)</span>
            </Label>
            <div className="relative">
              <Input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                minLength={8}
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
                Creating account…
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                {isInvite ? 'Accept invite & continue' : 'Create account'}
                <ArrowRight className="size-3.5 opacity-80" />
              </span>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex items-center justify-center border-t border-border/60 bg-muted/20 py-4 text-xs text-muted-foreground">
        <span>Already have an account?&nbsp;</span>
        <Link
          href="/sign-in"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </CardFooter>
    </Card>
  );
}


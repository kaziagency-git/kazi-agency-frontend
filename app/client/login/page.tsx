'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clientLoginThunk, clearClientAuthError, initClientAuth } from '@/store/slices/clientAuthSlice';

export default function ClientLoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { authenticated, hydrated, loading, error } = useAppSelector((s) => s.clientAuth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(initClientAuth());
  }, [dispatch]);

  useEffect(() => {
    if (hydrated && authenticated) router.replace('/client/dashboard');
  }, [hydrated, authenticated, router]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearClientAuthError());
    }
  }, [error, dispatch]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await dispatch(clientLoginThunk({ email, password }));
    if (clientLoginThunk.fulfilled.match(result)) {
      router.push('/client/dashboard');
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Kazi Agency</h1>
          <p className="text-sm text-muted-foreground mt-1">Client Portal</p>
        </div>

        <Card className="shadow-md border-border/60">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Sign in</CardTitle>
            <CardDescription>Enter your credentials to access your portal.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email" type="email" autoComplete="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password" type="password" autoComplete="current-password" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Signing in…</>
                ) : 'Sign in'}
              </Button>
            </form>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              First time here?{' '}
              <span className="text-primary">Check your email for a setup link.</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { authenticated, hydrated } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (hydrated && !authenticated) {
      router.replace('/admin/login');
    }
  }, [hydrated, authenticated, router]);

  if (!hydrated || !authenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}

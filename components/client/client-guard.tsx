'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { initClientAuth } from '@/store/slices/clientAuthSlice';

export function ClientGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { authenticated, hydrated } = useAppSelector((s) => s.clientAuth);

  useEffect(() => {
    dispatch(initClientAuth());
  }, [dispatch]);

  useEffect(() => {
    if (hydrated && !authenticated) {
      router.replace('/client/login');
    }
  }, [hydrated, authenticated, router]);

  if (!hydrated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!authenticated) return null;

  return <>{children}</>;
}

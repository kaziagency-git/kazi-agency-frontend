'use client';

import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from './index';
import { initAuth } from './slices/authSlice';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    storeRef.current!.dispatch(initAuth());
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}

'use client';

import { usePathname } from 'next/navigation';
import Navigation from './navigation';
import Footer from './footer';
import CookieBanner from './cookie-banner';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isShell = pathname.startsWith('/admin') || pathname.startsWith('/client');

  return (
    <>
      {!isShell && <Navigation />}
      {children}
      {!isShell && <Footer />}
      {!isShell && <CookieBanner />}
    </>
  );
}

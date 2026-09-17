'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAccReference } from '@/store/slices/accounting';

const tabs = [
  { href: '/admin/accounting', label: 'Overview', exact: true },
  { href: '/admin/accounting/transactions', label: 'Transactions' },
  { href: '/admin/accounting/invoices', label: 'Invoices' },
  { href: '/admin/accounting/clients', label: 'Clients' },
  { href: '/admin/accounting/time-logs', label: 'Time Logs' },
  { href: '/admin/accounting/domains', label: 'Domains' },
  { href: '/admin/accounting/hostings', label: 'Hosting' },
  { href: '/admin/accounting/subscriptions', label: 'Subscriptions' },
  { href: '/admin/accounting/settings', label: 'Settings' },
];

/**
 * Sub-navigation for the accounting area. Sits inside the existing admin
 * dashboard layout — the sidebar, guard and topbar all still come from there.
 */
export default function AccountingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const status = useAppSelector((s) => s.accounting.reference.status);

  // Categories, accounts and the client list feed every form on every page;
  // load them once when the area is entered.
  useEffect(() => {
    if (status === 'idle') dispatch(fetchAccReference());
  }, [status, dispatch]);

  return (
    <div className="space-y-6">
      <nav className="-mx-4 lg:-mx-8 px-4 lg:px-8 border-b border-border overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {tabs.map((tab) => {
            const active = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'px-3 py-2.5 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors',
                  active
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {children}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { ClientSidebar } from '@/components/client/client-sidebar';
import { ClientGuard } from '@/components/client/client-guard';
import { Button } from '@/components/ui/button';

export default function ClientPortalLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ClientGuard>
      <div className="flex min-h-screen">
        <ClientSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex-1 min-w-0 flex flex-col">
          <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background px-4 lg:hidden">
            <Button
              variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}
              className="h-8 w-8" aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-sidebar">
                <span className="text-xs font-bold text-white">K</span>
              </div>
              <span className="text-sm font-semibold">Kazi Agency</span>
            </div>
          </header>

          <main className="flex-1 p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </ClientGuard>
  );
}

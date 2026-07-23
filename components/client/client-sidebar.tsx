'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/store/hooks';
import { clientLogoutThunk } from '@/store/slices/clientAuthSlice';
import {
  LayoutDashboard, FolderKanban, TicketCheck, LogOut, ChevronRight, X, ClipboardList,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/client/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: 'My Project',
    items: [
      { href: '/client/my-project', label: 'Project Progress', icon: FolderKanban, exact: false },
    ],
  },
  {
    label: 'Pre-Launch',
    items: [
      { href: '/client/pre-launch-form', label: 'Pre-Launch Info', icon: ClipboardList, exact: false },
    ],
  },
  {
    label: 'Support',
    items: [
      { href: '/client/support', label: 'Support Tickets', icon: TicketCheck, exact: false },
    ],
  },
];

function NavItem({
  href, label, icon: Icon, exact, pathname, onClose,
}: {
  href: string; label: string; icon: React.ElementType;
  exact: boolean; pathname: string; onClose?: () => void;
}) {
  const active = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      href={href}
      onClick={onClose}
      className={cn(
        'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
        active
          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground'
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1">{label}</span>
      {active && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
    </Link>
  );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function handleLogout() {
    await dispatch(clientLogoutThunk());
    router.push('/client/login');
  }

  return (
    <>
      <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 shrink-0">
          <span className="text-sm font-bold text-white">K</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white leading-none">Kazi Agency</p>
          <p className="text-[11px] text-sidebar-foreground/60 mt-0.5">Client Portal</p>
        </div>
        {onClose && (
          <Button
            variant="ghost" size="icon" onClick={onClose}
            className="h-7 w-7 shrink-0 text-sidebar-foreground/60 hover:text-white hover:bg-white/10 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40 select-none">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavItem key={item.href} {...item} pathname={pathname} onClose={onClose} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <Separator className="bg-sidebar-border" />

      <div className="p-3 shrink-0">
        <Button
          variant="ghost" onClick={handleLogout}
          className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-destructive/20 hover:text-red-300"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </>
  );
}

export function ClientSidebar({ open, onClose }: { open?: boolean; onClose?: () => void }) {
  return (
    <>
      <aside className="sticky top-0 hidden lg:flex h-screen w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
        <SidebarContent />
      </aside>
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent onClose={onClose} />
      </aside>
    </>
  );
}

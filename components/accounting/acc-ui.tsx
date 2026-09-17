'use client';

import Link from 'next/link';
import { AlertCircle, Inbox } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { formatUSD } from '@/lib/accounting/money';
import { formatDateNY } from '@/lib/accounting/date';

/**
 * Small presentational pieces shared by the accounting pages, built on the
 * project's existing shadcn components so the module matches the rest of the
 * admin area.
 */

// ── Money ──────────────────────────────────────────────────────────────────

/** Renders cents as $x.xx, optionally tinted by direction. */
export function Money({
  cents,
  tone = 'plain',
  className,
}: {
  cents: number;
  tone?: 'plain' | 'in' | 'out' | 'net';
  className?: string;
}) {
  const toneClass =
    tone === 'in'
      ? 'text-emerald-600'
      : tone === 'out'
        ? 'text-red-600'
        : tone === 'net'
          ? cents < 0
            ? 'text-red-600'
            : 'text-emerald-600'
          : '';

  return (
    <span className={cn('tabular-nums font-medium', toneClass, className)}>
      {tone === 'in' ? '+' : tone === 'out' ? '−' : ''}
      {formatUSD(Math.abs(cents))}
    </span>
  );
}

/** A date rendered in the agency's display timezone. */
export function DateCell({ value, className }: { value: string | null; className?: string }) {
  if (!value) return <span className="text-muted-foreground">—</span>;
  return <span className={cn('whitespace-nowrap', className)}>{formatDateNY(new Date(value))}</span>;
}

// ── Stat card ──────────────────────────────────────────────────────────────

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color = 'text-primary',
  bg = 'bg-primary/10',
  href,
  loading,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  color?: string;
  bg?: string;
  href?: string;
  loading?: boolean;
}) {
  const card = (
    <Card className="border-border/60 shadow-sm h-full transition-colors group-hover:border-primary/40">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        <div className={cn('rounded-lg p-2', bg)}>
          <Icon className={cn('h-4 w-4', color)} />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-28" />
        ) : (
          <p className="text-2xl lg:text-3xl font-bold tabular-nums break-all">{value}</p>
        )}
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </CardContent>
    </Card>
  );

  return href ? (
    <Link href={href} className="group">
      {card}
    </Link>
  ) : (
    <div className="group">{card}</div>
  );
}

// ── Table states ───────────────────────────────────────────────────────────

/** Skeleton rows that keep the table from collapsing while loading. */
export function TableLoadingRows({ cols, rows = 5 }: { cols: number; rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, r) => (
        <TableRow key={r}>
          {Array.from({ length: cols }).map((__, c) => (
            <TableCell key={c}>
              <Skeleton className="h-4 w-full max-w-28" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export function TableEmptyRow({
  cols,
  message,
  hint,
}: {
  cols: number;
  message: string;
  hint?: string;
}) {
  return (
    <TableRow>
      <TableCell colSpan={cols} className="py-14">
        <div className="flex flex-col items-center justify-center text-center">
          <Inbox className="h-8 w-8 text-muted-foreground/40 mb-3" />
          <p className="font-medium text-sm">{message}</p>
          {hint && <p className="text-xs text-muted-foreground mt-1 max-w-xs">{hint}</p>}
        </div>
      </TableCell>
    </TableRow>
  );
}

export function TableErrorRow({
  cols,
  error,
  onRetry,
}: {
  cols: number;
  error: string;
  onRetry?: () => void;
}) {
  return (
    <TableRow>
      <TableCell colSpan={cols} className="py-14">
        <div className="flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-8 w-8 text-red-400 mb-3" />
          <p className="font-medium text-sm">Could not load this list</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-md">{error}</p>
          {onRetry && (
            <Button variant="outline" size="sm" className="mt-4" onClick={onRetry}>
              Try again
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

// ── Badges ─────────────────────────────────────────────────────────────────

const invoiceStatusStyles: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  sent: 'bg-blue-100 text-blue-700',
  paid: 'bg-emerald-100 text-emerald-700',
  overdue: 'bg-red-100 text-red-700',
  void: 'bg-slate-200 text-slate-500 line-through',
};

export function InvoiceStatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="secondary" className={cn('capitalize', invoiceStatusStyles[status] ?? '')}>
      {status}
    </Badge>
  );
}

const genericStatusStyles: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  paused: 'bg-amber-100 text-amber-700',
  cancelled: 'bg-gray-100 text-gray-600',
  expired: 'bg-red-100 text-red-700',
  transferred: 'bg-blue-100 text-blue-700',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="secondary" className={cn('capitalize', genericStatusStyles[status] ?? '')}>
      {status}
    </Badge>
  );
}

/**
 * Days-left badge for renewals: red at 7 days or already expired, amber at 15,
 * plain beyond that. Same thresholds the alert pipeline uses.
 */
export function DaysLeftBadge({ days }: { days: number }) {
  if (days < 0) {
    return (
      <Badge variant="secondary" className="bg-red-100 text-red-700">
        Expired {Math.abs(days)}d ago
      </Badge>
    );
  }

  const style =
    days <= 7 ? 'bg-red-100 text-red-700' : days <= 15 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600';

  return (
    <Badge variant="secondary" className={style}>
      {days === 0 ? 'Today' : `${days}d left`}
    </Badge>
  );
}

// ── Page header ────────────────────────────────────────────────────────────

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground text-sm mt-1">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
    </div>
  );
}

// ── Pagination ─────────────────────────────────────────────────────────────

export function Pager({
  page,
  totalPages,
  total,
  limit,
  onPage,
}: {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPage: (page: number) => void;
}) {
  if (total === 0) return null;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
      <p className="text-xs text-muted-foreground">
        Showing <strong>{start}</strong>–<strong>{end}</strong> of <strong>{total}</strong>
      </p>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPage(page - 1)}>
          Previous
        </Button>
        <span className="text-xs text-muted-foreground px-1">
          {page} / {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

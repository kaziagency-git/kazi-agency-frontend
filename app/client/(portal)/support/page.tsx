'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Plus, MessageSquare, Search, ChevronLeft, ChevronRight, Hash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { getMyTickets, Ticket } from '@/lib/client-api';
import { toast } from 'sonner';

const statusStyles: Record<string, string> = {
  open: 'bg-blue-100 text-blue-700 border border-blue-200',
  'in-progress': 'bg-amber-100 text-amber-700 border border-amber-200',
  resolved: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  closed: 'bg-gray-100 text-gray-600 border border-gray-200',
};

const priorityStyles: Record<string, string> = {
  Low: 'bg-gray-100 text-gray-600 border border-gray-200',
  Medium: 'bg-blue-100 text-blue-700 border border-blue-200',
  High: 'bg-orange-100 text-orange-700 border border-orange-200',
  Urgent: 'bg-red-100 text-red-700 border border-red-200',
};

const statusDot: Record<string, string> = {
  open: 'bg-blue-500',
  'in-progress': 'bg-amber-500',
  resolved: 'bg-emerald-500',
  closed: 'bg-gray-400',
};

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMyTickets()
      .then(setTickets)
      .catch(() => toast.error('Failed to load tickets'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return tickets;
    return tickets.filter(
      (t) =>
        t.subject.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        String(t.ticketNumber ?? '').includes(q),
    );
  }, [tickets, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  function handleQuery(v: string) {
    setQuery(v);
    setPage(1);
  }

  function handlePageSize(v: string) {
    setPageSize(Number(v));
    setPage(1);
  }

  const startEntry = filtered.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endEntry = Math.min(safePage * pageSize, filtered.length);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {loading ? 'Loading…' : `${tickets.length} ticket${tickets.length !== 1 ? 's' : ''} total`}
          </p>
        </div>
        <Button asChild>
          <Link href="/client/support/new">
            <Plus className="h-4 w-4 mr-2" /> New Ticket
          </Link>
        </Button>
      </div>

      <Card className="border-border/60 shadow-sm">
        {/* Toolbar */}
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <CardTitle className="text-base shrink-0">All Tickets</CardTitle>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search by subject, category or #number…"
                className="pl-8 h-8 text-sm"
                value={query}
                onChange={(e) => handleQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 w-full rounded-lg" />)}
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-14 space-y-3">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <MessageSquare className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">
                {query ? 'No tickets match your search' : 'No tickets yet'}
              </p>
              <p className="text-xs text-muted-foreground">
                {query ? 'Try a different keyword' : 'Open one when you need help.'}
              </p>
              {!query && (
                <Button asChild size="sm" className="mt-2">
                  <Link href="/client/support/new">Open your first ticket</Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {paginated.map((t) => (
                <Link
                  key={t._id}
                  href={`/client/support/${t._id}`}
                  className="group flex items-start gap-3 rounded-lg border border-border/50 bg-card px-4 py-3.5 hover:border-primary/30 hover:bg-muted/30 transition-all"
                >
                  {/* Status dot */}
                  <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${statusDot[t.status]}`} />

                  <div className="flex-1 min-w-0 space-y-1.5">
                    {/* Ticket number + subject */}
                    <div className="flex items-start gap-2 flex-wrap">
                      {t.ticketNumber && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-mono font-bold text-primary shrink-0">
                          <Hash className="h-2.5 w-2.5" />{t.ticketNumber}
                        </span>
                      )}
                      <p className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                        {t.subject}
                      </p>
                    </div>

                    {/* Meta row */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground">{t.category}</span>
                      <span className="text-muted-foreground/40 text-xs">·</span>
                      <span className="text-xs text-muted-foreground">
                        {t.messages.length} message{t.messages.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-muted-foreground/40 text-xs">·</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(t.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${priorityStyles[t.priority]}`}>
                      {t.priority}
                    </span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium capitalize ${statusStyles[t.status]}`}>
                      {t.status}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination footer */}
          {!loading && filtered.length > 0 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/40">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Show</span>
                <Select value={String(pageSize)} onValueChange={handlePageSize}>
                  <SelectTrigger className="h-7 w-16 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 25, 50].map((n) => (
                      <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span>entries</span>
                <span className="hidden sm:inline text-muted-foreground/40 mx-1">·</span>
                <span className="hidden sm:inline">
                  Showing <span className="font-medium text-foreground">{startEntry}–{endEntry}</span> of{' '}
                  <span className="font-medium text-foreground">{filtered.length}</span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline" size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage <= 1}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
                  .reduce<(number | '…')[]>((acc, p, idx, arr) => {
                    if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('…');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === '…' ? (
                      <span key={`ellipsis-${i}`} className="text-xs text-muted-foreground px-1">…</span>
                    ) : (
                      <Button
                        key={p}
                        variant={safePage === p ? 'default' : 'outline'}
                        size="sm"
                        className="h-7 w-7 p-0 text-xs"
                        onClick={() => setPage(p as number)}
                      >
                        {p}
                      </Button>
                    )
                  )}
                <Button
                  variant="outline" size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage >= totalPages}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

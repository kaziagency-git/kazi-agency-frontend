'use client';

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Download, ExternalLink, Pencil, Plus, Archive, RefreshCw, X } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  DateCell, Money, PageHeader, Pager, TableEmptyRow, TableErrorRow, TableLoadingRows,
} from '@/components/accounting/acc-ui';
import { AccountSelect, CategorySelect, ClientSelect, EnumSelect } from '@/components/accounting/entity-select';
import { TransactionDialog } from '@/components/accounting/transaction-dialog';
import { ConfirmDialog } from '@/components/accounting/confirm-dialog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAccTransactions } from '@/store/slices/accounting';
import {
  AccTransaction, accountName, categoryColor, categoryName, refName, transactionsApi,
} from '@/lib/accounting/api';
import { formatDateNY } from '@/lib/accounting/date';
import { fromCents } from '@/lib/accounting/money';
import { downloadCsv, stampedFilename, toCsv } from '@/lib/accounting/csv';

const PAGE_SIZE = 20;
const COLS = 8;

interface Filters {
  from: string;
  to: string;
  type: string | null;
  categoryId: string | null;
  clientId: string | null;
  accountId: string | null;
  search: string;
}

const emptyFilters: Filters = {
  from: '', to: '', type: null, categoryId: null, clientId: null, accountId: null, search: '',
};

/**
 * useSearchParams() opts the tree into client rendering, so it has to sit
 * behind a Suspense boundary or the static prerender pass fails at build.
 */
export default function AccountingTransactionsPage() {
  return (
    <Suspense fallback={<TransactionsSkeleton />}>
      <TransactionsView />
    </Suspense>
  );
}

function TransactionsSkeleton() {
  return (
    <div className="space-y-6">
      <PageHeader title="Transactions" description="Every payment in and out, in USD" />
      <Card className="border-border/60 shadow-sm">
        <CardContent className="pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TransactionsView() {
  const dispatch = useAppDispatch();
  const { items, total, page, totalPages, status, error } = useAppSelector(
    (s) => s.accounting.transactions
  );

  const searchParams = useSearchParams();
  // The overview cards deep-link here with ?type=in / ?type=out.
  const [filters, setFilters] = useState<Filters>(() => ({
    ...emptyFilters,
    type: searchParams.get('type'),
  }));
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AccTransaction | null>(null);
  const [archiving, setArchiving] = useState<AccTransaction | null>(null);
  const [exporting, setExporting] = useState(false);

  const loading = status === 'idle' || status === 'loading';

  const load = useCallback(() => {
    dispatch(
      fetchAccTransactions({
        page: currentPage,
        limit: PAGE_SIZE,
        sortBy: 'date',
        sortDir: 'desc',
        from: filters.from || undefined,
        to: filters.to || undefined,
        type: filters.type ?? undefined,
        categoryId: filters.categoryId ?? undefined,
        clientId: filters.clientId ?? undefined,
        accountId: filters.accountId ?? undefined,
        search: filters.search || undefined,
      })
    );
  }, [dispatch, currentPage, filters]);

  useEffect(() => {
    load();
  }, [load]);

  function updateFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }

  const hasFilters = useMemo(
    () => JSON.stringify(filters) !== JSON.stringify(emptyFilters),
    [filters]
  );

  function clearFilters() {
    setFilters(emptyFilters);
    setCurrentPage(1);
  }

  /**
   * Exports everything the current filters match, not just the visible page —
   * so a filtered export is complete rather than a 20-row sample.
   */
  async function handleExport() {
    setExporting(true);
    try {
      const all = await transactionsApi.list({
        page: 1,
        limit: 200,
        sortBy: 'date',
        sortDir: 'desc',
        from: filters.from || undefined,
        to: filters.to || undefined,
        type: filters.type ?? undefined,
        categoryId: filters.categoryId ?? undefined,
        clientId: filters.clientId ?? undefined,
        accountId: filters.accountId ?? undefined,
        search: filters.search || undefined,
      });

      if (all.items.length === 0) {
        toast.info('Nothing to export with these filters');
        return;
      }

      const csv = toCsv(all.items, [
        { header: 'Date', value: (t) => formatDateNY(new Date(t.date)) },
        { header: 'Direction', value: (t) => (t.type === 'in' ? 'Income' : 'Expense') },
        { header: 'Amount (USD)', value: (t) => fromCents(t.amountCents).toFixed(2) },
        { header: 'Category', value: (t) => categoryName(t.categoryId, '') },
        { header: 'Client', value: (t) => refName(t.clientId, '') },
        { header: 'Account', value: (t) => accountName(t.accountId, '') },
        { header: 'Vendor', value: (t) => t.vendor },
        { header: 'Description', value: (t) => t.description },
        { header: 'Source', value: (t) => t.source },
        { header: 'Receipt URL', value: (t) => t.receiptUrl ?? '' },
      ]);

      downloadCsv(stampedFilename('transactions'), csv);

      if (all.total > all.items.length) {
        toast.warning(`Exported the first ${all.items.length} of ${all.total} rows — narrow the date range for the rest`);
      } else {
        toast.success(`Exported ${all.items.length} transactions`);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setExporting(false);
    }
  }

  async function handleArchive() {
    if (!archiving) return;
    try {
      await transactionsApi.remove(archiving._id);
      toast.success('Transaction archived');
      setArchiving(null);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not archive');
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Transactions" description="Every payment in and out, in USD">
        <Button variant="outline" size="sm" onClick={() => void handleExport()} disabled={exporting || loading}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
        <Button size="sm" onClick={() => { setEditing(null); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </PageHeader>

      {/* ── Filters ── */}
      <Card className="border-border/60 shadow-sm">
        <CardContent className="pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="f-from" className="text-xs">From</Label>
              <Input id="f-from" type="date" value={filters.from} onChange={(e) => updateFilter('from', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="f-to" className="text-xs">To</Label>
              <Input id="f-to" type="date" value={filters.to} onChange={(e) => updateFilter('to', e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="f-type" className="text-xs">Direction</Label>
              <EnumSelect
                id="f-type"
                value={filters.type}
                onChange={(v) => updateFilter('type', v)}
                includeAll
                allLabel="All"
                options={[
                  { value: 'in', label: 'Money in' },
                  { value: 'out', label: 'Money out' },
                ]}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="f-category" className="text-xs">Category</Label>
              <CategorySelect
                id="f-category"
                value={filters.categoryId}
                onChange={(v) => updateFilter('categoryId', v)}
                includeAll
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="f-client" className="text-xs">Client</Label>
              <ClientSelect
                id="f-client"
                value={filters.clientId}
                onChange={(v) => updateFilter('clientId', v)}
                includeAll
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="f-account" className="text-xs">Account</Label>
              <AccountSelect
                id="f-account"
                value={filters.accountId}
                onChange={(v) => updateFilter('accountId', v)}
                includeAll
              />
            </div>
            <div className="space-y-1.5 lg:col-span-2">
              <Label htmlFor="f-search" className="text-xs">Search</Label>
              <Input
                id="f-search"
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
                placeholder="Vendor or description"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={load} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ── Table ── */}
      <Card className="border-border/60 shadow-sm">
        <CardContent className="pt-5 px-0 sm:px-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="hidden md:table-cell">Client</TableHead>
                  <TableHead className="hidden lg:table-cell">Vendor</TableHead>
                  <TableHead className="hidden lg:table-cell">Account</TableHead>
                  <TableHead className="hidden sm:table-cell">Source</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-24 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableLoadingRows cols={COLS} />
                ) : status === 'error' ? (
                  <TableErrorRow cols={COLS} error={error ?? 'Request failed'} onRetry={load} />
                ) : items.length === 0 ? (
                  <TableEmptyRow
                    cols={COLS}
                    message={hasFilters ? 'No transactions match these filters' : 'No transactions yet'}
                    hint={
                      hasFilters
                        ? 'Try widening the date range or clearing a filter.'
                        : 'Add one manually, or let the n8n payment sync fill this in.'
                    }
                  />
                ) : (
                  items.map((tx) => (
                    <TableRow key={tx._id}>
                      <TableCell><DateCell value={tx.date} /></TableCell>
                      <TableCell>
                        <span className="flex items-center gap-2">
                          {categoryColor(tx.categoryId) && (
                            <span
                              className="h-2.5 w-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: categoryColor(tx.categoryId) as string }}
                            />
                          )}
                          <span className="font-medium">{categoryName(tx.categoryId)}</span>
                        </span>
                        {tx.description && (
                          <span className="block text-xs text-muted-foreground mt-0.5 line-clamp-1">
                            {tx.description}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {refName(tx.clientId)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {tx.vendor || '—'}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {accountName(tx.accountId)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="secondary" className="capitalize text-xs">{tx.source}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Money cents={tx.amountCents} tone={tx.type === 'in' ? 'in' : 'out'} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {tx.receiptUrl && (
                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                              <a href={tx.receiptUrl} target="_blank" rel="noopener noreferrer" title="Open receipt">
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="Edit"
                            onClick={() => { setEditing(tx); setDialogOpen(true); }}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            title="Archive"
                            onClick={() => setArchiving(tx)}
                          >
                            <Archive className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="px-4 sm:px-0">
            <Pager
              page={page}
              totalPages={totalPages}
              total={total}
              limit={PAGE_SIZE}
              onPage={setCurrentPage}
            />
          </div>
        </CardContent>
      </Card>

      <TransactionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editing}
        onSaved={load}
      />

      <ConfirmDialog
        open={archiving !== null}
        onOpenChange={(open) => !open && setArchiving(null)}
        title="Archive this transaction?"
        description={
          <>
            It will be hidden from the list and excluded from reports. Nothing is deleted — you can
            bring it back with the <strong>includeArchived</strong> filter on the API.
          </>
        }
        confirmLabel="Archive"
        onConfirm={handleArchive}
      />
    </div>
  );
}

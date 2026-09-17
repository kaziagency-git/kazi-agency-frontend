'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { BadgeCheck, Ban, Pencil, Plus, RefreshCw, X } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  DateCell, InvoiceStatusBadge, Money, PageHeader, Pager,
  TableEmptyRow, TableErrorRow, TableLoadingRows,
} from '@/components/accounting/acc-ui';
import { ClientSelect, EnumSelect } from '@/components/accounting/entity-select';
import { InvoiceDialog } from '@/components/accounting/invoice-dialog';
import { ConfirmDialog } from '@/components/accounting/confirm-dialog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAccInvoices } from '@/store/slices/accounting';
import {
  AccInvoice, invoicesApi, refId, refName, transactionsApi,
} from '@/lib/accounting/api';
import { ACC_INVOICE_STATUSES } from '@/lib/accounting/constants';
import { toYmdNY } from '@/lib/accounting/date';

const PAGE_SIZE = 20;
const COLS = 8;

export default function AccountingInvoicesPage() {
  const dispatch = useAppDispatch();
  const { items, total, page, totalPages, status, error } = useAppSelector((s) => s.accounting.invoices);
  const categories = useAppSelector((s) => s.accounting.reference.categories);

  const [clientId, setClientId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AccInvoice | null>(null);
  const [marking, setMarking] = useState<AccInvoice | null>(null);
  const [voiding, setVoiding] = useState<AccInvoice | null>(null);

  const loading = status === 'idle' || status === 'loading';

  const load = useCallback(() => {
    dispatch(
      fetchAccInvoices({
        page: currentPage,
        limit: PAGE_SIZE,
        sortBy: 'issueDate',
        sortDir: 'desc',
        clientId: clientId ?? undefined,
        status: statusFilter ?? undefined,
        search: search || undefined,
      })
    );
  }, [dispatch, currentPage, clientId, statusFilter, search]);

  useEffect(() => {
    load();
  }, [load]);

  const hasFilters = clientId !== null || statusFilter !== null || search !== '';

  function clearFilters() {
    setClientId(null);
    setStatusFilter(null);
    setSearch('');
    setCurrentPage(1);
  }

  /**
   * Marking an invoice paid also books the income, so the invoice list and the
   * transaction ledger cannot drift apart. The invoice is updated first: if the
   * transaction then fails, the admin is told exactly what is missing rather
   * than being left with a silent half-write.
   */
  async function handleMarkPaid() {
    if (!marking) return;

    const paidCategory = categories.find(
      (c) => c.type === 'income' && c.name.toLowerCase() === 'client payment'
    ) ?? categories.find((c) => c.type === 'income');

    if (!paidCategory) {
      toast.error('Add an income category in Settings first');
      return;
    }

    const paidAt = new Date().toISOString();

    try {
      await invoicesApi.update(marking._id, {
        status: 'paid',
        paidAt,
        paidAmountCents: marking.amountCents,
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not update the invoice');
      return;
    }

    try {
      await transactionsApi.create({
        date: toYmdNY(new Date(paidAt)),
        type: 'in',
        amountCents: marking.amountCents,
        categoryId: paidCategory._id,
        clientId: refId(marking.clientId),
        description: `Invoice ${marking.invoiceNumber}${marking.title ? ` — ${marking.title}` : ''}`,
      });
      toast.success('Invoice marked paid and income recorded');
    } catch (err) {
      toast.warning(
        `Invoice marked paid, but the income transaction failed: ${
          err instanceof Error ? err.message : 'unknown error'
        }. Add it manually from the Transactions tab.`
      );
    }

    setMarking(null);
    load();
  }

  async function handleVoid() {
    if (!voiding) return;
    try {
      await invoicesApi.remove(voiding._id);
      toast.success('Invoice voided');
      setVoiding(null);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not void the invoice');
    }
  }

  const outstandingCents = useMemo(
    () => items.filter((i) => i.status === 'sent' || i.status === 'overdue')
      .reduce((sum, i) => sum + i.amountCents, 0),
    [items]
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Created and sent from GoHighLevel; synced here by n8n"
      >
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        <Button size="sm" onClick={() => { setEditing(null); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </PageHeader>

      <Card className="border-border/60 shadow-sm">
        <CardContent className="pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="inv-f-client" className="text-xs">Client</Label>
              <ClientSelect
                id="inv-f-client"
                value={clientId}
                onChange={(v) => { setClientId(v); setCurrentPage(1); }}
                includeAll
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="inv-f-status" className="text-xs">Status</Label>
              <EnumSelect
                id="inv-f-status"
                value={statusFilter}
                onChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}
                includeAll
                allLabel="All statuses"
                options={ACC_INVOICE_STATUSES}
              />
            </div>
            <div className="space-y-1.5 lg:col-span-2">
              <Label htmlFor="inv-f-search" className="text-xs">Search</Label>
              <Input
                id="inv-f-search"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Invoice number or title"
              />
            </div>
          </div>

          {hasFilters && (
            <Button variant="ghost" size="sm" className="mt-4" onClick={clearFilters}>
              <X className="h-4 w-4 mr-2" />
              Clear filters
            </Button>
          )}
        </CardContent>
      </Card>

      {outstandingCents > 0 && (
        <Card className="border-amber-200 bg-amber-50/50 shadow-sm">
          <CardContent className="pt-5 flex items-center justify-between gap-3">
            <p className="text-sm text-amber-900">
              Outstanding on this page (sent or overdue)
            </p>
            <Money cents={outstandingCents} className="text-amber-900" />
          </CardContent>
        </Card>
      )}

      <Card className="border-border/60 shadow-sm">
        <CardContent className="pt-5 px-0 sm:px-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead className="hidden md:table-cell">Client</TableHead>
                  <TableHead className="hidden lg:table-cell">Basis</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead className="hidden sm:table-cell">Due</TableHead>
                  <TableHead>Status</TableHead>
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
                    message={hasFilters ? 'No invoices match these filters' : 'No invoices yet'}
                    hint={
                      hasFilters
                        ? 'Try another client or status.'
                        : 'Invoices sync in from GoHighLevel, or add one manually.'
                    }
                  />
                ) : (
                  items.map((inv) => (
                    <TableRow key={inv._id} className={inv.status === 'overdue' ? 'bg-red-50/40' : ''}>
                      <TableCell>
                        <span className="font-medium">{inv.invoiceNumber}</span>
                        {inv.title && (
                          <span className="block text-xs text-muted-foreground mt-0.5 line-clamp-1">
                            {inv.title}
                          </span>
                        )}
                        {inv.ghlInvoiceId && (
                          <Badge variant="secondary" className="mt-1 text-[10px]">GHL</Badge>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {refName(inv.clientId)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground capitalize">
                        {inv.billingType}
                        {inv.milestoneLabel && (
                          <span className="block text-xs">{inv.milestoneLabel}</span>
                        )}
                      </TableCell>
                      <TableCell><DateCell value={inv.issueDate} /></TableCell>
                      <TableCell className="hidden sm:table-cell"><DateCell value={inv.dueDate} /></TableCell>
                      <TableCell><InvoiceStatusBadge status={inv.status} /></TableCell>
                      <TableCell className="text-right">
                        <Money cents={inv.amountCents} />
                        {inv.status === 'paid' && inv.paidAmountCents > 0 && (
                          <span className="block text-xs text-emerald-600 mt-0.5">
                            paid <DateCell value={inv.paidAt} />
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {inv.status !== 'paid' && inv.status !== 'void' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-emerald-600 hover:text-emerald-700"
                              title="Mark as paid"
                              onClick={() => setMarking(inv)}
                            >
                              <BadgeCheck className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="Edit"
                            onClick={() => { setEditing(inv); setDialogOpen(true); }}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          {inv.status !== 'void' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              title="Void"
                              onClick={() => setVoiding(inv)}
                            >
                              <Ban className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="px-4 sm:px-0">
            <Pager page={page} totalPages={totalPages} total={total} limit={PAGE_SIZE} onPage={setCurrentPage} />
          </div>
        </CardContent>
      </Card>

      <InvoiceDialog open={dialogOpen} onOpenChange={setDialogOpen} editing={editing} onSaved={load} />

      <ConfirmDialog
        open={marking !== null}
        onOpenChange={(open) => !open && setMarking(null)}
        title="Mark this invoice as paid?"
        destructive={false}
        confirmLabel="Mark paid"
        description={
          marking && (
            <>
              <strong>{marking.invoiceNumber}</strong> will be set to <strong>paid</strong>, and a
              matching income transaction will be created for{' '}
              <strong>{(marking.amountCents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</strong>{' '}
              under <strong>Client Payment</strong>.
            </>
          )
        }
        onConfirm={handleMarkPaid}
      />

      <ConfirmDialog
        open={voiding !== null}
        onOpenChange={(open) => !open && setVoiding(null)}
        title="Void this invoice?"
        confirmLabel="Void invoice"
        description={
          <>
            The invoice stays in the list with a <strong>void</strong> status so the numbering
            history is preserved. It is excluded from outstanding totals. Nothing is deleted.
          </>
        }
        onConfirm={handleVoid}
      />
    </div>
  );
}

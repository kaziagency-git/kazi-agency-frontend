'use client';

import { useCallback, useEffect, useState } from 'react';
import { Archive, Pencil, Plus, RefreshCw, Server } from 'lucide-react';
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
  DateCell, DaysLeftBadge, Money, PageHeader, Pager, StatusBadge,
  TableEmptyRow, TableErrorRow, TableLoadingRows,
} from '@/components/accounting/acc-ui';
import { ClientSelect, EnumSelect } from '@/components/accounting/entity-select';
import { HostingDialog } from '@/components/accounting/renewal-dialogs';
import { ConfirmDialog } from '@/components/accounting/confirm-dialog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAccHostings } from '@/store/slices/accounting';
import { AccHosting, hostingsApi, refName } from '@/lib/accounting/api';
import { ACC_HOSTING_STATUSES } from '@/lib/accounting/constants';
import { daysUntil } from '@/lib/accounting/date';

const PAGE_SIZE = 20;
const COLS = 8;

export default function AccountingHostingsPage() {
  const dispatch = useAppDispatch();
  const { items, total, page, totalPages, status, error } = useAppSelector((s) => s.accounting.hostings);

  const [clientId, setClientId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AccHosting | null>(null);
  const [archiving, setArchiving] = useState<AccHosting | null>(null);

  const loading = status === 'idle' || status === 'loading';

  const load = useCallback(() => {
    dispatch(
      fetchAccHostings({
        page: currentPage,
        limit: PAGE_SIZE,
        sortBy: 'expiryDate',
        sortDir: 'asc',
        clientId: clientId ?? undefined,
        status: statusFilter ?? undefined,
        search: search || undefined,
      })
    );
  }, [dispatch, currentPage, clientId, statusFilter, search]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleArchive() {
    if (!archiving) return;
    try {
      await hostingsApi.remove(archiving._id);
      toast.success('Hosting plan archived');
      setArchiving(null);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not archive');
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Hosting" description="Plans, renewal dates and what each client is billed">
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
              <Label htmlFor="ho-client" className="text-xs">Client</Label>
              <ClientSelect id="ho-client" value={clientId} onChange={(v) => { setClientId(v); setCurrentPage(1); }} includeAll />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ho-status" className="text-xs">Status</Label>
              <EnumSelect
                id="ho-status"
                value={statusFilter}
                onChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}
                includeAll
                allLabel="All statuses"
                options={ACC_HOSTING_STATUSES}
              />
            </div>
            <div className="space-y-1.5 lg:col-span-2">
              <Label htmlFor="ho-search" className="text-xs">Search</Label>
              <Input
                id="ho-search"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Plan name or domain"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 shadow-sm">
        <CardContent className="pt-5 px-0 sm:px-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan</TableHead>
                  <TableHead className="hidden md:table-cell">Client</TableHead>
                  <TableHead className="hidden lg:table-cell">Provider</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Days left</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="text-right">Cost / Charge</TableHead>
                  <TableHead className="w-20 text-right">Actions</TableHead>
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
                    message="No hosting plans tracked yet"
                    hint="Add each plan so its renewal shows up in the 30-day window."
                  />
                ) : (
                  items.map((h) => {
                    const days = daysUntil(new Date(h.expiryDate));
                    return (
                      <TableRow key={h._id} className={rowTone(days, h.status)}>
                        <TableCell>
                          <span className="font-medium flex items-center gap-2">
                            <Server className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            {h.name}
                          </span>
                          {h.plan && <span className="block text-xs text-muted-foreground mt-0.5">{h.plan}</span>}
                          {h.relatedDomains.length > 0 && (
                            <span className="block text-xs text-muted-foreground mt-0.5 line-clamp-1">
                              {h.relatedDomains.join(', ')}
                            </span>
                          )}
                          {!h.autoRenew && (
                            <Badge variant="secondary" className="mt-1 text-[10px] bg-amber-100 text-amber-700">
                              Manual renew
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {refName(h.clientId, 'Agency')}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground">{h.provider}</TableCell>
                        <TableCell><DateCell value={h.expiryDate} /></TableCell>
                        <TableCell><DaysLeftBadge days={days} /></TableCell>
                        <TableCell className="hidden sm:table-cell"><StatusBadge status={h.status} /></TableCell>
                        <TableCell className="text-right">
                          <Money cents={h.costCents} />
                          {h.chargeCents > 0 && (
                            <span className="block text-xs text-emerald-600">
                              bills <Money cents={h.chargeCents} />
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit"
                              onClick={() => { setEditing(h); setDialogOpen(true); }}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              title="Archive" onClick={() => setArchiving(h)}>
                              <Archive className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          <div className="px-4 sm:px-0">
            <Pager page={page} totalPages={totalPages} total={total} limit={PAGE_SIZE} onPage={setCurrentPage} />
          </div>
        </CardContent>
      </Card>

      <HostingDialog open={dialogOpen} onOpenChange={setDialogOpen} editing={editing} onSaved={load} />

      <ConfirmDialog
        open={archiving !== null}
        onOpenChange={(open) => !open && setArchiving(null)}
        title="Archive this hosting plan?"
        description={
          <>
            <strong>{archiving?.name}</strong> will be hidden from the list and will stop generating
            renewal alerts. Nothing is deleted.
          </>
        }
        confirmLabel="Archive"
        onConfirm={handleArchive}
      />
    </div>
  );
}

function rowTone(days: number, status: string): string {
  if (status === 'expired' || days < 0) return 'bg-red-50/60';
  if (days <= 7) return 'bg-red-50/40';
  if (days <= 15) return 'bg-amber-50/40';
  return '';
}

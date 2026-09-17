'use client';

import { useCallback, useEffect, useState } from 'react';
import { Archive, ExternalLink, Globe, Pencil, Plus, RefreshCw } from 'lucide-react';
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
import { DomainDialog } from '@/components/accounting/renewal-dialogs';
import { ConfirmDialog } from '@/components/accounting/confirm-dialog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAccDomains } from '@/store/slices/accounting';
import { AccDomain, domainsApi, refName } from '@/lib/accounting/api';
import { ACC_DOMAIN_STATUSES } from '@/lib/accounting/constants';
import { daysUntil } from '@/lib/accounting/date';

const PAGE_SIZE = 20;
const COLS = 8;

export default function AccountingDomainsPage() {
  const dispatch = useAppDispatch();
  const { items, total, page, totalPages, status, error } = useAppSelector((s) => s.accounting.domains);

  const [clientId, setClientId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AccDomain | null>(null);
  const [archiving, setArchiving] = useState<AccDomain | null>(null);

  const loading = status === 'idle' || status === 'loading';

  const load = useCallback(() => {
    dispatch(
      fetchAccDomains({
        page: currentPage,
        limit: PAGE_SIZE,
        // Soonest expiry first — the whole point of this table.
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
      await domainsApi.remove(archiving._id);
      toast.success('Domain archived');
      setArchiving(null);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not archive');
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Domains" description="Registrations and renewal dates">
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
              <Label htmlFor="dm-client" className="text-xs">Client</Label>
              <ClientSelect id="dm-client" value={clientId} onChange={(v) => { setClientId(v); setCurrentPage(1); }} includeAll />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dm-status" className="text-xs">Status</Label>
              <EnumSelect
                id="dm-status"
                value={statusFilter}
                onChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}
                includeAll
                allLabel="All statuses"
                options={ACC_DOMAIN_STATUSES}
              />
            </div>
            <div className="space-y-1.5 lg:col-span-2">
              <Label htmlFor="dm-search" className="text-xs">Search</Label>
              <Input
                id="dm-search"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Domain name or note"
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
                  <TableHead>Domain</TableHead>
                  <TableHead className="hidden md:table-cell">Client</TableHead>
                  <TableHead className="hidden lg:table-cell">Registrar</TableHead>
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
                    message="No domains tracked yet"
                    hint="Add the domains you manage so renewal alerts can fire before they lapse."
                  />
                ) : (
                  items.map((d) => {
                    const days = daysUntil(new Date(d.expiryDate));
                    return (
                      <TableRow key={d._id} className={rowTone(days, d.status)}>
                        <TableCell>
                          <span className="font-medium flex items-center gap-2">
                            <Globe className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            {d.domain}
                            <a
                              href={`https://${d.domain}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary"
                              title="Open site"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </span>
                          {!d.autoRenew && (
                            <Badge variant="secondary" className="mt-1 text-[10px] bg-amber-100 text-amber-700">
                              Manual renew
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {refName(d.clientId, 'Agency')}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-muted-foreground">{d.registrar}</TableCell>
                        <TableCell><DateCell value={d.expiryDate} /></TableCell>
                        <TableCell><DaysLeftBadge days={days} /></TableCell>
                        <TableCell className="hidden sm:table-cell"><StatusBadge status={d.status} /></TableCell>
                        <TableCell className="text-right">
                          <Money cents={d.costCents} />
                          {d.chargeCents > 0 && (
                            <span className="block text-xs text-emerald-600">
                              bills <Money cents={d.chargeCents} />
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit"
                              onClick={() => { setEditing(d); setDialogOpen(true); }}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              title="Archive" onClick={() => setArchiving(d)}>
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

      <DomainDialog open={dialogOpen} onOpenChange={setDialogOpen} editing={editing} onSaved={load} />

      <ConfirmDialog
        open={archiving !== null}
        onOpenChange={(open) => !open && setArchiving(null)}
        title="Archive this domain?"
        description={
          <>
            <strong>{archiving?.domain}</strong> will be hidden from the list and will stop
            generating renewal alerts. Nothing is deleted.
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

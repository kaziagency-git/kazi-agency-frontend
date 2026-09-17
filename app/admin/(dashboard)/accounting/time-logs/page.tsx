'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Clock, Loader2, Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  DateCell, Money, PageHeader, Pager, TableEmptyRow, TableErrorRow, TableLoadingRows,
} from '@/components/accounting/acc-ui';
import { ClientSelect, EnumSelect } from '@/components/accounting/entity-select';
import { MoneyInput } from '@/components/accounting/money-input';
import { ConfirmDialog } from '@/components/accounting/confirm-dialog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAccTimeLogs } from '@/store/slices/accounting';
import {
  AccTimeLog, clientProfilesApi, refId, refName, timeLogsApi,
} from '@/lib/accounting/api';
import { toYmdNY } from '@/lib/accounting/date';
import { formatUSD } from '@/lib/accounting/money';

const PAGE_SIZE = 20;
const COLS = 7;

export default function AccountingTimeLogsPage() {
  const dispatch = useAppDispatch();
  const { items, total, page, totalPages, status, error } = useAppSelector((s) => s.accounting.timeLogs);

  const [clientId, setClientId] = useState<string | null>(null);
  const [invoicedFilter, setInvoicedFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AccTimeLog | null>(null);
  const [deleting, setDeleting] = useState<AccTimeLog | null>(null);

  const loading = status === 'idle' || status === 'loading';

  const load = useCallback(() => {
    dispatch(
      fetchAccTimeLogs({
        page: currentPage,
        limit: PAGE_SIZE,
        sortBy: 'date',
        sortDir: 'desc',
        clientId: clientId ?? undefined,
        invoiced: invoicedFilter ?? undefined,
      })
    );
  }, [dispatch, currentPage, clientId, invoicedFilter]);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Unbilled totals per client, from the rows currently loaded. It is a view
   * of this page rather than an all-time figure — filter to one client for a
   * complete picture of their unbilled work.
   */
  const unbilled = useMemo(() => {
    const byClient = new Map<string, { name: string; hours: number; cents: number }>();

    for (const log of items) {
      if (log.invoiced) continue;
      const id = refId(log.clientId) ?? 'unknown';
      const entry = byClient.get(id) ?? { name: refName(log.clientId, 'Unknown client'), hours: 0, cents: 0 };
      entry.hours += log.hours;
      entry.cents += Math.round(log.hours * log.rateCents);
      byClient.set(id, entry);
    }

    return [...byClient.entries()].map(([id, v]) => ({ id, ...v })).sort((a, b) => b.cents - a.cents);
  }, [items]);

  async function handleDelete() {
    if (!deleting) return;
    try {
      await timeLogsApi.remove(deleting._id);
      toast.success('Time log deleted');
      setDeleting(null);
      load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not delete');
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Time Logs" description="Billable hours for hourly clients">
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        <Button size="sm" onClick={() => { setEditing(null); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Log hours
        </Button>
      </PageHeader>

      {unbilled.length > 0 && (
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Unbilled on this page</CardTitle>
            <p className="text-xs text-muted-foreground">
              Hours logged but not yet attached to an invoice
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {unbilled.map((u) => (
                <div key={u.id} className="rounded-lg border border-border/60 p-3">
                  <p className="text-sm font-medium truncate">{u.name}</p>
                  <div className="flex items-baseline justify-between mt-1">
                    <span className="text-xs text-muted-foreground">{u.hours.toFixed(2)} h</span>
                    <span className="text-base font-bold tabular-nums">{formatUSD(u.cents)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-border/60 shadow-sm">
        <CardContent className="pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="tl-client" className="text-xs">Client</Label>
              <ClientSelect id="tl-client" value={clientId} onChange={(v) => { setClientId(v); setCurrentPage(1); }} includeAll />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tl-invoiced" className="text-xs">Billing state</Label>
              <EnumSelect
                id="tl-invoiced"
                value={invoicedFilter}
                onChange={(v) => { setInvoicedFilter(v); setCurrentPage(1); }}
                includeAll
                allLabel="All"
                options={[
                  { value: 'false', label: 'Unbilled' },
                  { value: 'true', label: 'Invoiced' },
                ]}
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
                  <TableHead>Date</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead className="text-right">Hours</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">Rate</TableHead>
                  <TableHead className="text-right">Value</TableHead>
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
                    message="No hours logged yet"
                    hint="Log time against hourly clients to track what is owed."
                  />
                ) : (
                  items.map((log) => (
                    <TableRow key={log._id}>
                      <TableCell><DateCell value={log.date} /></TableCell>
                      <TableCell className="font-medium">{refName(log.clientId)}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        <span className="line-clamp-1">{log.description || '—'}</span>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{log.hours.toFixed(2)}</TableCell>
                      <TableCell className="hidden sm:table-cell text-right text-muted-foreground">
                        {formatUSD(log.rateCents)}/h
                      </TableCell>
                      <TableCell className="text-right">
                        <Money cents={Math.round(log.hours * log.rateCents)} />
                        <Badge
                          variant="secondary"
                          className={`ml-2 text-[10px] ${log.invoiced ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
                        >
                          {log.invoiced ? 'Invoiced' : 'Unbilled'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit"
                            onClick={() => { setEditing(log); setDialogOpen(true); }}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            title="Delete" onClick={() => setDeleting(log)}>
                            <Trash2 className="h-3.5 w-3.5" />
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
            <Pager page={page} totalPages={totalPages} total={total} limit={PAGE_SIZE} onPage={setCurrentPage} />
          </div>
        </CardContent>
      </Card>

      <TimeLogDialog open={dialogOpen} onOpenChange={setDialogOpen} editing={editing} onSaved={load} />

      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete this time log?"
        description={
          <>
            This entry has no archive state, so it is removed permanently.
            {deleting?.invoiced && (
              <strong className="block mt-2 text-destructive">
                It is already marked invoiced — deleting it will not change the invoice.
              </strong>
            )}
          </>
        }
        confirmLabel="Delete"
        onConfirm={handleDelete}
      />
    </div>
  );
}

// ── Dialog ─────────────────────────────────────────────────────────────────

function TimeLogDialog({
  open, onOpenChange, editing, onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: AccTimeLog | null;
  onSaved: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);
  const [date, setDate] = useState(toYmdNY(new Date()));
  const [hours, setHours] = useState('');
  const [description, setDescription] = useState('');
  const [rateCents, setRateCents] = useState(0);
  const [rateLoading, setRateLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setClientId(refId(editing.clientId));
      setDate(toYmdNY(new Date(editing.date)));
      setHours(String(editing.hours));
      setDescription(editing.description ?? '');
      setRateCents(editing.rateCents);
    } else {
      setClientId(null);
      setDate(toYmdNY(new Date()));
      setHours('');
      setDescription('');
      setRateCents(0);
    }
  }, [open, editing]);

  /**
   * Prefills the rate from the client's billing profile on a NEW entry. An
   * existing log keeps its stored rate — that snapshot is what makes past work
   * immune to a later rate change.
   */
  useEffect(() => {
    if (!open || editing || !clientId) return;

    let cancelled = false;
    setRateLoading(true);

    clientProfilesApi
      .list({ clientId, limit: 1 })
      .then((res) => {
        if (cancelled) return;
        setRateCents(res.items[0]?.hourlyRateCents ?? 0);
      })
      .catch(() => {
        if (!cancelled) setRateCents(0);
      })
      .finally(() => {
        if (!cancelled) setRateLoading(false);
      });

    return () => { cancelled = true; };
  }, [open, editing, clientId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsedHours = Number(hours);
    if (!clientId) { toast.error('Pick a client'); return; }
    if (!Number.isFinite(parsedHours) || parsedHours <= 0) { toast.error('Enter the hours worked'); return; }

    setSaving(true);
    try {
      const payload = {
        clientId,
        date,
        hours: parsedHours,
        description: description.trim(),
        rateCents,
      };

      if (editing) {
        await timeLogsApi.update(editing._id, payload);
        toast.success('Time log updated');
      } else {
        await timeLogsApi.create(payload);
        toast.success('Hours logged');
      }
      onSaved();
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save the time log');
    } finally {
      setSaving(false);
    }
  }

  const value = Math.round((Number(hours) || 0) * rateCents);

  return (
    <Dialog open={open} onOpenChange={(next) => !saving && onOpenChange(next)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editing ? 'Edit time log' : 'Log hours'}</DialogTitle>
          <DialogDescription>
            The rate is stored with the entry, so later rate changes do not rewrite past work.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="tl-d-client">Client</Label>
            <ClientSelect
              id="tl-d-client"
              value={clientId}
              onChange={setClientId}
              allowNone={false}
              disabled={Boolean(editing)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="tl-d-date">Date</Label>
              <Input id="tl-d-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tl-d-hours">Hours</Label>
              <Input
                id="tl-d-hours"
                type="number"
                step="0.25"
                min="0"
                max="24"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="1.5"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tl-d-rate" className="flex items-center gap-2">
              Hourly rate
              {rateLoading && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
            </Label>
            <MoneyInput id="tl-d-rate" valueCents={rateCents} onChangeCents={setRateCents} />
            <p className="text-xs text-muted-foreground">
              Prefilled from the client&apos;s billing profile — override it here if needed.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tl-d-desc">Description</Label>
            <Textarea id="tl-d-desc" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          {value > 0 && (
            <div className="rounded-lg bg-muted/50 px-3 py-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" /> Value of this entry
              </span>
              <span className="font-bold tabular-nums">{formatUSD(value)}</span>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editing ? 'Save changes' : 'Log hours'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

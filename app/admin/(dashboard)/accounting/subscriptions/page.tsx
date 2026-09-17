'use client';

import { useCallback, useEffect, useState } from 'react';
import { Archive, ExternalLink, Pencil, Plus, RefreshCw, Repeat, CalendarClock, Building2 } from 'lucide-react';
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
  DateCell, DaysLeftBadge, Money, PageHeader, Pager, StatCard, StatusBadge,
  TableEmptyRow, TableErrorRow, TableLoadingRows,
} from '@/components/accounting/acc-ui';
import { EnumSelect } from '@/components/accounting/entity-select';
import { SubscriptionDialog } from '@/components/accounting/renewal-dialogs';
import { ConfirmDialog } from '@/components/accounting/confirm-dialog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAccSubscriptions } from '@/store/slices/accounting';
import {
  AccSubscription, SubscriptionTotalsReport, refName, reportsApi, subscriptionsApi,
} from '@/lib/accounting/api';
import { ACC_BILLING_CYCLES, ACC_SUBSCRIPTION_STATUSES } from '@/lib/accounting/constants';
import { daysUntil } from '@/lib/accounting/date';
import { formatUSD } from '@/lib/accounting/money';

const PAGE_SIZE = 20;
const COLS = 8;

export default function AccountingSubscriptionsPage() {
  const dispatch = useAppDispatch();
  const { items, total, page, totalPages, status, error } = useAppSelector((s) => s.accounting.subscriptions);

  const [statusFilter, setStatusFilter] = useState<string | null>('active');
  const [cycleFilter, setCycleFilter] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AccSubscription | null>(null);
  const [archiving, setArchiving] = useState<AccSubscription | null>(null);
  const [totals, setTotals] = useState<SubscriptionTotalsReport | null>(null);
  const [totalsLoading, setTotalsLoading] = useState(true);

  const loading = status === 'idle' || status === 'loading';

  const load = useCallback(() => {
    dispatch(
      fetchAccSubscriptions({
        page: currentPage,
        limit: PAGE_SIZE,
        sortBy: 'nextBillingDate',
        sortDir: 'asc',
        status: statusFilter ?? undefined,
        billingCycle: cycleFilter ?? undefined,
        search: search || undefined,
      })
    );
  }, [dispatch, currentPage, statusFilter, cycleFilter, search]);

  const loadTotals = useCallback(async () => {
    setTotalsLoading(true);
    try {
      setTotals(await reportsApi.subscriptionTotals());
    } catch {
      // The table is the primary content; a totals failure must not block it.
      setTotals(null);
    } finally {
      setTotalsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    void loadTotals();
  }, [loadTotals]);

  function refresh() {
    load();
    void loadTotals();
  }

  async function handleArchive() {
    if (!archiving) return;
    try {
      await subscriptionsApi.remove(archiving._id);
      toast.success('Subscription archived');
      setArchiving(null);
      refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not archive');
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Subscriptions" description="Tools and software the agency pays for">
        <Button variant="outline" size="sm" onClick={refresh} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        <Button size="sm" onClick={() => { setEditing(null); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </PageHeader>

      {/* Totals cover ACTIVE subscriptions regardless of the table filter. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
        <StatCard
          label="Monthly equivalent"
          value={formatUSD(totals?.monthlyEquivalentCents ?? 0)}
          sub="Yearly plans counted as cost ÷ 12"
          icon={Repeat}
          color="text-violet-600"
          bg="bg-violet-100"
          loading={totalsLoading}
        />
        <StatCard
          label="Yearly total"
          value={formatUSD(totals?.yearlyTotalCents ?? 0)}
          sub={`${totals?.activeCount ?? 0} active subscriptions`}
          icon={CalendarClock}
          loading={totalsLoading}
        />
        <StatCard
          label="Re-billed to clients"
          value={formatUSD(totals?.billableToClientsCents ?? 0)}
          sub="Recovered from clients"
          icon={Building2}
          color="text-emerald-600"
          bg="bg-emerald-100"
          loading={totalsLoading}
        />
        <StatCard
          label="Agency's own cost"
          value={formatUSD(totals?.agencyOwnCents ?? 0)}
          sub={totals?.oneTimeTotalCents ? `+ ${formatUSD(totals.oneTimeTotalCents)} one-time` : 'Not re-billed'}
          icon={Repeat}
          color="text-red-600"
          bg="bg-red-100"
          loading={totalsLoading}
        />
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardContent className="pt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="su-status" className="text-xs">Status</Label>
              <EnumSelect
                id="su-status"
                value={statusFilter}
                onChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}
                includeAll
                allLabel="All statuses"
                options={ACC_SUBSCRIPTION_STATUSES}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="su-cycle" className="text-xs">Billing cycle</Label>
              <EnumSelect
                id="su-cycle"
                value={cycleFilter}
                onChange={(v) => { setCycleFilter(v); setCurrentPage(1); }}
                includeAll
                allLabel="All cycles"
                options={ACC_BILLING_CYCLES}
              />
            </div>
            <div className="space-y-1.5 lg:col-span-2">
              <Label htmlFor="su-search" className="text-xs">Search</Label>
              <Input
                id="su-search"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Tool or plan name"
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
                  <TableHead>Tool</TableHead>
                  <TableHead className="hidden lg:table-cell">Cycle</TableHead>
                  <TableHead>Next billing</TableHead>
                  <TableHead className="hidden sm:table-cell">Due in</TableHead>
                  <TableHead className="hidden md:table-cell">Re-billed to</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
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
                    message="No subscriptions match"
                    hint="Add the tools the agency pays for to see the true monthly run rate."
                  />
                ) : (
                  items.map((s) => {
                    const days = s.nextBillingDate ? daysUntil(new Date(s.nextBillingDate)) : null;
                    return (
                      <TableRow key={s._id} className={days !== null && days <= 5 ? 'bg-amber-50/40' : ''}>
                        <TableCell>
                          <span className="font-medium flex items-center gap-2">
                            {s.toolName}
                            {s.url && (
                              <a href={s.url} target="_blank" rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary" title="Open">
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </span>
                          {s.plan && <span className="block text-xs text-muted-foreground mt-0.5">{s.plan}</span>}
                          {s.loginEmail && (
                            <span className="block text-xs text-muted-foreground mt-0.5">{s.loginEmail}</span>
                          )}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <Badge variant="secondary" className="capitalize text-xs">
                            {s.billingCycle.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell><DateCell value={s.nextBillingDate} /></TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {days === null ? (
                            <span className="text-muted-foreground text-xs">—</span>
                          ) : (
                            <DaysLeftBadge days={days} />
                          )}
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {s.isBillableToClient ? refName(s.clientId, 'Unassigned') : '—'}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell"><StatusBadge status={s.status} /></TableCell>
                        <TableCell className="text-right">
                          <Money cents={s.costCents} />
                          {s.billingCycle === 'yearly' && (
                            <span className="block text-xs text-muted-foreground">
                              ≈ {formatUSD(Math.round(s.costCents / 12))}/mo
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit"
                              onClick={() => { setEditing(s); setDialogOpen(true); }}>
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              title="Archive" onClick={() => setArchiving(s)}>
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

      <SubscriptionDialog open={dialogOpen} onOpenChange={setDialogOpen} editing={editing} onSaved={refresh} />

      <ConfirmDialog
        open={archiving !== null}
        onOpenChange={(open) => !open && setArchiving(null)}
        title="Archive this subscription?"
        description={
          <>
            <strong>{archiving?.toolName}</strong> will drop out of the list, the renewal reminders
            and the monthly run-rate totals. Nothing is deleted.
          </>
        }
        confirmLabel="Archive"
        onConfirm={handleArchive}
      />
    </div>
  );
}

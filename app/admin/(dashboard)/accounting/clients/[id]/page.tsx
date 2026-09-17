'use client';

import { use, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Clock, FileText, RefreshCw, TrendingUp, Wallet,
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  DateCell, InvoiceStatusBadge, Money, PageHeader, StatCard, TableEmptyRow,
} from '@/components/accounting/acc-ui';
import { useAppSelector } from '@/store/hooks';
import {
  AccClientProfile, AccInvoice, AccTimeLog,
  clientProfilesApi, invoicesApi, timeLogsApi,
} from '@/lib/accounting/api';
import { formatUSD } from '@/lib/accounting/money';

/**
 * One client's accounting picture: billing profile, what they have paid, what
 * is still outstanding, their invoices and their logged hours.
 */
export default function AccountingClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const client = useAppSelector((s) => s.accounting.reference.clients.find((c) => c._id === id));
  const refStatus = useAppSelector((s) => s.accounting.reference.status);

  const [profile, setProfile] = useState<AccClientProfile | null>(null);
  const [invoices, setInvoices] = useState<AccInvoice[]>([]);
  const [timeLogs, setTimeLogs] = useState<AccTimeLog[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [profileRes, invoiceRes, logRes] = await Promise.all([
        clientProfilesApi.list({ clientId: id, limit: 1, includeInactive: true }),
        invoicesApi.list({ clientId: id, limit: 200, sortBy: 'issueDate', sortDir: 'desc' }),
        timeLogsApi.list({ clientId: id, limit: 200, sortBy: 'date', sortDir: 'desc' }),
      ]);

      setProfile(profileRes.items[0] ?? null);
      setInvoices(invoiceRes.items);
      setTimeLogs(logRes.items);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not load this client');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  // Paid = what actually landed. Outstanding excludes drafts and voids, which
  // are not owed yet (or ever).
  const paidCents = invoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => sum + (i.paidAmountCents || i.amountCents), 0);

  const outstandingCents = invoices
    .filter((i) => i.status === 'sent' || i.status === 'overdue')
    .reduce((sum, i) => sum + i.amountCents, 0);

  const overdueCount = invoices.filter((i) => i.status === 'overdue').length;

  const unbilledHours = timeLogs.filter((l) => !l.invoiced).reduce((sum, l) => sum + l.hours, 0);
  const unbilledCents = timeLogs
    .filter((l) => !l.invoiced)
    .reduce((sum, l) => sum + Math.round(l.hours * l.rateCents), 0);

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link href="/admin/accounting/clients">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to client billing
        </Link>
      </Button>

      <PageHeader
        title={client?.name ?? (refStatus === 'loading' ? 'Loading…' : 'Client')}
        description={client ? [client.company, client.email].filter(Boolean).join(' · ') : undefined}
      >
        <Button variant="outline" size="sm" onClick={() => void load()} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </PageHeader>

      {/* ── Totals ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
        <StatCard
          label="Total paid"
          value={formatUSD(paidCents)}
          sub={`${invoices.filter((i) => i.status === 'paid').length} paid invoices`}
          icon={TrendingUp}
          color="text-emerald-600"
          bg="bg-emerald-100"
          loading={loading}
        />
        <StatCard
          label="Outstanding"
          value={formatUSD(outstandingCents)}
          sub={overdueCount > 0 ? `${overdueCount} overdue` : 'Sent, not yet paid'}
          icon={Wallet}
          color={outstandingCents > 0 ? 'text-amber-600' : 'text-primary'}
          bg={outstandingCents > 0 ? 'bg-amber-100' : 'bg-primary/10'}
          loading={loading}
        />
        <StatCard
          label="Unbilled hours"
          value={unbilledHours.toFixed(2)}
          sub={`worth ${formatUSD(unbilledCents)}`}
          icon={Clock}
          color="text-violet-600"
          bg="bg-violet-100"
          loading={loading}
        />
        <StatCard
          label="Invoices"
          value={String(invoices.length)}
          sub="All statuses"
          icon={FileText}
          loading={loading}
        />
      </div>

      {/* ── Billing profile ── */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Billing profile</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/accounting/clients">Edit</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-16 w-full" />
          ) : !profile ? (
            <p className="text-sm text-muted-foreground">
              No billing profile yet. Set one up from the client billing list to record the
              retainer, hourly rate and GoHighLevel contact id.
            </p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <Field label="Billing type">
                <Badge variant="secondary" className="capitalize">{profile.billingType}</Badge>
              </Field>
              <Field label="Monthly fee">
                {profile.monthlyFeeCents > 0 ? <Money cents={profile.monthlyFeeCents} /> : '—'}
              </Field>
              <Field label="Hourly rate">
                {profile.hourlyRateCents > 0 ? <><Money cents={profile.hourlyRateCents} />/h</> : '—'}
              </Field>
              <Field label="Billing day">Day {profile.billingDayOfMonth}</Field>
              <Field label="GHL contact">
                <span className="font-mono text-xs">{profile.ghlContactId || '— not linked'}</span>
              </Field>
              <Field label="Status">
                {profile.isActive ? (
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Active</Badge>
                ) : (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600">Inactive</Badge>
                )}
              </Field>
              {profile.notes && (
                <div className="col-span-2 lg:col-span-4">
                  <p className="text-xs text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm whitespace-pre-wrap">{profile.notes}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Invoices ── */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Invoices</CardTitle>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead className="hidden sm:table-cell">Due</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 5 }).map((__, c) => (
                        <TableCell key={c}><Skeleton className="h-4 w-20" /></TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : invoices.length === 0 ? (
                  <TableEmptyRow cols={5} message="No invoices for this client yet" />
                ) : (
                  invoices.map((inv) => (
                    <TableRow key={inv._id} className={inv.status === 'overdue' ? 'bg-red-50/40' : ''}>
                      <TableCell>
                        <span className="font-medium">{inv.invoiceNumber}</span>
                        {inv.title && (
                          <span className="block text-xs text-muted-foreground">{inv.title}</span>
                        )}
                      </TableCell>
                      <TableCell><DateCell value={inv.issueDate} /></TableCell>
                      <TableCell className="hidden sm:table-cell"><DateCell value={inv.dueDate} /></TableCell>
                      <TableCell><InvoiceStatusBadge status={inv.status} /></TableCell>
                      <TableCell className="text-right"><Money cents={inv.amountCents} /></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ── Time logs ── */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Time logs</CardTitle>
          <p className="text-xs text-muted-foreground">
            {unbilledHours.toFixed(2)} unbilled hours worth {formatUSD(unbilledCents)}
          </p>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead className="hidden sm:table-cell">Description</TableHead>
                  <TableHead className="text-right">Hours</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">Rate</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 5 }).map((__, c) => (
                        <TableCell key={c}><Skeleton className="h-4 w-20" /></TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : timeLogs.length === 0 ? (
                  <TableEmptyRow cols={5} message="No hours logged for this client" />
                ) : (
                  timeLogs.map((log) => (
                    <TableRow key={log._id}>
                      <TableCell><DateCell value={log.date} /></TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        <span className="line-clamp-1">{log.description || '—'}</span>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{log.hours.toFixed(2)}</TableCell>
                      <TableCell className="hidden sm:table-cell text-right text-muted-foreground">
                        {formatUSD(log.rateCents)}/h
                      </TableCell>
                      <TableCell className="text-right">
                        <Money cents={Math.round(log.hours * log.rateCents)} />
                        {!log.invoiced && (
                          <Badge variant="secondary" className="ml-2 text-[10px] bg-amber-100 text-amber-700">
                            Unbilled
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="font-medium">{children}</div>
    </div>
  );
}

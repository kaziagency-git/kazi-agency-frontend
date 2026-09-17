'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp, TrendingDown, Wallet, Repeat, AlertTriangle, RefreshCw, ArrowRight,
} from 'lucide-react';
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  DateCell, DaysLeftBadge, InvoiceStatusBadge, Money, PageHeader, StatCard, TableEmptyRow,
} from '@/components/accounting/acc-ui';
import { formatUSD } from '@/lib/accounting/money';
import { ACC_DISPLAY_TIMEZONE } from '@/lib/accounting/constants';
import {
  MonthlyReport, SubscriptionTotalsReport, SummaryReport, UpcomingItem, UpcomingReport, reportsApi,
} from '@/lib/accounting/api';

/** Fallback palette for categories that have no colour set. */
const PIE_COLORS = ['#0ea5e9', '#8b5cf6', '#f97316', '#10b981', '#ef4444', '#eab308', '#64748b', '#ec4899'];

type Rows = { kind: 'Domain' | 'Hosting' | 'Subscription'; item: UpcomingItem }[];

export default function AccountingOverviewPage() {
  const [monthSummary, setMonthSummary] = useState<SummaryReport | null>(null);
  const [monthly, setMonthly] = useState<MonthlyReport | null>(null);
  const [upcoming, setUpcoming] = useState<UpcomingReport | null>(null);
  const [subTotals, setSubTotals] = useState<SubscriptionTotalsReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { from, to } = currentMonthRange();
      const year = Number(
        new Intl.DateTimeFormat('en-US', { timeZone: ACC_DISPLAY_TIMEZONE, year: 'numeric' }).format(new Date())
      );

      const [summaryRes, monthlyRes, upcomingRes, subsRes] = await Promise.all([
        reportsApi.summary({ from, to }),
        reportsApi.monthly(year),
        reportsApi.upcoming(30),
        reportsApi.subscriptionTotals(),
      ]);

      setMonthSummary(summaryRes);
      setMonthly(monthlyRes);
      setUpcoming(upcomingRes);
      setSubTotals(subsRes);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load the overview';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const chartData = (monthly?.months ?? []).map((m) => ({
    label: m.label,
    Income: m.incomeCents / 100,
    Expense: m.expenseCents / 100,
  }));

  const expenseByCategory = (monthSummary?.byCategory ?? [])
    .filter((c) => c.type === 'expense' && c.totalCents > 0)
    .map((c, i) => ({
      name: c.name,
      value: c.totalCents / 100,
      cents: c.totalCents,
      fill: c.color ?? PIE_COLORS[i % PIE_COLORS.length],
    }));

  const upcomingRows: Rows = [
    ...(upcoming?.domains ?? []).map((item) => ({ kind: 'Domain' as const, item })),
    ...(upcoming?.hostings ?? []).map((item) => ({ kind: 'Hosting' as const, item })),
    ...(upcoming?.subscriptions ?? []).map((item) => ({ kind: 'Subscription' as const, item })),
  ].sort((a, b) => a.item.daysRemaining - b.item.daysRemaining);

  return (
    <div className="space-y-6">
      <PageHeader title="Accounting" description={`Money in and out — all figures in USD, ${ACC_DISPLAY_TIMEZONE.replace('_', ' ')}`}>
        <Button variant="outline" size="sm" onClick={() => void load()} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </PageHeader>

      {error && !loading && (
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="pt-5 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Could not load the overview</p>
              <p className="text-xs text-red-600 mt-1">{error}</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => void load()}>
                Try again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── This month ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
        <StatCard
          label="Income this month"
          value={formatUSD(monthSummary?.totalIncomeCents ?? 0)}
          sub={`${monthSummary?.transactionCount ?? 0} transactions`}
          icon={TrendingUp}
          color="text-emerald-600"
          bg="bg-emerald-100"
          href="/admin/accounting/transactions?type=in"
          loading={loading}
        />
        <StatCard
          label="Expense this month"
          value={formatUSD(monthSummary?.totalExpenseCents ?? 0)}
          sub="Paid out"
          icon={TrendingDown}
          color="text-red-600"
          bg="bg-red-100"
          href="/admin/accounting/transactions?type=out"
          loading={loading}
        />
        <StatCard
          label="Net profit"
          value={formatUSD(monthSummary?.netProfitCents ?? 0)}
          sub={(monthSummary?.netProfitCents ?? 0) < 0 ? 'Running at a loss' : 'Income minus expense'}
          icon={Wallet}
          color={(monthSummary?.netProfitCents ?? 0) < 0 ? 'text-red-600' : 'text-primary'}
          bg={(monthSummary?.netProfitCents ?? 0) < 0 ? 'bg-red-100' : 'bg-primary/10'}
          loading={loading}
        />
        <StatCard
          label="Subscriptions / month"
          value={formatUSD(subTotals?.monthlyEquivalentCents ?? 0)}
          sub={`${subTotals?.activeCount ?? 0} active · ${formatUSD(subTotals?.yearlyTotalCents ?? 0)}/yr`}
          icon={Repeat}
          color="text-violet-600"
          bg="bg-violet-100"
          href="/admin/accounting/subscriptions"
          loading={loading}
        />
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="border-border/60 shadow-sm lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Income vs expense — {monthly?.year ?? ''}</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[280px] w-full" />
            ) : (
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      fontSize={12}
                      width={70}
                      tickFormatter={(v: number) => compactUsd(v)}
                    />
                    <Tooltip
                      formatter={(value: number, name) => [formatUSD(Math.round(value * 100)), name]}
                      contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #e2e8f0' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="Income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={28} />
                    <Bar dataKey="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Expense by category</CardTitle>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[280px] w-full" />
            ) : expenseByCategory.length === 0 ? (
              <div className="h-[280px] flex flex-col items-center justify-center text-center">
                <TrendingDown className="h-8 w-8 text-muted-foreground/30 mb-3" />
                <p className="text-sm font-medium">No expenses this month</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Logged expenses will break down here.
                </p>
              </div>
            ) : (
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseByCategory}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={90}
                      paddingAngle={2}
                    >
                      {expenseByCategory.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name) => [formatUSD(Math.round(value * 100)), name]}
                      contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #e2e8f0' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── Upcoming renewals ── */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">Upcoming in 30 days</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Domains, hosting and subscriptions due to renew
            </p>
          </div>
          {upcomingRows.length > 0 && (
            <Badge variant="secondary">{upcomingRows.length}</Badge>
          )}
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">Client</TableHead>
                  <TableHead>Renews</TableHead>
                  <TableHead>Days left</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 6 }).map((__, c) => (
                        <TableCell key={c}><Skeleton className="h-4 w-20" /></TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : upcomingRows.length === 0 ? (
                  <TableEmptyRow
                    cols={6}
                    message="Nothing renewing in the next 30 days"
                    hint="Domains, hosting plans and subscriptions appear here as their renewal date approaches."
                  />
                ) : (
                  upcomingRows.map(({ kind, item }) => (
                    <TableRow key={`${kind}-${item._id}`} className={rowTone(item.daysRemaining)}>
                      <TableCell className="font-medium">{item.label}</TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">{kind}</TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {item.clientName ?? 'Agency'}
                      </TableCell>
                      <TableCell><DateCell value={item.date} /></TableCell>
                      <TableCell><DaysLeftBadge days={item.daysRemaining} /></TableCell>
                      <TableCell className="text-right"><Money cents={item.costCents} /></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* ── Overdue invoices ── */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">Overdue invoices</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Sent and past the due date</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/accounting/invoices">
              All invoices <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead className="hidden md:table-cell">Client</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Overdue</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 2 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 6 }).map((__, c) => (
                        <TableCell key={c}><Skeleton className="h-4 w-20" /></TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (upcoming?.overdueInvoices.length ?? 0) === 0 ? (
                  <TableEmptyRow
                    cols={6}
                    message="No overdue invoices"
                    hint="Everything sent is either paid or still within its due date."
                  />
                ) : (
                  upcoming!.overdueInvoices.map((inv) => (
                    <TableRow key={inv._id} className="bg-red-50/40">
                      <TableCell className="font-medium">
                        {inv.invoiceNumber}
                        {inv.title && (
                          <span className="block text-xs text-muted-foreground font-normal">{inv.title}</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {inv.clientName ?? '—'}
                      </TableCell>
                      <TableCell><DateCell value={inv.dueDate} /></TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-red-100 text-red-700">
                          {inv.daysOverdue}d
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <InvoiceStatusBadge status={inv.status} />
                      </TableCell>
                      <TableCell className="text-right"><Money cents={inv.amountCents} /></TableCell>
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

/** Red inside a week, amber inside a fortnight — matching DaysLeftBadge. */
function rowTone(days: number): string {
  if (days <= 7) return 'bg-red-50/40';
  if (days <= 15) return 'bg-amber-50/40';
  return '';
}

/** `$1.2k` on the Y axis, so long tick labels do not squeeze the plot. */
function compactUsd(dollars: number): string {
  if (Math.abs(dollars) >= 1000) return `$${(dollars / 1000).toFixed(1)}k`;
  return `$${dollars}`;
}

/** First and last day of the current month, in the display timezone. */
function currentMonthRange(): { from: string; to: string } {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: ACC_DISPLAY_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  const [year, month] = parts.split('-').map(Number);
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const mm = String(month).padStart(2, '0');

  return { from: `${year}-${mm}-01`, to: `${year}-${mm}-${String(lastDay).padStart(2, '0')}` };
}

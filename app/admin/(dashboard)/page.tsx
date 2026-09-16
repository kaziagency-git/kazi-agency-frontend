'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Briefcase, Users, Eye, UserCheck, ArrowRight, Users2, TicketCheck,
  ClipboardList, Plus, Hash,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchJobs } from '@/store/slices/jobsSlice';
import { fetchApplicationStats } from '@/store/slices/applicationsSlice';
import { fetchClientStats } from '@/store/slices/clientsSlice';
import { fetchAdminTickets, fetchTicketStats } from '@/store/slices/ticketsSlice';
import { adminListOnboardingForms } from '@/lib/client-api';

const statusDot: Record<string, string> = {
  open: 'bg-blue-500',
  'in-progress': 'bg-amber-500',
  resolved: 'bg-emerald-500',
  closed: 'bg-gray-400',
};

interface StatCard {
  label: string;
  value: number;
  sub: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  href: string;
}

function StatGrid({ cards, loading }: { cards: StatCard[]; loading: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card) => (
        <Link key={card.label} href={card.href} className="group">
          <Card className="border-border/60 shadow-sm h-full transition-colors group-hover:border-primary/40">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
              <div className={`rounded-lg p-2 ${card.bg}`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <p className="text-3xl font-bold">{card.value}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default function AdminDashboardPage() {
  const dispatch = useAppDispatch();

  const { items: jobs, status: jobsStatus } = useAppSelector((s) => s.jobs);
  const { stats: appStats, statsStatus: appStatsStatus } = useAppSelector((s) => s.applications);
  const { stats: clientStats, statsStatus: clientStatsStatus } = useAppSelector((s) => s.clients);
  const { items: tickets, stats: ticketStats, status: ticketsStatus } = useAppSelector((s) => s.tickets);

  const [formCount, setFormCount] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchApplicationStats());
    dispatch(fetchClientStats());
    dispatch(fetchTicketStats());
    dispatch(fetchAdminTickets(undefined));

    // No Redux slice for pre-launch forms — the list endpoint reports the
    // total, so ask for a single row and read the count off it.
    let cancelled = false;
    adminListOnboardingForms({ page: 1, limit: 1 })
      .then((res) => { if (!cancelled) setFormCount(res.total); })
      .catch(() => { if (!cancelled) setFormCount(0); });
    return () => { cancelled = true; };
  }, [dispatch]);

  const recruitmentLoading =
    jobsStatus === 'idle' || jobsStatus === 'loading' ||
    appStatsStatus === 'idle' || appStatsStatus === 'loading';

  const deliveryLoading =
    clientStatsStatus === 'idle' || clientStatsStatus === 'loading' ||
    !ticketStats || formCount === null;

  const ticketsLoading = ticketsStatus === 'idle' || ticketsStatus === 'loading';
  const publishedCount = jobs.filter((j) => j.isPublished).length;

  const deliveryCards: StatCard[] = [
    {
      label: 'Clients',
      value: clientStats?.total ?? 0,
      sub: `${clientStats?.active ?? 0} active · ${clientStats?.pending ?? 0} pending`,
      icon: Users2,
      color: 'text-primary',
      bg: 'bg-primary/10',
      href: '/admin/clients',
    },
    {
      label: 'Open Tickets',
      value: ticketStats?.open ?? 0,
      sub: `${ticketStats?.inProgress ?? 0} in progress`,
      icon: TicketCheck,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      href: '/admin/tickets',
    },
    {
      label: 'Resolved Tickets',
      value: ticketStats?.resolved ?? 0,
      sub: `${ticketStats?.closed ?? 0} closed · ${ticketStats?.total ?? 0} total`,
      icon: UserCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      href: '/admin/tickets',
    },
    {
      label: 'Pre-Launch Forms',
      value: formCount ?? 0,
      sub: 'shared with clients',
      icon: ClipboardList,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      href: '/admin/pre-launch-form',
    },
  ];

  const recruitmentCards: StatCard[] = [
    {
      label: 'Total Jobs',
      value: jobs.length,
      sub: `${publishedCount} published`,
      icon: Briefcase,
      color: 'text-primary',
      bg: 'bg-primary/10',
      href: '/admin/jobs',
    },
    {
      label: 'Total Applications',
      value: appStats?.total ?? 0,
      sub: `${appStats?.new ?? 0} new`,
      icon: Users,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      href: '/admin/applications',
    },
    {
      label: 'Under Review',
      value: (appStats?.reviewed ?? 0) + (appStats?.shortlisted ?? 0),
      sub: `${appStats?.shortlisted ?? 0} shortlisted`,
      icon: Eye,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      href: '/admin/applications',
    },
    {
      label: 'Hired',
      value: appStats?.hired ?? 0,
      sub: `${appStats?.rejected ?? 0} rejected`,
      icon: UserCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      href: '/admin/applications',
    },
  ];

  const recentTickets = [...tickets]
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
    .slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Overview of clients, support and recruitment
        </p>
      </div>

      {/* Clients & delivery */}
      <section className="space-y-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Clients &amp; Delivery
        </h2>
        <StatGrid cards={deliveryCards} loading={deliveryLoading} />
      </section>

      {/* Recruitment */}
      <section className="space-y-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Recruitment
        </h2>
        <StatGrid cards={recruitmentCards} loading={recruitmentLoading} />
      </section>

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent tickets */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Recent Tickets</CardTitle>
            <Button asChild size="sm" variant="outline">
              <Link href="/admin/tickets">
                View all <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {ticketsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : recentTickets.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-6">
                No support tickets yet.
              </p>
            ) : (
              <div className="divide-y divide-border/60">
                {recentTickets.map((t) => (
                  <Link
                    key={t._id}
                    href={`/admin/tickets/${t._id}`}
                    className="group flex items-center justify-between gap-3 py-3"
                  >
                    <div className="flex items-start gap-2 min-w-0">
                      <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${statusDot[t.status]}`} />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                          {t.subject}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {t.clientName} · {t.category}
                        </p>
                      </div>
                    </div>
                    {t.ticketNumber && (
                      <span className="inline-flex items-center gap-0.5 rounded-md bg-primary/10 px-1.5 py-0.5 text-[11px] font-mono font-bold text-primary shrink-0">
                        <Hash className="h-2.5 w-2.5" />{t.ticketNumber}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent jobs */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Recent Job Posts</CardTitle>
            <Button asChild size="sm" variant="outline">
              <Link href="/admin/jobs">
                View all <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recruitmentLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : jobs.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-6">
                No jobs yet.{' '}
                <Link href="/admin/jobs/new" className="text-primary hover:underline">
                  Create your first job post.
                </Link>
              </p>
            ) : (
              <div className="divide-y divide-border/60">
                {jobs.slice(0, 5).map((job) => (
                  <div key={job._id} className="flex items-center justify-between gap-3 py-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{job.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {job.department} · {job.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={job.isPublished ? 'default' : 'secondary'} className="text-xs">
                        {job.isPublished ? 'Published' : 'Draft'}
                      </Badge>
                      <Button asChild size="sm" variant="ghost" className="h-7 px-2 text-xs">
                        <Link href={`/admin/jobs/${job._id}`}>Edit</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button asChild size="lg" className="h-14 text-sm font-semibold justify-start gap-3 px-6">
          <Link href="/admin/clients/new">
            <Plus className="h-5 w-5" />
            Add a Client
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-14 text-sm font-semibold justify-start gap-3 px-6 border-primary/30 hover:bg-primary/5"
        >
          <Link href="/admin/pre-launch-form">
            <ClipboardList className="h-5 w-5 text-primary" />
            Pre-Launch Forms
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-14 text-sm font-semibold justify-start gap-3 px-6 border-primary/30 hover:bg-primary/5"
        >
          <Link href="/admin/jobs/new">
            <Briefcase className="h-5 w-5 text-primary" />
            Post a New Job
          </Link>
        </Button>
      </div>
    </div>
  );
}

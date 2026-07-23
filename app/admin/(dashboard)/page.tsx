'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, Users, Eye, UserCheck, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchJobs } from '@/store/slices/jobsSlice';
import { fetchApplicationStats } from '@/store/slices/applicationsSlice';

export default function AdminDashboardPage() {
  const dispatch = useAppDispatch();
  const { items: jobs, status: jobsStatus } = useAppSelector((s) => s.jobs);
  const { stats, statsStatus } = useAppSelector((s) => s.applications);
  const loading = jobsStatus === 'idle' || jobsStatus === 'loading' || statsStatus === 'idle' || statsStatus === 'loading';

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchApplicationStats());
  }, [dispatch]);

  const publishedCount = jobs.filter((j) => j.isPublished).length;

  const statCards = [
    {
      label: 'Total Jobs',
      value: jobs.length,
      sub: `${publishedCount} published`,
      icon: Briefcase,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Total Applications',
      value: stats?.total ?? 0,
      sub: `${stats?.new ?? 0} new`,
      icon: Users,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
    },
    {
      label: 'Under Review',
      value: (stats?.reviewed ?? 0) + (stats?.shortlisted ?? 0),
      sub: `${stats?.shortlisted ?? 0} shortlisted`,
      icon: Eye,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Hired',
      value: stats?.hired ?? 0,
      sub: `${stats?.rejected ?? 0} rejected`,
      icon: UserCheck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of jobs and applications</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <Card key={card.label} className="border-border/60 shadow-sm">
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
        ))}
      </div>

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
          {loading ? (
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
                    <Badge
                      variant={job.isPublished ? 'default' : 'secondary'}
                      className="text-xs"
                    >
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

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button asChild size="lg" className="h-14 text-sm font-semibold justify-start gap-3 px-6">
          <Link href="/admin/jobs/new">
            <Briefcase className="h-5 w-5" />
            Post a New Job
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="h-14 text-sm font-semibold justify-start gap-3 px-6 border-primary/30 hover:bg-primary/5"
        >
          <Link href="/admin/applications">
            <Users className="h-5 w-5 text-primary" />
            View All Applications
          </Link>
        </Button>
      </div>
    </div>
  );
}

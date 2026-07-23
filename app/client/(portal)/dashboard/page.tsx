'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TicketCheck, Layers, CheckCircle2, Clock, ArrowRight, User, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { getMyProfile, getMyTickets, ClientProfile, Ticket } from '@/lib/client-api';
import { toast } from 'sonner';

const statusColor: Record<string, string> = {
  open: 'bg-blue-100 text-blue-700',
  'in-progress': 'bg-amber-100 text-amber-700',
  resolved: 'bg-emerald-100 text-emerald-700',
  closed: 'bg-gray-100 text-gray-600',
};

const serviceStatusDot: Record<string, string> = {
  'not-started': 'bg-gray-400',
  'in-progress': 'bg-amber-400',
  completed: 'bg-emerald-500',
};

export default function ClientDashboardPage() {
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMyProfile(), getMyTickets()])
      .then(([p, t]) => { setProfile(p); setTickets(t); })
      .catch(() => toast.error('Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  const openTickets = tickets.filter((t) => t.status === 'open' || t.status === 'in-progress');

  const totalMilestones = profile?.serviceProjects.reduce((sum, sp) => sum + sp.milestones.length, 0) ?? 0;
  const completedMilestones = profile?.serviceProjects.reduce(
    (sum, sp) => sum + sp.milestones.filter((m) => m.status === 'completed').length, 0
  ) ?? 0;
  const avgProgress = profile?.serviceProjects.length
    ? Math.round(profile.serviceProjects.reduce((sum, sp) => sum + sp.progress, 0) / profile.serviceProjects.length)
    : 0;
  const activeServices = profile?.serviceProjects.filter((sp) => sp.status !== 'not-started').length ?? 0;

  // Flatten all milestones across services for "recent" display
  const allMilestones = profile?.serviceProjects.flatMap((sp) =>
    sp.milestones.map((ms) => ({ ...ms, serviceName: sp.serviceName }))
  ) ?? [];

  return (
    <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8">
      {/* Header */}
      <div>
        {loading ? <Skeleton className="h-8 w-48" /> : (
          <>
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight">
              Welcome back{profile?.name ? `, ${profile.name.split(' ')[0]}` : ''}!
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {profile?.company ? `${profile.company} · ` : ''}Here's your project overview
            </p>
          </>
        )}
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Progress</CardTitle>
            <div className="rounded-lg p-2 bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-8 w-16" /> : (
              <>
                <p className="text-3xl font-bold">{avgProgress}%</p>
                <Progress value={avgProgress} className="mt-2 h-1.5" />
                <p className="text-xs text-muted-foreground mt-1">
                  {activeServices} active service{activeServices !== 1 ? 's' : ''}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Milestones</CardTitle>
            <div className="rounded-lg p-2 bg-emerald-50">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-8 w-16" /> : (
              <>
                <p className="text-3xl font-bold">{completedMilestones}/{totalMilestones}</p>
                <p className="text-xs text-muted-foreground mt-1">Completed across all services</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Tickets</CardTitle>
            <div className="rounded-lg p-2 bg-amber-50">
              <TicketCheck className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-8 w-16" /> : (
              <>
                <p className="text-3xl font-bold">{openTickets.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Awaiting response</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Services overview */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Layers className="h-4 w-4 text-muted-foreground" />
              My Services
            </CardTitle>
            <Button asChild size="sm" variant="outline">
              <Link href="/client/my-project">
                View all <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-14 w-full" />)}</div>
            ) : profile?.serviceProjects.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No services set up yet</p>
            ) : (
              <div className="divide-y divide-border/60">
                {profile!.serviceProjects.map((sp) => (
                  <div key={sp._id} className="py-3 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full shrink-0 ${serviceStatusDot[sp.status]}`} />
                      <p className="text-sm font-medium flex-1 truncate">{sp.serviceName}</p>
                      <span className="text-xs font-semibold text-muted-foreground shrink-0">{sp.progress}%</span>
                    </div>
                    <Progress value={sp.progress} className="h-1.5" />
                    {sp.currentPhase && (
                      <p className="text-xs text-muted-foreground pl-4">{sp.currentPhase}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent milestones */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Recent Milestones</CardTitle>
            <Button asChild size="sm" variant="outline">
              <Link href="/client/my-project">
                View all <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
            ) : allMilestones.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No milestones yet</p>
            ) : (
              <div className="divide-y divide-border/60">
                {allMilestones.slice(0, 5).map((ms) => (
                  <div key={ms._id} className="flex items-center gap-3 py-2.5">
                    <Clock className={`h-4 w-4 shrink-0 ${ms.status === 'completed' ? 'text-emerald-500' : ms.status === 'in-progress' ? 'text-amber-500' : 'text-muted-foreground'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{ms.title}</p>
                      <p className="text-xs text-muted-foreground">{ms.serviceName}</p>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0 capitalize">{ms.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent tickets */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Recent Tickets</CardTitle>
          <Button asChild size="sm" variant="outline">
            <Link href="/client/support">View all <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link>
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">{[1, 2].map((i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-4 space-y-2">
              <p className="text-sm text-muted-foreground">No support tickets yet</p>
              <Button asChild size="sm"><Link href="/client/support/new">Open a ticket</Link></Button>
            </div>
          ) : (
            <div className="divide-y divide-border/60">
              {tickets.slice(0, 3).map((t) => (
                <Link key={t._id} href={`/client/support/${t._id}`}
                  className="flex items-start gap-3 py-3 hover:bg-muted/30 -mx-2 px-2 rounded transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{t.subject}</p>
                    <p className="text-xs text-muted-foreground">{t.category}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${statusColor[t.status]}`}>
                    {t.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account info */}
      {profile && (
        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <User className="h-4 w-4" /> Account Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Name</p>
                <p className="font-medium">{profile.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Email</p>
                <p className="font-medium truncate">{profile.email}</p>
              </div>
              {profile.company && (
                <div>
                  <p className="text-muted-foreground text-xs mb-0.5">Company</p>
                  <p className="font-medium">{profile.company}</p>
                </div>
              )}
              {profile.accountManager && (
                <div>
                  <p className="text-muted-foreground text-xs mb-0.5">Account Manager</p>
                  <p className="font-medium">{profile.accountManager}</p>
                </div>
              )}
            </div>
            {profile.services.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {profile.services.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

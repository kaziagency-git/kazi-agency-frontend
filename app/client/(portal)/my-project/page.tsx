'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, Circle, Loader2, Clock, CalendarDays, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { getMyProfile, ClientProfile, ServiceProject } from '@/lib/client-api';
import { toast } from 'sonner';

const statusStyles: Record<string, string> = {
  'not-started': 'bg-gray-100 text-gray-600',
  'in-progress': 'bg-amber-100 text-amber-700',
  completed: 'bg-emerald-100 text-emerald-700',
};

const statusLabel: Record<string, string> = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

const msIcon: Record<string, React.ReactNode> = {
  completed: <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />,
  'in-progress': <Loader2 className="h-5 w-5 text-amber-500 animate-spin shrink-0" />,
  pending: <Circle className="h-5 w-5 text-muted-foreground shrink-0" />,
};

const msBadge: Record<string, string> = {
  completed: 'bg-emerald-100 text-emerald-700',
  'in-progress': 'bg-amber-100 text-amber-700',
  pending: 'bg-gray-100 text-gray-600',
};

function ServiceCard({ sp }: { sp: ServiceProject }) {
  const [open, setOpen] = useState(sp.status === 'in-progress');
  const completed = sp.milestones.filter((m) => m.status === 'completed').length;

  return (
    <Card className="border-border/60 shadow-sm overflow-hidden">
      {/* Header row */}
      <button
        type="button"
        className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-muted/30 transition-colors"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm">{sp.serviceName}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusStyles[sp.status]}`}>
              {statusLabel[sp.status]}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={sp.progress} className="h-2 w-40 sm:w-64" />
            <span className="text-sm font-semibold">{sp.progress}%</span>
            {sp.milestones.length > 0 && (
              <span className="text-xs text-muted-foreground">{completed}/{sp.milestones.length} milestones</span>
            )}
          </div>
          {sp.currentPhase && (
            <p className="text-xs text-muted-foreground">Phase: {sp.currentPhase}</p>
          )}
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {/* Expanded body */}
      {open && (
        <div className="border-t border-border/60">
          {/* Milestones */}
          {sp.milestones.length > 0 && (
            <div className="px-5 py-4 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Milestones</p>
              {sp.milestones.map((ms, idx) => (
                <div key={ms._id} className="flex items-start gap-3 py-2.5 px-3 rounded-lg hover:bg-muted/40 transition-colors">
                  <div className="mt-0.5">{msIcon[ms.status]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium">{ms.title}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${msBadge[ms.status]}`}>
                        {ms.status}
                      </span>
                    </div>
                    {ms.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">{ms.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      {ms.dueDate && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Due {new Date(ms.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                      {ms.completedAt && (
                        <span className="text-emerald-600">
                          Completed {new Date(ms.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">#{idx + 1}</span>
                </div>
              ))}
            </div>
          )}

          {sp.milestones.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-6">
              No milestones have been added yet. Your account manager will update this soon.
            </p>
          )}

          {/* Notes from team */}
          {sp.notes && (
            <div className="px-5 pb-4 pt-1 border-t border-border/40">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Notes from Your Team</p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{sp.notes}</p>
            </div>
          )}

          {/* Start date */}
          {sp.startDate && (
            <div className="px-5 pb-4 flex items-center gap-1.5 text-xs text-muted-foreground border-t border-border/40 pt-3">
              <CalendarDays className="h-3.5 w-3.5" />
              Started {new Date(sp.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default function MyProjectPage() {
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyProfile()
      .then(setProfile)
      .catch(() => toast.error('Failed to load project info'))
      .finally(() => setLoading(false));
  }, []);

  const totalMilestones = profile?.serviceProjects.reduce((sum, sp) => sum + sp.milestones.length, 0) ?? 0;
  const completedMilestones = profile?.serviceProjects.reduce(
    (sum, sp) => sum + sp.milestones.filter((m) => m.status === 'completed').length, 0
  ) ?? 0;
  const activeServices = profile?.serviceProjects.filter((sp) => sp.status !== 'not-started').length ?? 0;
  const avgProgress = profile?.serviceProjects.length
    ? Math.round(profile.serviceProjects.reduce((sum, sp) => sum + sp.progress, 0) / profile.serviceProjects.length)
    : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight">My Services</h1>
        <p className="text-muted-foreground text-sm mt-1">Track the progress of each service we're delivering for you</p>
      </div>

      {/* Summary strip */}
      {!loading && profile && profile.serviceProjects.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-border/60 shadow-sm">
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-2xl font-bold">{activeServices}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Active Services</p>
            </CardContent>
          </Card>
          <Card className="border-border/60 shadow-sm">
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-2xl font-bold">{completedMilestones}/{totalMilestones}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Milestones Done</p>
            </CardContent>
          </Card>
          <Card className="border-border/60 shadow-sm">
            <CardContent className="pt-4 pb-4 text-center">
              <p className="text-2xl font-bold">{avgProgress}%</p>
              <p className="text-xs text-muted-foreground mt-0.5">Avg. Progress</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Service cards */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
      ) : profile?.serviceProjects.length === 0 ? (
        <Card className="border-border/60 shadow-sm">
          <CardContent className="py-16 text-center">
            <p className="text-sm text-muted-foreground">
              No services have been set up yet. Your account manager will update this soon.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {profile!.serviceProjects.map((sp) => (
            <ServiceCard key={sp._id} sp={sp} />
          ))}
        </div>
      )}
    </div>
  );
}

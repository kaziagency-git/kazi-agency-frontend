'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  ArrowLeft, Mail, Phone, Briefcase, Clock, FileText,
  ExternalLink, Loader2, Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { getApplication, type Application } from '@/lib/admin-api';
import { useAppDispatch } from '@/store/hooks';
import { setApplicationStatus, saveApplicationNotes } from '@/store/slices/applicationsSlice';

const statusConfig: Record<string, { label: string; className: string }> = {
  new: { label: 'New', className: 'bg-primary/10 text-primary border-primary/20' },
  reviewed: { label: 'Reviewed', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  shortlisted: { label: 'Shortlisted', className: 'bg-violet-50 text-violet-700 border-violet-200' },
  rejected: { label: 'Rejected', className: 'bg-red-50 text-red-600 border-red-200' },
  hired: { label: 'Hired', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

function DetailRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 rounded-md bg-muted p-1.5">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [app, setApp] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<Application['status']>('new');
  const [notes, setNotes] = useState('');
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    getApplication(id)
      .then((data) => {
        setApp(data);
        setStatus(data.status);
        setNotes(data.adminNotes ?? '');
      })
      .catch(() => toast.error('Application not found'))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleStatusChange(val: string) {
    const newStatus = val as Application['status'];
    setStatus(newStatus);
    setSavingStatus(true);
    try {
      const result = await dispatch(setApplicationStatus({ id, status: newStatus }));
      if (setApplicationStatus.fulfilled.match(result)) {
        setApp(result.payload);
        toast.success('Status updated');
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Failed to update status');
      setStatus(app?.status ?? 'new');
    } finally {
      setSavingStatus(false);
    }
  }

  async function handleSaveNotes() {
    setSavingNotes(true);
    try {
      const result = await dispatch(saveApplicationNotes({ id, notes }));
      if (saveApplicationNotes.fulfilled.match(result)) {
        setApp(result.payload);
        toast.success('Notes saved');
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Failed to save notes');
    } finally {
      setSavingNotes(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-8 w-32" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-48 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive font-medium">Application not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => router.back()}>Go back</Button>
      </div>
    );
  }

  const cfg = statusConfig[app.status];

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="h-8 w-8 shrink-0 mt-0.5">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight truncate">{app.fullName}</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Applied for <span className="font-medium text-foreground">{app.jobTitle}</span>
            <span className="hidden sm:inline"> · {formatDate(app.createdAt)}</span>
          </p>
        </div>
        <span className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium border ${cfg.className}`}>
          {cfg.label}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — main info */}
        <div className="lg:col-span-2 space-y-5">
          {/* Contact details */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DetailRow icon={Mail} label="Email" value={app.email} />
              <DetailRow icon={Phone} label="Phone" value={app.phone} />
              <DetailRow icon={Briefcase} label="Role Applied" value={app.roleApplied} />
              <DetailRow icon={Clock} label="Experience" value={`${app.experienceYears} years`} />
              <DetailRow
                icon={Clock}
                label="Available Immediately"
                value={app.availableImmediately === 'yes' ? 'Yes' : 'No'}
              />
            </CardContent>
          </Card>

          {/* Resume */}
          {(app.resumeFileName || app.resumeUrl) && (
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Resume</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {app.resumeFileName && (
                  <div className="flex items-center gap-3 rounded-lg border border-border/60 p-3">
                    <div className="rounded-md bg-primary/10 p-2">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium flex-1 truncate">{app.resumeFileName}</span>
                  </div>
                )}
                {app.resumeUrl && (
                  <Button asChild variant="outline" size="sm" className="gap-2">
                    <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3.5 w-3.5" /> Open Resume Link
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Admin notes */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Admin Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add private notes about this candidate…"
                rows={4}
              />
              <Button
                size="sm"
                onClick={handleSaveNotes}
                disabled={savingNotes}
                className="gap-2"
              >
                {savingNotes ? (
                  <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…</>
                ) : (
                  <><Save className="h-3.5 w-3.5" /> Save Notes</>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right — status panel */}
        <div className="space-y-5">
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Update Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={status} onValueChange={handleStatusChange} disabled={savingStatus}>
                <SelectTrigger>
                  {savingStatus ? (
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Updating…
                    </span>
                  ) : (
                    <SelectValue />
                  )}
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(statusConfig) as Application['status'][]).map((s) => (
                    <SelectItem key={s} value={s}>{statusConfig[s].label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Job</span>
                <span className="font-medium text-right max-w-[140px] truncate">{app.jobTitle}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Experience</span>
                <span className="font-medium">{app.experienceYears} yrs</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Available now</span>
                <span className="font-medium">{app.availableImmediately === 'yes' ? 'Yes' : 'No'}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Applied</span>
                <span className="font-medium">{new Date(app.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

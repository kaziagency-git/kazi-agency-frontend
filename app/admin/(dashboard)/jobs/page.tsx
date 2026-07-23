'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  Plus, Pencil, Trash2, Eye, EyeOff, Loader2,
  MapPin, Building2, MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchJobs, toggleJobPublish, deleteJobById } from '@/store/slices/jobsSlice';
import type { Job } from '@/lib/admin-api';

const levelColor: Record<string, string> = {
  'Entry-Level': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Mid-Level': 'bg-blue-50 text-blue-700 border-blue-200',
  Senior: 'bg-violet-50 text-violet-700 border-violet-200',
  Lead: 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function AdminJobsPage() {
  const dispatch = useAppDispatch();
  const { items: jobs, status, togglingIds } = useAppSelector((s) => s.jobs);
  const loading = status === 'loading' || status === 'idle';

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  async function handleTogglePublish(job: Job) {
    const result = await dispatch(toggleJobPublish({ id: job._id, isPublished: !job.isPublished }));
    if (toggleJobPublish.fulfilled.match(result)) {
      toast.success(result.payload.isPublished ? 'Job published' : 'Job unpublished');
    } else {
      toast.error('Failed to update job');
    }
  }

  async function handleDelete(id: string) {
    const result = await dispatch(deleteJobById(id));
    if (deleteJobById.fulfilled.match(result)) {
      toast.success('Job deleted');
    } else {
      toast.error('Failed to delete job');
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight">Job Posts</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {loading ? '—' : `${jobs.length} total · ${jobs.filter(j => j.isPublished).length} published`}
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/admin/jobs/new">
            <Plus className="mr-2 h-4 w-4" /> New Job
          </Link>
        </Button>
      </div>

      {/* Table card */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-0">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            All positions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
            </div>
          ) : jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Building2 className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium">No job posts yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Create your first job to start receiving applications.
              </p>
              <Button asChild className="mt-4" size="sm">
                <Link href="/admin/jobs/new"><Plus className="mr-1.5 h-4 w-4" /> Create Job</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="flex items-center gap-4 rounded-xl border border-border/60 bg-card p-4 hover:border-primary/30 transition-colors"
                >
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm truncate">{job.title}</span>
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${levelColor[job.level] ?? 'bg-gray-50 text-gray-700 border-gray-200'}`}
                      >
                        {job.level}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-200">
                        {job.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />{job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />{job.location}
                      </span>
                    </div>
                  </div>

                  {/* Publish toggle */}
                  <div className="flex items-center gap-2 shrink-0">
                    {togglingIds.includes(job._id) ? (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    ) : (
                      <>
                        <span className="text-xs text-muted-foreground">
                          {job.isPublished ? 'Live' : 'Draft'}
                        </span>
                        <Switch
                          checked={job.isPublished}
                          onCheckedChange={() => handleTogglePublish(job)}
                          aria-label="Toggle publish"
                        />
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/jobs/${job._id}`}>
                          <Pencil className="mr-2 h-3.5 w-3.5" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTogglePublish(job)}>
                        {job.isPublished ? (
                          <><EyeOff className="mr-2 h-3.5 w-3.5" /> Unpublish</>
                        ) : (
                          <><Eye className="mr-2 h-3.5 w-3.5" /> Publish</>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onSelect={(e) => e.preventDefault()}
                          >
                            <Trash2 className="mr-2 h-3.5 w-3.5" /> Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete "{job.title}"?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove the job post. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive hover:bg-destructive/90"
                              onClick={() => handleDelete(job._id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

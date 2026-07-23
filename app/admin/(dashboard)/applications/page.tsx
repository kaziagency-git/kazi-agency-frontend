'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Users, Search, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchApplications,
  setSearch,
  setStatusFilter,
} from '@/store/slices/applicationsSlice';
import type { Application } from '@/lib/admin-api';

const STATUS_OPTIONS = ['all', 'new', 'reviewed', 'shortlisted', 'rejected', 'hired'] as const;

const statusConfig: Record<string, { label: string; className: string }> = {
  new:        { label: 'New',         className: 'bg-primary/10 text-primary border-primary/20' },
  reviewed:   { label: 'Reviewed',    className: 'bg-amber-50 text-amber-700 border-amber-200' },
  shortlisted:{ label: 'Shortlisted', className: 'bg-violet-50 text-violet-700 border-violet-200' },
  rejected:   { label: 'Rejected',    className: 'bg-red-50 text-red-600 border-red-200' },
  hired:      { label: 'Hired',       className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

function StatusBadge({ status }: { status: Application['status'] }) {
  const cfg = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function AdminApplicationsPage() {
  const dispatch = useAppDispatch();
  const { items: applications, status, search, statusFilter } = useAppSelector((s) => s.applications);
  const loading = status === 'loading' || status === 'idle';

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchApplications()).unwrap().catch(() => toast.error('Failed to load applications'));
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch, search, statusFilter]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight">Apply List</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {loading ? '—' : `${applications.length} application${applications.length !== 1 ? 's' : ''}`}
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by name, email or role…"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => dispatch(setStatusFilter(v))}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s === 'all' ? 'All statuses' : statusConfig[s].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status chips */}
      <div className="flex gap-2 flex-wrap">
        {(Object.keys(statusConfig) as Application['status'][]).map((s) => {
          const count = applications.filter((a) => a.status === s).length;
          const cfg = statusConfig[s];
          return (
            <button
              key={s}
              onClick={() => dispatch(setStatusFilter(statusFilter === s ? 'all' : s))}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-opacity
                ${cfg.className}
                ${statusFilter !== 'all' && statusFilter !== s ? 'opacity-40' : 'opacity-100'}`}
            >
              {cfg.label}
              <span className="font-bold">{loading ? '…' : count}</span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border/60 bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/40">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">#</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Candidate</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Email</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Phone</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Role Applied</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Job Title</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Experience</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Available</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">Applied</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border/40 last:border-0">
                    {Array.from({ length: 11 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <Skeleton className="h-4 w-full rounded" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Users className="h-8 w-8 opacity-30" />
                      <p className="text-sm font-medium text-foreground">No applications found</p>
                      <p className="text-xs">
                        {statusFilter !== 'all' || search
                          ? 'Try adjusting your search or filter.'
                          : 'Applications will appear here once candidates apply.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                applications.map((app, idx) => (
                  <tr
                    key={app._id}
                    className="border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    {/* # */}
                    <td className="px-4 py-3 text-muted-foreground text-xs">{idx + 1}</td>

                    {/* Candidate */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5 min-w-[140px]">
                        <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-semibold text-primary">
                            {app.fullName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium whitespace-nowrap">{app.fullName}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{app.email}</td>

                    {/* Phone */}
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{app.phone}</td>

                    {/* Role Applied */}
                    <td className="px-4 py-3 whitespace-nowrap">{app.roleApplied}</td>

                    {/* Job Title */}
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {app.jobTitle || <span className="italic opacity-50">—</span>}
                    </td>

                    {/* Experience */}
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{app.experienceYears}</td>

                    {/* Available */}
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                        app.availableImmediately === 'yes'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}>
                        {app.availableImmediately === 'yes' ? 'Yes' : 'No'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={app.status} />
                    </td>

                    {/* Applied Date */}
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap text-xs">
                      {formatDate(app.createdAt)}
                    </td>

                    {/* View */}
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/applications/${app._id}`}
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline whitespace-nowrap"
                      >
                        View <ExternalLink className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

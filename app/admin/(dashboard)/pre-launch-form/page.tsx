'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Plus, ClipboardList, Search, X, RefreshCw,
  ChevronLeft, ChevronRight, Copy, Check, Trash2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  adminListOnboardingForms, adminCreateOnboardingForm, adminDeleteOnboardingForm,
  type OnboardingForm,
} from '@/lib/client-api';
import { toast } from 'sonner';
import { useDebounce } from '@/hooks/use-debounce';

const PAGE_SIZE = 15;

export default function AdminOnboardingListPage() {
  const [forms, setForms] = useState<OnboardingForm[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const [createOpen, setCreateOpen] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [creating, setCreating] = useState(false);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<OnboardingForm | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminListOnboardingForms({
        search: debouncedSearch || undefined,
        page,
        limit: PAGE_SIZE,
      });
      setForms(res.forms);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch {
      toast.error('Failed to load forms');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, page]);

  useEffect(() => { setPage(1); }, [debouncedSearch]);
  useEffect(() => { load(); }, [load]);

  async function handleCreate() {
    if (!newEmail.trim()) return;
    setCreating(true);
    try {
      const { form, shareLink } = await adminCreateOnboardingForm({ email: newEmail.trim() });
      await navigator.clipboard.writeText(shareLink);
      toast.success('Form created — share link copied to clipboard!');
      setCreateOpen(false);
      setNewEmail('');
      load();
    } catch (err: any) {
      toast.error(err.message ?? 'Failed to create form');
    } finally {
      setCreating(false);
    }
  }

  async function copyLink(form: OnboardingForm) {
    const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;
    const link = `${BASE}/onboarding/${form.shareToken}`;
    await navigator.clipboard.writeText(link);
    setCopiedId(form._id);
    toast.success('Share link copied');
    setTimeout(() => setCopiedId(null), 2500);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await adminDeleteOnboardingForm(deleteTarget._id);
      toast.success('Form deleted');
      setDeleteTarget(null);
      load();
    } catch {
      toast.error('Failed to delete');
    } finally {
      setDeleting(false);
    }
  }

  const startRow = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endRow = Math.min(page * PAGE_SIZE, total);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight">Pre-Launch Form</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Create and share pre-launch forms with clients
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Create Form
        </Button>
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              All Forms
              {!loading && (
                <span className="text-muted-foreground font-normal text-sm">({total})</span>
              )}
            </CardTitle>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 self-end sm:self-auto" onClick={load}>
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search by email or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-sm"
              />
            </div>
            {search && (
              <Button size="sm" variant="ghost" className="h-8 px-2 text-xs gap-1 text-muted-foreground" onClick={() => setSearch('')}>
                <X className="h-3 w-3" /> Clear
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="p-4 space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : forms.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ClipboardList className="h-10 w-10 text-muted-foreground mx-auto" />
              {search ? (
                <>
                  <p className="text-sm text-muted-foreground">No forms match your search.</p>
                  <Button size="sm" variant="outline" onClick={() => setSearch('')}>Clear search</Button>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">No Pre-Launch Forms yet.</p>
                  <Button size="sm" onClick={() => setCreateOpen(true)}>
                    <Plus className="h-4 w-4 mr-1.5" /> Create your first form
                  </Button>
                </>
              )}
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-6">Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Last edited by</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right pr-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {forms.map((f) => (
                    <TableRow key={f._id}>
                      <TableCell className="pl-6 font-medium text-sm">{f.email}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {f.companyName || <span className="opacity-40">—</span>}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {f.primaryContact || <span className="opacity-40">—</span>}
                      </TableCell>
                      <TableCell>
                        {f.lastEditedBy ? (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                            f.lastEditedBy === 'admin'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {f.lastEditedBy}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground/50">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(f.updatedAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="text-right pr-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="sm" variant="ghost" className="h-7 px-2 text-xs"
                            onClick={() => copyLink(f)}
                          >
                            {copiedId === f._id
                              ? <Check className="h-3.5 w-3.5 text-emerald-500" />
                              : <Copy className="h-3.5 w-3.5" />
                            }
                          </Button>
                          <Button asChild size="sm" variant="ghost" className="h-7 px-2 text-xs">
                            <Link href={`/admin/pre-launch-form/${f._id}`}>View</Link>
                          </Button>
                          <Button
                            size="sm" variant="ghost"
                            className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                            onClick={() => setDeleteTarget(f)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex items-center justify-between px-6 py-3 border-t border-border/60">
                <p className="text-xs text-muted-foreground">
                  {total === 0 ? 'No forms' : `Showing ${startRow}–${endRow} of ${total} forms`}
                </p>
                {totalPages > 1 && (
                  <div className="flex items-center gap-1">
                    <Button size="sm" variant="outline" className="h-7 w-7 p-0" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </Button>
                    <span className="text-xs text-muted-foreground px-2">{page} / {totalPages}</span>
                    <Button size="sm" variant="outline" className="h-7 w-7 p-0" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Pre-Launch Form</DialogTitle>
            <DialogDescription>
              Enter the client's email. A shareable link will be generated and copied to your
              clipboard automatically.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Label htmlFor="new-email">Client email <span className="text-destructive">*</span></Label>
            <Input
              id="new-email"
              type="email"
              placeholder="client@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setCreateOpen(false); setNewEmail(''); }}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={creating || !newEmail.trim()} className="gap-2">
              {creating && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
              Create & Copy Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete form?</DialogTitle>
            <DialogDescription>
              This will permanently delete the pre-launch form for{' '}
              <strong>{deleteTarget?.email}</strong>. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting} className="gap-2">
              {deleting && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

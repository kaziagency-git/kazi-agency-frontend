'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, Plus, RefreshCw, Sparkles, Trash2, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  PageHeader, TableEmptyRow, TableErrorRow, TableLoadingRows,
} from '@/components/accounting/acc-ui';
import { EnumSelect } from '@/components/accounting/entity-select';
import { ConfirmDialog } from '@/components/accounting/confirm-dialog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAccAccounts, fetchAccCategories, fetchAccReference } from '@/store/slices/accounting';
import {
  AccAccount, AccCategory, accountsApi, categoriesApi, seedApi,
} from '@/lib/accounting/api';
import {
  ACC_ACCOUNT_TYPES, ACC_CATEGORY_TYPES, AccAccountType, AccCategoryType,
} from '@/lib/accounting/constants';

const SWATCHES = ['#ef4444', '#f97316', '#eab308', '#10b981', '#0ea5e9', '#8b5cf6', '#ec4899', '#64748b'];

export default function AccountingSettingsPage() {
  const dispatch = useAppDispatch();

  const refresh = useCallback(() => {
    dispatch(fetchAccCategories({ limit: 200, sortBy: 'name', sortDir: 'asc', includeInactive: true }));
    dispatch(fetchAccAccounts({ limit: 200, sortBy: 'name', sortDir: 'asc', includeInactive: true }));
    // Keeps every open dropdown elsewhere in sync with what was just edited.
    dispatch(fetchAccReference());
  }, [dispatch]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="space-y-6">
      <PageHeader title="Accounting Settings" description="Categories and payment accounts">
        <Button variant="outline" size="sm" onClick={refresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </PageHeader>

      <Tabs defaultValue="categories">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="accounts">Payment accounts</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="mt-5">
          <CategoriesPanel onChanged={refresh} />
        </TabsContent>

        <TabsContent value="accounts" className="mt-5">
          <AccountsPanel onChanged={refresh} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ── Categories ─────────────────────────────────────────────────────────────

function CategoriesPanel({ onChanged }: { onChanged: () => void }) {
  const { items, status, error } = useAppSelector((s) => s.accounting.categories);
  const loading = status === 'idle' || status === 'loading';

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AccCategory | null>(null);
  const [retiring, setRetiring] = useState<AccCategory | null>(null);
  const [seeding, setSeeding] = useState(false);

  async function handleSeed() {
    setSeeding(true);
    try {
      const result = await seedApi.run();
      if (result.created.length === 0) {
        toast.info('Default categories already exist — nothing was changed');
      } else {
        toast.success(`Added ${result.created.length} default categories`);
      }
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Seed failed');
    } finally {
      setSeeding(false);
    }
  }

  async function handleRetire() {
    if (!retiring) return;
    try {
      await categoriesApi.remove(retiring._id);
      toast.success('Category deactivated');
      setRetiring(null);
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not deactivate');
    }
  }

  return (
    <>
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3">
          <div>
            <CardTitle className="text-base">Categories</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Used to group every transaction. Names are case-insensitive and unique per type.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => void handleSeed()} disabled={seeding}>
              {seeding ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
              Add defaults
            </Button>
            <Button size="sm" onClick={() => { setEditing(null); setDialogOpen(true); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-20 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableLoadingRows cols={4} />
                ) : status === 'error' ? (
                  <TableErrorRow cols={4} error={error ?? 'Request failed'} onRetry={onChanged} />
                ) : items.length === 0 ? (
                  <TableEmptyRow
                    cols={4}
                    message="No categories yet"
                    hint='Use "Add defaults" to create Salary, Ads, Software, Hosting, Client Payment and Other Income.'
                  />
                ) : (
                  items.map((c) => (
                    <TableRow key={c._id} className={c.isActive ? '' : 'opacity-60'}>
                      <TableCell>
                        <span className="flex items-center gap-2 font-medium">
                          <span
                            className="h-3 w-3 rounded-full shrink-0 border border-border"
                            style={{ backgroundColor: c.color ?? 'transparent' }}
                          />
                          {c.name}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={c.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}
                        >
                          {c.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {c.isActive ? (
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Active</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-600">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit"
                            onClick={() => { setEditing(c); setDialogOpen(true); }}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          {c.isActive && (
                            <Button variant="ghost" size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              title="Deactivate" onClick={() => setRetiring(c)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CategoryDialog open={dialogOpen} onOpenChange={setDialogOpen} editing={editing} onSaved={onChanged} />

      <ConfirmDialog
        open={retiring !== null}
        onOpenChange={(open) => !open && setRetiring(null)}
        title="Deactivate this category?"
        description={
          <>
            <strong>{retiring?.name}</strong> will stop appearing in dropdowns. Transactions already
            filed under it keep their category and still show in reports — nothing is deleted, and
            you can reactivate it by editing the row.
          </>
        }
        confirmLabel="Deactivate"
        onConfirm={handleRetire}
      />
    </>
  );
}

function CategoryDialog({
  open, onOpenChange, editing, onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: AccCategory | null;
  onSaved: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<AccCategoryType>('expense');
  const [color, setColor] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!open) return;
    setName(editing?.name ?? '');
    setType(editing?.type ?? 'expense');
    setColor(editing?.color ?? null);
    setIsActive(editing?.isActive ?? true);
  }, [open, editing]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { toast.error('Name is required'); return; }

    setSaving(true);
    try {
      const payload = { name: name.trim(), type, color, isActive };
      if (editing) {
        await categoriesApi.update(editing._id, payload);
        toast.success('Category updated');
      } else {
        await categoriesApi.create(payload);
        toast.success('Category added');
      }
      onSaved();
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save the category');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !saving && onOpenChange(next)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editing ? 'Edit category' : 'Add category'}</DialogTitle>
          <DialogDescription>
            A name can be reused across types — one &quot;Software&quot; expense and one income category.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="cat-name">Name</Label>
            <Input id="cat-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Software" required />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cat-type">Type</Label>
            <EnumSelect
              id="cat-type"
              value={type}
              onChange={(v) => setType((v as AccCategoryType) ?? 'expense')}
              options={ACC_CATEGORY_TYPES}
            />
          </div>

          <div className="space-y-2">
            <Label>Colour</Label>
            <div className="flex flex-wrap items-center gap-2">
              {SWATCHES.map((swatch) => (
                <button
                  key={swatch}
                  type="button"
                  onClick={() => setColor(swatch)}
                  aria-label={`Use colour ${swatch}`}
                  className={`h-7 w-7 rounded-full border-2 transition-transform ${
                    color === swatch ? 'border-foreground scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: swatch }}
                />
              ))}
              <button
                type="button"
                onClick={() => setColor(null)}
                className={`h-7 px-3 rounded-full border text-xs ${
                  color === null ? 'border-foreground' : 'border-border text-muted-foreground'
                }`}
              >
                None
              </button>
            </div>
          </div>

          {editing && (
            <div className="flex items-center gap-2">
              <input
                id="cat-active"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4 rounded border-input"
              />
              <Label htmlFor="cat-active" className="cursor-pointer">Active</Label>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editing ? 'Save changes' : 'Add category'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ── Payment accounts ───────────────────────────────────────────────────────

function AccountsPanel({ onChanged }: { onChanged: () => void }) {
  const { items, status, error } = useAppSelector((s) => s.accounting.accounts);
  const loading = status === 'idle' || status === 'loading';

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AccAccount | null>(null);
  const [retiring, setRetiring] = useState<AccAccount | null>(null);

  async function handleRetire() {
    if (!retiring) return;
    try {
      await accountsApi.remove(retiring._id);
      toast.success('Account deactivated');
      setRetiring(null);
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not deactivate');
    }
  }

  return (
    <>
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3">
          <div>
            <CardTitle className="text-base">Payment accounts</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Where money moves through — bank, Stripe, cards, PayPal. Never stores card numbers.
            </p>
          </div>
          <Button size="sm" onClick={() => { setEditing(null); setDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </CardHeader>
        <CardContent className="px-0 sm:px-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Last 4</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-20 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableLoadingRows cols={5} />
                ) : status === 'error' ? (
                  <TableErrorRow cols={5} error={error ?? 'Request failed'} onRetry={onChanged} />
                ) : items.length === 0 ? (
                  <TableEmptyRow
                    cols={5}
                    message="No payment accounts yet"
                    hint="Add the accounts the agency actually pays and receives from."
                  />
                ) : (
                  items.map((a) => (
                    <TableRow key={a._id} className={a.isActive ? '' : 'opacity-60'}>
                      <TableCell className="font-medium">{a.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">{a.type}</Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground font-mono text-xs">
                        {a.last4 ? `••${a.last4}` : '—'}
                      </TableCell>
                      <TableCell>
                        {a.isActive ? (
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Active</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-600">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit"
                            onClick={() => { setEditing(a); setDialogOpen(true); }}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          {a.isActive && (
                            <Button variant="ghost" size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              title="Deactivate" onClick={() => setRetiring(a)}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AccountDialog open={dialogOpen} onOpenChange={setDialogOpen} editing={editing} onSaved={onChanged} />

      <ConfirmDialog
        open={retiring !== null}
        onOpenChange={(open) => !open && setRetiring(null)}
        title="Deactivate this account?"
        description={
          <>
            <strong>{retiring?.name}</strong> will stop appearing in dropdowns. Existing
            transactions keep their link to it. Nothing is deleted.
          </>
        }
        confirmLabel="Deactivate"
        onConfirm={handleRetire}
      />
    </>
  );
}

function AccountDialog({
  open, onOpenChange, editing, onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: AccAccount | null;
  onSaved: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<AccAccountType>('bank');
  const [last4, setLast4] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!open) return;
    setName(editing?.name ?? '');
    setType(editing?.type ?? 'bank');
    setLast4(editing?.last4 ?? '');
    setIsActive(editing?.isActive ?? true);
  }, [open, editing]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { toast.error('Name is required'); return; }
    if (last4 && !/^\d{4}$/.test(last4)) { toast.error('Last 4 must be exactly 4 digits'); return; }

    setSaving(true);
    try {
      const payload = { name: name.trim(), type, last4: last4 || null, isActive };
      if (editing) {
        await accountsApi.update(editing._id, payload);
        toast.success('Account updated');
      } else {
        await accountsApi.create(payload);
        toast.success('Account added');
      }
      onSaved();
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save the account');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !saving && onOpenChange(next)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editing ? 'Edit account' : 'Add payment account'}</DialogTitle>
          <DialogDescription>
            Only the last four digits are stored — never a full card number.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="acct-name">Name</Label>
            <Input id="acct-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Chase business checking" required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="acct-type">Type</Label>
              <EnumSelect
                id="acct-type"
                value={type}
                onChange={(v) => setType((v as AccAccountType) ?? 'bank')}
                options={ACC_ACCOUNT_TYPES}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="acct-last4">Last 4</Label>
              <Input
                id="acct-last4"
                value={last4}
                onChange={(e) => setLast4(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="4242"
                inputMode="numeric"
                className="font-mono"
              />
            </div>
          </div>

          {editing && (
            <div className="flex items-center gap-2">
              <input
                id="acct-active"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4 rounded border-input"
              />
              <Label htmlFor="acct-active" className="cursor-pointer">Active</Label>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editing ? 'Save changes' : 'Add account'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

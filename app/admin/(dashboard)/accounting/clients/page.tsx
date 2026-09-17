'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Loader2, Pencil, RefreshCw, Search, UserCog } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  Money, PageHeader, TableEmptyRow, TableErrorRow, TableLoadingRows,
} from '@/components/accounting/acc-ui';
import { EnumSelect } from '@/components/accounting/entity-select';
import { MoneyInput } from '@/components/accounting/money-input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAccReference } from '@/store/slices/accounting';
import {
  AccClientProfile, AccClientProfileInput, clientProfilesApi, refId,
} from '@/lib/accounting/api';
import { ACC_BILLING_TYPES, AccBillingType } from '@/lib/accounting/constants';
import { ClientOption } from '@/store/slices/accounting/referenceSlice';

const COLS = 6;

/**
 * Joins the EXISTING client list (read-only) with each client's accounting
 * billing profile. The Client collection is never written to from here — only
 * the `acc_client_profiles` row is created or edited.
 */
export default function AccountingClientsPage() {
  const dispatch = useAppDispatch();
  const { clients, status: refStatus, error: refError } = useAppSelector(
    (s) => s.accounting.reference
  );

  const [profiles, setProfiles] = useState<AccClientProfile[]>([]);
  const [profilesStatus, setProfilesStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [profilesError, setProfilesError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [editingClient, setEditingClient] = useState<ClientOption | null>(null);
  const [editingProfile, setEditingProfile] = useState<AccClientProfile | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const loadProfiles = useCallback(async () => {
    setProfilesStatus('loading');
    setProfilesError(null);
    try {
      // Inactive profiles are included so a retired billing setup can be
      // reactivated instead of silently duplicated.
      const res = await clientProfilesApi.list({ limit: 200, includeInactive: true });
      setProfiles(res.items);
      setProfilesStatus('success');
    } catch (err) {
      setProfilesError(err instanceof Error ? err.message : 'Failed to load billing profiles');
      setProfilesStatus('error');
    }
  }, []);

  useEffect(() => {
    void loadProfiles();
  }, [loadProfiles]);

  const profileByClient = useMemo(() => {
    const map = new Map<string, AccClientProfile>();
    for (const p of profiles) {
      const id = refId(p.clientId);
      if (id) map.set(id, p);
    }
    return map;
  }, [profiles]);

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return clients
      .filter((c) =>
        !term ||
        c.name.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.company.toLowerCase().includes(term)
      )
      .map((client) => ({ client, profile: profileByClient.get(client._id) ?? null }));
  }, [clients, search, profileByClient]);

  const loading = refStatus === 'idle' || refStatus === 'loading' || profilesStatus === 'loading';
  const error = refError ?? profilesError;

  function refresh() {
    dispatch(fetchAccReference());
    void loadProfiles();
  }

  function openDialog(client: ClientOption, profile: AccClientProfile | null) {
    setEditingClient(client);
    setEditingProfile(profile);
    setDialogOpen(true);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Client Billing"
        description="Existing clients joined with their accounting profile"
      >
        <Button variant="outline" size="sm" onClick={refresh} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </PageHeader>

      <Card className="border-border/60 shadow-sm">
        <CardContent className="pt-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients by name, email or company"
              className="pl-9"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Client records themselves are managed under{' '}
            <Link href="/admin/clients" className="text-primary hover:underline">Clients</Link> —
            this page only edits billing settings.
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/60 shadow-sm">
        <CardContent className="pt-5 px-0 sm:px-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead className="hidden md:table-cell">Billing type</TableHead>
                  <TableHead className="hidden lg:table-cell">Monthly fee</TableHead>
                  <TableHead className="hidden lg:table-cell">Hourly rate</TableHead>
                  <TableHead>Profile</TableHead>
                  <TableHead className="w-28 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableLoadingRows cols={COLS} />
                ) : error ? (
                  <TableErrorRow cols={COLS} error={error} onRetry={refresh} />
                ) : rows.length === 0 ? (
                  <TableEmptyRow
                    cols={COLS}
                    message={search ? 'No clients match this search' : 'No clients yet'}
                    hint={search ? undefined : 'Add clients from the Clients page first.'}
                  />
                ) : (
                  rows.map(({ client, profile }) => (
                    <TableRow key={client._id}>
                      <TableCell>
                        <span className="font-medium">{client.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {client.company || client.email}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {profile ? (
                          <Badge variant="secondary" className="capitalize">{profile.billingType}</Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {profile && profile.monthlyFeeCents > 0
                          ? <Money cents={profile.monthlyFeeCents} />
                          : <span className="text-muted-foreground text-sm">—</span>}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {profile && profile.hourlyRateCents > 0
                          ? <><Money cents={profile.hourlyRateCents} /><span className="text-muted-foreground text-xs">/h</span></>
                          : <span className="text-muted-foreground text-sm">—</span>}
                      </TableCell>
                      <TableCell>
                        {!profile ? (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-700">Not set up</Badge>
                        ) : profile.isActive ? (
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Active</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-600">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title={profile ? 'Edit billing profile' : 'Set up billing'}
                            onClick={() => openDialog(client, profile)}
                          >
                            {profile ? <Pencil className="h-3.5 w-3.5" /> : <UserCog className="h-4 w-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" title="View detail" asChild>
                            <Link href={`/admin/accounting/clients/${client._id}`}>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </Button>
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

      <ProfileDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        client={editingClient}
        profile={editingProfile}
        onSaved={() => void loadProfiles()}
      />
    </div>
  );
}

// ── Billing profile dialog ─────────────────────────────────────────────────

function ProfileDialog({
  open, onOpenChange, client, profile, onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: ClientOption | null;
  profile: AccClientProfile | null;
  onSaved: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [billingType, setBillingType] = useState<AccBillingType>('retainer');
  const [monthlyFeeCents, setMonthlyFeeCents] = useState(0);
  const [hourlyRateCents, setHourlyRateCents] = useState(0);
  const [billingDayOfMonth, setBillingDayOfMonth] = useState('1');
  const [ghlContactId, setGhlContactId] = useState('');
  const [notes, setNotes] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!open) return;
    if (profile) {
      setBillingType(profile.billingType);
      setMonthlyFeeCents(profile.monthlyFeeCents);
      setHourlyRateCents(profile.hourlyRateCents);
      setBillingDayOfMonth(String(profile.billingDayOfMonth));
      setGhlContactId(profile.ghlContactId ?? '');
      setNotes(profile.notes ?? '');
      setIsActive(profile.isActive);
    } else {
      setBillingType('retainer');
      setMonthlyFeeCents(0);
      setHourlyRateCents(0);
      setBillingDayOfMonth('1');
      setGhlContactId('');
      setNotes('');
      setIsActive(true);
    }
  }, [open, profile]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!client) return;

    const day = Number(billingDayOfMonth);
    if (!Number.isInteger(day) || day < 1 || day > 28) {
      toast.error('Billing day must be between 1 and 28');
      return;
    }

    setSaving(true);
    try {
      const payload: Omit<AccClientProfileInput, 'clientId'> = {
        billingType,
        monthlyFeeCents,
        hourlyRateCents,
        billingDayOfMonth: day,
        ghlContactId: ghlContactId.trim() || null,
        notes: notes.trim(),
        isActive,
      };

      if (profile) {
        await clientProfilesApi.update(profile._id, payload);
        toast.success('Billing profile updated');
      } else {
        await clientProfilesApi.create({ ...payload, clientId: client._id });
        toast.success('Billing profile created');
      }
      onSaved();
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save the profile');
    } finally {
      setSaving(false);
    }
  }

  const needsMonthly = billingType === 'retainer' || billingType === 'mixed';
  const needsHourly = billingType === 'hourly' || billingType === 'mixed';

  return (
    <Dialog open={open} onOpenChange={(next) => !saving && onOpenChange(next)}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{profile ? 'Edit billing profile' : 'Set up billing'}</DialogTitle>
          <DialogDescription>
            {client?.name}
            {client?.company ? ` — ${client.company}` : ''}. The client record itself is not changed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="cp-type">Billing type</Label>
            <EnumSelect
              id="cp-type"
              value={billingType}
              onChange={(v) => setBillingType((v as AccBillingType) ?? 'retainer')}
              options={ACC_BILLING_TYPES}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="cp-monthly">Monthly fee</Label>
              <MoneyInput
                id="cp-monthly"
                valueCents={monthlyFeeCents}
                onChangeCents={setMonthlyFeeCents}
                disabled={!needsMonthly}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cp-hourly">Hourly rate</Label>
              <MoneyInput
                id="cp-hourly"
                valueCents={hourlyRateCents}
                onChangeCents={setHourlyRateCents}
                disabled={!needsHourly}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cp-day">Billing day of month</Label>
            <Input
              id="cp-day"
              type="number"
              min="1"
              max="28"
              value={billingDayOfMonth}
              onChange={(e) => setBillingDayOfMonth(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Capped at 28 so every month has that day.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cp-ghl">GoHighLevel contact ID</Label>
            <Input
              id="cp-ghl"
              value={ghlContactId}
              onChange={(e) => setGhlContactId(e.target.value)}
              placeholder="cont_12ab…"
              className="font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground">
              How the n8n payment sync matches GHL payments to this client.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cp-notes">Notes</Label>
            <Textarea id="cp-notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>

          {profile && (
            <div className="flex items-center gap-2">
              <input
                id="cp-active"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-4 w-4 rounded border-input"
              />
              <Label htmlFor="cp-active" className="cursor-pointer">Profile is active</Label>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {profile ? 'Save changes' : 'Create profile'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

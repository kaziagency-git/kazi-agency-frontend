'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { MoneyInput } from './money-input';
import { AccountSelect, ClientSelect, EnumSelect } from './entity-select';
import {
  AccDomain, AccHosting, AccSubscription,
  domainsApi, hostingsApi, refId, subscriptionsApi,
} from '@/lib/accounting/api';
import {
  ACC_BILLING_CYCLES, ACC_DEFAULT_HOSTING_PROVIDER, ACC_DEFAULT_REGISTRAR,
  ACC_DOMAIN_STATUSES, ACC_HOSTING_STATUSES, ACC_SUBSCRIPTION_STATUSES,
  AccBillingCycle, AccDomainStatus, AccHostingStatus, AccSubscriptionStatus,
} from '@/lib/accounting/constants';
import { toYmdNY } from '@/lib/accounting/date';

/**
 * Add/edit dialogs for the three renewal-tracked resources. They share the
 * cost/charge + expiry + client shape, so they live together.
 *
 * `costCents` is what the agency pays the provider; `chargeCents` is what the
 * client is billed — the gap between them is the margin shown on the tables.
 */

// ── Domain ─────────────────────────────────────────────────────────────────

export function DomainDialog({
  open, onOpenChange, editing, onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: AccDomain | null;
  onSaved: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(() => blankDomain());

  useEffect(() => {
    if (!open) return;
    setForm(editing ? {
      domain: editing.domain,
      clientId: refId(editing.clientId),
      registrar: editing.registrar,
      purchaseDate: editing.purchaseDate ? toYmdNY(new Date(editing.purchaseDate)) : '',
      expiryDate: toYmdNY(new Date(editing.expiryDate)),
      costCents: editing.costCents,
      chargeCents: editing.chargeCents,
      autoRenew: editing.autoRenew,
      status: editing.status,
      notes: editing.notes ?? '',
    } : blankDomain());
  }, [open, editing]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.domain.trim() || !form.expiryDate) {
      toast.error('Domain and expiry date are required');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        domain: form.domain.trim().toLowerCase(),
        clientId: form.clientId,
        registrar: form.registrar.trim() || ACC_DEFAULT_REGISTRAR,
        purchaseDate: form.purchaseDate || null,
        expiryDate: form.expiryDate,
        costCents: form.costCents,
        chargeCents: form.chargeCents,
        autoRenew: form.autoRenew,
        status: form.status,
        notes: form.notes.trim(),
      };

      if (editing) {
        await domainsApi.update(editing._id, payload);
        toast.success('Domain updated');
      } else {
        await domainsApi.create(payload);
        toast.success('Domain added');
      }
      onSaved();
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save the domain');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !saving && onOpenChange(next)}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editing ? 'Edit domain' : 'Add domain'}</DialogTitle>
          <DialogDescription>Leave the client empty for an agency-owned domain.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="d-domain">Domain</Label>
            <Input
              id="d-domain"
              value={form.domain}
              onChange={(e) => setForm((p) => ({ ...p, domain: e.target.value }))}
              placeholder="example.com"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="d-client">Client</Label>
              <ClientSelect id="d-client" value={form.clientId} onChange={(v) => setForm((p) => ({ ...p, clientId: v }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="d-registrar">Registrar</Label>
              <Input
                id="d-registrar"
                value={form.registrar}
                onChange={(e) => setForm((p) => ({ ...p, registrar: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="d-purchase">Purchased</Label>
              <Input
                id="d-purchase"
                type="date"
                value={form.purchaseDate}
                onChange={(e) => setForm((p) => ({ ...p, purchaseDate: e.target.value }))}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="d-expiry">Expires</Label>
              <Input
                id="d-expiry"
                type="date"
                value={form.expiryDate}
                onChange={(e) => setForm((p) => ({ ...p, expiryDate: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="d-cost">Our cost</Label>
              <MoneyInput id="d-cost" valueCents={form.costCents} onChangeCents={(c) => setForm((p) => ({ ...p, costCents: c }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="d-charge">Client charge</Label>
              <MoneyInput id="d-charge" valueCents={form.chargeCents} onChangeCents={(c) => setForm((p) => ({ ...p, chargeCents: c }))} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 items-end">
            <div className="space-y-1.5">
              <Label htmlFor="d-status">Status</Label>
              <EnumSelect
                id="d-status"
                value={form.status}
                onChange={(v) => setForm((p) => ({ ...p, status: (v as AccDomainStatus) ?? 'active' }))}
                options={ACC_DOMAIN_STATUSES}
              />
            </div>
            <div className="flex items-center gap-2 pb-2">
              <Switch
                id="d-autorenew"
                checked={form.autoRenew}
                onCheckedChange={(v) => setForm((p) => ({ ...p, autoRenew: v }))}
              />
              <Label htmlFor="d-autorenew" className="cursor-pointer">Auto-renew</Label>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="d-notes">Notes</Label>
            <Textarea id="d-notes" rows={2} value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editing ? 'Save changes' : 'Add domain'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function blankDomain() {
  return {
    domain: '',
    clientId: null as string | null,
    registrar: ACC_DEFAULT_REGISTRAR as string,
    purchaseDate: '',
    expiryDate: '',
    costCents: 0,
    chargeCents: 0,
    autoRenew: true,
    status: 'active' as AccDomainStatus,
    notes: '',
  };
}

// ── Hosting ────────────────────────────────────────────────────────────────

export function HostingDialog({
  open, onOpenChange, editing, onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: AccHosting | null;
  onSaved: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(() => blankHosting());

  useEffect(() => {
    if (!open) return;
    setForm(editing ? {
      name: editing.name,
      clientId: refId(editing.clientId),
      provider: editing.provider,
      plan: editing.plan ?? '',
      relatedDomains: (editing.relatedDomains ?? []).join(', '),
      startDate: editing.startDate ? toYmdNY(new Date(editing.startDate)) : '',
      expiryDate: toYmdNY(new Date(editing.expiryDate)),
      costCents: editing.costCents,
      chargeCents: editing.chargeCents,
      autoRenew: editing.autoRenew,
      status: editing.status,
      notes: editing.notes ?? '',
    } : blankHosting());
  }, [open, editing]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.expiryDate) {
      toast.error('Name and expiry date are required');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        clientId: form.clientId,
        provider: form.provider.trim() || ACC_DEFAULT_HOSTING_PROVIDER,
        plan: form.plan.trim(),
        relatedDomains: form.relatedDomains
          .split(',')
          .map((d) => d.trim().toLowerCase())
          .filter(Boolean),
        startDate: form.startDate || null,
        expiryDate: form.expiryDate,
        costCents: form.costCents,
        chargeCents: form.chargeCents,
        autoRenew: form.autoRenew,
        status: form.status,
        notes: form.notes.trim(),
      };

      if (editing) {
        await hostingsApi.update(editing._id, payload);
        toast.success('Hosting plan updated');
      } else {
        await hostingsApi.create(payload);
        toast.success('Hosting plan added');
      }
      onSaved();
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save the hosting plan');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !saving && onOpenChange(next)}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editing ? 'Edit hosting plan' : 'Add hosting plan'}</DialogTitle>
          <DialogDescription>Leave the client empty for an agency-owned plan.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="h-name">Name</Label>
            <Input
              id="h-name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Acme business hosting"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="h-client">Client</Label>
              <ClientSelect id="h-client" value={form.clientId} onChange={(v) => setForm((p) => ({ ...p, clientId: v }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="h-provider">Provider</Label>
              <Input id="h-provider" value={form.provider} onChange={(e) => setForm((p) => ({ ...p, provider: e.target.value }))} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="h-plan">Plan</Label>
              <Input id="h-plan" value={form.plan} onChange={(e) => setForm((p) => ({ ...p, plan: e.target.value }))} placeholder="Business / Cloud Startup" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="h-status">Status</Label>
              <EnumSelect
                id="h-status"
                value={form.status}
                onChange={(v) => setForm((p) => ({ ...p, status: (v as AccHostingStatus) ?? 'active' }))}
                options={ACC_HOSTING_STATUSES}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="h-domains">Related domains</Label>
            <Input
              id="h-domains"
              value={form.relatedDomains}
              onChange={(e) => setForm((p) => ({ ...p, relatedDomains: e.target.value }))}
              placeholder="acme.com, shop.acme.com"
            />
            <p className="text-xs text-muted-foreground">Comma separated.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="h-start">Started</Label>
              <Input id="h-start" type="date" value={form.startDate} onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="h-expiry">Expires</Label>
              <Input id="h-expiry" type="date" value={form.expiryDate} onChange={(e) => setForm((p) => ({ ...p, expiryDate: e.target.value }))} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="h-cost">Our cost</Label>
              <MoneyInput id="h-cost" valueCents={form.costCents} onChangeCents={(c) => setForm((p) => ({ ...p, costCents: c }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="h-charge">Client charge</Label>
              <MoneyInput id="h-charge" valueCents={form.chargeCents} onChangeCents={(c) => setForm((p) => ({ ...p, chargeCents: c }))} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch id="h-autorenew" checked={form.autoRenew} onCheckedChange={(v) => setForm((p) => ({ ...p, autoRenew: v }))} />
            <Label htmlFor="h-autorenew" className="cursor-pointer">Auto-renew</Label>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="h-notes">Notes</Label>
            <Textarea id="h-notes" rows={2} value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editing ? 'Save changes' : 'Add plan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function blankHosting() {
  return {
    name: '',
    clientId: null as string | null,
    provider: ACC_DEFAULT_HOSTING_PROVIDER as string,
    plan: '',
    relatedDomains: '',
    startDate: '',
    expiryDate: '',
    costCents: 0,
    chargeCents: 0,
    autoRenew: true,
    status: 'active' as AccHostingStatus,
    notes: '',
  };
}

// ── Subscription ───────────────────────────────────────────────────────────

export function SubscriptionDialog({
  open, onOpenChange, editing, onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: AccSubscription | null;
  onSaved: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(() => blankSubscription());

  // A one_time purchase has neither a next billing date nor a renewal to automate.
  const isOneTime = form.billingCycle === 'one_time';

  useEffect(() => {
    if (!open) return;
    setForm(editing ? {
      toolName: editing.toolName,
      plan: editing.plan ?? '',
      costCents: editing.costCents,
      billingCycle: editing.billingCycle,
      nextBillingDate: editing.nextBillingDate ? toYmdNY(new Date(editing.nextBillingDate)) : '',
      // A row written before the field existed has none; the model defaults
      // it to true, so only an explicit false means manual renewal.
      autoRenew: editing.autoRenew !== false,
      accountId: refId(editing.accountId),
      isBillableToClient: editing.isBillableToClient,
      clientId: refId(editing.clientId),
      status: editing.status,
      loginEmail: editing.loginEmail ?? '',
      url: editing.url ?? '',
      notes: editing.notes ?? '',
    } : blankSubscription());
  }, [open, editing]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.toolName.trim()) {
      toast.error('Tool name is required');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        toolName: form.toolName.trim(),
        plan: form.plan.trim(),
        costCents: form.costCents,
        billingCycle: form.billingCycle,
        nextBillingDate: isOneTime ? null : form.nextBillingDate || null,
        // A one_time purchase never renews, so the flag is forced off.
        autoRenew: isOneTime ? false : form.autoRenew,
        accountId: form.accountId,
        isBillableToClient: form.isBillableToClient,
        clientId: form.isBillableToClient ? form.clientId : null,
        status: form.status,
        loginEmail: form.loginEmail.trim() || null,
        url: form.url.trim() || null,
        notes: form.notes.trim(),
      };

      if (editing) {
        await subscriptionsApi.update(editing._id, payload);
        toast.success('Subscription updated');
      } else {
        await subscriptionsApi.create(payload);
        toast.success('Subscription added');
      }
      onSaved();
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save the subscription');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !saving && onOpenChange(next)}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editing ? 'Edit subscription' : 'Add subscription'}</DialogTitle>
          <DialogDescription>
            Never store passwords here — keep them in your password manager.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="s-tool">Tool</Label>
              <Input id="s-tool" value={form.toolName} onChange={(e) => setForm((p) => ({ ...p, toolName: e.target.value }))} placeholder="Figma" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="s-plan">Plan</Label>
              <Input id="s-plan" value={form.plan} onChange={(e) => setForm((p) => ({ ...p, plan: e.target.value }))} placeholder="Professional" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="s-cost">Cost</Label>
              <MoneyInput id="s-cost" valueCents={form.costCents} onChangeCents={(c) => setForm((p) => ({ ...p, costCents: c }))} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="s-cycle">Billing cycle</Label>
              <EnumSelect
                id="s-cycle"
                value={form.billingCycle}
                onChange={(v) => setForm((p) => ({ ...p, billingCycle: (v as AccBillingCycle) ?? 'monthly' }))}
                options={ACC_BILLING_CYCLES}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="s-next">Next billing date</Label>
              <Input
                id="s-next"
                type="date"
                value={form.nextBillingDate}
                onChange={(e) => setForm((p) => ({ ...p, nextBillingDate: e.target.value }))}
                disabled={isOneTime}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="s-status">Status</Label>
              <EnumSelect
                id="s-status"
                value={form.status}
                onChange={(v) => setForm((p) => ({ ...p, status: (v as AccSubscriptionStatus) ?? 'active' }))}
                options={ACC_SUBSCRIPTION_STATUSES}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="s-account">Paid from</Label>
            <AccountSelect id="s-account" value={form.accountId} onChange={(v) => setForm((p) => ({ ...p, accountId: v }))} />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="s-autorenew"
              checked={form.autoRenew && !isOneTime}
              disabled={isOneTime}
              onCheckedChange={(v) => setForm((p) => ({ ...p, autoRenew: v }))}
            />
            <Label htmlFor="s-autorenew" className={`cursor-pointer ${isOneTime ? 'text-muted-foreground' : ''}`}>
              Auto-renew
            </Label>
          </div>
          <p className="text-xs text-muted-foreground -mt-2">
            {isOneTime
              ? 'A one-time purchase never renews.'
              : 'Turn this off when the tool has to be paid for by hand before the billing date.'}
          </p>

          <div className="flex items-center gap-2">
            <Switch
              id="s-billable"
              checked={form.isBillableToClient}
              onCheckedChange={(v) => setForm((p) => ({ ...p, isBillableToClient: v }))}
            />
            <Label htmlFor="s-billable" className="cursor-pointer">Re-billed to a client</Label>
          </div>

          {form.isBillableToClient && (
            <div className="space-y-1.5">
              <Label htmlFor="s-client">Client</Label>
              <ClientSelect id="s-client" value={form.clientId} onChange={(v) => setForm((p) => ({ ...p, clientId: v }))} />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="s-email">Login email</Label>
              <Input id="s-email" type="email" value={form.loginEmail} onChange={(e) => setForm((p) => ({ ...p, loginEmail: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="s-url">URL</Label>
              <Input id="s-url" type="url" value={form.url} onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))} placeholder="https://…" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="s-notes">Notes</Label>
            <Textarea id="s-notes" rows={2} value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>Cancel</Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editing ? 'Save changes' : 'Add subscription'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function blankSubscription() {
  return {
    toolName: '',
    plan: '',
    costCents: 0,
    billingCycle: 'monthly' as AccBillingCycle,
    nextBillingDate: '',
    autoRenew: true,
    accountId: null as string | null,
    isBillableToClient: false,
    clientId: null as string | null,
    status: 'active' as AccSubscriptionStatus,
    loginEmail: '',
    url: '',
    notes: '',
  };
}

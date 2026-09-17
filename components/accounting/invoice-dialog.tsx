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
import { Textarea } from '@/components/ui/textarea';
import { MoneyInput } from './money-input';
import { ClientSelect, EnumSelect } from './entity-select';
import { AccInvoice, AccInvoiceInput, invoicesApi, refId } from '@/lib/accounting/api';
import {
  ACC_INVOICE_BILLING_TYPES, ACC_INVOICE_STATUSES,
  AccInvoiceBillingType, AccInvoiceStatus,
} from '@/lib/accounting/constants';
import { toYmdNY } from '@/lib/accounting/date';

/**
 * Add/edit dialog for an invoice.
 *
 * Invoices normally originate in GoHighLevel and arrive through the n8n sync,
 * but manual entries are allowed for work invoiced outside GHL.
 */
export function InvoiceDialog({
  open,
  onOpenChange,
  editing,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: AccInvoice | null;
  onSaved: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(() => blank());

  useEffect(() => {
    if (!open) return;
    setForm(editing ? fromInvoice(editing) : blank());
  }, [open, editing]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.clientId) {
      toast.error('Pick a client');
      return;
    }
    if (!form.invoiceNumber.trim()) {
      toast.error('Invoice number is required');
      return;
    }

    const payload: AccInvoiceInput = {
      clientId: form.clientId,
      invoiceNumber: form.invoiceNumber.trim(),
      billingType: form.billingType,
      title: form.title.trim(),
      amountCents: form.amountCents,
      issueDate: form.issueDate,
      dueDate: form.dueDate || null,
      status: form.status,
      milestoneLabel: form.milestoneLabel.trim() || null,
      notes: form.notes.trim(),
    };

    setSaving(true);
    try {
      if (editing) {
        await invoicesApi.update(editing._id, payload);
        toast.success('Invoice updated');
      } else {
        await invoicesApi.create(payload);
        toast.success('Invoice created');
      }
      onSaved();
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save the invoice');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !saving && onOpenChange(next)}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editing ? 'Edit invoice' : 'Add invoice'}</DialogTitle>
          <DialogDescription>
            {editing?.ghlInvoiceId
              ? 'Synced from GoHighLevel — edits here do not push back to GHL.'
              : 'For work invoiced outside GoHighLevel.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="inv-client">Client</Label>
            <ClientSelect
              id="inv-client"
              value={form.clientId}
              onChange={(v) => set('clientId', v)}
              allowNone={false}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="inv-number">Invoice number</Label>
              <Input
                id="inv-number"
                value={form.invoiceNumber}
                onChange={(e) => set('invoiceNumber', e.target.value)}
                placeholder="INV-1043"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="inv-amount">Amount</Label>
              <MoneyInput
                id="inv-amount"
                valueCents={form.amountCents}
                onChangeCents={(cents) => set('amountCents', cents)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="inv-title">Title</Label>
            <Input
              id="inv-title"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="March retainer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="inv-issue">Issue date</Label>
              <Input
                id="inv-issue"
                type="date"
                value={form.issueDate}
                onChange={(e) => set('issueDate', e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="inv-due">Due date</Label>
              <Input
                id="inv-due"
                type="date"
                value={form.dueDate}
                onChange={(e) => set('dueDate', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="inv-status">Status</Label>
              <EnumSelect
                id="inv-status"
                value={form.status}
                onChange={(v) => set('status', (v as AccInvoiceStatus) ?? 'draft')}
                options={ACC_INVOICE_STATUSES}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="inv-billing">Billing basis</Label>
              <EnumSelect
                id="inv-billing"
                value={form.billingType}
                onChange={(v) => set('billingType', (v as AccInvoiceBillingType) ?? 'other')}
                options={ACC_INVOICE_BILLING_TYPES}
              />
            </div>
          </div>

          {form.billingType === 'project' && (
            <div className="space-y-1.5">
              <Label htmlFor="inv-milestone">Milestone</Label>
              <Input
                id="inv-milestone"
                value={form.milestoneLabel}
                onChange={(e) => set('milestoneLabel', e.target.value)}
                placeholder="Phase 2 — design sign-off"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="inv-notes">Notes</Label>
            <Textarea
              id="inv-notes"
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              rows={2}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editing ? 'Save changes' : 'Create invoice'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface FormState {
  clientId: string | null;
  invoiceNumber: string;
  billingType: AccInvoiceBillingType;
  title: string;
  amountCents: number;
  issueDate: string;
  dueDate: string;
  status: AccInvoiceStatus;
  milestoneLabel: string;
  notes: string;
}

function blank(): FormState {
  return {
    clientId: null,
    invoiceNumber: '',
    billingType: 'other',
    title: '',
    amountCents: 0,
    issueDate: toYmdNY(new Date()),
    dueDate: '',
    status: 'draft',
    milestoneLabel: '',
    notes: '',
  };
}

function fromInvoice(inv: AccInvoice): FormState {
  return {
    clientId: refId(inv.clientId),
    invoiceNumber: inv.invoiceNumber,
    billingType: inv.billingType,
    title: inv.title ?? '',
    amountCents: inv.amountCents,
    issueDate: toYmdNY(new Date(inv.issueDate)),
    dueDate: inv.dueDate ? toYmdNY(new Date(inv.dueDate)) : '',
    status: inv.status,
    milestoneLabel: inv.milestoneLabel ?? '',
    notes: inv.notes ?? '',
  };
}

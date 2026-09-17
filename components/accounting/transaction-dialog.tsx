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
import { AccountSelect, CategorySelect, ClientSelect, EnumSelect } from './entity-select';
import { AccTransaction, AccTransactionInput, refId, transactionsApi } from '@/lib/accounting/api';
import { ACC_TRANSACTION_TYPES, AccTransactionType } from '@/lib/accounting/constants';
import { toYmdNY } from '@/lib/accounting/date';

/**
 * Add/edit dialog for a transaction. Amounts are typed in dollars and held in
 * cents by `MoneyInput`, so `amountCents` is already correct at submit.
 */
export function TransactionDialog({
  open,
  onOpenChange,
  editing,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: AccTransaction | null;
  onSaved: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(() => blank());

  // Repopulate whenever the dialog opens, so a previous row's values never
  // linger behind an "Add" click.
  useEffect(() => {
    if (!open) return;
    setForm(editing ? fromTransaction(editing) : blank());
  }, [open, editing]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.categoryId) {
      toast.error('Pick a category');
      return;
    }
    if (form.amountCents <= 0) {
      toast.error('Amount must be greater than zero');
      return;
    }

    const payload: AccTransactionInput = {
      date: form.date,
      type: form.type,
      amountCents: form.amountCents,
      categoryId: form.categoryId,
      accountId: form.accountId,
      clientId: form.clientId,
      vendor: form.vendor.trim(),
      description: form.description.trim(),
      receiptUrl: form.receiptUrl.trim() || null,
    };

    setSaving(true);
    try {
      if (editing) {
        await transactionsApi.update(editing._id, payload);
        toast.success('Transaction updated');
      } else {
        await transactionsApi.create(payload);
        toast.success('Transaction added');
      }
      onSaved();
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save the transaction');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !saving && onOpenChange(next)}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editing ? 'Edit transaction' : 'Add transaction'}</DialogTitle>
          <DialogDescription>
            Amounts are in USD. {editing?.source && editing.source !== 'manual' && (
              <>This entry came from <strong>{editing.source}</strong>.</>
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="tx-type">Direction</Label>
              <EnumSelect
                id="tx-type"
                value={form.type}
                onChange={(v) => {
                  // Category lists differ per direction, so clear the stale pick.
                  set('type', (v as AccTransactionType) ?? 'out');
                  set('categoryId', null);
                }}
                options={[
                  { value: 'in', label: 'Money in (income)' },
                  { value: 'out', label: 'Money out (expense)' },
                ]}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tx-amount">Amount</Label>
              <MoneyInput
                id="tx-amount"
                valueCents={form.amountCents}
                onChangeCents={(cents) => set('amountCents', cents)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="tx-date">Date</Label>
              <Input
                id="tx-date"
                type="date"
                value={form.date}
                onChange={(e) => set('date', e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tx-category">Category</Label>
              <CategorySelect
                id="tx-category"
                value={form.categoryId}
                onChange={(v) => set('categoryId', v)}
                type={form.type === 'in' ? 'income' : 'expense'}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="tx-account">Payment account</Label>
              <AccountSelect
                id="tx-account"
                value={form.accountId}
                onChange={(v) => set('accountId', v)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tx-client">Client</Label>
              <ClientSelect
                id="tx-client"
                value={form.clientId}
                onChange={(v) => set('clientId', v)}
                noneLabel="No client"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tx-vendor">Vendor</Label>
            <Input
              id="tx-vendor"
              value={form.vendor}
              onChange={(e) => set('vendor', e.target.value)}
              placeholder="Figma, Namecheap, …"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tx-description">Description</Label>
            <Textarea
              id="tx-description"
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={2}
              placeholder="What was this for?"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tx-receipt">Receipt URL</Label>
            <Input
              id="tx-receipt"
              type="url"
              value={form.receiptUrl}
              onChange={(e) => set('receiptUrl', e.target.value)}
              placeholder="https://…"
            />
            <p className="text-xs text-muted-foreground">
              Link to the invoice or receipt file — Drive, Dropbox, Cloudinary.
            </p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editing ? 'Save changes' : 'Add transaction'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface FormState {
  date: string;
  type: AccTransactionType;
  amountCents: number;
  categoryId: string | null;
  accountId: string | null;
  clientId: string | null;
  vendor: string;
  description: string;
  receiptUrl: string;
}

function blank(): FormState {
  return {
    date: toYmdNY(new Date()),
    type: ACC_TRANSACTION_TYPES[1], // default to an expense — the common case
    amountCents: 0,
    categoryId: null,
    accountId: null,
    clientId: null,
    vendor: '',
    description: '',
    receiptUrl: '',
  };
}

function fromTransaction(tx: AccTransaction): FormState {
  return {
    date: toYmdNY(new Date(tx.date)),
    type: tx.type,
    amountCents: tx.amountCents,
    categoryId: refId(tx.categoryId),
    accountId: refId(tx.accountId),
    clientId: refId(tx.clientId),
    vendor: tx.vendor ?? '',
    description: tx.description ?? '',
    receiptUrl: tx.receiptUrl ?? '',
  };
}

'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppSelector } from '@/store/hooks';
import { AccCategoryType } from '@/lib/accounting/constants';

/**
 * Dropdowns backed by the shared reference slice.
 *
 * Radix Select cannot hold an empty-string value, so "no selection" is carried
 * as the sentinel `__none` / `__all` and mapped back to null by the callers'
 * `onChange`.
 */

export const NONE = '__none';
export const ALL = '__all';

/** Clients come from the existing Client collection and are never written to. */
export function ClientSelect({
  value,
  onChange,
  includeAll = false,
  allowNone = true,
  noneLabel = 'No client (agency)',
  placeholder = 'Select client',
  disabled,
  id,
}: {
  value: string | null;
  onChange: (value: string | null) => void;
  includeAll?: boolean;
  allowNone?: boolean;
  noneLabel?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
}) {
  const clients = useAppSelector((s) => s.accounting.reference.clients);

  return (
    <Select
      value={value ?? (includeAll ? ALL : NONE)}
      onValueChange={(v) => onChange(v === NONE || v === ALL ? null : v)}
      disabled={disabled}
    >
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {includeAll && <SelectItem value={ALL}>All clients</SelectItem>}
        {!includeAll && allowNone && <SelectItem value={NONE}>{noneLabel}</SelectItem>}
        {clients.map((c) => (
          <SelectItem key={c._id} value={c._id}>
            {c.name}
            {c.company ? ` — ${c.company}` : ''}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function CategorySelect({
  value,
  onChange,
  type,
  includeAll = false,
  placeholder = 'Select category',
  disabled,
  id,
}: {
  value: string | null;
  onChange: (value: string | null) => void;
  /** Restricts the list to income or expense categories. */
  type?: AccCategoryType;
  includeAll?: boolean;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
}) {
  const categories = useAppSelector((s) => s.accounting.reference.categories);
  const visible = type ? categories.filter((c) => c.type === type) : categories;

  return (
    <Select
      value={value ?? (includeAll ? ALL : NONE)}
      onValueChange={(v) => onChange(v === NONE || v === ALL ? null : v)}
      disabled={disabled}
    >
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {includeAll && <SelectItem value={ALL}>All categories</SelectItem>}
        {visible.length === 0 && (
          <div className="px-2 py-3 text-xs text-muted-foreground">
            No categories yet — add them in Settings.
          </div>
        )}
        {visible.map((c) => (
          <SelectItem key={c._id} value={c._id}>
            <span className="flex items-center gap-2">
              {c.color && (
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: c.color }}
                />
              )}
              {c.name}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function AccountSelect({
  value,
  onChange,
  includeAll = false,
  placeholder = 'Select account',
  disabled,
  id,
}: {
  value: string | null;
  onChange: (value: string | null) => void;
  includeAll?: boolean;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
}) {
  const accounts = useAppSelector((s) => s.accounting.reference.accounts);

  return (
    <Select
      value={value ?? (includeAll ? ALL : NONE)}
      onValueChange={(v) => onChange(v === NONE || v === ALL ? null : v)}
      disabled={disabled}
    >
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {includeAll ? (
          <SelectItem value={ALL}>All accounts</SelectItem>
        ) : (
          <SelectItem value={NONE}>No account</SelectItem>
        )}
        {accounts.map((a) => (
          <SelectItem key={a._id} value={a._id}>
            {a.name}
            {a.last4 ? ` ••${a.last4}` : ''}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/** Generic enum dropdown used by the status/type filters. */
export function EnumSelect({
  value,
  onChange,
  options,
  includeAll = false,
  allLabel = 'All',
  placeholder,
  disabled,
  id,
  className,
}: {
  value: string | null;
  onChange: (value: string | null) => void;
  options: readonly string[] | readonly { value: string; label: string }[];
  includeAll?: boolean;
  allLabel?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}) {
  const items = options.map((o) => (typeof o === 'string' ? { value: o, label: labelise(o) } : o));

  return (
    <Select
      value={value ?? ALL}
      onValueChange={(v) => onChange(v === ALL ? null : v)}
      disabled={disabled}
    >
      <SelectTrigger id={id} className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {includeAll && <SelectItem value={ALL}>{allLabel}</SelectItem>}
        {items.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function labelise(value: string): string {
  return value.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

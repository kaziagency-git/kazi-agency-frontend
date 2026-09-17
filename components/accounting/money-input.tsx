'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { fromCents, toCents } from '@/lib/accounting/money';

/**
 * Dollar-facing input over a cents-backed value.
 *
 * The user types `49.99`; the parent always holds `4999`. Conversion happens
 * on every keystroke that parses, so nothing has to remember to convert at
 * submit time. While the field is being edited the raw text is kept as-is —
 * otherwise typing "1." would immediately rewrite itself to "1".
 */
export function MoneyInput({
  valueCents,
  onChangeCents,
  id,
  placeholder = '0.00',
  className,
  disabled,
  required,
}: {
  valueCents: number;
  onChangeCents: (cents: number) => void;
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}) {
  const [text, setText] = useState(() => centsToText(valueCents));
  const [focused, setFocused] = useState(false);

  // Follow the parent when it changes the value from outside (dialog reopened
  // on a different row, form reset), but never while the field has focus.
  useEffect(() => {
    if (!focused) setText(centsToText(valueCents));
  }, [valueCents, focused]);

  function handleChange(raw: string) {
    // Allow only digits with at most one dot and two decimals.
    if (raw !== '' && !/^\d*\.?\d{0,2}$/.test(raw)) return;
    setText(raw);

    if (raw === '' || raw === '.') {
      onChangeCents(0);
      return;
    }

    try {
      onChangeCents(toCents(raw));
    } catch {
      // Half-typed values like "12." simply do not update the parent yet.
    }
  }

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
        $
      </span>
      <Input
        id={id}
        inputMode="decimal"
        value={text}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          setText(centsToText(valueCents));
        }}
        onChange={(e) => handleChange(e.target.value)}
        className={cn('pl-7', className)}
      />
    </div>
  );
}

function centsToText(cents: number): string {
  if (!cents) return '';
  return fromCents(cents).toFixed(2);
}

import { SchemaDefinitionProperty } from 'mongoose';

/**
 * Shared field builders for the accounting schemas, so the integer-cents rule
 * is declared once instead of being re-typed on every money field.
 */

/**
 * A money field. Always an integer number of cents — a float reaching this
 * field is rejected by the validator rather than silently rounded.
 */
export function centsField(opts: { required?: boolean; min?: number; default?: number } = {}): SchemaDefinitionProperty<number> {
  const min = opts.min ?? 0;
  return {
    type: Number,
    required: opts.required ?? false,
    default: opts.default ?? 0,
    min: [min, `Amount must be at least ${min} cents`],
    validate: {
      validator: Number.isInteger,
      message: 'Amount must be an integer number of cents (no fractional cents)',
    },
  };
}

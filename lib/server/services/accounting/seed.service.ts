import { AccCategory } from '../../models/accounting/acc-category.model';
import {
  ACC_DEFAULT_EXPENSE_CATEGORIES,
  ACC_DEFAULT_INCOME_CATEGORIES,
  AccCategoryType,
} from '@/lib/accounting/constants';

export interface SeedCategoriesResult {
  created: string[];
  existing: string[];
}

/**
 * Seeds the default income/expense categories.
 *
 * Idempotent and upsert-only: running it again creates nothing and updates
 * nothing on categories that already exist, so a name or colour the admin
 * edited in the UI is never overwritten. Nothing is ever deleted.
 */
export async function seedDefaultCategories(): Promise<SeedCategoriesResult> {
  const defaults: Array<{ name: string; color: string; type: AccCategoryType }> = [
    ...ACC_DEFAULT_EXPENSE_CATEGORIES.map((c) => ({ ...c, type: 'expense' as const })),
    ...ACC_DEFAULT_INCOME_CATEGORIES.map((c) => ({ ...c, type: 'income' as const })),
  ];

  const created: string[] = [];
  const existing: string[] = [];

  for (const def of defaults) {
    // $setOnInsert only: an existing row is matched and left untouched.
    const res = await AccCategory.updateOne(
      { name: def.name, type: def.type },
      { $setOnInsert: { name: def.name, type: def.type, color: def.color, isActive: true } },
      { upsert: true, collation: { locale: 'en', strength: 2 } }
    );

    if (res.upsertedCount > 0) created.push(`${def.type}:${def.name}`);
    else existing.push(`${def.type}:${def.name}`);
  }

  return { created, existing };
}

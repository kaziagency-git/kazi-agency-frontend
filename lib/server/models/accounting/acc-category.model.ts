import mongoose, { Document, Schema } from 'mongoose';
import { ACC_CATEGORY_TYPES, AccCategoryType } from '@/lib/accounting/constants';

export interface IAccCategory extends Document {
  name: string;
  type: AccCategoryType;
  color: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const accCategorySchema = new Schema<IAccCategory>(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    type: { type: String, enum: [...ACC_CATEGORY_TYPES], required: true, index: true },
    color: { type: String, default: null, trim: true },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true, collection: 'acc_categories' }
);

// One category name per type. The collation makes it case-insensitive, so
// "Salary" and "salary" cannot both exist and split the same expense line.
accCategorySchema.index(
  { name: 1, type: 1 },
  { unique: true, collation: { locale: 'en', strength: 2 } }
);

export const AccCategory: mongoose.Model<IAccCategory> =
  (mongoose.models.AccCategory as mongoose.Model<IAccCategory>) ??
  mongoose.model<IAccCategory>('AccCategory', accCategorySchema);

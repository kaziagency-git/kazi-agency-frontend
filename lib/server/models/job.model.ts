import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  slug: string;
  department: string;
  location: string;
  level: 'Entry-Level' | 'Mid-Level' | 'Senior' | 'Lead';
  type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship';
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    department: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    level: {
      type: String,
      enum: ['Entry-Level', 'Mid-Level', 'Senior', 'Lead'],
      required: true,
    },
    type: {
      type: String,
      enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship'],
      default: 'Full-Time',
    },
    description: { type: String, required: true },
    responsibilities: [{ type: String }],
    requirements: [{ type: String }],
    benefits: [{ type: String }],
    isPublished: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
);

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

jobSchema.pre('save', async function (next) {
  if (!this.isModified('title') && this.slug) return next();

  const base = toSlug(this.title);
  let slug = base;
  let counter = 1;

  while (await Job.exists({ slug, _id: { $ne: this._id } })) {
    slug = `${base}-${counter++}`;
  }
  this.slug = slug;
  next();
});

export const Job: mongoose.Model<IJob> =
  (mongoose.models.Job as mongoose.Model<IJob>) ?? mongoose.model<IJob>('Job', jobSchema);

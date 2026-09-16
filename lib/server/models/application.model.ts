import mongoose, { Document, Schema, Types } from 'mongoose';

export type ApplicationStatus = 'new' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';

export interface IApplication extends Document {
  jobId: Types.ObjectId | null;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  roleApplied: string;
  experienceYears: string;
  availableImmediately: 'yes' | 'no';
  resumeFileName: string | null;
  resumeUrl: string | null;
  consent: boolean;
  status: ApplicationStatus;
  adminNotes: string;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', default: null, index: true },
    jobTitle: { type: String, required: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true },
    roleApplied: { type: String, required: true, trim: true },
    experienceYears: { type: String, required: true },
    availableImmediately: { type: String, enum: ['yes', 'no'], required: true },
    resumeFileName: { type: String, default: null },
    resumeUrl: { type: String, default: null },
    consent: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'shortlisted', 'rejected', 'hired'],
      default: 'new',
      index: true,
    },
    adminNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Application: mongoose.Model<IApplication> =
  (mongoose.models.Application as mongoose.Model<IApplication>) ??
  mongoose.model<IApplication>('Application', applicationSchema);

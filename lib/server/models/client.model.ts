import mongoose, { Document, Schema, Types } from 'mongoose';

export type ClientStatus = 'pending' | 'active' | 'inactive';
export type ClientSource = 'manual' | 'book-a-consultation' | 'brand-onboarding' | 'n8n';
export type MilestoneStatus = 'pending' | 'in-progress' | 'completed';
export type ServiceProjectStatus = 'not-started' | 'in-progress' | 'completed';

export interface IServiceMilestone {
  _id: Types.ObjectId;
  title: string;
  description: string;
  status: MilestoneStatus;
  dueDate: Date | null;
  completedAt: Date | null;
}

export interface IServiceProject {
  _id: Types.ObjectId;
  serviceName: string;
  status: ServiceProjectStatus;
  currentPhase: string;
  progress: number;
  startDate: Date | null;
  notes: string;
  milestones: Types.DocumentArray<IServiceMilestone>;
}

export interface IExtraField {
  key: string;
  value: string;
}

export interface IClient extends Document {
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  passwordHash: string | null;
  setupToken: string | null;
  setupTokenExpiry: Date | null;
  status: ClientStatus;
  source: ClientSource;
  accountManager: string;
  adminNotes: string;
  extraFields: IExtraField[];
  serviceProjects: Types.DocumentArray<IServiceProject>;
  createdAt: Date;
  updatedAt: Date;
}

const serviceMilestoneSchema = new Schema<IServiceMilestone>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    dueDate: { type: Date, default: null },
    completedAt: { type: Date, default: null },
  },
  { _id: true }
);

const serviceProjectSchema = new Schema<IServiceProject>(
  {
    serviceName: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed'],
      default: 'not-started',
    },
    currentPhase: { type: String, default: '' },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    startDate: { type: Date, default: null },
    notes: { type: String, default: '' },
    milestones: [serviceMilestoneSchema],
  },
  { _id: true }
);

const extraFieldSchema = new Schema<IExtraField>(
  {
    key: { type: String, required: true, trim: true },
    value: { type: String, default: '' },
  },
  { _id: false }
);

const clientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    phone: { type: String, default: '' },
    company: { type: String, default: '', trim: true },
    services: [{ type: String }],
    passwordHash: { type: String, default: null },
    setupToken: { type: String, default: null, index: true },
    setupTokenExpiry: { type: Date, default: null },
    status: {
      type: String,
      enum: ['pending', 'active', 'inactive'],
      default: 'pending',
      index: true,
    },
    source: {
      type: String,
      enum: ['manual', 'book-a-consultation', 'brand-onboarding', 'n8n'],
      default: 'manual',
    },
    accountManager: { type: String, default: '' },
    adminNotes: { type: String, default: '' },
    extraFields: { type: [extraFieldSchema], default: [] },
    serviceProjects: [serviceProjectSchema],
  },
  { timestamps: true }
);

export const Client: mongoose.Model<IClient> =
  (mongoose.models.Client as mongoose.Model<IClient>) ??
  mongoose.model<IClient>('Client', clientSchema);

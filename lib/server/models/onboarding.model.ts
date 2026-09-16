import mongoose, { Document, Schema, Types } from 'mongoose';
import crypto from 'crypto';

export interface ICustomField {
  _id: Types.ObjectId;
  label: string;
  value: string;
  addedBy: 'admin' | 'client';
}

export interface IOnboardingForm extends Document {
  email: string;
  clientId: string | null;

  // Section 1
  companyName: string;
  primaryContact: string;
  bestContactEmail: string;
  phoneContact: string;
  preferredCommsChannel: string;
  websiteDomain: string;
  targetLaunchDate: string;

  // Section 2
  logoAssetsLink: string;
  primaryBrandColor: string;
  secondaryColor: string;
  accentColor: string;
  preferredTheme: string;
  preferredHeadingFont: string;
  preferredBodyFont: string;
  referenceSites: string;
  brandGuidelinesLink: string;

  // Section 3
  domainRegistrar: string;
  hostingProvider: string;
  githubUsernames: string;
  existingSiteCmsAccess: string;

  // Section 4
  googleAccountEmail: string;
  googleToolsExisting: string[];
  googleAccessNotes: string;

  // Section 5
  telegram: string;
  facebookMeta: string;
  instagram: string;
  twitter: string;
  tiktok: string;
  youtube: string;
  linkedin: string;

  // Section 6
  crmType: string;
  crmAccessDetails: string;

  // Section 7
  additionalNotes: string;

  // Extra fields
  customFields: ICustomField[];

  shareToken: string;
  lastEditedBy: 'admin' | 'client' | null;
  createdAt: Date;
  updatedAt: Date;
}

const customFieldSchema = new Schema<ICustomField>(
  {
    label: { type: String, required: true, trim: true, maxlength: 200 },
    value: { type: String, default: '', maxlength: 5000 },
    addedBy: { type: String, enum: ['admin', 'client'], required: true },
  },
  { _id: true }
);

const onboardingSchema = new Schema<IOnboardingForm>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    clientId: { type: String, default: null },

    companyName: { type: String, default: '' },
    primaryContact: { type: String, default: '' },
    bestContactEmail: { type: String, default: '' },
    phoneContact: { type: String, default: '' },
    preferredCommsChannel: { type: String, default: '' },
    websiteDomain: { type: String, default: '' },
    targetLaunchDate: { type: String, default: '' },

    logoAssetsLink: { type: String, default: '' },
    primaryBrandColor: { type: String, default: '' },
    secondaryColor: { type: String, default: '' },
    accentColor: { type: String, default: '' },
    preferredTheme: { type: String, default: '' },
    preferredHeadingFont: { type: String, default: '' },
    preferredBodyFont: { type: String, default: '' },
    referenceSites: { type: String, default: '' },
    brandGuidelinesLink: { type: String, default: '' },

    domainRegistrar: { type: String, default: '' },
    hostingProvider: { type: String, default: '' },
    githubUsernames: { type: String, default: '' },
    existingSiteCmsAccess: { type: String, default: '' },

    googleAccountEmail: { type: String, default: '' },
    googleToolsExisting: [{ type: String }],
    googleAccessNotes: { type: String, default: '' },

    telegram: { type: String, default: '' },
    facebookMeta: { type: String, default: '' },
    instagram: { type: String, default: '' },
    twitter: { type: String, default: '' },
    tiktok: { type: String, default: '' },
    youtube: { type: String, default: '' },
    linkedin: { type: String, default: '' },

    crmType: { type: String, default: '' },
    crmAccessDetails: { type: String, default: '' },

    additionalNotes: { type: String, default: '' },

    customFields: { type: [customFieldSchema], default: [] },

    shareToken: { type: String, required: true, unique: true, index: true },
    lastEditedBy: { type: String, enum: ['admin', 'client'], default: null },
  },
  { timestamps: true }
);

onboardingSchema.pre('validate', function (next) {
  if (!this.shareToken) {
    this.shareToken = crypto.randomBytes(32).toString('hex');
  }
  next();
});

export const OnboardingForm: mongoose.Model<IOnboardingForm> =
  (mongoose.models.OnboardingForm as mongoose.Model<IOnboardingForm>) ??
  mongoose.model<IOnboardingForm>('OnboardingForm', onboardingSchema);

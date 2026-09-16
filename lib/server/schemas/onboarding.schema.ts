import { z } from 'zod';

const str = z.string().max(2000).optional().default('');
const longStr = z.string().max(5000).optional().default('');

export const createOnboardingSchema = z.object({
  email: z.string().email('Invalid email'),
  clientId: z.string().optional().nullable(),
});

export const updateOnboardingSchema = z.object({
  companyName: str,
  primaryContact: str,
  bestContactEmail: str,
  phoneContact: str,
  preferredCommsChannel: str,
  websiteDomain: str,
  targetLaunchDate: str,

  logoAssetsLink: longStr,
  primaryBrandColor: str,
  secondaryColor: str,
  accentColor: str,
  preferredTheme: str,
  preferredHeadingFont: str,
  preferredBodyFont: str,
  referenceSites: longStr,
  brandGuidelinesLink: longStr,

  domainRegistrar: longStr,
  hostingProvider: longStr,
  githubUsernames: str,
  existingSiteCmsAccess: longStr,

  googleAccountEmail: str,
  googleToolsExisting: z.array(z.string()).optional().default([]),
  googleAccessNotes: longStr,

  telegram: longStr,
  facebookMeta: longStr,
  instagram: longStr,
  twitter: longStr,
  tiktok: longStr,
  youtube: longStr,
  linkedin: longStr,

  crmType: str,
  crmAccessDetails: longStr,

  additionalNotes: longStr,

  customFields: z.array(
    z.object({
      _id: z.string().optional(),
      label: z.string().min(1).max(200),
      value: z.string().max(5000).optional().default(''),
      addedBy: z.enum(['admin', 'client']),
    })
  ).optional().default([]),
});

export type CreateOnboardingInput = z.infer<typeof createOnboardingSchema>;
export type UpdateOnboardingInput = z.infer<typeof updateOnboardingSchema>;

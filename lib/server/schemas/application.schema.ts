import { z } from 'zod';

export const submitApplicationSchema = z.object({
  jobId: z.string().nullable().optional(),
  jobTitle: z.string().min(1, 'Job title is required'),
  fullName: z.string().min(1, 'Full name is required').max(120),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required').max(30),
  roleApplied: z.string().min(1, 'Role applied is required'),
  experienceYears: z.string().min(1, 'Experience is required'),
  availableImmediately: z.enum(['yes', 'no']),
  resumeFileName: z.string().nullable().optional(),
  resumeUrl: z.string().url('Invalid URL').nullable().optional(),
  consent: z
    .union([z.boolean(), z.string()])
    .transform((v) => v === true || v === 'true' || v === 'on'),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum(['new', 'reviewed', 'shortlisted', 'rejected', 'hired']),
});

export const updateAdminNotesSchema = z.object({
  adminNotes: z.string().max(2000),
});

export type SubmitApplicationInput = z.infer<typeof submitApplicationSchema>;

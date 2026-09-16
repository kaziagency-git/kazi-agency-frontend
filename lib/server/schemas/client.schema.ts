import { z } from 'zod';

const extraFieldSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.string().max(1000).default(''),
});

export const createClientSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  email: z.string().email('Invalid email'),
  phone: z.string().max(30).optional().default(''),
  company: z.string().max(120).optional().default(''),
  services: z.array(z.string()).optional().default([]),
  accountManager: z.string().max(120).optional().default(''),
  adminNotes: z.string().max(2000).optional().default(''),
  extraFields: z.array(extraFieldSchema).optional().default([]),
  source: z.enum(['manual', 'book-a-consultation', 'brand-onboarding', 'n8n']).optional().default('manual'),
});

export const updateClientSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  phone: z.string().max(30).optional(),
  company: z.string().max(120).optional(),
  services: z.array(z.string()).optional(),
  accountManager: z.string().max(120).optional(),
  adminNotes: z.string().max(2000).optional(),
  extraFields: z.array(extraFieldSchema).optional(),
  status: z.enum(['pending', 'active', 'inactive']).optional(),
});

// ── Service Projects ───────────────────────────────────────────────────────

export const addServiceProjectSchema = z.object({
  serviceName: z.string().min(1, 'Service name is required').max(150),
  status: z.enum(['not-started', 'in-progress', 'completed']).optional().default('not-started'),
  currentPhase: z.string().max(200).optional().default(''),
  progress: z.number().min(0).max(100).optional().default(0),
  startDate: z.string().nullable().optional(),
  notes: z.string().max(5000).optional().default(''),
});

export const updateServiceProjectSchema = z.object({
  status: z.enum(['not-started', 'in-progress', 'completed']).optional(),
  currentPhase: z.string().max(200).optional(),
  progress: z.number().min(0).max(100).optional(),
  startDate: z.string().nullable().optional(),
  notes: z.string().max(5000).optional(),
});

// ── Service Milestones ─────────────────────────────────────────────────────

export const addServiceMilestoneSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional().default(''),
  status: z.enum(['pending', 'in-progress', 'completed']).optional().default('pending'),
  dueDate: z.string().nullable().optional(),
});

export const updateServiceMilestoneSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  status: z.enum(['pending', 'in-progress', 'completed']).optional(),
  dueDate: z.string().nullable().optional(),
});

// ── Auth ───────────────────────────────────────────────────────────────────

export const setPasswordSchema = z.object({
  token: z.string().min(1, 'Token is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const clientLoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export const adminChangePasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const webhookClientSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(30).optional().default(''),
  company: z.string().max(120).optional().default(''),
  services: z.array(z.string()).optional().default([]),
  source: z.enum(['book-a-consultation', 'brand-onboarding', 'n8n']).optional().default('n8n'),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof updateClientSchema>;
export type AddServiceProjectInput = z.infer<typeof addServiceProjectSchema>;
export type UpdateServiceProjectInput = z.infer<typeof updateServiceProjectSchema>;
export type AddServiceMilestoneInput = z.infer<typeof addServiceMilestoneSchema>;
export type UpdateServiceMilestoneInput = z.infer<typeof updateServiceMilestoneSchema>;
export type SetPasswordInput = z.infer<typeof setPasswordSchema>;
export type ClientLoginInput = z.infer<typeof clientLoginSchema>;
export type AdminChangePasswordInput = z.infer<typeof adminChangePasswordSchema>;
export type WebhookClientInput = z.infer<typeof webhookClientSchema>;

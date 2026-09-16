import { z } from 'zod';

const jobLevels = ['Entry-Level', 'Mid-Level', 'Senior', 'Lead'] as const;
const jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Internship'] as const;

export const createJobSchema = z.object({
  title: z.string().min(1, 'Title is required').max(120),
  department: z.string().min(1, 'Department is required').max(80),
  location: z.string().min(1, 'Location is required').max(100),
  level: z.enum(jobLevels),
  type: z.enum(jobTypes).default('Full-Time'),
  description: z.string().min(1, 'Description is required'),
  responsibilities: z.array(z.string().min(1)).default([]),
  requirements: z.array(z.string().min(1)).default([]),
  benefits: z.array(z.string().min(1)).default([]),
  isPublished: z.boolean().default(false),
});

export const updateJobSchema = createJobSchema.partial();

export const publishJobSchema = z.object({
  isPublished: z.boolean(),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;

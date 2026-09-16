import { z } from 'zod';

export const createTicketSchema = z.object({
  subject: z.string().min(1, 'Subject is required').max(200),
  category: z.enum(['Technical', 'Billing', 'Reporting', 'Strategy', 'Other']),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']).optional().default('Medium'),
  message: z.string().max(10000).default(''),
  attachments: z.array(z.object({
    url: z.string().url(),
    originalName: z.string().min(1),
    size: z.number().nonnegative(),
    mimetype: z.string().min(1),
  })).optional().default([]),
});

const attachmentSchema = z.object({
  url: z.string().url(),
  originalName: z.string().min(1),
  size: z.number().nonnegative(),
  mimetype: z.string().min(1),
});

export const replyTicketSchema = z
  .object({
    content: z.string().max(10000).default(''),
    attachments: z.array(attachmentSchema).optional().default([]),
  })
  .refine((d) => d.content.trim().length > 0 || d.attachments.length > 0, {
    message: 'Reply must have a message or at least one attachment',
  });

export const updateTicketStatusSchema = z.object({
  status: z.enum(['open', 'in-progress', 'resolved', 'closed']),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type ReplyTicketInput = z.infer<typeof replyTicketSchema>;

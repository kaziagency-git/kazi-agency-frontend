import { z } from "zod";

export const ISSUE_CATEGORIES = [
  "website_issue",
  "crm_pipeline",
  "marketing_automation",
  "seo_services",
  "social_media",
  "paid_advertising",
  "billing_invoicing",
  "account_access",
  "general_inquiry",
  "other",
] as const;

export const PRIORITY_LEVELS = ["low", "medium", "high", "urgent"] as const;

export const issueCategoryLabels: Record<(typeof ISSUE_CATEGORIES)[number], string> = {
  website_issue: "Website Issue",
  crm_pipeline: "CRM & Pipeline",
  marketing_automation: "Marketing Automation",
  seo_services: "SEO Services",
  social_media: "Social Media",
  paid_advertising: "Paid Advertising",
  billing_invoicing: "Billing & Invoicing",
  account_access: "Account Access",
  general_inquiry: "General Inquiry",
  other: "Other",
};

export const priorityLabels: Record<(typeof PRIORITY_LEVELS)[number], string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export const supportFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  businessName: z.string().min(1, "Business name is required"),
  phone: z.string().optional(),
  issueCategory: z.enum(ISSUE_CATEGORIES, {
    errorMap: () => ({ message: "Please select an issue category" }),
  }),
  priority: z.enum(PRIORITY_LEVELS, {
    errorMap: () => ({ message: "Please select a priority level" }),
  }),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(20, "Please describe your issue in at least 20 characters"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to be contacted regarding this issue" }),
  }),
});

export type SupportFormData = z.infer<typeof supportFormSchema>;

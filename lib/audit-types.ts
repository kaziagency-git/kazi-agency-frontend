export const BUSINESS_TYPES = [
  "Local Business",
  "Ecommerce",
  "SaaS",
  "Agency",
  "Real Estate",
  "Healthcare",
  "Restaurant",
  "Coaching",
  "Finance",
  "Education",
  "Personal Brand",
] as const;

export const MAIN_GOALS = [
  "More Leads",
  "More Sales",
  "Better SEO",
  "Improve Branding",
  "Automation",
  "Grow Social Media",
  "Improve Conversion Rate",
] as const;

export const CHANNEL_OPTIONS = [
  "SEO",
  "Google Ads",
  "Facebook Ads",
  "Instagram",
  "LinkedIn",
  "Email Marketing",
  "Referral",
  "Cold Outreach",
] as const;

export const LEAD_RANGES = [
  "0-25",
  "26-100",
  "101-300",
  "301-1000",
  "1000+",
] as const;

export const AUDIT_FOCUS_AREAS = [
  "SEO and visibility",
  "Lead generation funnel",
  "Conversion optimization",
  "Brand positioning",
  "Automation systems",
] as const;

export type BusinessType = (typeof BUSINESS_TYPES)[number];
export type MainGoal = (typeof MAIN_GOALS)[number];
export type ChannelOption = (typeof CHANNEL_OPTIONS)[number];
export type LeadRange = (typeof LEAD_RANGES)[number];
export type AuditFocusArea = (typeof AUDIT_FOCUS_AREAS)[number];

export interface AuditRequestPayload {
  businessName: string;
  website?: string;
  businessType: BusinessType;
  mainGoal: MainGoal;
  challenge: string;
  targetAudience: string;
  monthlyLeads: LeadRange;
  currentChannels: ChannelOption[];
  auditFocus: AuditFocusArea;
  email: string;
  socialLinks?: string;
  additionalContext?: string;
  timestamp: string;
}

export interface AuditResponsePayload {
  success: boolean;
  overallScore: number;
  summary: string;
  topIssues: string[];
  pdfUrl: string;
}

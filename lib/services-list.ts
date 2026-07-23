export const AGENCY_SERVICES = [
  'SEO (Search Engine Optimization)',
  'Social Media Management',
  'Paid Advertising (PPC)',
  'Content Marketing',
  'Web Design & Development',
  'Email Marketing',
  'Brand Strategy',
  'Graphic Design',
  'Video Production',
  'Influencer Marketing',
  'Copywriting',
  'Analytics & Reporting',
] as const;

export type AgencyService = (typeof AGENCY_SERVICES)[number];

import type { Metadata } from "next";
import TechstackProCaseStudy from "./techstack-pro-case-study";

export const metadata: Metadata = {
  title: "B2B Lead Generation Machine: +284% Qualified Leads & $2.1M Pipeline | Kazi Agency",
  description:
    "How Kazi Agency built TechStack Pro a full outbound and inbound lead generation engine — eliminating 12 hrs/rep/week of manual prospecting and generating $2.1M in qualified pipeline in 4 months.",
  keywords: [
    "B2B lead generation case study",
    "SaaS pipeline building",
    "outbound sales automation",
    "LinkedIn lead generation",
    "cold email B2B",
    "CRM automation HubSpot",
    "AI lead enrichment",
    "Kazi Agency lead generation",
  ],
  alternates: {
    canonical: "/case-studies/techstack-pro-lead-generation",
  },
  openGraph: {
    title: "B2B Lead Generation Machine: $2.1M Pipeline in 4 Months | Kazi Agency",
    description:
      "A deep-dive into how TechStack Pro went from 11 referral-only leads per month to 42 qualified leads, a $2.1M pipeline, and 12 recovered hours per rep per week.",
    type: "article",
    url: "https://kaziagency.com/case-studies/techstack-pro-lead-generation",
  },
  twitter: {
    card: "summary_large_image",
    title: "+284% Qualified Leads & $2.1M Pipeline for TechStack Pro | Kazi Agency",
    description:
      "From 11 to 42 qualified leads/month, $2.1M pipeline, +41% close rate. See exactly how we built the system.",
  },
};

export default function Page() {
  return <TechstackProCaseStudy />;
}

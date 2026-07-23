import type { Metadata } from "next";
import PremierHvacCaseStudy from "./premier-hvac-case-study";

export const metadata: Metadata = {
  title: "Local Business SEO Domination: +312% Organic Traffic in 6 Months | Kazi Agency",
  description:
    "How Kazi Agency helped Premier HVAC Solutions dominate 47 local keywords, grow organic traffic by 312%, generate 89 new monthly leads, and add $127K in attributable revenue in just 6 months.",
  keywords: [
    "HVAC SEO case study",
    "local SEO results",
    "organic traffic growth",
    "local business SEO",
    "Google Business Profile optimization",
    "local keyword ranking",
    "home services SEO",
    "Kazi Agency SEO",
  ],
  alternates: {
    canonical: "/case-studies/premier-hvac-seo-domination",
  },
  openGraph: {
    title: "Local Business SEO Domination: +312% Organic Traffic in 6 Months",
    description:
      "A deep-dive into how Premier HVAC Solutions went from page 3 obscurity to dominating 47 local keywords and generating $127K in new revenue through strategic local SEO.",
    type: "article",
    url: "https://kaziagency.com/case-studies/premier-hvac-seo-domination",
  },
  twitter: {
    card: "summary_large_image",
    title: "+312% Organic Traffic for Premier HVAC | Kazi Agency Case Study",
    description:
      "47 keywords at #1, 89 new monthly leads, $127K in revenue. See exactly how we did it.",
  },
};

export default function Page() {
  return <PremierHvacCaseStudy />;
}

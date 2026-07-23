import type { Metadata } from "next";
import ApexWellnessCaseStudy from "./apex-wellness-case-study";

export const metadata: Metadata = {
  title: "Marketing Automation That Doubled Conversions: +217% Bookings & $180K Recovered | Kazi Agency",
  description:
    "How Kazi Agency automated Apex Wellness Group's full client lifecycle — cutting lead response time from 6+ hours to 4.2 minutes, reducing no-shows by 58%, and recovering $180K in annual revenue in 5 months.",
  keywords: [
    "marketing automation case study",
    "wellness business automation",
    "no-show reduction system",
    "lead response automation",
    "GoHighLevel CRM",
    "appointment booking automation",
    "health and wellness marketing",
    "Kazi Agency automation",
  ],
  alternates: {
    canonical: "/case-studies/apex-wellness-marketing-automation",
  },
  openGraph: {
    title: "Marketing Automation: +217% Bookings & $180K Recovered for Apex Wellness | Kazi Agency",
    description:
      "A deep-dive into how Apex Wellness Group went from 38% no-shows and 6-hour response times to 215 monthly bookings and $180K in recovered annual revenue — in 5 months.",
    type: "article",
    url: "https://kaziagency.com/case-studies/apex-wellness-marketing-automation",
  },
  twitter: {
    card: "summary_large_image",
    title: "+217% Bookings & $180K Recovered for Apex Wellness Group | Kazi Agency",
    description:
      "From 38% no-shows and 6-hour response times to 215 bookings/month and $180K recovered. See exactly how we built the automation system.",
  },
};

export default function Page() {
  return <ApexWellnessCaseStudy />;
}

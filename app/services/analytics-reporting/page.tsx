import type { Metadata } from "next";
import AnalyticsReportingPage from "./analytics-reporting-page";

export const metadata: Metadata = {
  title: "Analytics & Reporting Services | Kazi Agency",
  description:
    "Unified marketing analytics and automated monthly reporting that connects your ads, SEO, CRM, and social into one live dashboard. AI-powered insights, ROI attribution, and executive reports — live in under 2 weeks.",
  keywords: [
    "marketing analytics service",
    "business reporting agency",
    "unified marketing dashboard",
    "marketing ROI reporting",
    "CRM analytics reporting",
    "paid ad attribution tracking",
    "SEO performance reporting",
    "Google Analytics 4 setup",
    "Mixpanel alternative",
    "Databox alternative",
    "automated monthly reports",
    "marketing data dashboard",
    "conversion funnel analytics",
    "digital marketing reporting service",
    "analytics setup for small business",
  ],
  authors: [{ name: "Kazi Agency" }],
  creator: "Kazi Agency",
  publisher: "Kazi Agency",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  alternates: {
    canonical: "https://kaziagency.com/services/analytics-reporting",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaziagency.com/services/analytics-reporting",
    siteName: "Kazi Agency",
    title: "Analytics & Reporting Services | Kazi Agency",
    description:
      "Stop guessing and start growing with data. Kazi Agency builds a unified analytics dashboard connecting your ads, SEO, CRM, and social — with automated monthly reports and AI-powered recommendations.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kazi Agency — Analytics & Reporting Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Analytics & Reporting Services | Kazi Agency",
    description:
      "One live dashboard. Automated monthly reports. AI-powered insights. The analytics setup that replaces Mixpanel, Databox, and manual spreadsheets — built and managed for you.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function Page() {
  return <AnalyticsReportingPage />;
}

import type { Metadata } from "next";
import PaidAdvertisingPage from "./paid-advertising-page";

export const metadata: Metadata = {
  title: "Paid Advertising (PPC) | Meta, Google & LinkedIn Ads | Kazi Agency",
  description:
    "Full-service PPC management across Meta, Google Ads, and LinkedIn. AI-powered creative testing, server-side conversion tracking, landing page optimisation, and monthly ROI reporting. Free ad account audit available.",
  keywords: [
    "PPC management agency",
    "paid advertising agency",
    "Google Ads management",
    "Meta ads management",
    "Facebook advertising agency",
    "Instagram ads agency",
    "LinkedIn ads management",
    "paid search agency",
    "Google Ads for small business",
    "performance marketing agency",
    "ROI-focused PPC agency",
    "ad account management",
    "paid social media advertising",
    "PPC lead generation",
    "conversion rate optimisation PPC",
    "Google Ads campaign management",
    "Meta Business Suite management",
    "PPC audit service",
    "cost per lead PPC",
    "B2B paid advertising agency",
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
    canonical: "https://kaziagency.com/services/paid-advertising",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaziagency.com/services/paid-advertising",
    siteName: "Kazi Agency",
    title: "Paid Advertising (PPC) | Meta, Google & LinkedIn Ads | Kazi Agency",
    description:
      "Stop burning ad budget. Kazi Agency manages your Meta, Google, and LinkedIn ads end-to-end — strategy, creative, tracking, and optimisation — with every lead flowing straight into your CRM. Free ad audit available.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kazi Agency — Paid Advertising (PPC) Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paid Advertising (PPC) | Meta, Google & LinkedIn Ads | Kazi Agency",
    description:
      "Full-service PPC across Meta, Google & LinkedIn. AI creative testing, server-side tracking, and monthly ROI reporting. Every lead goes straight into your pipeline. Free audit available.",
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
  return <PaidAdvertisingPage />;
}

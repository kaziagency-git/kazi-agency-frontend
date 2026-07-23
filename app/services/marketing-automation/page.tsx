import type { Metadata } from "next";
import MarketingAutomationPage from "./marketing-automation-page";

export const metadata: Metadata = {
  title: "Marketing Automation Services | Kazi Agency",
  description:
    "Done-for-you marketing automation: email sequences, SMS workflows, and behavioural triggers that nurture leads 24/7. Built, copy-written, and managed by Kazi Agency. Book a free audit.",
  keywords: [
    "marketing automation agency",
    "email automation service",
    "SMS marketing automation",
    "done-for-you marketing automation",
    "lead nurture automation",
    "GoHighLevel marketing automation",
    "email drip campaign setup",
    "behavioural trigger automation",
    "marketing automation for small business",
    "automated lead follow-up",
    "ActiveCampaign alternative",
    "Mailchimp alternative agency",
    "multi-channel marketing automation",
    "email marketing automation agency",
    "sales funnel automation",
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
    canonical: "https://kaziagency.com/services/marketing-automation",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaziagency.com/services/marketing-automation",
    siteName: "Kazi Agency",
    title: "Marketing Automation Services | Kazi Agency",
    description:
      "Email, SMS, and behavioural automation built, written, and managed for you. Stop sending manual follow-ups — let your pipeline run on autopilot. Free audit available.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kazi Agency — Marketing Automation Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketing Automation Services | Kazi Agency",
    description:
      "Done-for-you email, SMS & behavioural automation. We build the sequences, write the copy, and run the system — you focus on closing. Free audit available.",
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
  return <MarketingAutomationPage />;
}

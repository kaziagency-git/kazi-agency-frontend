import type { Metadata } from "next";
import CRMPipelineManagementPage from "./crm-pipeline-management-page";

export const metadata: Metadata = {
  title: "CRM & Pipeline Management Services | Kazi Agency",
  description:
    "Stop losing leads to slow follow-up. Kazi Agency builds your complete CRM and automated sales pipeline on GoHighLevel — custom-configured, done-for-you, and live in 2–3 weeks. Book a free audit.",
  keywords: [
    "CRM setup service",
    "sales pipeline management",
    "GoHighLevel CRM setup",
    "CRM for small business",
    "automated lead follow-up",
    "sales automation agency",
    "CRM pipeline management agency",
    "HubSpot alternative",
    "done-for-you CRM setup",
    "lead management software setup",
    "CRM integration service",
    "automated sales pipeline",
    "CRM consultants",
    "GoHighLevel agency",
    "lead nurturing automation",
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
    canonical: "https://kaziagency.com/services/crm-pipeline-management",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaziagency.com/services/crm-pipeline-management",
    siteName: "Kazi Agency",
    title: "CRM & Pipeline Management Services | Kazi Agency",
    description:
      "Custom CRM setup and automated sales pipelines that stop leads falling through the cracks. Built on GoHighLevel, done-for-you, live in 2–3 weeks.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kazi Agency — CRM & Pipeline Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CRM & Pipeline Management Services | Kazi Agency",
    description:
      "Stop losing leads. We build your full CRM, automated follow-up sequences, and sales pipeline — done-for-you and live in 3 weeks. Free audit available.",
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
  return <CRMPipelineManagementPage />;
}

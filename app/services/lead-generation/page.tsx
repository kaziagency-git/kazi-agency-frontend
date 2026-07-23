import type { Metadata } from "next";
import LeadGenerationPage from "./lead-generation-page";

export const metadata: Metadata = {
  title: "Lead Generation Services | AI Chatbots & Smart Capture Funnels | Kazi Agency",
  description:
    "End-to-end lead generation: AI chatbots, smart capture funnels, lead scoring, automated follow-up, and CRM integration. Kazi Agency builds the system that qualifies and delivers high-intent leads to your pipeline 24/7. Free lead audit available.",
  keywords: [
    "lead generation agency",
    "lead generation services",
    "AI chatbot lead generation",
    "lead capture funnel",
    "lead qualification system",
    "automated lead nurturing",
    "lead scoring CRM",
    "B2B lead generation agency",
    "lead generation for service businesses",
    "smart form lead capture",
    "lead magnet strategy",
    "lead gen automation",
    "GoHighLevel lead generation",
    "website lead capture",
    "lead generation system",
    "qualified lead generation",
    "lead pipeline management",
    "chatbot lead qualification",
    "inbound lead generation",
    "lead generation funnel build",
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
    canonical: "https://kaziagency.com/services/lead-generation",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaziagency.com/services/lead-generation",
    siteName: "Kazi Agency",
    title: "Lead Generation Services | AI Chatbots & Smart Capture Funnels | Kazi Agency",
    description:
      "Stop losing visitors. Kazi Agency builds complete lead generation systems — AI chatbots, smart forms, lead scoring, and automated follow-up — so every enquiry is captured, qualified, and delivered to your CRM automatically. Free audit available.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kazi Agency — Lead Generation Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lead Generation Services | AI Chatbots & Smart Capture Funnels | Kazi Agency",
    description:
      "AI chatbots, smart funnels, lead scoring, and automated follow-up — all connected to your CRM. We build the system that qualifies and delivers leads 24/7. Free lead audit available.",
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
  return <LeadGenerationPage />;
}

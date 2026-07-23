import type { Metadata } from "next";
import ServicesPage from "./services-page";

export const metadata: Metadata = {
  title: "Services | Kazi Agency — AI-Powered Marketing & Growth Services",
  description:
    "Explore Kazi Agency's full suite of services: AI website design, CRM setup, SEO, paid advertising, social media management, lead generation, and more — all in one platform.",
  keywords: [
    "digital marketing services",
    "AI marketing agency",
    "CRM setup",
    "SEO services",
    "paid advertising agency",
    "social media management",
    "lead generation services",
    "marketing automation",
    "reputation management",
    "appointment scheduling software",
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
    canonical: "https://kaziagency.com/services",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaziagency.com/services",
    siteName: "Kazi Agency",
    title: "Services | Kazi Agency — AI-Powered Marketing & Growth Services",
    description:
      "From AI websites and CRM to SEO, paid ads, and reputation management — Kazi Agency delivers your entire growth stack under one roof.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kazi Agency Services — AI-Powered Marketing & Growth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Kazi Agency — AI-Powered Marketing & Growth Services",
    description:
      "10 specialized services. One unified growth platform. See what Kazi Agency can do for your business.",
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
  return <ServicesPage />;
}

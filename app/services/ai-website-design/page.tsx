import type { Metadata } from "next";
import AIWebsiteDesignPage from "./ai-website-design-page";

export const metadata: Metadata = {
  title: "AI-Powered Website Design | Kazi Agency",
  description:
    "Custom, conversion-optimized websites built with AI that load fast, rank high, and turn visitors into paying clients. Mobile-first, SEO-ready, and CRM-integrated from day one. Launch in 2–4 weeks.",
  keywords: [
    "AI website design",
    "AI-powered website design agency",
    "conversion-optimized website design",
    "professional website design for small business",
    "website design that generates leads",
    "CRM-integrated website",
    "fast website design agency",
    "SEO website design",
    "mobile-first website design",
    "custom website design agency",
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
    canonical: "https://kaziagency.com/services/ai-website-design",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaziagency.com/services/ai-website-design",
    siteName: "Kazi Agency",
    title: "AI-Powered Website Design | Kazi Agency",
    description:
      "Custom, conversion-optimized websites built with AI. Fast, mobile-first, SEO-ready, and CRM-integrated. Launch your new site in 2–4 weeks.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kazi Agency — AI-Powered Website Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Website Design | Kazi Agency",
    description:
      "AI-built websites that convert. Fast, SEO-ready, CRM-integrated, and live in 2–4 weeks. See how Kazi Agency does it differently.",
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
  return <AIWebsiteDesignPage />;
}

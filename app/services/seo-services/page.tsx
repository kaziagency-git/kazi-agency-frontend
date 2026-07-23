import type { Metadata } from "next";
import SeoServicesPage from "./seo-services-page";

export const metadata: Metadata = {
  title: "SEO Services | Rank Higher on Google | Kazi Agency",
  description:
    "Full-stack SEO services: technical audits, keyword research, on-page optimisation, SEO content writing, and white-hat link building. Kazi Agency helps businesses rank on page one and generate organic leads. Free SEO audit available.",
  keywords: [
    "SEO services agency",
    "SEO agency for small business",
    "technical SEO audit",
    "keyword research service",
    "on-page SEO optimisation",
    "link building service",
    "local SEO agency",
    "Google ranking service",
    "organic traffic growth",
    "SEO content writing",
    "Core Web Vitals optimisation",
    "Google Business Profile optimisation",
    "SEO for service businesses",
    "affordable SEO agency",
    "full-stack SEO agency",
    "white-hat SEO service",
    "page one Google ranking",
    "SEO monthly retainer",
    "Ahrefs SEMrush SEO agency",
    "SEO lead generation",
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
    canonical: "https://kaziagency.com/services/seo-services",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaziagency.com/services/seo-services",
    siteName: "Kazi Agency",
    title: "SEO Services | Rank Higher on Google | Kazi Agency",
    description:
      "Technical SEO, keyword strategy, content writing, and link building — all done for you. Kazi Agency builds the organic growth engine that brings you leads every month. Free audit available.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kazi Agency — SEO Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Services | Rank Higher on Google | Kazi Agency",
    description:
      "Done-for-you SEO: technical fixes, keyword research, content, and link building. We handle everything — you watch the rankings climb. Free SEO audit available.",
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
  return <SeoServicesPage />;
}

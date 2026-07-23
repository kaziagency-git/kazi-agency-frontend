import type { Metadata } from "next";
import ReputationManagementPage from "./reputation-management-page";

export const metadata: Metadata = {
  title: "Reputation Management Services | 5-Star Reviews & Brand Protection | Kazi Agency",
  description:
    "Full-service reputation management: automated review generation, professional review responses, negative review suppression, Google Business Profile optimisation, and 50+ directory management. Free reputation audit available.",
  keywords: [
    "reputation management agency",
    "online reputation management",
    "review management service",
    "Google review management",
    "reputation management for small business",
    "negative review removal",
    "review generation service",
    "automated review requests",
    "Google Business Profile management",
    "online review monitoring",
    "5 star review strategy",
    "reputation recovery service",
    "brand monitoring service",
    "review response service",
    "local SEO reputation management",
    "Trustpilot management agency",
    "review platform management",
    "citation management service",
    "BrightLocal alternative",
    "Yext alternative agency",
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
    canonical: "https://kaziagency.com/services/reputation-management",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaziagency.com/services/reputation-management",
    siteName: "Kazi Agency",
    title: "Reputation Management Services | 5-Star Reviews & Brand Protection | Kazi Agency",
    description:
      "Stop letting reviews manage themselves. Kazi Agency automates review generation, responds to every review within 24 hours, protects your rating from fake content, and manages your presence across 50+ directories. Free audit available.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kazi Agency — Reputation Management Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reputation Management Services | 5-Star Reviews & Brand Protection | Kazi Agency",
    description:
      "Automated review generation, 24-hour response management, negative review suppression, and Google Business Profile optimisation — all in one managed service. Free reputation audit available.",
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
  return <ReputationManagementPage />;
}

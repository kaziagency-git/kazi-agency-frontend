import type { Metadata } from "next";
import SocialMediaManagementPage from "./social-media-management-page";

export const metadata: Metadata = {
  title: "Social Media Management Services | Kazi Agency",
  description:
    "Done-for-you social media management across LinkedIn, TikTok, Instagram, and YouTube. Kazi Agency creates content, designs graphics, manages communities, and grows your audience — fully handled for you. Free audit available.",
  keywords: [
    "social media management agency",
    "done-for-you social media",
    "LinkedIn content agency",
    "TikTok marketing agency",
    "Instagram management service",
    "YouTube Shorts agency",
    "social media content creation",
    "social media strategy agency",
    "community management service",
    "social media for small business",
    "brand social media management",
    "social media growth agency",
    "content calendar service",
    "social media marketing agency",
    "short-form video agency",
    "LinkedIn thought leadership",
    "organic social media growth",
    "social media monthly retainer",
    "social media reporting service",
    "social media outsourcing",
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
    canonical: "https://kaziagency.com/services/social-media-management",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaziagency.com/services/social-media-management",
    siteName: "Kazi Agency",
    title: "Social Media Management Services | Kazi Agency",
    description:
      "We create the content, design the graphics, manage the community, and grow your audience across LinkedIn, TikTok, Instagram, and YouTube — fully done for you. Free social media audit available.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kazi Agency — Social Media Management Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Management Services | Kazi Agency",
    description:
      "Done-for-you social media: content creation, graphic design, community management, and monthly reporting. LinkedIn, TikTok, Instagram, YouTube — all handled. Free audit available.",
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
  return <SocialMediaManagementPage />;
}

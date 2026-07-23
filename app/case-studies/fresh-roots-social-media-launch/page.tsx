import type { Metadata } from "next";
import FreshRootsCaseStudy from "./fresh-roots-case-study";

export const metadata: Metadata = {
  title: "Social Media Brand Launch: 0 to 24.8K Followers & $91K Revenue | Kazi Agency",
  description:
    "How Kazi Agency built Fresh Roots Kitchen's social media presence from zero — creating brand identity, a content system, and 22 micro-influencer partnerships that grew 24,800 followers and $91K in trackable revenue in 6 months.",
  keywords: [
    "social media brand launch case study",
    "startup social media marketing",
    "Instagram growth strategy",
    "TikTok brand launch",
    "micro-influencer marketing",
    "food brand social media",
    "organic social media growth",
    "Kazi Agency social media",
  ],
  alternates: {
    canonical: "/case-studies/fresh-roots-social-media-launch",
  },
  openGraph: {
    title: "Social Media Brand Launch: 0 to 24.8K Followers & $91K Revenue | Kazi Agency",
    description:
      "A deep-dive into how Fresh Roots Kitchen went from zero social presence to 24,800 followers, 8.3% avg engagement, and $91K in social-attributed revenue — in 6 months.",
    type: "article",
    url: "https://kaziagency.com/case-studies/fresh-roots-social-media-launch",
  },
  twitter: {
    card: "summary_large_image",
    title: "0 to 24.8K Followers & $91K Revenue for Fresh Roots Kitchen | Kazi Agency",
    description:
      "From zero to 24,800 followers with 8.3% engagement and $91K tracked revenue. See exactly how we built the social launch system.",
  },
};

export default function Page() {
  return <FreshRootsCaseStudy />;
}

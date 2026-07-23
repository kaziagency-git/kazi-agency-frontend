import type { Metadata } from "next";
import BloomBoutiqueCaseStudy from "./bloom-boutique-case-study";

export const metadata: Metadata = {
  title: "E-commerce Revenue Scaling with Paid Ads: 4.8× ROAS in 90 Days | Kazi Agency",
  description:
    "How Kazi Agency rebuilt Bloom Boutique's Meta and Google campaigns from scratch, turning a break-even 1.2× ROAS into $340K in 90-day attributed revenue at a 4.8× return on ad spend.",
  keywords: [
    "e-commerce paid ads case study",
    "Meta ads ROAS",
    "Google Shopping results",
    "fashion e-commerce advertising",
    "paid ads ROI",
    "Facebook ads e-commerce",
    "retargeting strategy",
    "Kazi Agency paid ads",
  ],
  alternates: {
    canonical: "/case-studies/bloom-boutique-paid-ads-growth",
  },
  openGraph: {
    title: "4.8× ROAS — E-commerce Revenue Scaling with Paid Ads | Kazi Agency",
    description:
      "A deep-dive into how Bloom Boutique went from a break-even 1.2× ROAS to $340K in 90-day attributed revenue through a full-funnel Meta and Google paid ads rebuild.",
    type: "article",
    url: "https://kaziagency.com/case-studies/bloom-boutique-paid-ads-growth",
  },
  twitter: {
    card: "summary_large_image",
    title: "4.8× ROAS in 90 Days for Bloom Boutique | Kazi Agency Case Study",
    description:
      "$340K revenue, −67% CPA, +218% conversion rate. See exactly how we rebuilt their paid ads from scratch.",
  },
};

export default function Page() {
  return <BloomBoutiqueCaseStudy />;
}

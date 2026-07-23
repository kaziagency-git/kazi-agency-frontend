import type { Metadata } from "next";
import BlogSection from "@/components/blog/blog-section";

export const metadata: Metadata = {
  title: "Blog | Kazi Agency — Marketing Insights & Strategies",
  description:
    "Expert digital marketing insights, proven strategies, and actionable advice to help your business attract more customers and grow faster.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Kazi Agency — Marketing Insights & Strategies",
    description:
      "Expert digital marketing insights, proven strategies, and actionable advice to help your business attract more customers and grow faster.",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogSection />;
}

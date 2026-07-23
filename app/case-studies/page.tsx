import type { Metadata } from "next";
import CaseStudiesPage from "./case-studies-page";

export const metadata: Metadata = {
  title: "Case Studies | Kazi Agency — Real Results for Real Businesses",
  description:
    "See how Kazi Agency helped businesses achieve 312% traffic growth, 4.8× ROAS, a $2.1M pipeline, and more. Real case studies across SEO, paid ads, lead generation, social media, and marketing automation.",
  keywords: [
    "digital marketing case studies",
    "SEO results case study",
    "paid advertising ROI",
    "lead generation case study",
    "social media growth results",
    "marketing automation results",
    "Kazi Agency case studies",
    "agency results proof",
  ],
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: "Case Studies | Kazi Agency — Real Results for Real Businesses",
    description:
      "Deep-dive case studies showing exactly what we did and the measurable results achieved across SEO, paid ads, lead generation, social media, and marketing automation.",
    type: "website",
    url: "https://kaziagency.com/case-studies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Kazi Agency — Real Client Results",
    description:
      "312% traffic growth, 4.8× ROAS, $2.1M pipeline. See how Kazi Agency delivers measurable results.",
  },
};

export default function Page() {
  return <CaseStudiesPage />;
}

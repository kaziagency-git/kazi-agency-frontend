import { FAQItem } from "@/components/faq";

export function generateFAQSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kazi Agency",
    url: "https://kaziagency.com",
    logo: "https://www.kaziagency.com/kaziagency-logo.webp",
    description:
      "All-in-one AI-powered sales and marketing platform combining CRM, lead generation, marketing automation, and white-label solutions.",
    sameAs: [
      "https://twitter.com/kaziagency",
      "https://linkedin.com/company/kaziagency",
      "https://facebook.com/kaziagency",
      "https://instagram.com/kaziagency",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      availableLanguage: ["en"],
      areaServed: "Worldwide",
      url: "https://kaziagency.com",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateProductSchema(
  name: string,
  description: string,
  price: string,
  features: string[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    price,
    offers: {
      "@type": "Offer",
      url: "https://kaziagency.com",
      priceCurrency: "USD",
      price,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "450",
    },
    features: features,
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kazi Agency",
    description:
      "All-in-one AI-powered sales and marketing platform for businesses of all sizes.",
    url: "https://kaziagency.com",
    image: "https://www.kaziagency.com/kaziagency-logo.webp",
    priceRange: "$$$",
    serviceType: ["CRM Software", "Lead Generation", "Marketing Automation", "SEO Services"],
    areaServed: "Worldwide",
  };
}

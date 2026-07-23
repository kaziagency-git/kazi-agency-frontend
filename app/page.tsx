import { SchemaInjector } from "@/components/schema-injector";
import { homepageFAQ } from "@/lib/faq-data";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { ServicesSection } from "@/components/home/services-section";
import { PricingSection } from "@/components/home/pricing-section";
import { ComparisonTable } from "@/components/home/comparison-table";
import { CalendarSection } from "@/components/home/calendar-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FaqSection } from "@/components/home/faq-section";

export default function Home() {
  return (
    <main className="bg-white [&_a]:cursor-pointer [&_button]:cursor-pointer">
      <SchemaInjector items={homepageFAQ} />
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <PricingSection />
      <ComparisonTable />
      <CalendarSection />
      <TestimonialsSection />
      <FaqSection />
    </main>
  );
}

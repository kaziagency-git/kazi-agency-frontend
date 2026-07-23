"use client";

import { FAQ } from "@/components/faq";
import { homepageFAQ } from "@/lib/faq-data";

export function FaqSection() {
  return (
    <section className="px-6 py-24 bg-white">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#046BAF]/10 border border-[#046BAF]/20">
            <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">Got Questions?</span>
          </div>
        </div>
        <FAQ items={homepageFAQ} title="Frequently Asked Questions" />
      </div>
    </section>
  );
}

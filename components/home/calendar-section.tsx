"use client";

import { motion } from "framer-motion";
import Script from "next/script";

export function CalendarSection() {
  return (
    <section id="calendar" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 lg:mb-0"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#046BAF]/10 border border-[#046BAF]/20">
            <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">Get Started</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
            Book Your Free Strategy Session
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get personalized guidance from our experts on how to grow your business
          </p>
        </motion.div>

        <div className="w-full overflow-hidden rounded-2xl">
          <iframe
            src="https://api.leadconnectorhq.com/widget/booking/vbZ9GROUod18r59lMduT"
            style={{
              width: "100%",
              border: "none",
              overflow: "hidden",
              minHeight: "700px",
            }}
            scrolling="no"
            id="vbZ9GROUod18r59lMduT_1779474666599"
          />

          <Script
            src="https://link.msgsndr.com/js/form_embed.js"
            strategy="lazyOnload"
          />
        </div>
      </div>
    </section>
  );
}

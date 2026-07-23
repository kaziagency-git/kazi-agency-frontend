"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const services = [
  {
    tier: "Tier 1",
    title: "Starter Package",
    subtitle: "The Foundation",
    description: "A complete digital launchpad with AI-integrated systems. Ideal for small businesses or startups transitioning from legacy setups or launching a new brand.",
    features: [
      "AI-Optimized Responsive Website",
      "CRM Setup & Pipeline Automation",
      "Automated Email & SMS Welcome Flows",
      "Basic AI Chatbot & Lead Capture",
      "30-Day Social Media Content Calendar",
    ],
    color: "from-blue-500 to-cyan-500",
    badge: null,
    popular: false,
  },
  {
    tier: "Tier 2",
    title: "Growth Package",
    subtitle: "The Accelerator",
    description: "Scale your organic reach and deeply integrate automation into your marketing. Everything in Starter, plus advanced tools for mid-sized companies.",
    features: [
      "Everything in Starter Package",
      "AI-Assisted SEO & Keyword Research",
      "Competitor Analysis & On-Page Optimization",
      "Expanded Multi-Platform Social Management",
      "Monthly Analytics & Reporting Dashboard",
    ],
    color: "from-emerald-500 to-teal-500",
    badge: "Most Popular",
    popular: true,
  },
  {
    tier: "Tier 3",
    title: "Scale Package",
    subtitle: "The Powerhouse",
    description: "Combine automated infrastructure with aggressive paid acquisition. Ideal for high-growth companies ready to dominate both organic and paid channels.",
    features: [
      "Everything in Growth Package",
      "Full-Service Meta, Google & LinkedIn Ads",
      "Ad Spend Management (up to $20K/mo)",
      "AI-Driven Creative & Copy Testing",
      "Advanced Multi-Channel Attribution & ROI Tracking",
    ],
    color: "from-purple-500 to-pink-500",
    badge: null,
    popular: false,
  },
  {
    tier: "Tier 4",
    title: "Enterprise",
    subtitle: "Custom Solutions",
    description: "For clients with unique requirements, massive ad budgets, or bespoke software integration needs. Fully tailored to your business.",
    features: [
      "Everything in Scale Package",
      "Unlimited Ad Spend Management",
      "Bespoke Software & API Integrations",
      "Dedicated Account Manager",
      "Custom AI-Powered Workflow Builds",
    ],
    color: "from-amber-500 to-orange-500",
    badge: "Custom",
    popular: false,
  },
];

export function ServicesSection() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#f0f7ff]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#046BAF]/10 border border-[#046BAF]/20">
            <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">What We Do</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
            Our Service Packages
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From foundational AI-powered setups to full-scale enterprise solutions — choose the tier that fits your growth stage
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative bg-white rounded-2xl border overflow-hidden hover:shadow-lg transition-all ${
                service.popular ? "border-emerald-300 shadow-md" : "border-slate-200"
              }`}
            >
              {service.badge && (
                <div className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full ${
                  service.popular
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}>
                  {service.badge}
                </div>
              )}
              <div className={`h-1.5 bg-linear-to-r ${service.color}`} />
              <div className="p-6">
                <span className="text-xs font-bold tracking-widest uppercase text-slate-400">{service.tier}</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 mb-0.5">{service.title}</h3>
                <p className={`text-sm font-semibold mb-3 bg-linear-to-r ${service.color} bg-clip-text text-transparent`}>
                  {service.subtitle}
                </p>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 items-start">
                      <Check className="w-4 h-4 text-[#046BAF] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

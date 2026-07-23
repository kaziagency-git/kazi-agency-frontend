"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import ContactModal from "@/components/contact-modal";

const pricingPackages = [
  {
    id: "starter",
    name: "Ai Starter",
    badge: "Best for launch",
    oneTime: 4990,
    maintenance: 500,
    introOneTime: 7495,
    introMaintenance: 750,
    bestFor: "Small businesses that need a polished launch system fast.",
    description:
      "AI-ready website, CRM setup, and lead capture systems to replace scattered tools with one clean stack.",
    deliverables: [
      "AI-optimized website with built-in AI chatbot & lead capture",
      "CRM setup with pipelines, lead scoring & email/SMS automation",
      "Core social media profiles creation & optimization",
      "30-day AI-driven content calendar with scheduled posts",
    ],
    outcomes: ["Capture more leads", "Launch faster", "Lower tech overhead"],
    accent: "from-sky-500 to-[#046BAF]",
    paymentLink: "https://link.fastpaydirect.com/payment-link/6a10bcc23f4eb69bef72f650",
  },
  {
    id: "growth",
    name: "Ai Growth",
    badge: "Most popular",
    oneTime: 7490,
    maintenance: 1000,
    introOneTime: 14995,
    introMaintenance: 1500,
    bestFor: "Businesses ready to scale organic traffic and automate follow-up.",
    description:
      "Everything in Starter plus SEO, stronger content, and a reporting layer that keeps the pipeline moving.",
    deliverables: [
      "Everything in Starter",
      "Advanced SEO: keyword research, competitor analysis & blog content",
      "Expanded social media on LinkedIn, TikTok & YouTube Shorts",
      "Monthly analytics dashboard (organic traffic, CRM & social)",
    ],
    outcomes: ["Rank higher", "Increase inbound demand", "Build a repeatable growth engine"],
    accent: "from-[#046BAF] to-cyan-500",
    paymentLink: "https://link.fastpaydirect.com/payment-link/6a10be61ee2395af2c17fd20",
  },
  {
    id: "scale",
    name: "Ai Scale",
    badge: "Powerhouse",
    oneTime: 9990,
    maintenance: 2000,
    introOneTime: 24995,
    introMaintenance: 2500,
    bestFor: "High-growth teams that want paid acquisition and automation under one roof.",
    description:
      "Everything in Growth plus media buying, conversion tracking, and more aggressive testing to improve ROI.",
    deliverables: [
      "Everything in Growth",
      "Full-service ad management across Meta, Google & LinkedIn",
      "Up to $20,000/month ad spend optimization & scaling",
      "AI-driven creative testing & multi-channel ROI tracking",
    ],
    outcomes: ["Scale paid acquisition", "Track ROI clearly", "Reduce acquisition waste"],
    accent: "from-violet-500 to-fuchsia-500",
    paymentLink: "https://link.fastpaydirect.com/payment-link/6a10bef43f4eb69bef72f655",
  },
  {
    id: "custom",
    name: "Enterprise / Custom",
    badge: "Quote based",
    bestFor: "Large projects, unique integrations, and bespoke delivery needs.",
    description:
      "Use this when the scope is bigger than a standard package: white-label builds, complex migrations, or custom software.",
    deliverables: [
      "Discovery and scoping workshop",
      "Tailored implementation plan",
      "Custom integrations or development",
      "SLA / support model based on scope",
    ],
    outcomes: ["Tailored scope", "Dedicated planning", "Flexible billing"],
    accent: "from-slate-900 to-slate-700",
    paymentLink: null,
  },
] as const;

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

export function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="pricing" className="relative overflow-hidden py-24 px-6 bg-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-[#046BAF]/10 blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-10%] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#046BAF]/15 bg-[#046BAF]/8 px-4 py-2 shadow-sm">
            <Sparkles className="h-4 w-4 text-[#046BAF]" />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#046BAF]">Package Pricing</span>
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl text-balance">
            Choose the package that matches where the client is now
          </h2>
          <p className="mt-4 text-lg text-slate-600 md:text-xl">
            Clear one-time launch pricing, simple monthly maintenance, and a separate custom option for larger scopes.
          </p>

          <div className="mt-8 grid gap-3 rounded-[28px] border border-slate-200 bg-white/90 p-4 text-left shadow-lg shadow-slate-200/60 md:grid-cols-2 md:p-5">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Billing model</p>
              <p className="mt-2 text-sm text-slate-700">One-time project fee plus optional monthly maintenance after launch.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Custom work</p>
              <p className="mt-2 text-sm text-slate-700">Anything beyond scope becomes a scoped quote with clear milestones.</p>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {pricingPackages.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-[28px] border bg-white p-6 shadow-sm transition duration-300 border-slate-200 hover:-translate-y-1 hover:border-[#046BAF]/25 hover:shadow-xl"
            >
              <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${plan.accent}`} />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{plan.description}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#046BAF]/10 px-3 py-1 text-xs font-semibold text-[#046BAF]">{plan.badge}</span>
                {plan.id === "custom" && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Discovery-first scope</span>
                )}
              </div>

              <div className="mt-6 rounded-3xl bg-slate-50 p-5">
                {plan.id !== "custom" ? (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">One-time launch</p>
                        <div className="mt-2 flex items-end gap-3">
                          <span className="text-3xl font-bold text-slate-900">{formatCurrency(plan.introOneTime)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-slate-200 pt-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Monthly maintenance</p>
                      <div className="mt-2 flex items-end gap-3">
                        <span className="text-2xl font-bold text-slate-900">{formatCurrency(plan.introMaintenance)}</span>
                        <span className="pb-1 text-sm text-slate-600">/ month</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Pricing</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">Custom quote</p>
                    <p className="mt-2 text-sm text-slate-600">Based on scope, timeline, integrations, support, and team size.</p>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Best for</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">{plan.bestFor}</p>
              </div>

              <div className="mt-5 space-y-3">
                {plan.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-3 px-3 py-1">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                    <span className="text-sm leading-6 text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Expected outcomes</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {plan.outcomes.map((item) => (
                    <span key={item} className="rounded-full bg-[#046BAF]/8 px-3 py-1 text-xs font-medium text-[#046BAF]">{item}</span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6">
                {plan.paymentLink ? (
                  <a
                    href={plan.paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-xl px-4 py-3 text-center text-sm font-bold text-white bg-[#046BAF] hover:bg-[#035a94] transition"
                  >
                    {`Start With ${plan.name}`}
                  </a>
                ) : (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full rounded-xl px-4 py-3 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition"
                  >
                    Request Custom Quote
                  </button>
                )}
                {plan.id === "custom" && (
                  <p className="mt-3 text-center text-xs text-slate-500">We will scope the project before quoting.</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <ContactModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <div className="mt-10 rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#046BAF]">Recommendation</p>
          <p className="mx-auto mt-3 max-w-3xl text-slate-700">
            For most clients, the <span className="font-bold text-slate-900">Growth</span> package is the best balance of setup, automation, SEO, and ongoing support.
            The <span className="font-bold text-slate-900">Starter</span> package works best for early-stage launches, while <span className="font-bold text-slate-900">Scale</span>
            is built for aggressive acquisition.
          </p>
        </div>
      </div>
    </section>
  );
}

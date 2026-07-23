"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Target,
  Filter,
  Share2,
  Zap,
  ArrowRight,
  TrendingUp,
  Users,
  BarChart3,
  Award,
  Clock,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const ALL = "All";

const caseStudies = [
  {
    slug: "premier-hvac-seo-domination",
    client: "Premier HVAC Solutions",
    industry: "Home Services",
    service: "SEO",
    serviceColor: "bg-orange-100 text-orange-700",
    accentGradient: "from-orange-500 to-amber-500",
    accentLight: "bg-orange-50",
    accentText: "text-orange-600",
    icon: Search,
    headline: "312% Organic Traffic Growth in 6 Months",
    outcome:
      "Dominated 47 local keywords, generated 89 new monthly leads, and added $127K in attributable revenue through strategic local SEO.",
    metrics: [
      { label: "Organic Traffic", value: "+312%" },
      { label: "Local Keywords #1", value: "47" },
      { label: "New Monthly Leads", value: "89" },
      { label: "Revenue Added", value: "$127K" },
    ],
    timeframe: "6 months",
  },
  {
    slug: "bloom-boutique-paid-ads-growth",
    client: "Bloom Boutique",
    industry: "Fashion E-commerce",
    service: "Paid Ads",
    serviceColor: "bg-red-100 text-red-700",
    accentGradient: "from-red-500 to-orange-500",
    accentLight: "bg-red-50",
    accentText: "text-red-600",
    icon: Target,
    headline: "4.8× ROAS — From Break-Even to $340K Revenue",
    outcome:
      "Rebuilt Meta and Google campaigns from scratch with AI-driven creative testing, turning a 1.2× ROAS into $340K in 90-day attributed revenue.",
    metrics: [
      { label: "ROAS Achieved", value: "4.8×" },
      { label: "Revenue (90 days)", value: "$340K" },
      { label: "CPA Reduction", value: "−67%" },
      { label: "Conversion Rate", value: "+218%" },
    ],
    timeframe: "90 days",
  },
  {
    slug: "techstack-pro-lead-generation",
    client: "TechStack Pro",
    industry: "B2B SaaS",
    service: "Lead Gen",
    serviceColor: "bg-sky-100 text-sky-700",
    accentGradient: "from-[#046BAF] to-cyan-500",
    accentLight: "bg-sky-50",
    accentText: "text-[#046BAF]",
    icon: Filter,
    headline: "284% More Qualified Leads & $2.1M Pipeline Built",
    outcome:
      "AI-powered lead capture and CRM automation eliminated 12 hrs/rep of manual outreach per week and built a $2.1M qualified sales pipeline.",
    metrics: [
      { label: "Qualified Leads", value: "+284%" },
      { label: "Pipeline Generated", value: "$2.1M" },
      { label: "Close Rate Lift", value: "+41%" },
      { label: "Hours Saved/Rep/Wk", value: "12 hrs" },
    ],
    timeframe: "4 months",
  },
  {
    slug: "fresh-roots-social-media-launch",
    client: "Fresh Roots Kitchen",
    industry: "Food & Wellness",
    service: "Social Media",
    serviceColor: "bg-pink-100 text-pink-700",
    accentGradient: "from-pink-500 to-rose-500",
    accentLight: "bg-pink-50",
    accentText: "text-pink-600",
    icon: Share2,
    headline: "0 to 24.8K Followers & $91K Revenue from Social",
    outcome:
      "Built a loyal community of 24,800 followers from zero with an 8.3% average engagement rate, directly driving $91K in trackable social revenue.",
    metrics: [
      { label: "Followers Gained", value: "24.8K" },
      { label: "Avg Engagement", value: "8.3%" },
      { label: "Traffic from Social", value: "63%" },
      { label: "Social Revenue", value: "$91K" },
    ],
    timeframe: "6 months",
  },
  {
    slug: "apex-wellness-marketing-automation",
    client: "Apex Wellness Group",
    industry: "Health & Wellness",
    service: "Automation",
    serviceColor: "bg-violet-100 text-violet-700",
    accentGradient: "from-violet-500 to-purple-500",
    accentLight: "bg-violet-50",
    accentText: "text-violet-600",
    icon: Zap,
    headline: "217% More Bookings & $180K in Recovered Revenue",
    outcome:
      "Automated follow-up workflows cut lead response time from 6+ hours to 4.2 minutes, reduced no-shows by 58%, and recovered $180K in annual revenue.",
    metrics: [
      { label: "Bookings Increase", value: "+217%" },
      { label: "Avg Response Time", value: "4.2 min" },
      { label: "No-Show Reduction", value: "−58%" },
      { label: "Revenue Recovered", value: "$180K" },
    ],
    timeframe: "5 months",
  },
];

const filters = [ALL, "SEO", "Paid Ads", "Lead Gen", "Social Media", "Automation"];

const aggregateStats = [
  { value: "312%", label: "Avg organic traffic growth", icon: TrendingUp },
  { value: "4.8×", label: "Peak ROAS achieved", icon: Target },
  { value: "$2.1M", label: "Pipeline generated (single client)", icon: BarChart3 },
  { value: "5", label: "Industries & counting", icon: Award },
];

const tickerItems = [
  { value: "+312%", label: "Organic Traffic", dotColor: "bg-orange-400" },
  { value: "4.8×", label: "ROAS Achieved", dotColor: "bg-red-400" },
  { value: "$2.1M", label: "Pipeline Generated", dotColor: "bg-sky-400" },
  { value: "+217%", label: "More Bookings", dotColor: "bg-violet-400" },
  { value: "24.8K", label: "Followers Built", dotColor: "bg-pink-400" },
  { value: "+284%", label: "Qualified Leads", dotColor: "bg-cyan-300" },
  { value: "$340K", label: "Revenue in 90 Days", dotColor: "bg-amber-400" },
  { value: "$180K", label: "Revenue Recovered", dotColor: "bg-emerald-400" },
  { value: "−67%", label: "CPA Reduction", dotColor: "bg-rose-400" },
  { value: "8.3%", label: "Avg Engagement Rate", dotColor: "bg-fuchsia-400" },
  { value: "47", label: "Local Keywords #1", dotColor: "bg-lime-400" },
  { value: "−58%", label: "No-Show Reduction", dotColor: "bg-teal-400" },
];

const trustPoints = [
  {
    icon: CheckCircle2,
    title: "Verified Results",
    desc: "Every metric is pulled from real client dashboards and reporting tools — no invented numbers.",
  },
  {
    icon: Users,
    title: "Transparent Process",
    desc: "We document exactly what was done, when, and why — no black-box strategies or vague deliverables.",
  },
  {
    icon: TrendingUp,
    title: "Repeatable Systems",
    desc: "Our playbooks are designed to scale. What worked for one client is refined and applied to the next.",
  },
];

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState(ALL);

  const filtered =
    activeFilter === ALL
      ? caseStudies
      : caseStudies.filter((cs) => cs.service === activeFilter);

  return (
    <main className="bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-0 px-6 bg-gradient-to-br from-white via-sky-50/40 to-blue-50">
        {/* Blurred blob decorations */}
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-[-8%] top-[-8%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#046BAF]/25 to-violet-500/10 blur-3xl" />
          <div className="absolute right-[-6%] bottom-[-6%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-cyan-400/15 to-[#046BAF]/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center pb-16">

            {/* ── LEFT: Text content ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-[#046BAF]/10 border border-[#046BAF]/20">
                <Sparkles className="w-4 h-4 text-[#046BAF]" />
                <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">
                  Real Clients. Real Results.
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 leading-tight text-balance">
                Proof That Our Strategy{" "}
                <span className="bg-gradient-to-r from-[#046BAF] to-cyan-500 bg-clip-text text-transparent">
                  Actually Works
                </span>
              </h1>

              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Deep-dive case studies across SEO, paid ads, lead generation,
                social media, and automation — every metric verified, every
                strategy documented.
              </p>

              <div className="space-y-3 mb-10">
                {[
                  "5 industries, 5 fully documented strategies",
                  "Every metric pulled from real client dashboards",
                  "No fluff — only what moved revenue or pipeline",
                ].map((pt) => (
                  <div key={pt} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#046BAF] shrink-0 mt-0.5" />
                    <span className="text-slate-600 font-medium">{pt}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/book-a-consultation"
                  className="bg-[#046BAF] hover:bg-[#035a94] text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
                >
                  Get Results Like These
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() =>
                    document
                      .getElementById("case-studies")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="border-2 border-slate-200 bg-white text-slate-700 hover:border-[#046BAF] hover:text-[#046BAF] px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center cursor-pointer"
                >
                  Browse Case Studies
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* ── RIGHT: Results Dashboard visual ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="relative"
            >
              {/* Floating verified badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.85 }}
                className="absolute -top-4 -right-2 z-10 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verified Results
              </motion.div>

              {/* Dashboard card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-5 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Live Results
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">Updated monthly</span>
                </div>

                {/* Featured metric card */}
                <div className="bg-gradient-to-br from-[#046BAF] to-cyan-500 rounded-xl p-5 mb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-4xl font-black text-white">+312%</p>
                      <p className="text-blue-100 text-sm mt-1 font-medium">
                        Organic Traffic Growth
                      </p>
                    </div>
                    <div className="bg-white/15 rounded-xl p-2.5">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Animated progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-blue-200 mb-1.5">
                      <span>Goal Progress</span>
                      <span>78% ahead of target</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "78%" }}
                        transition={{ duration: 1.5, delay: 0.65, ease: "easeOut" }}
                        className="h-full bg-white rounded-full"
                      />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <Search className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs text-blue-100 font-medium">
                      Premier HVAC Solutions · SEO Service
                    </span>
                  </div>
                </div>

                {/* 2×2 mini metric grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { value: "4.8×",  label: "ROAS",      bg: "bg-red-50",    text: "text-red-600",    icon: Target     },
                    { value: "$2.1M", label: "Pipeline",  bg: "bg-sky-50",    text: "text-[#046BAF]",  icon: BarChart3  },
                    { value: "+217%", label: "Bookings",  bg: "bg-violet-50", text: "text-violet-600", icon: TrendingUp },
                    { value: "24.8K", label: "Followers", bg: "bg-pink-50",   text: "text-pink-600",   icon: Users      },
                  ].map((m, i) => {
                    const Icon = m.icon;
                    return (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className={`${m.bg} rounded-xl p-3.5 border border-white`}
                      >
                        <Icon className={`w-4 h-4 ${m.text} mb-1.5`} />
                        <p className={`text-xl font-black ${m.text}`}>{m.value}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{m.label}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Animated bar chart */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                    Monthly Lead Growth
                  </p>
                  <div className="flex items-end gap-1.5 h-[68px]">
                    {[20, 35, 50, 65, 82, 100].map((pct, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.8, delay: 0.85 + i * 0.09, ease: "easeOut" }}
                        style={{
                          height: `${pct}%`,
                          transformOrigin: "bottom",
                        }}
                        className="flex-1 bg-gradient-to-t from-[#046BAF] to-cyan-400 rounded-t-sm"
                      />
                    ))}
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
                      <span key={m} className="flex-1 text-center text-[10px] text-slate-400">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Scrolling results ticker ── */}
        <div className="relative bg-[#046BAF] overflow-hidden py-4 -mx-6">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#046BAF] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#046BAF] to-transparent z-10 pointer-events-none" />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex w-max"
          >
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-5 whitespace-nowrap">
                <span className={`w-2 h-2 rounded-full shrink-0 ${item.dotColor}`} />
                <span className="text-sm font-extrabold text-white">{item.value}</span>
                <span className="text-sm text-blue-200 font-medium">{item.label}</span>
                <span className="text-blue-400/60 ml-3 text-lg">·</span>
              </div>
            ))}
          </motion.div>
        </div>

      </section>

      {/* ── Case Studies Grid ── */}
      <section id="case-studies" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#046BAF]/10 border border-[#046BAF]/20">
              <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">
                Case Studies
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              5 Industries. 5 Strategies. Measurable Outcomes.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Filter by service to find the case study most relevant to your business goals.
            </p>
          </motion.div>

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-2 mb-12"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeFilter === f
                    ? "bg-[#046BAF] text-white shadow-md shadow-[#046BAF]/25"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((cs, i) => {
                const Icon = cs.icon;
                return (
                  <motion.div
                    key={cs.slug}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className="group relative flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-[#046BAF]/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="p-6 flex flex-col flex-1">
                        {/* Icon + service badge */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={`${cs.accentLight} p-3 rounded-xl`}>
                            <Icon className={`w-6 h-6 ${cs.accentText}`} />
                          </div>
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full ${cs.serviceColor}`}
                          >
                            {cs.service}
                          </span>
                        </div>

                        {/* Client + industry */}
                        <div className="mb-3">
                          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-0.5">
                            {cs.industry}
                          </p>
                          <p className="text-sm font-bold text-slate-700">{cs.client}</p>
                        </div>

                        {/* Headline */}
                        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-[#046BAF] transition-colors leading-snug">
                          {cs.headline}
                        </h3>

                        {/* Outcome summary */}
                        <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">
                          {cs.outcome}
                        </p>

                        {/* Metrics chips */}
                        <div className="grid grid-cols-2 gap-2 mb-5">
                          {cs.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100"
                            >
                              <p className={`text-base font-black ${cs.accentText}`}>{m.value}</p>
                              <p className="text-xs text-slate-400 leading-tight mt-0.5">
                                {m.label}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Card footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <Clock className="w-3.5 h-3.5" />
                            {cs.timeframe}
                          </div>
                          <div className="flex items-center gap-1 text-[#046BAF] text-sm font-semibold">
                            Read Case Study
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className="py-20 px-6 bg-[#f0f7ff]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
              Every case study is built on one promise
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We tie every engagement to measurable KPIs. No vanity metrics, no
              fluff — if it doesn&apos;t move revenue or pipeline, we don&apos;t count it.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5">
            {trustPoints.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6 text-center"
                >
                  <div className="bg-[#046BAF]/10 w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-5 h-5 text-[#046BAF]" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#046BAF] to-[#035a94] relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-10%] top-[-20%] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute right-[-8%] bottom-[-15%] w-[400px] h-[400px] rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/15 border border-white/20">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-xs font-bold text-white tracking-widest uppercase">
                Your Story Could Be Next
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-balance">
              Ready to Become Our Next Case Study?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute strategy call. We&apos;ll audit your current setup
              and show you exactly what it would take to achieve results like the
              ones above.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-white text-[#046BAF] hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center shadow-lg"
              >
                Book Your Free Strategy Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/free-business-audit"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
              >
                Get a Free AI Audit First
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

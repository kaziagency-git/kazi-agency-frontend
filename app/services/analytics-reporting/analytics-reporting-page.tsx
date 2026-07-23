"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
  ChevronRight,
  ChevronDown,
  Target,
  Shield,
  Check,
  X,
  PieChart,
  Bot,
  LineChart,
  FileText,
  Search,
  Share2,
  AlertCircle,
  DollarSign,
  Eye,
  Settings,
  RefreshCw,
} from "lucide-react";

const stats = [
  { value: "1", label: "Unified dashboard — every channel in one place", icon: BarChart3 },
  { value: "48h", label: "Turn-around on your first full performance report", icon: Clock },
  { value: "3×", label: "Average improvement in ROI clarity after 90 days", icon: TrendingUp },
  { value: "100%", label: "CRM, ads, SEO & social data — fully connected", icon: Target },
];

const painPoints = [
  {
    icon: AlertCircle,
    title: "Flying Blind on What's Working",
    description:
      "Without a clear analytics setup, you're guessing which channels drive revenue. You're either spending on what looks good or cutting what's actually converting.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Clock,
    title: "Hours Lost Building Manual Reports",
    description:
      "Exporting CSVs, copying numbers into spreadsheets, and emailing PDFs every month is a full-time job. It's slow, error-prone, and keeps you stuck in the weeds.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: PieChart,
    title: "Data Scattered Across 10+ Tools",
    description:
      "Google Analytics, Meta Ads Manager, HubSpot, LinkedIn, and your email platform all live in separate tabs. There's no single view of what's actually happening.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: DollarSign,
    title: "No Clarity on Ad ROI",
    description:
      "You know what you're spending on Meta and Google, but do you know the true cost-per-lead, cost-per-close, and revenue-per-channel? Most businesses don't.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: Eye,
    title: "Vanity Metrics Instead of Real KPIs",
    description:
      "Impressions, followers, and page views feel good but don't grow revenue. Without the right KPIs tied to your pipeline, reporting is noise rather than signal.",
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    icon: Settings,
    title: "No Tracking on CRM Performance",
    description:
      "You can see leads coming in, but can you measure your lead-to-close rate by source? Pipeline velocity by campaign? Most CRM setups aren't instrumented to answer this.",
    color: "text-slate-500",
    bg: "bg-slate-50",
  },
];

const deliverables = [
  {
    icon: BarChart3,
    title: "Unified Marketing Dashboard",
    description:
      "A single live dashboard connecting your ad platforms, CRM, SEO tools, and social media — giving you one real-time view of every channel's performance.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: FileText,
    title: "Monthly Executive Report",
    description:
      "A professionally formatted monthly report covering organic traffic, paid ROI, CRM pipeline stats, and social performance — sent to your inbox automatically.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: DollarSign,
    title: "Paid Ad ROI Tracking",
    description:
      "Full-funnel attribution tracking across Meta, Google, and LinkedIn — showing cost-per-lead, cost-per-close, ROAS, and true revenue contribution per channel.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Search,
    title: "SEO & Organic Traffic Analytics",
    description:
      "Track keyword ranking movement, organic sessions, impressions, click-through rates, and landing page performance — week over week and month over month.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: TrendingUp,
    title: "CRM Pipeline Performance Reports",
    description:
      "Monitor lead volume by source, conversion rates at each pipeline stage, average deal velocity, and revenue attribution — all pulled directly from your CRM.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Share2,
    title: "Social Media Analytics",
    description:
      "Consolidated social reporting across LinkedIn, TikTok, YouTube, and Instagram — tracking engagement rate, follower growth, reach, and top-performing content.",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: LineChart,
    title: "Conversion Funnel Reporting",
    description:
      "Visual funnel analysis showing exactly where visitors drop off — from first click to booked call — so you can identify and fix the biggest conversion gaps.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Zap,
    title: "AI-Powered Insights & Recommendations",
    description:
      "Each report includes prioritized, AI-assisted recommendations — telling you specifically what to adjust, test, or scale based on your actual performance data.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const buildSteps = [
  {
    step: "01",
    title: "Analytics Audit & Goal Mapping",
    description:
      "We audit your current tracking setup, identify gaps and broken tags, and define the specific KPIs your business needs to measure — tied to real revenue goals.",
    icon: Search,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    duration: "Days 1–2",
  },
  {
    step: "02",
    title: "Tracking & Pixel Configuration",
    description:
      "We implement or repair all tracking: Google Analytics 4, Meta Pixel, Google Ads conversion tags, LinkedIn Insight Tag, and CRM event tracking — fully verified.",
    icon: Settings,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    duration: "Days 3–5",
  },
  {
    step: "03",
    title: "Dashboard Build",
    description:
      "We build your unified reporting dashboard — connecting all data sources into a single live view. Custom sections for ads, SEO, CRM, and social — all in one place.",
    icon: BarChart3,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    duration: "Days 6–9",
  },
  {
    step: "04",
    title: "Report Automation Setup",
    description:
      "Monthly executive reports are scheduled and automated — pulled from your live dashboard, formatted, and delivered to your inbox on the same day each month.",
    icon: RefreshCw,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    duration: "Days 10–12",
  },
  {
    step: "05",
    title: "Review, Handoff & Ongoing Support",
    description:
      "We walk you through your dashboard live, explain every metric, and set up a monthly review cadence. We're on call to answer questions and adjust reporting as you scale.",
    icon: TrendingUp,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    duration: "Days 13–14",
  },
];

const comparisonFeatures = [
  "Unified Multi-Channel Dashboard",
  "CRM Pipeline Analytics",
  "Automated Monthly Reports",
  "Paid Ad ROI Attribution",
  "SEO Performance Tracking",
  "Conversion Funnel Analysis",
  "AI-Powered Recommendations",
  "Social Media Analytics",
  "Custom KPIs Per Business",
  "Dedicated Setup & Support",
];

const comparisonData = [
  {
    label: "Mixpanel",
    values: [false, false, false, "via integrations", false, true, false, false, "limited", false],
    highlight: false,
  },
  {
    label: "Databox",
    values: [true, "via CRM", "paid plan", "via integrations", "via integrations", false, false, true, "limited", false],
    highlight: false,
  },
  {
    label: "GA4 + Sheets",
    values: [false, false, "manual only", false, "partial", false, false, false, false, false],
    highlight: false,
  },
  {
    label: "Kazi Agency",
    values: [true, true, true, true, true, true, true, true, true, true],
    highlight: true,
  },
];

const faqs = [
  {
    q: "What tools does your analytics setup replace?",
    a: "Our unified reporting system consolidates what most businesses cobble together from Mixpanel, Databox, Google Looker Studio, manual spreadsheets, and separate platform dashboards. Instead of logging into 8 tabs to understand performance, you get one live dashboard with everything in one place — built and maintained for you.",
  },
  {
    q: "How do you track ROI across multiple ad platforms?",
    a: "We implement full-funnel attribution tracking using UTM parameters, platform conversion pixels (Meta, Google, LinkedIn), and CRM lead source tagging. This allows us to attribute revenue back to its originating channel — showing you true cost-per-lead, cost-per-close, and ROAS for every platform you run ads on.",
  },
  {
    q: "Will you fix broken tracking and pixels I already have?",
    a: "Yes. Our analytics audit in step one specifically identifies broken tags, misconfigured events, missing conversions, and duplicate tracking. We repair everything before building your dashboard — because clean data is the foundation of any meaningful report.",
  },
  {
    q: "What does the monthly executive report include?",
    a: "Each monthly report covers: organic traffic trends and top-ranking pages, paid ad performance by channel (spend, leads, ROI), CRM pipeline stats (lead volume, conversion rates, deal velocity), social media engagement summary, and a prioritized list of AI-assisted recommendations for the following month.",
  },
  {
    q: "Can you track leads from click to closed client?",
    a: "Yes. With our CRM integration, every lead is tagged with its source (Meta ad, Google search, organic blog, LinkedIn) from the moment it enters your pipeline. We then track that lead through every stage — booked call, proposal sent, deal closed — so you can see which channels produce your best clients, not just your most leads.",
  },
  {
    q: "Do I need to know how to read the dashboard?",
    a: "No. We build your dashboard with clarity in mind — plain-English labels, color-coded performance indicators, and written context next to the numbers that matter. We also walk you through the whole dashboard on a live call and provide a quick reference guide so your team can use it independently.",
  },
  {
    q: "How often is the data refreshed?",
    a: "Most data sources update in near real-time or at least daily. Ad platform data (Meta, Google) typically refreshes every 4–6 hours. CRM data updates instantly. SEO data syncs weekly from Search Console and your rank tracker. Monthly reports are compiled and sent automatically on a fixed schedule.",
  },
  {
    q: "How long does the full setup take?",
    a: "Most analytics setups are fully live within 2 weeks — including the audit, pixel fixes, dashboard build, report automation, and live walkthrough. For businesses with more complex multi-location or multi-brand setups, we may scope an extended timeline during the initial strategy call.",
  },
];

export default function AnalyticsReportingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6 bg-gradient-to-br from-white via-indigo-50/40 to-blue-50">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-[-8%] top-[-8%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-500/20 to-blue-400/10 blur-3xl" />
          <div className="absolute right-[-6%] bottom-[-6%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-violet-400/15 to-indigo-500/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-slate-500 mb-8 justify-center"
          >
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-indigo-600 transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-indigo-600 font-medium">Analytics & Reporting</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-indigo-700 tracking-widest uppercase">
                Analytics & Reporting
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 text-balance leading-tight">
              Stop Guessing. Start{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">
                Growing With Data.
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Kazi Agency builds a unified analytics and reporting system that connects your ads, SEO, CRM, and social into one live dashboard — then delivers monthly executive reports with AI-powered recommendations so you always know what to do next.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
              >
                Book a Free Strategy Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center cursor-pointer"
              >
                See How It Works
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white rounded-2xl border border-slate-200 px-6 py-5 text-center shadow-sm"
                >
                  <Icon className="w-5 h-5 text-indigo-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-1 leading-snug">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Pain Points ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-red-50 border border-red-100">
              <span className="text-xs font-bold text-red-600 tracking-widest uppercase">
                The Problem
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              Bad Data Costs More Than No Data
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Most growing businesses are either drowning in disconnected metrics or making budget decisions based on gut feel. Neither scales. Here&apos;s what that looks like in practice.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-slate-300 hover:shadow-md transition-all"
                >
                  <div className={`${point.bg} w-11 h-11 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${point.color}`} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{point.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{point.description}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-slate-600 mb-6">
              Every one of these problems is solved with clean tracking, the right dashboard, and monthly reports tied to real KPIs. Here&apos;s what we build.
            </p>
            <Link
              href="/book-a-consultation"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3.5 rounded-xl font-bold transition-all"
            >
              Fix My Analytics Setup
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-24 px-6 bg-[#f0f4ff]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200">
              <span className="text-xs font-bold text-indigo-700 tracking-widest uppercase">
                What&apos;s Included
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              A Complete Analytics System, Not Just a Dashboard
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Every data layer your business needs — built, connected, automated, and explained in plain language every month.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {deliverables.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-indigo-200 hover:shadow-md transition-all"
                >
                  <div className={`${item.bg} w-11 h-11 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-sm leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200">
              <span className="text-xs font-bold text-indigo-700 tracking-widest uppercase">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              From Broken Tracking to a Live Dashboard in 2 Weeks
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A structured setup process that gets you from scattered data to a fully automated reporting system — fast.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-5 relative">
            <div
              aria-hidden
              className="hidden md:block absolute top-[52px] left-[calc(10%+24px)] right-[calc(10%+24px)] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
            />

            {buildSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative bg-white rounded-2xl border ${step.border} p-5 hover:shadow-lg transition-all`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`${step.bg} ${step.border} border w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <span className="text-3xl font-black text-slate-100 select-none leading-none">
                      {step.step}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{step.duration}</p>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section className="py-24 px-6 bg-[#f0f4ff]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200">
              <span className="text-xs font-bold text-indigo-700 tracking-widest uppercase">
                Why Kazi Agency
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              More Than a Mixpanel or Databox Replacement
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Standalone analytics tools give you data. We give you understanding, recommendations, and a team that acts on it every month.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm bg-white"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left p-5 font-semibold text-slate-700 min-w-[180px]">Feature</th>
                  {comparisonData.map((col) => (
                    <th
                      key={col.label}
                      className={`p-5 text-center font-bold text-sm min-w-[130px] ${
                        col.highlight ? "text-indigo-700 bg-indigo-50/60" : "text-slate-500"
                      }`}
                    >
                      {col.label}
                      {col.highlight && (
                        <span className="block mt-1 text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold mx-auto w-fit">
                          Best Value
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, fi) => (
                  <tr
                    key={feature}
                    className={`border-b border-slate-100 last:border-0 ${fi % 2 === 0 ? "bg-white" : "bg-slate-50/40"}`}
                  >
                    <td className="p-5 font-medium text-slate-700 text-sm">{feature}</td>
                    {comparisonData.map((col) => {
                      const val = col.values[fi];
                      return (
                        <td
                          key={col.label}
                          className={`p-5 text-center ${col.highlight ? "bg-indigo-50/40" : ""}`}
                        >
                          {val === true ? (
                            <Check className="w-5 h-5 text-indigo-600 mx-auto" />
                          ) : val === false ? (
                            <X className="w-4 h-4 text-red-400 mx-auto" />
                          ) : (
                            <span className="text-xs text-slate-400 font-medium">{val as string}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200">
              <span className="text-xs font-bold text-indigo-700 tracking-widest uppercase">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              Common Questions
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to know before booking a call.
            </p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-slate-900 text-sm sm:text-base leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-indigo-600 shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Free Business Audit ── */}
      <section className="py-24 px-6 bg-slate-950 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-cyan-300/30 bg-cyan-300/10">
              <Bot className="w-4 h-4 text-cyan-300" />
              <span className="text-xs font-bold text-cyan-200 tracking-widest uppercase">
                Free AI Tool
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-5 text-balance">
              Not Sure Where Your Analytics Are Falling Short?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Run our free AI Business Audit in under 2 minutes. Get an instant scored report revealing your biggest tracking gaps, missed KPIs, and growth opportunities — with a branded PDF you can keep.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5 mb-12 max-w-4xl mx-auto">
            {[
              {
                icon: BarChart3,
                label: "Performance Score",
                desc: "An instant 0–100 score across your key marketing metrics so you know exactly where you stand.",
              },
              {
                icon: Target,
                label: "Top Issues Found",
                desc: "Your biggest analytics and reporting gaps, ranked by impact — so you know what to fix first.",
              },
              {
                icon: FileText,
                label: "Free PDF Report",
                desc: "A branded, downloadable audit report with full findings, ready to share with your team.",
              },
            ].map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left hover:border-cyan-300/30 hover:bg-white/[0.08] transition-all"
              >
                <div className="bg-cyan-300/15 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-cyan-300" />
                </div>
                <p className="font-bold text-white mb-2">{label}</p>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/free-business-audit"
              className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              Get My Free AI Audit
            </Link>
            <Link
              href="/book-a-consultation"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
            >
              Skip to Strategy Call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Free. No sign-up required. Results in under 60 seconds.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-600 to-blue-600 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-10%] top-[-20%] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute right-[-8%] bottom-[-15%] w-[400px] h-[400px] rounded-full bg-blue-400/10 blur-3xl" />
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
                Ready to Scale?
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-balance">
              Let&apos;s Build an Analytics System That Tells You Exactly What to Do Next
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute strategy call. We&apos;ll audit your current tracking setup, identify what&apos;s broken or missing, and show you exactly what a unified reporting system would look like for your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center shadow-lg"
              >
                Book My Free Strategy Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
              >
                Explore All Services
              </Link>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-100 text-sm">
              {["No commitment required", "Live dashboard in under 2 weeks", "Replaces Mixpanel, Databox & more"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-200" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

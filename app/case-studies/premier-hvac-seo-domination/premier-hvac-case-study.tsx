"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Search,
  MapPin,
  Star,
  Clock,
  BarChart3,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  Zap,
  FileText,
  Link2,
  Settings,
  Target,
  Users,
  Quote,
  Filter,
  Share2,
} from "lucide-react";

const keyMetrics = [
  { value: "+312%", label: "Organic Traffic Growth", sub: "vs. baseline 6 months prior" },
  { value: "47", label: "Local Keywords at #1", sub: "up from 3 at project start" },
  { value: "89", label: "New Monthly Leads", sub: "generated from organic search" },
  { value: "$127K", label: "Attributable Revenue", sub: "added in the 6-month window" },
];

const challenges = [
  {
    icon: AlertTriangle,
    title: "Invisible to Local Searchers",
    desc: "Premier HVAC was ranking on page 3–4 for their highest-value keywords. \"AC repair Dallas\" and \"furnace installation Fort Worth\" — the searches their customers were making — were dominated by competitors. Online, they didn't exist.",
  },
  {
    icon: MapPin,
    title: "Neglected Google Business Profile",
    desc: "Their GBP listing had 11 reviews, zero recent posts, missing service categories, and incomplete business hours. Local pack visibility was near zero. The listing looked abandoned compared to competitors averaging 200+ reviews.",
  },
  {
    icon: Settings,
    title: "Serious Technical SEO Debt",
    desc: "A site audit revealed 63 crawl errors, a Core Web Vitals score in the red (LCP: 8.2s), no schema markup, and duplicate title tags across 40% of pages. Google was actively struggling to understand and index the site.",
  },
  {
    icon: FileText,
    title: "No Local Content Architecture",
    desc: "One generic \"Services\" page covered all offerings for a 12-city service area. There were no dedicated city landing pages, no FAQ content, and no topical authority signals telling Google they were the local HVAC expert.",
  },
];

const strategySteps = [
  {
    number: "01",
    icon: Settings,
    title: "Technical SEO Foundation",
    desc: "We started by eliminating every technical barrier preventing Google from properly crawling and indexing the site.",
    tactics: [
      "Resolved 63 crawl errors and fixed broken redirect chains",
      "Reduced LCP from 8.2s to 1.4s through image optimization and server-side caching",
      "Implemented LocalBusiness + Service schema markup across all service pages",
      "Consolidated duplicate content and rewrote all meta titles/descriptions",
      "Built and submitted a clean XML sitemap; disavowed toxic backlinks",
    ],
  },
  {
    number: "02",
    icon: Search,
    title: "Local Keyword Architecture",
    desc: "We mapped a 200+ keyword universe structured around service type × city, capturing the full local search demand.",
    tactics: [
      "Identified 47 high-intent primary keywords across 12 service areas",
      "Mapped search volume, competition, and commercial intent for each",
      "Created a keyword-to-page matrix ensuring zero cannibalization",
      "Prioritized quick-win keywords (low competition, moderate volume) for Month 1–2",
      "Identified 6 'money terms' with $60+ per-click value to own within 90 days",
    ],
  },
  {
    number: "03",
    icon: MapPin,
    title: "Google Business Profile & Local Authority",
    desc: "We transformed the abandoned GBP listing into a local search asset and built citation authority across the web.",
    tactics: [
      "Rewrote GBP description with keyword-optimized, conversion-focused copy",
      "Added 12 service categories and all 47 service-area cities",
      "Set up weekly GBP posting cadence (seasonal offers, service spotlights)",
      "Launched a review generation system — went from 11 to 94 reviews in 90 days",
      "Built 60+ consistent NAP citations across key local directories",
    ],
  },
  {
    number: "04",
    icon: FileText,
    title: "Local Content Authority",
    desc: "We built a topical authority moat through city landing pages, service content, and FAQ hubs that Google couldn't ignore.",
    tactics: [
      "Created 12 city-specific service landing pages (e.g., 'AC Repair in Plano, TX')",
      "Wrote 8 in-depth service pillar pages (3,000+ words each)",
      "Published 16 FAQ and how-to articles targeting high-intent informational queries",
      "Built internal linking architecture flowing authority from new content to money pages",
      "Produced seasonal content clusters: pre-summer AC prep, winter heating guides",
    ],
  },
  {
    number: "05",
    icon: Link2,
    title: "Local Link Building",
    desc: "We built domain authority through local partnerships, PR, and industry directories — targeting relevance over quantity.",
    tactics: [
      "Secured placements in 8 Dallas-area home improvement and local news sites",
      "Partnered with 3 non-competing local businesses for resource page mentions",
      "Submitted to HVAC-specific industry directories and association listings",
      "Pitched and placed 2 expert commentary pieces in regional home services publications",
      "Reclaimed 14 unlinked brand mentions with follow-up email outreach",
    ],
  },
];

const timelineMonths = [
  {
    month: "Month 1",
    title: "Audit & Foundation",
    items: [
      "Complete technical SEO audit — 63 issues identified",
      "All critical technical fixes implemented",
      "Full keyword research completed (200+ terms)",
      "GBP claimed, cleaned up, and initial optimization done",
    ],
    metric: null,
  },
  {
    month: "Month 2",
    title: "Local Authority",
    items: [
      "60+ directory citations built (consistent NAP)",
      "GBP weekly posting cadence launched",
      "Review generation system deployed",
      "On-page optimization of 8 existing service pages",
    ],
    metric: { label: "Organic traffic", value: "+42%" },
  },
  {
    month: "Month 3",
    title: "Content Deployment",
    items: [
      "12 city landing pages published",
      "8 service pillar pages launched",
      "Reviews: 11 → 47 (review system working)",
      "First 9 keywords break into page 1",
    ],
    metric: { label: "Organic traffic", value: "+97%" },
  },
  {
    month: "Month 4",
    title: "Content & Links",
    items: [
      "16 FAQ articles published",
      "Link building outreach: first 8 placements secured",
      "Local pack appearances: 6 keywords",
      "Monthly leads: 31 (up from 8 baseline)",
    ],
    metric: { label: "Organic traffic", value: "+168%" },
  },
  {
    month: "Month 5",
    title: "Scaling & Optimization",
    items: [
      "Seasonal content cluster published (pre-summer AC prep)",
      "Reviews: 94 — averaging 4.8★",
      "28 keywords on page 1; 19 in top 3",
      "Monthly leads: 67",
    ],
    metric: { label: "Organic traffic", value: "+241%" },
  },
  {
    month: "Month 6",
    title: "Domination",
    items: [
      "47 keywords at position #1",
      "Local pack visible for all 12 city-service combinations",
      "89 new monthly organic leads",
      "$127K in attributable revenue logged",
    ],
    metric: { label: "Organic traffic", value: "+312%" },
  },
];

const beforeAfter = [
  { label: "Organic Traffic (monthly visitors)", before: "1,240", after: "5,111", change: "+312%" },
  { label: "Keywords Ranking #1", before: "3", after: "47", change: "+1,467%" },
  { label: "Google Business Profile Reviews", before: "11", after: "94", change: "+754%" },
  { label: "Average Star Rating", before: "3.9★", after: "4.8★", change: "+0.9★" },
  { label: "New Monthly Leads (organic)", before: "8", after: "89", change: "+1,013%" },
  { label: "Local Pack Appearances", before: "2", after: "36", change: "+1,700%" },
  { label: "Core Web Vitals (LCP)", before: "8.2s (Poor)", after: "1.4s (Good)", change: "−83%" },
  { label: "Monthly Organic Revenue", before: "$14K est.", after: "$35K est.", change: "+150%" },
];

const otherCaseStudies = [
  {
    slug: "bloom-boutique-paid-ads-growth",
    client: "Bloom Boutique",
    industry: "Fashion E-commerce",
    headline: "4.8× ROAS — From Break-Even to $340K Revenue",
    service: "Paid Ads",
    icon: Target,
    timeframe: "90 days",
  },
  {
    slug: "apex-wellness-marketing-automation",
    client: "Apex Wellness Group",
    industry: "Health & Wellness",
    headline: "217% More Bookings & $180K in Recovered Revenue",
    service: "Automation",
    icon: Zap,
    timeframe: "5 months",
  },
  {
    slug: "fresh-roots-social-media-launch",
    client: "Fresh Roots Kitchen",
    industry: "Food & Wellness",
    headline: "0 to 24.8K Followers & $91K Revenue from Social",
    service: "Social Media",
    icon: Share2,
    timeframe: "6 months",
  },
];

export default function PremierHvacCaseStudy() {
  return (
    <main className="bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6 bg-gradient-to-br from-white via-orange-50/40 to-amber-50/20">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-[-8%] top-[-10%] w-[500px] h-[500px] rounded-full bg-orange-400/15 blur-3xl" />
          <div className="absolute right-[-6%] bottom-[-8%] w-[400px] h-[400px] rounded-full bg-amber-300/10 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-slate-500 mb-8"
          >
            <Link href="/case-studies" className="hover:text-orange-600 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Case Studies
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-700 font-medium">Premier HVAC Solutions</span>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
              <Search className="w-3.5 h-3.5" />
              SEO Case Study
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              Home Services · Dallas-Fort Worth
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Results
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight mb-6 text-balance"
          >
            Local Business SEO{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Domination
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl"
          >
            How we took Premier HVAC Solutions from page 3 obscurity to dominating 47 local keywords,
            generating 89 new monthly leads, and adding{" "}
            <strong className="text-slate-800">$127K in attributable revenue</strong> — in just 6 months.
          </motion.p>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-12 pb-12 border-b border-slate-200"
          >
            {[
              { icon: Users, label: "Client", value: "Premier HVAC Solutions" },
              { icon: MapPin, label: "Location", value: "Dallas–Fort Worth, TX" },
              { icon: Search, label: "Service", value: "Local SEO" },
              { icon: Clock, label: "Timeline", value: "6 Months" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                    <p className="text-sm font-bold text-slate-800">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Key metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {keyMetrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.07 }}
                className="bg-orange-50 border border-orange-200 rounded-2xl p-5"
              >
                <p className="text-3xl md:text-4xl font-black text-orange-600 mb-1">{m.value}</p>
                <p className="text-sm font-bold text-slate-800 leading-snug mb-1">{m.label}</p>
                <p className="text-xs text-slate-500">{m.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── The Challenge ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200">
              <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
              <span className="text-xs font-bold text-orange-700 tracking-widest uppercase">The Problem</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              A Great Business, Completely Invisible Online
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Premier HVAC Solutions had been in business for 14 years. Excellent reviews from repeat customers,
              skilled technicians, and competitive pricing — but their online presence was costing them thousands
              of dollars in lost business every month.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {challenges.map((ch, i) => {
              const Icon = ch.icon;
              return (
                <motion.div
                  key={ch.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-6"
                >
                  <div className="bg-orange-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{ch.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{ch.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Snapshot callout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-slate-900 rounded-2xl p-7 text-white"
          >
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Baseline Snapshot — Day 1</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Avg. Keyword Position", value: "31.4" },
                { label: "Monthly Organic Visits", value: "1,240" },
                { label: "GBP Reviews", value: "11" },
                { label: "Monthly Organic Leads", value: "8" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Strategy ── */}
      <section className="py-24 px-6 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span className="text-xs font-bold text-orange-700 tracking-widest uppercase">Our Strategy</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              A 5-Pillar Local SEO System
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              We didn&apos;t rely on one tactic. We built a compounding SEO system where every pillar reinforced the others —
              technical credibility, keyword architecture, local authority, content depth, and link equity.
            </p>
          </motion.div>

          <div className="space-y-5">
            {strategySteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-2 shrink-0">
                        <span className="text-4xl font-black text-slate-100 leading-none">{step.number}</span>
                        <div className="bg-orange-50 w-11 h-11 rounded-xl flex items-center justify-center">
                          <Icon className="w-5 h-5 text-orange-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-slate-600 mb-5 leading-relaxed">{step.desc}</p>
                        <ul className="space-y-2.5">
                          {step.tactics.map((tactic) => (
                            <li key={tactic} className="flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                              <span className="text-sm text-slate-700 leading-relaxed">{tactic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200">
              <Clock className="w-3.5 h-3.5 text-orange-600" />
              <span className="text-xs font-bold text-orange-700 tracking-widest uppercase">Month by Month</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              How the Results Compounded Over 6 Months
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              SEO doesn&apos;t flip a switch — it compounds. Here&apos;s exactly what we executed each month and the traffic
              milestones hit along the way.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-slate-200" aria-hidden />

            <div className="space-y-8">
              {timelineMonths.map((month, i) => (
                <motion.div
                  key={month.month}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative pl-16 md:pl-20"
                >
                  <div className="absolute left-3.5 md:left-5 top-3 w-5 h-5 rounded-full bg-orange-500 border-4 border-white shadow-sm" />

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{month.month}</span>
                        <h3 className="text-lg font-bold text-slate-900 mt-0.5">{month.title}</h3>
                      </div>
                      {month.metric && (
                        <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-2 text-center shrink-0">
                          <p className="text-xl font-black text-orange-600">{month.metric.value}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{month.metric.label}</p>
                        </div>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {month.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-2" />
                          <span className="text-sm text-slate-600 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Before / After ── */}
      <section className="py-24 px-6 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200">
              <BarChart3 className="w-3.5 h-3.5 text-orange-600" />
              <span className="text-xs font-bold text-orange-700 tracking-widest uppercase">Before vs. After</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              The Numbers Don&apos;t Lie
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl">
              Every metric below is pulled from Google Search Console, Google Analytics, and the client&apos;s CRM.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto rounded-2xl border border-slate-200"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest w-1/2">Metric</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 text-center whitespace-nowrap">Before</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-center whitespace-nowrap">After</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-orange-400 text-center whitespace-nowrap">Change</th>
                </tr>
              </thead>
              <tbody>
                {beforeAfter.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50"} border-b border-slate-100 last:border-0`}
                  >
                    <td className="px-6 py-4 font-medium text-slate-700">{row.label}</td>
                    <td className="px-6 py-4 text-slate-400 font-medium text-center whitespace-nowrap">{row.before}</td>
                    <td className="px-6 py-4 font-bold text-slate-900 text-center whitespace-nowrap">{row.after}</td>
                    <td className="px-6 py-4 font-black text-orange-600 text-center whitespace-nowrap">{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── Client Quote ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl p-8 md:p-12 text-white overflow-hidden"
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/10 blur-2xl" />
            </div>

            <Quote className="w-10 h-10 text-white/25 mb-6" />

            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 relative z-10">
              &ldquo;Before Kazi Agency, I had no idea SEO could actually move the needle this fast. We went from
              getting maybe 8 calls a month from the website to 89. The phone doesn&apos;t stop ringing now —
              we actually had to hire two additional technicians to keep up. The $127K in new revenue in just
              six months paid back our entire annual marketing budget four times over.&rdquo;
            </blockquote>

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-lg">
                M
              </div>
              <div>
                <p className="font-bold text-white">Marcus T.</p>
                <p className="text-orange-100 text-sm">Owner, Premier HVAC Solutions · Dallas–Fort Worth, TX</p>
              </div>
              <div className="ml-auto flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-white text-white" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Key Takeaways ── */}
      <section className="py-20 px-6 bg-orange-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
              What Made This Campaign Work
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Three non-negotiable principles that drove the results — applicable to any local service business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Zap,
                title: "Technical First",
                desc: "No amount of content or links can overcome a slow, crawl-error-ridden site. We fixed the technical foundation before publishing a single piece of content — and saw ranking improvements within 3 weeks.",
              },
              {
                icon: MapPin,
                title: "City × Service = Local Dominance",
                desc: "Generic service pages don't rank locally. We built dedicated pages for every city/service combination — 12 cities × 8 services = 96 local landing pages, each targeting precise search intent.",
              },
              {
                icon: TrendingUp,
                title: "Reviews as a Ranking Signal",
                desc: "Going from 11 to 94 reviews (4.8★) didn't just help conversion — it materially improved local pack rankings. Google trusts businesses that customers trust. Review velocity was the fastest win of the campaign.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-orange-100 p-6"
                >
                  <div className="bg-orange-50 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Other Case Studies ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">More Case Studies</h2>
              <p className="text-slate-600 mt-2">See results across other industries and services.</p>
            </div>
            <Link
              href="/case-studies"
              className="text-sm font-bold text-orange-600 hover:underline flex items-center gap-1 shrink-0"
            >
              View all case studies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {otherCaseStudies.map((cs, i) => {
              const Icon = cs.icon;
              return (
                <motion.div
                  key={cs.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={`/case-studies/${cs.slug}`}
                    className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200 p-6 hover:border-orange-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-orange-50 p-3 rounded-xl">
                        <Icon className="w-5 h-5 text-orange-600" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">
                        {cs.service}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1">{cs.industry}</p>
                    <p className="text-sm font-bold text-slate-700 mb-2">{cs.client}</p>
                    <h3 className="text-base font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors leading-snug flex-1">
                      {cs.headline}
                    </h3>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {cs.timeframe}
                      </div>
                      <div className="flex items-center gap-1 text-orange-600 text-sm font-semibold">
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-orange-500 to-amber-500 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-10%] top-[-20%] w-[500px] h-[500px] rounded-full bg-white/8 blur-3xl" />
          <div className="absolute right-[-8%] bottom-[-15%] w-[400px] h-[400px] rounded-full bg-white/8 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/15 border border-white/25">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-xs font-bold text-white tracking-widest uppercase">
                Your Business Could Be Next
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-balance">
              Ready to Dominate Local Search in Your Market?
            </h2>
            <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute SEO strategy call. We&apos;ll audit your current rankings, show you exactly
              which keywords you should be owning, and build a roadmap to get you there.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center shadow-lg"
              >
                Book Your Free SEO Strategy Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/free-business-audit"
                className="bg-white/15 hover:bg-white/25 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
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

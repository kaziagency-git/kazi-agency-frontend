"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Search,
  Target,
  Star,
  Clock,
  BarChart3,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  Zap,
  Filter,
  Users,
  Quote,
  Share2,
  Mail,
  Linkedin,
  Database,
  GitMerge,
  Crosshair,
  PhoneCall,
  Bot,
  DollarSign,
} from "lucide-react";

const keyMetrics = [
  { value: "+284%", label: "Qualified Leads Generated", sub: "vs. 3-month baseline before engagement" },
  { value: "$2.1M", label: "Sales Pipeline Built", sub: "qualified opportunities in CRM" },
  { value: "+41%", label: "Close Rate Lift", sub: "from 18% to 25.4% on worked leads" },
  { value: "12 hrs", label: "Saved Per Rep Per Week", sub: "eliminated from manual prospecting" },
];

const challenges = [
  {
    icon: AlertTriangle,
    title: "100% Referral-Dependent Growth",
    desc: "TechStack Pro had grown to $1.2M ARR entirely on word-of-mouth. A great problem — until referrals slowed. With no outbound engine, no inbound content strategy, and no systematic lead generation, the pipeline dried up within two quarters. The business had no predictable way to grow.",
  },
  {
    icon: Crosshair,
    title: "No ICP — Chasing Every Lead, Closing Few",
    desc: "The sales team was running demos for any company that expressed interest — SMBs, enterprises, e-commerce, agencies, SaaS firms. Without an Ideal Customer Profile, close rates were stuck at 18%. Reps were exhausted, quota was being missed, and the CEO was still personally closing deals.",
  },
  {
    icon: Clock,
    title: "12+ Hours Per Rep Per Week on Manual Prospecting",
    desc: "Each sales rep was spending Monday mornings manually searching LinkedIn, building spreadsheets, copying emails into sequences, and updating the CRM by hand. Twelve hours a week of low-value admin was eating into the selling time of a team that already didn't have enough pipeline to work.",
  },
  {
    icon: PhoneCall,
    title: "Leads Going Cold — No Nurture Infrastructure",
    desc: "When a prospect didn't respond to the first email or booked a demo and then ghosted, the lead was effectively lost. There were no automated follow-up sequences, no re-engagement campaigns, no lead scoring, and no process for handling the 70% of leads who aren't ready to buy today but will be in 90 days.",
  },
];

const strategySteps = [
  {
    number: "01",
    icon: Crosshair,
    title: "ICP Definition & Market Segmentation",
    desc: "Before a single message was sent, we spent two weeks with the leadership and sales team defining exactly who TechStack Pro's best customers were — and building a targetable profile around them.",
    tactics: [
      "Audited the top 40 existing customers by ARR, retention, and NPS score to find common patterns",
      "Identified 3 high-fit verticals: Series A–B SaaS companies, mid-market professional services, and growth-stage e-commerce brands",
      "Defined firmographic ICP: 50–500 employees, $5M–$100M revenue, US-based, using HubSpot or Salesforce",
      "Identified technographic signals — companies using Zapier, Segment, or Intercom were 3.2× more likely to convert",
      "Built a negative ICP to filter out time-wasting segments — removing 60% of the existing contact database immediately",
    ],
  },
  {
    number: "02",
    icon: Linkedin,
    title: "LinkedIn + Cold Email Outbound System",
    desc: "We built a multi-touch outbound system combining LinkedIn social selling with highly personalised cold email — removing the generic spray-and-pray approach entirely.",
    tactics: [
      "Optimised CEO and rep LinkedIn profiles for credibility signals: featured case studies, recommendations, banner, and headline",
      "Built a 3-step LinkedIn sequence: connection request → value post comment → DM with insight-led opening",
      "Wrote 6 cold email frameworks targeting each ICP vertical with problem-specific opening lines",
      "Used Clay.com for dynamic personalisation — referencing each prospect's recent funding, hires, or product launches",
      "Set up sending infrastructure with warmed domains, SPF/DKIM/DMARC — achieving 94% inbox delivery rate",
    ],
  },
  {
    number: "03",
    icon: Bot,
    title: "AI-Powered Lead Enrichment & Scoring",
    desc: "We implemented an AI-driven lead intelligence stack that automatically researched, enriched, and scored every contact — freeing reps from 12 hours of weekly manual prospecting.",
    tactics: [
      "Integrated Apollo.io + Clay.com pipeline: auto-enrich leads with company size, tech stack, funding, and LinkedIn data",
      "Built a lead scoring model weighted by: ICP match (40%), engagement signal (35%), intent data (25%)",
      "Connected G2 and Bombora intent data to surface in-market buyers actively researching competitors",
      "Automated CRM data entry — contact, company, and activity fields populated without manual input",
      "Set up Slack alerts for high-score leads (80+) triggering immediate rep notification for same-day outreach",
    ],
  },
  {
    number: "04",
    icon: GitMerge,
    title: "CRM Automation & Nurture Sequences",
    desc: "We transformed the CRM from a graveyard of stale contacts into a working revenue engine — automating follow-up so no lead ever went cold again.",
    tactics: [
      "Built 5 automated HubSpot sequences: cold outreach, demo follow-up, post-trial, re-engagement (90-day), and champion expansion",
      "Designed a 12-touch nurture track for leads not yet ready to buy — delivering case studies, ROI calculators, and video demos",
      "Set up deal stage automation: leads auto-advance through pipeline stages based on email opens, link clicks, and meeting bookings",
      "Created a 'lead resurrection' workflow — triggered after 45 days of silence with a new angle, new sender, and new offer",
      "Built a closed-lost re-engagement campaign — re-contacting lapsed opportunities every 90 days with new proof points",
    ],
  },
  {
    number: "05",
    icon: Database,
    title: "Content-Led Inbound Authority",
    desc: "We built an inbound content engine that attracted ICP-fit buyers to TechStack Pro — turning the website and LinkedIn presence into a lead-generation asset.",
    tactics: [
      "Published 8 high-intent SEO articles targeting bottom-of-funnel queries: 'best [category] software for SaaS', '[competitor] alternative'",
      "Created a free ROI calculator tool — captured 214 email leads in the first 6 weeks",
      "Launched a LinkedIn content cadence for the CEO: 3 posts/week mixing insight, social proof, and behind-the-scenes stories",
      "Produced 2 long-form case studies (TechStack Pro's own clients) gated behind email capture",
      "Set up a 'Request a Demo' ABM landing page personalised by vertical — SaaS, services, e-commerce — with vertical-specific proof",
    ],
  },
];

const timelineMonths = [
  {
    month: "Month 1",
    title: "ICP & Foundation",
    items: [
      "ICP workshop completed — 3 target verticals defined, negative ICP built",
      "Contact database cleaned: 60% of low-fit contacts removed",
      "LinkedIn profiles of CEO + 2 reps overhauled",
      "HubSpot CRM audit — deal stages restructured, duplicate contacts merged",
      "Apollo + Clay enrichment pipeline integrated",
    ],
    metric: null,
  },
  {
    month: "Month 2",
    title: "Outbound Launch",
    items: [
      "Cold email infrastructure live: 3 warmed domains, 94% inbox rate",
      "First 3 LinkedIn + email sequences launched to ICP segment 1 (SaaS)",
      "Lead scoring model live — 80+ score triggers same-day rep notification",
      "First 11 qualified leads booked into pipeline",
      "CRM automation sequences: demo follow-up and cold nurture active",
    ],
    metric: { label: "New qualified leads", value: "31" },
  },
  {
    month: "Month 3",
    title: "Optimisation & Inbound",
    items: [
      "Winning email subject lines and openers identified — CTR lifted from 4.1% to 11.3%",
      "Second ICP vertical launched (professional services)",
      "ROI calculator tool published — 214 inbound leads in 6 weeks",
      "CEO LinkedIn content hitting 15,000–40,000 impressions per post",
      "Closed-lost re-engagement campaign fired — 8 re-opened opportunities",
    ],
    metric: { label: "New qualified leads", value: "87" },
  },
  {
    month: "Month 4",
    title: "Scale & Pipeline",
    items: [
      "Third ICP vertical launched (e-commerce) — highest conversion rate at 34%",
      "12 hrs/rep/week recovered — full outbound running on automation",
      "G2 + Bombora intent data surfacing in-market buyers daily",
      "Total active pipeline: $2.1M in qualified opportunities",
      "Close rate lifted from 18% to 25.4% on ICP-matched leads",
    ],
    metric: { label: "Pipeline generated", value: "$2.1M" },
  },
];

const beforeAfter = [
  { label: "Monthly Qualified Leads", before: "11", after: "42", change: "+284%" },
  { label: "Active Sales Pipeline", before: "$230K", after: "$2.1M", change: "+813%" },
  { label: "Demo-to-Close Rate", before: "18%", after: "25.4%", change: "+41%" },
  { label: "Manual Prospecting Time (per rep)", before: "12 hrs/wk", after: "1.5 hrs/wk", change: "−88%" },
  { label: "Cold Email Reply Rate", before: "N/A", after: "11.3%", change: "New channel" },
  { label: "LinkedIn Connection→Meeting Rate", before: "N/A", after: "8.7%", change: "New channel" },
  { label: "Lead Response Time", before: "6+ hours", after: "< 5 min (automated)", change: "−98%" },
  { label: "Pipeline Coverage Ratio", before: "0.8×", after: "4.2×", change: "+425%" },
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
    slug: "premier-hvac-seo-domination",
    client: "Premier HVAC Solutions",
    industry: "Home Services",
    headline: "312% Organic Traffic Growth in 6 Months",
    service: "SEO",
    icon: Search,
    timeframe: "6 months",
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
];

export default function TechstackProCaseStudy() {
  return (
    <main className="bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6 bg-linear-to-br from-white via-sky-50/40 to-cyan-50/20">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-[-8%] top-[-10%] w-125 h-125 rounded-full bg-[#046BAF]/12 blur-3xl" />
          <div className="absolute right-[-6%] bottom-[-8%] w-100 h-100 rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-slate-500 mb-8"
          >
            <Link href="/case-studies" className="hover:text-[#046BAF] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Case Studies
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-700 font-medium">TechStack Pro</span>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold">
              <Filter className="w-3.5 h-3.5" />
              Lead Generation Case Study
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
              <Database className="w-3.5 h-3.5" />
              B2B SaaS · San Francisco, CA
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-bold">
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
            B2B Lead Generation{" "}
            <span className="bg-linear-to-r from-[#046BAF] to-cyan-500 bg-clip-text text-transparent">
              Machine
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl"
          >
            How we built TechStack Pro a full outbound and inbound lead generation engine from scratch —
            eliminating 12 hours of manual prospecting per rep per week and building a{" "}
            <strong className="text-slate-800">$2.1M qualified sales pipeline</strong> in just 4 months.
          </motion.p>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-12 pb-12 border-b border-slate-200"
          >
            {[
              { icon: Users, label: "Client", value: "TechStack Pro" },
              { icon: Database, label: "Industry", value: "B2B SaaS" },
              { icon: Filter, label: "Service", value: "Lead Generation" },
              { icon: Clock, label: "Timeline", value: "4 Months" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#046BAF]" />
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
                className="bg-sky-50 border border-sky-200 rounded-2xl p-5"
              >
                <p className="text-3xl md:text-4xl font-black text-[#046BAF] mb-1">{m.value}</p>
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200">
              <AlertTriangle className="w-3.5 h-3.5 text-[#046BAF]" />
              <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">The Problem</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              Great Product. No Pipeline. No System.
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              TechStack Pro had built a genuinely excellent B2B SaaS product — a tech stack intelligence platform
              used by growth teams at mid-market companies. But their go-to-market was a house of cards: $1.2M
              ARR built entirely on word-of-mouth, a sales team burning hours on manual prospecting, and a
              pipeline that had effectively run dry.
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
                  <div className="bg-sky-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#046BAF]" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{ch.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{ch.desc}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Day 1 snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 bg-slate-900 rounded-2xl p-7 text-white"
          >
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Baseline Snapshot — Day 1</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Monthly Qualified Leads", value: "11" },
                { label: "Active Sales Pipeline", value: "$230K" },
                { label: "Demo-to-Close Rate", value: "18%" },
                { label: "Manual Prospecting Time", value: "12 hrs/rep/wk" },
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200">
              <Sparkles className="w-3.5 h-3.5 text-[#046BAF]" />
              <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">Our Strategy</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              A 5-Pillar B2B Lead Generation System
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              We built a full-stack lead generation engine — not a single channel, not a single tactic. ICP
              precision, multi-channel outbound, AI enrichment, CRM automation, and inbound authority worked
              as one compounding system.
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
                        <div className="bg-sky-50 w-11 h-11 rounded-xl flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#046BAF]" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-slate-600 mb-5 leading-relaxed">{step.desc}</p>
                        <ul className="space-y-2.5">
                          {step.tactics.map((tactic) => (
                            <li key={tactic} className="flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-[#046BAF] shrink-0 mt-0.5" />
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

      {/* ── Channel Mix Visual ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200">
              <Share2 className="w-3.5 h-3.5 text-[#046BAF]" />
              <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">Lead Source Breakdown</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              Where the $2.1M Pipeline Came From
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl">
              The pipeline wasn&apos;t built from a single channel. Each source layer compounded into the total —
              here&apos;s how the 42 monthly qualified leads broke down by origin.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Mail,
                channel: "Cold Email",
                leads: "16 leads/mo",
                pct: 38,
                detail: "11.3% reply rate on ICP-targeted sequences",
                color: "bg-sky-50 border-sky-200",
                barColor: "bg-[#046BAF]",
                textColor: "text-[#046BAF]",
              },
              {
                icon: Linkedin,
                channel: "LinkedIn Outbound",
                leads: "12 leads/mo",
                pct: 29,
                detail: "8.7% connection-to-meeting rate",
                color: "bg-cyan-50 border-cyan-200",
                barColor: "bg-cyan-500",
                textColor: "text-cyan-700",
              },
              {
                icon: TrendingUp,
                channel: "Inbound / SEO",
                leads: "9 leads/mo",
                pct: 21,
                detail: "ROI calculator + SEO articles",
                color: "bg-violet-50 border-violet-200",
                barColor: "bg-violet-500",
                textColor: "text-violet-700",
              },
              {
                icon: GitMerge,
                channel: "Re-engagement",
                leads: "5 leads/mo",
                pct: 12,
                detail: "Closed-lost + 90-day nurture wins",
                color: "bg-emerald-50 border-emerald-200",
                barColor: "bg-emerald-500",
                textColor: "text-emerald-700",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.channel}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`${item.color} border rounded-2xl p-5`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${item.textColor}`} />
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{item.channel}</p>
                  <p className={`text-2xl font-black ${item.textColor} mb-1`}>{item.leads}</p>
                  <p className="text-xs text-slate-500 mb-4 leading-snug">{item.detail}</p>
                  <div className="h-2 bg-white/70 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                      className={`h-full ${item.barColor} rounded-full`}
                    />
                  </div>
                  <p className={`text-xs font-bold ${item.textColor} mt-1.5`}>{item.pct}% of pipeline</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 px-6 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200">
              <Clock className="w-3.5 h-3.5 text-[#046BAF]" />
              <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">Month by Month</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              How We Built $2.1M in Pipeline Over 4 Months
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Lead generation compounds when each layer feeds the next. Here&apos;s exactly what was executed
              each month and the pipeline milestones along the way.
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
                  <div className="absolute left-3.5 md:left-5 top-3 w-5 h-5 rounded-full bg-[#046BAF] border-4 border-white shadow-sm" />

                  <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{month.month}</span>
                        <h3 className="text-lg font-bold text-slate-900 mt-0.5">{month.title}</h3>
                      </div>
                      {month.metric && (
                        <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-2 text-center shrink-0">
                          <p className="text-xl font-black text-[#046BAF]">{month.metric.value}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{month.metric.label}</p>
                        </div>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {month.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#046BAF] shrink-0 mt-2" />
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
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-sky-100 border border-sky-200">
              <BarChart3 className="w-3.5 h-3.5 text-[#046BAF]" />
              <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">Before vs. After</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              The Numbers Don&apos;t Lie
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl">
              Every metric is pulled from HubSpot CRM, Apollo.io analytics, and the client&apos;s own sales
              reporting dashboard — verified against closed-won opportunity records.
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
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-sky-400 text-center whitespace-nowrap">Change</th>
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
                    <td className="px-6 py-4 font-black text-[#046BAF] text-center whitespace-nowrap">{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Pipeline callout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 grid sm:grid-cols-3 gap-4"
          >
            {[
              { icon: Filter, label: "Monthly Qualified Leads (end of Month 4)", value: "42", color: "bg-sky-50 border-sky-200 text-[#046BAF]" },
              { icon: DollarSign, label: "Total Active Sales Pipeline", value: "$2.1M", color: "bg-cyan-50 border-cyan-200 text-cyan-700" },
              { icon: TrendingUp, label: "Pipeline Coverage Ratio (4.2× quota)", value: "4.2×", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className={`${item.color} border rounded-2xl p-5 flex items-start gap-4`}>
                  <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-black">{item.value}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">{item.label}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Client Quote ── */}
      <section className="py-24 px-6 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-linear-to-br from-[#046BAF] to-cyan-500 rounded-3xl p-8 md:p-12 text-white overflow-hidden"
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/10 blur-2xl" />
            </div>

            <Quote className="w-10 h-10 text-white/25 mb-6" />

            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 relative z-10">
              &ldquo;We had a great product and zero predictable pipeline. I was personally closing every deal and
              the team was burning out on manual prospecting. Kazi Agency built us a proper lead generation
              system in 4 months — ICP definition, outbound sequences, AI enrichment, CRM automation, the
              whole thing. We went from 11 qualified leads a month to 42, built $2.1M in pipeline, and our reps
              got their Mondays back. This is the infrastructure we should have built two years ago.&rdquo;
            </blockquote>

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-lg">
                J
              </div>
              <div>
                <p className="font-bold text-white">James K.</p>
                <p className="text-blue-100 text-sm">CEO, TechStack Pro · San Francisco, CA</p>
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
      <section className="py-20 px-6 bg-sky-50">
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
              Three principles that transformed a referral-only business into a predictable lead generation
              machine — applicable to any B2B SaaS or services company.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Crosshair,
                title: "ICP Before Everything",
                desc: "TechStack Pro's biggest unlock wasn't a new channel — it was removing the wrong leads. Defining a tight ICP and removing 60% of the low-fit database meant the same team effort produced dramatically better results. Precision beats volume at every stage of B2B lead generation.",
              },
              {
                icon: Bot,
                title: "Automate Research, Not Relationships",
                desc: "The 12 hours per rep per week wasn't spent selling — it was spent researching. We automated the research (AI enrichment, lead scoring, CRM data entry) and gave that time back to human selling. Automation handles the data; humans handle the conversation.",
              },
              {
                icon: GitMerge,
                title: "Most Revenue is in the Follow-Up",
                desc: "70% of B2B buyers aren't ready to purchase on first contact. TechStack Pro had no nurture infrastructure — every unresponsive lead was permanent revenue loss. The 12-touch nurture track and lead resurrection workflow alone recovered $380K of the $2.1M pipeline.",
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
                  className="bg-white rounded-2xl border border-sky-100 p-6"
                >
                  <div className="bg-sky-50 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
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
              className="text-sm font-bold text-[#046BAF] hover:underline flex items-center gap-1 shrink-0"
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
                    className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200 p-6 hover:border-sky-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-sky-50 p-3 rounded-xl">
                        <Icon className="w-5 h-5 text-[#046BAF]" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-100 text-sky-700">
                        {cs.service}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1">{cs.industry}</p>
                    <p className="text-sm font-bold text-slate-700 mb-2">{cs.client}</p>
                    <h3 className="text-base font-bold text-slate-900 mb-4 group-hover:text-[#046BAF] transition-colors leading-snug flex-1">
                      {cs.headline}
                    </h3>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {cs.timeframe}
                      </div>
                      <div className="flex items-center gap-1 text-[#046BAF] text-sm font-semibold">
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
      <section className="py-24 px-6 bg-linear-to-br from-[#046BAF] to-cyan-500 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-10%] top-[-20%] w-125 h-125 rounded-full bg-white/8 blur-3xl" />
          <div className="absolute right-[-8%] bottom-[-15%] w-100 h-100 rounded-full bg-white/8 blur-3xl" />
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
                Your Pipeline Could Be Next
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-balance">
              Ready to Build a Predictable B2B Lead Generation Machine?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute pipeline strategy call. We&apos;ll audit your current lead generation setup,
              identify your ICP, and show you exactly how to build $1M+ in qualified pipeline in 90 days.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-white text-[#046BAF] hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center shadow-lg"
              >
                Book Your Free Pipeline Strategy Call
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

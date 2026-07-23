"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Target,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Shield,
  Clock,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Zap,
  Settings,
  FileText,
  DollarSign,
  Eye,
  MousePointer,
  Check,
  X,
  AlertTriangle,
  Globe,
  Users,
  Layers,
  RefreshCw,
} from "lucide-react";

const stats = [
  { value: "200%", label: "Average return on ad spend (ROAS) businesses achieve with properly managed Google Ads campaigns", icon: DollarSign },
  { value: "65%", label: "Of high-intent customers click on paid ads when they are actively searching to buy a product or service", icon: MousePointer },
  { value: "3.5×", label: "Higher conversion rate from PPC traffic compared to organic search — paid visitors are further down the funnel", icon: TrendingUp },
  { value: "80%", label: "Of businesses running paid ads on Google see a measurable lift in brand awareness within 30 days of launch", icon: Eye },
];

const painPoints = [
  {
    icon: DollarSign,
    title: "Burning Budget on Untargeted Clicks",
    description:
      "Running ads without precise audience targeting, negative keyword lists, or bid strategy is like leaving your wallet open on a busy street. Every irrelevant click drains your budget — and most DIY advertisers lose 30–60% of their spend on traffic that was never going to convert.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Eye,
    title: "Ad Creative That Blends Into the Feed",
    description:
      "Generic stock-photo ads and weak copy get ignored. On Meta alone, users see 50+ ads per session. If your creative doesn't stop the scroll in 1.5 seconds, your ad spend is funding your competitor's visibility. Bad creative is the single biggest driver of poor ROAS.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Settings,
    title: "No Conversion Tracking — Flying Blind",
    description:
      "If you can't accurately attribute which ad, audience, or keyword generated a lead or sale, you have no basis for optimisation decisions. Most self-managed accounts have broken tracking, missing events, or no server-side setup — making every data-driven decision guesswork.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: MousePointer,
    title: "Landing Pages That Kill Conversions",
    description:
      "Sending paid traffic to your homepage, or to a landing page that doesn't match the ad's promise, destroys Quality Score on Google and tanks conversion rates. Your ads can be perfect and still fail if the page doesn't continue the conversation the ad started.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: Globe,
    title: "No Cross-Platform Strategy",
    description:
      "Meta, Google, and LinkedIn have completely different ad formats, audiences, buying intents, and optimisation levers. Running the same creative across all three — or ignoring two of them — leaves massive revenue on the table and misaligns your message with where buyers are in the funnel.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: BarChart3,
    title: "Agency Fees With No Accountability",
    description:
      "Many PPC agencies charge 15–20% of ad spend and deliver a monthly vanity-metric report (impressions, clicks) while ignoring the metrics that actually matter: cost per lead, cost per acquisition, and revenue generated. You pay more as budgets grow — but never know if it's working.",
    color: "text-slate-500",
    bg: "bg-slate-50",
  },
];

const deliverables = [
  {
    icon: Settings,
    title: "Full Account Audit & Campaign Strategy",
    description:
      "We audit your existing ad accounts (or build from scratch) — analysing wasted spend, audience overlap, Quality Scores, conversion tracking accuracy, and competitor ads. Then we produce a channel-specific strategy with clear ROAS targets and audience frameworks before a single pound is spent.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    icon: Globe,
    title: "Meta Ads (Facebook & Instagram)",
    description:
      "Full-funnel Meta campaigns: prospecting audiences using interest, lookalike, and custom segments at the top of funnel; retargeting warm audiences with dynamic creative mid-funnel; and conversion-focused campaigns for high-intent bottom-of-funnel buyers — across Feed, Reels, Stories, and Messenger placements.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Target,
    title: "Google Ads (Search, Display & Performance Max)",
    description:
      "Tightly structured Search campaigns with exact-match and phrase-match keyword groups, sculpted negative keyword lists, and ad copy A/B testing. Display and remarketing campaigns to capture users across the Google network. Performance Max campaigns where appropriate, with asset group segmentation and audience signals to direct Google's machine learning.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Users,
    title: "LinkedIn Ads Management",
    description:
      "For B2B businesses, LinkedIn is unmatched for reaching decision-makers by job title, seniority, industry, and company size. We manage Sponsored Content, Message Ads, Lead Gen Forms, and Conversation Ads — all structured around your ideal client profile with copy that speaks to professional buyers, not consumers.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: Zap,
    title: "AI-Powered Creative Testing",
    description:
      "We run structured creative experiments — testing hooks, visuals, CTAs, and ad formats — using AI to analyse performance signals and identify winning variants faster than manual testing allows. Losing ads are paused; winning ads are scaled. Every iteration produces sharper creative and lower CPAs.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Eye,
    title: "Conversion Tracking & Attribution Setup",
    description:
      "Accurate tracking is the foundation of PPC. We implement server-side conversion events via Google Tag Manager and Meta's Conversions API, set up GA4 event tracking, configure UTM parameter structures, and establish cross-channel attribution models — so every lead and sale is tied to the exact campaign that generated it.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: FileText,
    title: "Landing Page Optimisation",
    description:
      "We audit and improve your existing landing pages — or build dedicated campaign pages — to match ad messaging, strengthen CTAs, reduce friction, and improve page speed. A landing page optimised for Quality Score and user intent can reduce CPC by 20–40% while dramatically increasing conversion rates.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: BarChart3,
    title: "Monthly ROI Reporting & Strategy Review",
    description:
      "Every month you receive a plain-English performance report: ad spend, impressions, clicks, cost-per-click, conversions, cost-per-lead, cost-per-acquisition, and ROAS — by platform and campaign. We hold a monthly strategy call to walk through findings, explain what we changed, and align on next month's priorities.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
];

const buildSteps = [
  {
    step: "01",
    title: "Account Audit & Strategy",
    description:
      "We audit existing accounts for wasted spend, broken tracking, and structural issues. We research your competitors' ads, map your audience framework across platforms, and set ROAS and CPA targets before any budget moves.",
    icon: Settings,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-100",
    duration: "Days 1–5",
  },
  {
    step: "02",
    title: "Tracking & Creative Build",
    description:
      "Conversion tracking is set up correctly first — server-side events, GA4, UTMs. Then we build campaign structure, write ad copy, design creative assets, and set up landing pages. No live spend until the foundation is right.",
    icon: Zap,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    duration: "Days 6–14",
  },
  {
    step: "03",
    title: "Launch & Early Optimisation",
    description:
      "Campaigns go live with controlled budgets. We monitor performance daily in the first two weeks — adjusting bids, pausing underperforming ad sets, adding negative keywords, and identifying early creative winners to scale.",
    icon: Target,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    duration: "Weeks 3–4",
  },
  {
    step: "04",
    title: "Scale & Expand",
    description:
      "Once ROAS benchmarks are hit, we scale winning campaigns, expand to new audience segments, test new platforms, and increase budget systematically — without breaking the performance the initial campaigns built.",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    duration: "Month 2+",
  },
  {
    step: "05",
    title: "Report, Iterate & Compound",
    description:
      "Monthly reports and strategy calls keep you fully informed. We run ongoing creative tests, refine audiences, and pursue new opportunities — compounding campaign performance month over month with data-backed decisions.",
    icon: BarChart3,
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
    duration: "Ongoing",
  },
];

const comparisonFeatures = [
  "Full Campaign Strategy & Audit",
  "Meta Ads Management",
  "Google Search Ads",
  "LinkedIn Ads Management",
  "AI Creative Testing",
  "Server-Side Conversion Tracking",
  "Landing Page Optimisation",
  "Negative Keyword Management",
  "Monthly ROI Reporting",
  "Dedicated PPC Strategist",
];

const comparisonData = [
  {
    label: "Google Ads (Self-Managed)",
    values: [false, false, "basic", false, false, false, false, "manual", "basic", false],
    highlight: false,
  },
  {
    label: "Freelance PPC Specialist",
    values: ["limited", true, true, "extra cost", false, "limited", false, true, true, false],
    highlight: false,
  },
  {
    label: "Typical PPC Agency",
    values: [true, true, true, "extra cost", "limited", "limited", false, true, true, false],
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
    q: "How much should I spend on paid advertising?",
    a: "The right ad budget depends on your industry, average deal size, and cost-per-acquisition targets. As a starting point, most service businesses see meaningful results with £1,500–£5,000/month in ad spend. B2B companies targeting high-value clients can often justify more because the LTV of a single client outweighs the acquisition cost. We don't recommend a minimum spend; we recommend the minimum spend needed to generate enough data to optimise properly — typically 30–50 conversions per month per campaign. In your strategy call we'll model out the budget needed to hit your lead targets based on your industry's average CPC and conversion rate benchmarks.",
  },
  {
    q: "How quickly will I see results from PPC?",
    a: "Unlike SEO, PPC can generate leads from day one of launch. The first two weeks are typically a learning phase — the platforms gather data and we optimise based on early signals. Most clients see their first qualified leads within the first week. Full campaign optimisation, where ROAS targets are consistently hit, typically takes 4–8 weeks as we refine audiences, test creative, and scale what works. The key difference between PPC and SEO is immediacy: PPC starts generating returns quickly; SEO compounds over time. The best growth strategies use both in tandem.",
  },
  {
    q: "What platforms do you manage ads on?",
    a: "We manage paid advertising across Meta (Facebook and Instagram — Feed, Reels, Stories, and Messenger), Google (Search, Display, YouTube, and Performance Max), and LinkedIn (Sponsored Content, Message Ads, Lead Gen Forms, and Conversation Ads). For most service businesses, we start with Meta and Google Search since they offer the widest reach and strongest intent signals. LinkedIn is our recommendation for B2B businesses selling to professionals where job title or company size targeting is essential. We don't spread budget thin across every platform — we recommend the channels that match your buyers' actual behaviour and allocate budget where your return will be highest.",
  },
  {
    q: "Do you handle ad creative and copywriting?",
    a: "Yes — creative production is included in our PPC management. Our team handles ad copy for all text-based formats (Google Search headlines and descriptions, LinkedIn copy). For Meta and LinkedIn visual ads, we can work with your existing brand assets, repurpose content you already have, or brief our design team to produce static graphics and video ad templates. We also run structured creative tests — rotating hooks, visuals, and CTAs — to find winning variants systematically. We don't outsource creative to the client and expect them to produce assets; we treat creative as a core part of campaign performance, not a bonus service.",
  },
  {
    q: "How do you track which ads are generating leads and sales?",
    a: "Accurate attribution is the foundation of everything we do. We implement server-side conversion tracking via Google Tag Manager and Meta's Conversions API to capture events that browser-based tracking misses (due to iOS privacy changes and ad blockers). We set up GA4 event tracking, configure UTM parameter structures for every campaign, and establish the attribution model that best reflects your actual sales cycle. This means when you get a lead, you know exactly which campaign, ad set, and ad generated it — not just that 'ads drove traffic.' Our monthly reports pull from this data to show real cost-per-lead and cost-per-acquisition figures.",
  },
  {
    q: "What's your management fee structure?",
    a: "We charge a fixed monthly management fee — not a percentage of ad spend. Percentage-based models create a conflict of interest where your agency benefits from increasing your budget regardless of whether it improves performance. Our flat-fee model means our incentive is aligned with yours: improving ROAS and reducing your cost-per-acquisition. Management fees vary based on the number of platforms managed and campaign complexity. We discuss fee structure transparently during your strategy call, and there are no setup fees or long lock-in contracts — we earn your business month by month on results.",
  },
  {
    q: "Can you take over an existing ad account that's underperforming?",
    a: "Yes — account takeovers are one of the most common engagements we handle. The first thing we do is a full account audit: examining campaign structure, keyword strategy, audience targeting, creative performance, Quality Scores, conversion tracking accuracy, and historical spend patterns. We produce a clear findings document that identifies exactly what's been wasting budget and what opportunities exist. In most underperforming accounts, we find 3–4 structural issues that are driving the majority of wasted spend — fixing these alone typically reduces cost-per-lead significantly within the first 30 days.",
  },
  {
    q: "How do you prevent wasted ad spend?",
    a: "Wasted spend typically comes from four sources: irrelevant search queries (fixed with negative keyword lists and tight match types), poor audience targeting (fixed with specific audience frameworks and exclusions), underperforming creative (fixed with structured A/B testing and rapid iteration), and mismatched landing pages (fixed with dedicated, message-matched pages). We address all four from day one. Every campaign has a negative keyword list that grows weekly, audience exclusions to prevent overlap, creative testing schedules, and landing page monitoring. We also set automated budget caps and performance alerts so no campaign can overspend without triggering a review.",
  },
  {
    q: "What's the difference between Google Search Ads and Google Performance Max?",
    a: "Google Search Ads target users based on the specific keywords they type into Google — giving you precise control over when your ad appears. Performance Max (PMax) is an automated campaign type that serves ads across Search, Display, YouTube, Gmail, and Maps using machine learning to find conversions. Search campaigns are better for high-intent, bottom-of-funnel buyers with clear search behaviour; PMax is better for businesses with larger budgets and clear conversion signals who want to expand reach across the Google ecosystem. We typically recommend starting with Search campaigns to establish conversion data, then layering in PMax once the algorithm has enough signals to work with. We run both where appropriate and structure them so they don't cannibalise each other.",
  },
];

const toolItems = [
  {
    id: "google-ads",
    name: "Google Ads",
    tagline: "Search, Display & PMax",
    iconBg: "#FFF7ED",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#4285F4] flex items-center justify-center text-white font-black text-[8px] shrink-0">
        GA
      </span>
    ),
  },
  {
    id: "meta",
    name: "Meta Business Suite",
    tagline: "Facebook & Instagram Ads",
    iconBg: "#EFF6FF",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#0866FF] flex items-center justify-center text-white font-black text-[8px] shrink-0">
        Mb
      </span>
    ),
  },
  {
    id: "linkedin",
    name: "LinkedIn Campaign Manager",
    tagline: "B2B Sponsored Ads",
    iconBg: "#EFF6FF",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#0A66C2] flex items-center justify-center text-white font-black text-[8px] shrink-0">
        Li
      </span>
    ),
  },
  {
    id: "ga4",
    name: "Google Analytics 4",
    tagline: "Traffic & Conversion Data",
    iconBg: "#FFF3E0",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#E37400] flex items-center justify-center text-white font-black text-[8px] shrink-0">
        GA4
      </span>
    ),
  },
  {
    id: "gtm",
    name: "Google Tag Manager",
    tagline: "Server-Side Tracking",
    iconBg: "#FFF7ED",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#246FDB] flex items-center justify-center text-white font-black text-[8px] shrink-0">
        GTM
      </span>
    ),
  },
  {
    id: "hotjar",
    name: "Hotjar",
    tagline: "Landing Page Behaviour",
    iconBg: "#FFF0E6",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#FD3A5C] flex items-center justify-center text-white font-black text-[9px] shrink-0">
        Hj
      </span>
    ),
  },
  {
    id: "semrush",
    name: "SEMrush",
    tagline: "Competitor Ad Research",
    iconBg: "#FFF8F0",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#FF642D] flex items-center justify-center text-white font-black text-[9px] shrink-0">
        SR
      </span>
    ),
  },
  {
    id: "ghl",
    name: "GoHighLevel CRM",
    tagline: "Lead Pipeline Integration",
    iconBg: "#F0FDF4",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#16A34A] flex items-center justify-center text-white font-black text-[9px] shrink-0">
        GH
      </span>
    ),
  },
];

export default function PaidAdvertisingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6 bg-gradient-to-br from-white via-red-50/40 to-orange-50">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-[-8%] top-[-8%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-red-500/20 to-orange-400/10 blur-3xl" />
          <div className="absolute right-[-6%] bottom-[-6%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-orange-400/15 to-red-500/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-slate-500 mb-8 justify-center"
          >
            <Link href="/" className="hover:text-[#046BAF] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-[#046BAF] transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-red-600 font-medium">Paid Advertising (PPC)</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-red-50 border border-red-200">
              <Target className="w-4 h-4 text-red-600" />
              <span className="text-xs font-bold text-red-700 tracking-widest uppercase">
                Paid Advertising (PPC)
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 text-balance leading-tight">
              Stop Burning Ad Budget. Start{" "}
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                Generating Qualified Leads on Meta, Google & LinkedIn
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Kazi Agency manages your paid advertising end-to-end — campaign strategy, ad creative, conversion tracking, and ongoing optimisation — across every platform where your buyers are ready to act. No guesswork. No wasted budget. Just leads that flow directly into your pipeline with a measurable cost per acquisition.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
              >
                Get a Free Ad Account Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center cursor-pointer"
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
                  <Icon className="w-5 h-5 text-red-500 mx-auto mb-2" />
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
              Why Most PPC Campaigns Waste More Than They Return
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              These six problems destroy ad budgets in almost every self-managed or poorly-run account — and each one is directly solvable with the right setup.
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
              Recognise any of these? Here&apos;s exactly how we fix all of them.
            </p>
            <Link
              href="/book-a-consultation"
              className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-7 py-3.5 rounded-xl font-bold transition-all"
            >
              Fix My Ad Account — Free Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-24 px-6 bg-red-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-red-100 border border-red-200">
              <span className="text-xs font-bold text-red-700 tracking-widest uppercase">
                What&apos;s Included
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              Eight PPC Deliverables That Turn Ad Spend Into Pipeline
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Every Kazi Agency PPC engagement includes these eight core deliverables — fully executed, reported on, and optimised every month.
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
                  className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-red-200 hover:shadow-md transition-all"
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

      {/* ── Platforms We Manage ── */}
      <section className="py-16 px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-red-100 border border-red-200">
              <span className="text-xs font-bold text-red-700 tracking-widest uppercase">
                Platforms & Channels
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
              Every Channel Where Your Buyers Are Ready to Act
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base">
              We manage campaigns across the three platforms that drive the highest commercial return for service businesses — plus the tools behind the scenes that make tracking and optimisation possible.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: Globe,
                platform: "Meta Ads",
                subtitle: "Facebook & Instagram",
                color: "text-blue-600",
                bg: "bg-blue-50",
                border: "border-blue-100",
                description: "The world's largest social ad network — 3.2 billion users across Facebook and Instagram. Best for B2C and B2B businesses targeting specific demographics, interests, and behaviours with visual creative across Feed, Reels, Stories, and Messenger. Unmatched for top-of-funnel awareness and retargeting warm audiences.",
                formats: ["Feed Ads", "Reels & Video", "Story Ads", "Messenger Ads", "Dynamic Retargeting"],
              },
              {
                icon: Target,
                platform: "Google Ads",
                subtitle: "Search, Display & YouTube",
                color: "text-red-600",
                bg: "bg-red-50",
                border: "border-red-100",
                description: "Google processes 8.5 billion searches per day — including buyers actively searching for exactly what you sell right now. Search ads capture high-intent demand at the moment of decision. Display campaigns build awareness across 2 million+ websites. Performance Max campaigns scale across the entire Google ecosystem.",
                formats: ["Search Ads", "Display Network", "YouTube Ads", "Performance Max", "Shopping Ads"],
              },
              {
                icon: Users,
                platform: "LinkedIn Ads",
                subtitle: "B2B Decision-Maker Targeting",
                color: "text-sky-600",
                bg: "bg-sky-50",
                border: "border-sky-100",
                description: "For B2B businesses, LinkedIn offers targeting by job title, seniority, industry, company size, and professional interests that no other platform can match. Ideal for reaching C-suite, directors, and managers at specific company types. Higher CPCs than Meta — but significantly higher average deal sizes and shorter sales cycles.",
                formats: ["Sponsored Content", "Lead Gen Forms", "Message Ads", "Conversation Ads", "Document Ads"],
              },
            ].map((plat, i) => {
              const Icon = plat.icon;
              return (
                <motion.div
                  key={plat.platform}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-white rounded-2xl border ${plat.border} p-6 hover:shadow-lg transition-all`}
                >
                  <div className={`${plat.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${plat.color}`} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">{plat.platform}</h3>
                  <p className={`text-xs font-semibold ${plat.color} mb-3 uppercase tracking-wider`}>{plat.subtitle}</p>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{plat.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {plat.formats.map((fmt) => (
                      <span key={fmt} className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2 py-1 rounded-lg font-medium">
                        {fmt}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Tools Slider ── */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-red-100 border border-red-200">
              <span className="text-xs font-bold text-red-700 tracking-widest uppercase">
                Our PPC Stack
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
              Enterprise-Grade Tools Running Behind Every Campaign
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base">
              From server-side conversion tracking to AI creative testing — we use the same platforms as the world&apos;s top performance marketing agencies.
            </p>
          </motion.div>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          <div className="flex gap-4 animate-scroll-left w-max px-6">
            {[...toolItems, ...toolItems].map((tool, i) => (
              <div
                key={`${tool.id}-${i}`}
                className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3.5 shadow-sm hover:shadow-md hover:border-red-200 transition-all shrink-0 cursor-default"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: tool.iconBg }}
                >
                  {tool.icon}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm leading-none mb-1">{tool.name}</p>
                  <p className="text-xs text-slate-400 leading-none">{tool.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-slate-400 mt-8 px-6">
          All leads generated flow directly into your CRM via GoHighLevel integration — no manual data entry, no dropped leads.
        </p>
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-red-100 border border-red-200">
              <span className="text-xs font-bold text-red-700 tracking-widest uppercase">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              From Wasted Budget to Predictable Pipeline — Step by Step
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A proven five-phase PPC process — tracking and creative first, results second, scale third.
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
      <section className="py-24 px-6 bg-red-50/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-red-100 border border-red-200">
              <span className="text-xs font-bold text-red-700 tracking-widest uppercase">
                Why Kazi Agency
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              Full-Service PPC Agency vs. DIY, Freelancers & Typical Agencies
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Most PPC options leave critical gaps. Here&apos;s how a complete done-for-you approach compares to every alternative.
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
                  <th className="text-left p-5 font-semibold text-slate-700 min-w-[200px]">Feature</th>
                  {comparisonData.map((col) => (
                    <th
                      key={col.label}
                      className={`p-5 text-center font-bold text-sm min-w-[150px] ${
                        col.highlight ? "text-red-700 bg-red-50/60" : "text-slate-500"
                      }`}
                    >
                      {col.label}
                      {col.highlight && (
                        <span className="block mt-1 text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold mx-auto w-fit">
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
                          className={`p-5 text-center ${col.highlight ? "bg-red-50/30" : ""}`}
                        >
                          {val === true ? (
                            <Check className="w-5 h-5 text-red-500 mx-auto" />
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 bg-white rounded-2xl border border-red-200 p-8"
          >
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                {
                  title: "Self-Managed Google/Meta Ads",
                  cost: "Your time + ad spend",
                  note: "The platforms make it easy to start spending — and very hard to optimise. Without deep knowledge of auction mechanics, audience layering, and creative testing, most self-managed accounts waste 40–60% of budget on poorly targeted clicks.",
                },
                {
                  title: "Freelance PPC Specialist",
                  cost: "£500–£2,500/mo + ad spend",
                  note: "Freelancers can be strong in one platform but rarely manage all three. No team behind them means no creative support, limited reporting, and a single point of failure. If they go quiet, your campaigns stall.",
                },
                {
                  title: "Kazi Agency — Full-Stack PPC",
                  cost: "Fixed management fee — all included",
                  note: "Strategy, creative, tracking, optimisation, landing page improvements, and monthly reporting — across Meta, Google, and LinkedIn — all managed by a dedicated PPC strategist. Flat fee, no percentage of spend conflicts.",
                  highlight: true,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`rounded-xl p-5 ${item.highlight ? "bg-red-50 border border-red-200" : "bg-slate-50"}`}
                >
                  <p className={`font-bold mb-1 ${item.highlight ? "text-red-700" : "text-slate-700"}`}>
                    {item.title}
                  </p>
                  <p className={`text-xl font-black mb-2 ${item.highlight ? "text-red-500" : "text-slate-900"}`}>
                    {item.cost}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Kazi Agency ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-red-100 border border-red-200">
                <span className="text-xs font-bold text-red-700 tracking-widest uppercase">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6 text-balance">
                We Manage the Full Paid Acquisition System — You Just Close the Leads
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Most PPC agencies run campaigns in a silo — they drive clicks to your homepage and call it done. We manage the entire paid acquisition system: strategy, creative, tracking, landing pages, and CRM integration. Every lead generated by your ads flows directly into your pipeline with full attribution, so you always know your cost per acquired client.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  "Flat management fee — no percentage-of-spend conflict of interest",
                  "Creative and copywriting included — no additional retainers needed",
                  "Server-side conversion tracking — accurate data even post-iOS 14",
                  "All leads flow into your GoHighLevel CRM pipeline automatically",
                  "Meta, Google, and LinkedIn under one unified strategy and reporting",
                  "Weekly optimisation — not monthly set-and-forget campaign management",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="/book-a-consultation"
                  className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-7 py-3.5 rounded-xl font-bold transition-all"
                >
                  Book a Free PPC Strategy Call
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {[
                {
                  icon: DollarSign,
                  title: "ROAS-Focused Optimisation",
                  description:
                    "We optimise for the metric that actually matters — return on ad spend. Every campaign decision is measured against your cost-per-acquisition target, not vanity metrics like impressions or click-through rate.",
                },
                {
                  icon: Layers,
                  title: "Full-Funnel Strategy",
                  description:
                    "Cold audiences, warm retargeting, and hot converters are managed with distinct messaging and bidding strategies. Not every campaign should push for a conversion — we match ad type to buyer intent at every stage.",
                },
                {
                  icon: RefreshCw,
                  title: "Continuous Creative Refresh",
                  description:
                    "Ad fatigue kills performance. We systematically test new hooks, formats, and creative angles every month — ensuring your campaigns stay fresh and your cost-per-click doesn't creep up as audiences tire of the same ad.",
                },
                {
                  icon: AlertTriangle,
                  title: "Rapid Problem Detection",
                  description:
                    "Campaigns are monitored daily. Automated alerts flag spend anomalies, CTR drops, and conversion tracking failures within hours — not at the end of the month when thousands of pounds may have been wasted.",
                },
              ].map((point, i) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-red-200 hover:shadow-md transition-all"
                  >
                    <div className="bg-red-50 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-red-500" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{point.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {point.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-red-50/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-red-100 border border-red-200">
              <span className="text-xs font-bold text-red-700 tracking-widest uppercase">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              Common Questions About Paid Advertising Management
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Straight answers to every question business owners ask before investing in PPC.
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
                    className={`w-5 h-5 text-red-500 shrink-0 transition-transform duration-200 ${
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

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-red-500 to-orange-600 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-10%] top-[-20%] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute right-[-8%] bottom-[-15%] w-[400px] h-[400px] rounded-full bg-orange-300/10 blur-3xl" />
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
                Ready to Scale Your Leads?
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-balance">
              Let&apos;s Build a Paid Advertising System That Fills Your Pipeline Every Month
            </h2>
            <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute PPC strategy call. We&apos;ll audit your current ad accounts, identify your biggest wasted spend, and show you exactly what a 90-day growth plan looks like for your business across Meta, Google, and LinkedIn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center shadow-lg"
              >
                Book My Free PPC Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
              >
                Explore All Services
              </Link>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-red-100 text-sm">
              {["No commitment required", "Free account audit included", "90-day growth roadmap provided"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-200" />
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

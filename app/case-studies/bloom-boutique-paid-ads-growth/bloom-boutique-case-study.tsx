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
  ShoppingBag,
  Settings,
  Users,
  Quote,
  Filter,
  DollarSign,
  Layers,
  RefreshCw,
  MousePointerClick,
  Share2,
} from "lucide-react";

const keyMetrics = [
  { value: "4.8×", label: "ROAS Achieved", sub: "up from a break-even 1.2× ROAS" },
  { value: "$340K", label: "Revenue in 90 Days", sub: "attributed to paid channels" },
  { value: "−67%", label: "Cost Per Acquisition", sub: "from $87 down to $29 per order" },
  { value: "+218%", label: "Conversion Rate Lift", sub: "0.8% → 2.5% site-wide" },
];

const challenges = [
  {
    icon: AlertTriangle,
    title: "Burning Budget at Break-Even",
    desc: "Bloom Boutique was spending $20,000/month on Meta and Google Ads with a 1.2× ROAS — barely covering ad costs. Every dollar spent produced $1.20 in revenue, leaving zero room for profit. The campaigns were technically running but operationally bleeding money.",
  },
  {
    icon: Layers,
    title: "No Funnel Architecture",
    desc: "All budget was dumped into a single 'conversions' campaign with no separation between cold audiences, warm traffic, and past buyers. Cold users who had never heard of the brand were shown the same ads as cart abandoners — wasting spend and confusing the algorithm.",
  },
  {
    icon: RefreshCw,
    title: "Creative Fatigue — 6 Months, Same 3 Ads",
    desc: "The same three static image ads had been running unchanged for over 6 months. Ad frequency had climbed to 8.4×, meaning the average user had seen the same ad eight times. Click-through rates were at 0.9% (industry average: 2.5–3%), signaling complete audience exhaustion.",
  },
  {
    icon: MousePointerClick,
    title: "Zero Retargeting Infrastructure",
    desc: "Despite 14,000+ monthly site visitors, there was no retargeting in place. No cart-abandonment sequences, no product-view audiences, no customer lookalikes. High-intent shoppers who had visited product pages or added to cart were never followed up with — a massive revenue leak.",
  },
];

const strategySteps = [
  {
    number: "01",
    icon: Settings,
    title: "Campaign Architecture Rebuild",
    desc: "We dismantled the single-campaign structure and rebuilt a full-funnel paid media system — each stage with its own budget, bidding strategy, creative, and audience logic.",
    tactics: [
      "Built a 3-tier funnel: TOFU (awareness), MOFU (consideration), BOFU (conversion)",
      "Separated cold, warm, and hot audiences into dedicated ad sets with independent budgets",
      "Set TOFU bidding to CPM/reach, MOFU to landing page views, BOFU to purchase value",
      "Implemented campaign budget optimization (CBO) at the BOFU stage for algorithm efficiency",
      "Restructured Google campaigns: Shopping, Dynamic Search, and Brand Protection campaigns separated",
    ],
  },
  {
    number: "02",
    icon: ShoppingBag,
    title: "AI-Driven Creative Testing System",
    desc: "We built a systematic creative testing framework — launching 24 creative variants in Week 1 and using a structured elimination process to find winners within 14 days.",
    tactics: [
      "Developed 24 creative variants across 4 formats: static image, carousel, video, and UGC",
      "Tested 6 unique messaging angles: urgency, social proof, price, style, occasion, and transformation",
      "Used Meta's Advantage+ placements with creative-level performance reporting",
      "Set kill thresholds: any ad with CTR below 1.8% or CPA above $60 paused by Day 7",
      "Scaled winners at 20% daily budget increases to avoid audience shock and algorithm reset",
    ],
  },
  {
    number: "03",
    icon: Users,
    title: "Audience Segmentation & Lookalike Build",
    desc: "We replaced broad interest targeting with precision-segmented audiences built from first-party data — creating a scalable lookalike ecosystem from Bloom's actual buyers.",
    tactics: [
      "Uploaded 3,200 customer emails and built Value-Based Lookalike audiences at 1%, 2%, and 5%",
      "Created behavioral segments: all site visitors (14-day), product page viewers (7-day), add-to-cart (3-day)",
      "Layered purchase-intent signals (time-on-site, scroll depth) using custom events via Meta Pixel",
      "Built a Detailed Targeting Expansion audience using competitor brand affinities + fashion interest stacking",
      "Suppressed existing customers from TOFU campaigns to prevent wasted impressions",
    ],
  },
  {
    number: "04",
    icon: RefreshCw,
    title: "Full-Funnel Retargeting System",
    desc: "We built the retargeting infrastructure Bloom had never had — turning 14,000 monthly site visitors into a warm revenue pipeline with automated, sequenced follow-up.",
    tactics: [
      "Cart abandonment sequence: 1-hour, 24-hour, and 72-hour retargeting windows with progressive discounts",
      "Product-view retargeting: dynamic product ads (DPA) serving the exact item viewed within 7 days",
      "Post-purchase upsell sequences: buyers shown complementary product recommendations within 14 days",
      "Win-back campaigns targeting customers who purchased 90+ days ago with 'New Arrivals' creative",
      "Frequency capping: max 3 impressions per 7-day window across all retargeting sets",
    ],
  },
  {
    number: "05",
    icon: Target,
    title: "Google Shopping & Search Domination",
    desc: "We restructured Google campaigns to capture the high-intent search demand that Meta's social ads couldn't reach — particularly purchase-ready shoppers comparing products.",
    tactics: [
      "Rebuilt Google Shopping feed: optimized titles, descriptions, and images for click-through",
      "Created Standard Shopping campaigns segmented by product category and margin tier",
      "Launched Dynamic Search Ads (DSA) to capture long-tail fashion queries not covered by keywords",
      "Set up brand protection campaigns to prevent competitor bidding on 'Bloom Boutique' searches",
      "Integrated Google Merchant Center promotions — free shipping threshold and seasonal discount overlays",
    ],
  },
];

const timelineWeeks = [
  {
    period: "Week 1–2",
    title: "Audit & Strategy",
    items: [
      "Full paid ads audit — identified $14,200/mo in wasted spend",
      "Pixel health check & conversion event verification",
      "Creative performance analysis — all 3 ads flagged as fatigued (frequency 8.4×)",
      "Funnel architecture and budget allocation strategy finalized",
    ],
    metric: null,
  },
  {
    period: "Week 3–4",
    title: "Foundation Setup",
    items: [
      "New campaign structure built across Meta and Google",
      "24 creative variants designed and QA'd",
      "Lookalike audiences built from 3,200 customer emails",
      "Google Shopping feed optimized (titles, descriptions, images)",
    ],
    metric: { label: "ROAS (first buys)", value: "2.1×" },
  },
  {
    period: "Week 5–6",
    title: "Launch & Test",
    items: [
      "All 24 creative variants live across TOFU, MOFU, BOFU",
      "Cart abandonment retargeting launched (1h / 24h / 72h sequences)",
      "Dynamic Product Ads live — product-view retargeting active",
      "Google Shopping and DSA campaigns generating first conversions",
    ],
    metric: { label: "ROAS", value: "3.1×" },
  },
  {
    period: "Week 7–8",
    title: "Scale Winners",
    items: [
      "Top 6 creatives identified — budget scaled 20%/day over 7 days",
      "Underperforming ad sets paused (saved $4,100/wk in wasted spend)",
      "UGC video creative emerged as top performer (CTR: 4.1%)",
      "CPA dropped from $87 to $41",
    ],
    metric: { label: "ROAS", value: "3.8×" },
  },
  {
    period: "Week 9–10",
    title: "Retargeting Revenue",
    items: [
      "Cart abandonment sequence generating $18,400 in recovered revenue",
      "Post-purchase upsell sequence launched — AOV lift of $23 per order",
      "Win-back campaign re-activated 214 lapsed customers",
      "ROAS on retargeting audiences alone: 9.2×",
    ],
    metric: { label: "ROAS", value: "4.3×" },
  },
  {
    period: "Week 11–12",
    title: "Full Scale",
    items: [
      "Budget scaled to $28K/month — maintained 4.8× ROAS at scale",
      "Google Shopping driving 31% of total attributed revenue",
      "Conversion rate: 0.8% → 2.5% (landing page + ad relevance lift)",
      "Total 90-day attributed revenue: $340,000",
    ],
    metric: { label: "ROAS", value: "4.8×" },
  },
];

const beforeAfter = [
  { label: "Monthly Ad Spend", before: "$20,000", after: "$28,000", change: "+40%" },
  { label: "ROAS", before: "1.2×", after: "4.8×", change: "+300%" },
  { label: "Monthly Revenue (attributed)", before: "$24,000", after: "$134,000", change: "+458%" },
  { label: "Cost Per Acquisition", before: "$87", after: "$29", change: "−67%" },
  { label: "Site Conversion Rate", before: "0.8%", after: "2.5%", change: "+218%" },
  { label: "Ad Click-Through Rate", before: "0.9%", after: "3.2%", change: "+256%" },
  { label: "Cart Abandonment Recovery", before: "$0", after: "$18,400/mo", change: "New stream" },
  { label: "Return Customer Rate", before: "12%", after: "31%", change: "+158%" },
];

const otherCaseStudies = [
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

export default function BloomBoutiqueCaseStudy() {
  return (
    <main className="bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6 bg-linear-to-br from-white via-red-50/40 to-orange-50/20">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-[-8%] top-[-10%] w-125 h-125 rounded-full bg-red-400/15 blur-3xl" />
          <div className="absolute right-[-6%] bottom-[-8%] w-100 h-100 rounded-full bg-orange-300/10 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-slate-500 mb-8"
          >
            <Link href="/case-studies" className="hover:text-red-600 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Case Studies
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-700 font-medium">Bloom Boutique</span>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold">
              <Target className="w-3.5 h-3.5" />
              Paid Ads Case Study
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
              <ShoppingBag className="w-3.5 h-3.5" />
              Fashion E-commerce · Austin, TX
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold">
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
            E-commerce Revenue{" "}
            <span className="bg-linear-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Scaling with Paid Ads
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl"
          >
            How we rebuilt Bloom Boutique&apos;s Meta and Google campaigns from scratch —
            turning a bleeding 1.2× ROAS into{" "}
            <strong className="text-slate-800">$340K in 90-day attributed revenue</strong> at a
            profitable 4.8× return on ad spend.
          </motion.p>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-12 pb-12 border-b border-slate-200"
          >
            {[
              { icon: Users, label: "Client", value: "Bloom Boutique" },
              { icon: ShoppingBag, label: "Industry", value: "Fashion E-commerce" },
              { icon: Target, label: "Service", value: "Meta & Google Paid Ads" },
              { icon: Clock, label: "Timeline", value: "90 Days" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-red-600" />
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
                className="bg-red-50 border border-red-200 rounded-2xl p-5"
              >
                <p className="text-3xl md:text-4xl font-black text-red-600 mb-1">{m.value}</p>
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-red-100 border border-red-200">
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span className="text-xs font-bold text-red-700 tracking-widest uppercase">The Problem</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              Spending $20K a Month to Barely Break Even
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Bloom Boutique had a beautifully curated fashion brand, a loyal offline following, and a growing
              e-commerce store. But their paid advertising was a slow drain. After 18 months of &quot;running ads,&quot;
              they had nothing to show for it except an exhausted audience and a frustrated founder.
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
                  <div className="bg-red-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-red-600" />
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
                { label: "Monthly Ad Spend", value: "$20,000" },
                { label: "ROAS", value: "1.2×" },
                { label: "Cost Per Acquisition", value: "$87" },
                { label: "Site Conversion Rate", value: "0.8%" },
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-red-100 border border-red-200">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span className="text-xs font-bold text-red-700 tracking-widest uppercase">Our Strategy</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              A 5-Stage Paid Media Rebuild
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              We didn&apos;t tweak the existing campaigns — we shut them down and built a full-funnel paid
              media engine from scratch. Every stage was designed to feed the next: cold audiences warmed,
              warm audiences converted, buyers retained.
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
                        <div className="bg-red-50 w-11 h-11 rounded-xl flex items-center justify-center">
                          <Icon className="w-5 h-5 text-red-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-slate-600 mb-5 leading-relaxed">{step.desc}</p>
                        <ul className="space-y-2.5">
                          {step.tactics.map((tactic) => (
                            <li key={tactic} className="flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
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

      {/* ── ROAS Journey Visual ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-red-100 border border-red-200">
              <TrendingUp className="w-3.5 h-3.5 text-red-600" />
              <span className="text-xs font-bold text-red-700 tracking-widest uppercase">ROAS Progression</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              From 1.2× to 4.8× in 90 Days
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl">
              The ROAS didn&apos;t jump overnight — it compounded as each system layer came online. Here&apos;s
              the progression by bi-weekly period.
            </p>
          </motion.div>

          <div className="bg-[#f8fafc] rounded-2xl border border-slate-200 p-6 md:p-8">
            {/* Max bar height = 160px; label ≈ 16px + gap 6px = 182px max column < h-52 (208px) */}
            <div className="flex items-end gap-3 md:gap-5 h-52 mb-4">
              {[
                { period: "Start",    roas: "1.2×", pct: 15  },
                { period: "Wk 3–4",  roas: "2.1×", pct: 30  },
                { period: "Wk 5–6",  roas: "3.1×", pct: 50  },
                { period: "Wk 7–8",  roas: "3.8×", pct: 65  },
                { period: "Wk 9–10", roas: "4.3×", pct: 82  },
                { period: "Wk 11–12",roas: "4.8×", pct: 100 },
              ].map((bar, i) => (
                <div key={bar.period} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-xs font-black text-red-600 whitespace-nowrap">{bar.roas}</span>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                    style={{ height: `${Math.round(bar.pct * 1.6)}px`, transformOrigin: "bottom" }}
                    className="w-full bg-linear-to-t from-red-500 to-orange-400 rounded-t-lg"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 md:gap-5">
              {["Start", "Wk 3–4", "Wk 5–6", "Wk 7–8", "Wk 9–10", "Wk 11–12"].map((p) => (
                <span key={p} className="flex-1 text-center text-[10px] md:text-xs text-slate-400 font-medium leading-tight">
                  {p}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-400 text-center mt-4">
              ROAS measured on a 7-day attributed window across Meta and Google combined
            </p>
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-red-100 border border-red-200">
              <Clock className="w-3.5 h-3.5 text-red-600" />
              <span className="text-xs font-bold text-red-700 tracking-widest uppercase">Week by Week</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              Exactly What Happened Over 90 Days
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Paid ads scale fast when the foundation is right. Here&apos;s the precise execution sequence
              that turned a failing account into a $340K revenue engine in three months.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-slate-200" aria-hidden />

            <div className="space-y-8">
              {timelineWeeks.map((week, i) => (
                <motion.div
                  key={week.period}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative pl-16 md:pl-20"
                >
                  <div className="absolute left-3.5 md:left-5 top-3 w-5 h-5 rounded-full bg-red-500 border-4 border-white shadow-sm" />

                  <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{week.period}</span>
                        <h3 className="text-lg font-bold text-slate-900 mt-0.5">{week.title}</h3>
                      </div>
                      {week.metric && (
                        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2 text-center shrink-0">
                          <p className="text-xl font-black text-red-600">{week.metric.value}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{week.metric.label}</p>
                        </div>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {week.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-red-100 border border-red-200">
              <BarChart3 className="w-3.5 h-3.5 text-red-600" />
              <span className="text-xs font-bold text-red-700 tracking-widest uppercase">Before vs. After</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              The Numbers Don&apos;t Lie
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl">
              Every metric below is pulled from Meta Ads Manager, Google Ads, and Shopify Analytics — verified
              against the client&apos;s own reporting dashboard.
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
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-red-400 text-center whitespace-nowrap">Change</th>
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
                    <td className="px-6 py-4 font-black text-red-600 text-center whitespace-nowrap">{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Revenue breakdown callout */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 grid sm:grid-cols-3 gap-4"
          >
            {[
              { icon: DollarSign, label: "Total 90-Day Attributed Revenue", value: "$340,000", color: "bg-red-50 border-red-200 text-red-600" },
              { icon: Target, label: "Total Ad Spend (90 Days)", value: "$71,000", color: "bg-slate-50 border-slate-200 text-slate-600" },
              { icon: TrendingUp, label: "Net Revenue After Spend", value: "$269,000", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
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
            className="relative bg-linear-to-br from-red-500 to-orange-500 rounded-3xl p-8 md:p-12 text-white overflow-hidden"
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/10 blur-2xl" />
            </div>

            <Quote className="w-10 h-10 text-white/25 mb-6" />

            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 relative z-10">
              &ldquo;I&apos;d been running ads for 18 months and honestly considered shutting the whole thing down.
              We were spending $20K a month and barely covering costs. Kazi Agency rebuilt everything in the
              first two weeks — new structure, new creatives, proper retargeting. By month two we were at 3.8×
              ROAS. By the end of 90 days, we had done $340K in ad-driven revenue. I wish I&apos;d called them
              on day one.&rdquo;
            </blockquote>

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-lg">
                S
              </div>
              <div>
                <p className="font-bold text-white">Sarah M.</p>
                <p className="text-red-100 text-sm">Founder, Bloom Boutique · Austin, TX</p>
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
      <section className="py-20 px-6 bg-red-50">
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
              Three principles that transformed a bleeding ad account into a profit engine — applicable to any
              DTC e-commerce brand.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Layers,
                title: "Architecture Before Budget",
                desc: "Adding budget to a broken structure just burns money faster. We fixed the funnel architecture first — TOFU, MOFU, BOFU with correct bidding objectives at each stage. That structural fix alone improved ROAS from 1.2× to 2.1× before we changed a single creative.",
              },
              {
                icon: ShoppingBag,
                title: "Creative is the Variable",
                desc: "In Meta advertising, creative is your targeting. We tested 24 variants systematically and found that UGC video outperformed polished brand ads by 3.1× on CTR. Constant creative refresh — pausing fatigued ads before frequency exceeds 4× — is the single biggest unlock in paid social.",
              },
              {
                icon: RefreshCw,
                title: "Retargeting = Found Money",
                desc: "Bloom had 14,000 monthly site visitors and zero retargeting. Cart abandonment sequences alone recovered $18,400/month in would-have-been-lost revenue. For most e-commerce brands, a properly built retargeting stack is the highest-ROAS inventory available — and it was completely unused.",
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
                  className="bg-white rounded-2xl border border-red-100 p-6"
                >
                  <div className="bg-red-50 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-red-600" />
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
              className="text-sm font-bold text-red-600 hover:underline flex items-center gap-1 shrink-0"
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
                    className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200 p-6 hover:border-red-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-red-50 p-3 rounded-xl">
                        <Icon className="w-5 h-5 text-red-600" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-700">
                        {cs.service}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1">{cs.industry}</p>
                    <p className="text-sm font-bold text-slate-700 mb-2">{cs.client}</p>
                    <h3 className="text-base font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors leading-snug flex-1">
                      {cs.headline}
                    </h3>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {cs.timeframe}
                      </div>
                      <div className="flex items-center gap-1 text-red-600 text-sm font-semibold">
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
      <section className="py-24 px-6 bg-linear-to-br from-red-500 to-orange-500 relative overflow-hidden">
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
                Your Store Could Be Next
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-balance">
              Ready to Scale Your E-commerce Revenue with Paid Ads?
            </h2>
            <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute paid ads audit. We&apos;ll analyse your current campaigns, identify exactly
              where budget is being wasted, and show you a clear path to 4× ROAS or better.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center shadow-lg"
              >
                Book Your Free Paid Ads Audit
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

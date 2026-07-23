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
  Heart,
  Camera,
  Palette,
  MessageCircle,
  Instagram,
  Video,
  Image,
  UserCheck,
} from "lucide-react";

const keyMetrics = [
  { value: "24.8K", label: "Followers Gained", sub: "from zero in 6 months across Instagram & TikTok" },
  { value: "8.3%", label: "Avg Engagement Rate", sub: "vs. 1–3% industry average for food brands" },
  { value: "63%", label: "Website Traffic from Social", sub: "of all site traffic traced to social channels" },
  { value: "$91K", label: "Social-Attributed Revenue", sub: "tracked via UTM links and promo codes" },
];

const challenges = [
  {
    icon: AlertTriangle,
    title: "Zero Social Presence — Starting from a Blank Slate",
    desc: "Fresh Roots Kitchen launched with a logo, a product, and a website — but no social accounts, no audience, and no content. With a modest launch budget and a 6-month runway to prove social viability, every follower and every dollar needed to be earned intentionally.",
  },
  {
    icon: Users,
    title: "Saturated Market with No Brand Differentiation",
    desc: "The food and wellness space on Instagram and TikTok is one of the most crowded niches online. Hundreds of competing brands post daily. Without a clear visual identity, distinctive content voice, or differentiated positioning, Fresh Roots would have blended into the noise and been ignored.",
  },
  {
    icon: Camera,
    title: "No Content Infrastructure — No Photographer, No Budget for Ads",
    desc: "The team had no in-house content creator, no photography setup, and no paid amplification budget. All growth had to be earned organically. We needed a lean, repeatable content system that could produce scroll-stopping posts on a tight budget without sacrificing quality.",
  },
  {
    icon: BarChart3,
    title: "Skeptical Stakeholders Demanding Measurable Revenue ROI",
    desc: "Social media is often dismissed by founders as a vanity play. Fresh Roots Kitchen's stakeholders wanted to see social media tied directly to revenue — not just likes and follower counts. Every decision had to be built around attribution, not aesthetics.",
  },
];

const strategySteps = [
  {
    number: "01",
    icon: Palette,
    title: "Brand Identity & Content Voice Development",
    desc: "Before posting a single piece of content, we spent three weeks building the full brand system — visual identity, content pillars, tone of voice, and community persona — so every post felt cohesive and intentional from day one.",
    tactics: [
      "Ran a 2-day brand sprint with the founders to define 3 core brand pillars: 'Real Food, Real Life', 'Wellness Without the Lecture', and 'Kitchen as Community'",
      "Developed a 12-colour brand palette and curated a moodboard of 80+ reference posts defining the visual aesthetic",
      "Wrote a 15-page Brand Voice Guide covering tone (warm, direct, non-preachy), vocabulary dos and don'ts, and caption frameworks",
      "Defined 5 content series: Recipe Drops, Behind the Kitchen, Ingredient Deep-Dives, Community Spotlights, and Real Talk (myth-busting posts)",
      "Created a shoot-at-home photography guide for the founders — lighting setup, angles, and props to use on a zero budget",
    ],
  },
  {
    number: "02",
    icon: Instagram,
    title: "Platform Strategy & Profile Optimisation",
    desc: "We identified Instagram and TikTok as the two highest-ROI platforms for food and wellness content targeting millennials and Gen Z, and built launch-ready profiles optimised for discoverability and conversion.",
    tactics: [
      "Conducted keyword and hashtag research across 140 food/wellness queries — mapped to three tiers: broad (1M+ posts), niche (100K–1M), and micro (under 100K)",
      "Wrote SEO-optimised Instagram bio with clear value prop, emoji hierarchy, and link-in-bio call to action driving email sign-ups",
      "Set up a Linktree-style landing page with 6 destinations: Shop, Recipes, Newsletter, Featured Content, Wholesale Enquiry, and Press Kit",
      "Published 12 grid-anchor posts before the first growth push — ensuring visitors saw a complete, credible brand before following",
      "Optimised TikTok profile with keyword-rich description and pinned 3 hero videos covering the brand's founding story",
    ],
  },
  {
    number: "03",
    icon: Video,
    title: "Organic Content Engine — Posting System & Cadence",
    desc: "We built a repeatable weekly content machine that allowed the founders to create high-quality posts in batches, reducing the time burden while maintaining publishing consistency.",
    tactics: [
      "Designed a weekly content calendar: 1 Reel/TikTok (educational), 1 carousel (recipe or ingredient deep-dive), 3 Stories (behind-the-scenes + CTA), 1 community engagement post",
      "Built a Content Brief Template — each post pre-planned with hook, body copy, hashtags, and CTA before shooting began",
      "Produced 4 content batching SOP videos showing the founders exactly how to shoot 20 posts in a single 3-hour session",
      "Introduced a 'hook testing' system — testing 3 caption openings on Stories before finalising the full-post copy",
      "Tracked performance weekly in a shared Notion dashboard: reach, saves, shares, profile visits, and link clicks per post",
    ],
  },
  {
    number: "04",
    icon: Heart,
    title: "Community-First Engagement & Relationship Building",
    desc: "Follower counts don't generate revenue — communities do. We built a deliberate engagement strategy that turned passive scrollers into loyal advocates who tagged their friends, saved recipes, and ordered repeatedly.",
    tactics: [
      "Implemented the 'First Hour Engagement Protocol': respond to every comment and DM within 60 minutes of posting to boost algorithmic reach",
      "Ran weekly 'Sunday Kitchen' Instagram Stories Q&As — audience submitted cooking questions answered in short video clips",
      "Launched a monthly 'Roots & Recipes' challenge — followers posted their version of a Fresh Roots recipe with a branded hashtag, generating 740+ UGC posts over 6 months",
      "Built a Community Spotlight series featuring a follower's kitchen or meal once per week — driving shares and word-of-mouth",
      "Set up keyword monitoring via Instagram DM automation (ManyChat) to instantly send recipe PDFs when users commented specific trigger words",
    ],
  },
  {
    number: "05",
    icon: UserCheck,
    title: "Micro-Influencer Partnerships & UGC Amplification",
    desc: "We identified and activated 22 micro-influencers in the food, wellness, and lifestyle niches — building an always-on word-of-mouth network without a paid ads budget.",
    tactics: [
      "Identified 22 micro-influencers (5K–50K followers) with authentic food content, high engagement rates (6%+), and aligned brand values",
      "Launched a 'Free Box for a Reel' programme — gifted product in exchange for one authentic TikTok or Instagram Reel per month",
      "Set up a branded hashtag (#FreshRootsKitchen) and UGC tracking dashboard — reposting, crediting, and amplifying creator content daily",
      "Created a 20% affiliate discount code for each micro-influencer — turning social content directly into trackable revenue attribution",
      "Negotiated 6 exclusive recipe collaborations with food influencers — each published on the creator's page with product tag and link-in-bio",
    ],
  },
];

const timelineMonths = [
  {
    month: "Month 1",
    title: "Brand Build & Foundation",
    items: [
      "Brand sprint completed — 3 pillars, voice guide, visual palette, and 5 content series defined",
      "Instagram and TikTok profiles built and optimised — keyword-rich bios, link-in-bio landing page live",
      "12 anchor grid posts published before any growth push",
      "Photography guide delivered — founders capable of shooting batch content independently",
      "Content brief templates and weekly calendar system set up in Notion",
    ],
    metric: null,
  },
  {
    month: "Month 2",
    title: "Launch & First Momentum",
    items: [
      "Full posting cadence live: 1 Reel/TikTok + 1 carousel + 3 Stories + 1 community post per week",
      "First 3 micro-influencer activations — combined reach of ~84,000 accounts",
      "First 2,200 followers gained across Instagram and TikTok",
      "Sunday Kitchen Q&A launched — 140 story replies in first session",
      "First UTM-tracked social revenue: $4,200 from link-in-bio referrals",
    ],
    metric: { label: "Followers gained", value: "2,200" },
  },
  {
    month: "Month 3",
    title: "First Viral Moment & Revenue Proof",
    items: [
      "A 'What I eat in a week' TikTok hit 184,000 views — driving 3,100 new followers in 48 hours",
      "Roots & Recipes monthly challenge launched — 180 UGC posts in first 30 days",
      "7 additional micro-influencer partnerships activated (total: 10)",
      "Instagram engagement rate: 9.1% (peak month) — posts averaging 800+ saves per recipe",
      "Social-attributed revenue hit $18,600 in Month 3 alone",
    ],
    metric: { label: "Total followers", value: "7,400" },
  },
  {
    month: "Month 4",
    title: "Compounding Growth & Influencer Scale",
    items: [
      "12 additional micro-influencers activated — now 22 active across Instagram and TikTok",
      "Affiliate discount code programme live — 14 of 22 influencers driving tracked sales",
      "Second viral TikTok: 'Grocery haul under $60' — 217,000 views, 4,800 new followers",
      "ManyChat DM automation set up — 920 recipe PDF leads captured in 30 days",
      "Social revenue milestone: $31,000 in Month 4 cumulative total",
    ],
    metric: { label: "Total followers", value: "14,100" },
  },
  {
    month: "Month 5",
    title: "Community Peak & UGC Flywheel",
    items: [
      "Follower milestone: 19,000+ across both platforms",
      "UGC submission record: 210 tagged posts in Month 5 alone",
      "Featured in a food media outlet — referencing the brand's TikTok presence",
      "Launched 6 exclusive creator recipe collaborations — each averaging 28,000 combined views",
      "Link-in-bio click-through rate hit 6.2% — highest of the campaign",
    ],
    metric: { label: "Total followers", value: "19,000" },
  },
  {
    month: "Month 6",
    title: "Scale & Attribution",
    items: [
      "Final follower count: 24,800 across Instagram and TikTok",
      "Average engagement rate over 6 months: 8.3% (vs. 1–3% industry benchmark)",
      "63% of all website traffic now attributed to social media channels",
      "Total social-attributed revenue: $91,000 via promo codes and UTM tracking",
      "Brand shortlisted for a regional food & wellness startup award citing social media traction",
    ],
    metric: { label: "Social revenue", value: "$91K" },
  },
];

const beforeAfter = [
  { label: "Instagram Followers", before: "0", after: "16,400", change: "New channel" },
  { label: "TikTok Followers", before: "0", after: "8,400", change: "New channel" },
  { label: "Average Engagement Rate", before: "N/A", after: "8.3%", change: "vs. 1–3% avg" },
  { label: "Monthly Website Traffic from Social", before: "0 sessions", after: "4,200+ sessions", change: "New source" },
  { label: "Social-Attributed Revenue (Monthly)", before: "$0", after: "$18K–$22K", change: "Recurring" },
  { label: "UGC Posts Generated", before: "0", after: "740+", change: "Community-driven" },
  { label: "Active Micro-Influencer Partners", before: "0", after: "22", change: "Always-on" },
  { label: "DM Automation Leads Captured", before: "0", after: "920+", change: "Automated" },
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
];

export default function FreshRootsCaseStudy() {
  return (
    <main className="bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6 bg-gradient-to-br from-white via-pink-50/40 to-rose-50/20">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-[-8%] top-[-10%] w-[500px] h-[500px] rounded-full bg-pink-500/10 blur-3xl" />
          <div className="absolute right-[-6%] bottom-[-8%] w-[400px] h-[400px] rounded-full bg-rose-400/10 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-slate-500 mb-8"
          >
            <Link href="/case-studies" className="hover:text-pink-600 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Case Studies
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-700 font-medium">Fresh Roots Kitchen</span>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
              <Share2 className="w-3.5 h-3.5" />
              Social Media Case Study
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
              <Heart className="w-3.5 h-3.5" />
              Food &amp; Wellness · Austin, TX
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-bold">
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
            Social Media Brand Launch{" "}
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              for a Startup
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl"
          >
            How we built Fresh Roots Kitchen&apos;s entire social media presence from zero — creating a brand
            voice, content system, and micro-influencer network that grew{" "}
            <strong className="text-slate-800">24,800 followers</strong> and generated{" "}
            <strong className="text-slate-800">$91K in trackable social revenue</strong> in just 6 months.
          </motion.p>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-12 pb-12 border-b border-slate-200"
          >
            {[
              { icon: Users, label: "Client", value: "Fresh Roots Kitchen" },
              { icon: Heart, label: "Industry", value: "Food & Wellness" },
              { icon: Share2, label: "Service", value: "Social Media" },
              { icon: Clock, label: "Timeline", value: "6 Months" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-pink-600" />
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
                className="bg-pink-50 border border-pink-200 rounded-2xl p-5"
              >
                <p className="text-3xl md:text-4xl font-black text-pink-600 mb-1">{m.value}</p>
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200">
              <AlertTriangle className="w-3.5 h-3.5 text-pink-600" />
              <span className="text-xs font-bold text-pink-600 tracking-widest uppercase">The Problem</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              Great Product. Zero Audience. No Plan.
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Fresh Roots Kitchen had spent 18 months developing a genuinely excellent range of clean,
              whole-food meal kits designed for busy households who refuse to compromise on nutrition. The
              product was real. The brand was invisible. With a 6-month runway to prove social media as a
              revenue channel, there was no room for trial and error.
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
                  <div className="bg-pink-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-pink-600" />
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
                { label: "Instagram Followers", value: "0" },
                { label: "TikTok Followers", value: "0" },
                { label: "Monthly Social Revenue", value: "$0" },
                { label: "Brand Voice / Content System", value: "None" },
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span className="text-xs font-bold text-pink-600 tracking-widest uppercase">Our Strategy</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              A 5-Pillar Social Launch System
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Social media growth without a system is just luck. We built a structured, repeatable engine that
              combined brand identity, platform optimisation, content production, community building, and
              influencer activation into one compounding flywheel.
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
                        <div className="bg-pink-50 w-11 h-11 rounded-xl flex items-center justify-center">
                          <Icon className="w-5 h-5 text-pink-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-slate-600 mb-5 leading-relaxed">{step.desc}</p>
                        <ul className="space-y-2.5">
                          {step.tactics.map((tactic) => (
                            <li key={tactic} className="flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
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

      {/* ── Platform Breakdown Visual ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200">
              <BarChart3 className="w-3.5 h-3.5 text-pink-600" />
              <span className="text-xs font-bold text-pink-600 tracking-widest uppercase">Platform Breakdown</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              Where the 24.8K Followers & $91K Revenue Came From
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl">
              Growth wasn&apos;t concentrated on a single platform. Each channel served a distinct role in
              the funnel — here&apos;s how the audience and revenue split across the two primary platforms.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Instagram,
                channel: "Instagram",
                value: "16,400",
                label: "followers",
                pct: 66,
                detail: "8.9% avg engagement — Reels driving 74% of reach",
                color: "bg-pink-50 border-pink-200",
                barColor: "bg-pink-500",
                textColor: "text-pink-600",
              },
              {
                icon: Video,
                channel: "TikTok",
                value: "8,400",
                label: "followers",
                pct: 34,
                detail: "2 viral videos (180K+ views each) drove 60% of TikTok growth",
                color: "bg-rose-50 border-rose-200",
                barColor: "bg-rose-500",
                textColor: "text-rose-600",
              },
              {
                icon: UserCheck,
                channel: "Micro-Influencers",
                value: "22",
                label: "active partners",
                pct: 52,
                detail: "52% of social revenue traced to affiliate codes",
                color: "bg-fuchsia-50 border-fuchsia-200",
                barColor: "bg-fuchsia-500",
                textColor: "text-fuchsia-600",
              },
              {
                icon: Image,
                channel: "UGC Content",
                value: "740+",
                label: "community posts",
                pct: 28,
                detail: "28% of new followers discovered brand through tagged posts",
                color: "bg-purple-50 border-purple-200",
                barColor: "bg-purple-500",
                textColor: "text-purple-600",
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
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4">
                    <Icon className={`w-5 h-5 ${item.textColor}`} />
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{item.channel}</p>
                  <p className={`text-2xl font-black ${item.textColor} mb-0.5`}>{item.value}</p>
                  <p className="text-xs text-slate-500 mb-4 leading-snug">{item.label} · {item.detail}</p>
                  <div className="h-2 bg-white/70 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                      className={`h-full ${item.barColor} rounded-full`}
                    />
                  </div>
                  <p className={`text-xs font-bold ${item.textColor} mt-1.5`}>{item.pct}% share</p>
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200">
              <Clock className="w-3.5 h-3.5 text-pink-600" />
              <span className="text-xs font-bold text-pink-600 tracking-widest uppercase">Month by Month</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              0 to 24,800 Followers — How It Actually Happened
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Social media growth feels unpredictable from the outside. It isn&apos;t. Here&apos;s exactly
              what was executed each month, when the first viral moments hit, and how followers converted
              to revenue.
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
                  <div className="absolute left-3.5 md:left-5 top-3 w-5 h-5 rounded-full bg-pink-500 border-4 border-white shadow-sm" />

                  <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{month.month}</span>
                        <h3 className="text-lg font-bold text-slate-900 mt-0.5">{month.title}</h3>
                      </div>
                      {month.metric && (
                        <div className="bg-pink-50 border border-pink-200 rounded-xl px-4 py-2 text-center shrink-0">
                          <p className="text-xl font-black text-pink-600">{month.metric.value}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{month.metric.label}</p>
                        </div>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {month.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0 mt-2" />
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200">
              <BarChart3 className="w-3.5 h-3.5 text-pink-600" />
              <span className="text-xs font-bold text-pink-600 tracking-widest uppercase">Before vs. After</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              The Numbers Don&apos;t Lie
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl">
              Every metric is tracked through Instagram Insights, TikTok Analytics, affiliate promo codes,
              and UTM-tagged links — no estimates, no inflated claims.
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
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-pink-400 text-center whitespace-nowrap">Change</th>
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
                    <td className="px-6 py-4 font-black text-pink-600 text-center whitespace-nowrap">{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Highlight callouts */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 grid sm:grid-cols-3 gap-4"
          >
            {[
              { icon: Users, label: "Total Followers (Month 6)", value: "24.8K", color: "bg-pink-50 border-pink-200 text-pink-600" },
              { icon: TrendingUp, label: "Avg Engagement Rate (6-month avg)", value: "8.3%", color: "bg-rose-50 border-rose-200 text-rose-600" },
              { icon: BarChart3, label: "Social-Attributed Revenue", value: "$91K", color: "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-600" },
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
            className="relative bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-8 md:p-12 text-white overflow-hidden"
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/10 blur-2xl" />
            </div>

            <Quote className="w-10 h-10 text-white/25 mb-6" />

            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 relative z-10">
              &ldquo;We were two founders with a great product and absolutely no idea how to build a social
              media presence. Kazi Agency gave us an entire system — the brand voice, the content calendar,
              the influencer network, everything. We posted consistently for the first time in our lives
              because they made it simple. Six months later we had nearly 25,000 followers and over $91,000
              in revenue we can directly trace back to social. That&apos;s not a vanity metric. That&apos;s
              the channel that kept us alive.&rdquo;
            </blockquote>

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-lg">
                S
              </div>
              <div>
                <p className="font-bold text-white">Sofia M.</p>
                <p className="text-pink-100 text-sm">Co-Founder, Fresh Roots Kitchen · Austin, TX</p>
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
      <section className="py-20 px-6 bg-pink-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
              What Made This Launch Work
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Three principles that turned a zero-presence startup into a social media revenue channel in
              6 months — applicable to any consumer brand, startup, or product business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Palette,
                title: "Brand Before Content",
                desc: "The biggest mistake new brands make is jumping straight to posting without a system. The three weeks we spent on brand voice, visual identity, and content pillars meant every post reinforced the same brand signal. Consistency builds recognition; recognition builds trust; trust drives purchase.",
              },
              {
                icon: MessageCircle,
                title: "Engagement Over Follower Count",
                desc: "Fresh Roots Kitchen&apos;s 8.3% average engagement rate outperforms accounts with 10× the following. A highly engaged audience of 24,800 is worth more than a disengaged audience of 250,000. We prioritised saves, shares, and DMs — the metrics that actually indicate buying intent — over vanity follower growth.",
              },
              {
                icon: UserCheck,
                title: "Micro-Influencers Over Mega-Influencers",
                desc: "22 micro-influencers with authentic, engaged audiences delivered 52% of trackable revenue at near-zero cost. The affiliate model aligned incentives perfectly — creators only promoted what they believed in, audiences trusted the recommendation, and every sale was tracked. This is the highest-ROI influencer strategy available to a startup.",
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
                  className="bg-white rounded-2xl border border-pink-100 p-6"
                >
                  <div className="bg-pink-50 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-pink-600" />
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
              className="text-sm font-bold text-pink-600 hover:underline flex items-center gap-1 shrink-0"
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
                    className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200 p-6 hover:border-pink-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-pink-50 p-3 rounded-xl">
                        <Icon className="w-5 h-5 text-pink-600" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-pink-100 text-pink-700">
                        {cs.service}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1">{cs.industry}</p>
                    <p className="text-sm font-bold text-slate-700 mb-2">{cs.client}</p>
                    <h3 className="text-base font-bold text-slate-900 mb-4 group-hover:text-pink-600 transition-colors leading-snug flex-1">
                      {cs.headline}
                    </h3>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {cs.timeframe}
                      </div>
                      <div className="flex items-center gap-1 text-pink-600 text-sm font-semibold">
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
      <section className="py-24 px-6 bg-gradient-to-br from-pink-500 to-rose-500 relative overflow-hidden">
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
                Your Brand Could Be Next
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-balance">
              Ready to Build a Social Media Presence That Actually Drives Revenue?
            </h2>
            <p className="text-xl text-pink-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute social media strategy call. We&apos;ll audit your current presence,
              identify your highest-ROI platforms, and show you exactly how to build a community that
              converts followers into customers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-white text-pink-600 hover:bg-pink-50 px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center shadow-lg"
              >
                Book Your Free Social Strategy Call
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

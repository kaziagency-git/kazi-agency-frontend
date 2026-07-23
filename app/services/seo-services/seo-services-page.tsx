"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Search,
  Shield,
  Clock,
  ChevronRight,
  ChevronDown,
  BarChart3,
  Settings,
  FileText,
  Globe,
  Link2,
  Target,
  Zap,
  AlertTriangle,
  MapPin,
  Check,
  X,
  Eye,
} from "lucide-react";

const stats = [
  { value: "68%", label: "Of all online experiences begin with a search engine — your buyers are searching right now", icon: Search },
  { value: "53%", label: "Of all website traffic comes from organic search — more than paid, social, and referral combined", icon: TrendingUp },
  { value: "75%", label: "Of clicks go to the top 3 Google results — page two is where businesses go to disappear", icon: Target },
  { value: "14×", label: "Higher ROI from SEO vs outbound marketing over a 12-month period", icon: BarChart3 },
];

const painPoints = [
  {
    icon: Eye,
    title: "Buried on Page 3 — Or Worse",
    description:
      "If you're not on page one for your core keywords, you might as well not exist online. Less than 1% of searchers ever go past the first page. Every day you're invisible is a day your competitors are taking your customers.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Target,
    title: "Targeting the Wrong Keywords",
    description:
      "Most businesses guess at keywords based on what sounds right — and end up targeting terms with zero buying intent, brutal competition, or both. Wrong keywords mean traffic that never converts, no matter how well you rank.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: FileText,
    title: "Thin Content That Google Ignores",
    description:
      "A few short blog posts written years ago and a sparse services page isn't an SEO strategy. Google rewards depth, authority, and freshness. Thin content is actively penalised — and it's dragging your entire domain down.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Settings,
    title: "Technical Issues Blocking Google",
    description:
      "Slow page speed, broken internal links, duplicate content, missing schema markup, crawl errors — these technical problems stop Google from properly indexing your site and suppress rankings you should already have.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: Link2,
    title: "No Backlinks or Domain Authority",
    description:
      "Links from other websites are still one of Google's strongest ranking signals. Without a backlink strategy, you're bringing a pen to a gunfight. Your competitors with domain authority will outrank you regardless of how good your content is.",
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    icon: BarChart3,
    title: "No Idea What's Working or Why",
    description:
      "Your Google Analytics shows traffic but no story. You don't know which pages are driving enquiries, which keywords are converting, or whether last month's blog post moved the needle at all. Flying blind is not an SEO strategy.",
    color: "text-slate-500",
    bg: "bg-slate-50",
  },
];

const deliverables = [
  {
    icon: Search,
    title: "Full Technical SEO Audit & Fixes",
    description:
      "A complete crawl of your website covering page speed, Core Web Vitals, crawlability, indexation errors, broken links, duplicate content, canonical tags, and structured data — followed by hands-on fixes, not just a report.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Target,
    title: "Keyword Research & Opportunity Map",
    description:
      "In-depth keyword research using Ahrefs and SEMrush to identify your highest-value search terms — mapped by intent (informational, commercial, transactional), volume, and competitor gap — so every page targets the right query.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: FileText,
    title: "On-Page Optimisation",
    description:
      "Every key page optimised: title tags, meta descriptions, H1–H3 structure, keyword placement, internal linking, image alt text, and content depth improvements — all aligned to current Google ranking factors.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    icon: Globe,
    title: "SEO Content Strategy & Creation",
    description:
      "A 12-month content calendar built around your keyword opportunities, written by our SEO copywriters. Each article targets a specific search intent, is optimised on-page from day one, and is designed to earn links over time.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Link2,
    title: "Authority Link Building",
    description:
      "White-hat backlink acquisition through digital PR, resource link building, HARO (Help a Reporter Out), broken-link outreach, and niche editorial placements — building domain authority that compounds month over month.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: MapPin,
    title: "Local SEO & Google Business Profile",
    description:
      "Full optimisation of your Google Business Profile, local citation building across key directories, review generation strategy, and location-specific page creation — so you dominate the map pack for local searches.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Zap,
    title: "Core Web Vitals & Page Speed Optimisation",
    description:
      "LCP, FID, CLS — the performance metrics Google uses as a ranking signal — measured, diagnosed, and improved. Includes image compression, lazy loading, script deferral, and server response time improvements.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: BarChart3,
    title: "Monthly SEO Reporting & Strategy Review",
    description:
      "A clear monthly report covering keyword ranking movements, organic traffic trends, conversions attributed to SEO, backlinks acquired, and a forward-looking priority list — with a strategy call to walk through findings.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

const buildSteps = [
  {
    step: "01",
    title: "SEO Audit & Competitor Analysis",
    description:
      "We crawl your entire site, benchmark it against your top 5 competitors, and produce a prioritised list of every technical issue, content gap, and missed keyword opportunity currently limiting your rankings.",
    icon: Search,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    duration: "Days 1–5",
  },
  {
    step: "02",
    title: "Keyword Research & Content Map",
    description:
      "We build a complete keyword universe for your business — clustered by topic, mapped to existing pages, and structured into a content calendar that tells Google exactly what your site is an authority on.",
    icon: Target,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    duration: "Days 6–10",
  },
  {
    step: "03",
    title: "Technical Fixes & On-Page Optimisation",
    description:
      "We implement every technical fix — from page speed improvements to schema markup — and optimise all key pages for their target keywords. This is the foundation everything else is built on.",
    icon: Settings,
    color: "text-[#046BAF]",
    bg: "bg-blue-50",
    border: "border-blue-100",
    duration: "Days 11–21",
  },
  {
    step: "04",
    title: "Content Creation & Link Building",
    description:
      "Our SEO writers publish content on your calendar, and our outreach team begins building backlinks from relevant, high-authority sites. Both activities run in parallel as an ongoing monthly retainer.",
    icon: FileText,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
    duration: "Month 2+",
  },
  {
    step: "05",
    title: "Report, Analyse & Compound",
    description:
      "Monthly reporting sessions cover ranking movements, traffic growth, leads generated, and the forward plan. We iterate on what's working and double down — SEO compounds when the strategy stays consistent.",
    icon: BarChart3,
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
    duration: "Ongoing",
  },
];

const comparisonFeatures = [
  "Full Technical SEO Audit",
  "Keyword Research & Mapping",
  "On-Page Optimisation",
  "SEO Content Writing",
  "Link Building (White-Hat)",
  "Local SEO & Google Business Profile",
  "Core Web Vitals Optimisation",
  "Monthly Ranking Reports",
  "Competitor Gap Analysis",
  "Dedicated SEO Strategist",
];

const comparisonData = [
  {
    label: "Moz Pro (DIY)",
    values: [false, true, false, false, false, false, false, "basic", "basic", false],
    highlight: false,
  },
  {
    label: "Typical Freelancer",
    values: ["limited", true, true, "extra cost", "limited", "limited", false, true, false, false],
    highlight: false,
  },
  {
    label: "In-House Hire",
    values: [true, true, true, "limited", "limited", true, "limited", true, true, false],
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
    q: "How long does SEO take to show results?",
    a: "SEO is a long-term investment, and honest timelines matter here. For most businesses, you'll start seeing ranking improvements within 3–6 months, meaningful traffic growth within 6–9 months, and significant lead generation impact within 9–12 months. Highly competitive industries take longer; local businesses and less competitive niches can see results faster. What we can tell you is that the results compound over time — unlike paid ads, organic rankings you earn in month 3 keep working in month 18 without additional spend.",
  },
  {
    q: "Can you guarantee first-page Google rankings?",
    a: "Any agency that guarantees specific rankings is either misleading you or targeting keywords so obscure they're worthless. Google's algorithm has over 200 ranking factors and updates hundreds of times per year. What we guarantee is the work: rigorous technical fixes, best-in-class on-page optimisation, genuine content quality, and ethical link building — the proven inputs that produce first-page results for clients who stay consistent. We set clear, data-backed targets at the start and track them transparently every month.",
  },
  {
    q: "What's the difference between on-page and off-page SEO?",
    a: "On-page SEO covers everything you control on your own website: page titles, meta descriptions, header structure, content quality and depth, internal linking, page speed, and technical factors like schema markup and canonical tags. Off-page SEO is everything that happens outside your site — primarily backlinks from other websites. Both matter. A technically perfect site with no backlinks will struggle against competitors with domain authority. A site with lots of links but poor on-page signals will also underperform. We handle both as part of every engagement.",
  },
  {
    q: "Do you write the SEO content, or do we need to provide it?",
    a: "We write all SEO content included in your engagement. Our strategists produce the keyword brief and content structure, and our SEO copywriters produce publication-ready articles, landing pages, and service page copy. You review and approve everything before it goes live. If you have an internal writer, we can also provide keyword briefs and on-page guidelines for them to execute — but most clients prefer our done-for-you approach because it removes the bottleneck entirely.",
  },
  {
    q: "How do you build backlinks without risking a Google penalty?",
    a: "We build links exclusively through white-hat methods: digital PR (creating genuinely newsworthy content that earns editorial coverage), HARO responses (connecting your expertise with journalists who need expert sources), broken link building (finding dead links on authority sites and suggesting your content as a replacement), resource page outreach, and niche-relevant guest posts on sites with genuine traffic and domain authority. We never buy links, use private blog networks, or engage in any tactic that violates Google's Webmaster Guidelines. Every link we build is one we'd be comfortable disclosing to Google directly.",
  },
  {
    q: "Do you do local SEO?",
    a: "Yes — local SEO is included in every engagement for service-area businesses. This covers full Google Business Profile optimisation (categories, services, photos, Q&A, post strategy), NAP citation building across the 50+ key directories, review generation strategy, local schema markup, and location-specific landing pages if you serve multiple areas. For businesses that generate most of their leads locally, the map pack (the 3 results that appear above organic listings) is often the highest-value ranking to pursue, and it's a core part of our strategy.",
  },
  {
    q: "What SEO tools do you use?",
    a: "Our primary toolkit is Ahrefs (keyword research, backlink analysis, rank tracking, competitor gap analysis), SEMrush (technical audits, position tracking, content gap), Screaming Frog (full site crawl and technical diagnosis), Google Search Console (indexation, click-through data, Core Web Vitals), Google Analytics 4 (traffic, behaviour, conversion attribution), Surfer SEO (on-page content scoring and NLP optimisation), and PageSpeed Insights (CWV measurement and improvement prioritisation). You'll have access to your Google Search Console and GA4 data at all times, and our monthly reports pull from these tools directly.",
  },
  {
    q: "How do you track and report SEO results?",
    a: "Every month you receive a report covering: keyword ranking movements (position changes for every tracked term), organic traffic trends (sessions, users, pages visited from search), conversions attributed to organic search (enquiry forms, calls, bookings), new backlinks acquired, Domain Rating progression, Core Web Vitals scores, and a prioritised forward plan for the next month. We hold a monthly strategy call to walk through the data and answer questions — you're never left reading a report without context.",
  },
  {
    q: "Can you fix our Google penalties or traffic drops?",
    a: "Yes. We handle both algorithmic and manual penalty recovery. If your site was hit by a Google core update, Helpful Content update, or link-related action, we start with a full audit to diagnose the root cause — thin content, spammy links, technical issues, or E-E-A-T gaps — then build and execute a recovery plan. Manual penalties (shown in Google Search Console) also include a disavow and reconsideration request where needed. Recovery timelines vary, but most sites we've worked with see meaningful recovery within 3–6 months of consistent remediation.",
  },
];

const toolItems = [
  {
    id: "ahrefs",
    name: "Ahrefs",
    tagline: "Keyword & Backlink Research",
    iconBg: "#FFF7ED",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#FF7043] flex items-center justify-center text-white font-black text-[9px] shrink-0">
        Ah
      </span>
    ),
  },
  {
    id: "semrush",
    name: "SEMrush",
    tagline: "Technical Audit & Tracking",
    iconBg: "#FFF8F0",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#FF642D] flex items-center justify-center text-white font-black text-[9px] shrink-0">
        SR
      </span>
    ),
  },
  {
    id: "gsc",
    name: "Google Search Console",
    tagline: "Indexation & CWV",
    iconBg: "#FFF7E6",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#4285F4] flex items-center justify-center text-white font-black text-[8px] shrink-0">
        GSC
      </span>
    ),
  },
  {
    id: "ga4",
    name: "Google Analytics 4",
    tagline: "Traffic & Conversions",
    iconBg: "#FFF3E0",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#E37400] flex items-center justify-center text-white font-black text-[8px] shrink-0">
        GA4
      </span>
    ),
  },
  {
    id: "screamingfrog",
    name: "Screaming Frog",
    tagline: "Full Site Crawl",
    iconBg: "#FFF0E6",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#F97316] flex items-center justify-center text-white font-black text-[9px] shrink-0">
        SF
      </span>
    ),
  },
  {
    id: "surfer",
    name: "Surfer SEO",
    tagline: "On-Page Content Scoring",
    iconBg: "#EFF6FF",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#3B82F6] flex items-center justify-center text-white font-black text-[9px] shrink-0">
        Su
      </span>
    ),
  },
  {
    id: "pagespeed",
    name: "PageSpeed Insights",
    tagline: "Core Web Vitals",
    iconBg: "#FFF7ED",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#F59E0B] flex items-center justify-center text-white font-black text-[8px] shrink-0">
        PS
      </span>
    ),
  },
  {
    id: "moz",
    name: "Moz",
    tagline: "Domain Authority Tracking",
    iconBg: "#FFF1F2",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#1C4FD8] flex items-center justify-center text-white font-black text-[9px] shrink-0">
        Mz
      </span>
    ),
  },
];

export default function SeoServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6 bg-gradient-to-br from-white via-orange-50/40 to-amber-50">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-[-8%] top-[-8%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-orange-500/20 to-amber-400/10 blur-3xl" />
          <div className="absolute right-[-6%] bottom-[-6%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-amber-400/15 to-orange-500/10 blur-3xl" />
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
            <span className="text-orange-600 font-medium">SEO Services</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-orange-50 border border-orange-200">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-bold text-orange-700 tracking-widest uppercase">
                SEO Services
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 text-balance leading-tight">
              Rank Higher, Get Found, and{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Turn Organic Traffic Into Real Revenue
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Your buyers are searching for exactly what you sell — the question is whether they find you or your competitor. Kazi Agency delivers full-stack SEO: technical audits, keyword strategy, on-page optimisation, SEO content, and white-hat link building — everything needed to dominate Google and generate leads that cost nothing per click.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
              >
                Get a Free SEO Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center cursor-pointer"
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
                  <Icon className="w-5 h-5 text-orange-500 mx-auto mb-2" />
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
              Why Most Business Websites Are Invisible to Google
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              These six problems appear in almost every site we audit — and each one is quietly handing your organic traffic to your competitors.
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
              Sound familiar? Here&apos;s exactly how we fix all of it.
            </p>
            <Link
              href="/book-a-consultation"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-bold transition-all"
            >
              Fix My SEO — Free Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-24 px-6 bg-orange-50/40">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200">
              <span className="text-xs font-bold text-orange-700 tracking-widest uppercase">
                What&apos;s Included
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              Eight SEO Deliverables That Build Compounding Organic Growth
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Every Kazi Agency SEO engagement includes these eight core deliverables — fully executed, reported on, and optimised each month.
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
                  className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-orange-200 hover:shadow-md transition-all"
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

      {/* ── Tools We Use (Infinity Slider) ── */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200">
              <span className="text-xs font-bold text-orange-700 tracking-widest uppercase">
                Our SEO Stack
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
              Industry-Leading Tools Behind Every Campaign
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base">
              We use the same platforms as the world&apos;s top SEO agencies — Ahrefs, SEMrush, Screaming Frog, and Surfer SEO — to drive decisions with data, not guesswork.
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
                className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3.5 shadow-sm hover:shadow-md hover:border-orange-200 transition-all shrink-0 cursor-default"
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
          Also integrates with WordPress, Webflow, Shopify, HubSpot, and any CMS via plugin, API, or direct implementation.
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200">
              <span className="text-xs font-bold text-orange-700 tracking-widest uppercase">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              From Buried on Page 3 to Dominating Page 1 — Step by Step
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A proven five-phase SEO process — strategy first, execution second, compounding results over time.
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
      <section className="py-24 px-6 bg-orange-50/40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200">
              <span className="text-xs font-bold text-orange-700 tracking-widest uppercase">
                Why Kazi Agency
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              Full-Stack SEO Agency vs. DIY Tools, Freelancers & In-House
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              SEO tools are instruments — we play them. Here&apos;s how a done-for-you agency compares to every other option.
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
                        col.highlight ? "text-orange-700 bg-orange-50/60" : "text-slate-500"
                      }`}
                    >
                      {col.label}
                      {col.highlight && (
                        <span className="block mt-1 text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full font-bold mx-auto w-fit">
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
                          className={`p-5 text-center ${col.highlight ? "bg-orange-50/30" : ""}`}
                        >
                          {val === true ? (
                            <Check className="w-5 h-5 text-orange-500 mx-auto" />
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
            className="mt-10 bg-white rounded-2xl border border-orange-200 p-8"
          >
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                {
                  title: "Moz Pro / Ahrefs (DIY)",
                  cost: "$99–$449/mo",
                  note: "Excellent tools — for people who already know SEO. Without strategy and execution, you're paying for data you don't have time to action. The tool doesn't do the SEO for you.",
                },
                {
                  title: "Freelance SEO Consultant",
                  cost: "$500–$3,000/mo",
                  note: "Variable quality, limited capacity, and usually strong in one area (technical or content) but not both. No team behind them — if they get sick or disappear, your campaign stops.",
                },
                {
                  title: "Kazi Agency — Full-Stack SEO",
                  cost: "Monthly retainer — all included",
                  note: "Technical SEO, keyword strategy, content writing, link building, and monthly reporting — all under one roof, executed by specialists, and managed by a dedicated strategist from day one.",
                  highlight: true,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`rounded-xl p-5 ${item.highlight ? "bg-orange-50 border border-orange-200" : "bg-slate-50"}`}
                >
                  <p className={`font-bold mb-1 ${item.highlight ? "text-orange-700" : "text-slate-700"}`}>
                    {item.title}
                  </p>
                  <p className={`text-xl font-black mb-2 ${item.highlight ? "text-orange-500" : "text-slate-900"}`}>
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
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200">
                <span className="text-xs font-bold text-orange-700 tracking-widest uppercase">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6 text-balance">
                We Run the Full SEO Operation — You Just Watch the Rankings Climb
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Most SEO agencies send monthly reports and call it strategy. We build the technical foundation, write the content, earn the links, and optimise constantly — because SEO is only valuable when all three pillars work together. You get a complete growth system, not a subscription to someone else&apos;s dashboard.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  "Full-stack execution — technical, content, and links handled by specialists",
                  "Transparent monthly reporting — rankings, traffic, leads, and what's next",
                  "White-hat only — zero shortcuts that risk your domain long-term",
                  "Content written by SEO copywriters, not generic AI output",
                  "Local SEO included — map pack domination for service-area businesses",
                  "Integrated with your CRM so organic leads flow straight into your pipeline",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="/book-a-consultation"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-bold transition-all"
                >
                  Book a Free SEO Strategy Call
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
                  icon: TrendingUp,
                  title: "Compounding Returns",
                  description:
                    "Unlike paid ads that disappear the moment you stop spending, SEO compounds. A page ranking today keeps generating leads 12, 24, and 36 months from now — for zero additional cost per click.",
                },
                {
                  icon: Shield,
                  title: "Future-Proof White-Hat Only",
                  description:
                    "Every tactic we use is Google-approved. No link farms, no PBNs, no keyword stuffing. Tactics that work today without putting your domain at risk tomorrow.",
                },
                {
                  icon: Target,
                  title: "High-Intent Traffic",
                  description:
                    "Organic search traffic converts at 2–3× the rate of paid social. We target buyers who are actively searching for your service — not scrolling past an ad.",
                },
                {
                  icon: AlertTriangle,
                  title: "Penalty Recovery",
                  description:
                    "Been hit by a Google algorithm update or manual action? We diagnose the root cause and execute a recovery plan — most sites see meaningful improvement within 90 days.",
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
                    className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-orange-200 hover:shadow-md transition-all"
                  >
                    <div className="bg-orange-50 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-orange-500" />
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
      <section className="py-24 px-6 bg-orange-50/40">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200">
              <span className="text-xs font-bold text-orange-700 tracking-widest uppercase">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              Common Questions About SEO Services
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Straight answers to the questions every business owner asks before starting SEO.
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
                    className={`w-5 h-5 text-orange-500 shrink-0 transition-transform duration-200 ${
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
      <section className="py-24 px-6 bg-gradient-to-br from-orange-500 to-amber-600 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-10%] top-[-20%] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute right-[-8%] bottom-[-15%] w-[400px] h-[400px] rounded-full bg-amber-300/10 blur-3xl" />
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
                Ready to Rank Higher?
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-balance">
              Let&apos;s Build an SEO Strategy That Brings You Leads Every Single Month
            </h2>
            <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute SEO audit. We&apos;ll review your current rankings, identify your biggest opportunities, and show you exactly what a 6-month growth roadmap looks like for your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center shadow-lg"
              >
                Book My Free SEO Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
              >
                Explore All Services
              </Link>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-orange-100 text-sm">
              {["No commitment required", "Free 30-minute strategy call", "Full SEO roadmap included"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-200" />
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

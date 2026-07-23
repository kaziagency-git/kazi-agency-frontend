"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Star,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ChevronDown,
  BarChart3,
  TrendingUp,
  Zap,
  Target,
  Check,
  X,
  MessageSquare,
  Shield,
  Globe,
  Clock,
  Bell,
  AlertTriangle,
  ThumbsDown,
  Eye,
  Search,
  MapPin,
  RefreshCw,
  Users,
  Settings,
} from "lucide-react";

const stats = [
  { value: "93%", label: "Of consumers say online reviews directly impact their purchasing decision — your reputation is your first sales pitch", icon: Star },
  { value: "88%", label: "Of buyers trust online reviews as much as a personal recommendation from a friend or colleague", icon: Users },
  { value: "12×", label: "More revenue earned by businesses with 4+ star ratings compared to those with lower scores or sparse reviews", icon: TrendingUp },
  { value: "53%", label: "Of customers expect a business to respond to a negative review within 7 days — most businesses never respond at all", icon: Clock },
];

const painPoints = [
  {
    icon: ThumbsDown,
    title: "Negative Reviews Going Unanswered",
    description:
      "A single unanswered one-star review sitting on your Google profile tells every potential customer one thing: you don't care. Studies show 45% of consumers are more likely to visit a business that responds to negative reviews — but most businesses ignore them entirely, letting the damage compound month after month.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Star,
    title: "Too Few Reviews to Build Trust",
    description:
      "A business with 4 reviews — even if all are five stars — appears less trustworthy than a competitor with 200. Review volume matters as much as rating. Buyers apply a threshold: under 10 reviews and they keep looking. Under 50 and they hesitate. Without a systematic review generation process, you'll stay stuck at a handful of reviews indefinitely.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Globe,
    title: "Reviews Scattered With No Central Monitoring",
    description:
      "Your customers leave reviews on Google, Facebook, Yelp, Trustpilot, Clutch, and industry-specific directories — and you find out about them days or weeks later, if at all. By then the window for a timely response has closed, and a negative review has already been read by hundreds of prospects.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: AlertTriangle,
    title: "Competitor or Fake Negative Reviews",
    description:
      "Fake reviews from competitors or disgruntled former employees are a real and growing problem. Most business owners don't know how to identify them, report them effectively, or respond in a way that signals credibility to readers rather than defensiveness. Left unchallenged, fake reviews erode trust you've spent years building.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: MapPin,
    title: "Reputation Not Connected to Local SEO",
    description:
      "Google's local ranking algorithm explicitly factors in review count, recency, rating, and owner response rate. If your review profile is thin or stagnant, you're actively suppressing your own map pack rankings. Reputation management and local SEO are the same discipline — most agencies treat them as separate and do neither well.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: Eye,
    title: "No Visibility on What's Being Said Online",
    description:
      "Beyond review platforms, your brand is mentioned in forums, social media posts, news articles, and comparison sites — often without your knowledge. A viral complaint on Reddit or a negative mention in a trade publication can tank conversions for months. Without proactive monitoring, you're the last person to know.",
    color: "text-slate-500",
    bg: "bg-slate-50",
  },
];

const deliverables = [
  {
    icon: Search,
    title: "Full Reputation Audit & Brand Monitoring Setup",
    description:
      "We audit your current reputation across every relevant platform — Google, Facebook, Yelp, Trustpilot, Clutch, industry directories, and social media — documenting your current ratings, review volume, response rate, sentiment breakdown, and competitor benchmarks. Then we set up real-time monitoring alerts so every new mention triggers an instant notification.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Star,
    title: "Review Generation Campaign",
    description:
      "An automated review request system built inside your GoHighLevel CRM — triggered by job completion, invoice payment, or a custom milestone — sends personalised SMS and email review requests to recent clients at the optimal moment. Sequences follow up at 3 days and 7 days for non-responders. Most clients see a 200–400% increase in monthly review volume within 60 days.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    icon: MessageSquare,
    title: "Professional Review Response Management",
    description:
      "Every review on every platform — positive, neutral, and negative — receives a professionally crafted, brand-consistent response within 24 hours. Positive responses are personalised and reinforce your service quality. Negative responses are empathetic, solution-oriented, and written to convert readers (not just the original reviewer) into confident buyers.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Shield,
    title: "Negative Review Suppression & Recovery",
    description:
      "For reviewable platforms, we identify and flag reviews that violate platform policies — fake reviews, competitor attacks, or reviews from non-customers — and manage the reporting and appeal process. We also build a suppression strategy: generating a sustained flow of genuine positive reviews that dilute the impact of any legitimate negatives over time.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    icon: MapPin,
    title: "Google Business Profile Optimisation",
    description:
      "Your Google Business Profile is the single most important page your business owns for local search visibility. We complete every field, optimise your service categories, add geo-tagged photos, publish weekly Google Posts, activate the Q&A section with keyword-rich answers, and manage your review response cadence — directly improving your map pack ranking.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: Globe,
    title: "Review Platform & Citation Management",
    description:
      "We manage your business listings across 50+ relevant directories — Google, Facebook, Yelp, Bing Places, Apple Maps, TripAdvisor, Trustpilot, Clutch, and industry-specific platforms — ensuring consistent NAP (Name, Address, Phone) data. Inconsistent citations suppress local SEO rankings and erode buyer confidence. We replace what you'd pay BrightLocal or Yext for, at a fraction of the cost.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: BarChart3,
    title: "Sentiment Analysis & Reputation Score Tracking",
    description:
      "Monthly sentiment analysis across all monitored platforms — breaking down positive, neutral, and negative mentions, tracking recurring themes in customer feedback, and identifying service gaps that reviews are signalling. Your reputation score is tracked over time so you can see the compounding improvement month over month.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Target,
    title: "Competitor Reputation Benchmarking",
    description:
      "We track your top 3–5 competitors' review profiles alongside yours — rating, volume, response rate, review recency, and platform coverage. Monthly reports show you exactly where you lead and where you're behind, giving your reputation strategy a competitive target rather than an arbitrary one.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
];

const buildSteps = [
  {
    step: "01",
    title: "Reputation Audit",
    description:
      "We audit your complete online presence — every review platform, every mention source, your Google Business Profile completeness, NAP consistency across directories, and competitor benchmarks. You get a current-state report with a prioritised action list before we touch anything.",
    icon: Search,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
    duration: "Days 1–4",
  },
  {
    step: "02",
    title: "Profiles & Monitoring",
    description:
      "We fully optimise your Google Business Profile and key review platform listings, correct NAP inconsistencies across directories, and deploy real-time monitoring across every relevant platform and mention source. You'll never be the last to know about a new review again.",
    icon: Globe,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    duration: "Days 5–10",
  },
  {
    step: "03",
    title: "Review Generation Launch",
    description:
      "We build and activate your automated review request sequences inside your CRM — personalised SMS and email campaigns triggered by customer milestones. The moment a client finishes a project with you, a review request follows automatically at the optimal timing.",
    icon: Star,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    border: "border-yellow-100",
    duration: "Days 11–14",
  },
  {
    step: "04",
    title: "Respond & Protect",
    description:
      "Our team monitors all platforms daily. Every new review is responded to within 24 hours. Flaggable reviews are identified and reported. Negative review suppression campaigns generate sustained positive review flow to protect your overall rating from isolated incidents.",
    icon: Shield,
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
    duration: "Ongoing",
  },
  {
    step: "05",
    title: "Report & Compound",
    description:
      "Monthly reports track rating trajectory, review volume growth, response rate, sentiment trends, competitor benchmarks, and local SEO ranking movements tied to reputation improvements. Strategy calls align the next month's focus with your growth targets.",
    icon: BarChart3,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    duration: "Monthly",
  },
];

const comparisonFeatures = [
  "Full Reputation Audit",
  "Review Generation (Automated)",
  "Review Response Management",
  "Negative Review Suppression",
  "Google Business Profile Optimisation",
  "50+ Directory Citation Management",
  "Real-Time Brand Monitoring",
  "Competitor Reputation Benchmarking",
  "Monthly Sentiment Reporting",
  "Dedicated Reputation Strategist",
];

const comparisonData = [
  {
    label: "Manual DIY Monitoring",
    values: [false, false, "occasional", false, "basic", false, false, false, false, false],
    highlight: false,
  },
  {
    label: "BrightLocal / Yext",
    values: ["limited", false, false, false, "partial", true, "basic", false, "basic", false],
    highlight: false,
  },
  {
    label: "Typical Reputation Agency",
    values: [true, "limited", true, "limited", "limited", "limited", true, false, true, false],
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
    q: "What is reputation management, and why does my business need it?",
    a: "Reputation management is the practice of actively monitoring, shaping, and improving how your business is perceived online — across review platforms, social media, search results, and industry directories. Most businesses have a passive reputation: reviews accumulate randomly, responses are sporadic, and the overall picture is whatever customers happen to leave. Active reputation management turns that around: you systematically generate reviews from happy clients, respond professionally to every review, monitor every mention of your brand, and protect your profile from fake or malicious content. The business case is simple — 93% of buyers read reviews before making a contact decision, and a business with 200 reviews at 4.7 stars will almost always win the click over a competitor with 12 reviews at 4.2, regardless of which actually delivers a better service.",
  },
  {
    q: "How do you generate more reviews without violating Google's or Yelp's guidelines?",
    a: "We generate reviews through a compliant ask-based process: automated SMS and email review requests sent to verified customers after a completed project or purchase. This is explicitly permitted by Google, Facebook, and most review platforms — what's prohibited is incentivising reviews (offering discounts or gifts), writing reviews on behalf of customers, or creating fake accounts. Our sequences are personalised, timed to the moment of peak satisfaction (immediately after a successful completion), and include a direct link to your preferred platform so the friction of leaving a review is as low as possible. Yelp is the exception — they prohibit actively soliciting reviews and their algorithm filters reviews from accounts with limited platform history. For Yelp, our strategy focuses on profile optimisation and allowing organic reviews to accumulate rather than direct request campaigns.",
  },
  {
    q: "Can you remove negative reviews from Google or Facebook?",
    a: "Legitimate negative reviews from real customers cannot be removed by anyone — including Google or the platform themselves. What we can do is: (1) report reviews that violate platform policies (fake reviews, competitor attacks, reviews from non-customers, or reviews containing prohibited content) and manage the appeal process — Google removes approximately 30–40% of flagged reviews when the case is well-documented; (2) respond to legitimate negative reviews in a way that converts readers into confident buyers by demonstrating professionalism and a genuine commitment to resolution; and (3) run a sustained review generation campaign that increases your total review volume, diluting the percentage impact of any existing negatives on your overall rating. A 3.2-star business with 8 reviews looks very different at 4.5 stars with 150 reviews — even if the same 8 negative reviews are still there.",
  },
  {
    q: "How quickly do you respond to new reviews?",
    a: "Our target response time is 24 hours for all reviews across all monitored platforms. For negative reviews, we aim to respond within 12 hours where possible — the speed of response to a negative review signals to readers how seriously you take customer concerns. Responses are not templated copy-paste — each response is individually drafted to address the specific content of the review, maintain your brand voice, and be written with the next 100 readers in mind as much as the original reviewer. We manage this across Google, Facebook, Yelp, Trustpilot, Clutch, and any other platform your reviews appear on. You approve our response strategy at onboarding; from that point we handle all responses without requiring sign-off on each individual one, unless you prefer review approval.",
  },
  {
    q: "What review platforms do you manage?",
    a: "We manage reputation across every platform relevant to your business and industry. For most service businesses, that's Google Business Profile (priority), Facebook, Yelp, and Trustpilot. For B2B and professional services, we add Clutch, G2, and Capterra. For hospitality and food service, TripAdvisor. For healthcare, Healthgrades and Zocdoc. For tradespeople and home services, Checkatrade, Houzz, and Angi. We also manage business listings across 50+ directories — Bing Places, Apple Maps, Yahoo Local, Yell, and relevant industry-specific directories — to ensure consistent NAP data across the web. This is the citation management component that tools like Yext charge £300–£600/month for as a standalone subscription.",
  },
  {
    q: "How does reputation management affect my Google search and map pack rankings?",
    a: "Google's local ranking algorithm uses several reputation-related signals as direct ranking factors: total review count, average star rating, review recency (reviews in the last 90 days carry more weight than older ones), response rate and response time, and keyword usage within review content. A business that generates 10 new reviews per month, responds to all of them within 24 hours, and maintains a 4.5+ rating will consistently outrank a competitor with a higher quality service but a stagnant review profile. Our reputation management programme is specifically designed around these signals — review generation cadence, response consistency, and profile completeness all contribute directly to the map pack ranking improvements our clients see. Most clients see measurable local ranking improvements within 60–90 days of consistent review generation.",
  },
  {
    q: "What if I suspect a competitor is leaving fake negative reviews?",
    a: "Fake reviews from competitors are detectable — they typically share patterns: reviewer accounts with no review history, multiple reviews posted in a short time window, reviews that contain no specific details about an actual service experience, or reviewer profiles linked to competitor IP ranges. We document the evidence, build a structured report, and submit it through Google's review removal tool with a detailed policy violation case. While Google's removal process is slow (typically 2–6 weeks) and not always successful on the first attempt, we manage the appeals process persistently. In parallel, we help you craft a public response to each suspected fake review that demonstrates your professionalism to genuine readers without validating the content of the attack.",
  },
  {
    q: "How do you measure whether our reputation is actually improving?",
    a: "We track eight core reputation metrics monthly: overall star rating trajectory (are you moving up?), total review volume (how many new reviews this month vs. last?), review velocity (reviews per month — is it accelerating?), response rate (are all reviews receiving responses?), sentiment ratio (positive vs. neutral vs. negative breakdown), review recency profile (how many reviews in the last 30, 60, 90 days?), platform coverage (how many platforms have recent activity?), and competitor benchmark comparison (are you ahead or behind your top 3 competitors?). These metrics are presented in a clear monthly report with trend lines rather than snapshots so you can see the compounding improvement over time.",
  },
  {
    q: "Do you handle reputation crises — such as a viral complaint or a news article?",
    a: "Yes. Reputation crises require a different approach from routine management: they need rapid response, coordinated messaging across channels, and a proactive content strategy to suppress negative search results over time. If your business faces a viral complaint, a negative local news article, or a coordinated review attack, we provide crisis response: an immediate public statement strategy, coordinated responses across platforms, a content creation plan (blog posts, press releases, positive PR) to push negative results down in search, and an accelerated review generation campaign to recover your rating quickly. Crisis management is handled on a case-by-case basis depending on severity; we assess and recommend the appropriate response within 24 hours of being briefed.",
  },
];

const toolItems = [
  {
    id: "ghl",
    name: "GoHighLevel CRM",
    tagline: "Review Request Automation",
    iconBg: "#F0FDF4",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#16A34A] flex items-center justify-center text-white font-black text-[9px] shrink-0">
        GH
      </span>
    ),
  },
  {
    id: "gbp",
    name: "Google Business Profile",
    tagline: "Local SEO & Reviews",
    iconBg: "#FFF7ED",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#4285F4] flex items-center justify-center text-white font-black text-[8px] shrink-0">
        GBP
      </span>
    ),
  },
  {
    id: "trustpilot",
    name: "Trustpilot",
    tagline: "Review Platform Management",
    iconBg: "#F0FDF4",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#00B67A] flex items-center justify-center text-white font-black text-[9px] shrink-0">
        Tp
      </span>
    ),
  },
  {
    id: "brightlocal",
    name: "BrightLocal",
    tagline: "Citation Tracking",
    iconBg: "#FFF7ED",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#F97316] flex items-center justify-center text-white font-black text-[9px] shrink-0">
        BL
      </span>
    ),
  },
  {
    id: "mention",
    name: "Mention / Google Alerts",
    tagline: "Real-Time Brand Monitoring",
    iconBg: "#EFF6FF",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#3B82F6] flex items-center justify-center text-white font-black text-[9px] shrink-0">
        Me
      </span>
    ),
  },
  {
    id: "clutch",
    name: "Clutch / G2",
    tagline: "B2B Review Management",
    iconBg: "#FFF1F2",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#E11D48] flex items-center justify-center text-white font-black text-[9px] shrink-0">
        Cl
      </span>
    ),
  },
  {
    id: "semrush",
    name: "SEMrush",
    tagline: "Competitor Benchmarking",
    iconBg: "#FFF8F0",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#FF642D] flex items-center justify-center text-white font-black text-[9px] shrink-0">
        SR
      </span>
    ),
  },
  {
    id: "ga4",
    name: "Google Analytics 4",
    tagline: "Traffic Impact Tracking",
    iconBg: "#FFF3E0",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#E37400] flex items-center justify-center text-white font-black text-[8px] shrink-0">
        GA4
      </span>
    ),
  },
];

export default function ReputationManagementPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6 bg-gradient-to-br from-white via-amber-50/40 to-yellow-50">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-[-8%] top-[-8%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-amber-500/20 to-yellow-400/10 blur-3xl" />
          <div className="absolute right-[-6%] bottom-[-6%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-yellow-400/15 to-amber-500/10 blur-3xl" />
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
            <span className="text-amber-600 font-medium">Reputation Management</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
              <Star className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold text-amber-700 tracking-widest uppercase">
                Reputation Management
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 text-balance leading-tight">
              Turn Reviews Into Revenue and{" "}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Dominate Your Market With a 5-Star Reputation
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Kazi Agency manages your complete online reputation — automating review generation from happy clients, responding professionally to every review within 24 hours, monitoring your brand across every platform, and protecting your rating from fake and malicious content — so your reputation actively wins business instead of quietly losing it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
              >
                Get a Free Reputation Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center cursor-pointer"
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
                  <Icon className="w-5 h-5 text-amber-500 mx-auto mb-2" />
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
              Six Ways a Passive Reputation Is Costing You Clients Right Now
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Your online reputation is either working for you or against you — there is no neutral. These six problems appear in almost every business we audit.
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
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-7 py-3.5 rounded-xl font-bold transition-all"
            >
              Fix My Reputation — Free Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-24 px-6 bg-amber-50/40">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200">
              <span className="text-xs font-bold text-amber-700 tracking-widest uppercase">
                What&apos;s Included
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              Eight Deliverables That Build an Unbeatable Online Reputation
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Every Kazi Agency reputation management engagement includes these eight core deliverables — proactively managed every month so your reputation compounds in your favour.
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
                  className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-amber-200 hover:shadow-md transition-all"
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

      {/* ── Review Impact Visual ── */}
      <section className="py-20 px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200">
              <span className="text-xs font-bold text-amber-700 tracking-widest uppercase">
                Why Reviews Win Clients
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3 text-balance">
              The Business Case for a World-Class Reputation
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base">
              Reviews are the most trusted form of social proof your business can have. Here&apos;s what the research says about their direct impact on revenue.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                stat: "3.3★",
                label: "Minimum star rating",
                description: "The minimum average star rating consumers will consider engaging with a business. Below this, most buyers move on without reading a single review.",
                color: "text-amber-600",
                bg: "bg-amber-50",
                border: "border-amber-100",
              },
              {
                stat: "57%",
                label: "Would not use below 4 stars",
                description: "Of consumers say they would not use a business with fewer than 4 stars — making rating recovery one of the highest-leverage investments you can make.",
                color: "text-orange-600",
                bg: "bg-orange-50",
                border: "border-orange-100",
              },
              {
                stat: "9 in 10",
                label: "Read owner responses",
                description: "Of consumers read a business's responses to reviews before making a decision. A professional response to a negative review converts sceptical readers into buyers.",
                color: "text-yellow-600",
                bg: "bg-yellow-50",
                border: "border-yellow-100",
              },
              {
                stat: "18%",
                label: "Revenue increase per star",
                description: "Harvard Business School research found that a one-star increase in Yelp rating leads to an average 18% revenue increase — consistent with findings across Google and Trustpilot.",
                color: "text-teal-600",
                bg: "bg-teal-50",
                border: "border-teal-100",
              },
            ].map((item, i) => (
              <motion.div
                key={item.stat}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white rounded-2xl border ${item.border} p-6 hover:shadow-lg transition-all text-center`}
              >
                <p className={`text-4xl font-black mb-2 ${item.color}`}>{item.stat}</p>
                <p className="font-bold text-slate-900 text-sm mb-3">{item.label}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200">
              <span className="text-xs font-bold text-amber-700 tracking-widest uppercase">
                Our Reputation Stack
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
              Enterprise-Grade Tools Managing Your Reputation 24/7
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base">
              We replace BrightLocal, Yext, and standalone review tools with one integrated system — at a fraction of what those subscriptions cost separately.
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
                className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3.5 shadow-sm hover:shadow-md hover:border-amber-200 transition-all shrink-0 cursor-default"
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
          Manages reviews across Google, Facebook, Yelp, Trustpilot, Clutch, G2, TripAdvisor, and 50+ business directories from a single dashboard.
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200">
              <span className="text-xs font-bold text-amber-700 tracking-widest uppercase">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              From a Scattered, Passive Reputation to a Systematic 5-Star Profile
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A proven five-phase process — audit first, build second, generate reviews third, protect and compound ongoing.
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
      <section className="py-24 px-6 bg-amber-50/40">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200">
              <span className="text-xs font-bold text-amber-700 tracking-widest uppercase">
                Why Kazi Agency
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              Full Reputation Management vs. DIY, BrightLocal / Yext & Typical Agencies
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Monitoring tools show you the problem. We fix it, protect it, and make it a competitive advantage. Here&apos;s how every option compares.
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
                        col.highlight ? "text-amber-700 bg-amber-50/60" : "text-slate-500"
                      }`}
                    >
                      {col.label}
                      {col.highlight && (
                        <span className="block mt-1 text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold mx-auto w-fit">
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
                          className={`p-5 text-center ${col.highlight ? "bg-amber-50/30" : ""}`}
                        >
                          {val === true ? (
                            <Check className="w-5 h-5 text-amber-500 mx-auto" />
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
            className="mt-10 bg-white rounded-2xl border border-amber-200 p-8"
          >
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                {
                  title: "Manual Monitoring (DIY)",
                  cost: "Your time — no system",
                  note: "Checking Google manually once a week is not a reputation strategy. You'll miss reviews, respond too late, have no competitor insight, and no systematic way to generate new reviews from happy clients. A passive reputation defaults to whoever shouts loudest.",
                },
                {
                  title: "BrightLocal / Yext",
                  cost: "£300–£600/mo (tool only)",
                  note: "Excellent citation management and monitoring tools — but they are tools, not strategies. They track your listings and show you reviews. They don't generate reviews, write responses, handle negative review suppression, or provide strategic direction. You're still doing all the work.",
                },
                {
                  title: "Kazi Agency — Full Reputation Management",
                  cost: "Monthly retainer — all included",
                  note: "Automated review generation, professional response management, negative suppression, GBP optimisation, 50+ directory management, brand monitoring, sentiment analysis, and competitor benchmarking — all handled for you as an active, compounding reputation strategy.",
                  highlight: true,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`rounded-xl p-5 ${item.highlight ? "bg-amber-50 border border-amber-200" : "bg-slate-50"}`}
                >
                  <p className={`font-bold mb-1 ${item.highlight ? "text-amber-700" : "text-slate-700"}`}>
                    {item.title}
                  </p>
                  <p className={`text-xl font-black mb-2 ${item.highlight ? "text-amber-500" : "text-slate-900"}`}>
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
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200">
                <span className="text-xs font-bold text-amber-700 tracking-widest uppercase">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6 text-balance">
                We Make Your Reputation Your Most Powerful Sales Tool
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Most businesses treat reputation management as damage control — something they scramble to fix after a bad review goes up. We treat it as a proactive revenue driver: systematically generating reviews from your best clients, crafting responses that convert readers, protecting your profile from attack, and connecting your reputation directly to your local SEO rankings so every new review makes you easier to find.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  "Automated review generation from happy clients — no manual chasing",
                  "Every review responded to within 24 hours by our reputation specialists",
                  "Real-time monitoring across every platform your buyers use to research you",
                  "Fake and policy-violating reviews identified, reported, and appealed",
                  "Google Business Profile fully optimised for local search and map pack rankings",
                  "50+ directory citations managed — replaces BrightLocal or Yext subscriptions",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="/book-a-consultation"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-7 py-3.5 rounded-xl font-bold transition-all"
                >
                  Book a Free Reputation Strategy Call
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
                  icon: Zap,
                  title: "Reviews on Autopilot",
                  description:
                    "Automated review request sequences fire the moment a project completes or an invoice is paid — no manual chasing, no awkward conversations. Most clients see a 200–400% increase in monthly review volume within 60 days of launch.",
                },
                {
                  icon: Shield,
                  title: "Active Reputation Protection",
                  description:
                    "We don't just monitor — we protect. Fake reviews are identified and reported. Policy violations are appealed. Sustained positive review generation dilutes any negatives over time. Your rating is treated as a business asset.",
                },
                {
                  icon: MapPin,
                  title: "Local SEO Impact",
                  description:
                    "Review count, rating, recency, and response rate are direct Google local ranking signals. Our review generation cadence and response consistency directly improve your map pack position — most clients see local ranking movement within 60–90 days.",
                },
                {
                  icon: RefreshCw,
                  title: "Reputation Compounds Over Time",
                  description:
                    "Unlike paid ads that stop when the budget stops, a strong review profile is permanent. Reviews earned this month keep building your authority next year. The system gets more powerful the longer it runs — and competitors can't easily replicate a 4.8-star profile built over 12 months.",
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
                    className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-amber-200 hover:shadow-md transition-all"
                  >
                    <div className="bg-amber-50 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-amber-500" />
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
      <section className="py-24 px-6 bg-amber-50/40">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200">
              <span className="text-xs font-bold text-amber-700 tracking-widest uppercase">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              Common Questions About Reputation Management
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Straight answers to every question business owners ask before investing in their online reputation.
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
                    className={`w-5 h-5 text-amber-500 shrink-0 transition-transform duration-200 ${
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
      <section className="py-24 px-6 bg-gradient-to-br from-amber-500 to-yellow-500 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-10%] top-[-20%] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute right-[-8%] bottom-[-15%] w-[400px] h-[400px] rounded-full bg-yellow-300/10 blur-3xl" />
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
                Ready to Build a 5-Star Reputation?
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-balance">
              Let&apos;s Turn Your Reputation Into Your Most Powerful Sales Asset
            </h2>
            <p className="text-xl text-amber-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute reputation audit. We&apos;ll review your current review profile, identify your biggest gaps, benchmark you against your top competitors, and show you exactly what a 90-day reputation recovery and growth plan looks like for your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center shadow-lg"
              >
                Book My Free Reputation Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
              >
                Explore All Services
              </Link>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-amber-100 text-sm">
              {["No commitment required", "Free reputation audit included", "Competitor benchmark provided"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-200" />
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

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Search,
  Shield,
  Clock,
  ChevronRight,
  ChevronDown,
  Monitor,
  Smartphone,
  BarChart3,
  Settings,
  TrendingUp,
  Users,
  Check,
  X,
} from "lucide-react";

const stats = [
  { value: "3×", label: "Average conversion rate increase vs. previous site", icon: TrendingUp },
  { value: "2–4 wks", label: "Average time from kick-off to live website", icon: Clock },
  { value: "95+", label: "Average Google PageSpeed score on launch", icon: Zap },
  { value: "100%", label: "CRM-integrated from day one", icon: Users },
];

const painPoints = [
  {
    icon: Clock,
    title: "Slow Loading Speed",
    description:
      "If your site takes more than 3 seconds to load, 53% of mobile visitors leave — and Google drops your ranking simultaneously.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Search,
    title: "Not Ranking on Google",
    description:
      "Without a technical SEO foundation built in from day one, your site is invisible to the clients actively searching for your service.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Users,
    title: "No Clear Conversion Path",
    description:
      "Visitors read your homepage and leave without calling or booking — because there's no guided journey to the next step.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Settings,
    title: "Disconnected from Your CRM",
    description:
      "Every lead that submits a form but doesn't get followed up on is a lost sale. Without CRM integration, this happens constantly.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: Monitor,
    title: "Outdated Design",
    description:
      "Your design is the first thing visitors judge. An outdated site signals an outdated business — before a single word is read.",
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    icon: Shield,
    title: "Can't Update It Yourself",
    description:
      "Paying a developer for every text change, image update, or blog post is slow, expensive, and completely unnecessary in 2025.",
    color: "text-slate-500",
    bg: "bg-slate-50",
  },
];

const deliverables = [
  {
    icon: Sparkles,
    title: "Custom AI-Powered Design",
    description:
      "Every layout is generated using AI trained on thousands of high-converting sites in your industry — then refined by our human design team for your brand.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Development",
    description:
      "Over 70% of web traffic is mobile. We build for phones first, then scale up to desktop — ensuring a flawless experience on every device.",
    color: "text-[#046BAF]",
    bg: "bg-blue-50",
  },
  {
    icon: Search,
    title: "SEO Foundation Built In",
    description:
      "Meta tags, schema markup, XML sitemaps, structured data, and keyword-optimized page structure — all included, not an add-on.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Zap,
    title: "Core Web Vitals Optimized",
    description:
      "We target 95+ PageSpeed scores by optimizing images, scripts, and hosting — because faster sites rank higher and convert better.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Users,
    title: "CRM & Lead Capture Integration",
    description:
      "Your site connects directly to GoHighLevel or your existing CRM — every form submission and chat interaction tracked and delivered to your pipeline.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: BarChart3,
    title: "Analytics & Conversion Tracking",
    description:
      "Google Analytics 4, conversion events, and call tracking set up so you know exactly which pages and traffic sources are driving real leads.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Settings,
    title: "Self-Managed CMS",
    description:
      "Update blog posts, team pages, and images without touching code. Full training session included so you're self-sufficient from day one.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Shield,
    title: "SSL, Security & Hosting Setup",
    description:
      "Secure HTTPS, spam protection, daily backups, and blazing-fast CDN hosting — all configured and ready so you go live with confidence.",
    color: "text-slate-600",
    bg: "bg-slate-50",
  },
];

const buildSteps = [
  {
    step: "01",
    title: "Discovery & Brand Audit",
    description:
      "A 60-minute strategy call covering your business goals, target audience, competitors, and messaging. We map the full conversion journey before writing a single line of code.",
    icon: Search,
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
    duration: "Days 1–3",
  },
  {
    step: "02",
    title: "Wireframe & Copy Strategy",
    description:
      "We create page-by-page wireframes and write conversion-focused copy using AI + human editing. Every section is intentional — designed to move visitors toward a decision.",
    icon: Monitor,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    duration: "Days 4–7",
  },
  {
    step: "03",
    title: "AI-Assisted Design Build",
    description:
      "Our AI design engine generates layout options based on top-performing sites in your industry. We select, refine, and custom-polish every section to match your brand.",
    icon: Sparkles,
    color: "text-[#046BAF]",
    bg: "bg-blue-50",
    border: "border-blue-100",
    duration: "Days 8–14",
  },
  {
    step: "04",
    title: "Development & Integration",
    description:
      "Full frontend development, CRM connection, lead forms, analytics, and SEO implementation. Tested across all browsers and devices before QA.",
    icon: Zap,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    duration: "Days 15–21",
  },
  {
    step: "05",
    title: "Launch & Post-Launch Support",
    description:
      "We go live, submit to Google Search Console, and stay hands-on for 30–60 days. Full walkthrough so you can manage updates with confidence.",
    icon: TrendingUp,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    duration: "Days 22–28",
  },
];

const comparisonFeatures = [
  "Custom AI-Designed Layout",
  "Mobile-First Development",
  "SEO Foundation Built In",
  "CRM & Lead Form Integration",
  "Core Web Vitals Optimized (95+)",
  "Analytics & Conversion Tracking",
  "Self-Managed CMS",
  "Launch in 2–4 Weeks",
  "Integrated Marketing Stack",
  "Transparent Fixed Pricing",
];

const comparisonData = [
  {
    label: "DIY (Wix / Squarespace)",
    values: [false, "basic", false, false, false, "basic", true, true, false, true],
    highlight: false,
  },
  {
    label: "Freelancer",
    values: [true, "varies", "varies", "extra cost", "varies", "extra cost", "varies", false, false, false],
    highlight: false,
  },
  {
    label: "Traditional Agency",
    values: [true, true, "add-on", "extra cost", "rarely", "extra cost", true, false, false, false],
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
    q: "How long does it take to build and launch our website?",
    a: "Most websites are live within 2–4 weeks from the kick-off call. More complex builds — such as e-commerce or multi-location sites — typically take 4–6 weeks. We set a clear timeline at the start and stick to it.",
  },
  {
    q: "Do I need to provide the content and copy?",
    a: "No. Our AI-assisted copywriting process drafts all page content for you based on a discovery call and your brand inputs. A human strategist reviews and refines every word for clarity and conversion. You approve before anything goes live.",
  },
  {
    q: "Will my website rank on Google?",
    a: "Every site we build includes a full technical SEO foundation — optimized meta tags, schema markup, XML sitemaps, fast loading, and mobile-first structure. Rankings build over time with consistent content. For faster results, pair your website with our dedicated SEO Services.",
  },
  {
    q: "Can I update the website myself after launch?",
    a: "Yes. Every website comes with a self-managed CMS so you can edit text, images, blog posts, and team pages without touching code or calling a developer. We include a full training session before handoff.",
  },
  {
    q: "Does the website connect to my CRM?",
    a: "Yes. We integrate every website with GoHighLevel (our native CRM platform) or your existing CRM via API or Zapier. Every form submission, chat interaction, and booked call flows directly into your sales pipeline.",
  },
  {
    q: "What makes 'AI-powered' different from a regular website?",
    a: "Our AI generates layout structures, conversion flows, and copy frameworks based on patterns from thousands of high-performing sites in your industry. This means a more optimized result from day one — not after months of A/B testing. The AI does the heavy lifting; our human team adds the craft and brand precision.",
  },
  {
    q: "What if I need changes after launch?",
    a: "All packages include 30–60 days of post-launch support for bug fixes, content tweaks, and minor updates. After that, changes can be handled via an ongoing retainer or a per-request basis. Major redesigns or new feature builds are scoped and quoted separately.",
  },
  {
    q: "Is there a monthly fee after the website is built?",
    a: "Hosting, SSL, and maintenance are billed separately at a low monthly rate (typically $49–$99/month depending on your stack). There are no ongoing design or development fees unless you choose a retainer. The one-time build cost is all-in for design and development.",
  },
];

export default function AIWebsiteDesignPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6 bg-gradient-to-br from-white via-sky-50/40 to-blue-50">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-[-8%] top-[-8%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#046BAF]/25 to-sky-400/10 blur-3xl" />
          <div className="absolute right-[-6%] bottom-[-6%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-cyan-400/15 to-[#046BAF]/10 blur-3xl" />
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
            <span className="text-[#046BAF] font-medium">AI Website Design</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-sky-50 border border-sky-200">
              <Globe className="w-4 h-4 text-sky-600" />
              <span className="text-xs font-bold text-sky-700 tracking-widest uppercase">
                Web Design & Development
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 text-balance leading-tight">
              AI-Powered Websites That Turn{" "}
              <span className="bg-gradient-to-r from-sky-500 to-[#046BAF] bg-clip-text text-transparent">
                Visitors Into Paying Clients
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Most business websites are digital brochures — they cost money without making money. Kazi Agency builds AI-powered, conversion-first websites that load fast, rank on Google, and plug directly into your CRM to turn every visitor into a trackable lead.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-[#046BAF] hover:bg-[#035a94] text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
              >
                Get a Free Website Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="border-2 border-[#046BAF] text-[#046BAF] hover:bg-[#046BAF] hover:text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center cursor-pointer"
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
                  <Icon className="w-5 h-5 text-[#046BAF] mx-auto mb-2" />
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
              Is Your Website Quietly Losing You Clients?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Most business websites have at least 3 of these problems — and every one of them is costing you leads every single day.
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
              Sound familiar? Here&apos;s everything we fix — and everything we include.
            </p>
            <Link
              href="/free-business-audit"
              className="inline-flex items-center gap-2 bg-[#046BAF] hover:bg-[#035a94] text-white px-7 py-3.5 rounded-xl font-bold transition-all"
            >
              Fix My Website — Book a Free Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-24 px-6 bg-[#f0f7ff]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#046BAF]/10 border border-[#046BAF]/20">
              <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">
                What&apos;s Included
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              Everything Your Website Needs to Convert
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Every Kazi Agency website comes with these 8 core deliverables — no add-ons, no surprise fees.
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
                  className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-[#046BAF]/30 hover:shadow-md transition-all"
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#046BAF]/10 border border-[#046BAF]/20">
              <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              From Kick-Off to Live in 2–4 Weeks
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A structured, transparent build process — so you always know what&apos;s happening and when.
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
      <section className="py-24 px-6 bg-[#f0f7ff]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#046BAF]/10 border border-[#046BAF]/20">
              <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">
                Why Kazi Agency
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              How We Compare to Your Options
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See what you actually get — and what everyone else quietly leaves out.
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
                      className={`p-5 text-center font-bold text-sm min-w-[140px] ${
                        col.highlight ? "text-[#046BAF] bg-[#046BAF]/5" : "text-slate-500"
                      }`}
                    >
                      {col.label}
                      {col.highlight && (
                        <span className="block mt-1 text-[10px] bg-[#046BAF] text-white px-2 py-0.5 rounded-full font-bold mx-auto w-fit">
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
                          className={`p-5 text-center ${col.highlight ? "bg-[#046BAF]/5" : ""}`}
                        >
                          {val === true ? (
                            <Check className="w-5 h-5 text-[#046BAF] mx-auto" />
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#046BAF]/10 border border-[#046BAF]/20">
              <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">
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
                className="bg-[#f0f7ff] rounded-2xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-slate-900 text-sm sm:text-base leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#046BAF] shrink-0 transition-transform duration-200 ${
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
                Ready to Launch?
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-balance">
              Let&apos;s Build a Website That Actually Works for Your Business
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute website audit. We&apos;ll review your current site (or your idea), identify what&apos;s costing you leads, and show you exactly what your new site will do differently.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-white text-[#046BAF] hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center shadow-lg"
              >
                Book My Free Website Audit
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
              {["No commitment required", "30-minute call, no pressure", "Clear action plan guaranteed"].map((item) => (
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

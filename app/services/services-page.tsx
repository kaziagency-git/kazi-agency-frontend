"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Users,
  Zap,
  Search,
  Share2,
  Target,
  Filter,
  Star,
  Calendar,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Shield,
  Clock,
  ChevronRight,
} from "lucide-react";

const services = [
  {
    slug: "ai-website-design",
    icon: Globe,
    title: "AI-Powered Website Design",
    description:
      "Custom, conversion-optimized websites built with AI that load fast, rank high, and turn visitors into leads.",
    accent: "from-sky-500 to-[#046BAF]",
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    tag: "Web",
  },
  {
    slug: "crm-pipeline-management",
    icon: Users,
    title: "CRM & Pipeline Management",
    description:
      "Centralize your leads, automate follow-ups, and track every deal from first touch to closed customer.",
    accent: "from-emerald-500 to-teal-500",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    tag: "CRM",
  },
  {
    slug: "marketing-automation",
    icon: Zap,
    title: "Marketing Automation",
    description:
      "Smart email, SMS, and multi-channel workflows that nurture leads 24/7 without manual effort.",
    accent: "from-violet-500 to-purple-500",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    tag: "Automation",
  },
  {
    slug: "seo-services",
    icon: Search,
    title: "SEO Services",
    description:
      "Rank higher on Google with AI-assisted keyword research, on-page optimization, and strategic content.",
    accent: "from-orange-500 to-amber-500",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    tag: "SEO",
  },
  {
    slug: "social-media-management",
    icon: Share2,
    title: "Social Media Management",
    description:
      "Consistent branded content across LinkedIn, TikTok, YouTube Shorts, and more — planned and scheduled for you.",
    accent: "from-pink-500 to-rose-500",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
    tag: "Social",
  },
  {
    slug: "paid-advertising",
    icon: Target,
    title: "Paid Advertising (PPC)",
    description:
      "Full-service ad management across Meta, Google & LinkedIn with AI-driven creative testing and ROI tracking.",
    accent: "from-red-500 to-orange-500",
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    tag: "Ads",
  },
  {
    slug: "lead-generation",
    icon: Filter,
    title: "Lead Generation",
    description:
      "AI chatbots, smart forms, and automated capture systems that qualify and deliver high-intent leads to your pipeline.",
    accent: "from-[#046BAF] to-cyan-500",
    iconBg: "bg-sky-50",
    iconColor: "text-[#046BAF]",
    tag: "Leads",
  },
  {
    slug: "reputation-management",
    icon: Star,
    title: "Reputation Management",
    description:
      "Monitor, respond to, and amplify your reviews across platforms to build trust and dominate local search.",
    accent: "from-amber-500 to-yellow-400",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    tag: "Reviews",
  },
  {
    slug: "appointment-scheduling",
    icon: Calendar,
    title: "Booking & Appointment Scheduling",
    description:
      "A fully integrated scheduling system synced with your CRM that automates confirmations and reminders.",
    accent: "from-teal-500 to-green-500",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    tag: "Scheduling",
  },
  {
    slug: "analytics-reporting",
    icon: BarChart3,
    title: "Analytics & Reporting",
    description:
      "Monthly dashboards tracking organic traffic, paid ROI, CRM performance, and social — all in one clear view.",
    accent: "from-indigo-500 to-blue-500",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    tag: "Analytics",
  },
];

const process = [
  {
    step: "01",
    title: "Discovery & Audit",
    description:
      "We audit your current stack, identify gaps, and map a custom strategy aligned with your growth goals.",
    icon: Search,
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
  {
    step: "02",
    title: "Strategy & Build",
    description:
      "Our team builds your systems — website, CRM, automations, and content — all in one integrated platform.",
    icon: Zap,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
  {
    step: "03",
    title: "Launch & Optimize",
    description:
      "We go live, monitor performance, and continuously optimize for better leads and lower acquisition costs.",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
  },
  {
    step: "04",
    title: "Scale & Grow",
    description:
      "As results come in, we expand to paid ads, new channels, and higher targets — compounding your growth.",
    icon: Target,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
];

const stats = [
  { value: "$12K+", label: "Saved monthly vs. separate tools", icon: Shield },
  { value: "90%", label: "Of sales & marketing automated", icon: Zap },
  { value: "3×", label: "Average lead increase in 90 days", icon: TrendingUp },
  { value: "18+", label: "Tools replaced by one platform", icon: CheckCircle2 },
];

const whyPoints = [
  {
    icon: Zap,
    title: "Everything in One Platform",
    description:
      "No more switching between 10+ tools. CRM, SEO, automation, ads, and scheduling all in one dashboard.",
  },
  {
    icon: Shield,
    title: "AI-First from Day One",
    description:
      "Every service we deliver is powered by AI — from chatbots to content calendars to creative ad testing.",
  },
  {
    icon: TrendingUp,
    title: "Measurable Outcomes",
    description:
      "We tie every deliverable to a KPI. Monthly reports show exactly what's working and what's next.",
  },
  {
    icon: Clock,
    title: "Fast, Structured Onboarding",
    description:
      "Most clients are fully launched within 2–4 weeks. We move fast without cutting corners.",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6 bg-gradient-to-br from-white via-sky-50/40 to-blue-50">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-[-8%] top-[-8%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#046BAF]/25 to-violet-500/10 blur-3xl" />
          <div className="absolute right-[-6%] bottom-[-6%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-cyan-400/15 to-[#046BAF]/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-[#046BAF]/10 border border-[#046BAF]/20">
              <Sparkles className="w-4 h-4 text-[#046BAF]" />
              <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">
                What We Offer
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 text-balance leading-tight">
              Every Service Your Business Needs to{" "}
              <span className="bg-gradient-to-r from-[#046BAF] to-cyan-500 bg-clip-text text-transparent">
                Grow Faster
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              From AI-powered websites and CRM to SEO, paid ads, and reputation
              management — Kazi Agency delivers a complete growth system under
              one roof, replacing $12,000+ worth of tools every month.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-[#046BAF] hover:bg-[#035a94] text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
              >
                Book a Free Strategy Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() =>
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="border-2 border-[#046BAF] text-[#046BAF] hover:bg-[#046BAF] hover:text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center cursor-pointer"
              >
                Browse Services
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

      {/* ── Services Grid ── */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#046BAF]/10 border border-[#046BAF]/20">
              <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">
                Our Services
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              10 Specialized Services, One Unified Platform
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Click any service to learn more about how we deliver results in
              that area for your business.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group relative flex flex-col h-full bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-[#046BAF]/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* top gradient bar */}
                    <div className={`h-1 bg-gradient-to-r ${service.accent}`} />

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`${service.iconBg} p-3 rounded-xl`}>
                          <Icon className={`w-6 h-6 ${service.iconColor}`} />
                        </div>
                        <span className="text-xs font-bold tracking-widest uppercase text-slate-400 mt-1">
                          {service.tag}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#046BAF] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed flex-1">
                        {service.description}
                      </p>

                      <div className="mt-5 flex items-center gap-1 text-[#046BAF] text-sm font-semibold">
                        Learn more
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

      {/* ── Why Kazi Agency ── */}
      <section className="py-24 px-6 bg-[#f0f7ff]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#046BAF]/10 border border-[#046BAF]/20">
                <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6 text-balance">
                One Agency. Every Tool. Real Results.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Most agencies specialize in one or two channels. Kazi Agency
                delivers your entire growth stack — built, integrated, and
                managed in one place so you never have to juggle vendors again.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  "No more tool-hopping — one dashboard for everything",
                  "AI-powered across every service, not just marketing",
                  "Transparent monthly reporting tied to real KPIs",
                  "Launch-ready in 2–4 weeks from onboarding",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#046BAF] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="/book-a-consultation"
                  className="inline-flex items-center gap-2 bg-[#046BAF] hover:bg-[#035a94] text-white px-7 py-3.5 rounded-xl font-bold transition-all"
                >
                  Get a Free Consultation
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
              {whyPoints.map((point, i) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-[#046BAF]/30 hover:shadow-md transition-all"
                  >
                    <div className="bg-[#046BAF]/10 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#046BAF]" />
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

      {/* ── Our Process ── */}
      <section className="py-24 px-6 bg-white">
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
              From Onboarding to Growth in 4 Steps
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A structured process that gets you from zero to a fully running
              growth system — fast.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* connector line visible on lg */}
            <div
              aria-hidden
              className="hidden lg:block absolute top-[52px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
            />

            {process.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className={`relative bg-white rounded-2xl border ${step.border} p-6 hover:shadow-lg transition-all`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`${step.bg} ${step.border} border w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <span className="text-3xl font-black text-slate-100 select-none leading-none">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
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
                Ready to Scale?
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-balance">
              Let's Build Your Growth System Together
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute strategy call. We'll audit your current
              setup and show you exactly which services will move the needle
              most for your business.
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

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Search,
  Shield,
  Clock,
  ChevronRight,
  ChevronDown,
  BarChart3,
  Settings,
  TrendingUp,
  MessageSquare,
  Bell,
  Filter,
  Calendar,
  Database,
  GitBranch,
  Check,
  X,
  PhoneCall,
  Mail,
} from "lucide-react";

const stats = [
  { value: "78%", label: "Of deals lost to the first vendor that responds — we fix that", icon: PhoneCall },
  { value: "3–5×", label: "More pipeline visibility after a proper CRM setup", icon: BarChart3 },
  { value: "90%", label: "Of follow-ups automated — your team focuses on closing", icon: Zap },
  { value: "14+", label: "Tools replaced by one unified CRM platform", icon: Database },
];

const painPoints = [
  {
    icon: Filter,
    title: "Leads Falling Through the Cracks",
    description:
      "Prospects enquire, you mean to follow up, life gets busy — and three days later they've already signed with a competitor. Without an automated pipeline, this happens daily.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: BarChart3,
    title: "No Real Visibility Into Your Pipeline",
    description:
      "You can't tell which deals are stalling, which reps are overloaded, or how much revenue is actually on the table. You're running your business on gut feel instead of data.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Bell,
    title: "Manual Follow-Ups That Simply Don't Happen",
    description:
      "Relying on your team to remember to send the third touch, the proposal reminder, or the re-engagement email means most prospects go cold before they convert.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Settings,
    title: "Too Many Disconnected Tools",
    description:
      "Spreadsheets for contacts, email for follow-ups, a separate calendar for bookings, Stripe for payments — nothing talks to each other and data lives everywhere.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: MessageSquare,
    title: "No Lead Scoring or Prioritisation",
    description:
      "Your team is spending equal time on tyre-kickers and hot prospects. Without lead scoring, high-intent buyers don't get the fast response that wins the deal.",
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    icon: Search,
    title: "Sales Team Can't See What's Working",
    description:
      "Without tracking touchpoints, source attribution, and close rates by channel, you have no idea which marketing spend is generating real revenue — and you keep guessing.",
    color: "text-slate-500",
    bg: "bg-slate-50",
  },
];

const deliverables = [
  {
    icon: Database,
    title: "GoHighLevel CRM Setup & Configuration",
    description:
      "We build your entire CRM environment from scratch inside GoHighLevel — custom fields, contact properties, tags, and a structure built around your exact sales process.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: GitBranch,
    title: "Custom Sales Pipeline Build",
    description:
      "Multi-stage pipelines mapped to your real sales cycle — from first contact to closed client. Every stage has automations and team notifications so nothing stalls silently.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Zap,
    title: "Automated Lead Follow-Up Sequences",
    description:
      "Multi-channel follow-up workflows — email, SMS, and voicemail drops — triggered the moment a lead enters your pipeline. No more manual chasing.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Filter,
    title: "Lead Scoring & Smart Tagging",
    description:
      "Leads are automatically scored based on behaviour, source, and engagement. Your team sees a prioritised view — so they call the hot leads first, every time.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: Mail,
    title: "Contact & Data Migration",
    description:
      "We import and clean all your existing contacts from spreadsheets, HubSpot, Mailchimp, or any previous CRM — properly tagged, segmented, and ready to use from day one.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Calendar,
    title: "Calendar & Booking Integration",
    description:
      "Appointment scheduling embedded directly into the CRM — synced with your team's calendars, with automated reminders and no-show re-engagement built in.",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: BarChart3,
    title: "Custom Reporting Dashboards",
    description:
      "A live dashboard showing pipeline value, conversion rates by stage, lead sources, and team performance — so you make data-driven decisions, not guesses.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Users,
    title: "Team Training & Ongoing Support",
    description:
      "Full recorded onboarding walkthrough for your team, a written SOP document, and ongoing Slack-based support so adoption actually sticks after go-live.",
    color: "text-slate-600",
    bg: "bg-slate-50",
  },
];

const buildSteps = [
  {
    step: "01",
    title: "CRM Audit & Sales Discovery",
    description:
      "A 60-minute deep-dive covering your current tools, sales process, team structure, and biggest drop-off points. We map every stage of your customer journey before touching a single setting.",
    icon: Search,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    duration: "Days 1–2",
  },
  {
    step: "02",
    title: "Pipeline Architecture Design",
    description:
      "We design your pipeline stages, automation triggers, follow-up sequences, and lead scoring rules on paper first — then present the full blueprint for your sign-off before we build.",
    icon: GitBranch,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    duration: "Days 3–5",
  },
  {
    step: "03",
    title: "CRM Build & Configuration",
    description:
      "Full GoHighLevel setup — custom fields, contact tags, pipelines, user accounts, and team permissions. All configured to match your approved architecture exactly.",
    icon: Settings,
    color: "text-[#046BAF]",
    bg: "bg-blue-50",
    border: "border-blue-100",
    duration: "Days 6–10",
  },
  {
    step: "04",
    title: "Automations & Integrations",
    description:
      "All follow-up sequences, lead alerts, and pipeline triggers are activated. Website forms, booking pages, and third-party tools are connected and tested end-to-end.",
    icon: Zap,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    duration: "Days 11–14",
  },
  {
    step: "05",
    title: "Training, Go-Live & Handoff",
    description:
      "Live team training session, recorded walkthrough, and written SOPs. We run live test leads through the full pipeline before handing the keys over — and stay on support for 30+ days.",
    icon: TrendingUp,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
    duration: "Days 15–18",
  },
];

const comparisonFeatures = [
  "Full Sales Pipeline Management",
  "Automated Follow-Up Sequences",
  "2-Way SMS & Email Inbox",
  "AI Conversation Assistant",
  "Appointment Scheduling Built In",
  "Marketing Automation Included",
  "Custom Reporting Dashboard",
  "Lead Scoring & Smart Tags",
  "Done-For-You Setup & Migration",
  "Transparent, Affordable Pricing",
];

const comparisonData = [
  {
    label: "HubSpot CRM",
    values: [true, "paid add-on", "extra cost", false, "extra cost", "extra cost", "basic", false, false, false],
    highlight: false,
  },
  {
    label: "Salesforce",
    values: [true, "extra cost", "extra cost", "add-on", "extra cost", "extra cost", true, "extra cost", false, false],
    highlight: false,
  },
  {
    label: "Pipedrive",
    values: [true, "limited", false, false, "extra cost", false, "basic", false, false, true],
    highlight: false,
  },
  {
    label: "Kazi Agency (GoHighLevel)",
    values: [true, true, true, true, true, true, true, true, true, true],
    highlight: true,
  },
];

const faqs = [
  {
    q: "What CRM platform do you use for client setups?",
    a: "We build all client CRM environments on GoHighLevel — a powerful all-in-one platform that includes a full CRM, email/SMS marketing, booking scheduler, pipeline management, AI assistant, and reporting in one dashboard. It replaces HubSpot, Calendly, ActiveCampaign, and most other point tools at a fraction of the combined cost.",
  },
  {
    q: "How long does the full CRM setup take?",
    a: "Most clients are fully built, trained, and live within 2–3 weeks from the kick-off call. More complex multi-team setups or large data migrations may extend to 4 weeks. We give you a clear timeline at the start and hold to it.",
  },
  {
    q: "Can you migrate our contacts from our existing CRM or spreadsheets?",
    a: "Yes. We handle full contact migrations from HubSpot, Salesforce, Pipedrive, Zoho, Mailchimp, ActiveCampaign, and Excel/Google Sheets. We clean the data, remove duplicates, assign tags and segments, and ensure your first message to existing contacts doesn't look like it came from a blank slate.",
  },
  {
    q: "Do we need any technical knowledge to use the CRM day-to-day?",
    a: "No. GoHighLevel is built for non-technical users and we make it even simpler by pre-configuring everything for your workflow. We provide a full live training session, a recorded walkthrough, and written SOPs so any team member can pick it up immediately. Ongoing support is included for the first 30+ days.",
  },
  {
    q: "How do the automated follow-up sequences work?",
    a: "When a new lead enters your pipeline — via a web form, a social ad, a booked call, or any other source — a pre-built workflow automatically sends a sequence of personalised emails, SMS messages, and optional voicemail drops over the following days. The sequence pauses the moment they reply or book, so no lead receives a follow-up after they've already engaged. You set it once; it runs forever.",
  },
  {
    q: "Can the CRM connect to our website and marketing channels?",
    a: "Yes. We integrate your CRM with your website (all major platforms supported), Facebook/Instagram lead ads, Google lead forms, Typeform, and any tool that supports webhooks or API connections. Every lead from every source lands in one unified pipeline — tagged by source so you can track which channels are converting.",
  },
  {
    q: "Is there a long-term contract or can we cancel anytime?",
    a: "The CRM setup is a one-time project fee. GoHighLevel's monthly platform cost is separate (typically $97–$297/month) and you can cancel that at any time. We also offer ongoing monthly management retainers for clients who want us to run, maintain, and optimise their CRM over time — that's also cancel-anytime.",
  },
  {
    q: "What's included in ongoing CRM management after the initial setup?",
    a: "Our ongoing CRM retainer includes monthly automation audits, new sequence builds for promotions or campaigns, pipeline stage updates as your sales process evolves, reporting reviews, and new team member onboarding. Think of us as a part-time CRM operations team — without the full-time salary.",
  },
];

export default function CRMPipelineManagementPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6 bg-gradient-to-br from-white via-emerald-50/40 to-teal-50">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-[-8%] top-[-8%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-400/10 blur-3xl" />
          <div className="absolute right-[-6%] bottom-[-6%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-teal-400/15 to-emerald-500/10 blur-3xl" />
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
            <span className="text-emerald-600 font-medium">CRM & Pipeline Management</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
              <Users className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase">
                CRM & Pipeline Management
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 text-balance leading-tight">
              Stop Losing Leads. Build a CRM That{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Closes Deals on Autopilot
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Most businesses lose 60–80% of leads simply because they don&apos;t follow up fast enough or consistently enough. Kazi Agency builds your entire CRM infrastructure — from pipeline setup to automated multi-channel follow-up — so every lead gets a response and every deal gets tracked to close.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
              >
                Get a Free CRM Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center cursor-pointer"
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
                  <Icon className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
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
              Is Your Pipeline Leaking Revenue Every Day?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              These are the six most common CRM failures we see when we audit a new client&apos;s sales process — and every one costs real money.
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
              Sound familiar? Here&apos;s exactly what we build to fix it.
            </p>
            <Link
              href="/book-a-consultation"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3.5 rounded-xl font-bold transition-all"
            >
              Audit My CRM — It&apos;s Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-24 px-6 bg-[#f0fdf8]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase">
                What&apos;s Included
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              Everything You Need to Run a Watertight Pipeline
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Every Kazi Agency CRM engagement includes these 8 core deliverables — fully built, tested, and ready to convert leads.
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
                  className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-emerald-200 hover:shadow-md transition-all"
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              From Scattered Data to a Fully Automated Pipeline in 3 Weeks
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A structured, proven delivery process — so you always know what&apos;s happening and nothing gets missed.
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
      <section className="py-24 px-6 bg-[#f0fdf8]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase">
                Why Kazi Agency
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              How We Compare to the Alternatives
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              HubSpot, Salesforce, and Pipedrive all charge extra for the features that matter most — we include everything.
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
                      className={`p-5 text-center font-bold text-sm min-w-[150px] ${
                        col.highlight ? "text-emerald-700 bg-emerald-50/60" : "text-slate-500"
                      }`}
                    >
                      {col.label}
                      {col.highlight && (
                        <span className="block mt-1 text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold mx-auto w-fit">
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
                          className={`p-5 text-center ${col.highlight ? "bg-emerald-50/30" : ""}`}
                        >
                          {val === true ? (
                            <Check className="w-5 h-5 text-emerald-600 mx-auto" />
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
            className="mt-10 bg-white rounded-2xl border border-emerald-200 p-8"
          >
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                {
                  title: "HubSpot CRM",
                  cost: "$800–$3,200/mo",
                  note: "Marketing Hub, Sales Hub & Service Hub all sold separately. Basic automation only in paid tiers.",
                },
                {
                  title: "Salesforce Essentials",
                  cost: "$300–$1,500/mo",
                  note: "Extremely complex to configure. Dedicated admin usually needed. Setup alone can cost $5,000+.",
                },
                {
                  title: "Kazi Agency (GoHighLevel)",
                  cost: "One-time setup + $97–$297/mo",
                  note: "Full CRM, SMS, email, AI assistant, scheduling, and automation — done-for-you and live in 3 weeks.",
                  highlight: true,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`rounded-xl p-5 ${item.highlight ? "bg-emerald-50 border border-emerald-200" : "bg-slate-50"}`}
                >
                  <p className={`font-bold mb-1 ${item.highlight ? "text-emerald-700" : "text-slate-700"}`}>
                    {item.title}
                  </p>
                  <p className={`text-xl font-black mb-2 ${item.highlight ? "text-emerald-600" : "text-slate-900"}`}>
                    {item.cost}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Kazi + Trust ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200">
                <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6 text-balance">
                We Don&apos;t Just Set Up Software — We Fix Your Sales Process
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Most CRM setups fail because the tool gets configured but the process doesn&apos;t change. We audit your sales workflow first, design automation around how your team actually works, then build a CRM that fits — not one you have to adapt to.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  "Purpose-built for your exact sales cycle, not a generic template",
                  "Multi-channel automation: email, SMS, and voicemail drop combined",
                  "Full team training so adoption actually happens after go-live",
                  "Live in 2–3 weeks — not 3–6 months like enterprise CRM projects",
                  "Ongoing support with a real human who knows your setup",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="/book-a-consultation"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3.5 rounded-xl font-bold transition-all"
                >
                  Book a Free CRM Strategy Call
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
                  title: "Immediate Speed-to-Lead",
                  description:
                    "Leads receive an automated response within 60 seconds of enquiring — before a competitor even sees the notification.",
                },
                {
                  icon: BarChart3,
                  title: "Full Pipeline Transparency",
                  description:
                    "Every deal, every stage, every follow-up — visible in one live dashboard. No more chasing your team for updates.",
                },
                {
                  icon: Shield,
                  title: "No Lead Left Behind",
                  description:
                    "Every lead in your system gets a defined follow-up sequence. The CRM follows up even when your team forgets.",
                },
                {
                  icon: TrendingUp,
                  title: "Revenue Attribution",
                  description:
                    "Track which marketing channels, campaigns, and keywords are generating real closed revenue — not just clicks.",
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
                    className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-emerald-200 hover:shadow-md transition-all"
                  >
                    <div className="bg-emerald-50 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-emerald-600" />
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
      <section className="py-24 px-6 bg-[#f0fdf8]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-emerald-100 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              Common Questions About CRM Setup
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you want to know before booking a strategy call.
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
                    className={`w-5 h-5 text-emerald-600 shrink-0 transition-transform duration-200 ${
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
      <section className="py-24 px-6 bg-gradient-to-br from-emerald-600 to-teal-600 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-10%] top-[-20%] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute right-[-8%] bottom-[-15%] w-[400px] h-[400px] rounded-full bg-teal-300/10 blur-3xl" />
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
                Ready to Stop Losing Leads?
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-balance">
              Let&apos;s Build a CRM That Closes Deals While You Sleep
            </h2>
            <p className="text-xl text-emerald-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute CRM audit call. We&apos;ll review your current setup, identify every place you&apos;re losing leads, and show you exactly what your new pipeline will look like.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center shadow-lg"
              >
                Book My Free CRM Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
              >
                Explore All Services
              </Link>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-emerald-100 text-sm">
              {["No commitment required", "Free 30-minute audit call", "Clear action plan guaranteed"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-200" />
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

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
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
  TrendingUp,
  MessageSquare,
  Bell,
  Filter,
  Mail,
  Smartphone,
  GitBranch,
  Users,
  MousePointer,
  RefreshCw,
  Check,
  X,
} from "lucide-react";

const stats = [
  { value: "451%", label: "More qualified leads generated with marketing automation vs no automation", icon: TrendingUp },
  { value: "14×", label: "Higher click-through rates from behaviour-triggered emails vs blasts", icon: MousePointer },
  { value: "80%", label: "Of repetitive marketing tasks eliminated after a full automation build", icon: Zap },
  { value: "24/7", label: "Your pipeline nurtured — even when your team is completely offline", icon: Clock },
];

const painPoints = [
  {
    icon: Mail,
    title: "Sending Emails Manually, One by One",
    description:
      "Your team spends hours writing and sending the same follow-up emails for every new lead. It's not sustainable — and it means slower responses, inconsistent messaging, and burned-out staff.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Bell,
    title: "No Nurture After the First Touch",
    description:
      "A lead downloads your guide, gets one welcome email, and then — silence. Without a nurture sequence, 97% of leads who aren't ready to buy today simply forget you exist.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Smartphone,
    title: "Email and SMS Running in Silos",
    description:
      "Your email tool doesn't know what your SMS platform is doing. Leads get duplicate messages, or no message at all, depending on which list they're on. Nothing is coordinated.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Users,
    title: "Blasting Everyone the Same Message",
    description:
      "You have one email list and everyone gets the same broadcast. Cold leads, hot prospects, and existing customers all receive identical content — and your unsubscribe rate shows it.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: GitBranch,
    title: "No Behavioural Triggers",
    description:
      "When a lead visits your pricing page three times, nothing happens. When someone abandons a booking, no reminder fires. Your automation should react to intent signals — but it doesn't.",
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    icon: BarChart3,
    title: "No Visibility Into What's Actually Working",
    description:
      "You send campaigns but have no clear view of open rates, click-throughs, revenue attributed, or which sequence is converting. You're optimising in the dark.",
    color: "text-slate-500",
    bg: "bg-slate-50",
  },
];

const deliverables = [
  {
    icon: Mail,
    title: "Email Drip & Nurture Sequences",
    description:
      "Multi-step email sequences built around your buyer journey — from first touch to purchase-ready. Every email is written, designed, and scheduled for you, personalised by lead source and behaviour.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Smartphone,
    title: "SMS & Voicemail Drop Workflows",
    description:
      "Two-way SMS automations that send at the right moment — appointment reminders, lead follow-ups, re-engagement nudges — all compliant and coordinated with your email sequences.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: GitBranch,
    title: "Behavioural Trigger Automations",
    description:
      "Workflows that fire based on what leads actually do — clicking a link, visiting a pricing page, abandoning a booking, or going silent for 7 days. Relevance at every step.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: Filter,
    title: "Lead Segmentation & Tagging",
    description:
      "Contacts automatically segmented by source, behaviour, stage, and intent. The right message goes to the right person — and your list stays clean and actionable over time.",
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    icon: RefreshCw,
    title: "Re-engagement & Win-Back Campaigns",
    description:
      "Automatically identify cold leads and dead pipeline deals, then trigger a targeted re-engagement sequence designed to revive interest before they're lost forever.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Settings,
    title: "CRM & Pipeline Automation",
    description:
      "Workflow triggers that move leads through your CRM pipeline automatically — updating stages, assigning owners, sending alerts, and booking appointments without anyone clicking a button.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Zap,
    title: "Broadcast Campaign Management",
    description:
      "Monthly promotional emails, offer campaigns, and newsletters — planned, written, designed, and sent by our team. Every broadcast is segmented and A/B tested for best performance.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: BarChart3,
    title: "Automation Reporting & Optimisation",
    description:
      "Monthly performance reports covering open rates, click rates, conversion rates, revenue attributed, and sequence health — with recommendations to improve results each quarter.",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
];

const buildSteps = [
  {
    step: "01",
    title: "Automation Audit & Strategy",
    description:
      "We map your complete customer journey — from first touch to repeat purchase — and identify every point where automation can speed up conversion, reduce churn, or save your team time.",
    icon: Search,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    duration: "Days 1–3",
  },
  {
    step: "02",
    title: "Workflow Architecture Design",
    description:
      "A full visual blueprint of every automation — triggers, conditions, branches, delays, and outcomes — designed and presented for your approval before we write a single line of copy.",
    icon: GitBranch,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
    duration: "Days 4–6",
  },
  {
    step: "03",
    title: "Copy, Creative & Sequence Build",
    description:
      "We write all email and SMS copy, design the email templates to match your brand, and build every workflow inside your platform — fully personalised and ready to test.",
    icon: Mail,
    color: "text-[#046BAF]",
    bg: "bg-blue-50",
    border: "border-blue-100",
    duration: "Days 7–14",
  },
  {
    step: "04",
    title: "Integration, Testing & QA",
    description:
      "Every workflow is connected to your CRM, website forms, and lead sources, then tested end-to-end with real test leads. We check every trigger, branch, and personalisation tag before going live.",
    icon: Settings,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    duration: "Days 15–18",
  },
  {
    step: "05",
    title: "Launch, Train & Optimise",
    description:
      "We go live, walk your team through the full automation map, and monitor performance for the first 30 days. We then iterate on sequences that aren't converting at target.",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    duration: "Days 19–21+",
  },
];

const comparisonFeatures = [
  "Multi-Channel (Email + SMS + Voicemail)",
  "Behavioural Trigger Workflows",
  "CRM-Integrated Automations",
  "Done-For-You Copywriting",
  "Visual Workflow Builder",
  "Lead Scoring & Segmentation",
  "Appointment Automation Built In",
  "Re-engagement Campaigns",
  "Revenue Attribution Reporting",
  "Transparent, All-In-One Pricing",
];

const comparisonData = [
  {
    label: "Mailchimp",
    values: ["email only", "basic", false, false, "basic", "basic", false, false, false, true],
    highlight: false,
  },
  {
    label: "ActiveCampaign",
    values: ["email + SMS", true, "limited", false, true, true, "extra cost", true, "basic", false],
    highlight: false,
  },
  {
    label: "Klaviyo",
    values: ["email + SMS", true, "limited", false, true, true, false, true, "basic", false],
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
    q: "What tools and platforms do you use to build marketing automations?",
    a: "We're tool-agnostic — we recommend and build on whichever platform best fits your existing stack, budget, and complexity. Our primary toolkit includes n8n (for powerful, self-hosted workflow automation with deep API integrations), GoHighLevel (for all-in-one CRM, email, SMS, and pipeline automation), Make (formerly Integromat, for visual multi-app workflows), and Zapier (for fast, no-code app connections). For email-specific campaigns we also work with ActiveCampaign and Klaviyo. During the discovery call we assess your current tools and recommend the right combination — you never pay for a platform you don't need.",
  },
  {
    q: "What's the difference between email blasts and email automation?",
    a: "A broadcast (blast) is a one-time message sent to your whole list — like a monthly newsletter or a promo offer. Automation is a pre-built sequence that sends automatically based on what a specific lead does or doesn't do. For example: a lead fills in a form → they receive a welcome email immediately → if they don't open it within 24 hours, an SMS fires → if they click a link, they move to a hot-lead pipeline. That's automation. We build both, but automation is where the compounding value lives.",
  },
  {
    q: "How long does it take to build and launch our automations?",
    a: "Most clients are fully live within 3 weeks. Simpler setups — a welcome sequence, a lead follow-up workflow, and a re-engagement campaign — can be done in under 2 weeks. More complex multi-stage, multi-audience systems with extensive branching logic typically take 3–4 weeks. We set a clear timeline at kick-off and hold to it.",
  },
  {
    q: "Can you migrate our existing contacts and active campaigns?",
    a: "Yes. We handle full list migrations from Mailchimp, ActiveCampaign, Klaviyo, HubSpot, Constant Contact, and any platform that supports CSV export. We clean and segment the data on import, and we replicate or improve your active campaigns inside the new platform before sunsetting the old ones — so no lead goes dark during the transition.",
  },
  {
    q: "Will automated messages feel robotic or impersonal to our leads?",
    a: "Not when they're built correctly. The key is personalisation tokens, natural send timing, and copy that sounds like a real person wrote it — because our human copywriters do write it. We also build smart branching so the sequence adapts based on what the lead does. A lead who clicks your pricing link gets a different follow-up than one who opened but didn't engage. The result feels like attentive personal outreach — just running at scale.",
  },
  {
    q: "What are behavioural trigger automations and why do they matter?",
    a: "Behavioural triggers fire automations based on what a specific contact does — visiting a particular page, clicking a certain link, not opening an email after 3 days, booking an appointment, or hitting a specific lead score threshold. They matter because they let you respond to intent signals in real time. A prospect who visits your pricing page three times in a week is a hot lead — a trigger can notify your sales team and send that contact a tailored sequence immediately, before they go to a competitor.",
  },
  {
    q: "Do you write all the email and SMS copy, or do we need to provide it?",
    a: "We write all copy for you. Our strategists brief the sequences based on your service, audience, and goals — then our copywriters produce every email and SMS message. You review and approve before anything goes live. You can provide brand notes, tone guidelines, or specific points to include, but there's no requirement for you to write anything.",
  },
  {
    q: "What ongoing management do you offer after the initial build?",
    a: "Our ongoing automation retainer covers monthly performance reviews, sequence optimisation based on open and conversion data, new campaign builds for seasonal offers or product launches, list health maintenance, and A/B test implementation. Most clients see meaningful improvement in conversion rates within the first 60–90 days of ongoing optimisation.",
  },
];

const N8nIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="#EA4B71">
    <path d="M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632" />
  </svg>
);

const MakeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="#6D00CC">
    <path d="M13.38 3.498c-.27 0-.511.19-.566.465L9.85 18.986a.578.578 0 0 0 .453.678l4.095.826a.58.58 0 0 0 .682-.455l2.963-15.021a.578.578 0 0 0-.453-.678l-4.096-.826a.589.589 0 0 0-.113-.012zm-5.876.098a.576.576 0 0 0-.516.318L.062 17.697a.575.575 0 0 0 .256.774l3.733 1.877a.578.578 0 0 0 .775-.258l6.926-13.781a.577.577 0 0 0-.256-.776L7.762 3.658a.571.571 0 0 0-.258-.062zm11.74.115a.576.576 0 0 0-.576.576v15.426c0 .318.258.578.576.578h4.178a.58.58 0 0 0 .578-.578V4.287a.578.578 0 0 0-.578-.576Z" />
  </svg>
);

const ZapierIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="#FF4A00">
    <path d="M4.157 0A4.151 4.151 0 0 0 0 4.161v15.678A4.151 4.151 0 0 0 4.157 24h15.682A4.152 4.152 0 0 0 24 19.839V4.161A4.152 4.152 0 0 0 19.839 0H4.157Zm10.61 8.761h.03a.577.577 0 0 1 .23.038.585.585 0 0 1 .201.124.63.63 0 0 1 .162.431.612.612 0 0 1-.162.435.58.58 0 0 1-.201.128.58.58 0 0 1-.23.042.529.529 0 0 1-.235-.042.585.585 0 0 1-.332-.328.559.559 0 0 1-.038-.235.613.613 0 0 1 .17-.431.59.59 0 0 1 .405-.162Zm2.853 1.572c.03.004.061.004.095.004.325-.011.646.064.937.219.238.144.431.355.552.609.128.279.189.582.185.888v.193a2 2 0 0 1 0 .219h-2.498c.003.227.075.45.204.642a.78.78 0 0 0 .646.265.714.714 0 0 0 .484-.136.642.642 0 0 0 .23-.318l.915.257a1.398 1.398 0 0 1-.28.537c-.14.159-.321.284-.521.355a2.234 2.234 0 0 1-.836.136a1.923 1.923 0 0 1-1.001-.245 1.618 1.618 0 0 1-.665-.703 2.221 2.221 0 0 1-.227-1.036 1.95 1.95 0 0 1 .48-1.398 1.9 1.9 0 0 1 1.3-.488Zm-9.607.023c.162.004.325.026.48.079.207.065.4.174.563.314.26.302.393.692.366 1.088v2.276H8.53l-.109-.711h-.065c-.064.163-.155.31-.272.439a1.122 1.122 0 0 1-.374.264 1.023 1.023 0 0 1-.453.083 1.334 1.334 0 0 1-.866-.264.965.965 0 0 1-.329-.801.993.993 0 0 1 .076-.431 1.02 1.02 0 0 1 .242-.363 1.478 1.478 0 0 1 1.043-.303h.952v-.181a.696.696 0 0 0-.136-.454.553.553 0 0 0-.438-.154.695.695 0 0 0-.378.086.48.48 0 0 0-.193.254l-.99-.144a1.26 1.26 0 0 1 .257-.563c.14-.174.321-.302.533-.378.261-.091.54-.136.82-.129.053-.003.106-.007.163-.007Zm4.384.007c.174 0 .347.038.506.114.182.083.34.211.458.374.257.423.377.911.351 1.406a2.53 2.53 0 0 1-.355 1.448 1.148 1.148 0 0 1-1.009.517c-.204 0-.401-.045-.582-.136a1.052 1.052 0 0 1-.48-.457 1.298 1.298 0 0 1-.114-.234h-.045l.004 1.784h-1.059v-4.713h.904l.117.805h.057c.068-.208.177-.401.328-.56a1.129 1.129 0 0 1 .843-.344h.076v-.004Zm7.559.084h.903l.113.805h.053a1.37 1.37 0 0 1 .235-.484.813.813 0 0 1 .313-.242.82.82 0 0 1 .39-.076h.234v1.051h-.401a.662.662 0 0 0-.313.008.623.623 0 0 0-.272.155.663.663 0 0 0-.174.26.683.683 0 0 0-.027.314v1.875h-1.054v-3.666Zm-17.515.003h3.262v.896L3.73 13.104l.034.113h1.973l.042.9H2.4v-.9l1.931-1.754-.045-.117H2.441v-.896Zm11.815 0h1.055v3.659h-1.055V10.45Zm3.443.684.019.016a.69.69 0 0 0-.351.045.756.756 0 0 0-.287.204c-.11.155-.174.336-.189.522h1.545c-.034-.526-.257-.787-.74-.787h.003Zm-5.718.163c-.026 0-.057 0-.083.004a.78.78 0 0 0-.31.053.746.746 0 0 0-.257.189 1.016 1.016 0 0 0-.204.695v.064c-.015.257.057.507.204.711a.634.634 0 0 0 .253.196.638.638 0 0 0 .314.061.644.644 0 0 0 .578-.265c.14-.223.204-.48.189-.74a1.216 1.216 0 0 0-.181-.711.677.677 0 0 0-.503-.257Zm-4.509 1.266a.464.464 0 0 0-.268.102.373.373 0 0 0-.114.276c0 .053.008.106.027.155a.375.375 0 0 0 .087.132.576.576 0 0 0 .397.11v.004a.863.863 0 0 0 .563-.182.573.573 0 0 0 .211-.457v-.14h-.903Z" />
  </svg>
);

const toolItems = [
  {
    id: "n8n",
    name: "n8n",
    tagline: "Workflow Automation",
    iconBg: "#FFF0F4",
    icon: <N8nIcon />,
  },
  {
    id: "gohighlevel",
    name: "GoHighLevel",
    tagline: "CRM + Email + SMS",
    iconBg: "#F0FDF4",
    icon: (
      <Image
        src="/tools/gohighlevel.webp"
        alt="GoHighLevel"
        width={24}
        height={24}
        className="w-6 h-6 object-contain"
      />
    ),
  },
  {
    id: "make",
    name: "Make",
    tagline: "Visual Workflows",
    iconBg: "#F5F3FF",
    icon: <MakeIcon />,
  },
  {
    id: "zapier",
    name: "Zapier",
    tagline: "App Integrations",
    iconBg: "#FFF7ED",
    icon: <ZapierIcon />,
  },
  {
    id: "activecampaign",
    name: "ActiveCampaign",
    tagline: "Email + CRM",
    iconBg: "#EFF6FF",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#004CFF] flex items-center justify-center text-white font-black text-[9px] shrink-0">
        AC
      </span>
    ),
  },
  {
    id: "klaviyo",
    name: "Klaviyo",
    tagline: "eCommerce Email",
    iconBg: "#F8F8F8",
    icon: (
      <span className="w-6 h-6 rounded-md bg-[#1A1A1A] flex items-center justify-center text-white font-black text-[11px] shrink-0">
        K
      </span>
    ),
  },
];

export default function MarketingAutomationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6 bg-gradient-to-br from-white via-violet-50/40 to-purple-50">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-[-8%] top-[-8%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-violet-500/20 to-purple-400/10 blur-3xl" />
          <div className="absolute right-[-6%] bottom-[-6%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-purple-400/15 to-violet-500/10 blur-3xl" />
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
            <span className="text-violet-600 font-medium">Marketing Automation</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-violet-50 border border-violet-200">
              <Zap className="w-4 h-4 text-violet-600" />
              <span className="text-xs font-bold text-violet-700 tracking-widest uppercase">
                Marketing Automation
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 text-balance leading-tight">
              Nurture Every Lead 24/7 With{" "}
              <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                Smart Multi-Channel Automation
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Manual email blasts and forgotten follow-ups are costing you deals every single week. Kazi Agency designs, writes, and builds your complete marketing automation system — using n8n, GoHighLevel, Make, Zapier, and the best-fit tools for your stack — so every lead is nurtured and every deal is tracked, around the clock.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
              >
                Get a Free Automation Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="border-2 border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center cursor-pointer"
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
                  <Icon className="w-5 h-5 text-violet-600 mx-auto mb-2" />
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
              Is Your Marketing Running on Manual?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              These six problems appear in almost every business we audit — and every one of them is quietly draining your conversion rate.
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
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-7 py-3.5 rounded-xl font-bold transition-all"
            >
              Fix My Automation — Free Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-24 px-6 bg-[#f5f3ff]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200">
              <span className="text-xs font-bold text-violet-700 tracking-widest uppercase">
                What&apos;s Included
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              Eight Automation Systems That Work While You Sleep
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Every Kazi Agency marketing automation engagement includes these eight core deliverables — fully built, copy-written, and tested.
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
                  className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-violet-200 hover:shadow-md transition-all"
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
        {/* Heading */}
        <div className="max-w-5xl mx-auto px-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200">
              <span className="text-xs font-bold text-violet-700 tracking-widest uppercase">
                Our Automation Stack
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
              We Use the Best Tool for Your Job — Not Just One
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base">
              Unlike agencies locked into a single platform, we select and combine the right tools based on your existing stack, complexity, and budget.
            </p>
          </motion.div>
        </div>

        {/* Marquee track */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

          {/* Scrolling strip — items duplicated for seamless loop */}
          <div className="flex gap-4 animate-scroll-left w-max px-6">
            {[...toolItems, ...toolItems].map((tool, i) => (
              <div
                key={`${tool.id}-${i}`}
                className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3.5 shadow-sm hover:shadow-md hover:border-violet-200 transition-all shrink-0 cursor-default"
              >
                {/* Icon container */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: tool.iconBg }}
                >
                  {tool.icon}
                </div>
                {/* Text */}
                <div>
                  <p className="font-bold text-slate-900 text-sm leading-none mb-1">{tool.name}</p>
                  <p className="text-xs text-slate-400 leading-none">{tool.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-slate-400 mt-8 px-6">
          Also integrates with HubSpot, Mailchimp, Pipedrive, Stripe, Calendly, Typeform, Airtable, and 500+ other platforms via API and webhook.
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200">
              <span className="text-xs font-bold text-violet-700 tracking-widest uppercase">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              From Scattered Emails to a Full Automation Engine in 3 Weeks
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A clear five-step process — strategy first, build second, launch with confidence.
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
      <section className="py-24 px-6 bg-[#f5f3ff]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200">
              <span className="text-xs font-bold text-violet-700 tracking-widest uppercase">
                Why Kazi Agency
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              How We Compare to Standalone Automation Tools
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Mailchimp, ActiveCampaign, and Klaviyo are tools — we deliver a complete, done-for-you automation system.
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
                        col.highlight ? "text-violet-700 bg-violet-50/60" : "text-slate-500"
                      }`}
                    >
                      {col.label}
                      {col.highlight && (
                        <span className="block mt-1 text-[10px] bg-violet-600 text-white px-2 py-0.5 rounded-full font-bold mx-auto w-fit">
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
                          className={`p-5 text-center ${col.highlight ? "bg-violet-50/30" : ""}`}
                        >
                          {val === true ? (
                            <Check className="w-5 h-5 text-violet-600 mx-auto" />
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
            className="mt-10 bg-white rounded-2xl border border-violet-200 p-8"
          >
            <div className="grid md:grid-cols-3 gap-6 text-center">
              {[
                {
                  title: "Mailchimp",
                  cost: "$20–$350/mo",
                  note: "Email only. Limited automation on lower tiers. No SMS, no CRM, no appointment scheduling. You still have to build everything yourself.",
                },
                {
                  title: "ActiveCampaign",
                  cost: "$49–$299/mo",
                  note: "Powerful tool, but complex setup. Requires significant internal time to build and maintain. No done-for-you service included.",
                },
                {
                  title: "Kazi Agency (n8n · GHL · Make · Zapier)",
                  cost: "One-time build + platform costs",
                  note: "We pick the right tool for your stack — n8n, GoHighLevel, Make, or Zapier. Fully built, copy-written, tested, and managed for you from day one.",
                  highlight: true,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`rounded-xl p-5 ${item.highlight ? "bg-violet-50 border border-violet-200" : "bg-slate-50"}`}
                >
                  <p className={`font-bold mb-1 ${item.highlight ? "text-violet-700" : "text-slate-700"}`}>
                    {item.title}
                  </p>
                  <p className={`text-xl font-black mb-2 ${item.highlight ? "text-violet-600" : "text-slate-900"}`}>
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
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200">
                <span className="text-xs font-bold text-violet-700 tracking-widest uppercase">
                  Why Choose Us
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6 text-balance">
                We Build the System, Write the Copy, and Run the Automation — You Just Close the Deals
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Most automation agencies hand you a platform login and a tutorial video. We do the opposite — we choose the right tools for your stack (n8n, GoHighLevel, Make, Zapier, or a combination), design the full strategy, write every message, build every workflow, and test every trigger before handing over a system that works from the moment it goes live.
              </p>

              <div className="flex flex-col gap-4">
                {[
                  "Tool-agnostic — we use n8n, GoHighLevel, Make, or Zapier based on what fits your stack",
                  "Full copywriting included — we write every email and SMS for you",
                  "Multi-channel by default — email, SMS, and voicemail in one coordinated system",
                  "Behavioural triggers that respond to lead intent signals automatically",
                  "Integrated with your CRM, website, and ad platforms from day one",
                  "Monthly optimisation — we improve conversion rates each quarter using real data",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="/book-a-consultation"
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-7 py-3.5 rounded-xl font-bold transition-all"
                >
                  Book a Free Automation Strategy Call
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
                  title: "Instant Speed-to-Lead",
                  description:
                    "Every new lead receives a personalised response within 60 seconds — before competitors even open their inbox notification.",
                },
                {
                  icon: GitBranch,
                  title: "Intelligent Branching",
                  description:
                    "Workflows adapt based on what leads do. Openers get one path, non-openers another — every contact gets a relevant experience.",
                },
                {
                  icon: Shield,
                  title: "Zero Leads Left Behind",
                  description:
                    "Re-engagement sequences catch cold leads automatically. No enquiry goes unanswered and no prospect goes silent without a trigger firing.",
                },
                {
                  icon: TrendingUp,
                  title: "Compounding Results Over Time",
                  description:
                    "Unlike paid ads that stop when the budget does, automation compounds. Every new lead benefits from months of optimised sequences the moment they enter your pipeline.",
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
                    className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-violet-200 hover:shadow-md transition-all"
                  >
                    <div className="bg-violet-50 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-violet-600" />
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
      <section className="py-24 px-6 bg-[#f5f3ff]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200">
              <span className="text-xs font-bold text-violet-700 tracking-widest uppercase">
                FAQ
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              Common Questions About Marketing Automation
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to know before booking your strategy call.
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
                    className={`w-5 h-5 text-violet-600 shrink-0 transition-transform duration-200 ${
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
      <section className="py-24 px-6 bg-gradient-to-br from-violet-600 to-purple-700 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-10%] top-[-20%] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute right-[-8%] bottom-[-15%] w-[400px] h-[400px] rounded-full bg-purple-300/10 blur-3xl" />
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
                Ready to Automate Your Growth?
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-balance">
              Let&apos;s Build an Automation Engine That Nurtures Leads 24/7
            </h2>
            <p className="text-xl text-violet-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute automation audit. We&apos;ll review your current tools and workflows, identify every gap that&apos;s costing you conversions, and show you exactly what your new system will look like.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-white text-violet-700 hover:bg-violet-50 px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center shadow-lg"
              >
                Book My Free Automation Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
              >
                Explore All Services
              </Link>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-violet-100 text-sm">
              {["No commitment required", "Free 30-minute strategy call", "Full automation blueprint included"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-200" />
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

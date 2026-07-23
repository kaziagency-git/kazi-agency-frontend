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
  Bell,
  CalendarCheck,
  RefreshCw,
  Bot,
  MessageSquare,
  GitMerge,
  DollarSign,
  PhoneCall,
} from "lucide-react";

const keyMetrics = [
  { value: "+217%", label: "More Bookings", sub: "from 68 to 215 confirmed appointments per month" },
  { value: "4.2 min", label: "Avg Lead Response Time", sub: "down from 6+ hours — within business hours" },
  { value: "−58%", label: "No-Show Rate Reduction", sub: "from 38% down to 16% of booked appointments" },
  { value: "$180K", label: "Annual Revenue Recovered", sub: "from no-shows, lapsed clients, and lost leads" },
];

const challenges = [
  {
    icon: Clock,
    title: "6+ Hour Lead Response Time — Losing Clients to Competitors",
    desc: "When a prospect enquired about a programme or appointment, the front desk team responded manually — often 6 to 14 hours later. In the wellness industry, buying intent is high and fleeting. By the time the team replied, the prospect had either booked elsewhere, lost momentum, or simply gone cold. Apex was haemorrhaging warm leads daily.",
  },
  {
    icon: AlertTriangle,
    title: "38% No-Show Rate — $4,800 in Empty Appointment Slots Every Week",
    desc: "Nearly two in five booked appointments were not showing up. No automated reminders, no confirmation sequences, no pre-appointment engagement. Each empty slot represented a lost service fee and a wasted practitioner hour. At an average booking value of $120, 38% no-shows were costing Apex over $4,800 per week in direct lost revenue.",
  },
  {
    icon: MessageSquare,
    title: "Zero Nurture Infrastructure — Unconverted Leads Permanently Lost",
    desc: "Enquiries that didn't book immediately were entered into a spreadsheet and forgotten. There was no automated follow-up, no drip sequence, no re-engagement campaign. A 30-day audit revealed that Apex had accumulated 840 unconverted enquiries in 12 months — each one a potential client who had shown intent and received nothing in return.",
  },
  {
    icon: PhoneCall,
    title: "Staff Spending 3+ Hours Daily on Manual Admin",
    desc: "The front desk team was manually sending booking confirmations, appointment reminders, intake forms, and post-visit follow-ups via phone and email. Three hours of low-value admin per day per team member was consuming time that should have been spent on client experience, upselling, and retention — the activities that actually grow a wellness business.",
  },
];

const strategySteps = [
  {
    number: "01",
    icon: Bot,
    title: "Instant Lead Response Automation",
    desc: "We eliminated the 6-hour response gap entirely by building an AI-powered first-response system that engaged every enquiry within 4 minutes — personalised, context-aware, and conversion-focused.",
    tactics: [
      "Integrated a multi-channel lead capture hub: website contact form, Facebook/Instagram lead ads, Google Business Profile, and phone enquiries all routed into a single CRM (GoHighLevel)",
      "Built a triggered response sequence: within 4 minutes of any enquiry, the lead receives a personalised SMS + email with their specific programme interest, a booking link, and a brief video intro from the team",
      "Set up a conversational SMS bot for after-hours enquiries — answered FAQs, captured intent, and pre-qualified leads before the team started the next morning",
      "Created 6 enquiry-type sequences: initial consultation, programme enquiry, pricing question, returning client, referral, and corporate wellness — each with tailored messaging",
      "A/B tested subject lines and SMS openers — winning variants achieved 71% open rate and 34% click-to-book rate on first response",
    ],
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Frictionless Booking Flow & CRM Integration",
    desc: "We removed every point of friction from the booking process — from enquiry to confirmed appointment — reducing the steps a prospect needed to take from 7 down to 2.",
    tactics: [
      "Embedded a Calendly-integrated booking widget on all high-traffic pages — leads could book directly from any touchpoint without contacting the front desk",
      "Connected the booking system to GoHighLevel CRM — every new booking auto-created a client record, assigned a practitioner, and triggered the onboarding sequence",
      "Built a pre-appointment intake form sent automatically 48 hours before the visit — reducing session admin and improving client experience on the day",
      "Set up instant booking confirmation: SMS + email with appointment details, location directions, what to bring, and a calendar invite with one-click add",
      "Created a 'warm handoff' workflow — when a lead clicked the booking link but didn't complete, an automated SMS fired 30 minutes later with a personalised nudge",
    ],
  },
  {
    number: "03",
    icon: Bell,
    title: "No-Show Prevention Sequence",
    desc: "We cut the no-show rate from 38% to 16% by wrapping every booked appointment in a multi-touch confirmation and pre-visit engagement sequence that made ghosting a conscious decision rather than a passive drift.",
    tactics: [
      "Built a 5-touch no-show prevention sequence: confirmation (immediate), reminder (72 hrs before), excitement message (24 hrs before), final reminder (2 hrs before), and a same-day 'we're ready for you' SMS",
      "Introduced an opt-out confirmation step: 24 hours before the appointment, clients must confirm attendance or reschedule — automated reschedule link included to capture rather than lose the slot",
      "Set up a cancellation recovery workflow: when a client cancelled, an automated sequence offered 3 alternative appointment slots within the next 72 hours — recovering 31% of cancellations",
      "Created a 'no-show follow-up' trigger: if a client didn't attend, they received a same-day compassionate re-engagement message and a rescheduling link — not silence",
      "Built a waitlist system: as cancellations were received, the system automatically offered the slot to the next person on the waitlist — filling 67% of cancelled appointments",
    ],
  },
  {
    number: "04",
    icon: GitMerge,
    title: "Lead Nurture & Re-engagement Workflows",
    desc: "We built a system to convert the 840 dormant leads in Apex's database — and ensure no future enquiry was ever wasted again.",
    tactics: [
      "Segmented the 840 dormant leads by enquiry type, date, and last interaction — and launched 4 targeted re-engagement sequences over 6 weeks",
      "Built a 'programme interest' nurture track: 8 emails over 21 days delivering testimonials, before-and-after stories, educational content, and soft CTAs — converting 94 lapsed leads into bookings",
      "Set up a 90-day re-engagement trigger for leads who hadn't responded: a new-angle message with a seasonal offer and a fresh booking link",
      "Created a referral automation: every satisfied client at the 30-day post-visit mark received a personalised referral request with a unique discount code for their referred friend",
      "Built a 'lost lead resurrection' campaign — quarterly re-engagement of all non-converted enquiries with updated social proof, new offers, and a 'what changed' message",
    ],
  },
  {
    number: "05",
    icon: RefreshCw,
    title: "Post-Visit Revenue Recovery & Retention Automation",
    desc: "Acquiring a new client costs 5× more than retaining an existing one. We built an automated post-visit system that turned one-time bookings into recurring revenue.",
    tactics: [
      "Built a post-visit sequence: thank-you message (same day), feedback request (day 3), outcome check-in (day 7), re-booking CTA with personalised programme recommendation (day 14)",
      "Set up a lapsed client re-engagement trigger: any client who hadn't re-booked within 45 days received an automated 'we miss you' sequence with a returning-client offer",
      "Created a membership upsell automation — clients who had visited 3+ times were automatically introduced to Apex's monthly wellness membership, converting 22% into recurring subscribers",
      "Built a birthday and milestone automation: personalised messages on client birthdays and programme anniversaries with a gift voucher or exclusive offer",
      "Designed a 'treatment series' completion workflow: when a client completed a multi-session package, an automated recommendation for the next logical programme was triggered based on their history",
    ],
  },
];

const timelineMonths = [
  {
    month: "Month 1",
    title: "Audit, Stack & Foundation",
    items: [
      "Full operational audit completed — mapped every client touchpoint and identified 14 automation opportunities",
      "GoHighLevel CRM implemented and integrated with booking system, website, and ad accounts",
      "840 dormant leads imported, segmented, and prepped for re-engagement sequences",
      "Instant lead response system built and tested — response time dropped from 6+ hrs to 4.2 min",
      "Booking widget embedded on website — first 31 direct bookings in week 1",
    ],
    metric: null,
  },
  {
    month: "Month 2",
    title: "Response & Booking Automations Live",
    items: [
      "All 6 enquiry-type response sequences live across SMS and email",
      "Pre-appointment intake forms deployed — 91% completion rate in first month",
      "Booking confirmation and calendar invite sequence automated — zero manual confirmations sent",
      "First re-engagement sequence launched to 280 segmented dormant leads",
      "Month 2 bookings: 112 confirmed appointments (vs. 68 baseline) — +65% in first full month",
    ],
    metric: { label: "Monthly bookings", value: "112" },
  },
  {
    month: "Month 3",
    title: "No-Show System & Re-engagement",
    items: [
      "Full 5-touch no-show prevention sequence deployed — no-show rate dropped from 38% to 24% in 30 days",
      "Cancellation recovery workflow live — 31% of cancellations rescheduled automatically",
      "Waitlist system operational — 67% of cancelled slots filled same-day",
      "Second dormant lead re-engagement batch: 94 bookings from lapsed leads in 6-week sequence",
      "Post-visit re-booking automation deployed — 19% of one-time visitors re-booked within 14 days",
    ],
    metric: { label: "No-show rate", value: "24%" },
  },
  {
    month: "Month 4",
    title: "Nurture Scale & Retention Engine",
    items: [
      "Membership upsell automation live — 22% of eligible repeat clients converted to monthly memberships",
      "Referral automation deployed: 38 new client referrals generated in 30 days",
      "Birthday and milestone sequences active for all 1,200+ client records",
      "Lapsed client re-engagement running: 41 previously churned clients re-booked",
      "Monthly bookings hit 178 — +162% above pre-engagement baseline",
    ],
    metric: { label: "Monthly bookings", value: "178" },
  },
  {
    month: "Month 5",
    title: "Full System — Scale & Attribution",
    items: [
      "All 5 automation pillars fully operational and compounding",
      "No-show rate stabilised at 16% — 22 percentage points below original 38%",
      "Monthly bookings: 215 confirmed appointments — +217% vs. 68 baseline",
      "Annual revenue recovered from no-shows, lapsed clients, and dormant leads: $180K",
      "Staff admin time reduced from 3+ hours/day to under 20 minutes — team refocused on client experience",
    ],
    metric: { label: "Revenue recovered", value: "$180K" },
  },
];

const beforeAfter = [
  { label: "Monthly Confirmed Bookings", before: "68", after: "215", change: "+217%" },
  { label: "Average Lead Response Time", before: "6+ hours", after: "4.2 minutes", change: "−98%" },
  { label: "No-Show Rate", before: "38%", after: "16%", change: "−58%" },
  { label: "Cancelled Slot Recovery Rate", before: "0%", after: "67%", change: "New system" },
  { label: "Dormant Lead Re-conversions", before: "0/year", after: "94 in 6 weeks", change: "New channel" },
  { label: "Post-Visit Re-booking Rate (14 days)", before: "4%", after: "19%", change: "+375%" },
  { label: "Membership Conversion (repeat clients)", before: "3%", after: "22%", change: "+633%" },
  { label: "Daily Staff Admin Time", before: "3+ hrs/day", after: "< 20 min/day", change: "−89%" },
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
    slug: "fresh-roots-social-media-launch",
    client: "Fresh Roots Kitchen",
    industry: "Food & Wellness",
    headline: "0 to 24.8K Followers & $91K Revenue from Social",
    service: "Social Media",
    icon: Share2,
    timeframe: "6 months",
  },
];

export default function ApexWellnessCaseStudy() {
  return (
    <main className="bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-20 px-6 bg-gradient-to-br from-white via-violet-50/40 to-purple-50/20">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-[-8%] top-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute right-[-6%] bottom-[-8%] w-[400px] h-[400px] rounded-full bg-purple-400/10 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-sm text-slate-500 mb-8"
          >
            <Link href="/case-studies" className="hover:text-violet-600 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Case Studies
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-700 font-medium">Apex Wellness Group</span>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-xs font-bold">
              <Zap className="w-3.5 h-3.5" />
              Marketing Automation Case Study
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
              <Users className="w-3.5 h-3.5" />
              Health &amp; Wellness · Denver, CO
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-xs font-bold">
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
            Marketing Automation That{" "}
            <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
              Doubled Conversions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl"
          >
            How we automated Apex Wellness Group&apos;s entire client journey — cutting lead response time
            from 6+ hours to 4.2 minutes, eliminating 58% of no-shows, and recovering{" "}
            <strong className="text-slate-800">$180K in annual revenue</strong> that was previously
            walking out the door.
          </motion.p>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-12 pb-12 border-b border-slate-200"
          >
            {[
              { icon: Users, label: "Client", value: "Apex Wellness Group" },
              { icon: Zap, label: "Industry", value: "Health & Wellness" },
              { icon: Bot, label: "Service", value: "Marketing Automation" },
              { icon: Clock, label: "Timeline", value: "5 Months" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-violet-600" />
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
                className="bg-violet-50 border border-violet-200 rounded-2xl p-5"
              >
                <p className="text-3xl md:text-4xl font-black text-violet-600 mb-1">{m.value}</p>
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200">
              <AlertTriangle className="w-3.5 h-3.5 text-violet-600" />
              <span className="text-xs font-bold text-violet-600 tracking-widest uppercase">The Problem</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              Great Practitioners. Leaking Revenue at Every Step.
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Apex Wellness Group had built a genuinely respected multi-practitioner wellness centre in
              Denver — strong word-of-mouth, loyal returning clients, and a waiting list during peak
              months. But beneath the surface, a series of invisible operational failures were draining
              five figures of revenue every single month. The problem wasn&apos;t the product. It was
              everything that happened before and after the appointment.
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
                  <div className="bg-violet-50 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-violet-600" />
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
                { label: "Monthly Confirmed Bookings", value: "68" },
                { label: "Avg Lead Response Time", value: "6+ hours" },
                { label: "No-Show Rate", value: "38%" },
                { label: "Dormant Leads in Database", value: "840" },
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200">
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              <span className="text-xs font-bold text-violet-600 tracking-widest uppercase">Our Strategy</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              A 5-Pillar Automation System for the Full Client Lifecycle
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              We didn&apos;t just add a chatbot. We mapped every moment in the client journey where revenue
              was being lost — enquiry, booking, pre-visit, post-visit, and re-engagement — and built an
              automation layer that made every step faster, smarter, and compounding.
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
                        <div className="bg-violet-50 w-11 h-11 rounded-xl flex items-center justify-center">
                          <Icon className="w-5 h-5 text-violet-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-slate-600 mb-5 leading-relaxed">{step.desc}</p>
                        <ul className="space-y-2.5">
                          {step.tactics.map((tactic) => (
                            <li key={tactic} className="flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
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

      {/* ── Revenue Leak Visual ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200">
              <DollarSign className="w-3.5 h-3.5 text-violet-600" />
              <span className="text-xs font-bold text-violet-600 tracking-widest uppercase">Revenue Recovery Breakdown</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              Where the $180K Annual Recovery Came From
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl">
              Revenue wasn&apos;t recovered from a single source. Each automation layer plugged a different
              leak — here&apos;s the breakdown of how the $180K was attributed across the system.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Bell,
                source: "No-Show Recovery",
                value: "$74K",
                pct: 41,
                detail: "Empty slots filled via reminders, waitlist, and cancellation recovery",
                color: "bg-violet-50 border-violet-200",
                barColor: "bg-violet-500",
                textColor: "text-violet-700",
              },
              {
                icon: GitMerge,
                source: "Dormant Lead Re-engagement",
                value: "$47K",
                pct: 26,
                detail: "94 dormant leads re-converted via segmented nurture sequences",
                color: "bg-purple-50 border-purple-200",
                barColor: "bg-purple-500",
                textColor: "text-purple-700",
              },
              {
                icon: RefreshCw,
                source: "Lapsed Client Retention",
                value: "$38K",
                pct: 21,
                detail: "41 churned clients re-booked via automated re-engagement",
                color: "bg-fuchsia-50 border-fuchsia-200",
                barColor: "bg-fuchsia-500",
                textColor: "text-fuchsia-700",
              },
              {
                icon: TrendingUp,
                source: "Membership Upsells",
                value: "$21K",
                pct: 12,
                detail: "22% of repeat clients converted to monthly recurring memberships",
                color: "bg-indigo-50 border-indigo-200",
                barColor: "bg-indigo-500",
                textColor: "text-indigo-700",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.source}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`${item.color} border rounded-2xl p-5`}
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4">
                    <Icon className={`w-5 h-5 ${item.textColor}`} />
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{item.source}</p>
                  <p className={`text-2xl font-black ${item.textColor} mb-1`}>{item.value}</p>
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
                  <p className={`text-xs font-bold ${item.textColor} mt-1.5`}>{item.pct}% of total</p>
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200">
              <Clock className="w-3.5 h-3.5 text-violet-600" />
              <span className="text-xs font-bold text-violet-600 tracking-widest uppercase">Month by Month</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              68 to 215 Bookings — How the System Was Built Over 5 Months
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
              Marketing automation compounds — each layer builds on the last. Here&apos;s exactly what
              was implemented each month, when the inflection points hit, and how $180K in revenue was
              progressively recovered.
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
                  <div className="absolute left-3.5 md:left-5 top-3 w-5 h-5 rounded-full bg-violet-500 border-4 border-white shadow-sm" />

                  <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{month.month}</span>
                        <h3 className="text-lg font-bold text-slate-900 mt-0.5">{month.title}</h3>
                      </div>
                      {month.metric && (
                        <div className="bg-violet-50 border border-violet-200 rounded-xl px-4 py-2 text-center shrink-0">
                          <p className="text-xl font-black text-violet-600">{month.metric.value}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{month.metric.label}</p>
                        </div>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {month.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0 mt-2" />
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200">
              <BarChart3 className="w-3.5 h-3.5 text-violet-600" />
              <span className="text-xs font-bold text-violet-600 tracking-widest uppercase">Before vs. After</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
              The Numbers Don&apos;t Lie
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl">
              Every metric is pulled from GoHighLevel CRM, booking system analytics, and Apex&apos;s
              own revenue reporting — cross-referenced against pre-engagement baselines for accuracy.
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
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-violet-400 text-center whitespace-nowrap">Change</th>
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
                    <td className="px-6 py-4 font-black text-violet-600 text-center whitespace-nowrap">{row.change}</td>
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
              { icon: CalendarCheck, label: "Monthly Bookings (Month 5)", value: "215", color: "bg-violet-50 border-violet-200 text-violet-600" },
              { icon: Bell, label: "No-Show Rate (down from 38%)", value: "16%", color: "bg-purple-50 border-purple-200 text-purple-600" },
              { icon: DollarSign, label: "Annual Revenue Recovered", value: "$180K", color: "bg-fuchsia-50 border-fuchsia-200 text-fuchsia-600" },
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
            className="relative bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white overflow-hidden"
          >
            <div aria-hidden className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/10 blur-2xl" />
            </div>

            <Quote className="w-10 h-10 text-white/25 mb-6" />

            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 relative z-10">
              &ldquo;We were genuinely good at what we do — our practitioners are excellent and our clients
              love us. But we were operating like it was 2010: manual confirmations, spreadsheets for leads,
              phone calls to remind people of appointments. Kazi Agency came in, mapped where every dollar
              was leaking, and built systems to stop each one. Our no-shows dropped by more than half, we
              converted nearly 100 dormant leads we&apos;d written off, and our team got three hours of
              their day back. The $180K in recovered revenue speaks for itself — but honestly, the biggest
              win is that our team can now focus on clients instead of admin.&rdquo;
            </blockquote>

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-black text-lg">
                R
              </div>
              <div>
                <p className="font-bold text-white">Rachel T.</p>
                <p className="text-violet-100 text-sm">Founder &amp; Clinical Director, Apex Wellness Group · Denver, CO</p>
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
      <section className="py-20 px-6 bg-violet-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-3">
              What Made This Automation Work
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Three principles behind Apex&apos;s transformation — applicable to any service business
              where bookings, appointments, or consultations are the core revenue model.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Clock,
                title: "Speed Is Revenue",
                desc: "Cutting lead response time from 6 hours to 4.2 minutes wasn't a customer experience improvement — it was a revenue decision. In the health and wellness industry, a prospect who enquires and gets silence for 6 hours has already booked elsewhere. Automated instant response is one of the highest-ROI changes a service business can make, and it costs nothing to operate at scale.",
              },
              {
                icon: Bell,
                title: "No-Shows Are a System Problem, Not a People Problem",
                desc: "Apex's 38% no-show rate wasn't because clients were unreliable — it was because there was no system reminding them, engaging them, or making it easy to reschedule rather than ghost. The 5-touch pre-appointment sequence didn't nag clients; it built anticipation and commitment. No-shows don't stop when you blame clients. They stop when you build infrastructure.",
              },
              {
                icon: RefreshCw,
                title: "Your Biggest Untapped Revenue Source Is Already in Your Database",
                desc: "Apex had 840 dormant leads sitting untouched in a spreadsheet — each one a person who had shown real intent and been given silence in return. Automating the re-engagement of that database alone generated $47K. Most businesses are focused on generating new leads while a year's worth of nearly-customers sits ignored. Fix the leaks before you turn up the tap.",
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
                  className="bg-white rounded-2xl border border-violet-100 p-6"
                >
                  <div className="bg-violet-50 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-violet-600" />
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
              className="text-sm font-bold text-violet-600 hover:underline flex items-center gap-1 shrink-0"
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
                    className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200 p-6 hover:border-violet-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-violet-50 p-3 rounded-xl">
                        <Icon className="w-5 h-5 text-violet-600" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-violet-100 text-violet-700">
                        {cs.service}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1">{cs.industry}</p>
                    <p className="text-sm font-bold text-slate-700 mb-2">{cs.client}</p>
                    <h3 className="text-base font-bold text-slate-900 mb-4 group-hover:text-violet-600 transition-colors leading-snug flex-1">
                      {cs.headline}
                    </h3>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {cs.timeframe}
                      </div>
                      <div className="flex items-center gap-1 text-violet-600 text-sm font-semibold">
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
      <section className="py-24 px-6 bg-gradient-to-br from-violet-600 to-purple-700 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-10%] top-[-20%] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute right-[-8%] bottom-[-15%] w-[400px] h-[400px] rounded-full bg-white/5 blur-3xl" />
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
                Your Business Could Be Next
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-balance">
              Ready to Stop Losing Revenue to Slow Responses, No-Shows, and Lapsed Leads?
            </h2>
            <p className="text-xl text-violet-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute automation audit call. We&apos;ll map every point in your client
              journey where revenue is leaking — and show you exactly which automations will recover
              it fastest.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-white text-violet-700 hover:bg-violet-50 px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center shadow-lg"
              >
                Book Your Free Automation Audit
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

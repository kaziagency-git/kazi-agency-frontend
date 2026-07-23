"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Bell,
  Clock,
  ChevronRight,
  ChevronDown,
  Users,
  RefreshCw,
  MessageSquare,
  TrendingUp,
  Shield,
  Check,
  X,
  PhoneCall,
} from "lucide-react";

const stats = [
  { value: "80%", label: "Reduction in no-shows with automated reminders", icon: TrendingUp },
  { value: "24/7", label: "Clients can book anytime — even while you sleep", icon: Clock },
  { value: "2×", label: "Average increase in booked appointments", icon: Calendar },
  { value: "100%", label: "CRM-integrated — every booking auto-captured", icon: Users },
];

const painPoints = [
  {
    icon: PhoneCall,
    title: "Playing Phone Tag to Schedule",
    description:
      "Back-and-forth calls and emails just to find a meeting time wastes hours every week — time you should be spending closing deals.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Clock,
    title: "No-Shows With No Follow-Up",
    description:
      "Without automated reminders and no-show sequences, missed appointments just disappear — with no chance to rebook or salvage the lead.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Zap,
    title: "Manual Confirmation Emails",
    description:
      "Sending individual confirmation emails for every booking is slow, inconsistent, and leaves room for human error — especially at scale.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: Users,
    title: "Bookings Disconnected from CRM",
    description:
      "When a client books, do they automatically become a contact in your pipeline? If not, leads are falling through the cracks every day.",
    color: "text-violet-500",
    bg: "bg-violet-50",
  },
  {
    icon: RefreshCw,
    title: "Double-Bookings & Conflicts",
    description:
      "Without real-time calendar sync, double-bookings happen. The result: embarrassed clients, damaged trust, and lost revenue.",
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    icon: MessageSquare,
    title: "No Post-Appointment Follow-Up",
    description:
      "The relationship doesn't end at the appointment. Without automated follow-up, you're leaving reviews, referrals, and repeat business on the table.",
    color: "text-slate-500",
    bg: "bg-slate-50",
  },
];

const deliverables = [
  {
    icon: Calendar,
    title: "Custom Branded Booking Page",
    description:
      "A professionally designed, embeddable scheduling page that matches your brand — shareable via link, QR code, or embedded on your website.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Users,
    title: "Full CRM Integration",
    description:
      "Every booking automatically creates or updates a contact in GoHighLevel or your existing CRM — no manual data entry, no missed leads.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Bell,
    title: "Automated SMS & Email Reminders",
    description:
      "Multi-step reminder sequences sent at 24 hours and 1 hour before the appointment — dramatically reducing no-shows without lifting a finger.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: Zap,
    title: "Instant Booking Confirmations",
    description:
      "The moment a client books, they receive a branded confirmation email and SMS with all the details — professional, automatic, and instant.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: RefreshCw,
    title: "Multi-Calendar Sync",
    description:
      "Syncs in real-time with Google Calendar and Outlook so your availability is always accurate — preventing double-bookings permanently.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: MessageSquare,
    title: "Intake Forms & Pre-Screening",
    description:
      "Collect client information, qualification questions, and context before the appointment so every meeting starts prepared and purposeful.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: TrendingUp,
    title: "Post-Appointment Automation",
    description:
      "After every appointment, trigger follow-up sequences — review requests, upsell offers, referral asks — all sent automatically on your behalf.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Shield,
    title: "Round-Robin Team Scheduling",
    description:
      "Distribute inbound bookings evenly or by priority across your team — ideal for sales calls, consultations, or support appointments.",
    color: "text-slate-600",
    bg: "bg-slate-50",
  },
];

const buildSteps = [
  {
    step: "01",
    title: "Discovery & Booking Audit",
    description:
      "We map your current scheduling flow, identify friction points, and define your service types, durations, availability windows, and team structure.",
    icon: Calendar,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
    duration: "Days 1–2",
  },
  {
    step: "02",
    title: "Setup & Configuration",
    description:
      "We build your branded booking page, configure service types, buffer times, availability rules, and team member schedules inside your platform.",
    icon: Zap,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
    duration: "Days 3–5",
  },
  {
    step: "03",
    title: "CRM & Calendar Integration",
    description:
      "We connect your scheduler to GoHighLevel (or your CRM), Google Calendar, and Outlook — ensuring real-time sync and automatic contact creation on every booking.",
    icon: RefreshCw,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    duration: "Days 6–8",
  },
  {
    step: "04",
    title: "Automation Sequences",
    description:
      "We build your confirmation, reminder, no-show, and post-appointment follow-up workflows — so every client interaction is handled automatically.",
    icon: Bell,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    duration: "Days 9–11",
  },
  {
    step: "05",
    title: "Testing & Go Live",
    description:
      "We run end-to-end tests across every booking flow, trigger every automation manually, verify calendar sync, and go live when everything is bulletproof.",
    icon: TrendingUp,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
    duration: "Days 12–14",
  },
];

const comparisonFeatures = [
  "Custom Branded Booking Page",
  "Native CRM Integration",
  "Automated SMS Reminders",
  "Post-Appointment Follow-Up",
  "Round-Robin Team Scheduling",
  "Intake Forms Built In",
  "No-Show Re-booking Automation",
  "Multi-Calendar Sync",
  "Integrated Marketing Stack",
  "Dedicated Setup & Support",
];

const comparisonData = [
  {
    label: "Calendly",
    values: [false, false, false, false, "paid add-on", "basic", false, true, false, false],
    highlight: false,
  },
  {
    label: "Acuity Scheduling",
    values: [true, "via Zapier", false, false, "paid plan", true, false, true, false, false],
    highlight: false,
  },
  {
    label: "Manual / Phone",
    values: [false, false, false, false, false, false, false, false, false, false],
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
    q: "What booking tools does this replace?",
    a: "Our scheduling system replaces Calendly, Acuity Scheduling, SimplyBook.me, and similar tools — with the key difference being native CRM integration, built-in SMS reminders, and post-appointment automation that those tools can't match without complex third-party setups.",
  },
  {
    q: "How does the CRM integration actually work?",
    a: "Every time a client books an appointment, a contact is automatically created or updated in GoHighLevel (or your existing CRM). The booking details, service type, and appointment time are logged as an opportunity in your pipeline — so your sales team can follow up without any manual input.",
  },
  {
    q: "Can clients book 24/7 without me being available?",
    a: "Yes. Your booking page is live around the clock. Clients can book at any time, even outside business hours, weekends, or holidays. You set your availability rules — we make sure the system handles everything else automatically.",
  },
  {
    q: "How do the automated reminders work?",
    a: "We set up a multi-step reminder sequence: an immediate confirmation upon booking, a 24-hour reminder, and a 1-hour reminder before the appointment — all sent via email and SMS. Each message is branded and editable. No-show sequences can also trigger if the client misses the appointment.",
  },
  {
    q: "Can I customize the booking page to match my brand?",
    a: "Yes. Your booking page is fully branded with your logo, colors, and messaging. It can be shared as a standalone link, embedded on your website, or linked from your email signature, social bio, or CRM automations.",
  },
  {
    q: "Does it work for teams with multiple staff members?",
    a: "Yes. We configure round-robin scheduling so incoming bookings are distributed across your team either evenly or by priority. Each team member has their own availability synced, so clients always book with whoever is available.",
  },
  {
    q: "What happens when a client cancels or no-shows?",
    a: "Cancellations trigger an automatic re-booking prompt sent to the client. No-shows trigger a separate follow-up sequence — whether that's a re-booking link, a check-in SMS, or an escalation to your sales team. You decide the flow; we build it.",
  },
  {
    q: "How long does the full setup take?",
    a: "Most booking systems are fully live within 2 weeks from the kick-off call. This includes the booking page, CRM integration, calendar sync, and all automation sequences built and tested.",
  },
];

export default function AppointmentSchedulingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-white">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6 bg-gradient-to-br from-white via-teal-50/40 to-green-50">
        <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute left-[-8%] top-[-8%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-teal-500/20 to-green-400/10 blur-3xl" />
          <div className="absolute right-[-6%] bottom-[-6%] w-[420px] h-[420px] rounded-full bg-gradient-to-br from-emerald-400/15 to-teal-500/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-slate-500 mb-8 justify-center"
          >
            <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-teal-600 transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-teal-600 font-medium">Appointment Scheduling</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-teal-50 border border-teal-200">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span className="text-xs font-bold text-teal-700 tracking-widest uppercase">
                Booking & Appointment Scheduling
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 text-balance leading-tight">
              Stop Playing Phone Tag.{" "}
              <span className="bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text text-transparent">
                Let Clients Book Themselves.
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Kazi Agency builds a fully integrated booking system that connects to your CRM, sends automated reminders, handles no-shows, and runs post-appointment follow-ups — all without you lifting a finger.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
              >
                Book a Free Strategy Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center cursor-pointer"
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
                  <Icon className="w-5 h-5 text-teal-600 mx-auto mb-2" />
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
              Your Scheduling Process Is Costing You Clients
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Every friction point in your booking process — from phone tag to no-shows — is a lost opportunity. Here&apos;s what most businesses are dealing with.
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
              Every one of these problems is solved with the right setup. Here&apos;s exactly what we build for you.
            </p>
            <Link
              href="/book-a-consultation"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-7 py-3.5 rounded-xl font-bold transition-all"
            >
              Fix My Scheduling System
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-24 px-6 bg-[#f0fdf9]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200">
              <span className="text-xs font-bold text-teal-700 tracking-widest uppercase">
                What&apos;s Included
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              A Complete Booking System, Not Just a Calendar Link
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Every feature your scheduling setup needs — built, integrated, and automated from day one.
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
                  className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-teal-200 hover:shadow-md transition-all"
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200">
              <span className="text-xs font-bold text-teal-700 tracking-widest uppercase">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              Fully Live in Under 2 Weeks
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              A clear, structured setup process — from discovery to a fully automated booking system.
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
      <section className="py-24 px-6 bg-[#f0fdf9]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200">
              <span className="text-xs font-bold text-teal-700 tracking-widest uppercase">
                Why Kazi Agency
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
              More Than a Calendly Replacement
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See exactly what you get with Kazi Agency that standalone booking tools can&apos;t provide.
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
                      className={`p-5 text-center font-bold text-sm min-w-[130px] ${
                        col.highlight ? "text-teal-700 bg-teal-50/60" : "text-slate-500"
                      }`}
                    >
                      {col.label}
                      {col.highlight && (
                        <span className="block mt-1 text-[10px] bg-teal-600 text-white px-2 py-0.5 rounded-full font-bold mx-auto w-fit">
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
                          className={`p-5 text-center ${col.highlight ? "bg-teal-50/40" : ""}`}
                        >
                          {val === true ? (
                            <Check className="w-5 h-5 text-teal-600 mx-auto" />
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
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200">
              <span className="text-xs font-bold text-teal-700 tracking-widest uppercase">
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
                    className={`w-5 h-5 text-teal-600 shrink-0 transition-transform duration-200 ${
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
      <section className="py-24 px-6 bg-gradient-to-br from-teal-600 to-green-600 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-10%] top-[-20%] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl" />
          <div className="absolute right-[-8%] bottom-[-15%] w-[400px] h-[400px] rounded-full bg-emerald-400/10 blur-3xl" />
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
                Ready to Automate?
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 text-balance">
              Let&apos;s Build a Booking System That Works While You Sleep
            </h2>
            <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book a free 30-minute strategy call. We&apos;ll map your current scheduling setup, identify where you&apos;re losing bookings, and show you exactly how we&apos;d fix it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/book-a-consultation"
                className="bg-white text-teal-700 hover:bg-teal-50 px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center shadow-lg"
              >
                Book My Free Strategy Call
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-base transition-all inline-flex items-center gap-2 justify-center"
              >
                Explore All Services
              </Link>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-green-100 text-sm">
              {["No commitment required", "Live in under 2 weeks", "Replaces Calendly & more"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-200" />
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

import type { Metadata } from "next";
import { LifeBuoy, Clock, ShieldCheck, MessageSquare } from "lucide-react";
import { SupportForm } from "@/components/support/support-form";

export const metadata: Metadata = {
  title: "Client Support | Kazi Agency",
  description:
    "Submit a support request to the Kazi Agency team. We're here to help with website issues, CRM, marketing automation, billing, and more.",
};

const highlights = [
  {
    icon: Clock,
    title: "Fast Response",
    body: "Our team aims to respond to every request within 1 business day.",
  },
  {
    icon: ShieldCheck,
    title: "Dedicated Support",
    body: "Your request goes directly to the specialist for your service area.",
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    body: "You'll receive updates at each stage until your issue is resolved.",
  },
];

export default function ClientSupportPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.10),transparent_34%),linear-gradient(180deg,#f8fbfd_0%,#eef6fb_100%)] px-4 pb-24 pt-28 sm:px-6 lg:px-10">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-20 h-96 w-96 rounded-full bg-cyan-300/25 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Header */}
        <section className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-sm backdrop-blur">
            <LifeBuoy className="h-4 w-4" />
            Existing Clients
          </div>

          <h1 className="mt-5 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
            How can we{" "}
            <span className="bg-linear-to-r from-[#046BAF] to-cyan-500 bg-clip-text text-transparent">
              help you today?
            </span>
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Submit a support request below and our team will get back to you as soon as possible.
            Please include as much detail as you can so we can resolve your issue quickly.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
              Existing clients only
            </span>
            <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
              Response within 1 business day
            </span>
            <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
              Quick 2 minute form
            </span>
          </div>
        </section>

        {/* Highlight cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {highlights.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 border border-cyan-100">
                <Icon className="h-5 w-5 text-cyan-600" />
              </div>
              <p className="font-semibold text-slate-900">{title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.20)] backdrop-blur sm:p-10">
          <h2 className="mb-6 text-xl font-semibold text-slate-900">Submit a Support Request</h2>
          <SupportForm />
        </div>
      </div>
    </main>
  );
}

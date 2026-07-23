"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Mail } from "lucide-react";
import { ScoreCard } from "@/components/audit/score-card";
import type { AuditResponsePayload } from "@/lib/audit-types";

interface AuditResultsProps {
  result: AuditResponsePayload;
}

export function AuditResults({ result }: AuditResultsProps) {
  return (
    <section className="space-y-6">
      <ScoreCard score={result.overallScore} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl"
      >
        <p className="text-xs uppercase tracking-[0.18em] text-slate-200/70">AI Summary</p>
        <p className="mt-3 text-base leading-relaxed text-slate-100">{result.summary}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl"
      >
        <p className="text-xs uppercase tracking-[0.18em] text-slate-200/70">Top Issues</p>
        <ul className="mt-4 space-y-3">
          {result.topIssues.map((issue) => (
            <li key={issue} className="flex items-start gap-3 text-slate-100">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" />
              <span>{issue}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="rounded-3xl border border-cyan-300/40 bg-linear-to-br from-cyan-500/20 to-blue-500/10 p-10 text-center backdrop-blur-xl"
      >
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-300/20">
          <Mail className="h-8 w-8 text-cyan-200" />
        </div>
        <h3 className="text-2xl font-semibold text-white">Full audit report has been sent to your email.</h3>
        <p className="mt-3 text-base text-slate-300/80">
          Check your inbox for the complete branded PDF report from Kazi Agency.
        </p>
        <a
          href={result.pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-7 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-cyan-200"
        >
          Download Full PDF Report
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </motion.div>
    </section>
  );
}

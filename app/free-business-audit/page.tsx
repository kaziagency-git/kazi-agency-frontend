"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Bot, Sparkles } from "lucide-react";
import { FAQ } from "@/components/faq";
import { SchemaInjector } from "@/components/schema-injector";
import { auditFAQ } from "@/lib/faq-data";
import { AuditForm, type AuditFormValues } from "@/components/audit/audit-form";
import { LoadingState } from "@/components/audit/loading-state";
import { AuditResults } from "@/components/audit/audit-results";
import type { AuditResponsePayload } from "@/lib/audit-types";

type UiState = "idle" | "loading" | "success";

export default function FreeBusinessAuditPage() {
  const [uiState, setUiState] = useState<UiState>("idle");
  const [result, setResult] = useState<AuditResponsePayload | null>(null);
  const [formResetSignal, setFormResetSignal] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (uiState === "success" && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [uiState]);

  async function handleFormSubmit(values: AuditFormValues) {
    setUiState("loading");
    setResult(null);

    try {
      const payload = {
        businessName: values.businessName.trim(),
        website: values.website.trim(),
        businessType: values.businessType,
        mainGoal: values.mainGoal,
        challenge: values.challenge.trim(),
        targetAudience: values.targetAudience.trim(),
        monthlyLeads: values.monthlyLeads,
        currentChannels: values.currentChannels,
        auditFocus: values.auditFocus,
        email: values.email.trim(),
        socialLinks: values.socialLinks.trim(),
        additionalContext: values.additionalContext.trim(),
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("/api/business-audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as Partial<AuditResponsePayload> & {
        message?: string;
      };

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Could not generate your audit right now.");
      }

      if (
        typeof data.overallScore !== "number" ||
        typeof data.summary !== "string" ||
        !Array.isArray(data.topIssues) ||
        typeof data.pdfUrl !== "string"
      ) {
        throw new Error("Invalid response format received from audit service.");
      }

      setResult({
        success: true,
        overallScore: data.overallScore,
        summary: data.summary,
        topIssues: data.topIssues,
        pdfUrl: data.pdfUrl,
      });
      setFormResetSignal((current) => current + 1);
      setUiState("success");
      toast.success("Your free audit is ready.");
    } catch (error) {
      console.error("[AuditForm] Failed to generate audit:", error);
      setUiState("idle");
      toast.error(error instanceof Error ? error.message : "Failed to generate audit.");
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-20 pt-28 sm:px-6 lg:px-10">
      <SchemaInjector items={auditFAQ} />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-120 w-120 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-104 w-104 rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <section className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-100"
          >
            <Sparkles className="h-4 w-4" />
            AI Business Intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mt-5 text-4xl font-semibold leading-tight text-white md:text-5xl"
          >
            Get Your Free Kazi Agency
            <span className="block bg-linear-to-r from-cyan-200 to-sky-300 bg-clip-text text-transparent">
              AI Business Audit
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-4 text-base text-slate-200/85"
          >
            Share your business context and get an instant AI-powered audit, including your score, top issues,
            and a full branded PDF report from Kazi Agency.
          </motion.p>

          <div className="mt-6 rounded-3xl border border-white/20 bg-white/10 p-5 text-left backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-cyan-300/20 p-2">
                <Bot className="h-5 w-5 text-cyan-100" />
              </div>
              <div>
                <p className="font-medium text-slate-50">Fast but deeper insights</p>
                <p className="text-sm text-slate-200/75">
                  Multi-step flow keeps it simple while collecting richer context for a sharper AI audit.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-10 w-full max-w-5xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AuditForm
              isSubmitting={uiState === "loading"}
              onSubmit={handleFormSubmit}
              resetSignal={formResetSignal}
            />
          </motion.div>

          <AnimatePresence mode="wait">
            {uiState === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-10"
              >
                <LoadingState />
              </motion.div>
            )}

            {uiState === "success" && result && (
              <motion.div
                key="results"
                ref={resultsRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-10"
              >
                <AuditResults result={result} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>

      {/* FAQ Section */}
      <section className="relative mx-auto mt-20 w-full max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          <FAQ
            items={auditFAQ}
            title="Business Audit FAQ"
            titleClassName="text-white"
            itemClassName="bg-slate-950/70 border border-white/10"
            triggerClassName="hover:bg-white/5"
            questionClassName="text-white"
            answerClassName="border-white/10 text-slate-300"
            iconClassName="text-slate-400"
          />
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";
// removed Link import — using button to show form again
import { motion } from "framer-motion";
import { toast } from "sonner";
import { FAQ } from "@/components/faq";
import { SchemaInjector } from "@/components/schema-injector";
import { brandOnboardingFAQ } from "@/lib/faq-data";
import { BrandForm } from "@/components/brand/brand-form";
import type { BrandFormData } from "@/lib/brand-form-schema";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

export default function BrandOnboardingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleFormSubmit(data: BrandFormData) {
    setIsSubmitting(true);

    try {
      const payload = {
        email: data.email.trim(),
        businessName: data.businessName.trim(),
        businessDescription: data.businessDescription.trim(),
        businessType: data.businessType,
        brandTone: data.brandTone.join(", "),
        mainCustomer: data.mainCustomer.trim(),
        customerProblem: data.customerProblem.trim(),
        differentFromCompetitors: data.differentFromCompetitors.trim(),
        brandWords: data.brandWords.trim(),
        brandNever: data.brandNever?.trim() || "",
        approvalPerson: data.approvalPerson.trim(),
        approvalTime: data.approvalTime,
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/brand-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit form");
      }

      setIsSuccess(true);
      toast.success("Thank you! We will send your Brand Foundation Document within 24 hours.");
    } catch (error) {
      console.error("[BrandForm] Submission failed:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="mx-auto max-w-2xl w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
              <div className="relative rounded-2xl bg-white p-8 text-center shadow-lg sm:p-12 border border-slate-200">
              <div className="mb-8 flex justify-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 15 }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-xl" />
                  <CheckCircle2 className="relative h-16 w-16 text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text" />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="mb-3 text-3xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent sm:text-4xl">
                  You're All Set!
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="mb-6 text-lg font-medium text-slate-700">
                  Thank you for sharing your brand insights!
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-6 border border-blue-100/50"
              >
                <p className="text-base text-slate-600 leading-relaxed">
                  ✨ We're crafting your <span className="font-semibold text-slate-900">Brand Foundation Document</span> with care. Check your inbox within <span className="font-semibold text-slate-900">24 hours</span>.
                </p>
                <p className="mt-4 text-sm text-slate-500">
                  💡 Tip: If you don't see it, please check your spam or promotions folder.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              >
                <button
                  onClick={() => setIsSuccess(false)}
                  className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white font-semibold hover:shadow-md transition-all duration-200"
                >
                  Go Back
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-8 py-32 sm:px-12 lg:px-16">
      <SchemaInjector items={brandOnboardingFAQ} />
      <div className="mx-auto max-w-5xl space-y-20">
        {/* Header Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100/80 to-purple-100/80 px-4 py-2 backdrop-blur-sm border border-blue-200/50"
          >
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Brand Foundation Form</span>
          </motion.div>

          <h1 className="mb-4 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Build Your Brand
            </span>
            <br />
            <span className="text-slate-800">Foundation Today</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed">
            Help us understand your unique vision so we can craft the perfect messaging strategy that resonates with your audience.
          </p>
        </motion.section>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          {/* Decorative gradient background */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-2xl opacity-60" />

          <div className="relative rounded-2xl bg-white/80 backdrop-blur-xl p-8 shadow-2xl sm:p-12 border border-white/20">
            {/* Decorative top border accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-2xl" />

            <BrandForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
          </div>
        </motion.div>

        {/* Footer Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
            <span className="text-red-500 font-semibold">*</span>
            <span>Required fields</span>
          </p>
          <p className="mt-3 text-xs text-slate-400">
            Your information is secure and will only be used to create your Brand Foundation Document.
          </p>
        </motion.div>

        {/* FAQ Section */}
        <section className="rounded-3xl border border-white/20 bg-white/80 backdrop-blur-xl p-6 sm:p-10 shadow-xl">
          <FAQ items={brandOnboardingFAQ} title="Brand Onboarding FAQ" />
        </section>
      </div>
    </main>
  );
}

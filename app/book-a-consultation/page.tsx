"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CalendarCheck2 } from "lucide-react";

type SelectOption = {
  label: string;
  value: string;
};

type FormConfig = {
  industries: SelectOption[];
  companySizes: SelectOption[];
  investmentAmounts: SelectOption[];
};

function isFormConfig(value: unknown): value is FormConfig {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const config = value as Partial<FormConfig>;

  return (
    Array.isArray(config.industries) &&
    Array.isArray(config.companySizes) &&
    Array.isArray(config.investmentAmounts)
  );
}

const leadFormSchema = z.object({
  firstName: z.string().min(1, "First Name is required."),
  lastName: z.string().min(1, "Last Name is required."),
  email: z.string().min(1, "Email is required.").email("Please enter a valid email."),
  phone: z.string().min(1, "Phone is required."),
  companyName: z.string().min(1, "Company Name is required."),
  industry: z.string().min(1, "Industry is required."),
  companySize: z.string().min(1, "Company Size is required."),
  investmentAmount: z.string().min(1, "Investment Amount is required."),
  leadSource: z.string().min(1, "Lead source is required."),
  utmCampaign: z.string(),
  pageUrl: z.string().min(1, "Page URL is required."),
  consent: z.boolean().refine((value) => value, {
    message: "You must agree before submitting.",
  }),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

const defaultValues: LeadFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companyName: "",
  industry: "",
  companySize: "",
  investmentAmount: "",
  leadSource: "Direct",
  utmCampaign: "",
  pageUrl: "",
  consent: false,
};

function LoadingSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <div className="h-4 w-32 animate-pulse rounded bg-slate-300/70" />
          <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200" />
        </div>
      ))}
      <div className="md:col-span-2 space-y-2">
        <div className="h-4 w-56 animate-pulse rounded bg-slate-300/70" />
        <div className="h-6 w-full animate-pulse rounded bg-slate-200" />
      </div>
      <div className="md:col-span-2 h-11 w-full animate-pulse rounded-xl bg-slate-300" />
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-sm text-rose-600">{message}</p>;
}

function BookAConsultationContent() {
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [isConfigLoading, setIsConfigLoading] = useState(true);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadConfig() {
      setIsConfigLoading(true);
      try {
        const response = await fetch("/api/form-config", { cache: "no-store" });
        const data = (await response.json()) as unknown;

        if (!response.ok || !isFormConfig(data)) {
          const message =
            typeof data === "object" && data !== null && "error" in data && typeof data.error === "string"
              ? data.error
              : "Could not load form options.";
          throw new Error(message);
        }

        if (isMounted) {
          setConfig(data);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Could not load form options.";
        if (isMounted) {
          setConfig({ industries: [], companySizes: [], investmentAmounts: [] });
          setSubmitError(message);
          toast.error(message);
        }
      } finally {
        if (isMounted) {
          setIsConfigLoading(false);
        }
      }
    }

    loadConfig();

    return () => {
      isMounted = false;
    };
  }, []);

  const sourceFromParams = useMemo(() => {
    return searchParams.get("utm_source") || searchParams.get("utm_medium") || "Direct";
  }, [searchParams]);

  const campaignFromParams = useMemo(() => {
    return searchParams.get("utm_campaign") || "";
  }, [searchParams]);

  useEffect(() => {
    setValue("leadSource", sourceFromParams);
    setValue("utmCampaign", campaignFromParams);

    if (typeof window !== "undefined") {
      setValue("pageUrl", window.location.href);
    }
  }, [campaignFromParams, setValue, sourceFromParams]);

  async function onSubmit(values: LeadFormValues) {
    setSubmitError("");
    setSubmitMessage("");

    const payload = {
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      companyName: values.companyName.trim(),
      industry: values.industry,
      companySize: values.companySize,
      investmentAmount: values.investmentAmount,
      leadSource: values.leadSource,
      utmCampaign: values.utmCampaign,
      pageUrl: values.pageUrl,
      consent: values.consent ? "true" : "false",
    };

    try {
      const response = await fetch("/api/lead-capture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
        errors?: Record<string, string>;
      };

      if (!response.ok || !result.success) {
        const fieldMessage = result.errors
          ? Object.values(result.errors)[0]
          : result.error || "Submission failed. Please try again.";
        throw new Error(fieldMessage);
      }

      const successText = "Thanks, your consultation request has been submitted.";
      setSubmitMessage(successText);
      toast.success(successText);

      reset({
        ...defaultValues,
        leadSource: sourceFromParams,
        utmCampaign: campaignFromParams,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Submission failed. Please try again.";
      setSubmitError(message);
      toast.error(message);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.12),transparent_34%),linear-gradient(180deg,#f8fbfd_0%,#eef6fb_100%)] px-4 pb-24 pt-28 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-20 h-96 w-96 rounded-full bg-cyan-300/25 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <section className="mx-auto max-w-4xl pb-10 text-center lg:pb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-sm backdrop-blur">
            <CalendarCheck2 className="h-4 w-4" />
            Consultation Intake
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            Book a Consultation
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Start with a few details and our agency team will shape a focused growth plan around your market,
            budget, and goals.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600">
            <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
              Strategy-led response
            </span>
            <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
              Tailored to your industry
            </span>
            <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
              Quick 2 minute intake
            </span>
          </div>

          <div className="mx-auto mt-8 grid gap-4 text-left sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Step 1</p>
              <p className="mt-2 font-semibold text-slate-900">Share your business context</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Tell us who you are, what you sell, and where you want to grow.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Step 2</p>
              <p className="mt-2 font-semibold text-slate-900">We review your opportunity</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Your answers help us prepare a consultation that feels specific, not generic.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">Step 3</p>
              <p className="mt-2 font-semibold text-slate-900">Get a clear next step</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">We’ll follow up with the right direction for your growth and lead generation needs.</p>
            </div>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-4xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur md:p-10"
        >
          <div className="mb-10 rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 to-cyan-50 p-5 text-sm text-slate-600 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">What you get</p>
              <div className="mt-4 space-y-3">
                <p className="font-semibold text-slate-900">Agency review of your current growth funnel</p>
                <p>We’ll respond with a consultation path tailored to your industry, team size, and budget.</p>
                <p className="rounded-2xl bg-white/80 px-4 py-3 text-slate-700 shadow-sm">
                  Quick intake - usually takes less than 2 minutes.
                </p>
              </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <input type="hidden" {...register("leadSource")} />
            <input type="hidden" {...register("utmCampaign")} />
            <input type="hidden" {...register("pageUrl")} />

            {isConfigLoading ? (
              <LoadingSkeleton />
            ) : (
              <>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">First Name</label>
                    <input
                      type="text"
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-cyan-500 transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2"
                      placeholder="John"
                      {...register("firstName")}
                    />
                    <FieldError message={errors.firstName?.message} />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Last Name</label>
                    <input
                      type="text"
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-cyan-500 transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2"
                      placeholder="Doe"
                      {...register("lastName")}
                    />
                    <FieldError message={errors.lastName?.message} />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                    <input
                      type="email"
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-cyan-500 transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2"
                      placeholder="john@company.com"
                      {...register("email")}
                    />
                    <FieldError message={errors.email?.message} />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
                    <input
                      type="tel"
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-cyan-500 transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2"
                      placeholder="+1 (555) 123-4567"
                      {...register("phone")}
                    />
                    <FieldError message={errors.phone?.message} />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Company Name</label>
                    <input
                      type="text"
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-cyan-500 transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2"
                      placeholder="Acme Inc."
                      {...register("companyName")}
                    />
                    <FieldError message={errors.companyName?.message} />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Industry</label>
                    <select
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-cyan-500 transition focus:border-cyan-500 focus:ring-2"
                      {...register("industry")}
                    >
                      <option value="">Select industry</option>
                      {config?.industries.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.industry?.message} />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Company Size</label>
                    <select
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-cyan-500 transition focus:border-cyan-500 focus:ring-2"
                      {...register("companySize")}
                    >
                      <option value="">Select company size</option>
                      {config?.companySizes.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.companySize?.message} />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Investment Amount</label>
                    <select
                      className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-cyan-500 transition focus:border-cyan-500 focus:ring-2"
                      {...register("investmentAmount")}
                    >
                      <option value="">Select investment amount</option>
                      {config?.investmentAmounts.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.investmentAmount?.message} />
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <label className="flex items-start gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-600"
                      {...register("consent")}
                    />
                    <span>
                      I agree to be contacted by Kazi Agency regarding my consultation request.
                    </span>
                  </label>
                  <FieldError message={errors.consent?.message} />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isConfigLoading}
                  className="cursor-pointer inline-flex h-12 w-full items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </>
            )}

            {submitMessage ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {submitMessage}
              </div>
            ) : null}

            {submitError ? (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {submitError}
              </div>
            ) : null}
          </form>
        </motion.section>
      </div>
    </main>
  );
}

function BookAConsultationFallback() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.12),transparent_34%),linear-gradient(180deg,#f8fbfd_0%,#eef6fb_100%)] px-4 pb-24 pt-28 sm:px-6 lg:px-10">
      <div className="relative mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center">
        <div className="rounded-3xl border border-slate-200 bg-white/90 px-6 py-4 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
          Loading consultation form...
        </div>
      </div>
    </main>
  );
}

export default function BookAConsultationPage() {
  return (
    <Suspense fallback={<BookAConsultationFallback />}>
      <BookAConsultationContent />
    </Suspense>
  );
}

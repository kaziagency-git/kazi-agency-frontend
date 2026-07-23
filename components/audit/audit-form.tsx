"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import {
  AUDIT_FOCUS_AREAS,
  BUSINESS_TYPES,
  CHANNEL_OPTIONS,
  LEAD_RANGES,
  MAIN_GOALS,
} from "@/lib/audit-types";

export interface AuditFormValues {
  businessName: string;
  website: string;
  businessType: string;
  mainGoal: string;
  challenge: string;
  targetAudience: string;
  monthlyLeads: string;
  currentChannels: string[];
  auditFocus: string;
  email: string;
  socialLinks: string;
  additionalContext: string;
}

interface AuditFormProps {
  isSubmitting: boolean;
  onSubmit: (values: AuditFormValues) => Promise<void>;
  resetSignal?: number;
}

const initialValues: AuditFormValues = {
  businessName: "",
  website: "",
  businessType: "",
  mainGoal: "",
  challenge: "",
  targetAudience: "",
  monthlyLeads: "",
  currentChannels: [],
  auditFocus: "",
  email: "",
  socialLinks: "",
  additionalContext: "",
};

const stepLabels = ["Business Basics", "Growth Context", "Delivery"];

const fieldsByStep: Array<Array<keyof AuditFormValues>> = [
  ["businessName", "businessType", "mainGoal", "website"],
  ["challenge", "targetAudience", "monthlyLeads", "currentChannels", "auditFocus"],
  ["email", "socialLinks", "additionalContext"],
];

export function AuditForm({ isSubmitting, onSubmit, resetSignal = 0 }: AuditFormProps) {
  const [values, setValues] = useState<AuditFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof AuditFormValues, string>>>({});
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setValues(initialValues);
    setErrors({});
    setCurrentStep(0);
  }, [resetSignal]);

  function validate(currentValues: AuditFormValues) {
    const nextErrors: Partial<Record<keyof AuditFormValues, string>> = {};

    if (!currentValues.businessName.trim()) {
      nextErrors.businessName = "Business name is required.";
    }

    if (currentValues.website.trim()) {
      try {
        const parsedUrl = new URL(currentValues.website);
        if (!parsedUrl.protocol.startsWith("http")) {
          nextErrors.website = "Please enter a valid URL (http:// or https://).";
        }
      } catch {
        nextErrors.website = "Please enter a valid URL (http:// or https://).";
      }
    }

    if (!currentValues.businessType) {
      nextErrors.businessType = "Please select your business type.";
    }

    if (!currentValues.mainGoal) {
      nextErrors.mainGoal = "Please select your main goal.";
    }

    if (!currentValues.challenge.trim()) {
      nextErrors.challenge = "Please share your biggest challenge.";
    }

    if (!currentValues.targetAudience.trim()) {
      nextErrors.targetAudience = "Please define your target audience.";
    }

    if (!currentValues.monthlyLeads) {
      nextErrors.monthlyLeads = "Please choose your current monthly lead range.";
    }

    if (currentValues.currentChannels.length === 0) {
      nextErrors.currentChannels = "Select at least one marketing channel.";
    }

    if (!currentValues.auditFocus) {
      nextErrors.auditFocus = "Please select one audit focus area.";
    }

    if (!currentValues.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentValues.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    return nextErrors;
  }

  function getStepErrors(allErrors: Partial<Record<keyof AuditFormValues, string>>, step: number) {
    const fields = fieldsByStep[step];
    const stepErrors: Partial<Record<keyof AuditFormValues, string>> = {};

    fields.forEach((field) => {
      if (allErrors[field]) {
        stepErrors[field] = allErrors[field];
      }
    });

    return stepErrors;
  }

  function updateValue<K extends keyof AuditFormValues>(field: K, value: AuditFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function toggleChannel(channel: string) {
    setValues((prev) => {
      const exists = prev.currentChannels.includes(channel);
      const updated = exists
        ? prev.currentChannels.filter((item) => item !== channel)
        : [...prev.currentChannels, channel];

      return {
        ...prev,
        currentChannels: updated,
      };
    });

    setErrors((prev) => ({ ...prev, currentChannels: undefined }));
  }

  function goNextStep() {
    const validation = validate(values);
    const stepErrors = getStepErrors(validation, currentStep);

    if (Object.keys(stepErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, stepLabels.length - 1));
  }

  function goBackStep() {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await onSubmit(values);
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl md:p-10"
    >
      <div className="mb-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
        <div className="rounded-xl bg-cyan-300/20 p-2">
          <Sparkles className="h-5 w-5 text-cyan-200" />
        </div>
        <div>
          <p className="text-sm text-slate-200/75">Kazi Agency</p>
          <h2 className="text-xl font-semibold text-white">Free AI Business Audit</h2>
        </div>
        </div>

        <p className="rounded-full border border-white/20 bg-slate-900/40 px-3 py-1 text-xs text-slate-200">
          Step {currentStep + 1} of {stepLabels.length}
        </p>
      </div>

      <div className="mb-8 flex gap-2">
        {stepLabels.map((label, index) => (
          <div key={label} className="flex-1">
            <div
              className={`h-1.5 rounded-full ${
                index <= currentStep ? "bg-cyan-300" : "bg-white/15"
              }`}
            />
            <p className="mt-2 text-center text-xs text-slate-300">{label}</p>
          </div>
        ))}
      </div>

      {currentStep === 0 ? (
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Business Name" error={errors.businessName}>
          <input
            value={values.businessName}
            onChange={(event) => updateValue("businessName", event.target.value)}
            className="input"
            placeholder="Kazi Agency"
            disabled={isSubmitting}
          />
        </Field>

        <Field label="Website URL (Optional)" error={errors.website}>
          <input
            value={values.website}
            onChange={(event) => updateValue("website", event.target.value)}
            className="input"
            placeholder="https://yourwebsite.com"
            disabled={isSubmitting}
          />
        </Field>

        <Field label="Business Type" error={errors.businessType}>
          <select
            value={values.businessType}
            onChange={(event) => updateValue("businessType", event.target.value)}
            className="input"
            disabled={isSubmitting}
          >
            <option value="">Select business type</option>
            {BUSINESS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Main Goal" error={errors.mainGoal}>
          <select
            value={values.mainGoal}
            onChange={(event) => updateValue("mainGoal", event.target.value)}
            className="input"
            disabled={isSubmitting}
          >
            <option value="">Select your main goal</option>
            {MAIN_GOALS.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>
        </Field>

      </div>
      ) : null}

      {currentStep === 1 ? (
      <div className="grid gap-5 md:grid-cols-2">
        <Field className="md:col-span-2" label="Biggest Business Challenge" error={errors.challenge}>
          <textarea
            value={values.challenge}
            onChange={(event) => updateValue("challenge", event.target.value)}
            className="input min-h-28 resize-y"
            placeholder="What is the single biggest challenge blocking your growth right now?"
            disabled={isSubmitting}
          />
        </Field>

        <Field className="md:col-span-2" label="Target Audience" error={errors.targetAudience}>
          <input
            value={values.targetAudience}
            onChange={(event) => updateValue("targetAudience", event.target.value)}
            className="input"
            placeholder="Example: Founders of local service businesses"
            disabled={isSubmitting}
          />
        </Field>

        <Field label="Current Monthly Leads" error={errors.monthlyLeads}>
          <select
            value={values.monthlyLeads}
            onChange={(event) => updateValue("monthlyLeads", event.target.value)}
            className="input"
            disabled={isSubmitting}
          >
            <option value="">Select monthly lead range</option>
            {LEAD_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Audit Focus Area" error={errors.auditFocus}>
          <select
            value={values.auditFocus}
            onChange={(event) => updateValue("auditFocus", event.target.value)}
            className="input"
            disabled={isSubmitting}
          >
            <option value="">Select audit focus</option>
            {AUDIT_FOCUS_AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </Field>

        <Field className="md:col-span-2" label="Current Marketing Channels" error={errors.currentChannels}>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {CHANNEL_OPTIONS.map((channel) => {
              const checked = values.currentChannels.includes(channel);
              return (
                <button
                  key={channel}
                  type="button"
                  onClick={() => toggleChannel(channel)}
                  disabled={isSubmitting}
                  className={`rounded-lg border px-3 py-2 text-sm transition ${
                    checked
                      ? "border-cyan-300 bg-cyan-300/20 text-cyan-100"
                      : "border-white/20 bg-slate-900/30 text-slate-200 hover:border-cyan-200/60"
                  }`}
                >
                  {channel}
                </button>
              );
            })}
          </div>
        </Field>
      </div>
      ) : null}

      {currentStep === 2 ? (
      <div className="grid gap-5 md:grid-cols-2">

        <Field label="Email Address" error={errors.email}>
          <input
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
            className="input"
            placeholder="you@company.com"
            disabled={isSubmitting}
          />
        </Field>

        <Field label="Social Media Links (Optional)">
          <input
            value={values.socialLinks}
            onChange={(event) => updateValue("socialLinks", event.target.value)}
            className="input"
            placeholder="https://linkedin.com/company/..."
            disabled={isSubmitting}
          />
        </Field>

        <Field className="md:col-span-2" label="Additional Context (Optional)">
          <textarea
            value={values.additionalContext}
            onChange={(event) => updateValue("additionalContext", event.target.value)}
            className="input min-h-24 resize-y"
            placeholder="Anything else the AI should consider while generating your audit?"
            disabled={isSubmitting}
          />
        </Field>
      </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={goBackStep}
          disabled={currentStep === 0 || isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-slate-900/30 px-5 py-3 font-medium text-slate-100 transition hover:bg-slate-900/50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        {currentStep < stepLabels.length - 1 ? (
          <button
            type="button"
            onClick={goNextStep}
            disabled={isSubmitting}
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-6 py-3 font-semibold text-slate-900 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-cyan-300 px-6 py-3 font-semibold text-slate-900 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Generating Audit..." : "Generate Free Audit"}
          </button>
        )}
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid rgba(255, 255, 255, 0.22);
          background: rgba(15, 23, 42, 0.35);
          padding: 0.7rem 0.9rem;
          color: rgb(248 250 252);
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .input:focus {
          border-color: rgba(125, 211, 252, 0.8);
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
        }

        .input::placeholder {
          color: rgba(226, 232, 240, 0.55);
        }

        .input:disabled {
          opacity: 0.7;
        }
      `}</style>
    </motion.form>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

function Field({ label, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-slate-100">{label}</label>
      {children}
      {error ? <p className="mt-1 text-xs text-rose-300">{error}</p> : null}
    </div>
  );
}

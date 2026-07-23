"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  supportFormSchema,
  type SupportFormData,
  ISSUE_CATEGORIES,
  PRIORITY_LEVELS,
  issueCategoryLabels,
  priorityLabels,
} from "@/lib/support-form-schema";

export function SupportForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SupportFormData>({
    resolver: zodResolver(supportFormSchema),
  });

  async function onSubmit(data: SupportFormData) {
    try {
      const response = await fetch("/api/client-support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
        errors?: Record<string, string>;
      };

      if (!response.ok || !result.success) {
        const message =
          result.error ||
          (result.errors ? Object.values(result.errors)[0] : null) ||
          "Failed to submit your request. Please try again.";
        toast.error(message);
        return;
      }

      setSubmitted(true);
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-8 py-14 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Support Request Submitted</h3>
          <p className="mt-2 text-sm text-slate-600">
            Thank you! Our team has received your request and will be in touch shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Name + Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">
            Full Name <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="fullName"
            className="h-11"
            placeholder="John Smith"
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          {errors.fullName && <FieldError message={errors.fullName.message} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            className="h-11"
            placeholder="john@yourcompany.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && <FieldError message={errors.email.message} />}
        </div>
      </div>

      {/* Business + Phone */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="businessName">
            Business / Company Name <span className="text-rose-500">*</span>
          </Label>
          <Input
            id="businessName"
            className="h-11"
            placeholder="Your Company Ltd."
            aria-invalid={!!errors.businessName}
            {...register("businessName")}
          />
          {errors.businessName && <FieldError message={errors.businessName.message} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone Number{" "}
            <span className="font-normal text-slate-400">(optional)</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            className="h-11"
            placeholder="+1 (555) 000-0000"
            {...register("phone")}
          />
        </div>
      </div>

      {/* Category + Priority */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>
            Issue Category <span className="text-rose-500">*</span>
          </Label>
          <Controller
            name="issueCategory"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className="h-11! w-full"
                  aria-invalid={!!errors.issueCategory}
                >
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {ISSUE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {issueCategoryLabels[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.issueCategory && <FieldError message={errors.issueCategory.message} />}
        </div>

        <div className="space-y-2">
          <Label>
            Priority Level <span className="text-rose-500">*</span>
          </Label>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className="h-11! w-full"
                  aria-invalid={!!errors.priority}
                >
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITY_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {priorityLabels[level]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.priority && <FieldError message={errors.priority.message} />}
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <Label htmlFor="subject">
          Issue Subject <span className="text-rose-500">*</span>
        </Label>
        <Input
          id="subject"
          className="h-11"
          placeholder="Brief summary of the issue"
          aria-invalid={!!errors.subject}
          {...register("subject")}
        />
        {errors.subject && <FieldError message={errors.subject.message} />}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Describe Your Issue <span className="text-rose-500">*</span>
        </Label>
        <Textarea
          id="description"
          rows={7}
          className="min-h-40"
          placeholder="Please provide as much detail as possible — steps to reproduce, expected vs actual behaviour, screenshot links, etc."
          aria-invalid={!!errors.description}
          {...register("description")}
        />
        {errors.description && <FieldError message={errors.description.message} />}
      </div>

      {/* Consent */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-start gap-3">
          <Controller
            name="consent"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="consent"
                checked={field.value === true}
                onCheckedChange={field.onChange}
                aria-invalid={!!errors.consent}
                className="mt-0.5"
              />
            )}
          />
          <Label htmlFor="consent" className="cursor-pointer font-normal text-slate-700 leading-snug">
            I agree to be contacted by the Kazi Agency support team regarding this issue.{" "}
            <span className="text-rose-500">*</span>
          </Label>
        </div>
        {errors.consent && <FieldError message={errors.consent.message} className="mt-2" />}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full cursor-pointer rounded-xl bg-slate-950 text-sm font-semibold hover:bg-slate-800"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Submitting…
          </>
        ) : (
          "Submit Support Request"
        )}
      </Button>
    </form>
  );
}

function FieldError({ message, className }: { message?: string; className?: string }) {
  if (!message) return null;
  return <p className={`text-sm text-rose-600 ${className ?? ""}`}>{message}</p>;
}

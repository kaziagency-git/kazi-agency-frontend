"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandFormSchema, type BrandFormData } from "@/lib/brand-form-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";

interface BrandFormProps {
  onSubmit: (data: BrandFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export function BrandForm({ onSubmit, isSubmitting = false }: BrandFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<BrandFormData>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      email: "",
      businessName: "",
      businessDescription: "",
      businessType: undefined,
      brandTone: [],
      mainCustomer: "",
      customerProblem: "",
      differentFromCompetitors: "",
      brandWords: "",
      brandNever: "",
      approvalPerson: "",
      approvalTime: undefined,
    },
  });

  const selectedTones = watch("brandTone");

  const toneOptions = [
    { value: "professional", label: "Professional" },
    { value: "friendly", label: "Friendly" },
    { value: "authoritative", label: "Authoritative" },
    { value: "bold", label: "Bold" },
    { value: "empathetic", label: "Empathetic" },
  ];

  const businessTypes = [
    { value: "ecommerce", label: "E-commerce" },
    { value: "b2b", label: "B2B Service" },
    { value: "b2c", label: "B2C Service" },
    { value: "local", label: "Local Business" },
    { value: "saas", label: "SaaS / Software" },
    { value: "other", label: "Other" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-base font-medium">
          Email Address <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          {...register("email")}
          disabled={isSubmitting}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      {/* Business Name */}
      <div className="space-y-2">
        <Label htmlFor="businessName" className="text-base font-medium">
          Business Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="businessName"
          placeholder="Your business name"
          {...register("businessName")}
          disabled={isSubmitting}
        />
        {errors.businessName && <p className="text-sm text-red-500">{errors.businessName.message}</p>}
      </div>

      {/* Business Description */}
      <div className="space-y-2">
        <Label htmlFor="businessDescription" className="text-base font-medium">
          What does your Business do? <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="businessDescription"
          placeholder="Describe what your business does..."
          {...register("businessDescription")}
          disabled={isSubmitting}
          rows={4}
        />
        {errors.businessDescription && (
          <p className="text-sm text-red-500">{errors.businessDescription.message}</p>
        )}
      </div>

      {/* Business Type */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          Business Type <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="businessType"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} disabled={isSubmitting}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your business type" />
              </SelectTrigger>
              <SelectContent>
                {businessTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.businessType && <p className="text-sm text-red-500">{errors.businessType.message}</p>}
      </div>

      {/* Brand Tone */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          How should your Brand sound? <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="brandTone"
          control={control}
          render={({ field }) => (
            <div className="space-y-3">
              {toneOptions.map((tone) => (
                <div key={tone.value} className="flex items-center space-x-3">
                  <Checkbox
                    id={tone.value}
                    checked={field.value?.includes(tone.value as any)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange([...field.value, tone.value]);
                      } else {
                        field.onChange(field.value.filter((v) => v !== tone.value));
                      }
                    }}
                    disabled={isSubmitting}
                  />
                  <Label htmlFor={tone.value} className="font-normal cursor-pointer">
                    {tone.label}
                  </Label>
                </div>
              ))}
            </div>
          )}
        />
        {errors.brandTone && <p className="text-sm text-red-500">{errors.brandTone.message}</p>}
      </div>

      {/* Main Customer */}
      <div className="space-y-2">
        <Label htmlFor="mainCustomer" className="text-base font-medium">
          Who is your main customer? <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="mainCustomer"
          placeholder="e.g. Business owners aged 25-40"
          {...register("mainCustomer")}
          disabled={isSubmitting}
          rows={3}
        />
        {errors.mainCustomer && <p className="text-sm text-red-500">{errors.mainCustomer.message}</p>}
      </div>

      {/* Customer Problem */}
      <div className="space-y-2">
        <Label htmlFor="customerProblem" className="text-base font-medium">
          What is the biggest problem your customer has that you solve?{" "}
          <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="customerProblem"
          placeholder="Describe the main problem you solve..."
          {...register("customerProblem")}
          disabled={isSubmitting}
          rows={4}
        />
        {errors.customerProblem && <p className="text-sm text-red-500">{errors.customerProblem.message}</p>}
      </div>

      {/* Different From Competitors */}
      <div className="space-y-2">
        <Label htmlFor="differentFromCompetitors" className="text-base font-medium">
          How are you different from your competitors? <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="differentFromCompetitors"
          placeholder="What makes you unique..."
          {...register("differentFromCompetitors")}
          disabled={isSubmitting}
          rows={4}
        />
        {errors.differentFromCompetitors && (
          <p className="text-sm text-red-500">{errors.differentFromCompetitors.message}</p>
        )}
      </div>

      {/* Brand Words */}
      <div className="space-y-2">
        <Label htmlFor="brandWords" className="text-base font-medium">
          Write 3 words that describe your Brand <span className="text-red-500">*</span>
        </Label>
        <Input
          id="brandWords"
          placeholder="e.g. Reliable, Fast, Affordable"
          {...register("brandWords")}
          disabled={isSubmitting}
        />
        {errors.brandWords && <p className="text-sm text-red-500">{errors.brandWords.message}</p>}
      </div>

      {/* Brand Never */}
      <div className="space-y-2">
        <Label htmlFor="brandNever" className="text-base font-medium">
          What should your Brand NEVER say or do? <span className="text-slate-400">*</span>
        </Label>
        <Textarea
          id="brandNever"
          placeholder="Things your brand should avoid..."
          {...register("brandNever")}
          disabled={isSubmitting}
          rows={3}
        />
      </div>

      {/* Approval Person */}
      <div className="space-y-2">
        <Label htmlFor="approvalPerson" className="text-base font-medium">
          Who will approve content before publishing? <span className="text-red-500">*</span>
        </Label>
        <Input
          id="approvalPerson"
          placeholder="Name + WhatsApp number"
          {...register("approvalPerson")}
          disabled={isSubmitting}
        />
        {errors.approvalPerson && <p className="text-sm text-red-500">{errors.approvalPerson.message}</p>}
      </div>

      {/* Approval Time */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          How long will it take to approve content? <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="approvalTime"
          control={control}
          render={({ field }) => (
            <RadioGroup value={field.value} onValueChange={field.onChange} disabled={isSubmitting}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="24h" id="approval-24h" />
                <Label htmlFor="approval-24h" className="font-normal cursor-pointer">
                  Within 24 hours
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="48h" id="approval-48h" />
                <Label htmlFor="approval-48h" className="font-normal cursor-pointer">
                  Within 48 hours
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="72h" id="approval-72h" />
                <Label htmlFor="approval-72h" className="font-normal cursor-pointer">
                  Within 72 hours
                </Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.approvalTime && <p className="text-sm text-red-500">{errors.approvalTime.message}</p>}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Brand Details"
          )}
        </Button>
      </div>
    </form>
  );
}

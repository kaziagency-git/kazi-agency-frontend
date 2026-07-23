import { z } from "zod";

export const brandFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  businessName: z.string().min(1, "Business name is required"),
  businessDescription: z.string().min(10, "Please provide at least 10 characters"),
  businessType: z.enum(["ecommerce", "b2b", "b2c", "local", "saas", "other"], {
    errorMap: () => ({ message: "Please select a business type" }),
  }),
  brandTone: z
    .array(z.enum(["professional", "friendly", "authoritative", "bold", "empathetic"]))
    .min(1, "Select at least one brand tone")
    .max(5),
  mainCustomer: z.string().min(10, "Please describe your main customer"),
  customerProblem: z.string().min(10, "Please describe the problem your customer has"),
  differentFromCompetitors: z.string().min(10, "Please explain what makes you different"),
  brandWords: z.string().min(1, "Please enter 3 brand descriptor words"),
  brandNever: z.string().optional(),
  approvalPerson: z.string().min(1, "Please provide approval contact details"),
  approvalTime: z.enum(["24h", "48h", "72h"], {
    errorMap: () => ({ message: "Please select an approval timeline" }),
  }),
});

export type BrandFormData = z.infer<typeof brandFormSchema>;

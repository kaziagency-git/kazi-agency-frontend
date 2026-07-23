import { NextRequest, NextResponse } from "next/server";
import { BUSINESS_TYPES, MAIN_GOALS } from "@/lib/audit-types";

interface IncomingPayload {
  businessName?: string;
  website?: string;
  businessType?: string;
  mainGoal?: string;
  challenge?: string;
  targetAudience?: string;
  monthlyLeads?: string;
  currentChannels?: string[];
  auditFocus?: string;
  email?: string;
  socialLinks?: string;
  additionalContext?: string;
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  try {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_AUDIT_WEBHOOK;

    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, message: "Webhook URL is not configured." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as IncomingPayload;

    const businessName = body.businessName?.trim() ?? "";
    const website = body.website?.trim() ?? "";
    const businessType = body.businessType?.trim() ?? "";
    const mainGoal = body.mainGoal?.trim() ?? "";
    const challenge = body.challenge?.trim() ?? "";
    const targetAudience = body.targetAudience?.trim() ?? "";
    const monthlyLeads = body.monthlyLeads?.trim() ?? "";
    const currentChannels = Array.isArray(body.currentChannels)
      ? body.currentChannels.map((item) => item.trim()).filter(Boolean)
      : [];
    const auditFocus = body.auditFocus?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const socialLinks = body.socialLinks?.trim() ?? "";
    const additionalContext = body.additionalContext?.trim() ?? "";

    if (
      !businessName ||
      !businessType ||
      !mainGoal ||
      !challenge ||
      !targetAudience ||
      !monthlyLeads ||
      !auditFocus ||
      !email
    ) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided." },
        { status: 400 }
      );
    }

    if (currentChannels.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one current channel is required." },
        { status: 400 }
      );
    }

    if (!BUSINESS_TYPES.includes(businessType as (typeof BUSINESS_TYPES)[number])) {
      return NextResponse.json(
        { success: false, message: "Invalid business type." },
        { status: 400 }
      );
    }

    if (!MAIN_GOALS.includes(mainGoal as (typeof MAIN_GOALS)[number])) {
      return NextResponse.json(
        { success: false, message: "Invalid main goal." },
        { status: 400 }
      );
    }

    if (website && !isValidUrl(website)) {
      return NextResponse.json(
        { success: false, message: "Website URL is invalid." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: "Email address is invalid." },
        { status: 400 }
      );
    }

    const payload = {
      businessName,
      website,
      businessType,
      mainGoal,
      challenge,
      targetAudience,
      monthlyLeads,
      currentChannels,
      auditFocus,
      email,
      socialLinks,
      additionalContext,
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success) {
      return NextResponse.json(
        {
          success: false,
          message: data?.message || "Audit generation failed.",
        },
        { status: response.status || 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        overallScore: data.overallScore,
        summary: data.summary,
        topIssues: Array.isArray(data.topIssues) ? data.topIssues : [],
        pdfUrl: data.pdfUrl,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[BusinessAudit API] Request failed:", error);
    return NextResponse.json(
      { success: false, message: "Unexpected server error." },
      { status: 500 }
    );
  }
}

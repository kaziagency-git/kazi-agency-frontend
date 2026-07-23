import { NextRequest, NextResponse } from "next/server";

interface LeadCaptureBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  industry?: string;
  companySize?: string;
  investmentAmount?: string;
  leadSource?: string;
  utmCampaign?: string;
  pageUrl?: string;
  consent?: string;
}

type RequiredField =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "companyName"
  | "industry"
  | "companySize"
  | "investmentAmount"
  | "leadSource"
  | "pageUrl"
  | "consent";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

const requiredFields: RequiredField[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "companyName",
  "industry",
  "companySize",
  "investmentAmount",
  "leadSource",
  "pageUrl",
  "consent",
];

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  const requestWithConnection = request as NextRequest & {
    connection?: { remoteAddress?: string };
  };

  return requestWithConnection.connection?.remoteAddress || "unknown";
}

function isRateLimited(ipAddress: string): boolean {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;

  for (const [ip, timestamps] of requestLog.entries()) {
    const recent = timestamps.filter((timestamp) => timestamp > cutoff);
    if (recent.length === 0) {
      requestLog.delete(ip);
    } else {
      requestLog.set(ip, recent);
    }
  }

  const current = requestLog.get(ipAddress) ?? [];
  if (current.length >= MAX_REQUESTS) {
    return true;
  }

  requestLog.set(ipAddress, [...current, now]);
  return false;
}

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    const webhookUrl = process.env.N8N_CONSULTATION_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: "N8N webhook URL is not configured." },
        { status: 500 }
      );
    }

    const ipAddress = getClientIp(request);
    if (isRateLimited(ipAddress)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as LeadCaptureBody;

    const normalized = {
      firstName: normalize(body.firstName),
      lastName: normalize(body.lastName),
      email: normalize(body.email),
      phone: normalize(body.phone),
      companyName: normalize(body.companyName),
      industry: normalize(body.industry),
      companySize: normalize(body.companySize),
      investmentAmount: normalize(body.investmentAmount),
      leadSource: normalize(body.leadSource),
      utmCampaign: normalize(body.utmCampaign),
      pageUrl: normalize(body.pageUrl),
      consent: normalize(body.consent),
    };

    const fieldErrors: Partial<Record<RequiredField, string>> = {};

    for (const field of requiredFields) {
      if (!normalized[field]) {
        fieldErrors[field] = "This field is required.";
      }
    }

    if (normalized.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
      fieldErrors.email = "Please provide a valid email address.";
    }

    const consentValue = normalized.consent.toLowerCase();
    if (normalized.consent && consentValue !== "true") {
      fieldErrors.consent = "Consent must be true.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json({ errors: fieldErrors }, { status: 400 });
    }

    const payload = {
      ...normalized,
      timestamp: new Date().toISOString(),
      source: "website_form",
      userAgent: request.headers.get("user-agent") ?? "unknown",
      ipAddress,
    };

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!webhookResponse.ok) {
      const message = await webhookResponse.text().catch(() => "Webhook request failed.");
      return NextResponse.json(
        { error: message || "Failed to forward submission." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[lead-capture] Failed to submit lead:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

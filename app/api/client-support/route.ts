import { NextRequest, NextResponse } from "next/server";

interface SupportFormBody {
  fullName?: string;
  email?: string;
  businessName?: string;
  phone?: string;
  issueCategory?: string;
  priority?: string;
  subject?: string;
  description?: string;
  consent?: boolean;
}

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  const req = request as NextRequest & { connection?: { remoteAddress?: string } };
  return req.connection?.remoteAddress || "unknown";
}

function isRateLimited(ipAddress: string): boolean {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;

  for (const [ip, timestamps] of requestLog.entries()) {
    const recent = timestamps.filter((t) => t > cutoff);
    if (recent.length === 0) requestLog.delete(ip);
    else requestLog.set(ip, recent);
  }

  const current = requestLog.get(ipAddress) ?? [];
  if (current.length >= MAX_REQUESTS) return true;

  requestLog.set(ipAddress, [...current, now]);
  return false;
}

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
  try {
    const webhookUrl = process.env.GHL_SUPPORT_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: "Support webhook URL is not configured." },
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

    const body = (await request.json()) as SupportFormBody;

    const normalized = {
      fullName: normalize(body.fullName),
      email: normalize(body.email),
      businessName: normalize(body.businessName),
      phone: normalize(body.phone),
      issueCategory: normalize(body.issueCategory),
      priority: normalize(body.priority),
      subject: normalize(body.subject),
      description: normalize(body.description),
      consent: body.consent === true,
    };

    const fieldErrors: Record<string, string> = {};

    if (!normalized.fullName) fieldErrors.fullName = "This field is required.";
    if (!normalized.email) fieldErrors.email = "This field is required.";
    if (!normalized.businessName) fieldErrors.businessName = "This field is required.";
    if (!normalized.issueCategory) fieldErrors.issueCategory = "This field is required.";
    if (!normalized.priority) fieldErrors.priority = "This field is required.";
    if (!normalized.subject) fieldErrors.subject = "This field is required.";
    if (!normalized.description) fieldErrors.description = "This field is required.";
    if (!normalized.consent) fieldErrors.consent = "Consent is required.";

    if (normalized.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
      fieldErrors.email = "Please provide a valid email address.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json({ errors: fieldErrors }, { status: 400 });
    }

    // GHL opportunity payload structure
    const payload = {
      // Contact fields
      firstName: normalized.fullName.split(" ")[0] ?? normalized.fullName,
      lastName: normalized.fullName.split(" ").slice(1).join(" ") || "",
      email: normalized.email,
      phone: normalized.phone || "",
      companyName: normalized.businessName,

      // Opportunity fields
      opportunityName: `[Support] ${normalized.subject}`,
      pipelineStage: "Support Request",
      source: "client_support_form",

      // Custom fields for the support ticket
      issueCategory: normalized.issueCategory,
      priority: normalized.priority,
      subject: normalized.subject,
      description: normalized.description,

      // Metadata
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") ?? "unknown",
      ipAddress,
    };

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    console.error("[client-support] Failed to submit support request:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}

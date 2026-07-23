import { NextRequest, NextResponse } from "next/server";

interface ContactFormBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  pageUrl?: string;
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
    const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json({ error: "N8N contact webhook URL is not configured." }, { status: 500 });
    }

    const ipAddress = getClientIp(request);
    if (isRateLimited(ipAddress)) {
      return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
    }

    const body = (await request.json()) as ContactFormBody;

    const normalized = {
      firstName: normalize(body.firstName),
      lastName: normalize(body.lastName),
      email: normalize(body.email),
      phone: normalize(body.phone),
      message: normalize(body.message),
      pageUrl: normalize(body.pageUrl),
    };

    const fieldErrors: Record<string, string> = {};

    if (!normalized.firstName) fieldErrors.firstName = "This field is required.";
    if (!normalized.lastName) fieldErrors.lastName = "This field is required.";
    if (!normalized.email) fieldErrors.email = "This field is required.";
    if (!normalized.message) fieldErrors.message = "This field is required.";

    if (normalized.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
      fieldErrors.email = "Please provide a valid email address.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json({ errors: fieldErrors }, { status: 400 });
    }

    const payload = {
      ...normalized,
      source: "contact_popup",
      timestamp: new Date().toISOString(),
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
      return NextResponse.json({ error: message || "Failed to forward submission." }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[contact-form] Failed to submit lead:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}

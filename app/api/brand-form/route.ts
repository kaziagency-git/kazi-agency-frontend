import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (
      !data.email?.trim() ||
      !data.businessName?.trim() ||
      !data.businessDescription?.trim() ||
      !data.businessType ||
      !data.brandTone ||
      !data.mainCustomer?.trim() ||
      !data.customerProblem?.trim() ||
      !data.differentFromCompetitors?.trim() ||
      !data.brandWords?.trim() ||
      !data.approvalPerson?.trim() ||
      !data.approvalTime ||
      !data.submittedAt
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send to n8n webhook
    const n8nWebhookUrl = process.env.N8N_BRAND_FORM_WEBHOOK;

    if (!n8nWebhookUrl) {
      console.error("N8N_BRAND_FORM_WEBHOOK environment variable is not set");
      return NextResponse.json(
        { success: false, message: "Form submission service is not configured. Please contact support." },
        { status: 500 }
      );
    }

    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!n8nResponse.ok) {
      const responseText = await n8nResponse.text();
      console.error(`n8n webhook error: ${n8nResponse.status} ${n8nResponse.statusText}`, responseText);
      return NextResponse.json(
        { success: false, message: "Failed to submit form to workflow. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Form submitted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[brand-form] Error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while submitting the form" },
      { status: 500 }
    );
  }
}

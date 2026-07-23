import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const webhook = process.env.N8N_JOB_FORM_WEBHOOK ||
      'https://automation-sajeeb.app.n8n.cloud/webhook/1021c629-96c5-4d42-ba26-29f27915d5f4';
    const res = await fetch(webhook, {
      method: 'POST',
      body: formData,
    });

    // Read response text for better debugging (n8n may return HTML or plain text)
    const resText = await res.text();

    // Log webhook response for server-side debugging
    // eslint-disable-next-line no-console
    console.log('[JobApplication API] webhook response status:', res.status);
    // eslint-disable-next-line no-console
    console.log('[JobApplication API] webhook response body:', resText);

    if (res.ok) {
      return NextResponse.json(
        { success: true, message: resText || 'Application submitted successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: resText || 'Webhook returned an error' },
        { status: res.status }
      );
    }
  } catch (error) {
    console.error('[JobApplication API] Form submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong, please try again.' },
      { status: 500 }
    );
  }
}

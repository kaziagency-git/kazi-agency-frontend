'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import { CheckCircle2, ClipboardList } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { OnboardingFormComponent } from '@/components/onboarding/onboarding-form';
import { publicGetOnboardingForm, publicUpdateOnboardingForm } from '@/lib/client-api';
import type { OnboardingForm, OnboardingFormData } from '@/lib/client-api';
import { toast } from 'sonner';

export default function PublicOnboardingPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = use(params);
  const [form, setForm] = useState<OnboardingForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    publicGetOnboardingForm(token)
      .then(({ form }) => setForm(form))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleSave(data: Partial<OnboardingFormData>) {
    setSaving(true);
    try {
      const { form: updated } = await publicUpdateOnboardingForm(token, data);
      setForm(updated);
      setSaved(true);
      toast.success('Your information has been saved!');
      setTimeout(() => setSaved(false), 5000);
    } catch (err: any) {
      toast.error(err.message ?? 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/60 bg-card">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar shrink-0">
            <span className="text-sm font-bold text-white">K</span>
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">Kazi Agency</p>
            <p className="text-xs text-muted-foreground mt-0.5">Pre-Launch Information</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <div className="space-y-3 mt-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
        ) : notFound ? (
          <div className="text-center py-20 space-y-3">
            <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto" />
            <h1 className="text-xl font-semibold">Form not found</h1>
            <p className="text-sm text-muted-foreground">
              This link may be invalid or expired. Please contact your account manager.
            </p>
          </div>
        ) : form ? (
          <>
            {/* Title & description */}
            <div className="space-y-3">
              <h1 className="text-2xl font-bold tracking-tight">Pre-Launch Onboarding Form</h1>
              <div className="p-4 rounded-lg bg-muted/50 border border-border/60 text-sm text-muted-foreground space-y-2">
                <p>
                  Welcome aboard! Please fill in the details below so our team can set up your
                  website, analytics, social channels and compliance correctly before launch. If you
                  don't have something yet, just leave it blank or note{' '}
                  <em>'don't have it'</em> — we'll help you create it.
                </p>
                <p>
                  <strong className="text-foreground">Tip:</strong> for any access where you'd
                  rather invite us than share a login, send the invite to:{' '}
                  <span className="font-medium text-foreground">admin@kaziagency.com</span>
                </p>
              </div>
            </div>

            {/* Saved banner */}
            {saved && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Your information has been saved. You can return to this link anytime to update it.
              </div>
            )}

            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-2">
                <p className="text-xs text-muted-foreground">
                  Last updated:{' '}
                  {form.updatedAt
                    ? new Date(form.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Never'}
                </p>
              </CardHeader>
              <CardContent>
                <OnboardingFormComponent
                  form={form}
                  onSave={handleSave}
                  saving={saving}
                  readOnlyEmail
                />
              </CardContent>
            </Card>
          </>
        ) : null}
      </div>
    </div>
  );
}

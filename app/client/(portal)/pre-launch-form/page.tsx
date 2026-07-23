'use client';

import { useEffect, useState } from 'react';
import { ClipboardList, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { OnboardingFormComponent } from '@/components/onboarding/onboarding-form';
import {
  clientGetOnboardingForm,
  clientUpdateOnboardingForm,
  type OnboardingForm,
  type OnboardingFormData,
} from '@/lib/client-api';
import { toast } from 'sonner';

export default function ClientOnboardingPage() {
  const [form, setForm] = useState<OnboardingForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    clientGetOnboardingForm()
      .then(({ form }) => setForm(form))
      .catch(() => toast.error('Failed to load form. Please refresh.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(data: Partial<OnboardingFormData>) {
    setSaving(true);
    try {
      const { form: updated } = await clientUpdateOnboardingForm(data);
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
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-bold tracking-tight flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-muted-foreground" />
          Pre-Launch Information
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Share your details so we can set everything up correctly before launch.
        </p>
      </div>

      {loading ? (
        <Card className="border-border/60">
          <CardContent className="p-6 space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </CardContent>
        </Card>
      ) : form ? (
        <>
          <div className="p-4 rounded-lg bg-muted/50 border border-border/60 text-sm text-muted-foreground space-y-2">
            <p>
              Please fill in the details below so our team can set up your website, analytics,
              social channels and compliance correctly before launch. If you don't have something
              yet, just leave it blank or note <em>'don't have it'</em> — we'll help you create it.
            </p>
            <p>
              <strong className="text-foreground">Tip:</strong> for any access where you'd rather
              invite us than share a login, send the invite to:{' '}
              <span className="font-medium text-foreground">admin@kaziagency.com</span>
            </p>
          </div>

          {saved && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Your information has been saved. You can come back and update it anytime.
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
  );
}

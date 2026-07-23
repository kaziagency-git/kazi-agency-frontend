'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ClipboardList, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { OnboardingFormComponent } from '@/components/onboarding/onboarding-form';
import {
  adminGetOnboardingForm,
  adminUpdateOnboardingForm,
  adminRegenerateOnboardingToken,
  type OnboardingForm,
  type OnboardingFormData,
} from '@/lib/client-api';
import { toast } from 'sonner';

export default function AdminOnboardingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [form, setForm] = useState<OnboardingForm | null>(null);
  const [shareLink, setShareLink] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminGetOnboardingForm(id)
      .then(({ form, shareLink }) => {
        setForm(form);
        setShareLink(shareLink);
      })
      .catch(() => {
        toast.error('Form not found');
        router.push('/admin/pre-launch-form');
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  async function handleSave(data: Partial<OnboardingFormData>) {
    setSaving(true);
    try {
      const { form: updated } = await adminUpdateOnboardingForm(id, data);
      setForm(updated);
      toast.success('Form saved');
    } catch (err: any) {
      toast.error(err.message ?? 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  async function handleRegenerateLink() {
    try {
      const { shareLink: newLink } = await adminRegenerateOnboardingToken(id);
      setShareLink(newLink);
      await navigator.clipboard.writeText(newLink);
      toast.success('New share link generated and copied');
    } catch {
      toast.error('Failed to regenerate link');
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button asChild size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Link href="/admin/pre-launch-form">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-muted-foreground" />
              Pre-Launch Form
            </h1>
            {form && (
              <p className="text-sm text-muted-foreground mt-0.5">{form.email}</p>
            )}
          </div>
        </div>
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
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {form.lastEditedBy
                ? `Last edited by ${form.lastEditedBy} · ${new Date(form.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`
                : `Created ${new Date(form.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
            </CardTitle>
            {form.lastEditedBy && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                form.lastEditedBy === 'admin'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                {form.lastEditedBy} edited
              </span>
            )}
          </CardHeader>
          <CardContent>
            <OnboardingFormComponent
              form={form}
              onSave={handleSave}
              saving={saving}
              shareLink={shareLink}
              onRegenerateLink={handleRegenerateLink}
              readOnlyEmail
            />
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

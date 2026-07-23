'use client';

import { useState } from 'react';
import { Save, Copy, Check, RefreshCw, Info, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { OnboardingForm as IOnboardingForm, OnboardingFormData } from '@/lib/client-api';

interface Props {
  form: IOnboardingForm;
  onSave: (data: Partial<OnboardingFormData>) => Promise<void>;
  saving?: boolean;
  shareLink?: string;
  onRegenerateLink?: () => Promise<void>;
  readOnlyEmail?: boolean;
}

const GOOGLE_TOOLS = [
  { value: 'Google Search Console', label: 'Google Search Console' },
  { value: 'Google Analytics (GA4)', label: 'Google Analytics (GA4)' },
  { value: 'Google Tag Manager', label: 'Google Tag Manager' },
  { value: 'None yet — please set them up for us', label: 'None yet — please set them up for us' },
];

const COMMS_CHANNELS = [
  { value: 'email', label: 'Email' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'phone', label: 'Phone call' },
  { value: 'other', label: 'Other (note below)' },
];

const THEMES = [
  { value: 'dark', label: 'Dark theme (recommended for casino)' },
  { value: 'light', label: 'Light theme' },
  { value: 'both', label: 'Both / not sure — advise us' },
];

const CRM_OPTIONS = [
  { value: 'gohighlevel', label: 'GoHighLevel' },
  { value: 'other', label: 'Other (note below)' },
  { value: 'none', label: 'None yet — please set up' },
];

function SectionHeader({ num, title, description }: { num: string; title: string; description?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
          {num}
        </span>
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground ml-10">{description}</p>
      )}
    </div>
  );
}

function FieldRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('space-y-1.5', className)}>{children}</div>;
}

function HelperText({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground">{children}</p>;
}

export function OnboardingFormComponent({ form, onSave, saving, shareLink, onRegenerateLink, readOnlyEmail }: Props) {
  const isAdmin = shareLink !== undefined;

  const [data, setData] = useState<OnboardingFormData>({
    companyName: form.companyName ?? '',
    primaryContact: form.primaryContact ?? '',
    bestContactEmail: form.bestContactEmail ?? '',
    phoneContact: form.phoneContact ?? '',
    preferredCommsChannel: form.preferredCommsChannel ?? '',
    websiteDomain: form.websiteDomain ?? '',
    targetLaunchDate: form.targetLaunchDate ?? '',
    logoAssetsLink: form.logoAssetsLink ?? '',
    primaryBrandColor: form.primaryBrandColor ?? '',
    secondaryColor: form.secondaryColor ?? '',
    accentColor: form.accentColor ?? '',
    preferredTheme: form.preferredTheme ?? '',
    preferredHeadingFont: form.preferredHeadingFont ?? '',
    preferredBodyFont: form.preferredBodyFont ?? '',
    referenceSites: form.referenceSites ?? '',
    brandGuidelinesLink: form.brandGuidelinesLink ?? '',
    domainRegistrar: form.domainRegistrar ?? '',
    hostingProvider: form.hostingProvider ?? '',
    githubUsernames: form.githubUsernames ?? '',
    existingSiteCmsAccess: form.existingSiteCmsAccess ?? '',
    googleAccountEmail: form.googleAccountEmail ?? '',
    googleToolsExisting: form.googleToolsExisting ?? [],
    googleAccessNotes: form.googleAccessNotes ?? '',
    telegram: form.telegram ?? '',
    facebookMeta: form.facebookMeta ?? '',
    instagram: form.instagram ?? '',
    twitter: form.twitter ?? '',
    tiktok: form.tiktok ?? '',
    youtube: form.youtube ?? '',
    linkedin: form.linkedin ?? '',
    crmType: form.crmType ?? '',
    crmAccessDetails: form.crmAccessDetails ?? '',
    additionalNotes: form.additionalNotes ?? '',
    customFields: form.customFields ?? [],
  });

  function addCustomField() {
    setData((prev) => ({
      ...prev,
      customFields: [...(prev.customFields ?? []), { label: '', value: '', addedBy: 'admin' as const }],
    }));
  }

  function updateCustomField(idx: number, patch: { label?: string; value?: string }) {
    setData((prev) => ({
      ...prev,
      customFields: (prev.customFields ?? []).map((f, i) => i === idx ? { ...f, ...patch } : f),
    }));
  }

  function removeCustomField(idx: number) {
    setData((prev) => ({
      ...prev,
      customFields: (prev.customFields ?? []).filter((_, i) => i !== idx),
    }));
  }

  const [linkCopied, setLinkCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  function set(field: keyof OnboardingFormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  function toggleGoogleTool(value: string) {
    setData((prev) => {
      const tools = prev.googleToolsExisting ?? [];
      return {
        ...prev,
        googleToolsExisting: tools.includes(value)
          ? tools.filter((t) => t !== value)
          : [...tools, value],
      };
    });
  }

  async function handleSave() {
    await onSave(data);
  }

  async function copyShareLink() {
    if (!shareLink) return;
    await navigator.clipboard.writeText(shareLink);
    setLinkCopied(true);
    toast.success('Share link copied to clipboard');
    setTimeout(() => setLinkCopied(false), 2500);
  }

  async function handleRegenerateLink() {
    if (!onRegenerateLink) return;
    setRegenerating(true);
    try {
      await onRegenerateLink();
    } finally {
      setRegenerating(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Share link bar — admin only */}
      {shareLink && (
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center p-3 rounded-lg border border-border/60 bg-muted/40">
          <Info className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-sm text-muted-foreground flex-1 break-all">{shareLink}</p>
          <div className="flex gap-2 shrink-0">
            <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs" onClick={copyShareLink}>
              {linkCopied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {linkCopied ? 'Copied' : 'Copy link'}
            </Button>
            {onRegenerateLink && (
              <Button size="sm" variant="ghost" className="h-8 gap-1.5 text-xs text-muted-foreground" onClick={handleRegenerateLink} disabled={regenerating}>
                <RefreshCw className={cn('h-3.5 w-3.5', regenerating && 'animate-spin')} />
                Regenerate
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Email (read-only identifier) */}
      <FieldRow>
        <Label>Email <span className="text-destructive">*</span></Label>
        <Input value={form.email} readOnly disabled className="bg-muted/50" placeholder="Valid email" />
      </FieldRow>

      <Separator />

      {/* Section 1 */}
      <div>
        <SectionHeader num="1" title="Client & Business Information" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FieldRow>
            <Label>Company / Brand name</Label>
            <Input value={data.companyName} onChange={(e) => set('companyName', e.target.value)} placeholder="Your company or brand name" />
          </FieldRow>

          <FieldRow>
            <Label>Primary contact person (full name) <span className="text-destructive">*</span></Label>
            <Input value={data.primaryContact} onChange={(e) => set('primaryContact', e.target.value)} placeholder="Full name" />
          </FieldRow>

          <FieldRow>
            <Label>Best contact email</Label>
            <Input type="email" value={data.bestContactEmail} onChange={(e) => set('bestContactEmail', e.target.value)} placeholder="contact@yourbrand.com" />
          </FieldRow>

          <FieldRow>
            <Label>Phone / WhatsApp / Telegram for quick contact</Label>
            <Input value={data.phoneContact} onChange={(e) => set('phoneContact', e.target.value)} placeholder="+1 555 000 0000" />
          </FieldRow>

          <FieldRow>
            <Label>Live website domain</Label>
            <Input value={data.websiteDomain} onChange={(e) => set('websiteDomain', e.target.value)} placeholder="yourbrand.com" />
            <HelperText>e.g. yourbrand.com</HelperText>
          </FieldRow>

          <FieldRow>
            <Label>Target launch date (approx.)</Label>
            <Input value={data.targetLaunchDate} onChange={(e) => set('targetLaunchDate', e.target.value)} placeholder="e.g. July 2025" />
            <HelperText>Even a rough month is fine.</HelperText>
          </FieldRow>
        </div>

        <FieldRow className="mt-5">
          <Label>Preferred communication channel</Label>
          <RadioGroup
            value={data.preferredCommsChannel}
            onValueChange={(v) => set('preferredCommsChannel', v)}
            className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1"
          >
            {COMMS_CHANNELS.map((opt) => (
              <label
                key={opt.value}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm cursor-pointer transition-colors',
                  data.preferredCommsChannel === opt.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-muted-foreground/40'
                )}
              >
                <RadioGroupItem value={opt.value} id={`comms-${opt.value}`} />
                {opt.label}
              </label>
            ))}
          </RadioGroup>
        </FieldRow>
      </div>

      <Separator />

      {/* Section 2 */}
      <div>
        <SectionHeader num="2" title="Brand & Design Assets" description="This drives the UI/UX work: color palette, fonts and overall look." />
        <div className="space-y-5">
          <FieldRow>
            <Label>Link to your logo files / brand assets</Label>
            <Textarea value={data.logoAssetsLink} onChange={(e) => set('logoAssetsLink', e.target.value)} rows={2} placeholder="https://drive.google.com/..." />
            <HelperText>Paste a Google Drive / Dropbox link (set sharing to 'anyone with link'). Vector formats (SVG/AI/EPS) preferred, plus PNG.</HelperText>
          </FieldRow>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <FieldRow>
              <Label>Primary brand color (HEX)</Label>
              <Input value={data.primaryBrandColor} onChange={(e) => set('primaryBrandColor', e.target.value)} placeholder="#0E0E12" />
              <HelperText>Your main background / base color.</HelperText>
            </FieldRow>
            <FieldRow>
              <Label>Secondary color (HEX)</Label>
              <Input value={data.secondaryColor} onChange={(e) => set('secondaryColor', e.target.value)} placeholder="#1A1A2E" />
            </FieldRow>
            <FieldRow>
              <Label>Accent color (HEX)</Label>
              <Input value={data.accentColor} onChange={(e) => set('accentColor', e.target.value)} placeholder="#FFD700" />
              <HelperText>Usually the gold / neon highlight used for CTAs.</HelperText>
            </FieldRow>
          </div>

          <FieldRow>
            <Label>Preferred theme</Label>
            <RadioGroup
              value={data.preferredTheme}
              onValueChange={(v) => set('preferredTheme', v)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1"
            >
              {THEMES.map((opt) => (
                <label
                  key={opt.value}
                  className={cn(
                    'flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm cursor-pointer transition-colors',
                    data.preferredTheme === opt.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-muted-foreground/40'
                  )}
                >
                  <RadioGroupItem value={opt.value} id={`theme-${opt.value}`} />
                  {opt.label}
                </label>
              ))}
            </RadioGroup>
          </FieldRow>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FieldRow>
              <Label>Preferred heading font (if any)</Label>
              <Input value={data.preferredHeadingFont} onChange={(e) => set('preferredHeadingFont', e.target.value)} placeholder="e.g. Playfair Display" />
              <HelperText>Leave blank if you'd like us to recommend one.</HelperText>
            </FieldRow>
            <FieldRow>
              <Label>Preferred body font (if any)</Label>
              <Input value={data.preferredBodyFont} onChange={(e) => set('preferredBodyFont', e.target.value)} placeholder="e.g. Inter" />
            </FieldRow>
          </div>

          <FieldRow>
            <Label>Reference sites / competitors you like</Label>
            <Textarea value={data.referenceSites} onChange={(e) => set('referenceSites', e.target.value)} rows={3} placeholder="https://example.com — I like their color palette and card layout..." />
            <HelperText>Helps us match the vibe you're going for.</HelperText>
          </FieldRow>

          <FieldRow>
            <Label>Existing brand guidelines link (if you have one)</Label>
            <Textarea value={data.brandGuidelinesLink} onChange={(e) => set('brandGuidelinesLink', e.target.value)} rows={2} placeholder="https://..." />
          </FieldRow>
        </div>
      </div>

      <Separator />

      {/* Section 3 */}
      <div>
        <SectionHeader num="3" title="Website Access" description="Needed to build, deploy and point your domain. Share a login or send an invite to our team email." />
        <div className="space-y-5">
          <FieldRow>
            <Label>Domain registrar — provider + how we get access</Label>
            <Textarea value={data.domainRegistrar} onChange={(e) => set('domainRegistrar', e.target.value)} rows={2} placeholder="e.g. GoDaddy — I'll invite admin@kaziagency.com as a delegate" />
            <HelperText>e.g. GoDaddy / Namecheap. Note the login email or that you'll invite us.</HelperText>
          </FieldRow>
          <FieldRow>
            <Label>Hosting provider — provider + access details</Label>
            <Textarea value={data.hostingProvider} onChange={(e) => set('hostingProvider', e.target.value)} rows={2} placeholder="e.g. Vercel — invite admin@kaziagency.com to the team" />
          </FieldRow>
          <FieldRow>
            <Label>GitHub username(s) to invite to the repo</Label>
            <Input value={data.githubUsernames} onChange={(e) => set('githubUsernames', e.target.value)} placeholder="e.g. myusername" />
            <HelperText>If the project lives on GitHub. We'll send a collaborator invite.</HelperText>
          </FieldRow>
          <FieldRow>
            <Label>Any existing site / CMS / admin panel access</Label>
            <Textarea value={data.existingSiteCmsAccess} onChange={(e) => set('existingSiteCmsAccess', e.target.value)} rows={3} placeholder="URL + login instructions..." />
            <HelperText>URL + how to log in, if a site already exists.</HelperText>
          </FieldRow>
        </div>
      </div>

      <Separator />

      {/* Section 4 */}
      <div>
        <SectionHeader num="4" title="Google & Analytics Access" description="For SEO and tracking. Easiest path: give us the Google account email, OR send an invite from each tool to our team email." />
        <div className="space-y-5">
          <FieldRow>
            <Label>Google account email we should request access from / be invited by</Label>
            <Input type="email" value={data.googleAccountEmail} onChange={(e) => set('googleAccountEmail', e.target.value)} placeholder="yourname@gmail.com" />
          </FieldRow>
          <FieldRow>
            <Label>Which Google tools already exist?</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              {GOOGLE_TOOLS.map((tool) => (
                <label
                  key={tool.value}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm cursor-pointer transition-colors',
                    (data.googleToolsExisting ?? []).includes(tool.value)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-muted-foreground/40'
                  )}
                >
                  <Checkbox
                    checked={(data.googleToolsExisting ?? []).includes(tool.value)}
                    onCheckedChange={() => toggleGoogleTool(tool.value)}
                  />
                  {tool.label}
                </label>
              ))}
            </div>
          </FieldRow>
          <FieldRow>
            <Label>Notes on Google access</Label>
            <Textarea value={data.googleAccessNotes} onChange={(e) => set('googleAccessNotes', e.target.value)} rows={2} placeholder="Property IDs, account owner, or anything we should know..." />
            <HelperText>Property IDs, account owner, or anything we should know.</HelperText>
          </FieldRow>
        </div>
      </div>

      <Separator />

      {/* Section 5 */}
      <div>
        <SectionHeader num="5" title="Social Media Accounts" description="Tell us what exists and how we get access. Leave blank = please create it." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {(
            [
              { field: 'telegram' as const, label: 'Telegram', hint: "Existing? Paste the channel/group link + admin access. If not, write 'please create'." },
              { field: 'facebookMeta' as const, label: 'Facebook / Meta Business', hint: "Existing? Paste the page link + Business Manager access. If not, write 'please create'." },
              { field: 'instagram' as const, label: 'Instagram', hint: "Existing? Paste the handle + access. If not, write 'please create'." },
              { field: 'twitter' as const, label: 'X (Twitter)', hint: "Existing? Paste the handle + access. If not, write 'please create'." },
              { field: 'tiktok' as const, label: 'TikTok', hint: "Existing? Paste the handle + access. If not, write 'please create'." },
              { field: 'youtube' as const, label: 'YouTube', hint: "Existing? Paste the channel link + access. If not, write 'please create'." },
              { field: 'linkedin' as const, label: 'LinkedIn', hint: "Existing? Paste the page link + access. If not, write 'please create'." },
            ] as { field: keyof OnboardingFormData; label: string; hint: string }[]
          ).map(({ field, label, hint }) => (
            <FieldRow key={field}>
              <Label>{label}</Label>
              <Textarea
                value={data[field] as string}
                onChange={(e) => set(field, e.target.value)}
                rows={2}
                placeholder={hint}
              />
            </FieldRow>
          ))}
        </div>
      </div>

      <Separator />

      {/* Section 6 */}
      <div>
        <SectionHeader num="6" title="CRM" />
        <div className="space-y-5">
          <FieldRow>
            <Label>Do you use a CRM?</Label>
            <RadioGroup
              value={data.crmType}
              onValueChange={(v) => set('crmType', v)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1"
            >
              {CRM_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={cn(
                    'flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm cursor-pointer transition-colors',
                    data.crmType === opt.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-muted-foreground/40'
                  )}
                >
                  <RadioGroupItem value={opt.value} id={`crm-${opt.value}`} />
                  {opt.label}
                </label>
              ))}
            </RadioGroup>
          </FieldRow>
          <FieldRow>
            <Label>CRM access details / which CRM (if you have)</Label>
            <Textarea value={data.crmAccessDetails} onChange={(e) => set('crmAccessDetails', e.target.value)} rows={3} placeholder="Login URL, credentials or invite instructions..." />
          </FieldRow>
        </div>
      </div>

      <Separator />

      {/* Section 7 */}
      <div>
        <SectionHeader num="7" title="Anything Else or Any other compliance requirements or regions to be careful about" />
        <FieldRow>
          <Label>Additional notes, goals, or special requests</Label>
          <Textarea value={data.additionalNotes} onChange={(e) => set('additionalNotes', e.target.value)} rows={5} placeholder="Any compliance requirements, regional restrictions, special requests, or anything else our team should know before we start..." />
        </FieldRow>
      </div>

      {/* Section 8 — Custom / Extra fields */}
      {(isAdmin || (data.customFields ?? []).some((f) => f.addedBy === 'admin' && f.label)) && (
        <>
          <Separator />
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">8</span>
                  <h2 className="text-base font-semibold tracking-tight">Additional Information</h2>
                </div>
                <p className="text-sm text-muted-foreground ml-10">
                  {isAdmin ? 'Add extra questions for the client to fill out.' : 'Please answer the questions below.'}
                </p>
              </div>
              {isAdmin && (
                <button
                  type="button"
                  onClick={addCustomField}
                  className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-primary/50 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Field
                </button>
              )}
            </div>

            {(data.customFields ?? []).length === 0 && isAdmin ? (
              <button
                type="button"
                onClick={addCustomField}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-border py-6 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
              >
                <Plus className="h-4 w-4" /> Click to add the first custom question
              </button>
            ) : (
              <div className="space-y-4">
                {isAdmin && (
                  <div className="grid grid-cols-[1fr_1fr_auto] gap-2 pb-1 border-b border-border/60">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-1">Question / Label</p>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-1">Client's Answer</p>
                    <span />
                  </div>
                )}
                {(data.customFields ?? [])
                  .filter((f) => isAdmin || (f.addedBy === 'admin' && f.label))
                  .map((field, idx) => (
                    isAdmin ? (
                      <div key={field._id ?? idx} className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                        <Input
                          value={field.label}
                          onChange={(e) => updateCustomField(idx, { label: e.target.value })}
                          placeholder="e.g. What is your monthly budget?"
                          className="h-9 text-sm"
                        />
                        <Input
                          value={field.value}
                          readOnly
                          className="h-9 text-sm bg-muted/40 text-muted-foreground"
                          placeholder="(client fills this)"
                        />
                        <button
                          type="button"
                          onClick={() => removeCustomField(idx)}
                          className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <FieldRow key={field._id ?? idx}>
                        <Label>{field.label}</Label>
                        <Input
                          value={field.value}
                          onChange={(e) => updateCustomField(idx, { value: e.target.value })}
                          placeholder="Your answer…"
                          className="h-9"
                        />
                      </FieldRow>
                    )
                  ))}
                {isAdmin && (data.customFields ?? []).length > 0 && (
                  <button
                    type="button"
                    onClick={addCustomField}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add another
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {/* Save button */}
      <div className="flex items-center justify-end pt-2 pb-6">
        <Button onClick={handleSave} disabled={saving} className="min-w-32 gap-2">
          {saving ? (
            <><RefreshCw className="h-4 w-4 animate-spin" /> Saving…</>
          ) : (
            <><Save className="h-4 w-4" /> Save Progress</>
          )}
        </Button>
      </div>
    </div>
  );
}

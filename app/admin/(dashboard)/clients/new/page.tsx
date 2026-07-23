'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createAdminClient } from '@/lib/client-api';
import { AGENCY_SERVICES } from '@/lib/services-list';

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [setupLink, setSetupLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    services: [] as string[], accountManager: '', adminNotes: '',
  });

  function set(key: string, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function toggleService(s: string) {
    setForm((p) => ({
      ...p,
      services: p.services.includes(s) ? p.services.filter((x) => x !== s) : [...p.services, s],
    }));
  }

  async function copyLink() {
    if (!setupLink) return;
    await navigator.clipboard.writeText(setupLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await createAdminClient({ ...form, source: 'manual' });
      setSetupLink(result.setupLink);
      toast.success('Client created! Copy the setup link to share with them.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create client');
    } finally {
      setLoading(false);
    }
  }

  if (setupLink) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto" />
          <h1 className="text-xl font-bold">Client Created Successfully!</h1>
          <p className="text-muted-foreground text-sm">
            Share this link with <strong>{form.name}</strong> so they can set their password and access the portal.
            The link expires in <strong>48 hours</strong>.
          </p>
        </div>

        <Card className="border-border/60 shadow-sm">
          <CardContent className="pt-5 space-y-3">
            <Label>Setup Link (for n8n or email)</Label>
            <div className="flex gap-2">
              <Input value={setupLink} readOnly className="font-mono text-xs" />
              <Button variant="outline" size="icon" onClick={copyLink} className="shrink-0">
                {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              This link can also be passed to n8n as a field in the automation workflow.
            </p>
          </CardContent>
        </Card>

        <div className="flex gap-3 justify-center">
          <Button asChild>
            <Link href="/admin/clients">View All Clients</Link>
          </Button>
          <Button variant="outline" onClick={() => { setSetupLink(null); setForm({ name: '', email: '', phone: '', company: '', services: [], accountManager: '', adminNotes: '' }); }}>
            Add Another Client
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/admin/clients"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Add Client</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Create a new client portal account</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-border/60 shadow-sm">
          <CardHeader><CardTitle className="text-base">Contact Info</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="John Smith" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="john@company.com" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+1 555 000 0000" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="company">Company</Label>
                <Input id="company" value={form.company} onChange={(e) => set('company', e.target.value)} placeholder="Acme Corp" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="accountManager">Account Manager</Label>
              <Input id="accountManager" value={form.accountManager} onChange={(e) => set('accountManager', e.target.value)} placeholder="Team member name" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader><CardTitle className="text-base">Services</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {AGENCY_SERVICES.map((s) => (
                <button
                  key={s} type="button"
                  onClick={() => toggleService(s)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${form.services.includes(s) ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary/50'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader><CardTitle className="text-base">Internal Notes</CardTitle></CardHeader>
          <CardContent>
            <Textarea
              value={form.adminNotes} onChange={(e) => set('adminNotes', e.target.value)}
              placeholder="Notes visible only to admin…" rows={3}
            />
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating…</>
            ) : 'Create Client & Get Setup Link'}
          </Button>
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/clients">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}

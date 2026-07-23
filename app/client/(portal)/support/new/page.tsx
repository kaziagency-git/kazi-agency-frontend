'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Loader2, ArrowLeft, Paperclip, X, FileText, ImageIcon, File as FileIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { createTicket, uploadFiles, TicketAttachment } from '@/lib/client-api';

function fileIcon(mimetype: string) {
  if (mimetype.startsWith('image/')) return <ImageIcon className="h-3.5 w-3.5" />;
  if (mimetype === 'application/pdf') return <FileText className="h-3.5 w-3.5" />;
  return <FileIcon className="h-3.5 w-3.5" />;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function NewTicketPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    subject: '',
    category: '',
    priority: 'Medium',
    message: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function set(key: string, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function addFiles(picked: FileList | null) {
    if (!picked) return;
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name + f.size));
      const next = Array.from(picked).filter((f) => !existing.has(f.name + f.size));
      return [...prev, ...next];
    });
  }

  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const hasMessage = form.message.replace(/<[^>]*>/g, '').trim().length > 0;
    if (!form.subject || !form.category) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (!hasMessage && files.length === 0) {
      toast.error('Please add a message or attach a file');
      return;
    }
    setLoading(true);
    try {
      let attachments: TicketAttachment[] = [];
      if (files.length > 0) {
        attachments = await uploadFiles(files);
      }
      const ticket = await createTicket({ ...form, attachments });
      toast.success('Ticket submitted successfully');
      router.push(`/client/support/${ticket._id}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create ticket');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/client/support"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div>
          <h1 className="text-xl font-bold tracking-tight">New Support Ticket</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Describe your issue and we'll get back to you</p>
        </div>
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Ticket Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject" required
                value={form.subject} onChange={(e) => set('subject', e.target.value)}
                placeholder="Brief description of your issue"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Category *</Label>
                <Select value={form.category} onValueChange={(v) => set('category', v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Technical', 'Billing', 'Reporting', 'Strategy', 'Other'].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>Priority</Label>
                <Select value={form.priority} onValueChange={(v) => set('priority', v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['Low', 'Medium', 'High', 'Urgent'].map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Message</Label>
              <RichTextEditor
                value={form.message}
                onChange={(html) => set('message', html)}
                placeholder="Describe your issue in detail…"
                disabled={loading}
              />
            </div>

            {/* Attachments */}
            <div className="space-y-2">
              <Label>Attachments</Label>

              {files.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {files.map((f, i) => (
                    <div
                      key={i}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2.5 py-1.5 text-xs max-w-[220px]"
                    >
                      {fileIcon(f.type)}
                      <span className="truncate">{f.name}</span>
                      <span className="shrink-0 text-muted-foreground">{formatBytes(f.size)}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="shrink-0 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
              >
                <Paperclip className="h-3.5 w-3.5" />
                {files.length > 0 ? 'Add more files' : 'Attach files'}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }}
              />
            </div>

            <div className="flex gap-3 pt-1">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{files.length > 0 ? 'Uploading…' : 'Submitting…'}</>
                ) : 'Submit Ticket'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/client/support">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  ArrowLeft, Send, Loader2, User, Building2, Hash,
  Paperclip, X, FileText, ImageIcon, File as FileIcon, Download,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import {
  getAdminTicket, adminReplyToTicket, updateTicketStatus, uploadFiles,
  Ticket, TicketAttachment,
} from '@/lib/client-api';

const statusStyles: Record<string, string> = {
  open: 'bg-blue-100 text-blue-700',
  'in-progress': 'bg-amber-100 text-amber-700',
  resolved: 'bg-emerald-100 text-emerald-700',
  closed: 'bg-gray-100 text-gray-600',
};

const priorityStyles: Record<string, string> = {
  Low: 'bg-gray-100 text-gray-600',
  Medium: 'bg-blue-100 text-blue-700',
  High: 'bg-orange-100 text-orange-700',
  Urgent: 'bg-red-100 text-red-700',
};

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

function AttachmentList({ attachments }: { attachments: TicketAttachment[] }) {
  if (!attachments?.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {attachments.map((a) => (
        <a
          key={a.url}
          href={a.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs hover:bg-muted transition-colors max-w-[200px]"
        >
          {fileIcon(a.mimetype)}
          <span className="truncate">{a.originalName}</span>
          <span className="shrink-0 text-muted-foreground">· {formatBytes(a.size)}</span>
          <Download className="h-3 w-3 shrink-0 text-muted-foreground" />
        </a>
      ))}
    </div>
  );
}

export default function AdminTicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getAdminTicket(id)
      .then(setTicket)
      .catch(() => toast.error('Ticket not found'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ticket?.messages]);

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

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    const hasContent = reply.replace(/<[^>]*>/g, '').trim().length > 0;
    if (!hasContent && files.length === 0) {
      toast.error('Write a message or attach a file');
      return;
    }
    setSending(true);
    try {
      let attachments: TicketAttachment[] = [];
      if (files.length > 0) {
        attachments = await uploadFiles(files);
      }
      const updated = await adminReplyToTicket(id, reply, attachments);
      setTicket(updated);
      setReply('');
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send reply');
    } finally {
      setSending(false);
    }
  }

  async function handleStatusChange(status: string) {
    try {
      const updated = await updateTicketStatus(id, status);
      setTicket(updated);
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/admin/tickets"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div className="flex-1 min-w-0">
          {loading ? <Skeleton className="h-6 w-48" /> : (
            <div className="min-w-0 space-y-0.5">
              {ticket?.ticketNumber && (
                <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-sm font-mono font-bold text-primary">
                  <Hash className="h-3.5 w-3.5" />{ticket.ticketNumber}
                </span>
              )}
              <h1 className="text-lg font-bold tracking-tight truncate">{ticket?.subject}</h1>
              <p className="text-xs text-muted-foreground">{ticket?.clientName} · {ticket?.clientEmail}</p>
            </div>
          )}
        </div>
        {ticket && (
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityStyles[ticket.priority]}`}>
              {ticket.priority}
            </span>
            <Select value={ticket.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="h-7 w-32 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {['open', 'in-progress', 'resolved', 'closed'].map((s) => (
                  <SelectItem key={s} value={s} className="text-xs capitalize">{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Messages */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">
            Conversation
            {ticket && <span className="text-muted-foreground text-xs font-normal ml-2">{ticket.category}</span>}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => <Skeleton key={i} className="h-20 w-full" />)}
            </div>
          ) : (
            <>
              {ticket!.messages.map((msg) => (
                <div key={msg._id} className={`flex gap-3 ${msg.sender === 'admin' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.sender === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {msg.sender === 'admin' ? <Building2 className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div className={`max-w-[75%] space-y-1 ${msg.sender === 'admin' ? 'items-end' : 'items-start'} flex flex-col`}>
                    {msg.content && (
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm prose prose-sm max-w-none ${msg.sender === 'admin' ? 'bg-primary text-primary-foreground rounded-tr-sm prose-invert' : 'bg-muted rounded-tl-sm'}`}
                        dangerouslySetInnerHTML={{ __html: msg.content }}
                      />
                    )}
                    <AttachmentList attachments={msg.attachments ?? []} />
                    <span className="text-xs text-muted-foreground px-1">
                      {msg.senderName} · {new Date(msg.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </>
          )}
        </CardContent>
      </Card>

      {/* Reply */}
      {ticket?.status !== 'closed' && (
        <Card className="border-border/60 shadow-sm">
          <CardContent className="pt-5">
            <form onSubmit={handleReply} className="space-y-3">
              <RichTextEditor
                value={reply}
                onChange={setReply}
                placeholder="Write a reply to the client…"
                disabled={sending}
              />

              {/* File list */}
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {files.map((f, i) => (
                    <div key={i} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2.5 py-1.5 text-xs max-w-[220px]">
                      {fileIcon(f.type)}
                      <span className="truncate">{f.name}</span>
                      <span className="shrink-0 text-muted-foreground">{formatBytes(f.size)}</span>
                      <button type="button" onClick={() => removeFile(i)} className="shrink-0 text-muted-foreground hover:text-destructive transition-colors">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={sending}
                >
                  <Paperclip className="h-3.5 w-3.5" />
                  Attach files
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => addFiles(e.target.files)}
                />
                <Button type="submit" disabled={sending}>
                  {sending ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending…</>
                  ) : (
                    <><Send className="mr-2 h-4 w-4" />Send Reply</>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

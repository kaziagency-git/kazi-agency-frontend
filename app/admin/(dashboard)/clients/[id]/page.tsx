'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  ArrowLeft, RefreshCw, Loader2, Plus, Trash2,
  Eye, EyeOff, KeyRound, ChevronDown, ChevronUp,
  CheckCircle2, Circle, Loader2 as SpinnerIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  getAdminClient, updateAdminClient, changeClientPassword, regenerateClientLink,
  addServiceProject, updateServiceProject, deleteServiceProject,
  addServiceMilestone, updateServiceMilestone, deleteServiceMilestone,
  AdminClient, ServiceProject,
} from '@/lib/client-api';
import { AGENCY_SERVICES } from '@/lib/services-list';

const serviceStatusStyles: Record<string, string> = {
  'not-started': 'bg-gray-100 text-gray-600',
  'in-progress': 'bg-amber-100 text-amber-700',
  completed: 'bg-emerald-100 text-emerald-700',
};

const msIcon: Record<string, React.ReactNode> = {
  completed: <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />,
  'in-progress': <SpinnerIcon className="h-4 w-4 text-amber-500 animate-spin shrink-0" />,
  pending: <Circle className="h-4 w-4 text-muted-foreground shrink-0" />,
};

const emptyMilestone = { title: '', description: '', status: 'pending', dueDate: '' };
const emptyServiceProject = {
  serviceName: '', status: 'not-started', currentPhase: '', progress: 0, startDate: '', notes: '',
};

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<AdminClient | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPw, setShowNewPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [changingPw, setChangingPw] = useState(false);

  // Service project accordion
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Partial<ServiceProject>>({});
  const [savingServiceId, setSavingServiceId] = useState<string | null>(null);

  // Add service form
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ ...emptyServiceProject });
  const [addingService, setAddingService] = useState(false);

  // Milestone form (keyed by serviceId)
  const [showMsForService, setShowMsForService] = useState<string | null>(null);
  const [newMilestone, setNewMilestone] = useState({ ...emptyMilestone });
  const [addingMs, setAddingMs] = useState(false);

  useEffect(() => {
    getAdminClient(id)
      .then(setClient)
      .catch(() => toast.error('Client not found'))
      .finally(() => setLoading(false));
  }, [id]);

  // ── Client info ────────────────────────────────────────────────────────────
  async function saveClient() {
    if (!client) return;
    setSaving(true);
    try {
      const updated = await updateAdminClient(id, {
        name: client.name, phone: client.phone, company: client.company,
        services: client.services, accountManager: client.accountManager,
        adminNotes: client.adminNotes, status: client.status,
      });
      setClient((prev) => ({ ...prev!, ...(updated as any) }));
      toast.success('Client updated');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  }

  async function handleRegenerateLink() {
    try {
      const { setupLink } = await regenerateClientLink(id);
      await navigator.clipboard.writeText(setupLink);
      toast.success('New setup link copied to clipboard');
    } catch {
      toast.error('Failed to regenerate link');
    }
  }

  // ── Password ───────────────────────────────────────────────────────────────
  async function handleChangePassword() {
    if (newPassword.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    if (newPassword !== confirmPassword) { toast.error('Passwords do not match'); return; }
    setChangingPw(true);
    try {
      await changeClientPassword(id, newPassword);
      setClient((prev) => prev ? {
        ...prev, hasPassword: true,
        status: prev.status === 'pending' ? 'active' : prev.status,
      } : prev);
      setNewPassword(''); setConfirmPassword('');
      setShowNewPw(false); setShowConfirmPw(false);
      toast.success('Password updated');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update password');
    } finally {
      setChangingPw(false);
    }
  }

  // ── Service project accordion ──────────────────────────────────────────────
  function toggleService(sp: ServiceProject) {
    if (openServiceId === sp._id) {
      setOpenServiceId(null);
      setEditDraft({});
      setShowMsForService(null);
    } else {
      setOpenServiceId(sp._id);
      setEditDraft({ ...sp });
      setShowMsForService(null);
    }
  }

  async function saveServiceProject(serviceId: string) {
    setSavingServiceId(serviceId);
    try {
      const updated = await updateServiceProject(id, serviceId, {
        status: editDraft.status as any,
        currentPhase: editDraft.currentPhase,
        progress: editDraft.progress,
        startDate: editDraft.startDate ?? null,
        notes: editDraft.notes,
      });
      setClient(updated);
      toast.success('Service updated');
    } catch {
      toast.error('Failed to save service');
    } finally {
      setSavingServiceId(null);
    }
  }

  async function handleAddService() {
    if (!newService.serviceName) { toast.error('Select a service'); return; }
    setAddingService(true);
    try {
      const updated = await addServiceProject(id, {
        serviceName: newService.serviceName,
        status: newService.status as any,
        currentPhase: newService.currentPhase,
        progress: newService.progress,
        startDate: newService.startDate || null,
        notes: newService.notes,
      });
      setClient(updated);
      setNewService({ ...emptyServiceProject });
      setShowAddService(false);
      toast.success('Service added');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to add service');
    } finally {
      setAddingService(false);
    }
  }

  async function handleDeleteService(serviceId: string) {
    try {
      const updated = await deleteServiceProject(id, serviceId);
      setClient(updated);
      if (openServiceId === serviceId) { setOpenServiceId(null); setEditDraft({}); }
      toast.success('Service removed');
    } catch {
      toast.error('Failed to remove service');
    }
  }

  // ── Milestones ─────────────────────────────────────────────────────────────
  async function handleAddMilestone(serviceId: string) {
    if (!newMilestone.title.trim()) return;
    setAddingMs(true);
    try {
      const updated = await addServiceMilestone(id, serviceId, {
        ...newMilestone,
        dueDate: newMilestone.dueDate || null,
      });
      setClient(updated);
      setNewMilestone({ ...emptyMilestone });
      setShowMsForService(null);
      toast.success('Milestone added');
    } catch {
      toast.error('Failed to add milestone');
    } finally {
      setAddingMs(false);
    }
  }

  async function handleMilestoneStatus(serviceId: string, milestoneId: string, status: string) {
    try {
      const updated = await updateServiceMilestone(id, serviceId, milestoneId, { status });
      setClient(updated);
    } catch {
      toast.error('Failed to update milestone');
    }
  }

  async function handleDeleteMilestone(serviceId: string, milestoneId: string) {
    try {
      const updated = await deleteServiceMilestone(id, serviceId, milestoneId);
      setClient(updated);
      toast.success('Milestone deleted');
    } catch {
      toast.error('Failed to delete milestone');
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 p-4 lg:p-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!client) return null;

  const usedServices = new Set(client.serviceProjects.map((sp) => sp.serviceName));

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/admin/clients"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight">{client.name}</h1>
          <p className="text-muted-foreground text-sm">{client.email}</p>
        </div>
        {client.status === 'pending' && (
          <Button size="sm" variant="outline" className="gap-1.5" onClick={handleRegenerateLink}>
            <RefreshCw className="h-3.5 w-3.5" /> Resend Link
          </Button>
        )}
      </div>

      {/* Client Info */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Client Info</CardTitle>
          <Button size="sm" onClick={saveClient} disabled={saving}>
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Save'}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={client.status} onValueChange={(v) => setClient({ ...client, status: v as any })}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent position="popper">
                  {['pending', 'active', 'inactive'].map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input value={client.phone} onChange={(e) => setClient({ ...client, phone: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Company</Label>
              <Input value={client.company} onChange={(e) => setClient({ ...client, company: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Account Manager</Label>
              <Input value={client.accountManager} onChange={(e) => setClient({ ...client, accountManager: e.target.value })} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Services</Label>
            <div className="flex flex-wrap gap-1.5 rounded-md border border-input bg-background px-3 py-2 min-h-9">
              {AGENCY_SERVICES.map((s) => {
                const active = client.services.includes(s);
                return (
                  <button
                    key={s} type="button"
                    onClick={() => setClient({
                      ...client,
                      services: active
                        ? client.services.filter((x) => x !== s)
                        : [...client.services, s],
                    })}
                    className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${active ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:border-primary/50'}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Admin Notes</Label>
            <Textarea value={client.adminNotes} rows={3} onChange={(e) => setClient({ ...client, adminNotes: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      {/* Account Credentials */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-muted-foreground" />
            Account Credentials
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={client.email} readOnly className="bg-muted/50 text-muted-foreground" />
            </div>
            <div className="space-y-1.5">
              <Label>Current Password</Label>
              <div className="flex h-9 items-center rounded-md border border-input bg-muted/50 px-3 text-sm text-muted-foreground">
                {client.hasPassword ? '••••••••••••' : 'No password set'}
              </div>
            </div>
          </div>
          <div className="rounded-md border border-dashed border-border p-4 space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Change Password</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>New Password</Label>
                <div className="relative">
                  <Input type={showNewPw ? 'text' : 'password'} value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} placeholder="Min. 8 characters" className="pr-9" />
                  <button type="button" onClick={() => setShowNewPw((v) => !v)} tabIndex={-1}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showNewPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Confirm Password</Label>
                <div className="relative">
                  <Input type={showConfirmPw ? 'text' : 'password'} value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter password" className="pr-9" />
                  <button type="button" onClick={() => setShowConfirmPw((v) => !v)} tabIndex={-1}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showConfirmPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
            <Button size="sm" onClick={handleChangePassword} disabled={changingPw || !newPassword || !confirmPassword}>
              {changingPw ? <><Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />Updating…</> : 'Update Password'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Service Projects */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Service Projects</CardTitle>
          <Button size="sm" variant="outline" onClick={() => { setShowAddService(true); setOpenServiceId(null); }}>
            <Plus className="h-3.5 w-3.5 mr-1" /> Add Service
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">

          {/* Add service form */}
          {showAddService && (
            <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-4 space-y-3">
              <p className="text-xs font-semibold text-primary uppercase tracking-wide">New Service Project</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5 col-span-2">
                  <Label>Service *</Label>
                  <Select value={newService.serviceName} onValueChange={(v) => setNewService({ ...newService, serviceName: v })}>
                    <SelectTrigger className="w-full"><SelectValue placeholder="Select a service…" /></SelectTrigger>
                    <SelectContent position="popper">
                      {AGENCY_SERVICES.map((s) => (
                        <SelectItem key={s} value={s} disabled={usedServices.has(s)}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Status</Label>
                  <Select value={newService.status} onValueChange={(v) => setNewService({ ...newService, status: v })}>
                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                    <SelectContent position="popper">
                      {['not-started', 'in-progress', 'completed'].map((s) => (
                        <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Start Date</Label>
                  <Input type="date" value={newService.startDate} onChange={(e) => setNewService({ ...newService, startDate: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Current Phase</Label>
                  <Input value={newService.currentPhase} placeholder="e.g. Onboarding"
                    onChange={(e) => setNewService({ ...newService, currentPhase: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Progress ({newService.progress}%)</Label>
                  <Input type="number" min={0} max={100} value={newService.progress}
                    onChange={(e) => setNewService({ ...newService, progress: Number(e.target.value) })} />
                </div>
                <div className="space-y-1.5 col-span-2">
                  <Label>Notes (visible to client)</Label>
                  <Textarea rows={2} value={newService.notes}
                    onChange={(e) => setNewService({ ...newService, notes: e.target.value })} />
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddService} disabled={addingService}>
                  {addingService ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Add Service'}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => { setShowAddService(false); setNewService({ ...emptyServiceProject }); }}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Service list */}
          {client.serviceProjects.length === 0 && !showAddService ? (
            <p className="text-sm text-muted-foreground text-center py-6">No service projects yet. Click "Add Service" to get started.</p>
          ) : (
            <div className="space-y-2">
              {client.serviceProjects.map((sp) => {
                const isOpen = openServiceId === sp._id;
                return (
                  <div key={sp._id} className="rounded-lg border border-border overflow-hidden">
                    {/* Accordion header — div instead of button to avoid nested <button> hydration error */}
                    <div
                      role="button"
                      tabIndex={0}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors cursor-pointer select-none"
                      onClick={() => toggleService(sp)}
                      onKeyDown={(e) => e.key === 'Enter' && toggleService(sp)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold">{sp.serviceName}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${serviceStatusStyles[sp.status]}`}>
                            {sp.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <Progress value={sp.progress} className="h-1.5 w-32" />
                          <span className="text-xs text-muted-foreground">{sp.progress}%</span>
                          {sp.currentPhase && (
                            <span className="text-xs text-muted-foreground truncate">· {sp.currentPhase}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button
                          size="icon" variant="ghost"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={(e) => { e.stopPropagation(); handleDeleteService(sp._id); }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                        {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    </div>

                    {/* Accordion body */}
                    {isOpen && (
                      <div className="border-t border-border bg-muted/20 p-4 space-y-4">
                        {/* Edit fields */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <Label>Status</Label>
                            <Select value={editDraft.status as string} onValueChange={(v) => setEditDraft({ ...editDraft, status: v as any })}>
                              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                              <SelectContent position="popper">
                                {['not-started', 'in-progress', 'completed'].map((s) => (
                                  <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1.5">
                            <Label>Start Date</Label>
                            <Input type="date"
                              value={editDraft.startDate ? editDraft.startDate.slice(0, 10) : ''}
                              onChange={(e) => setEditDraft({ ...editDraft, startDate: e.target.value })}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label>Current Phase</Label>
                            <Input value={editDraft.currentPhase ?? ''} placeholder="e.g. Onboarding"
                              onChange={(e) => setEditDraft({ ...editDraft, currentPhase: e.target.value })} />
                          </div>
                          <div className="space-y-1.5">
                            <Label>Progress ({editDraft.progress ?? 0}%)</Label>
                            <Input type="number" min={0} max={100} value={editDraft.progress ?? 0}
                              onChange={(e) => setEditDraft({ ...editDraft, progress: Number(e.target.value) })} />
                          </div>
                          <div className="col-span-2 space-y-1.5">
                            <Label>Notes (visible to client)</Label>
                            <Textarea rows={2} value={editDraft.notes ?? ''}
                              onChange={(e) => setEditDraft({ ...editDraft, notes: e.target.value })} />
                          </div>
                        </div>
                        <Progress value={editDraft.progress ?? 0} className="h-2" />
                        <Button size="sm" onClick={() => saveServiceProject(sp._id)} disabled={savingServiceId === sp._id}>
                          {savingServiceId === sp._id ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" /> : null}
                          Save Changes
                        </Button>

                        {/* Milestones */}
                        <div className="pt-2 border-t border-border/60 space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              Milestones ({sp.milestones.length})
                            </p>
                            <Button size="sm" variant="outline" className="h-6 text-xs px-2"
                              onClick={() => { setShowMsForService(showMsForService === sp._id ? null : sp._id); setNewMilestone({ ...emptyMilestone }); }}>
                              <Plus className="h-3 w-3 mr-1" /> Add
                            </Button>
                          </div>

                          {showMsForService === sp._id && (
                            <div className="rounded-md border border-dashed border-border p-3 space-y-2 bg-background">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1 col-span-2">
                                  <Label className="text-xs">Title *</Label>
                                  <Input className="h-8 text-sm" value={newMilestone.title}
                                    onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
                                    placeholder="Milestone title" />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs">Status</Label>
                                  <Select value={newMilestone.status} onValueChange={(v) => setNewMilestone({ ...newMilestone, status: v })}>
                                    <SelectTrigger className="h-8 w-full text-xs"><SelectValue /></SelectTrigger>
                                    <SelectContent position="popper">
                                      {['pending', 'in-progress', 'completed'].map((s) => (
                                        <SelectItem key={s} value={s} className="text-xs capitalize">{s}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs">Due Date</Label>
                                  <Input className="h-8 text-sm" type="date" value={newMilestone.dueDate}
                                    onChange={(e) => setNewMilestone({ ...newMilestone, dueDate: e.target.value })} />
                                </div>
                                <div className="space-y-1 col-span-2">
                                  <Label className="text-xs">Description</Label>
                                  <Input className="h-8 text-sm" value={newMilestone.description}
                                    onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                                    placeholder="Optional" />
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" className="h-7 text-xs" onClick={() => handleAddMilestone(sp._id)} disabled={addingMs}>
                                  {addingMs ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Add'}
                                </Button>
                                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setShowMsForService(null)}>Cancel</Button>
                              </div>
                            </div>
                          )}

                          {sp.milestones.length === 0 ? (
                            <p className="text-xs text-muted-foreground py-2 text-center">No milestones yet</p>
                          ) : (
                            <div className="space-y-1">
                              {sp.milestones.map((ms) => (
                                <div key={ms._id} className="flex items-center gap-2 py-1.5 px-1 rounded hover:bg-background/60 transition-colors">
                                  {msIcon[ms.status]}
                                  <p className="text-sm flex-1 min-w-0 truncate">{ms.title}</p>
                                  {ms.dueDate && (
                                    <span className="text-xs text-muted-foreground shrink-0">
                                      {new Date(ms.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                  )}
                                  <Select value={ms.status} onValueChange={(v) => handleMilestoneStatus(sp._id, ms._id, v)}>
                                    <SelectTrigger className="h-6 w-28 text-xs shrink-0"><SelectValue /></SelectTrigger>
                                    <SelectContent position="popper">
                                      {['pending', 'in-progress', 'completed'].map((s) => (
                                        <SelectItem key={s} value={s} className="text-xs capitalize">{s}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Button size="icon" variant="ghost"
                                    className="h-6 w-6 shrink-0 text-muted-foreground hover:text-destructive"
                                    onClick={() => handleDeleteMilestone(sp._id, ms._id)}>
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

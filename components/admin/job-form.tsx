'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Plus, X, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createJob, updateJob, type Job, type JobInput } from '@/lib/admin-api';

interface JobFormProps {
  initialData?: Job;
  mode: 'create' | 'edit';
}

const LEVELS = ['Entry-Level', 'Mid-Level', 'Senior', 'Lead'] as const;
const TYPES = ['Full-Time', 'Part-Time', 'Contract', 'Internship'] as const;

function ListEditor({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  function update(idx: number, val: string) {
    const next = [...items];
    next[idx] = val;
    onChange(next);
  }
  function remove(idx: number) {
    onChange(items.filter((_, i) => i !== idx));
  }
  function add() {
    onChange([...items, '']);
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <Input
              value={item}
              onChange={(e) => update(idx, e.target.value)}
              placeholder={placeholder}
              className="text-sm"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-10 w-10 shrink-0 text-muted-foreground hover:text-destructive"
              onClick={() => remove(idx)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" size="sm" onClick={add} className="gap-1.5">
        <Plus className="h-3.5 w-3.5" /> Add item
      </Button>
    </div>
  );
}

export function JobForm({ initialData, mode }: JobFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState(initialData?.title ?? '');
  const [department, setDepartment] = useState(initialData?.department ?? '');
  const [location, setLocation] = useState(initialData?.location ?? '');
  const [level, setLevel] = useState<string>(initialData?.level ?? 'Mid-Level');
  const [type, setType] = useState<string>(initialData?.type ?? 'Full-Time');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [responsibilities, setResponsibilities] = useState<string[]>(
    initialData?.responsibilities ?? ['']
  );
  const [requirements, setRequirements] = useState<string[]>(
    initialData?.requirements ?? ['']
  );
  const [benefits, setBenefits] = useState<string[]>(initialData?.benefits ?? ['']);
  const [isPublished, setIsPublished] = useState(initialData?.isPublished ?? false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !department || !location || !level || !type || !description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const body: JobInput = {
      title,
      department,
      location,
      level: level as Job['level'],
      type: type as Job['type'],
      description,
      responsibilities: responsibilities.filter(Boolean),
      requirements: requirements.filter(Boolean),
      benefits: benefits.filter(Boolean),
      isPublished,
    };

    setSaving(true);
    try {
      if (mode === 'create') {
        await createJob(body);
        toast.success('Job created successfully');
      } else {
        await updateJob(initialData!._id, body);
        toast.success('Job updated successfully');
      }
      router.push('/admin/jobs');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save job');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {mode === 'create' ? 'New Job Post' : 'Edit Job Post'}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {mode === 'create' ? 'Create a new job listing for the careers page.' : 'Update the job listing details.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving…</>
            ) : (
              <><Save className="mr-2 h-4 w-4" />{mode === 'create' ? 'Create Job' : 'Save Changes'}</>
            )}
          </Button>
        </div>
      </div>

      {/* Basic info */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="title">
              Job Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="department">
                Department <span className="text-destructive">*</span>
              </Label>
              <Input
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Engineering"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="location">
                Location <span className="text-destructive">*</span>
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Remote or New York, NY"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Level <span className="text-destructive">*</span></Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {LEVELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Job Type <span className="text-destructive">*</span></Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief overview of the role and what the candidate will do..."
              rows={4}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Lists */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Role Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ListEditor
            label="Responsibilities"
            items={responsibilities}
            onChange={setResponsibilities}
            placeholder="e.g. Design and build scalable APIs"
          />
          <Separator />
          <ListEditor
            label="Requirements"
            items={requirements}
            onChange={setRequirements}
            placeholder="e.g. 3+ years of React experience"
          />
          <Separator />
          <ListEditor
            label="Benefits"
            items={benefits}
            onChange={setBenefits}
            placeholder="e.g. Unlimited PTO"
          />
        </CardContent>
      </Card>

      {/* Publish */}
      <Card className="border-border/60 shadow-sm">
        <CardContent className="pt-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Publish on website</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Toggle to make this job visible on the public careers page.
              </p>
            </div>
            <Switch checked={isPublished} onCheckedChange={setIsPublished} />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

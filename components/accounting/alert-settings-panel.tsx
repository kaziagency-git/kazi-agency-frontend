'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle, Loader2, Plus, RotateCcw, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { EnumSelect } from '@/components/accounting/entity-select';
import {
  ACC_ALERT_DAYS_DEFAULTS,
  ACC_ALERT_DAYS_MAX,
  ACC_ALERT_DAY_MAX,
  ACC_ALERT_DAY_MIN,
  ACC_ALERT_TIMEZONES,
  ACC_ALERT_TYPE_META,
  AccAlertDaysField,
  alertDaysPreview,
  normalizeAlertDays,
  validateAlertDay,
  validateAlertDays,
} from '@/lib/accounting/alert-days';
import { AccAlertSettings, alertSettingsApi } from '@/lib/accounting/api';

/**
 * Configurable reminder days, one editor per alert kind.
 *
 * Validation comes from `lib/accounting/alert-days.ts` — the same module the
 * API validates against — so the inline errors here match what a save would
 * reject, and the admin never has to submit to find out.
 */

type DaysState = Record<AccAlertDaysField, number[]>;

export function AlertSettingsPanel() {
  const [saved, setSaved] = useState<AccAlertSettings | null>(null);
  const [days, setDays] = useState<DaysState | null>(null);
  const [timezone, setTimezone] = useState<string>(ACC_ALERT_TIMEZONES[0].value);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const settings = await alertSettingsApi.get();
      applySettings(settings);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Could not load alert settings');
    } finally {
      setLoading(false);
    }
  }, []);

  function applySettings(settings: AccAlertSettings) {
    setSaved(settings);
    setTimezone(settings.timezone);
    setDays({
      domainAlertDays: settings.domainAlertDays,
      hostingAlertDays: settings.hostingAlertDays,
      subscriptionAlertDays: settings.subscriptionAlertDays,
      invoiceOverdueAlertDays: settings.invoiceOverdueAlertDays,
    });
  }

  useEffect(() => {
    void load();
  }, [load]);

  function setField(field: AccAlertDaysField, next: number[]) {
    setDays((prev) => (prev ? { ...prev, [field]: normalizeAlertDays(next) } : prev));
  }

  // Blocks the save while any list is empty, over the cap or otherwise invalid.
  const blocking = days
    ? ACC_ALERT_TYPE_META.map((meta) => ({
        label: meta.label,
        problem: validateAlertDays(days[meta.field]),
      })).filter((r) => r.problem)
    : [];

  const dirty =
    !!days &&
    !!saved &&
    (timezone !== saved.timezone ||
      ACC_ALERT_TYPE_META.some(
        (meta) => days[meta.field].join(',') !== saved[meta.field].join(',')
      ));

  async function handleSave() {
    if (!days || blocking.length > 0) return;

    setSaving(true);
    try {
      applySettings(await alertSettingsApi.update({ ...days, timezone }));
      toast.success('Alert settings saved');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save alert settings');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {ACC_ALERT_TYPE_META.map((meta) => (
          <Card key={meta.field} className="border-border/60 shadow-sm">
            <CardContent className="pt-6 space-y-3">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (loadError || !days) {
    return (
      <Card className="border-destructive/40 shadow-sm">
        <CardContent className="pt-6 text-center space-y-3">
          <AlertTriangle className="h-5 w-5 text-destructive mx-auto" />
          <p className="text-sm font-medium">Could not load alert settings</p>
          <p className="text-xs text-muted-foreground">{loadError}</p>
          <Button variant="outline" size="sm" onClick={() => void load()}>
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-border/60 bg-muted/40 p-4">
        <p className="text-sm text-muted-foreground">
          Alerts are sent on exactly these days before the renewal or expiry date. The daily
          alert workflow must run every day for these to fire.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-5">
        {ACC_ALERT_TYPE_META.map((meta) => (
          <AlertDaysEditor
            key={meta.field}
            label={meta.label}
            description={meta.description}
            phrase={meta.preview}
            days={days[meta.field]}
            onChange={(next) => setField(meta.field, next)}
            onReset={() => setField(meta.field, [...ACC_ALERT_DAYS_DEFAULTS[meta.field]])}
          />
        ))}
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardContent className="pt-5 space-y-4">
          <div className="space-y-1.5 max-w-md">
            <Label htmlFor="alert-timezone">Timezone</Label>
            <EnumSelect
              id="alert-timezone"
              value={timezone}
              onChange={(v) => setTimezone(v ?? ACC_ALERT_TIMEZONES[0].value)}
              options={[...ACC_ALERT_TIMEZONES]}
            />
            <p className="text-xs text-muted-foreground">
              The zone the day countdown is measured in, so an alert lands on the right calendar
              day whatever time the workflow runs.
            </p>
          </div>

          {blocking.length > 0 && (
            <div className="rounded-md border border-destructive/40 bg-destructive/5 p-3 space-y-1">
              {blocking.map((row) => (
                <p key={row.label} className="text-xs text-destructive">
                  <strong>{row.label}:</strong> {row.problem}
                </p>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
            <p className="text-xs text-muted-foreground">
              {saved?.updatedAt
                ? `Last saved ${new Date(saved.updatedAt).toLocaleString()}`
                : 'Not saved yet — showing defaults.'}
            </p>
            <Button
              onClick={handleSave}
              disabled={saving || blocking.length > 0 || !dirty}
              className="sm:w-auto w-full"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── One alert kind ─────────────────────────────────────────────────────────

function AlertDaysEditor({
  label,
  description,
  phrase,
  days,
  onChange,
  onReset,
}: {
  label: string;
  description: string;
  phrase: string;
  days: number[];
  onChange: (next: number[]) => void;
  onReset: () => void;
}) {
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Shown under the chips once the list itself is unusable, e.g. emptied.
  const listError = validateAlertDays(days);

  function add() {
    const trimmed = draft.trim();
    if (!trimmed) {
      setError('Enter a number');
      return;
    }

    const value = Number(trimmed);
    const problem = validateAlertDay(value, days);
    if (problem) {
      setError(problem);
      return;
    }

    onChange([...days, value]);
    setDraft('');
    setError(null);
    // Keep the caret here so several days can be typed one after another.
    inputRef.current?.focus();
  }

  function remove(day: number) {
    onChange(days.filter((d) => d !== day));
    setError(null);
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{label}</CardTitle>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2 min-h-8">
          {days.length === 0 ? (
            <span className="text-xs text-muted-foreground italic self-center">
              No days set — add at least one.
            </span>
          ) : (
            days.map((day) => (
              <Badge
                key={day}
                variant="secondary"
                className="pl-2.5 pr-1 py-1 gap-1 text-xs font-medium"
              >
                {day}
                <button
                  type="button"
                  onClick={() => remove(day)}
                  aria-label={`Remove ${day} days`}
                  className="rounded-sm p-0.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          )}
        </div>

        <div className="flex items-start gap-2">
          <div className="flex-1 space-y-1">
            <Input
              ref={inputRef}
              type="number"
              inputMode="numeric"
              min={ACC_ALERT_DAY_MIN}
              max={ACC_ALERT_DAY_MAX}
              step={1}
              value={draft}
              placeholder={`Days (${ACC_ALERT_DAY_MIN}–${ACC_ALERT_DAY_MAX})`}
              aria-label={`${label} — days before`}
              aria-invalid={error !== null}
              onChange={(e) => {
                setDraft(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                // The panel sits inside no form, but Enter must never bubble
                // up and trigger a submit elsewhere on the page.
                e.preventDefault();
                add();
              }}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={add}
            disabled={days.length >= ACC_ALERT_DAYS_MAX}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        {(error || listError) && (
          <p className="text-xs text-destructive">{error ?? listError}</p>
        )}

        <p className="text-xs text-muted-foreground">{alertDaysPreview(days, phrase)}</p>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-muted-foreground">
            {days.length} of {ACC_ALERT_DAYS_MAX} used
          </span>
          <Button type="button" variant="ghost" size="sm" onClick={onReset}>
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
            Reset to default
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

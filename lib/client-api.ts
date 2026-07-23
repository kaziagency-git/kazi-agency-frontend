import {
  getClientToken,
  getClientRefreshToken,
  setClientTokens,
  clearClientTokens,
} from './client-auth';

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1').replace(/\/$/, '');

// ── Types ──────────────────────────────────────────────────────────────────

export interface ServiceMilestone {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string | null;
  completedAt: string | null;
}

export interface ServiceProject {
  _id: string;
  serviceName: string;
  status: 'not-started' | 'in-progress' | 'completed';
  currentPhase: string;
  progress: number;
  startDate: string | null;
  notes: string;
  milestones: ServiceMilestone[];
}

export interface ClientProfile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  status: 'pending' | 'active' | 'inactive';
  source: string;
  accountManager: string;
  serviceProjects: ServiceProject[];
  createdAt: string;
  updatedAt: string;
}

export interface TicketAttachment {
  url: string;
  originalName: string;
  size: number;
  mimetype: string;
}

export interface TicketMessage {
  _id: string;
  sender: 'client' | 'admin';
  senderName: string;
  content: string;
  attachments?: TicketAttachment[];
  createdAt: string;
}

export interface Ticket {
  _id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  ticketNumber?: number;
  subject: string;
  category: 'Technical' | 'Billing' | 'Reporting' | 'Strategy' | 'Other';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  messages: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ExtraField {
  key: string;
  value: string;
}

export interface AdminClient extends ClientProfile {
  adminNotes: string;
  extraFields: ExtraField[];
  setupToken: null;
  hasPassword: boolean;
}

export interface TicketStats {
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  total: number;
}

// ── Token refresh ──────────────────────────────────────────────────────────

async function attemptClientRefresh(): Promise<boolean> {
  const refreshToken = getClientRefreshToken();
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${BASE}/client/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    const newAccessToken: string = data.data?.accessToken;
    if (!newAccessToken) return false;
    setClientTokens(newAccessToken, refreshToken);
    return true;
  } catch {
    return false;
  }
}

// ── Core fetch ─────────────────────────────────────────────────────────────

async function clientFetch<T>(path: string, init?: RequestInit, isRetry = false): Promise<T> {
  const token = getClientToken();
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  if (res.status === 401 && !isRetry) {
    const refreshed = await attemptClientRefresh();
    if (refreshed) return clientFetch<T>(path, init, true);
    clearClientTokens();
    if (typeof window !== 'undefined') window.location.href = '/client/login';
    throw new Error('Session expired');
  }

  if (res.status === 401) {
    clearClientTokens();
    if (typeof window !== 'undefined') window.location.href = '/client/login';
    throw new Error('Unauthorized');
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Request failed');
  return data.data as T;
}

// ── Client auth ────────────────────────────────────────────────────────────

export async function clientLogin(
  email: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const res = await fetch(`${BASE}/client/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Login failed');
  return data.data;
}

export async function clientSetPassword(
  token: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const res = await fetch(`${BASE}/client/set-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Failed to set password');
  return data.data;
}

export async function clientLogout(): Promise<void> {
  clearClientTokens();
}

// ── Client portal ──────────────────────────────────────────────────────────

export const getMyProfile = () => clientFetch<ClientProfile>('/client/me');

export const getMyTickets = () => clientFetch<Ticket[]>('/client/tickets');
export const getMyTicket = (id: string) => clientFetch<Ticket>(`/client/tickets/${id}`);
export const createTicket = (body: {
  subject: string;
  category: string;
  priority: string;
  message: string;
  attachments?: TicketAttachment[];
}) => clientFetch<Ticket>('/client/tickets', { method: 'POST', body: JSON.stringify(body) });
export const replyToTicket = (id: string, content: string, attachments: TicketAttachment[] = []) =>
  clientFetch<Ticket>(`/client/tickets/${id}/reply`, {
    method: 'POST',
    body: JSON.stringify({ content, attachments }),
  });

export async function uploadFiles(files: File[]): Promise<TicketAttachment[]> {
  const BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1').replace(/\/$/, '');
  const form = new FormData();
  files.forEach((f) => form.append('files', f));
  const res = await fetch(`${BASE}/upload`, { method: 'POST', body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Upload failed');
  return data.data as TicketAttachment[];
}

// ── Admin: client management ───────────────────────────────────────────────

async function adminFetch<T>(path: string, init?: RequestInit, isRetry = false): Promise<T> {
  const { getToken, getRefreshToken, setTokens, clearTokens } = await import('./admin-auth');
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  if (res.status === 401 && !isRetry) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        const r = await fetch(`${BASE}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });
        if (r.ok) {
          const d = await r.json();
          if (d.data?.accessToken) {
            setTokens(d.data.accessToken, refreshToken);
            return adminFetch<T>(path, init, true);
          }
        }
      } catch { /* fall through */ }
    }
    clearTokens();
    if (typeof window !== 'undefined') window.location.href = '/admin/login';
    throw new Error('Session expired');
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Request failed');
  return data.data as T;
}

export interface ClientListParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface ClientListResponse {
  clients: AdminClient[];
  total: number;
  page: number;
  totalPages: number;
}

export const getAdminClients = (params?: ClientListParams) => {
  const entries = params
    ? Object.entries(params).filter(([, v]) => v !== undefined && v !== '' && v !== 'all')
    : [];
  const qs = entries.length ? '?' + new URLSearchParams(entries.map(([k, v]) => [k, String(v)])).toString() : '';
  return adminFetch<ClientListResponse>(`/admin/clients${qs}`);
};
export const getAdminClient = (id: string) => adminFetch<AdminClient>(`/admin/clients/${id}`);
export const createAdminClient = (body: {
  name: string; email: string; phone?: string; company?: string;
  services?: string[]; accountManager?: string; adminNotes?: string;
  extraFields?: ExtraField[]; source?: string;
}) => adminFetch<{ client: AdminClient; setupLink: string }>('/admin/clients', {
  method: 'POST', body: JSON.stringify(body),
});
export const updateAdminClient = (id: string, body: Partial<AdminClient>) =>
  adminFetch<AdminClient>(`/admin/clients/${id}`, { method: 'PUT', body: JSON.stringify(body) });
export const deleteAdminClient = (id: string) =>
  adminFetch<void>(`/admin/clients/${id}`, { method: 'DELETE' });
export const regenerateClientLink = (id: string) =>
  adminFetch<{ setupLink: string }>(`/admin/clients/${id}/regenerate-link`, { method: 'POST' });
export const changeClientPassword = (id: string, password: string) =>
  adminFetch<void>(`/admin/clients/${id}/password`, {
    method: 'PATCH',
    body: JSON.stringify({ password }),
  });

// ── Admin: Service Projects ────────────────────────────────────────────────

export const addServiceProject = (clientId: string, body: {
  serviceName: string; status?: string; currentPhase?: string;
  progress?: number; startDate?: string | null; notes?: string;
}) => adminFetch<AdminClient>(`/admin/clients/${clientId}/services`, { method: 'POST', body: JSON.stringify(body) });

export const updateServiceProject = (clientId: string, serviceId: string, body: {
  status?: string; currentPhase?: string; progress?: number;
  startDate?: string | null; notes?: string;
}) => adminFetch<AdminClient>(`/admin/clients/${clientId}/services/${serviceId}`, { method: 'PATCH', body: JSON.stringify(body) });

export const deleteServiceProject = (clientId: string, serviceId: string) =>
  adminFetch<AdminClient>(`/admin/clients/${clientId}/services/${serviceId}`, { method: 'DELETE' });

export const addServiceMilestone = (clientId: string, serviceId: string, body: {
  title: string; description?: string; status?: string; dueDate?: string | null;
}) => adminFetch<AdminClient>(`/admin/clients/${clientId}/services/${serviceId}/milestones`, { method: 'POST', body: JSON.stringify(body) });

export const updateServiceMilestone = (clientId: string, serviceId: string, milestoneId: string, body: {
  title?: string; description?: string; status?: string; dueDate?: string | null;
}) => adminFetch<AdminClient>(`/admin/clients/${clientId}/services/${serviceId}/milestones/${milestoneId}`, { method: 'PATCH', body: JSON.stringify(body) });

export const deleteServiceMilestone = (clientId: string, serviceId: string, milestoneId: string) =>
  adminFetch<AdminClient>(`/admin/clients/${clientId}/services/${serviceId}/milestones/${milestoneId}`, { method: 'DELETE' });

// ── Admin: ticket management ───────────────────────────────────────────────

export const getAdminTickets = (params?: { status?: string; clientId?: string }) => {
  const qs = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
  return adminFetch<Ticket[]>(`/admin/tickets${qs}`);
};
export const getAdminTicket = (id: string) => adminFetch<Ticket>(`/admin/tickets/${id}`);
export const adminReplyToTicket = (id: string, content: string, attachments: TicketAttachment[] = []) =>
  adminFetch<Ticket>(`/admin/tickets/${id}/reply`, { method: 'POST', body: JSON.stringify({ content, attachments }) });
export const updateTicketStatus = (id: string, status: string) =>
  adminFetch<Ticket>(`/admin/tickets/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
export const getAdminTicketStats = () => adminFetch<TicketStats>('/admin/tickets/stats');

// ── Pre-Launch Form ───────────────────────────────────────────────────────

export interface OnboardingCustomField {
  _id?: string;
  label: string;
  value: string;
  addedBy: 'admin' | 'client';
}

export interface OnboardingForm {
  _id: string;
  email: string;
  clientId: string | null;
  companyName: string;
  primaryContact: string;
  bestContactEmail: string;
  phoneContact: string;
  preferredCommsChannel: string;
  websiteDomain: string;
  targetLaunchDate: string;
  logoAssetsLink: string;
  primaryBrandColor: string;
  secondaryColor: string;
  accentColor: string;
  preferredTheme: string;
  preferredHeadingFont: string;
  preferredBodyFont: string;
  referenceSites: string;
  brandGuidelinesLink: string;
  domainRegistrar: string;
  hostingProvider: string;
  githubUsernames: string;
  existingSiteCmsAccess: string;
  googleAccountEmail: string;
  googleToolsExisting: string[];
  googleAccessNotes: string;
  telegram: string;
  facebookMeta: string;
  instagram: string;
  twitter: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
  crmType: string;
  crmAccessDetails: string;
  additionalNotes: string;
  customFields: OnboardingCustomField[];
  shareToken: string;
  lastEditedBy: 'admin' | 'client' | null;
  createdAt: string;
  updatedAt: string;
}

export type OnboardingFormData = Omit<OnboardingForm, '_id' | 'email' | 'clientId' | 'shareToken' | 'lastEditedBy' | 'createdAt' | 'updatedAt'>;

export interface OnboardingListResponse {
  forms: OnboardingForm[];
  total: number;
  page: number;
  totalPages: number;
}

// Admin
export const adminListOnboardingForms = (params?: { search?: string; page?: number; limit?: number }) => {
  const entries = params ? Object.entries(params).filter(([, v]) => v !== undefined && v !== '') : [];
  const qs = entries.length ? '?' + new URLSearchParams(entries.map(([k, v]) => [k, String(v)])).toString() : '';
  return adminFetch<OnboardingListResponse>(`/admin/pre-launch-form${qs}`);
};
export const adminGetOnboardingForm = (id: string) =>
  adminFetch<{ form: OnboardingForm; shareLink: string }>(`/admin/pre-launch-form/${id}`);
export const adminCreateOnboardingForm = (body: { email: string; clientId?: string }) =>
  adminFetch<{ form: OnboardingForm; shareLink: string }>('/admin/pre-launch-form', { method: 'POST', body: JSON.stringify(body) });
export const adminFindOrCreateOnboardingForm = (body: { email: string; clientId?: string }) =>
  adminFetch<{ form: OnboardingForm; shareLink: string }>('/admin/pre-launch-form/find-or-create', { method: 'POST', body: JSON.stringify(body) });
export const adminUpdateOnboardingForm = (id: string, data: Partial<OnboardingFormData>) =>
  adminFetch<{ form: OnboardingForm }>(`/admin/pre-launch-form/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
export const adminDeleteOnboardingForm = (id: string) =>
  adminFetch<void>(`/admin/pre-launch-form/${id}`, { method: 'DELETE' });
export const adminRegenerateOnboardingToken = (id: string) =>
  adminFetch<{ shareLink: string }>(`/admin/pre-launch-form/${id}/regenerate-token`, { method: 'POST' });

// Public (share link — no auth)
export async function publicGetOnboardingForm(token: string): Promise<{ form: OnboardingForm }> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1';
  const res = await fetch(`${BASE_URL}/pre-launch-form/${token}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Not found');
  return data.data;
}
export async function publicUpdateOnboardingForm(token: string, formData: Partial<OnboardingFormData>): Promise<{ form: OnboardingForm }> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1';
  const res = await fetch(`${BASE_URL}/pre-launch-form/${token}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Save failed');
  return data.data;
}

// Client portal
export const clientGetOnboardingForm = () =>
  clientFetch<{ form: OnboardingForm }>('/client/pre-launch-form');
export const clientUpdateOnboardingForm = (data: Partial<OnboardingFormData>) =>
  clientFetch<{ form: OnboardingForm }>('/client/pre-launch-form', { method: 'PATCH', body: JSON.stringify(data) });

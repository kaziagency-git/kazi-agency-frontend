import { getToken, getRefreshToken, setTokens, clearTokens } from './admin-auth';

const BASE = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1').replace(/\/$/, '');

// ── Types ──────────────────────────────────────────────────────────────────

export interface Job {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  level: 'Entry-Level' | 'Mid-Level' | 'Senior' | 'Lead';
  type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Internship';
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export type JobInput = Omit<Job, '_id' | 'slug' | 'createdAt' | 'updatedAt'>;

export interface Application {
  _id: string;
  jobId: string | null;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  roleApplied: string;
  experienceYears: string;
  availableImmediately: 'yes' | 'no';
  resumeFileName: string | null;
  resumeUrl: string | null;
  consent: boolean;
  status: 'new' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  adminNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationStats {
  new: number;
  reviewed: number;
  shortlisted: number;
  rejected: number;
  hired: number;
  total: number;
}

// ── Token refresh ──────────────────────────────────────────────────────────

async function attemptRefresh(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) return false;

    const data = await res.json();
    const newAccessToken: string = data.data?.accessToken;
    if (!newAccessToken) return false;

    // Store new access token while keeping the existing refresh token
    setTokens(newAccessToken, refreshToken);
    return true;
  } catch {
    return false;
  }
}

// ── Core fetch helper ──────────────────────────────────────────────────────

async function apiFetch<T>(path: string, init?: RequestInit, isRetry = false): Promise<T> {
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
    const refreshed = await attemptRefresh();
    if (refreshed) {
      return apiFetch<T>(path, init, true);
    }
    clearTokens();
    if (typeof window !== 'undefined') window.location.href = '/admin/login';
    throw new Error('Session expired');
  }

  if (res.status === 401) {
    clearTokens();
    if (typeof window !== 'undefined') window.location.href = '/admin/login';
    throw new Error('Unauthorized');
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Request failed');
  return data.data as T;
}

// ── Auth ───────────────────────────────────────────────────────────────────

export async function adminLogin(
  email: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? 'Login failed');
  return data.data;
}

export async function adminLogout(): Promise<void> {
  try {
    await fetch(`${BASE}/auth/logout`, { method: 'POST' });
  } finally {
    clearTokens();
  }
}

export async function adminMe(): Promise<{ email: string; role: string } | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const res = await fetch(`${BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data ?? null;
  } catch {
    return null;
  }
}

// ── Jobs ───────────────────────────────────────────────────────────────────

export const getAdminJobs = () => apiFetch<Job[]>('/admin/jobs');
export const getAdminJob = (id: string) => apiFetch<Job>(`/admin/jobs/${id}`);
export const createJob = (body: JobInput) =>
  apiFetch<Job>('/admin/jobs', { method: 'POST', body: JSON.stringify(body) });
export const updateJob = (id: string, body: Partial<JobInput>) =>
  apiFetch<Job>(`/admin/jobs/${id}`, { method: 'PUT', body: JSON.stringify(body) });
export const togglePublish = (id: string, isPublished: boolean) =>
  apiFetch<Job>(`/admin/jobs/${id}/publish`, {
    method: 'PATCH',
    body: JSON.stringify({ isPublished }),
  });
export const deleteJob = (id: string) =>
  apiFetch<void>(`/admin/jobs/${id}`, { method: 'DELETE' });

// ── Applications ───────────────────────────────────────────────────────────

export const getApplications = (params?: Record<string, string>) => {
  const qs = params ? '?' + new URLSearchParams(params).toString() : '';
  return apiFetch<Application[]>(`/admin/applications${qs}`);
};
export const getApplication = (id: string) => apiFetch<Application>(`/admin/applications/${id}`);
export const getApplicationStats = () => apiFetch<ApplicationStats>('/admin/applications/stats');
export const updateApplicationStatus = (id: string, status: Application['status']) =>
  apiFetch<Application>(`/admin/applications/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
export const updateApplicationNotes = (id: string, adminNotes: string) =>
  apiFetch<Application>(`/admin/applications/${id}/notes`, {
    method: 'PATCH',
    body: JSON.stringify({ adminNotes }),
  });

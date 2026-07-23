const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1';

export interface PublicJob {
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
  createdAt: string;
}

export async function getPublishedJobs(): Promise<PublicJob[]> {
  try {
    const res = await fetch(`${BASE}/jobs`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const body = await res.json();
    return (body.data ?? []) as PublicJob[];
  } catch {
    return [];
  }
}

export async function getPublishedJob(identifier: string): Promise<PublicJob | null> {
  try {
    const res = await fetch(`${BASE}/jobs/${identifier}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const body = await res.json();
    return (body.data ?? null) as PublicJob | null;
  } catch {
    return null;
  }
}

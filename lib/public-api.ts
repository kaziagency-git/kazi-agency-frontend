import 'server-only';

import { connectDB } from './server/db';
import * as jobService from './server/services/job.service';

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

/**
 * Mongoose documents → the exact JSON shape the HTTP API used to return
 * (ObjectId to string, Date to ISO string), so callers are unaffected.
 */
function toPlain<T>(value: unknown): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

// These run only in server components, so they query the database in-process
// rather than making an HTTP round-trip to a second deployment.

export async function getPublishedJobs(): Promise<PublicJob[]> {
  try {
    await connectDB();
    return toPlain<PublicJob[]>(await jobService.getPublishedJobs());
  } catch (err) {
    console.error('[public-api] getPublishedJobs failed:', err);
    return [];
  }
}

export async function getPublishedJob(identifier: string): Promise<PublicJob | null> {
  try {
    await connectDB();
    const job = await jobService.getJobByIdOrSlug(identifier);
    return job ? toPlain<PublicJob>(job) : null;
  } catch (err) {
    console.error('[public-api] getPublishedJob failed:', err);
    return null;
  }
}

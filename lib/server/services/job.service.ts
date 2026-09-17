import { Job, IJob } from '../models/job.model';
import { CreateJobInput, UpdateJobInput } from '../schemas/job.schema';

export async function getAllJobsAdmin(): Promise<IJob[]> {
  return Job.find().sort({ createdAt: -1 });
}

export async function getPublishedJobs(): Promise<IJob[]> {
  return Job.find({ isPublished: true }).sort({ createdAt: -1 });
}

/**
 * Public lookup by slug, or by id for links created before the URLs moved to
 * slugs. Both branches require `isPublished` — an unpublished draft must not
 * be reachable just because someone has its id.
 */
export async function getJobByIdOrSlug(identifier: string): Promise<IJob | null> {
  const isMongoId = /^[a-f\d]{24}$/i.test(identifier);
  return isMongoId
    ? Job.findOne({ _id: identifier, isPublished: true })
    : Job.findOne({ slug: identifier, isPublished: true });
}

export async function getJobByIdAdmin(id: string): Promise<IJob | null> {
  return Job.findById(id);
}

export async function createJob(data: CreateJobInput): Promise<IJob> {
  const job = new Job(data);
  return job.save();
}

export async function updateJob(id: string, data: UpdateJobInput): Promise<IJob | null> {
  const job = await Job.findById(id);
  if (!job) return null;

  Object.assign(job, data);

  // save() rather than findByIdAndUpdate(): only save() runs the pre-save hook
  // that regenerates the slug, so renaming a job also updates its public URL.
  return job.save();
}

export async function togglePublish(id: string, isPublished: boolean): Promise<IJob | null> {
  return Job.findByIdAndUpdate(id, { isPublished }, { new: true });
}

export async function deleteJob(id: string): Promise<IJob | null> {
  return Job.findByIdAndDelete(id);
}

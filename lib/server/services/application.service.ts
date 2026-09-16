import { Application, IApplication, ApplicationStatus } from '../models/application.model';
import { SubmitApplicationInput } from '../schemas/application.schema';

export interface ApplicationFilters {
  status?: ApplicationStatus;
  jobId?: string;
  search?: string;
}

export async function submitApplication(
  data: SubmitApplicationInput & { resumeFileName?: string | null }
): Promise<IApplication> {
  const application = new Application({
    ...data,
    jobId: data.jobId || null,
    resumeFileName: data.resumeFileName ?? null,
    resumeUrl: data.resumeUrl ?? null,
    consent: Boolean(data.consent),
  });
  return application.save();
}

export async function getAllApplications(filters: ApplicationFilters): Promise<IApplication[]> {
  const query: Record<string, unknown> = {};

  if (filters.status) query.status = filters.status;
  if (filters.jobId) query.jobId = filters.jobId;
  if (filters.search) {
    query.$or = [
      { fullName: { $regex: filters.search, $options: 'i' } },
      { email: { $regex: filters.search, $options: 'i' } },
      { jobTitle: { $regex: filters.search, $options: 'i' } },
    ];
  }

  return Application.find(query)
    .populate('jobId', 'title slug department')
    .sort({ createdAt: -1 });
}

export async function getApplicationById(id: string): Promise<IApplication | null> {
  return Application.findById(id).populate('jobId', 'title slug department');
}

export async function updateStatus(id: string, status: ApplicationStatus): Promise<IApplication | null> {
  return Application.findByIdAndUpdate(id, { status }, { new: true });
}

export async function updateAdminNotes(id: string, adminNotes: string): Promise<IApplication | null> {
  return Application.findByIdAndUpdate(id, { adminNotes }, { new: true });
}

export async function getApplicationStats(): Promise<Record<string, number>> {
  const result = await Application.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const stats: Record<string, number> = { new: 0, reviewed: 0, shortlisted: 0, rejected: 0, hired: 0 };
  for (const r of result) stats[r._id] = r.count;
  stats.total = Object.values(stats).reduce((a, b) => a + b, 0);
  return stats;
}

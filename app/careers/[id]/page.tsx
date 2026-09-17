import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getPublishedJob, getPublishedJobs } from '@/lib/public-api';
import { JobApplicationForm } from '@/components/job-application-form';
import { MapPin, Briefcase, ArrowLeft, Check, ArrowRight } from 'lucide-react';

const levelColors: Record<string, string> = {
  'Entry-Level': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  'Mid-Level':   'bg-blue-50 text-blue-700 border border-blue-200',
  'Senior':      'bg-violet-50 text-violet-700 border border-violet-200',
  'Lead':        'bg-amber-50 text-amber-700 border border-amber-200',
};

const typeColors: Record<string, string> = {
  'Full-Time':  'bg-slate-100 text-slate-700 border border-slate-200',
  'Part-Time':  'bg-orange-50 text-orange-700 border border-orange-200',
  'Contract':   'bg-purple-50 text-purple-700 border border-purple-200',
  'Internship': 'bg-teal-50 text-teal-700 border border-teal-200',
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const job = await getPublishedJob(id);

  if (!job) {
    return { alternates: { canonical: '/careers' } };
  }

  return {
    title: `${job.title} | Kazi Agency Careers`,
    description: job.description,
    alternates: { canonical: `/careers/${job.slug}` },
    openGraph: {
      title: `${job.title} | Kazi Agency Careers`,
      description: job.description,
      type: 'website',
    },
  };
}

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) redirect('/careers');

  const [job, allJobs] = await Promise.all([
    getPublishedJob(id),
    getPublishedJobs(),
  ]);

  if (!job) notFound();

  // Job URLs are the title slug. Anything still pointing at the old
  // /careers/<mongo id> form — saved links, search results — moves across.
  if (id !== job.slug) redirect(`/careers/${job.slug}`);

  const otherJobs = allJobs.filter((j) => j._id !== job._id).slice(0, 4);

  return (
    <main className="bg-white">
      {/* ── Sticky back nav ── */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Careers
          </Link>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="pt-14 pb-12 px-6 bg-linear-to-b from-slate-50 to-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {job.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-sm text-slate-600 font-medium">
              <Briefcase className="w-4 h-4 text-primary" />
              {job.department}
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-1.5 text-sm text-slate-600 font-medium">
              <MapPin className="w-4 h-4 text-primary" />
              {job.location}
            </span>
            <span className="text-slate-300">·</span>
            <div className="flex flex-wrap gap-2">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${levelColors[job.level] ?? 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                {job.level}
              </span>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[job.type] ?? 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                {job.type}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-16">

            {/* Left — job details */}
            <div className="lg:col-span-2 space-y-12">

              {/* About the role */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">About the Role</h2>
                <p className="text-slate-600 leading-relaxed text-base">{job.description}</p>
              </div>

              {job.responsibilities.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-5">Responsibilities</h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((item, i) => (
                      <li key={i} className="flex gap-3 text-slate-600">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check className="w-3 h-3 text-primary" />
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.requirements.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-5">Requirements</h2>
                  <ul className="space-y-3">
                    {job.requirements.map((item, i) => (
                      <li key={i} className="flex gap-3 text-slate-600">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Check className="w-3 h-3 text-primary" />
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.benefits.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-5">What We Offer</h2>
                  <ul className="space-y-3">
                    {job.benefits.map((item, i) => (
                      <li key={i} className="flex gap-3 text-slate-600">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                          <Check className="w-3 h-3 text-emerald-600" />
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right — application form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-1">Apply Now</h2>
                <p className="text-sm text-slate-500 mb-7">
                  Fill out the form and we&apos;ll be in touch within 48 hours.
                </p>
                <JobApplicationForm jobTitle={job.title} jobId={job._id} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other positions ── */}
      {otherJobs.length > 0 && (
        <section className="py-16 px-6 bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Other Open Positions</h2>
              <Link
                href="/careers"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherJobs.map((other) => (
                <Link key={other._id} href={`/careers/${other.slug}`} className="group block">
                  <div className="rounded-xl border border-slate-200 bg-white p-5 hover:border-primary/40 hover:shadow-md transition-all">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors mb-1">
                      {other.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-3">{other.department} · {other.location}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${levelColors[other.level] ?? 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                        {other.level}
                      </span>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${typeColors[other.type] ?? 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                        {other.type}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

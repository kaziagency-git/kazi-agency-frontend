import type { Metadata } from 'next';
import Link from 'next/link';
import { FAQ } from '@/components/faq';
import { SchemaInjector } from '@/components/schema-injector';
import { careersFAQ } from '@/lib/faq-data';
import { getPublishedJobs } from '@/lib/public-api';
import { MapPin, Briefcase, ArrowRight, Zap } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/careers' },
};

// Without this the page is prerendered once at build time and a job published
// afterwards never appears. Publishing also calls revalidatePath('/careers'),
// so this is the fallback for edits that bypass the admin API.
export const revalidate = 60;

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

export default async function CareersPage() {
  const jobs = await getPublishedJobs();

  return (
    <main className="bg-white">
      <SchemaInjector items={careersFAQ} />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 bg-linear-to-br from-white via-sky-50/50 to-blue-50 overflow-hidden mb-8">
        <div className="absolute top-16 left-1/4 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-200/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200 text-[#046BAF] text-sm font-semibold mb-6">
            <Zap className="w-4 h-4" />
            We&apos;re Hiring
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 leading-tight">
            Build the Future with<br className="hidden md:block" />
            <span className="text-[#046BAF]"> Kazi Agency</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-16 leading-relaxed">
            We&apos;re transforming how businesses manage sales and marketing. Join a team that&apos;s passionate about shipping products people love.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: jobs.length > 0 ? String(jobs.length) : '—', label: 'Open Roles' },
              { value: '100%', label: 'Remote Friendly' },
              { value: '24/7', label: 'Team Support' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="text-3xl md:text-4xl font-bold text-primary">{value}</span>
                <span className="text-xs md:text-sm text-slate-500 font-medium text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Positions ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Open Positions</h2>
            {jobs.length > 0 && (
              <span className="text-sm text-slate-400 font-medium">
                {jobs.length} {jobs.length === 1 ? 'role' : 'roles'}
              </span>
            )}
          </div>

          {jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 rounded-2xl border-2 border-dashed border-slate-200 text-center">
              <Briefcase className="w-10 h-10 text-slate-300 mb-4" />
              <p className="text-slate-600 font-semibold text-lg">No open positions right now</p>
              <p className="text-slate-400 text-sm mt-1 max-w-xs">
                We post new roles frequently. Check back soon or reach out directly below.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Link key={job._id} href={`/careers/${job.slug}`} className="group block">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-7 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-primary transition-colors mb-2">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 mb-4">
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                            {job.location}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors[job.level] ?? 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                            {job.level}
                          </span>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[job.type] ?? 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                            {job.type}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-1 shrink-0">
                        <span className="text-xs text-slate-400 font-medium hidden sm:block">View role</span>
                        <div className="h-9 w-9 rounded-full bg-primary/8 flex items-center justify-center group-hover:bg-primary transition-colors">
                          <ArrowRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-500 mt-4 line-clamp-2 leading-relaxed">{job.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-primary px-8 py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Don&apos;t see your role?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-md mx-auto leading-relaxed">
              We&apos;re always looking for talented people. Send us your resume and we&apos;ll keep you in mind for future opportunities.
            </p>
            <Link
              href="/client-support"
              className="inline-block bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors text-sm"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="px-6 py-24 bg-slate-50">
        <div className="mx-auto max-w-3xl">
          <FAQ items={careersFAQ} title="Careers FAQ" />
        </div>
      </section>
    </main>
  );
}

'use client';

import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Loader2, Upload } from 'lucide-react';

interface JobApplicationFormProps {
  jobTitle: string;
  jobId: string;
}

export function JobApplicationForm({ jobTitle, jobId }: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!fileName) {
      toast.error('Please upload your resume');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData(form);

      const res = await fetch('/api/job-application', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('Application submitted successfully!');
        form.reset();
        setFileName('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        toast.error(data.message || 'Something went wrong, please try again.');
      }
    } catch (error) {
      console.error('[JobForm] Form submission error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data" id="jobForm">
      <input type="hidden" name="job_id" value={jobId} />

      {/* Full Name */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="full_name"
          required
          placeholder="Enter your full name"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#046BAF] focus:ring-2 focus:ring-[#046BAF]/20 outline-none transition-all"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="your.email@example.com"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#046BAF] focus:ring-2 focus:ring-[#046BAF]/20 outline-none transition-all"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          required
          placeholder="(555) 123-4567"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#046BAF] focus:ring-2 focus:ring-[#046BAF]/20 outline-none transition-all"
        />
      </div>

      {/* Role Applied - allow selecting or default to job title */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">Role Applied</label>
        <select name="role_applied" defaultValue={jobTitle || ''} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#046BAF] focus:ring-2 focus:ring-[#046BAF]/20 outline-none transition-all">
          {jobTitle && <option value={jobTitle}>{jobTitle}</option>}
          <option value="Sales Executive">Sales Executive</option>
          <option value="Marketing Manager">Marketing Manager</option>
        </select>
      </div>

      {/* Experience Years */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Years of Experience <span className="text-red-500">*</span>
        </label>
        <select name="experience_years" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#046BAF] focus:ring-2 focus:ring-[#046BAF]/20 outline-none transition-all">
          <option value="">How many years of experience?</option>
          <option value="0">No experience</option>
          <option value="1-2">1-2 years</option>
          <option value="3+">3+ years</option>
        </select>
      </div>

      {/* Available Immediately */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Available Immediately <span className="text-red-500">*</span>
        </label>
        <select
          name="available_immediately"
          required
          defaultValue=""
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#046BAF] focus:ring-2 focus:ring-[#046BAF]/20 outline-none transition-all"
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>

      {/* Resume File Upload */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Resume File <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            required
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFileName(file.name);
              }
            }}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-slate-300 hover:border-[#046BAF] transition-colors flex items-center justify-center gap-2 text-slate-600 hover:text-[#046BAF]"
          >
            <Upload className="w-5 h-5" />
            <span>{fileName || 'Click to upload resume (PDF, DOC, DOCX)'}</span>
          </button>
        </div>
      </div>

      {/* Resume Link */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">Resume Link (optional)</label>
        <input
          type="url"
          name="resume_link"
          placeholder="https://example.com/resume"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#046BAF] focus:ring-2 focus:ring-[#046BAF]/20 outline-none transition-all"
        />
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="consent"
          id="consent"
          required
          className="mt-1 w-5 h-5 rounded border-slate-300 text-[#046BAF] focus:ring-[#046BAF]"
        />
        <label htmlFor="consent" className="text-sm text-slate-600">I consent to Kazi Agency processing my data.</label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#046BAF] hover:bg-[#034d85] text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Application'
        )}
      </button>
    </form>
  );
}

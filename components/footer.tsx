"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-1">
            <div className="mb-4">
              <Image
                src="/kazi-agency-logo-white.webp"
                alt="Kazi Agency"
                width={40}
                height={40}
                className="max-w-60 w-full"
              />
            </div>
            <p className="text-slate-400 text-sm">
              All-in-one AI-powered sales and marketing platform for agencies and businesses.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <Link href="/services/ai-website-design" className="hover:text-white transition-colors">
                  AI Website Design
                </Link>
              </li>
              <li>
                <Link href="/services/crm-pipeline-management" className="hover:text-white transition-colors">
                  CRM & Pipeline
                </Link>
              </li>
              <li>
                <Link href="/services/marketing-automation" className="hover:text-white transition-colors">
                  Marketing Automation
                </Link>
              </li>
              <li>
                <Link href="/services/seo-services" className="hover:text-white transition-colors">
                  SEO Services
                </Link>
              </li>
              <li>
                <Link href="/services/social-media-management" className="hover:text-white transition-colors">
                  Social Media
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 opacity-0 select-none">More</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <Link href="/services/paid-advertising" className="hover:text-white transition-colors">
                  Paid Advertising
                </Link>
              </li>
              <li>
                <Link href="/services/lead-generation" className="hover:text-white transition-colors">
                  Lead Generation
                </Link>
              </li>
              <li>
                <Link href="/services/reputation-management" className="hover:text-white transition-colors">
                  Reputation Management
                </Link>
              </li>
              <li>
                <Link href="/services/appointment-scheduling" className="hover:text-white transition-colors">
                  Appointment Scheduling
                </Link>
              </li>
              <li>
                <Link href="/services/analytics-reporting" className="hover:text-white transition-colors">
                  Analytics & Reporting
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <Link href="/free-business-audit" className="hover:text-white transition-colors">
                  Free AI Audit
                </Link>
              </li>
              <li>
                <Link href="/brand-onboarding" className="hover:text-white transition-colors">
                  Brand Foundation
                </Link>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <Link href="/book-a-consultation" className="hover:text-white transition-colors">
                  Book a Consultation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <Link href="/client-support" className="hover:text-white transition-colors">
                  Client Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-center gap-2 text-center text-sm text-slate-400 sm:flex-row sm:gap-4">
            <p>© 2026 Kazi Agency. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

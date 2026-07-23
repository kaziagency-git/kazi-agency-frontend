"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, ChevronRight,
  Globe, Users, Zap, Search, Share2, Target,
  Filter, Star, Calendar, BarChart3,
} from "lucide-react";
import { usePathname } from "next/navigation";

const PRIMARY = {
  bg: "bg-[#046BAF]",
  bgHover: "hover:bg-[#035a94]",
  text: "text-[#046BAF]",
  border: "border-[#046BAF]",
  bgLight: "bg-[#046BAF]/10",
};

const serviceLinks = [
  { label: "AI Website Design",        href: "/services/ai-website-design",       icon: Globe,     desc: "Conversion-optimized AI websites" },
  { label: "CRM & Pipeline",            href: "/services/crm-pipeline-management", icon: Users,     desc: "Centralize leads & automate follow-ups" },
  { label: "Marketing Automation",      href: "/services/marketing-automation",    icon: Zap,       desc: "Smart email & SMS workflows" },
  { label: "SEO Services",              href: "/services/seo-services",            icon: Search,    desc: "Rank higher on Google" },
  { label: "Social Media",              href: "/services/social-media-management", icon: Share2,    desc: "Multi-platform content management" },
  { label: "Paid Advertising",          href: "/services/paid-advertising",        icon: Target,    desc: "Meta, Google & LinkedIn ads" },
  { label: "Lead Generation",           href: "/services/lead-generation",         icon: Filter,    desc: "AI chatbots & smart capture" },
  { label: "Reputation Management",     href: "/services/reputation-management",   icon: Star,      desc: "Reviews & local SEO" },
  { label: "Appointment Scheduling",    href: "/services/appointment-scheduling",  icon: Calendar,  desc: "Integrated booking system" },
  { label: "Analytics & Reporting",     href: "/services/analytics-reporting",     icon: BarChart3, desc: "Monthly performance dashboards" },
];

const caseStudyLinks = [
  {
    label: "Premier HVAC Solutions",
    href: "/case-studies/premier-hvac-seo-domination",
    icon: Search,
    desc: "+312% organic traffic in 6 months",
    tagLabel: "SEO",
    tagColor: "bg-orange-100 text-orange-700",
  },
  {
    label: "Bloom Boutique",
    href: "/case-studies/bloom-boutique-paid-ads-growth",
    icon: Target,
    desc: "4.8× ROAS · $340K revenue in 90 days",
    tagLabel: "Paid Ads",
    tagColor: "bg-red-100 text-red-700",
  },
  {
    label: "TechStack Pro",
    href: "/case-studies/techstack-pro-lead-generation",
    icon: Filter,
    desc: "$2.1M pipeline · +284% qualified leads",
    tagLabel: "Lead Gen",
    tagColor: "bg-sky-100 text-sky-700",
  },
  {
    label: "Fresh Roots Kitchen",
    href: "/case-studies/fresh-roots-social-media-launch",
    icon: Share2,
    desc: "0 to 24.8K followers · $91K revenue",
    tagLabel: "Social",
    tagColor: "bg-pink-100 text-pink-700",
  },
  {
    label: "Apex Wellness Group",
    href: "/case-studies/apex-wellness-marketing-automation",
    icon: Zap,
    desc: "+217% bookings · $180K recovered",
    tagLabel: "Automation",
    tagColor: "bg-violet-100 text-violet-700",
  },
];

const otherNavLinks = [
  { label: "Brand Onboarding",    href: "/brand-onboarding" },
  { label: "Free Audit",          href: "/free-business-audit" },
  { label: "Blog",                href: "/blog" },
  { label: "Careers",             href: "/careers" },
  { label: "Book a Consultation", href: "/book-a-consultation" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [desktopCaseStudiesOpen, setDesktopCaseStudiesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCaseStudiesOpen, setMobileCaseStudiesOpen] = useState(false);
  const pathname = usePathname();
  const servicesLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const caseStudiesLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setDesktopServicesOpen(false);
    setDesktopCaseStudiesOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileCaseStudiesOpen(false);
  }, [pathname]);

  const handleServicesEnter = () => {
    if (servicesLeaveTimer.current) clearTimeout(servicesLeaveTimer.current);
    setDesktopServicesOpen(true);
  };
  const handleServicesLeave = () => {
    servicesLeaveTimer.current = setTimeout(() => setDesktopServicesOpen(false), 120);
  };

  const handleCaseStudiesEnter = () => {
    if (caseStudiesLeaveTimer.current) clearTimeout(caseStudiesLeaveTimer.current);
    setDesktopCaseStudiesOpen(true);
  };
  const handleCaseStudiesLeave = () => {
    caseStudiesLeaveTimer.current = setTimeout(() => setDesktopCaseStudiesOpen(false), 120);
  };

  const isServicesActive    = pathname === "/services" || pathname.startsWith("/services/");
  const isCaseStudiesActive = pathname === "/case-studies" || pathname.startsWith("/case-studies/");

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-[1340px] mx-auto px-6 py-4 relative flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 relative z-10">
          <Image
            src="/kazi-agency-logo.webp"
            alt="Kazi Agency"
            width={40}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* ── Desktop nav ── */}
        <div className="hidden md:flex items-center justify-center gap-7 whitespace-nowrap absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={handleServicesEnter}
            onMouseLeave={handleServicesLeave}
          >
            <Link
              href="/services"
              className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                isServicesActive ? "text-[#046BAF] font-semibold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Services
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  desktopServicesOpen ? "rotate-180" : ""
                }`}
              />
            </Link>

            <AnimatePresence>
              {desktopServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-0 mt-4 w-[540px] bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-4 z-50 whitespace-normal"
                >
                  <div className="absolute -top-[7px] left-6 w-3.5 h-3.5 bg-white border-l border-t border-slate-200/80 rotate-45 rounded-tl-sm" />
                  <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase px-2 mb-3">
                    Our Services
                  </p>
                  <div className="grid grid-cols-2 gap-0.5">
                    {serviceLinks.map((service) => {
                      const Icon = service.icon;
                      const active = pathname === service.href;
                      return (
                        <Link
                          key={service.href}
                          href={service.href}
                          className={`group flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all ${
                            active ? "bg-[#046BAF]/8 text-[#046BAF]" : "hover:bg-[#f0f7ff]"
                          }`}
                        >
                          <div
                            className={`p-1.5 rounded-lg shrink-0 mt-0.5 transition-colors ${
                              active ? "bg-[#046BAF]/15" : "bg-slate-100 group-hover:bg-[#046BAF]/15"
                            }`}
                          >
                            <Icon
                              className={`w-3.5 h-3.5 transition-colors ${
                                active ? "text-[#046BAF]" : "text-slate-500 group-hover:text-[#046BAF]"
                              }`}
                            />
                          </div>
                          <div>
                            <p
                              className={`text-sm font-semibold leading-tight transition-colors ${
                                active ? "text-[#046BAF]" : "text-slate-800 group-hover:text-[#046BAF]"
                              }`}
                            >
                              {service.label}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5 leading-snug break-words">
                              {service.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 px-2 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{serviceLinks.length} specialized services</span>
                    <Link
                      href="/services"
                      className="text-xs font-bold text-[#046BAF] hover:underline flex items-center gap-1"
                    >
                      View all services
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Brand Onboarding + Free Audit */}
          {otherNavLinks.slice(0, 2).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors text-sm font-medium ${
                  isActive ? "text-[#046BAF] font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Case Studies dropdown */}
          <div
            className="relative"
            onMouseEnter={handleCaseStudiesEnter}
            onMouseLeave={handleCaseStudiesLeave}
          >
            <Link
              href="/case-studies"
              className={`inline-flex items-center gap-1 text-sm font-medium transition-colors ${
                isCaseStudiesActive ? "text-[#046BAF] font-semibold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Case Studies
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  desktopCaseStudiesOpen ? "rotate-180" : ""
                }`}
              />
            </Link>

            <AnimatePresence>
              {desktopCaseStudiesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-4 z-50 whitespace-normal"
                >
                  <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-l border-t border-slate-200/80 rotate-45 rounded-tl-sm" />
                  <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase px-2 mb-3">
                    Case Studies
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {caseStudyLinks.map((cs) => {
                      const Icon = cs.icon;
                      const active = pathname === cs.href;
                      return (
                        <Link
                          key={cs.href}
                          href={cs.href}
                          className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                            active ? "bg-[#046BAF]/8" : "hover:bg-[#f0f7ff]"
                          }`}
                        >
                          <div
                            className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                              active ? "bg-[#046BAF]/15" : "bg-slate-100 group-hover:bg-[#046BAF]/15"
                            }`}
                          >
                            <Icon
                              className={`w-3.5 h-3.5 transition-colors ${
                                active ? "text-[#046BAF]" : "text-slate-500 group-hover:text-[#046BAF]"
                              }`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-semibold leading-tight transition-colors ${
                                active ? "text-[#046BAF]" : "text-slate-800 group-hover:text-[#046BAF]"
                              }`}
                            >
                              {cs.label}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5 truncate">{cs.desc}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${cs.tagColor}`}>
                            {cs.tagLabel}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 px-2 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{caseStudyLinks.length} case studies</span>
                    <Link
                      href="/case-studies"
                      className="text-xs font-bold text-[#046BAF] hover:underline flex items-center gap-1"
                    >
                      View all
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Blog + Careers + Book a Consultation */}
          {otherNavLinks.slice(2).map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors text-sm font-medium ${
                  isActive ? "text-[#046BAF] font-semibold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Login CTA */}
        <div className="hidden md:flex items-center shrink-0 relative z-10">
          <Link
            href="https://app.whitelabelcrm.io/"
            className={`${PRIMARY.bg} ${PRIMARY.bgHover} text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all`}
          >
            Login to App
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden border-t bg-white overflow-hidden"
            style={{ maxHeight: "calc(100dvh - 72px)" }}
          >
            <div className="px-6 py-3 space-y-0.5 overflow-y-auto" style={{ maxHeight: "calc(100dvh - 72px)" }}>

              {/* Services */}
              <div>
                <div className="flex items-center justify-between">
                  <Link
                    href="/services"
                    className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                      isServicesActive ? "text-[#046BAF] font-semibold" : "text-slate-600"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Services
                  </Link>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    aria-label="Toggle services submenu"
                  >
                    <ChevronRight
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        mobileServicesOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                </div>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-2 mt-1 mb-2 pl-3 border-l-2 border-[#046BAF]/20 space-y-0.5">
                        {serviceLinks.map((service) => {
                          const Icon = service.icon;
                          const active = pathname === service.href;
                          return (
                            <Link
                              key={service.href}
                              href={service.href}
                              className={`flex items-center gap-3 py-2 px-2 rounded-lg text-sm transition-all ${
                                active
                                  ? "text-[#046BAF] font-semibold bg-[#046BAF]/8"
                                  : "text-slate-500 hover:text-[#046BAF] hover:bg-slate-50"
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <Icon className="w-3.5 h-3.5 shrink-0 text-[#046BAF]/70" />
                              {service.label}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Brand Onboarding + Free Audit */}
              {otherNavLinks.slice(0, 2).map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-2.5 text-sm font-medium transition-colors ${
                      isActive ? "text-[#046BAF] font-semibold" : "text-slate-600 hover:text-slate-900"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Case Studies */}
              <div>
                <div className="flex items-center justify-between">
                  <Link
                    href="/case-studies"
                    className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
                      isCaseStudiesActive ? "text-[#046BAF] font-semibold" : "text-slate-600"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Case Studies
                  </Link>
                  <button
                    onClick={() => setMobileCaseStudiesOpen(!mobileCaseStudiesOpen)}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    aria-label="Toggle case studies submenu"
                  >
                    <ChevronRight
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        mobileCaseStudiesOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                </div>
                <AnimatePresence>
                  {mobileCaseStudiesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-2 mt-1 mb-2 pl-3 border-l-2 border-[#046BAF]/20 space-y-0.5">
                        {caseStudyLinks.map((cs) => {
                          const Icon = cs.icon;
                          const active = pathname === cs.href;
                          return (
                            <Link
                              key={cs.href}
                              href={cs.href}
                              className={`flex items-center gap-3 py-2 px-2 rounded-lg text-sm transition-all ${
                                active
                                  ? "text-[#046BAF] font-semibold bg-[#046BAF]/8"
                                  : "text-slate-500 hover:text-[#046BAF] hover:bg-slate-50"
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <Icon className="w-3.5 h-3.5 shrink-0 text-[#046BAF]/70" />
                              <span className="flex-1">{cs.label}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cs.tagColor}`}>
                                {cs.tagLabel}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Blog + Careers + Book a Consultation */}
              {otherNavLinks.slice(2).map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-2.5 text-sm font-medium transition-colors ${
                      isActive ? "text-[#046BAF] font-semibold" : "text-slate-600 hover:text-slate-900"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-3">
                <Link
                  href="https://app.whitelabelcrm.io/"
                  className={`${PRIMARY.bg} ${PRIMARY.bgHover} text-white px-6 py-2.5 rounded-lg font-semibold text-sm w-full text-center block transition-all`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login to App
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

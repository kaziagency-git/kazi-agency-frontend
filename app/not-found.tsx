import Link from 'next/link'
import { ArrowRight, Home, Search, Sparkles, Briefcase, ShieldCheck } from 'lucide-react'

const quickLinks = [
  {
    href: '/',
    label: 'Go Home',
    description: 'Return to the main homepage and continue browsing.',
    icon: Home,
  },
  {
    href: '/free-business-audit',
    label: 'Free Audit',
    description: 'Start your business audit and get recommendations.',
    icon: Search,
  },
  {
    href: '/brand-onboarding',
    label: 'Brand Onboarding',
    description: 'Build your brand foundation in minutes.',
    icon: Sparkles,
  },
  {
    href: '/careers',
    label: 'Careers',
    description: 'See open roles and join the team.',
    icon: Briefcase,
  },
]

export default function NotFound() {
  return (
    <main className="relative overflow-hidden bg-white min-h-[calc(100vh-6rem)] px-6 pt-28 pb-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(4,107,175,0.12),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.10),transparent_36%)]" />

      <div className="mx-auto flex max-w-6xl flex-col items-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#046BAF]/20 bg-[#046BAF]/8 px-4 py-2 text-sm font-semibold text-[#046BAF]">
          <ShieldCheck className="h-4 w-4" />
          Page not found
        </div>

        <div className="max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
            404 Error
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-slate-950 md:text-7xl">
            This page wandered off the map.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            The link you opened may be outdated, removed, or typed incorrectly.
            Use one of the shortcuts below to get back to a live page quickly.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-[#046BAF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#046BAF]/20 transition-transform hover:-translate-y-0.5 hover:bg-[#035a94]"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/free-business-audit"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:border-[#046BAF] hover:text-[#046BAF]"
            >
              Start Free Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickLinks.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.label}
                href={item.href}
                className="group rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:border-[#046BAF]/30 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-[#046BAF]/10 p-3 text-[#046BAF] transition-colors group-hover:bg-[#046BAF] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-bold text-slate-950">{item.label}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
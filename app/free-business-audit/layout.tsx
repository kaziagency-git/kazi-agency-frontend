import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Business Audit | Kazi Agency - Get Your Audit Score',
  description: 'Get a comprehensive free business audit analyzing your website SEO, lead generation, marketing automation, and sales funnel. Receive actionable recommendations tailored to your business.',
  keywords: ['business audit', 'SEO audit', 'website audit', 'lead generation audit', 'marketing audit'],
  alternates: {
    canonical: '/free-business-audit',
  },
  openGraph: {
    title: 'Free Business Audit | Kazi Agency',
    description: 'Analyze your business performance with our comprehensive free audit tool.',
    type: 'website',
  },
}

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

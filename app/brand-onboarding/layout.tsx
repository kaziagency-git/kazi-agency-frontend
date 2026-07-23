import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brand Onboarding | Kazi Agency - Brand Foundation Document',
  description: 'Get your Brand Foundation Document created by our AI-powered system. Define your brand identity, voice, and positioning in minutes. Start your brand onboarding today.',
  keywords: ['brand foundation', 'brand strategy', 'brand identity', 'brand positioning', 'branding'],
  alternates: {
    canonical: '/brand-onboarding',
  },
  openGraph: {
    title: 'Brand Onboarding | Kazi Agency',
    description: 'Create your Brand Foundation Document and establish consistent brand identity.',
    type: 'website',
  },
}

export default function BrandOnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Join Our Team | Kazi Agency Careers',
  description: 'Join Kazi Agency and help us build the future of sales and marketing automation. We\'re hiring talented people for remote positions. Apply now!',
  keywords: ['careers', 'jobs', 'hiring', 'remote jobs', 'sales jobs', 'marketing jobs'],
  alternates: {
    canonical: '/careers',
  },
  openGraph: {
    title: 'Join Our Team | Kazi Agency Careers',
    description: 'Explore exciting career opportunities at Kazi Agency. 100% remote friendly.',
    type: 'website',
  },
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

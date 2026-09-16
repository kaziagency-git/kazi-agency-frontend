import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { SiteShell } from '../components/site-shell'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL('https://kaziagency.com'),
  title: 'Kazi Agency | AI-Powered Sales & Marketing Platform',
  description: 'All-in-one CRM, SEO & Lead Generation platform — automate your sales pipeline and get more customers without the guesswork. Marketing automation, lead generation, and white-label solutions.',
  keywords: ['CRM', 'sales automation', 'lead generation', 'marketing automation', 'AI sales', 'white-label CRM'],
  generator: 'v0.app',
  authors: [{ name: 'Kazi Agency' }],
  creator: 'Kazi Agency',
  publisher: 'Kazi Agency',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kaziagency.com',
    siteName: 'Kazi Agency',
    title: 'Kazi Agency | AI-Powered Sales & Marketing Platform',
    description: 'All-in-one CRM, SEO & Lead Generation platform — automate your sales pipeline and get more customers.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kazi Agency - Sales & Marketing Platform',
      },
    ],
  },
  alternates: {
    canonical: 'https://kaziagency.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kazi Agency | AI-Powered Sales & Marketing',
    description: 'All-in-one platform for sales automation, lead generation, and marketing.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/fabicon.webp',
    shortcut: '/fabicon.webp',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-white">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Kazi Agency',
              url: 'https://kaziagency.com',
              logo: 'https://www.kaziagency.com/kaziagency-logo.webp',
              description: 'All-in-one AI-powered sales and marketing platform combining CRM, lead generation, marketing automation, and white-label solutions.',
              sameAs: [
                'https://twitter.com/kaziagency',
                'https://linkedin.com/company/kaziagency',
                'https://facebook.com/kaziagency',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Support',
                availableLanguage: ['en'],
                areaServed: 'Worldwide',
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'US',
              },
            }),
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="google-site-verification" content="FZ1fx54H2hQR3XDaD_Iu8POB9QevOtTcSGu9T9h8Zt4" />
        <meta name="theme-color" content="#046BAF" />
        <link rel="canonical" href="https://kaziagency.com" id="canonical-link" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var l=document.getElementById('canonical-link');if(!l) return;var u=location.origin+location.pathname+location.search;l.setAttribute('href',u);var og=document.querySelector('meta[property="og:url"]');if(og)og.setAttribute('content',u);}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} font-sans antialiased`}>
        <SiteShell>
          {children}
        </SiteShell>
        <Toaster richColors position="top-right" />
        <Script
          src="https://beta.leadconnectorhq.com/loader.js"
          data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a15f1a41ce15bb9e927e475"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7RKH4852JQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7RKH4852JQ');
          `}
        </Script>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

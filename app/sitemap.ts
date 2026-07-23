import type { MetadataRoute } from 'next'
import { jobListings } from '@/lib/careers-data'
import { blogPosts } from '@/lib/blog-data'

const siteUrl = 'https://kaziagency.com'

const caseStudySlugs = [
  'premier-hvac-seo-domination',
  'bloom-boutique-paid-ads-growth',
  'techstack-pro-lead-generation',
  'fresh-roots-social-media-launch',
  'apex-wellness-marketing-automation',
]

const serviceslugs = [
  'ai-website-design',
  'crm-pipeline-management',
  'marketing-automation',
  'seo-services',
  'social-media-management',
  'paid-advertising',
  'lead-generation',
  'reputation-management',
  'appointment-scheduling',
  'analytics-reporting',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/book-a-consultation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/free-business-audit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/brand-onboarding`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  const servicePages: MetadataRoute.Sitemap = serviceslugs.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const blogPostPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const careerPages: MetadataRoute.Sitemap = jobListings.map((job) => ({
    url: `${siteUrl}/careers/${job.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const caseStudyPages: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${siteUrl}/case-studies/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...servicePages, ...caseStudyPages, ...blogPostPages, ...careerPages]
}
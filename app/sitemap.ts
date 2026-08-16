import { MetadataRoute } from 'next'
import { posts } from '@/data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ikareem.netlify.app'

  const staticRoutes = ['', '/projects', '/experience', '/tools', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogRoutes]
}

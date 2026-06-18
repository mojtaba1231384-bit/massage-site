import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/payment/verify/'],
    },
    sitemap: 'https://aramis.ir.ir/sitemap.xml',
  }
}
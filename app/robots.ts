import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/payment/verify/',
        '/admin',
        '/tracking',  // اضافه کن اگه tracking رو نمی‌خوای
      ],
    },
sitemap: 'https://massage-site.vercel.app/sitemap.xml',
  }
}
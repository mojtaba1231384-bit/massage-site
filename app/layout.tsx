import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://massage-site.vercel.app'),
  title: {
    default: 'آرامیس | مرکز تخصصی ماساژ در اصفهان',
    template: '%s | آرامیس اصفهان'
  },
  description: 'بهترین مرکز ماساژ تخصصی در اصفهان. انواع ماساژ درمانی، ریلکسی، آروماتراپی، سنگ داغ و بادکش. رزرو آنلاین آسان.',
  keywords: [
    'ماساژ اصفهان',
    'ماساژ درمانی اصفهان',
    'ماساژ ریلکسی اصفهان',
    'رزرو ماساژ اصفهان',
    'مرکز ماساژ اصفهان',
    'ماساژ آروماتراپی',
    'ماساژ سنگ داغ',
    'بادکش اصفهان',
    'ماساژ تخصصی',
    'آرامیس ماساژ',
  ],
  authors: [{ name: 'آرامیس' }],
  openGraph: {
    title: 'آرامیس | مرکز تخصصی ماساژ در اصفهان',
    description: 'بهترین مرکز ماساژ تخصصی، درمانی و ریلکسی در اصفهان. رزرو آنلاین.',
    url: 'https://massage-site.vercel.app',
    siteName: 'آرامیس',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'آرامیس - مرکز ماساژ حرفه‌ای در اصفهان'
      }
    ],
    locale: 'fa_IR',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'YOUR_ACTUAL_GOOGLE_VERIFICATION_CODE',
  },
  alternates: {
    canonical: 'https://massage-site.vercel.app'
  }
}

// ===== LocalBusiness Schema برای SEO محلی =====
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: 'آرامیس - مرکز تخصصی ماساژ',
  description: 'مرکز تخصصی ماساژ درمانی، ریلکسی و آروماتراپی در اصفهان',
  url: 'https://massage-site.vercel.app',
  telephone: '+989902415024',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'اصفهان',
    addressCountry: 'IR'
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
      opens: '09:00',
      closes: '20:00'
    }
  ],
  priceRange: '۴۵۰,۰۰۰ تا ۱,۷۰۰,۰۰۰ تومان',
  image: 'https://massage-site.vercel.app/og-image.jpg',
  sameAs: []
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#447F98" />
        <meta name="format-detection" content="telephone=no" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// بارگذاری فونت وزیرمتن از گوگل
const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-vazirmatn',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://aramis.ir'),
  title: {
    default: 'آرامیس | مرکز تخصصی ماساژ',
    template: '%s | آرامیس'
  },
  description: 'بهترین مرکز ماساژ تخصصی، درمانی و ریلکسی با مدرن‌ترین متدها. رزرو آنلاین و دریافت مشاوره رایگان',
  keywords: 'ماساژ, ماساژ درمانی, ماساژ ریلکسی, آروماتراپی, ماساژ سنگ داغ, بادکش, ماساژ صورت',
  authors: [{ name: 'آرامیس' }],
  openGraph: {
    title: 'آرامیس | مرکز تخصصی ماساژ',
    description: 'بهترین مرکز ماساژ تخصصی، درمانی و ریلکسی',
    url: 'https://aramis.ir',
    siteName: 'آرامیس',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'آرامیس - مرکز ماساژ حرفه‌ای'
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
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://aramis.ir'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.className}>
      <body className="font-sans antialiased">
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
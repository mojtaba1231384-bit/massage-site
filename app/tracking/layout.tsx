import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'پیگیری رزرو',
  description: 'وضعیت رزرو ماساژ خود را با شماره تماس پیگیری کنید.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function TrackingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
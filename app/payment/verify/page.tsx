'use client'

import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle } from 'lucide-react'

// ===== کامپوننت اصلی با Suspense =====
export default function PaymentVerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#447F98] to-[#629BB6] p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#447F98] mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800">در حال تایید پرداخت...</h2>
        </div>
      </div>
    }>
      <PaymentVerifyContent />
    </Suspense>
  )
}

// ===== محتوای اصلی با useSearchParams =====
function PaymentVerifyContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')

  useEffect(() => {
    const authority = searchParams.get('Authority')
    const statusParam = searchParams.get('Status')
    
    console.log('Authority:', authority)
    console.log('Status:', statusParam)
    
    setTimeout(() => {
      if (statusParam === 'OK') {
        setStatus('success')
      } else {
        setStatus('failed')
      }
    }, 2000)
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#447F98] to-[#629BB6] p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#447F98] mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800">در حال تایید پرداخت...</h2>
          </>
        )}
        
        {status === 'success' && (
          <>
            <CheckCircle size={80} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">پرداخت موفق!</h2>
            <p className="text-gray-600 mb-6">نوبت شما با موفقیت رزرو شد.</p>
            <Link href="/" className="inline-block bg-[#447F98] text-white px-6 py-3 rounded-lg hover:bg-[#629BB6] transition">
              بازگشت به صفحه اصلی
            </Link>
          </>
        )}
        
        {status === 'failed' && (
          <>
            <XCircle size={80} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">پرداخت ناموفق</h2>
            <p className="text-gray-600 mb-6">لطفا مجددا تلاش کنید.</p>
            <Link href="/#booking" className="inline-block bg-[#447F98] text-white px-6 py-3 rounded-lg hover:bg-[#629BB6] transition">
              تلاش مجدد
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
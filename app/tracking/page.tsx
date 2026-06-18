'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Booking {
  id: string
  name: string
  phone: string
  service: string
  date: string
  start_time: string
  end_time: string
  price: number
  deposit: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at: string
}

export default function TrackingPage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const cleanedPhone = phone.trim()
    if (!cleanedPhone) {
      setError('لطفاً شماره تماس خود را وارد کنید')
      return
    }

    setLoading(true)
    setError('')
    setSearched(true)

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('phone', cleanedPhone)
        .order('created_at', { ascending: false })

      if (error) throw error

      setBookings(data || [])
      
      if (data?.length === 0) {
        setError('هیچ رزروی با این شماره تماس پیدا نشد')
      }
    } catch (err: any) {
      setError('خطا در دریافت اطلاعات')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500'
      case 'confirmed': return 'bg-blue-500'
      case 'completed': return 'bg-green-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: Booking['status']) => {
    switch (status) {
      case 'pending': return 'در انتظار تایید'
      case 'confirmed': return 'تایید شده'
      case 'completed': return 'انجام شده'
      case 'cancelled': return 'لغو شده'
      default: return 'نامشخص'
    }
  }

  const getStatusEmoji = (status: Booking['status']) => {
    switch (status) {
      case 'pending': return '⏳'
      case 'confirmed': return '✅'
      case 'completed': return '🎉'
      case 'cancelled': return '❌'
      default: return '📌'
    }
  }

  const getStatusMessage = (status: Booking['status']) => {
    switch (status) {
      case 'pending': return 'رزرو شما در انتظار تایید است. به زودی با شما تماس می‌گیریم.'
      case 'confirmed': return '✅ رزرو شما تایید شده است. در تاریخ و ساعت مقرر منتظر شما هستیم.'
      case 'completed': return '🎉 رزرو شما با موفقیت انجام شده است. ممنون از اعتماد شما!'
      case 'cancelled': return '❌ رزرو شما لغو شده است. برای اطلاعات بیشتر با ما تماس بگیرید.'
      default: return ''
    }
  }

  const getStatusTip = (status: Booking['status']) => {
    switch (status) {
      case 'pending': return '⏳ در حال بررسی توسط تیم ما... به زودی با شما تماس می‌گیریم.'
      case 'confirmed': return '📌 حتماً ۱۵ دقیقه قبل از زمان رزرو در محل حاضر باشید.'
      case 'completed': return '⭐ از خدمات ما راضی بودید؟ نظرات خود را با ما به اشتراک بگذارید.'
      case 'cancelled': return '📞 برای اطلاعات بیشتر با شماره ۰۹۹۰ ۲۴۱ تماس بگیرید.'
      default: return ''
    }
  }

  const getStatusTipColor = (status: Booking['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      case 'confirmed': return 'text-blue-600 bg-blue-50'
      case 'completed': return 'text-green-600 bg-green-50'
      case 'cancelled': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen bg-[#DADEE1] pt-24 px-4 pb-12">
      <div className="container mx-auto max-w-4xl">
        
        {/* هدر */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-[#447F98]">📋 پیگیری رزرو</h1>
            <p className="text-gray-500 text-sm sm:text-base mt-2">شماره تماس خود را وارد کنید تا وضعیت رزرو خود را ببینید</p>
          </motion.div>
        </div>

        {/* فرم جستجو */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">📞</span>
              <input
                type="text"
                placeholder="شماره تماس خود را وارد کنید..."
                className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#447F98] focus:border-transparent outline-none transition-all text-right text-sm sm:text-base"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                dir="ltr"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#447F98] hover:bg-[#629BB6] text-white px-6 sm:px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  در حال جستجو...
                </>
              ) : (
                '🔍 جستجو'
              )}
            </button>
          </form>
          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-sm mt-3 ${error.includes('پیدا نشد') ? 'text-yellow-600' : 'text-red-500'}`}
            >
              {error}
            </motion.p>
          )}
          <p className="text-xs text-gray-400 mt-3 text-center sm:text-right">
            💡 برای مشاهده وضعیت رزرو، شماره تماس ثبت شده را وارد کنید
          </p>
        </motion.div>

        {/* نتایج */}
        {searched && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#447F98] mx-auto"></div>
                <p className="text-gray-500 mt-4">در حال دریافت اطلاعات...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">رزروی یافت نشد</h3>
                <p className="text-gray-500">هیچ رزروی با این شماره تماس پیدا نشد.</p>
                <button
                  onClick={() => router.push('/#booking')}
                  className="inline-block mt-6 bg-[#8908E1] hover:bg-[#629BB6] text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
                >
                  📅 ثبت رزرو جدید
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-500 text-center">
                  {bookings.length} رزرو یافت شد
                </p>
                {bookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border-r-4"
                    style={{ 
                      borderColor: getStatusColor(booking.status)
                        .replace('bg-yellow-500', '#EAB308')
                        .replace('bg-blue-500', '#3B82F6')
                        .replace('bg-green-500', '#22C55E')
                        .replace('bg-red-500', '#EF4444')
                        .replace('bg-gray-500', '#6B7280')
                    }}
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                        <div className="w-full sm:w-auto">
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-semibold ${getStatusColor(booking.status)}`}>
                              {getStatusEmoji(booking.status)} {getStatusText(booking.status)}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-400">
                              # {String(index + 1).padStart(3, '0')}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mt-2">{booking.service}</h3>
                          <p className="text-sm text-gray-500 mt-1">{booking.name}</p>
                        </div>
                        <div className="text-left w-full sm:w-auto text-sm sm:text-base">
                          <p className="text-gray-600">📅 {booking.date}</p>
                          <p className="text-gray-600">⏰ {booking.start_time} - {booking.end_time}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-gray-700 text-sm sm:text-base">
                          {getStatusMessage(booking.status)}
                        </p>
                        {booking.status !== 'cancelled' && (
                          <div className={`mt-3 flex items-center gap-2 text-sm p-3 rounded-xl ${getStatusTipColor(booking.status)}`}>
                            <span>{getStatusEmoji(booking.status)}</span>
                            <span>{getStatusTip(booking.status)}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
                        <span>💰 مبلغ: {booking.price.toLocaleString()} تومان</span>
                        <span>💳 پیش‌پرداخت: {booking.deposit.toLocaleString()} تومان</span>
                        <span>📆 ثبت: {new Date(booking.created_at).toLocaleDateString('fa-IR')}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* لینک‌های پایین */}
        <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/#booking')}
            className="text-[#447F98] hover:text-[#629BB6] transition-all text-sm font-semibold"
          >
            ← ثبت رزرو جدید
          </button>
          <button
            onClick={() => router.push('/')}
            className="text-gray-400 hover:text-gray-600 transition-all text-sm"
          >
            🏠 بازگشت به صفحه اصلی
          </button>
        </div>

        {/* فوتر */}
        <div className="text-center text-gray-400 text-xs mt-8">
          {new Date().toLocaleDateString('fa-IR')} - آرامیس
        </div>
      </div>
    </div>
  )
}
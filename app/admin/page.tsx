'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import 'react-multi-date-picker/styles/colors/teal.css'

interface Booking {
  id: string
  name: string
  phone: string
  email: string | null
  service: string
  date: string
  start_time: string
  end_time: string
  price: number
  deposit: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  note: string | null
  created_at: string
}

interface UnavailableTime {
  id: string
  date: string
  start_time: string
  end_time: string
  reason: string | null
  created_at: string
}

interface UnavailableDay {
  id: string
  day: string
  created_at: string
}

export default function AdminPanel() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [unavailableTimes, setUnavailableTimes] = useState<UnavailableTime[]>([])
  const [unavailableDays, setUnavailableDays] = useState<UnavailableDay[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState<'bookings' | 'unavailable'>('bookings')
  const [showAddUnavailable, setShowAddUnavailable] = useState(false)
  const [newUnavailable, setNewUnavailable] = useState({
    date: '',
    start_time: '',
    end_time: '',
    reason: ''
  })
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0
  })
  const [modalData, setModalData] = useState<{
    isOpen: boolean
    type: 'note' | 'service' | null
    title: string
    content: string
    customerName?: string
  }>({
    isOpen: false,
    type: null,
    title: '',
    content: '',
    customerName: ''
  })

  // ===== رمز عبور مستقیم =====
  const ADMIN_PASSWORD = 'Admin@1403#'

  const weekDays = [
    { value: 'saturday', label: 'شنبه' },
    { value: 'sunday', label: 'یک‌شنبه' },
    { value: 'monday', label: 'دوشنبه' },
    { value: 'tuesday', label: 'سه‌شنبه' },
    { value: 'wednesday', label: 'چهارشنبه' },
    { value: 'thursday', label: 'پنج‌شنبه' },
    { value: 'friday', label: 'جمعه' }
  ]

  const timeSlots = [
    '09:00', '09:10', '09:20', '09:30', '09:40', '09:50',
    '10:00', '10:10', '10:20', '10:30', '10:40', '10:50',
    '11:00', '11:10', '11:20', '11:30', '11:40', '11:50',
    '12:00', '12:10', '12:20', '12:30', '12:40', '12:50',
    '13:00', '13:10', '13:20', '13:30', '13:40', '13:50',
    '14:00', '14:10', '14:20', '14:30', '14:40', '14:50',
    '15:00', '15:10', '15:20', '15:30', '15:40', '15:50',
    '16:00', '16:10', '16:20', '16:30', '16:40', '16:50',
    '17:00', '17:10', '17:20', '17:30', '17:40', '17:50',
    '18:00', '18:10', '18:20', '18:30', '18:40', '18:50',
    '19:00', '19:10', '19:20', '19:30', '19:40', '19:50',
    '20:00'
  ]

  useEffect(() => {}, [])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setBookings(data)
        const statsData = {
          total: data.length,
          pending: data.filter((b: Booking) => b.status === 'pending').length,
          confirmed: data.filter((b: Booking) => b.status === 'confirmed').length,
          completed: data.filter((b: Booking) => b.status === 'completed').length,
          cancelled: data.filter((b: Booking) => b.status === 'cancelled').length
        }
        setStats(statsData)
      }
    } catch (error) {
      console.error('❌ خطا در دریافت رزروها:', error)
    }
    setLoading(false)
  }

  const fetchUnavailable = async () => {
    try {
      const { data: days, error: daysError } = await supabase
        .from('unavailable_days')
        .select('*')
        .order('created_at', { ascending: true })

      if (daysError) throw daysError
      if (days) setUnavailableDays(days)

      const { data: times, error: timesError } = await supabase
        .from('unavailable_times')
        .select('*')
        .order('date', { ascending: true })

      if (timesError) throw timesError
      if (times) setUnavailableTimes(times)
      
    } catch (error) {
      console.error('❌ خطا:', error)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings()
      fetchUnavailable()
    }
  }, [isAuthenticated])

  const convertToPersianDate = (dateStr: string) => {
    if (!dateStr) return '-'
    try {
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) return dateStr
      const persianDate = new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(date)
      return persianDate
    } catch {
      return dateStr
    }
  }

  const handleDateChange = (value: any) => {
    if (value) {
      const date = value.toDate()
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      setNewUnavailable({...newUnavailable, date: `${year}-${month}-${day}`})
    }
  }

  const addUnavailableTime = async () => {
    if (!newUnavailable.date || !newUnavailable.start_time || !newUnavailable.end_time) {
      alert('لطفاً تاریخ، ساعت شروع و پایان را وارد کنید')
      return
    }
    try {
      const { error } = await supabase
        .from('unavailable_times')
        .insert([newUnavailable])
      if (error) throw error
      setNewUnavailable({ date: '', start_time: '', end_time: '', reason: '' })
      setShowAddUnavailable(false)
      await fetchUnavailable()
      alert('✅ زمان غیرفعال با موفقیت اضافه شد')
    } catch (error: any) {
      alert('خطا: ' + error.message)
    }
  }

  const deleteUnavailableTime = async (id: string) => {
    if (!confirm('آیا مطمئن هستید؟')) return
    try {
      const { error } = await supabase
        .from('unavailable_times')
        .delete()
        .eq('id', id)
      if (error) throw error
      await fetchUnavailable()
    } catch (error: any) {
      alert('خطا: ' + error.message)
    }
  }

  const toggleUnavailableDay = async (day: string) => {
    const existing = unavailableDays.find(d => d.day === day)
    try {
      if (existing) {
        const { error } = await supabase
          .from('unavailable_days')
          .delete()
          .eq('id', existing.id)
        if (error) throw error
        setUnavailableDays(unavailableDays.filter(d => d.day !== day))
      } else {
        const { data, error } = await supabase
          .from('unavailable_days')
          .insert([{ day }])
          .select()
        if (error) throw error
        if (data) setUnavailableDays([...unavailableDays, ...data])
      }
    } catch (error: any) {
      alert('خطا: ' + error.message)
    }
  }

  const updateStatus = async (id: string, status: Booking['status']) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)
      if (error) throw error
      await fetchBookings()
    } catch (error: any) {
      alert('خطا: ' + error.message)
    }
  }

  const deleteBooking = async (id: string) => {
    if (!confirm('آیا مطمئن هستید؟')) return
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id)
      if (error) throw error
      await fetchBookings()
    } catch (error: any) {
      alert('خطا: ' + error.message)
    }
  }

  // ===== ورود با رمز =====
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) {
      alert('لطفاً رمز عبور را وارد کنید!')
      return
    }
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setPassword('')
    } else {
      alert('رمز عبور اشتباه است!')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword('')
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
      case 'pending': return 'در انتظار'
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

  const openModal = (type: 'note' | 'service', content: string, customerName: string, title: string) => {
    setModalData({ isOpen: true, type, title, content, customerName })
  }

  const closeModal = () => {
    setModalData({ isOpen: false, type: null, title: '', content: '', customerName: '' })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#447F98] to-[#629BB6] p-4">
        <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl max-w-md w-full border border-white/20">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🔐</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#447F98]">پنل مدیریت</h1>
            <p className="text-gray-500 text-sm sm:text-base">برای ورود رمز عبور را وارد کنید</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="رمز عبور"
              className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#447F98] focus:border-transparent outline-none transition-all text-right"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-[#447F98] to-[#629BB6] hover:from-[#629BB6] hover:to-[#447F98] text-white p-3 sm:p-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] shadow-lg"
            >
              ورود
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#DADEE1] pt-20 sm:pt-24 px-3 sm:px-4 pb-8 sm:pb-12">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#447F98]">📋 پنل مدیریت</h1>
            <p className="text-gray-500 text-xs sm:text-sm">مدیریت رزروها و زمان‌های غیرفعال</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-xl transition-all text-xs sm:text-sm font-semibold"
          >
            🚪 خروج
          </button>
        </div>

        <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'bg-[#447F98] text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            📅 رزروها ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('unavailable')}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base whitespace-nowrap ${
              activeTab === 'unavailable'
                ? 'bg-[#447F98] text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            🚫 زمان‌های غیرفعال ({unavailableTimes.length + unavailableDays.length})
          </button>
        </div>

        {activeTab === 'bookings' ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-4 sm:mb-8">
              <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-md hover:shadow-lg transition-all border-r-4 border-[#447F98]">
                <p className="text-xl sm:text-2xl font-bold text-[#447F98]">{stats.total}</p>
                <p className="text-gray-500 text-[10px] sm:text-xs">📊 کل</p>
              </div>
              <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-md hover:shadow-lg transition-all border-r-4 border-yellow-500">
                <p className="text-xl sm:text-2xl font-bold text-yellow-500">{stats.pending}</p>
                <p className="text-gray-500 text-[10px] sm:text-xs">⏳ در انتظار</p>
              </div>
              <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-md hover:shadow-lg transition-all border-r-4 border-blue-500">
                <p className="text-xl sm:text-2xl font-bold text-blue-500">{stats.confirmed}</p>
                <p className="text-gray-500 text-[10px] sm:text-xs">✅ تایید</p>
              </div>
              <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-md hover:shadow-lg transition-all border-r-4 border-green-500">
                <p className="text-xl sm:text-2xl font-bold text-green-500">{stats.completed}</p>
                <p className="text-gray-500 text-[10px] sm:text-xs">🎉 انجام</p>
              </div>
              <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-md hover:shadow-lg transition-all border-r-4 border-red-500">
                <p className="text-xl sm:text-2xl font-bold text-red-500">{stats.cancelled}</p>
                <p className="text-gray-500 text-[10px] sm:text-xs">❌ لغو</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-3 sm:p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h2 className="font-bold text-gray-700 text-sm sm:text-base">📋 لیست رزروها</h2>
                <button
                  onClick={fetchBookings}
                  className="text-[#447F98] hover:text-[#629BB6] text-xs sm:text-sm font-semibold transition-all"
                >
                  🔄 بروزرسانی
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12 sm:py-16">
                  <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-[#447F98] mx-auto"></div>
                  <p className="text-gray-500 mt-3 sm:mt-4 text-sm sm:text-base">در حال بارگذاری...</p>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-12 sm:py-16 text-gray-400">
                  <div className="text-5xl sm:text-6xl mb-4">📭</div>
                  <p className="text-base sm:text-lg">هیچ رزروی ثبت نشده است</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead className="bg-[#447F98] text-white">
                      <tr>
                        <th className="p-2 sm:p-4 text-right text-xs sm:text-sm font-semibold">#</th>
                        <th className="p-2 sm:p-4 text-right text-xs sm:text-sm font-semibold">نام</th>
                        <th className="p-2 sm:p-4 text-right text-xs sm:text-sm font-semibold">تلفن</th>
                        <th className="p-2 sm:p-4 text-right text-xs sm:text-sm font-semibold">سرویس</th>
                        <th className="p-2 sm:p-4 text-right text-xs sm:text-sm font-semibold">تاریخ</th>
                        <th className="p-2 sm:p-4 text-right text-xs sm:text-sm font-semibold">زمان</th>
                        <th className="p-2 sm:p-4 text-right text-xs sm:text-sm font-semibold">توضیحات</th>
                        <th className="p-2 sm:p-4 text-right text-xs sm:text-sm font-semibold">وضعیت</th>
                        <th className="p-2 sm:p-4 text-right text-xs sm:text-sm font-semibold">عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking, index) => (
                        <motion.tr
                          key={booking.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-2 sm:p-4 text-gray-400 text-xs sm:text-sm">{index + 1}</td>
                          <td className="p-2 sm:p-4 font-medium text-gray-800 text-xs sm:text-sm">{booking.name}</td>
                          <td className="p-2 sm:p-4 text-gray-600 text-xs sm:text-sm dir-ltr">{booking.phone}</td>
                          <td className="p-2 sm:p-4 text-gray-600 text-xs sm:text-sm max-w-[120px]">
                            {booking.service.length > 20 ? (
                              <button
                                onClick={() => openModal('service', booking.service, booking.name, '📌 جزئیات سرویس')}
                                className="text-[#447F98] hover:text-[#629BB6] transition-colors text-xs flex items-center gap-1 w-full group"
                              >
                                <span className="truncate flex-1 text-right group-hover:underline">{booking.service}</span>
                                <span className="text-[10px] flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">📄</span>
                              </button>
                            ) : (
                              <span className="block truncate">{booking.service}</span>
                            )}
                          </td>
                          <td className="p-2 sm:p-4 text-gray-600 text-xs sm:text-sm">{convertToPersianDate(booking.date)}</td>
                          <td className="p-2 sm:p-4 text-gray-600 text-xs sm:text-sm">{booking.start_time} - {booking.end_time}</td>
                          <td className="p-2 sm:p-4 text-gray-600 text-xs sm:text-sm max-w-[150px]">
                            {booking.note ? (
                              <button
                                onClick={() => openModal('note', booking.note!, booking.name, '📝 توضیحات کامل')}
                                className="text-[#447F98] hover:text-[#629BB6] transition-colors text-xs flex items-center gap-1 w-full group"
                              >
                                <span className="truncate flex-1 text-right group-hover:underline">{booking.note}</span>
                                <span className="text-[10px] flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">📄</span>
                              </button>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="p-2 sm:p-4">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-white text-[10px] sm:text-xs font-semibold ${getStatusColor(booking.status)} whitespace-nowrap`}>
                              {getStatusEmoji(booking.status)} {getStatusText(booking.status)}
                            </span>
                          </td>
                          <td className="p-2 sm:p-4">
                            <div className="flex gap-1 sm:gap-2 flex-wrap">
                              <select
                                onChange={(e) => updateStatus(booking.id, e.target.value as Booking['status'])}
                                value={booking.status}
                                className="text-[10px] sm:text-xs border rounded-lg px-1.5 sm:px-2 py-1 bg-white focus:ring-1 focus:ring-[#447F98] outline-none max-w-[80px] sm:max-w-full"
                              >
                                <option value="pending">⏳ در انتظار</option>
                                <option value="confirmed">✅ تایید</option>
                                <option value="completed">🎉 انجام</option>
                                <option value="cancelled">❌ لغو</option>
                              </select>
                              <button
                                onClick={() => deleteBooking(booking.id)}
                                className="text-red-500 hover:text-red-700 text-xs sm:text-sm transition-colors"
                                title="حذف"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        ) : (
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
              <h3 className="font-bold text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">📅 روزهای غیرفعال هفته</h3>
              <div className="flex flex-wrap gap-2">
                {weekDays.map((day) => {
                  const isDisabled = unavailableDays.some(d => d.day === day.value)
                  return (
                    <button
                      key={day.value}
                      onClick={() => toggleUnavailableDay(day.value)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm transition-all ${
                        isDisabled
                          ? 'bg-red-500 text-white line-through'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {isDisabled ? '🚫 ' : ''}{day.label}
                    </button>
                  )
                })}
              </div>
              <p className="text-xs text-gray-400 mt-3">با کلیک روی هر روز، آن را غیرفعال/فعال کنید</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6">
              <button
                onClick={() => setShowAddUnavailable(!showAddUnavailable)}
                className="bg-[#8908E1] hover:bg-[#629BB6] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base"
              >
                {showAddUnavailable ? '✕ بستن' : '➕ اضافه کردن زمان غیرفعال'}
              </button>

              {showAddUnavailable && (
                <div className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">📅 تاریخ</label>
                      <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        value={newUnavailable.date ? new Date(newUnavailable.date) : undefined}
                        onChange={handleDateChange}
                        minDate={new Date()}
                        placeholder="تاریخ را انتخاب کنید..."
                        className="teal w-full"
                        inputClass="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#447F98] focus:border-transparent outline-none transition-all text-right text-sm"
                        format="YYYY/MM/DD"
                        containerClassName="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">⏰ ساعت شروع</label>
                      <select
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#447F98] focus:border-transparent outline-none text-sm appearance-none bg-white"
                        value={newUnavailable.start_time}
                        onChange={(e) => setNewUnavailable({...newUnavailable, start_time: e.target.value})}
                      >
                        <option value="">ساعت شروع</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">⏰ ساعت پایان</label>
                      <select
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#447F98] focus:border-transparent outline-none text-sm appearance-none bg-white"
                        value={newUnavailable.end_time}
                        onChange={(e) => setNewUnavailable({...newUnavailable, end_time: e.target.value})}
                      >
                        <option value="">ساعت پایان</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="دلیل (اختیاری)"
                        className="flex-1 p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#447F98] outline-none"
                        value={newUnavailable.reason}
                        onChange={(e) => setNewUnavailable({...newUnavailable, reason: e.target.value})}
                      />
                      <button
                        onClick={addUnavailableTime}
                        className="bg-[#447F98] hover:bg-[#629BB6] text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all text-sm whitespace-nowrap"
                      >
                        ذخیره
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-3 sm:p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-700 text-sm sm:text-base">📋 لیست زمان‌های غیرفعال</h3>
              </div>
              {unavailableTimes.length === 0 ? (
                <div className="text-center py-8 sm:py-12 text-gray-400">
                  <div className="text-4xl sm:text-5xl mb-4">✅</div>
                  <p className="text-sm sm:text-base">هیچ زمان غیرفعالی ثبت نشده است</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px]">
                    <thead className="bg-[#447F98] text-white">
                      <tr>
                        <th className="p-2 sm:p-4 text-right text-xs sm:text-sm">تاریخ</th>
                        <th className="p-2 sm:p-4 text-right text-xs sm:text-sm">شروع</th>
                        <th className="p-2 sm:p-4 text-right text-xs sm:text-sm">پایان</th>
                        <th className="p-2 sm:p-4 text-right text-xs sm:text-sm">دلیل</th>
                        <th className="p-2 sm:p-4 text-right text-xs sm:text-sm">عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unavailableTimes.map((time) => (
                        <motion.tr
                          key={time.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="p-2 sm:p-4 text-xs sm:text-sm">{convertToPersianDate(time.date)}</td>
                          <td className="p-2 sm:p-4 text-xs sm:text-sm">{time.start_time}</td>
                          <td className="p-2 sm:p-4 text-xs sm:text-sm">{time.end_time}</td>
                          <td className="p-2 sm:p-4 text-xs sm:text-sm text-gray-500">{time.reason || '-'}</td>
                          <td className="p-2 sm:p-4">
                            <button
                              onClick={() => deleteUnavailableTime(time.id)}
                              className="text-red-500 hover:text-red-700 text-sm transition-colors"
                            >
                              🗑️
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-center text-gray-400 text-xs mt-4 sm:mt-6">
          آخرین بروزرسانی: {new Date().toLocaleString('fa-IR')}
        </div>
      </div>

      {modalData.isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start p-4 sm:p-6 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-[#447F98] text-lg sm:text-xl flex items-center gap-2">
                  <span>{modalData.type === 'note' ? '📝' : '📌'}</span>
                  <span>{modalData.title}</span>
                </h3>
                <p className="text-gray-400 text-xs mt-1">
                  {modalData.customerName && `مشتری: ${modalData.customerName}`}
                </p>
              </div>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 sm:p-6">
              <div className={`rounded-xl p-4 sm:p-6 max-h-[50vh] overflow-y-auto whitespace-pre-wrap break-words text-sm sm:text-base leading-relaxed border ${
                modalData.type === 'note' 
                  ? 'bg-amber-50 border-amber-200 text-gray-700' 
                  : 'bg-blue-50 border-blue-200 text-gray-700'
              }`}>
                {modalData.content}
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t border-gray-100">
              <button
                onClick={closeModal}
                className="w-full bg-[#447F98] hover:bg-[#629BB6] text-white py-2.5 sm:py-3 rounded-xl transition-colors text-sm sm:text-base font-semibold"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-in {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}
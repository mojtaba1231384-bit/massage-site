'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Select from 'react-select'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import 'react-multi-date-picker/styles/colors/teal.css'
import { supabase } from '@/lib/supabase'

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: '',
    startTime: '',
    endTime: '',
    sessions: '1',
    note: ''
  })
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    startTime: '',
    endTime: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    service: false,
    date: false,
    startTime: false,
    endTime: false
  })
  const [unavailableDays, setUnavailableDays] = useState<string[]>([])
  const [unavailableTimes, setUnavailableTimes] = useState<any[]>([])
  const [existingBookings, setExistingBookings] = useState<any[]>([])
  const [weekendMessage, setWeekendMessage] = useState('')
  const [isWeekend, setIsWeekend] = useState(false)
  const [isToday, setIsToday] = useState(false)
  const [selectedDate, setSelectedDate] = useState<any>(null)
  const [pickerKey, setPickerKey] = useState(0)

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

  const timeOptions = timeSlots.map(time => ({
    value: time,
    label: time
  }))

  const services = [
    { 
      id: 'massage-1',
      name: 'ماساژ ریلکسی',
      basePrice: 950000,
      durations: [{ minutes: 60, price: 950000 }]
    },
    { 
      id: 'massage-2',
      name: 'ماساژ ترکیبی رفع گرفتگی',
      basePrice: 1200000,
      durations: [{ minutes: 60, price: 1200000 }]
    },
    { 
      id: 'massage-3',
      name: 'ماساژ آروماتراپی',
      basePrice: 950000,
      durations: [{ minutes: 60, price: 950000 }]
    },
    { 
      id: 'massage-4',
      name: 'ماساژ روسی',
      basePrice: 1200000,
      durations: [{ minutes: 60, price: 1200000 }]
    },
    { 
      id: 'massage-5',
      name: 'ماساژ سوئدی',
      basePrice: 1100000,
      durations: [{ minutes: 60, price: 1100000 }]
    },
    { 
      id: 'massage-6',
      name: 'ماساژ درمانی و بهبودی',
      basePrice: 650000,
      durations: [{ minutes: 20, price: 650000 }]
    },
    { 
      id: 'massage-7',
      name: 'ماساژ تخصصی پا',
      basePrice: 950000,
      durations: [{ minutes: 60, price: 950000 }]
    },
    { 
      id: 'massage-8',
      name: 'ماساژ گردش خون',
      basePrice: 1200000,
      durations: [{ minutes: 60, price: 1200000 }]
    },
    { 
      id: 'massage-9',
      name: 'ماساژ سنگ داغ',
      basePrice: 1300000,
      durations: [{ minutes: 60, price: 1300000 }]
    },
    { 
      id: 'massage-10',
      name: 'ماساژ شمع',
      basePrice: 1700000,
      durations: [{ minutes: 60, price: 1700000 }]
    },
    { 
      id: 'massage-11',
      name: 'ماساژ صورت',
      basePrice: 450000,
      durations: [{ minutes: 60, price: 450000 }]
    },
    { 
      id: 'massage-12',
      name: 'بادکش کمر',
      basePrice: 300000,
      durations: [{ minutes: 60, price: 300000 }]
    },
    { 
      id: 'massage-13',
      name: 'بادکش کل بدن',
      basePrice: 500000,
      durations: [{ minutes: 60, price: 500000 }]
    },
    { 
      id: 'massage-14',
      name: 'ماساژ هربال',
      basePrice: 1500000,
      durations: [{ minutes: 60, price: 1500000 }]
    },
  ]

  const customSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: '#f9fafb',
      borderColor: state.isFocused ? '#447F98' : '#e5e7eb',
      borderWidth: '2px',
      borderRadius: '12px',
      padding: '2px 4px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(68, 127, 152, 0.2)' : 'none',
      '&:hover': {
        borderColor: '#447F98'
      },
      minHeight: '56px',
    }),
    menu: (provided: any) => ({
      ...provided,
      maxHeight: '200px',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
      border: '1px solid #e5e7eb',
      marginTop: '4px',
      zIndex: 99999,
      position: 'absolute',
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: '180px',
      overflowY: 'auto',
      padding: '4px',
      '&::-webkit-scrollbar': {
        width: '6px',
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
        borderRadius: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#447F98',
        borderRadius: '8px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#629BB6',
      }
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#447F98' : state.isFocused ? '#e8f0f5' : 'transparent',
      color: state.isSelected ? 'white' : '#1f2937',
      borderRadius: '8px',
      padding: '10px 14px',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#447F98',
        color: 'white'
      }
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#9ca3af'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#1f2937',
      fontWeight: '500'
    }),
    indicatorSeparator: () => ({
      display: 'none'
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? '#447F98' : '#9ca3af',
      transition: 'transform 0.2s',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)'
    })
  }

  const errorSelectStyles = {
    ...customSelectStyles,
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: '#f9fafb',
      borderColor: state.isFocused ? '#447F98' : '#ef4444',
      borderWidth: '2px',
      borderRadius: '12px',
      padding: '2px 4px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(68, 127, 152, 0.2)' : '0 0 0 3px rgba(239, 68, 68, 0.2)',
      '&:hover': {
        borderColor: '#ef4444'
      },
      minHeight: '56px',
    })
  }

  useEffect(() => {
    const fetchUnavailableData = async () => {
      try {
        const { data: days, error: daysError } = await supabase
          .from('unavailable_days')
          .select('day')
        
        if (daysError) {
          console.error('❌ خطا در دریافت روزها:', daysError)
          return
        }
        
        if (days && days.length > 0) {
          const dayList = days.map(d => d.day)
          setUnavailableDays(dayList)
        } else {
          setUnavailableDays([])
        }

        const { data: times, error: timesError } = await supabase
          .from('unavailable_times')
          .select('*')
        
        if (timesError) {
          console.error('❌ خطا در دریافت زمان‌ها:', timesError)
          return
        }
        
        if (times) {
          setUnavailableTimes(times)
        }
      } catch (error) {
        console.error('❌ خطا:', error)
      }
    }

    fetchUnavailableData()

    const interval = setInterval(() => {
      fetchUnavailableData()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const fetchExistingBookings = async (date: string) => {
    if (!date) return
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('date', date)
      .not('status', 'eq', 'cancelled')

    if (!error && data) {
      setExistingBookings(data)
    }
  }

  useEffect(() => {
    if (formData.date) {
      fetchExistingBookings(formData.date)
    }
  }, [formData.date])

  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return 0
    const [startH, startM] = start.split(':').map(Number)
    const [endH, endM] = end.split(':').map(Number)
    return (endH * 60 + endM) - (startH * 60 + startM)
  }

  const getPrice = (serviceId: string, duration: number) => {
    const service = services.find(s => s.id === serviceId)
    if (!service) return 0
    let closest = service.durations[0]
    for (const d of service.durations) {
      if (Math.abs(d.minutes - duration) < Math.abs(closest.minutes - duration)) {
        closest = d
      }
    }
    return closest.price
  }

  const getServiceName = (id: string) => {
    const service = services.find(s => s.id === id)
    return service ? service.name : ''
  }

  const getDurationText = (minutes: number) => {
    if (minutes === 0) return ''
    if (minutes === 20) return '۲۰ دقیقه'
    if (minutes === 60) return '۱ ساعت'
    return `${minutes} دقیقه`
  }

  const getFinalPrice = () => {
    const duration = calculateDuration(formData.startTime, formData.endTime)
    const basePrice = getPrice(formData.service, duration)
    const sessions = parseInt(formData.sessions)
    
    if (sessions >= 10) return Math.floor(basePrice * sessions * 0.8)
    if (sessions >= 5) return Math.floor(basePrice * sessions * 0.9)
    if (sessions >= 2) return Math.floor(basePrice * sessions * 0.95)
    return basePrice * sessions
  }

  const getDeposit = () => {
    return Math.floor(getFinalPrice() * 0.1)
  }

  const checkIfToday = (dateStr: string) => {
    if (!dateStr) return false
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const todayStr = `${year}-${month}-${day}`
    return dateStr === todayStr
  }

  const getCurrentTime = () => {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const isDayUnavailable = (date: string) => {
    if (!date) return false
    
    const dayOfWeek = new Date(date).toLocaleDateString('fa-IR', { weekday: 'long' })
    const dayMap: Record<string, string> = {
      'شنبه': 'saturday',
      'یکشنبه': 'sunday',
      'دوشنبه': 'monday',
      'سه‌شنبه': 'tuesday',
      'چهارشنبه': 'wednesday',
      'پنجشنبه': 'thursday',
      'جمعه': 'friday'
    }
    const dayKey = dayMap[dayOfWeek]
    
    if (dayKey === 'thursday' || dayKey === 'friday') {
      setWeekendMessage(`📞 روز ${dayOfWeek} فقط با هماهنگی قبلی امکان‌پذیر است. لطفاً با شماره ۰۹۹۰۲۴۱۵۰۲۴ تماس بگیرید.`)
      setIsWeekend(true)
      return true
    }
    
    setWeekendMessage('')
    setIsWeekend(false)
    return unavailableDays.includes(dayKey)
  }

  const isTimeUnavailable = (date: string, start: string, end: string) => {
    if (!date || !start || !end) return false
    
    return unavailableTimes.some((t: any) => {
      if (t.date !== date) return false
      const tStart = t.start_time
      const tEnd = t.end_time
      return (start >= tStart && start < tEnd) || 
             (end > tStart && end <= tEnd) ||
             (start <= tStart && end >= tEnd)
    })
  }

  const hasBookingConflict = (date: string, start: string, end: string) => {
    if (!date || !start || !end) return false
    
    return existingBookings.some((booking: any) => {
      const bStart = booking.start_time
      const bEnd = booking.end_time
      return (start >= bStart && start < bEnd) || 
             (end > bStart && end <= bEnd) ||
             (start <= bStart && end >= bEnd)
    })
  }

  const getAvailableStartTimes = () => {
    if (!formData.date) return timeOptions
    
    const isTodayDate = checkIfToday(formData.date)
    const currentTimeStr = getCurrentTime()
    
    return timeOptions.filter(option => {
      const time = option.value
      
      if (isTodayDate && time <= currentTimeStr) {
        return false
      }
      
      const isUnavailable = unavailableTimes.some((t: any) => {
        if (t.date !== formData.date) return false
        const tStart = t.start_time
        const tEnd = t.end_time
        return time >= tStart && time < tEnd
      })
      
      if (isUnavailable) return false
      
      const hasConflict = existingBookings.some((booking: any) => {
        const bStart = booking.start_time
        const bEnd = booking.end_time
        return time >= bStart && time < bEnd
      })
      
      return !hasConflict
    })
  }

  const getAvailableEndTimes = () => {
    if (!formData.startTime || !formData.date) return []
    
    const startIndex = timeSlots.indexOf(formData.startTime)
    if (startIndex === -1) return []
    
    const isTherapy = formData.service === 'massage-6'
    const isTodayDate = checkIfToday(formData.date)
    const currentTimeStr = getCurrentTime()
    
    return timeSlots.filter((time, index) => {
      if (index <= startIndex) return false
      
      const duration = calculateDuration(formData.startTime, time)
      
      if (isTherapy) {
        if (duration !== 20) return false
      }
      else {
        if (duration !== 60) return false
      }
      
      if (isTodayDate && time <= currentTimeStr) {
        return false
      }
      
      if (isTimeUnavailable(formData.date, formData.startTime, time)) return false
      
      if (hasBookingConflict(formData.date, formData.startTime, time)) return false
      
      return true
    }).map(time => ({
      value: time,
      label: time
    }))
  }

  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'لطفاً نام خود را وارد کنید'
        if (value.trim().length < 3) return 'نام باید حداقل ۳ کاراکتر باشد'
        return ''
      case 'phone':
        if (!value.trim()) return 'لطفاً شماره تماس را وارد کنید'
        const phoneRegex = /^(09|098|\+98|0098)[0-9]{9}$/
        const cleaned = value.trim().replace(/[\s\-]/g, '')
        if (!phoneRegex.test(cleaned)) return 'شماره تماس نامعتبر است (مثال: 09123456789 یا +989123456789)'
        return ''
      case 'service':
        if (!value) return 'لطفاً یک سرویس انتخاب کنید'
        return ''
      case 'date':
        if (!value) return 'لطفاً تاریخ را انتخاب کنید'
        if (isDayUnavailable(value)) {
          const dayName = new Date(value).toLocaleDateString('fa-IR', { weekday: 'long' })
          if (dayName === 'پنجشنبه' || dayName === 'جمعه') {
            return `روز ${dayName} فقط با هماهنگی قبلی امکان‌پذیر است. لطفاً با ما تماس بگیرید.`
          }
          return `روز ${dayName} غیرفعال است! لطفاً روز دیگری را انتخاب کنید`
        }
        return ''
      case 'startTime':
        if (!value) return 'لطفاً ساعت شروع را انتخاب کنید'
        return ''
      case 'endTime':
        if (!value) return 'لطفاً ساعت پایان را انتخاب کنید'
        const duration = calculateDuration(formData.startTime, value)
        const isTherapy = formData.service === 'massage-6'
        
        if (isTherapy) {
          if (duration !== 20) {
            return 'مدت زمان باید ۲۰ دقیقه باشد'
          }
        } else {
          if (duration !== 60) {
            return 'مدت زمان باید ۱ ساعت باشد'
          }
        }
        return ''
      default:
        return ''
    }
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, formData[field as keyof typeof formData])
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
    setTouched(prev => ({ ...prev, [field]: false }))
  }

  const handleDateChange = (value: any) => {
    if (value) {
      const date = value.toDate()
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const dateStr = `${year}-${month}-${day}`
      
      setSelectedDate(value)
      setPickerKey(prev => prev + 1)
      
      setFormData(prev => ({ 
        ...prev, 
        date: dateStr,
        startTime: '',
        endTime: ''
      }))
      
      setIsToday(checkIfToday(dateStr))
      
      const dayOfWeek = new Date(dateStr).toLocaleDateString('fa-IR', { weekday: 'long' })
      if (dayOfWeek === 'پنجشنبه' || dayOfWeek === 'جمعه') {
        setWeekendMessage(`📞 روز ${dayOfWeek} فقط با هماهنگی قبلی امکان‌پذیر است. لطفاً با شماره ۰۹۹۰۲۴۱۵۰۲۴ تماس بگیرید.`)
        setIsWeekend(true)
      } else {
        setWeekendMessage('')
        setIsWeekend(false)
      }
      
      setErrors(prev => ({ ...prev, date: '', startTime: '', endTime: '' }))
      setTouched(prev => ({ ...prev, date: false, startTime: false, endTime: false }))
    }
  }

  const validateForm = () => {
    const fields = ['name', 'phone', 'service', 'date', 'startTime', 'endTime']
    let isValid = true
    const newErrors: any = {}
    const newTouched: any = {}

    fields.forEach(field => {
      newTouched[field] = true
      const error = validateField(field, formData[field as keyof typeof formData])
      newErrors[field] = error
      if (error) isValid = false
    })

    setTouched(prev => ({ ...prev, ...newTouched }))
    setErrors(prev => ({ ...prev, ...newErrors }))
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isWeekend) {
      alert('روزهای پنجشنبه و جمعه فقط با هماهنگی قبلی امکان‌پذیر است. لطفاً با شماره ۰۹۹۰۲۴۱۵۰۲۴ تماس بگیرید.')
      return
    }
    
    if (!validateForm()) return

    if (isDayUnavailable(formData.date)) {
      const dayName = new Date(formData.date).toLocaleDateString('fa-IR', { weekday: 'long' })
      if (dayName === 'پنجشنبه' || dayName === 'جمعه') {
        alert('این روز فقط با هماهنگی قبلی امکان‌پذیر است. لطفاً با شماره ۰۹۹۰۲۴۱۵۰۲۴ تماس بگیرید.')
      } else {
        alert('این روز غیرفعال است!')
      }
      return
    }
    
    if (isTimeUnavailable(formData.date, formData.startTime, formData.endTime)) {
      alert('این بازه زمانی غیرفعال است!')
      return
    }

    if (hasBookingConflict(formData.date, formData.startTime, formData.endTime)) {
      alert('⏰ این بازه زمانی قبلاً توسط شخص دیگری رزرو شده است! لطفاً زمان دیگری را انتخاب کنید.')
      return
    }

    setIsSubmitting(true)

    try {
      const bookingData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        service: getServiceName(formData.service),
        date: formData.date,
        start_time: formData.startTime,
        end_time: formData.endTime,
        price: getFinalPrice(),
        deposit: getDeposit(),
        note: formData.note || null,
        status: 'pending'
      }

      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()

      if (error) throw error

      setIsSuccess(true)
      
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        date: '',
        startTime: '',
        endTime: '',
        sessions: '1',
        note: ''
      })

    } catch (error: any) {
      alert('خطا در ثبت رزرو: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-xl p-12 text-center border-2 border-green-400"
      >
        <div className="text-7xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-green-700 mb-2">رزرو شما با موفقیت ثبت شد!</h3>
        <p className="text-gray-600 mb-4">به زودی با شما تماس می‌گیریم.</p>
        <p className="text-sm text-gray-500 mb-6">📋 اطلاعات رزرو برای شما ارسال شد.</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => setIsSuccess(false)}
            className="bg-[#447F98] hover:bg-[#629BB6] text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
          >
            📝 ثبت رزرو جدید
          </button>
          <button 
            onClick={() => window.location.href = '/#services'}
            className="bg-gray-100 hover:bg-gray-200 text-[#447F98] px-6 py-3 rounded-xl font-semibold transition-all border-2 border-[#447F98]"
          >
            👈 بازگشت به خدمات
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.form 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit} 
      className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      noValidate
    >
      <div className="grid md:grid-cols-2 gap-6">
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">👤 نام و نام خانوادگی</label>
          <input
            type="text"
            required
            placeholder="مثال:زهرا هیبتیان"
            className={`w-full p-4 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-[#447F98] focus:border-transparent outline-none transition-all ${
              errors.name && touched.name ? 'border-red-500 bg-red-50' : 'border-gray-200'
            }`}
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
          />
          {errors.name && touched.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">📞 شماره تماس</label>
          <input
            type="tel"
            required
            placeholder="مثال: 09123456789 یا +989123456789"
            className={`w-full p-4 bg-gray-50 border-2 rounded-xl focus:ring-2 focus:ring-[#447F98] focus:border-transparent outline-none transition-all ${
              errors.phone && touched.phone ? 'border-red-500 bg-red-50' : 'border-gray-200'
            }`}
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
          />
          {errors.phone && touched.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">✉️ ایمیل (اختیاری)</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#447F98] focus:border-transparent outline-none transition-all"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">🔢 تعداد جلسات</label>
          <select
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#447F98] focus:border-transparent outline-none appearance-none"
            value={formData.sessions}
            onChange={(e) => setFormData({...formData, sessions: e.target.value})}
          >
            <option value="1">۱ جلسه</option>
            <option value="2">۲ جلسه (۵٪ تخفیف)</option>
            <option value="5">۵ جلسه (۱۰٪ تخفیف)</option>
            <option value="10">۱۰ جلسه (۲۰٪ تخفیف)</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">💆 انتخاب سرویس</label>
          <Select
            options={services.map(s => ({ value: s.id, label: `${s.name} (${s.basePrice.toLocaleString()} تومان)` }))}
            value={services.find(s => s.id === formData.service) ? { value: formData.service, label: getServiceName(formData.service) } : null}
            onChange={(selected: any) => {
              setFormData(prev => ({ ...prev, service: selected?.value || '' }))
              setErrors(prev => ({ ...prev, service: '' }))
              setTouched(prev => ({ ...prev, service: false }))
            }}
            onBlur={() => handleBlur('service')}
            placeholder="سرویس مورد نظر را انتخاب کنید..."
            isClearable
            styles={errors.service && touched.service ? errorSelectStyles : customSelectStyles}
            className="react-select-container"
            classNamePrefix="react-select"
            menuPortalTarget={typeof document !== 'undefined' ? document.body : undefined}
            menuPosition="fixed"
          />
          {errors.service && touched.service && (
            <p className="text-red-500 text-xs mt-1">{errors.service}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">📅 تاریخ</label>
          <div className={`rounded-xl border-2 overflow-hidden transition-all ${
            errors.date && touched.date ? 'border-red-500 bg-red-50' : 'border-gray-200'
          }`}>
            <DatePicker
              key={pickerKey}
              calendar={persian}
              locale={persian_fa}
              value={selectedDate}
              onChange={handleDateChange}
              minDate={new Date()}
              placeholder="تاریخ را انتخاب کنید..."
              className="teal w-full"
              inputClass="w-full p-4 bg-transparent focus:ring-2 focus:ring-[#447F98] focus:border-transparent outline-none transition-all text-right"
              format="YYYY/MM/DD"
              containerClassName="w-full"
            />
          </div>
          {weekendMessage && (
            <p className="text-amber-600 text-xs mt-1 font-semibold">{weekendMessage}</p>
          )}
          {errors.date && touched.date && !weekendMessage && (
            <p className="text-red-500 text-xs mt-1">{errors.date}</p>
          )}
          {isToday && (
            <p className="text-blue-600 text-xs mt-1 font-semibold">📌 امروز - فقط ساعت‌های آینده قابل رزرو هستند</p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">⏰ ساعت شروع</label>
          <Select
            options={getAvailableStartTimes()}
            value={timeOptions.find(opt => opt.value === formData.startTime)}
            onChange={(selected: any) => {
              setFormData(prev => ({ 
                ...prev, 
                startTime: selected?.value || '', 
                endTime: '' 
              }))
              setErrors(prev => ({ ...prev, startTime: '', endTime: '' }))
              setTouched(prev => ({ ...prev, startTime: false, endTime: false }))
            }}
            onBlur={() => handleBlur('startTime')}
            placeholder="ساعت شروع را انتخاب کنید..."
            isClearable
            styles={errors.startTime && touched.startTime ? errorSelectStyles : customSelectStyles}
            className="react-select-container"
            classNamePrefix="react-select"
            menuPortalTarget={document.body}
            menuPosition="fixed"
            menuShouldScrollIntoView={false}
          />
          {errors.startTime && touched.startTime && (
            <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">⏰ ساعت پایان</label>
          <Select
            options={getAvailableEndTimes()}
            value={timeOptions.find(opt => opt.value === formData.endTime)}
            onChange={(selected: any) => {
              setFormData(prev => ({ ...prev, endTime: selected?.value || '' }))
              setErrors(prev => ({ ...prev, endTime: '' }))
              setTouched(prev => ({ ...prev, endTime: false }))
            }}
            onBlur={() => handleBlur('endTime')}
            placeholder="ساعت پایان را انتخاب کنید..."
            isClearable
            isDisabled={!formData.startTime || !formData.date || isWeekend}
            styles={errors.endTime && touched.endTime ? errorSelectStyles : customSelectStyles}
            className="react-select-container"
            classNamePrefix="react-select"
            noOptionsMessage={() => 'ابتدا تاریخ و ساعت شروع را انتخاب کنید'}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            menuShouldScrollIntoView={false}
          />
          {errors.endTime && touched.endTime && (
            <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>
          )}
          {formData.startTime && formData.endTime && !errors.endTime && !isWeekend && (
            <p className="text-xs text-green-600 mt-1">
              ✅ مدت زمان: {getDurationText(calculateDuration(formData.startTime, formData.endTime))}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1">🕐 ساعات کاری: ۹ صبح تا ۸ شب</p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">📝 توضیحات</label>
          <textarea
            placeholder="نوع درد، مشکلات خاص، یا هر نکته‌ای که باید بدانیم..."
            rows={3}
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#447F98] focus:border-transparent outline-none transition-all resize-none"
            value={formData.note}
            onChange={(e) => setFormData({...formData, note: e.target.value})}
          />
        </div>
      </div>

      {formData.service && formData.startTime && formData.endTime && !isWeekend && (
        <div className="mt-6 p-4 bg-gradient-to-r from-[#447F98]/10 to-[#629BB6]/10 rounded-xl border border-[#447F98]/20">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">قیمت نهایی:</span>
            <span className="text-2xl font-bold text-[#447F98]">
              {getFinalPrice().toLocaleString()} تومان
            </span>
          </div>
          
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#447F98]/10">
            <span className="text-gray-500 text-sm">💳 پیش‌پرداخت (۱۰٪):</span>
            <span className="text-lg font-semibold text-[#8908E1]">
              {getDeposit().toLocaleString()} تومان
            </span>
          </div>
          
          <div className="text-xs text-gray-400 mt-1">
            {getServiceName(formData.service)} - {getDurationText(calculateDuration(formData.startTime, formData.endTime))} - {formData.sessions} جلسه
            {parseInt(formData.sessions) >= 2 && (
              <span className="text-green-500 mr-2">
                (با تخفیف)
              </span>
            )}
            <span className="mr-2">
              - {formData.startTime} تا {formData.endTime}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            مابقی هزینه پس از ارائه خدمت پرداخت می‌شود.
          </p>
        </div>
      )}

      {isWeekend && (
        <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-400 text-center">
          <p className="text-amber-700 font-semibold">
            ⚠️ روزهای پنجشنبه و جمعه فقط با هماهنگی قبلی امکان‌پذیر است.
          </p>
          <p className="text-amber-600 text-sm mt-1">
            لطفاً با شماره ۰۹۹۰۲۴۱۵۰۲۴ تماس بگیرید.
          </p>
        </div>
      )}

      <motion.button
        whileHover={!isWeekend ? { scale: 1.02 } : {}}
        whileTap={!isWeekend ? { scale: 0.98 } : {}}
        type="submit"
        disabled={isSubmitting || isWeekend}
        className={`w-full mt-8 p-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3 ${
          isWeekend 
            ? 'bg-gray-400 cursor-not-allowed opacity-60' 
            : 'bg-gradient-to-r from-[#447F98] to-[#629BB6] hover:from-[#629BB6] hover:to-[#447F98] text-white shadow-lg hover:shadow-xl'
        }`}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            در حال ثبت رزرو...
          </>
        ) : isWeekend ? (
          <>
            <span>🚫</span>
            رزرو در این روز امکان‌پذیر نیست
          </>
        ) : (
          <>
            <span>📅</span>
            ثبت رزرو (پیش‌پرداخت {getDeposit().toLocaleString()} تومان)
          </>
        )}
      </motion.button>

      <p className="text-xs text-gray-400 text-center mt-4">
        پس از ثبت رزرو، با شما تماس می‌گیریم. مابقی هزینه در محل پرداخت می‌شود.
      </p>
    </motion.form>
  )
}
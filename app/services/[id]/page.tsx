'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AnimationWrapper from '@/components/AnimationWrapper'

const priceData = [
  {
    id: 1,
    name: 'ماساژ ریلکسی',
    price: '۹۵۰,۰۰۰',
    duration: '۶۰ دقیقه',
    category: 'ماساژ',
    description: 'آرامش عمیق و رهایی از استرس روزانه با حرکات ملایم',
    icon: '🧘',
    popular: true
  },
  {
    id: 2,
    name: 'ماساژ ترکیبی رفع گرفتگی',
    price: '۱,۲۰۰,۰۰۰ - ۱,۵۰۰,۰۰۰',
    duration: '۶۰ دقیقه',
    category: 'ماساژ',
    description: 'ترکیبی از تکنیک‌های مختلف برای رفع گرفتگی‌های عضلانی',
    icon: '💪',
    popular: true
  },
  {
    id: 3,
    name: 'ماساژ آروماتراپی',
    price: '۹۵۰,۰۰۰',
    duration: '۶۰ دقیقه',
    category: 'ماساژ',
    description: 'ترکیب ماساژ با روغن‌های معطر برای آرامش ذهن و بدن',
    icon: '🌸',
    popular: false
  },
  {
    id: 4,
    name: 'ماساژ روسی',
    price: '۱,۲۰۰,۰۰۰',
    duration: '۶۰ دقیقه',
    category: 'ماساژ',
    description: 'تکنیک‌های قدرتمند برای رفع گرفتگی و افزایش انعطاف‌پذیری',
    icon: '🇷🇺',
    popular: false
  },
  {
    id: 5,
    name: 'ماساژ سوئدی',
    price: '۱,۱۰۰,۰۰۰',
    duration: '۶۰ دقیقه',
    category: 'ماساژ',
    description: 'حرکات ملایم و طولانی برای آرامش عمیق عضلات',
    icon: '🇸🇪',
    popular: true
  },
  {
    id: 6,
    name: 'ماساژ درمانی و بهبودی',
    price: '۶۵۰,۰۰۰ - ۷۵۰,۰۰۰',
    duration: '۲۰ دقیقه',
    category: 'ماساژ',
    description: 'ماساژ تخصصی برای درمان و بهبود آسیب‌های عضلانی',
    icon: '🩺',
    popular: false,
    note: '⏱ زمان: ۲۰ دقیقه'
  },
  {
    id: 7,
    name: 'ماساژ تخصصی پا',
    price: '۹۵۰,۰۰۰',
    duration: '۶۰ دقیقه',
    category: 'ماساژ',
    description: 'ماساژ تخصصی نقاط رفلکسی پا برای بهبود گردش خون',
    icon: '🦶',
    popular: false
  },
  {
    id: 8,
    name: 'ماساژ گردش خون',
    price: '۱,۲۰۰,۰۰۰',
    duration: '۶۰ دقیقه',
    category: 'ماساژ',
    description: 'بهبود گردش خون و افزایش اکسیژن‌رسانی به بافت‌ها',
    icon: '🔄',
    popular: false
  },
  {
    id: 9,
    name: 'ماساژ سنگ داغ',
    price: '۱,۳۰۰,۰۰۰',
    duration: '۶۰ دقیقه',
    category: 'ماساژ',
    description: 'استفاده از سنگ‌های بازالتی گرم برای آرامش عمیق عضلات',
    icon: '🪨',
    popular: true
  },
  {
    id: 10,
    name: 'ماساژ شمع',
    price: '۱,۷۰۰,۰۰۰',
    duration: '۶۰ دقیقه',
    category: 'ماساژ',
    description: 'تجربه‌ای لوکس با شمع‌های معطر و روغن‌های گرم',
    icon: '🕯️',
    popular: false
  },
  {
    id: 11,
    name: 'ماساژ صورت',
    price: '۴۵۰,۰۰۰',
    duration: '۶۰ دقیقه',
    category: 'ماساژ صورت',
    description: 'ماساژ تخصصی صورت برای جوانسازی و افزایش گردش خون',
    icon: '😌',
    popular: false
  },
  {
    id: 12,
    name: 'بادکش کمر',
    price: '۳۰۰,۰۰۰',
    duration: '۶۰ دقیقه',
    category: 'بادکش',
    description: 'بادکش درمانی متمرکز بر ناحیه کمر برای کاهش درد',
    icon: '💆',
    popular: false
  },
  {
    id: 13,
    name: 'بادکش کل بدن',
    price: '۵۰۰,۰۰۰',
    duration: '۶۰ دقیقه',
    category: 'بادکش',
    description: 'بادکش کامل بدن برای دفع سموم و بهبود گردش خون',
    icon: '🌿',
    popular: false
  },
  {
    id: 14,
    name: 'ماساژ هربال',
    price: '۱,۵۰۰,۰۰۰',
    duration: '۶۰ دقیقه',
    category: 'ماساژ',
    description: 'استفاده از گیاهان دارویی و روغن‌های طبیعی برای درمان',
    icon: '🌱',
    popular: false
  }
]

// دسته‌بندی‌ها
const categories = ['همه', 'ماساژ', 'ماساژ صورت', 'بادکش']

export default function PricesPage() {
  const [activeCategory, setActiveCategory] = useState('همه')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredServices, setFilteredServices] = useState(priceData)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    let result = priceData
    
    // فیلتر بر اساس دسته‌بندی
    if (activeCategory !== 'همه') {
      result = result.filter(item => item.category === activeCategory)
    }
    
    // فیلتر بر اساس جستجو
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase()
      result = result.filter(item => 
        item.name.includes(query) || 
        item.description.includes(query)
      )
    }
    
    setFilteredServices(result)
  }, [activeCategory, searchQuery])

  // تبدیل قیمت به عدد برای مرتب‌سازی
  const getPriceNumber = (priceStr: string) => {
    const clean = priceStr.replace(/,/g, '').replace(' - ', '-')
    if (clean.includes('-')) {
      const parts = clean.split('-')
      return parseInt(parts[0])
    }
    return parseInt(clean)
  }

  return (
    <section className="min-h-screen bg-[#DADEE1] py-5 xs:py-6 sm:py-16 px-3 sm:px-4 mt-1 sm:mt-16 s:mt-1">
      <div className="container mx-auto max-w-6xl">
        
        <AnimationWrapper direction="up" delay={0.1}>
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#447F98] mb-3 sm:mb-4">
              💰 لیست قیمت‌ها
            </h1>
            <p className="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto">
              قیمت‌ها به‌روز شده و ممکن است تغییر کنند. برای اطلاع از قیمت دقیق با ما تماس بگیرید.
            </p>
          </div>
        </AnimationWrapper>

        {/* باکس جستجو و فیلتر */}
        <AnimationWrapper direction="up" delay={0.2}>
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* جستجو */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="🔍 جستجوی خدمات..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#447F98] focus:border-transparent outline-none transition-all text-right text-sm sm:text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {/* دسته‌بندی */}
              <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-1 flex-wrap sm:flex-nowrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 sm:px-6 py-2 rounded-xl font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                      activeCategory === cat
                        ? 'bg-[#447F98] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat === 'همه' ? '📋 همه' : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </AnimationWrapper>

        {/* تعداد نتایج */}
        {isClient && (
          <AnimationWrapper direction="up" delay={0.3}>
            <p className="text-gray-500 text-sm mb-4 text-right">
              {filteredServices.length} خدمت یافت شد
            </p>
          </AnimationWrapper>
        )}

        {/* لیست قیمت‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredServices.map((item, index) => (
            <AnimationWrapper key={item.id} direction="up" delay={0.2 + (index * 0.05)}>
              <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-r-4 ${
                item.popular ? 'border-[#447F98]' : 'border-transparent'
              }`}>
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 text-right">
                      <div className="flex items-center gap-2 justify-end mb-1">
                        <h3 className="text-base sm:text-xl font-bold text-gray-800">
                          {item.name}
                        </h3>
                        <span className="text-xl sm:text-2xl">{item.icon}</span>
                      </div>
                      {item.popular && (
                        <span className="inline-block bg-[#447F98]/10 text-[#447F98] text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-semibold mb-1">
                          ⭐ محبوب
                        </span>
                      )}
                      {item.note && (
                        <span className="inline-block bg-amber-50 text-amber-600 text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-semibold mb-1 mr-1">
                          {item.note}
                        </span>
                      )}
                      <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
                      <span>⏱</span>
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-2xl font-bold text-[#447F98]">
                        {item.price}
                      </span>
                      <span className="text-xs text-gray-400">تومان</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <AnimationWrapper direction="up" delay={0.5}>
            <div className="text-center py-12 sm:py-20">
              <div className="text-5xl sm:text-6xl mb-4">🔍</div>
              <p className="text-gray-500 text-base sm:text-lg">هیچ خدمتی با این مشخصات یافت نشد</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setActiveCategory('همه')
                }}
                className="mt-4 text-[#447F98] hover:text-[#629BB6] text-sm font-semibold"
              >
                نمایش همه خدمات
              </button>
            </div>
          </AnimationWrapper>
        )}

        {/* بخش تماس و رزرو */}
        <AnimationWrapper direction="up" delay={0.8}>
          <div className="mt-8 sm:mt-12 bg-gradient-to-r from-[#447F98] to-[#629BB6] rounded-2xl p-6 sm:p-8 text-white text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">📞 نیاز به مشاوره دارید؟</h3>
            <p className="text-white/80 text-sm sm:text-base mb-4">
              برای اطلاع از قیمت دقیق و رزرو نوبت با ما تماس بگیرید
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <a
                href="tel:09902415024"
                className="bg-white text-[#447F98] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:scale-105 transition-all text-sm sm:text-base"
              >
                📞 تماس با ما
              </a>
              <Link
                href="/#booking"
                className="bg-[#8908E1] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:scale-105 transition-all text-sm sm:text-base"
              >
                📅 رزرو نوبت
              </Link>
            </div>
          </div>
        </AnimationWrapper>

        {/* نکته مهم */}
        <AnimationWrapper direction="up" delay={1}>
          <p className="text-center text-gray-400 text-[10px] sm:text-xs mt-4 sm:mt-6">
            ⚠️ قیمت‌ها ممکن است تغییر کنند. لطفاً قبل از رزرو با ما تماس بگیرید.
          </p>
        </AnimationWrapper>

      </div>
    </section>
  )
}
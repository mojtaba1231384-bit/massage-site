'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    checkScroll()
    window.addEventListener('scroll', checkScroll)
    
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setIsMobileMenuOpen(false)
      }
    } else {
      router.push(`/#${sectionId}`)
      setIsMobileMenuOpen(false)
    }
  }

  const navigateToTracking = () => {
    router.push('/tracking')
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { name: 'خانه', id: 'home' },
    { name: 'خدمات', id: 'services' },
    { name: 'گالری', id: 'gallery' },
    { name: 'پیگیری رزرو', id: 'tracking' },
    { name: 'رزرو نوبت', id: 'booking' },
    { name: 'تماس با ما', id: 'contact' }
  ]

  return (
    <header 
      className={`fixed top-0 w-full z-10 transition-all duration-500 py-7 sm:py-3 px-3 sm:px-6 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-lg' 
          : 'bg-gradient-to-r from-[#447F98]/90 to-[#629BB6]/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between min-h-[60px] sm:min-h-[80px]">
          
          <nav className="hidden md:flex items-center gap-2 sm:gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'tracking') {
                    navigateToTracking()
                  } else {
                    scrollToSection(item.id)
                  }
                }}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm sm:text-base font-medium transition-all duration-300 ${
                  isScrolled 
                    ? 'text-[#447F98] hover:text-[#8908E1] hover:bg-[#447F98]/10' 
                    : 'text-white/90 hover:text-white hover:bg-white/20'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 sm:gap-3">
            <div className={`relative rounded-full overflow-hidden border-2 border-white/80 shadow-2xl transition-all duration-500 ${
              isScrolled 
                ? 'w-20 h-20 sm:w-16 sm:h-16' 
                : 'w-32 h-32 sm:w-20 sm:h-20'
            }`}>
              <Image
                src="/customer-avatar.png"
                alt="آرامیس - مرکز ماساژ اصفهان"
                fill
                className="object-cover"
                priority
                quality={100}
                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 128px"
              />
            </div>
            
            <div className="block">
              {/*
                اصلاح H1 تکراری: قبلاً h1 بود که با H1 صفحه اصلی تداخل داشت.
                لوگو/نام برند در هدر نباید H1 باشه — از p استفاده میکنیم.
              */}
              <p className={`font-bold transition-all duration-500 ${
                isScrolled 
                  ? 'text-sm sm:text-base text-[#447F98]' 
                  : 'text-lg sm:text-xl text-white'
              }`}>
                آرامیس
              </p>
              <p className={`text-[10px] sm:text-xs transition-all duration-500 ${
                isScrolled ? 'text-gray-500' : 'text-white/80'
              }`}>
                ماساژ حرفه‌ای
              </p>
            </div>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden text-xl sm:text-2xl transition-all duration-500 p-1 sm:p-1.5 rounded-xl ${
              isScrolled 
                ? 'text-[#447F98] hover:bg-[#447F98]/10' 
                : 'text-white hover:bg-white/20'
            }`}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 py-3 bg-white rounded-2xl shadow-xl border border-gray-100">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'tracking') {
                    navigateToTracking()
                  } else {
                    scrollToSection(item.id)
                  }
                }}
                className="block w-full text-right px-4 py-2.5 text-gray-700 hover:bg-[#447F98]/10 hover:text-[#8908E1] transition-colors text-sm font-medium rounded-lg"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

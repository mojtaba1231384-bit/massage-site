'use client'
import { Instagram, Linkedin, Phone, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#2C5F73] text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center sm:text-right">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">آرامیس</h3>
            <p className="text-white/70 sm:text-white/80 text-sm sm:text-base">ارائه‌دهنده بهترین خدمات ماساژ تخصصی و درمانی</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 sm:mb-4">تماس با ما</h4>
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Phone size={18} />
                <a href="tel:0994241524" dir="ltr" className="text-sm sm:text-base">۰۹۹۰ ۲۴۱ ۵۰۲۴</a>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin size={18} />
                <span className="text-sm sm:text-base">اصفهان</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Clock size={18} />
                <span className="text-sm sm:text-base">  ۹صبح تا ۲۰  </span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 sm:mb-4">شبکه‌های اجتماعی</h4>
            <div className="flex gap-4 justify-center sm:justify-start">
              <a href="#" className="hover:text-[#06EBF3] transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-[#06EBF3] transition-colors">
                
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-white/60">
          © 2024 آرامیس. تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  )
}
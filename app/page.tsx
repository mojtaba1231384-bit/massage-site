'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BookingForm from '@/components/BookingForm'
import Gallery from '@/components/Gallery'
import AnimationWrapper from '@/components/AnimationWrapper'

const serviceItems = [
  { id: 1, name: 'ماساژ ریلکسی',        desc: 'آرامش عمیق' },
  { id: 2, name: 'بادکش',               desc: 'کاهش التهاب' },
  { id: 3, name: 'ماساژ روسی',           desc: 'رفع گرفتگی' },
  { id: 4, name: 'ماساژ سوئدی',          desc: 'حرکات ملایم' },
  { id: 5, name: 'ماساژ درمانی',         desc: 'رفع مشکلات' },
  { id: 6, name: 'ماساژ سنگ داغ',        desc: 'سنگ گرم' },
]

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* ========== بخش هدر ========== */}
      <section id="home" className="relative min-h-screen bg-[#DADEE1] px-3 xs:px-3  m:px-6 md:px-8 lg:px-12 xl:px-5 pt-12 xs:pt-12  m:pt-16 md:pt-20 lg:pt-24 xl:pt-20 overflow-hidden">
        
        {/* 1. متن */}
        <AnimationWrapper direction="up" delay={0.2}>
          <div className="text-center md:text-right mb-3 xs:mb-3 s:mb-4 m:mb-6 md:mb-8 lg:mb-10 xl:mb-12 max-w-2xl mx-auto md:mr-10 lg:-mr-[100px] xl:mr-28 md:ml-auto mt-2 xs:mt-2 s:mt-3 m:mt-4 md:mt-8 lg:mt-12 xl:mt-48">
            {/* عنوان اصلی - بزرگتر برای سایز s */}
            <h1 className="text-base xs:text-base s:text-xl s:font-extrabold m:text-xl md:text-center md:text-2xl lg:text-3xl xl:text-5xl font-extrabold text-[#447F98] mb-1 xs:mb-1 s:mb-3 m:mb-2 md:mb-3 lg:mb-4 leading-tight">
              آرامش را به جسم و ذهن خود هدیه دهید
            </h1>
            
            {/* زیر عنوان - بزرگتر برای سایز s */}
            <p className="text-sm text-center xs:text-sm s:text-2xl s:font-extrabold m:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[#447f98] mb-1 xs:mb-1 s:mb-3 m:mb-2 md:mb-3 lg:mb-4 xl:mb-6">
              ماساژ آرامیس اصفهان
            </p>
            
            {/* توضیحات - بزرگتر برای سایز s */}
            <div className="text-gray-600 text-center text-[10px] xs:text-[10px] s:text-base s:leading-8 m:text-sm md:text-base lg:text-base xl:text-lg leading-relaxed sm:leading-loose">
              <p className='font-bold s:text-md'>در فضای آرام و حرفه‌ای</p>
              <p className='font-bold s:text-md'>انواع خدمات ماساژ درمانی، ریلکسی و تخصصی را تجربه کنید</p>
              <p className='font-bold s:text-md'>و خستگی را از تن خود دور کنید</p>
            </div>
            
            {/* دکمه‌ها - بزرگتر برای سایز s */}
            <div className="flex flex-col xs:flex-col s:flex-row m:flex-row md:flex-row lg:flex-row gap-1 xs:gap-1 s:gap-4 m:gap-2 md:gap-3 lg:gap-4 mt-2 xs:mt-2 s:mt-5 m:mt-3 md:mt-4 lg:mt-6 xl:mt-8 justify-center">
              <button
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#447f98] hover:bg-[#629BB6] text-white px-3 xs:px-3 s:px-6 m:px-5 md:px-6 lg:px-7 xl:px-8 py-1.5 xs:py-1.5 s:py-3 m:py-2 md:py-2.5 lg:py-3 rounded-full text-[10px] xs:text-[10px] s:text-base m:text-sm md:text-base lg:text-base xl:text-lg font-semibold transition-all"
              >
                رزرو نوبت
              </button>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gray-100 hover:bg-gray-200 text-[#447F98] px-3 xs:px-3 s:px-6 m:px-5 md:px-6 lg:px-7 xl:px-8 py-1.5 xs:py-1.5 s:py-3 m:py-2 md:py-2.5 lg:py-3 rounded-full text-[10px] xs:text-[10px] s:text-base m:text-sm md:text-base lg:text-base xl:text-lg font-semibold border-2 border-[#447F98] transition-all"
              >
                مشاهده خدمات
              </button>
            </div>
          </div>
        </AnimationWrapper>

        {/* 2. عکس‌های نیم‌دایره */}
        <div className="flex flex-row justify-center lg:justify-end items-center gap-6 -mt-[50px] xs:mt-1 lg:-mt-[250px] xl:-mt-[435px]">
          
          <div className="w-[300px] max-w-[400px] relative mx-auto mb-[100px] xs:mb-[268px] s:mb-[290px] m:mb-[312px] md:mb-[496px] lg:mx-1 xl:mb-[550px]">
            <div className="relative mt-[100px] pt-[150%] rounded-t-[190px] overflow-hidden shadow-xl">
              <Image
                src="/half-circle-right.jpg"
                alt="محیط آرام مرکز ماساژ آرامیس اصفهان"
                fill
                className="object-cover absolute inset-0"
                sizes="(max-width: 768px) 300px, 400px"
                priority
              />
            </div>
          </div>

          <div className="w-[460px] max-w-lg relative mx-auto lg:mx-0">
            <div className="relative w-full pt-[150%] rounded-t-[250px] overflow-hidden shadow-xl">
              <Image
                src="/half-circle-left.jpg"
                alt="ماساژ تخصصی در آرامیس اصفهان"
                fill
                className="object-cover absolute inset-0"
                sizes="(max-width: 768px) 460px, 460px"
                priority
              />
            </div>
            <div className="relative w-full pt-[150%] rounded-b-[250px] overflow-hidden shadow-xl -mt-1">
              <Image
                src="/half-circle-left-bottom.jpg"
                alt="خدمات ماساژ درمانی و ریلکسی آرامیس"
                fill
                className="object-cover absolute inset-0"
                sizes="(max-width: 768px) 460px, 460px"
              />
            </div>
          </div>
        </div>

       {/* 3. گرید خدمات - فونت بزرگتر */}
<section id="services" className="-mt-[40px] xs:-mt-[1px] s:mt-[20px] m:mt-[20px] md:mt-[20px] lg:mt-[20px] xl:-mt-[550px] pb-3 xs:pb-3 s:pb-4 m:pb-4 md:pb-6 lg:pb-10 xl:pb-16 animate-on-scroll">
  <div className="grid grid-cols-2 xs:grid-cols-2 s:grid-cols-2 m:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-1.5 xs:gap-1.5 s:gap-2 m:gap-2 md:gap-3 lg:gap-3 xl:gap-3 max-w-7xl mx-1 xs:mx-1 s:mx-2 m:mx-3 md:mx-4 lg:mx-8 xl:mx-16">
    
    {serviceItems.map((item, index) => (
      <AnimationWrapper key={item.id} direction="up" delay={index * 0.1}>
        <Link href={`/services/${item.id}`} className="block bg-white rounded-lg xs:rounded-lg s:rounded-xl m:rounded-xl md:rounded-2xl lg:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 cursor-pointer">
          <div className="relative h-24 xs:h-24 s:h-28 m:h-32 md:h-36 lg:h-44 xl:h-56 w-full bg-gray-200">
            <Image
              src={`/services/massage-${item.id}.jpg`}
              alt={`${item.name} در آرامیس اصفهان`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
          {/* ===== فونت بزرگتر برای زیر عکس‌ها ===== */}
          <div className="p-1 xs:p-1 s:p-2 m:p-1.5 md:p-2 lg:p-2.5 xl:p-2 text-center">
            <h3 className="text-[8px] xs:text-[8px] s:text-sm s:font-bold m:text-[10px] md:text-xs lg:text-sm xl:text-base font-bold text-gray-800 mb-0.5 xs:mb-0.5 s:mb-1 line-clamp-1">
              {item.name}
            </h3>
            <p className="text-gray-500 text-[7px] xs:text-[7px] s:text-xs s:font-medium m:text-[9px] md:text-[10px] lg:text-xs xl:text-sm mb-0.5 xs:mb-0.5 s:mb-1 line-clamp-1 md:line-clamp-2">
              {item.desc}
            </p>
            <span className="text-[#447f98] text-[7px] xs:text-[7px] s:text-xs s:font-bold m:text-[9px] md:text-[10px] lg:text-xs xl:text-sm font-semibold hover:text-[#629BB6] transition-colors">جزئیات →</span>
          </div>
        </Link>
      </AnimationWrapper>
    ))}

  </div>
</section>

      </section>

      {/* ========== گالری ========== */}
      <AnimationWrapper direction="up">
        <Gallery/>
      </AnimationWrapper>

      {/* ========== ویژگی‌ها ========== */}
      <section className="py-4 xs:py-4 s:py-5 m:py-6 md:py-8 lg:py-12 xl:py-16 text-[#222222] bg-[#DADEE1]">
        <div className="container mx-auto px-4 text-center md:mr-10 lg:mr-20 xl:mr-20 md:mt-10 lg:mt-20 xl:mt-20">
          <AnimationWrapper direction="up">
            <h2 className="text-lg xs:text-lg s:text-xl m:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold mb-2 xs:mb-2 s:mb-3 m:mb-3 md:mb-4 lg:mb-6 xl:mb-8 text-[#447F98]">زمان آرامش شما رسیده</h2>
          </AnimationWrapper>
          <div className="grid grid-cols-1 xs:grid-cols-1 s:grid-cols-2 m:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-1.5 xs:gap-1.5 s:gap-2 m:gap-2 md:gap-3 lg:gap-4 xl:gap-6 max-w-7xl mx-auto">
            
            {[
              { icon: '🧘‍♀️', text: 'محیط آرام' },
              { icon: '🌿', text: 'تمیز و بهداشتی' },
              { icon: '✨', text: 'محصولات باکیفیت' },
              { icon: '🏠', text: 'اتاق اختصاصی' },
              { icon: '💆', text: 'ماساژور حرفه‌ای' },
              { icon: '🌺', text: 'روغن طبیعی' }
            ].map((item, index) => (
              <AnimationWrapper key={index} direction="up" delay={index * 0.1}>
                <div className="bg-[#447f98] text-white p-1.5 xs:p-1.5 s:p-2 m:p-2 md:p-3 lg:p-4 xl:p-6 rounded-lg xs:rounded-lg s:rounded-xl m:rounded-xl md:rounded-xl lg:rounded-xl xl:rounded-xl hover:bg-[#629BB6] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-white/30">
                  <span className="text-xl xs:text-xl s:text-2xl m:text-2xl md:text-2xl lg:text-3xl xl:text-3xl">{item.icon}</span><br/>
                  <span className="text-[8px] xs:text-[8px] s:text-[9px] m:text-[10px] md:text-xs lg:text-sm xl:text-base">{item.text}</span>
                </div>
              </AnimationWrapper>
            ))}

          </div>
        </div>
        
        <div className="hidden lg:flex justify-end gap-6 -mt-[550px] ml-10">
          <div className="w-[100%] max-w-[450px] relative">
            <div className="relative mt-[113px] pt-[150%] rounded-t-[250px] overflow-hidden shadow-xl">
              <Image
                src="/half-circle-down.jpg"
                alt="فضای آرام مرکز ماساژ آرامیس"
                fill
                className="object-cover absolute inset-0"
                sizes="450px"
              />
            </div>
          </div>
        </div>
       
      </section>

      {/* ========== فرم رزرو ========== */}
      <section id="booking" className="py-4 xs:py-4 s:py-5 m:py-6 md:py-8 lg:py-12 xl:py-20 bg-[#89D8E1]/20">
        <AnimationWrapper direction="up">
          <div className="container mx-auto px-3 xs:px-3 s:px-4">
            <div className="text-center mb-2 xs:mb-2 s:mb-3 m:mb-3 md:mb-4 lg:mb-6 xl:mb-12">
              <h2 className="text-lg xs:text-lg s:text-xl m:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-[#447F98] mb-0.5 xs:mb-0.5 s:mb-1 m:mb-1 md:mb-2 lg:mb-3 xl:mb-4">رزرو نوبت ماساژ</h2>
              <p className="text-[10px] xs:text-[10px] s:text-xs m:text-sm md:text-base text-gray-600">همین حالا وقت خود را رزرو کنید</p>
            </div>
            <BookingForm />
          </div>
        </AnimationWrapper>
      </section>

      {/* ========== پیگیری رزرو ========== */}
      <section id="tracking" className="py-6 xs:py-6 s:py-8 m:py-8 md:py-10 lg:py-14 xl:py-20 bg-[#89D8E1]/20">
        <div className="container mx-auto px-4 text-center">
          <AnimationWrapper direction="up">
            <h2 className="text-lg xs:text-lg s:text-xl m:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-[#447F98] mb-1 xs:mb-1 s:mb-2 m:mb-2 md:mb-3 lg:mb-4">🔍 پیگیری رزرو</h2>
            <p className="text-[10px] xs:text-[10px] s:text-xs m:text-sm md:text-base lg:text-base xl:text-base text-gray-600 mb-2 xs:mb-2 s:mb-3 m:mb-4 md:mb-5 lg:mb-6 xl:mb-8">وضعیت رزرو خود را با شماره تماس مشاهده کنید</p>
            <Link 
              href="/tracking" 
              className="inline-block bg-[#447F98] hover:bg-[#629BB6] text-white px-3 xs:px-3 s:px-4 m:px-5 md:px-6 lg:px-7 xl:px-8 py-1.5 xs:py-1.5 s:py-2 m:py-2 md:py-2.5 lg:py-3 xl:py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg text-[10px] xs:text-[10px] s:text-xs m:text-sm md:text-base lg:text-base xl:text-base"
            >
              🔍 پیگیری رزرو
            </Link>
          </AnimationWrapper>
        </div>
      </section>

      {/* ========== بخش تماس ========== */}
      <section id="contact" className="py-4 xs:py-4 s:py-5 m:py-6 md:py-8 lg:py-12 xl:py-20 bg-[#DADEE1]">
        <AnimationWrapper direction="up">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-lg xs:text-lg s:text-xl m:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-[#447F98] mb-1 xs:mb-1 s:mb-2 m:mb-2 md:mb-3 lg:mb-4 xl:mb-6">آماده دریافت نوبت شما هستیم</h2>
            <p className="text-[10px] xs:text-[10px] s:text-xs m:text-sm md:text-base lg:text-lg xl:text-xl mb-2 xs:mb-2 s:mb-3 m:mb-3 md:mb-4 lg:mb-6 xl:mb-8 text-gray-600">برای رزرو نوبت یا مشاوره رایگان تماس بگیرید</p>
            <a
              href="tel:09902415024"
              className="inline-flex items-center gap-1.5 xs:gap-1.5 s:gap-2 m:gap-2 md:gap-3 bg-[#447F98] hover:bg-[#629BB6] text-white px-3 xs:px-3 s:px-4 m:px-5 md:px-6 lg:px-7 xl:px-8 py-1.5 xs:py-1.5 s:py-2 m:py-2 md:py-2.5 lg:py-3 xl:py-4 rounded-full text-xs xs:text-xs s:text-sm m:text-base md:text-base lg:text-xl xl:text-2xl font-bold transition-all transform hover:scale-105"
              dir="ltr"
            >
              ۰۹۹۰ ۲۴۱ ۵۰۲۴
              <br/>
              هیبتیان
            </a>
            <p className="mt-1 xs:mt-1 s:mt-2 m:mt-2 md:mt-3 lg:mt-4 xl:mt-6 text-[8px] xs:text-[8px] s:text-[10px] m:text-xs md:text-sm text-gray-500">ساعات کاری: شنبه تا چهارشنبه ۹صبح تا ۲۰ - پنجشنبه و جمعه با هماهنگی قبلی </p>
          </div>
        </AnimationWrapper>
      </section>
    </>
  )
}
'use client'

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
  // isMounted و if (!isMounted) return null حذف شد
  // باعث میشد گوگل محتوای صفحه رو نبینه

  return (
    <>
      {/* Hero */}
      <section id="home" className="relative min-h-screen bg-[#DADEE1]  xs:px-6 s:px-4 m:px-6 md:px-8 lg:px-12  xs:pt-5 s:pt-14 m:pt-16 md:pt-20 lg:pt-24 xl:pt-20 overflow-hidden">
        
        {/* HeroText */}
        <AnimationWrapper direction="up" delay={0.2}>
          <div className="text-center md:text-right mb-3 xs:mb-6 s:mb-4 m:mb-6 md:mb-8 lg:mb-10 xl:mb-12 max-w-2xl mx-auto md:mr-10 lg:-mr-[100px] xl:mr-10 md:ml-auto mt-2 xs:mt-8 s:mt-3 m:mt-4 md:mt-8 lg:mt-12 xl:mt-48">
            <h1 className="text-base xs:text-2xl s:text-2xl s:font-extrabold m:text-xl md:text-center md:text-2xl lg:text-3xl xl:text-5xl font-extrabold text-[#447F98] mb-1 xs:mb-3 s:mb-3 m:mb-2 md:mb-3 lg:mb-4 leading-tight">
              آرامش را به جسم و ذهن خود هدیه دهید
            </h1>
            
            <p className="text-sm text-center xs:text-lg s:text-2xl s:font-extrabold m:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-[#447f98] mb-1 xs:mb-3 s:mb-3 m:mb-2 md:mb-3 lg:mb-4 xl:mb-6">
              ماساژ آرامیس اصفهان
            </p>
            
            <div className="text-gray-600 text-center text-[10px] xs:text-base s:text-base s:leading-8 m:text-sm md:text-base lg:text-base xl:text-lg leading-relaxed sm:leading-loose">
              <p className='font-bold xs:text-sm s:text-md'>در فضایی آرام و حرفه‌ای</p>
              <p className='font-bold xs:text-sm s:text-md'>انواع خدمات ماساژ درمانی، ریلکسی و تخصصی را تجربه کنید</p>
              <p className='font-bold xs:text-sm s:text-md'>و خستگی را از تن خود دور کنید</p>
            </div>
            
            <div className="flex flex-col xs:flex-row s:flex-row m:flex-row md:flex-row lg:flex-row gap-1 s:gap-4 m:gap-2 md:gap-3 lg:gap-4 mt-2 xs:mt-8 s:mt-5 m:mt-3 md:mt-4 lg:mt-6 xl:mt-8 justify-center">
              <button
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#447f98] hover:bg-[#629BB6] text-white px-3 xs:px-6 s:px-6 m:px-5 md:px-6 lg:px-7 xl:px-8 py-1.5 xs:py-3 s:py-3 m:py-2 md:py-2.5 lg:py-3 rounded-full text-[10px] xs:text-base s:text-base m:text-sm md:text-base lg:text-base xl:text-lg font-semibold transition-all"
              >
                رزرو نوبت
              </button>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gray-100 hover:bg-gray-200 text-[#447F98] px-3 xs:px-6 s:px-6 m:px-5 md:px-6 lg:px-7 xl:px-8 py-1.5 xs:py-3 s:py-3 m:py-2 md:py-2.5 lg:py-3 rounded-full text-[10px] xs:text-base s:text-base m:text-sm md:text-base lg:text-base xl:text-lg font-semibold border-2 border-[#447F98] transition-all"
              >
                مشاهده خدمات
              </button>
            </div>
          </div>
        </AnimationWrapper>

        {/* HeroImages */}
        <div className="flex flex-row justify-center lg:justify-end items-center gap-6 -mt-[50px] xs:mt-1 s:mt-1 lg:-mt-[150px] xl:-mt-[390px]">
          
          <div className="w-[300px] max-w-[400px] relative mx-auto mb-[100px] xs:mb-[268px] s:mb-[290px] m:mb-[312px] md:mb-[496px] lg:mx-1 lg:w-[180px] lg:mb-[300px] xl:w-[300px] xl:mb-[480px]">
            <div className="relative mt-[100px] pt-[150%] lg:mb-[70px] rounded-t-[190px] lg:rounded-t-[140px] xl:rounded-t-[190px] overflow-hidden shadow-xl">
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

          <div className="w-[460px] max-w-lg relative mx-auto lg:mx-0 lg:w-[280px] xl:w-[460px]">
            <div className="relative w-full pt-[150%] rounded-t-[250px] lg:rounded-t-[180px] xl:rounded-t-[250px] overflow-hidden shadow-xl">
              <Image
                src="/half-circle-left.jpg"
                alt="ماساژ تخصصی در آرامیس اصفهان"
                fill
                className="object-cover absolute inset-0"
                sizes="(max-width: 768px) 460px, 460px"
                priority
              />
            </div>
            <div className="relative w-full pt-[150%] rounded-b-[250px] lg:rounded-b-[180px] xl:rounded-b-[250px] overflow-hidden shadow-xl -mt-1">
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

        {/* ServicesGrid */}
        <section id="services" className="-mt-[40px] xs:-mt-[1px] s:mt-[20px] m:mt-[20px] md:mt-[20px] lg:mt-[20px] pb-3 xs:pb-6 s:pb-4 m:pb-4 md:pb-6 lg:pb-10 animate-on-scroll">
          <div className="grid grid-cols-2 xs:grid-cols-2 s:grid-cols-2 m:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1.5 xs:gap-3 s:gap-2 m:gap-2 md:gap-3 lg:gap-3 lg:w-[65%] lg:ml-[500px] lg:-mt-[400px] xl:w-[65%] xl:ml-[500px] xl:-mt-[600px] xs:px-4 s:px-4 m:px-6 md:px-8 lg:px-0">
            
            {serviceItems.map((item, index) => (
              <AnimationWrapper key={item.id} direction="up" delay={index * 0.1}>
                <Link href={`/services/${item.id}`} className="block bg-white rounded-lg xs:rounded-xl s:rounded-xl m:rounded-xl md:rounded-2xl lg:rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 cursor-pointer">
                  <div className="relative h-24 xs:h-32 s:h-28 m:h-32 md:h-36 lg:h-44 w-full bg-gray-200">
                    <Image
                      src={`/services/massage-${item.id}.jpg`}
                      alt={`${item.name} در آرامیس اصفهان`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-1 xs:p-3 s:p-2 m:p-1.5 md:p-2 lg:p-2.5 text-center">
                    <h3 className="text-[8px] xs:text-sm s:text-sm s:font-bold m:text-[10px] md:text-xs lg:text-sm font-bold text-gray-800 mb-0.5 xs:mb-1.5 s:mb-1 m:mb-0.5 md:mb-0.5 lg:mb-1 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-[7px] xs:text-xs s:text-xs s:font-medium m:text-[9px] md:text-[10px] lg:text-xs mb-0.5 xs:mb-1 s:mb-1 m:mb-0.5 md:mb-0.5 lg:mb-1 line-clamp-1 md:line-clamp-2">
                      {item.desc}
                    </p>
                    <span className="text-[#447f98] text-[7px] xs:text-xs s:text-xs s:font-bold m:text-[9px] md:text-[10px] lg:text-xs font-semibold hover:text-[#629BB6] transition-colors">جزئیات →</span>
                  </div>
                </Link>
              </AnimationWrapper>
            ))}

          </div>
        </section>

      </section>

      {/* Gallery */}
      <AnimationWrapper direction="up">
        <Gallery/>
      </AnimationWrapper>

      {/* Features */}
      <section className="xs:py-8 s:py-5 m:py-6 md:py-6 lg:py-12 xl:py-16 text-[#222222] bg-[#DADEE1]">
        <div className="container text-center md:mr-10 lg:mr-20 xl:mr-24 md:mt-10 lg:mt-32 xl:mt-20">
          <AnimationWrapper direction="up">
            <h2 className="text-lg xs:text-2xl s:text-xl m:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold mb-2 xs:mb-4 s:mb-3 m:mb-3 md:mb-4 md:ml-16 lg:mb-6 lg:ml-[500px] xl:mb-20 xl:ml-[490px] text-[#447F98]">زمان آرامش شما رسیده</h2>
          </AnimationWrapper>
          
          <div className="grid grid-cols-1 xs:grid-cols-2 xs:p-1 s:grid-cols-2 m:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 md:-mr-10 gap-1.5 xs:gap-3 s:gap-2 m:gap-2 md:gap-3 lg:gap-4 xl:gap-6 w-full lg:-mr-[50px] lg:w-[60%] xl:w-[65%]">
            
            {[
              { icon: '🧘‍♀️', text: 'محیط آرام' },
              { icon: '🌿', text: 'تمیز و بهداشتی' },
              { icon: '✨', text: 'محصولات باکیفیت' },
              { icon: '🏠', text: 'اتاق اختصاصی' },
              { icon: '💆', text: 'ماساژور حرفه‌ای' },
              { icon: '🌺', text: 'روغن طبیعی' }
            ].map((item, index) => (
              <AnimationWrapper key={index} direction="up" delay={index * 0.1}>
                <div className="bg-[#447f98] text-white p-1.5 xs:p-4 s:p-2 m:p-2 md:p-3 lg:p-4 xl:p-6 rounded-lg xs:rounded-xl s:rounded-xl m:rounded-xl md:rounded-xl lg:rounded-xl xl:rounded-xl hover:bg-[#629BB6] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-white/30">
                  <span className="text-xl xs:text-2xl s:text-2xl m:text-2xl md:text-2xl lg:text-3xl xl:text-3xl">{item.icon}</span><br/>
                  <span className="text-[8px] xs:font-bold xs:text-xs s:text-[9px] m:text-[10px] md:text-xs lg:text-sm xl:text-base">{item.text}</span>
                </div>
              </AnimationWrapper>
            ))}

          </div>
        </div>
        
        <div className="hidden lg:flex justify-end gap-6 -mt-[550px] ml-10">
          <div className="w-[60%] lg:w-[30%] xl:w-[40%] max-w-[450px] relative">
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

      {/* BookingForm */}
      <section id="booking" className="py-4 xs:py-8 s:py-5 m:py-6 md:py-8 lg:py-12 xl:py-20 bg-[#89D8E1]/20">
        <AnimationWrapper direction="up">
          <div className="container mx-auto px-3 xs:px-6 s:px-4">
            <div className="text-center mb-2 xs:mb-6 s:mb-3 m:mb-3 md:mb-4 lg:mb-6 xl:mb-12">
              <h2 className="text-lg xs:text-2xl s:text-xl m:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-[#447F98] mb-0.5 xs:mb-2 s:mb-1 m:mb-1 md:mb-2 lg:mb-3 xl:mb-4">رزرو نوبت ماساژ</h2>
              <p className="text-[10px] xs:text-base s:text-xs m:text-sm md:text-base text-gray-600">همین حالا وقت خود را رزرو کنید</p>
            </div>
            <BookingForm />
          </div>
        </AnimationWrapper>
      </section>

      {/* Tracking */}
      <section id="tracking" className="py-6 xs:py-10 s:py-8 m:py-8 md:py-10 lg:py-14 xl:py-20 bg-[#89D8E1]/20">
        <div className="container mx-auto px-4 text-center">
          <AnimationWrapper direction="up">
            <h2 className="text-lg xs:text-2xl s:text-xl m:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-[#447F98] mb-1 xs:mb-3 s:mb-2 m:mb-2 md:mb-3 lg:mb-4">🔍 پیگیری رزرو</h2>
            <p className="text-[10px] xs:text-base s:text-xs m:text-sm md:text-base lg:text-base xl:text-base text-gray-600 mb-2 xs:mb-4 s:mb-3 m:mb-4 md:mb-5 lg:mb-6 xl:mb-8">وضعیت رزرو خود را با شماره تماس مشاهده کنید</p>
            <Link 
              href="/tracking" 
              className="inline-block bg-[#447F98] hover:bg-[#629BB6] text-white px-3 xs:px-8 s:px-4 m:px-5 md:px-6 lg:px-7 xl:px-8 py-1.5 xs:py-4 s:py-2 m:py-2 md:py-2.5 lg:py-3 xl:py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg text-[10px] xs:text-base s:text-xs m:text-sm md:text-base lg:text-base xl:text-base"
            >
              🔍 پیگیری رزرو
            </Link>
          </AnimationWrapper>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-4 xs:py-8 s:py-5 m:py-6 md:py-8 lg:py-12 xl:py-20 bg-[#DADEE1]">
        <AnimationWrapper direction="up">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-lg xs:text-2xl s:text-xl m:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-[#447F98] mb-1 xs:mb-3 s:mb-2 m:mb-2 md:mb-3 lg:mb-4 xl:mb-6">آماده دریافت نوبت شما هستیم</h2>
            <p className="text-[10px] xs:text-base s:text-xs m:text-sm md:text-base lg:text-lg xl:text-xl mb-2 xs:mb-4 s:mb-3 m:mb-3 md:mb-4 lg:mb-6 xl:mb-8 text-gray-600">برای رزرو نوبت یا مشاوره رایگان تماس بگیرید</p>
            <a
              href="tel:09902415024"
              className="inline-flex items-center gap-1.5 xs:gap-1 s:gap-2 m:gap-2 md:gap-3 bg-[#447F98] hover:bg-[#629BB6] text-white px-3 xs:px-9 s:px-4 m:px-5 md:px-6 lg:px-7 xl:px-8 py-1.5 xs:py-4 s:py-2 m:py-2 md:py-2.5 lg:py-3 xl:py-4 rounded-full text-xs xs:text-xl s:text-sm m:text-base md:text-base lg:text-xl xl:text-2xl font-bold transition-all transform hover:scale-105"
              dir="ltr"
            >
              ۰۹۹۰ ۲۴۱ ۵۰۲۴
              <br/>
              هیبتیان
            </a>
            <p className="mt-1 font-bold xs:mt-3 s:mt-2 m:mt-2 md:mt-3 lg:mt-4 xl:mt-6 text-[8px] xs:text-sm s:text-[10px] m:text-xs md:text-sm text-gray-500">ساعات کاری: شنبه تا چهارشنبه ۹صبح تا ۲۰ - پنجشنبه و جمعه با هماهنگی قبلی</p>
          </div>
        </AnimationWrapper>
      </section>
    </>
  )
}
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const galleryImages = [
  { id: 1, src: '/gallery/massage1.jpg', title: 'ماساژ ریلکسی', category: 'ماساژ' },
  { id: 2, src: '/gallery/massage2.jpg', title: 'ماساژ آروماتراپی', category: 'ماساژ' },
  { id: 3, src: '/gallery/massage3.jpg', title: 'ماساژ سنگ داغ', category: 'ماساژ' },
  { id: 4, src: '/gallery/massage4.jpg', title: 'ماساژ درمانی', category: 'ماساژ درمانی' },
  { id: 5, src: '/gallery/massage5.jpg', title: 'بادکش درمانی', category: 'بادکش' },
  { id: 6, src: '/gallery/massage6.jpg', title: 'ماساژ تخصصی پا', category: 'ماساژ' },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToNext = () => {
    if (currentSlide < galleryImages.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  if (!isMobile) {
    return (
      <section id="gallery" className="py-8 sm:py-12 md:py-20 bg-[#89D8E1]/20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#000000] mb-1 sm:mb-2 md:mb-4">گالری طرح‌های ماساژ</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((img) => (
              <div
                key={img.id}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all"
                onClick={() => setSelectedImage(img)}
              >
                <div className="relative h-56 sm:h-64 md:h-[500px] w-[100%]">
                  <Image
                    src={img.src}
                    alt={`${img.title} در آرامیس اصفهان`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-3 md:p-4">
                  <div>
                    <h3 className="text-white font-bold text-xs sm:text-sm md:text-lg">{img.title}</h3>
                    <p className="text-white/80 text-[10px] sm:text-xs md:text-sm">{img.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-3 sm:p-4" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-8 sm:-top-10 md:-top-12 right-0 text-white hover:text-gray-300 text-2xl sm:text-3xl"
              >
                ✕
              </button>
              <div className="relative h-[40vh] sm:h-[60vh] md:h-[80vh] w-full">
                <Image 
                  src={selectedImage.src}
                  alt={`${selectedImage.title} در آرامیس اصفهان`}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center text-white mt-2 sm:mt-3 md:mt-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold">{selectedImage.title}</h3>
              </div>
            </div>
          </div>
        )}
      </section>
    )
  }

  return (
    <section id="gallery" className="py-8 bg-[#89D8E1]/20">
      <div className="container mx-auto px-3">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#000000] mb-1">گالری طرح‌های ماساژ</h2>
        </div>

        <div className="relative">
          <div className="relative h-[350px] rounded-xl overflow-hidden shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full"
              >
                <Image
                  src={galleryImages[currentSlide].src}
                  alt={`${galleryImages[currentSlide].title} در آرامیس اصفهان`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <h3 className="text-white font-bold text-lg">{galleryImages[currentSlide].title}</h3>
                    <p className="text-white/80 text-sm">{galleryImages[currentSlide].category}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
              {currentSlide + 1} / {galleryImages.length}
            </div>

            <button
              onClick={goToNext}
              className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#447F98] w-9 h-9 rounded-full shadow-lg flex items-center justify-center transition-all text-xl z-10 ${
                  'hover:scale-110'
              }`}
              disabled={currentSlide === galleryImages.length - 1}
            >
              ›
            </button>

            <button
              onClick={goToPrev}
              className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#447F98] w-9 h-9 rounded-full shadow-lg flex items-center justify-center transition-all text-xl z-10 ${
                currentSlide === galleryImages.length  ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'
              }`}
              disabled={currentSlide === 0}
            >
              ‹
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? 'w-8 h-2 bg-[#447F98]'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <p className="text-center text-xs text-gray-400 mt-2">
            👈 برای دیدن تصاویر بیشتر، دکمه‌ها را بزنید
          </p>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-3" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-8 right-0 text-white hover:text-gray-300 text-2xl"
            >
              ✕
            </button>
            <div className="relative h-[40vh] w-full">
              <Image 
                src={selectedImage.src}
                alt={`${selectedImage.title} در آرامیس اصفهان`}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center text-white mt-2">
              <h3 className="text-lg font-bold">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

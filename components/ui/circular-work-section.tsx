"use client"

import * as React from "react"
import { motion } from "framer-motion"
import CircularGallery from "@/components/CircularGallery"

interface CircularWorkSectionProps {
  items: { image: string; text: string; video?: string }[]
}

const CircularWorkSection: React.FC<CircularWorkSectionProps> = ({ items }) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [bend, setBend] = React.useState(2)
  const [isMobile, setIsMobile] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            // Disable LiquidEther in this section
            const liquidEther = document.querySelector('.fixed.inset-0.w-full.h-full.z-0')
            if (liquidEther instanceof HTMLElement) {
              liquidEther.style.pointerEvents = 'none'
            }
          } else {
            // Re-enable LiquidEther
            const liquidEther = document.querySelector('.fixed.inset-0.w-full.h-full.z-0')
            if (liquidEther instanceof HTMLElement) {
              liquidEther.style.pointerEvents = 'auto'
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
      // Re-enable LiquidEther on cleanup
      const liquidEther = document.querySelector('.fixed.inset-0.w-full.h-full.z-0')
      if (liquidEther instanceof HTMLElement) {
        liquidEther.style.pointerEvents = 'auto'
      }
    }
  }, [])

  // Handle responsive bend and mobile detection
  React.useEffect(() => {
    const updateResponsive = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      setBend(mobile ? 1 : 2)
    }

    updateResponsive()
    window.addEventListener('resize', updateResponsive)

    return () => {
      window.removeEventListener('resize', updateResponsive)
    }
  }, [])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }

  return (
    <div 
      ref={sectionRef}
      className="w-full pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-24 pb-20 sm:pb-40 md:pb-48 lg:pb-56 xl:pb-64 overflow-hidden relative section-container"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 1500px) and (max-width: 1699px) {
          .showcase-title {
            font-size: 1.75rem !important;
          }
        }
        @media (min-width: 1700px) and (max-width: 1919px) {
          .showcase-title {
            font-size: 2rem !important;
          }
        }
        @media (min-width: 1920px) and (max-width: 2099px) {
          .showcase-title {
            font-size: 2.125rem !important;
          }
        }
        @media (min-width: 2100px) and (max-width: 2399px) {
          .showcase-title {
            font-size: 2.25rem !important;
          }
        }
        @media (min-width: 2400px) {
          .showcase-title {
            font-size: 2.375rem !important;
          }
        }
      `}} />
      {/* Title - Centered Above */}
      <div className="w-full px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="showcase-title text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white font-sans tracking-tight uppercase text-center"
        >
          SHOWCASE
        </motion.h2>
      </div>

      {/* Full Width Gallery or Carousel */}
      {isMobile ? (
        /* Mobile Carousel */
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full h-[400px]"
        >
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {items.map((item, index) => (
              <motion.div
                key={item.text}
                className="absolute inset-0 flex items-center justify-center px-8"
                initial={false}
                animate={{
                  x: `${(index - currentIndex) * 100}%`,
                  scale: index === currentIndex ? 1 : 0.9,
                  opacity: index === currentIndex ? 1 : 0.3,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden border border-white/20">
                  {item.video ? (
                    <video
                      src={item.video}
                      className="w-full h-full object-cover"
                      loop
                      muted
                      playsInline
                      autoPlay={index === currentIndex}
                    />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.text}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
                    <h3 className="text-white text-lg font-medium">{item.text}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/90 transition-all active:scale-95"
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/90 transition-all active:scale-95"
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-white w-6' : 'bg-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      ) : (
        /* Desktop Circular Gallery */
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full custom-drag-cursor h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px]"
        >
          <style jsx>{`
            .custom-drag-cursor {
              cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60"><rect width="120" height="60" rx="30" fill="black" opacity="0.9"/><rect width="118" height="58" x="1" y="1" rx="29" fill="none" stroke="white" stroke-width="1" opacity="0.3"/><path d="M20 30 L28 24 M20 30 L28 36 M100 30 L92 24 M100 30 L92 36" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><text x="60" y="36" font-family="sans-serif" font-size="14" font-weight="600" fill="white" text-anchor="middle" letter-spacing="2">DRAG</text></svg>') 60 30, auto;
            }
            .custom-drag-cursor:active {
              cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60"><rect width="120" height="60" rx="30" fill="white" opacity="0.95"/><rect width="118" height="58" x="1" y="1" rx="29" fill="none" stroke="black" stroke-width="1" opacity="0.2"/><path d="M20 30 L28 24 M20 30 L28 36 M100 30 L92 24 M100 30 L92 36" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><text x="60" y="36" font-family="sans-serif" font-size="14" font-weight="600" fill="black" text-anchor="middle" letter-spacing="2">DRAG</text></svg>') 60 30, auto;
            }
          `}</style>
          <CircularGallery 
            items={items}
            bend={bend}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollSpeed={1}
            scrollEase={0.1}
            font="bold 24px sans-serif"
          />
        </motion.div>
      )}
    </div>
  )
}

export { CircularWorkSection }

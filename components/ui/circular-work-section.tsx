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
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
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
    }
  }, [])

  // Handle responsive bend
  React.useEffect(() => {
    const updateBend = () => {
      if (window.innerWidth <= 768) {
        setBend(1) // Mobile
      } else {
        setBend(2) // Desktop
      }
    }

    updateBend()
    window.addEventListener('resize', updateBend)

    return () => {
      window.removeEventListener('resize', updateBend)
    }
  }, [])

  return (
    <div 
      ref={sectionRef}
      className="w-full pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-24 pb-20 sm:pb-40 md:pb-48 lg:pb-56 xl:pb-64 overflow-hidden relative"
    >
      {/* Title - Centered Above */}
      <div className="w-full px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white font-sans tracking-tight uppercase text-center"
        >
          SHOWCASE
        </motion.h2>
      </div>

      {/* Full Width Circular Gallery */}
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
    </div>
  )
}

export { CircularWorkSection }


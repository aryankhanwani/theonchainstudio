"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface TimelineItem {
  id: string
  title: string
}

interface TimelineProps {
  items: TimelineItem[]
  startSectionId: string
  endSectionId: string
}

const Timeline: React.FC<TimelineProps> = ({ items, startSectionId, endSectionId }) => {
  const [lineHeight, setLineHeight] = React.useState(0)
  const [lineTop, setLineTop] = React.useState(0)
  const [itemPositions, setItemPositions] = React.useState<{ [key: string]: number }>({})
  const [progress, setProgress] = React.useState(0)
  const [isVisible, setIsVisible] = React.useState(false)
  const [scrollY, setScrollY] = React.useState(0)

  // Calculate positions and update progress
  React.useEffect(() => {
    const calculatePositions = () => {
      const startElement = document.getElementById(startSectionId)
      const endElement = document.getElementById(endSectionId)
      
      if (!startElement || !endElement) {
        setIsVisible(false)
        return
      }

      setIsVisible(true)
      const startRect = startElement.getBoundingClientRect()
      const endRect = endElement.getBoundingClientRect()
      
      const startTop = startRect.top + window.scrollY
      const endTop = endRect.top + window.scrollY
      
      // Calculate line height and absolute top position
      const height = endTop - startTop
      setLineHeight(height)
      setLineTop(startTop)
      
      // Calculate positions for each item relative to start (0 to 1)
      const positions: { [key: string]: number } = {}
      items.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const relativePosition = (elementTop - startTop) / height
          positions[item.id] = Math.max(0, Math.min(1, relativePosition))
        }
      })
      setItemPositions(positions)
    }

    const updateProgress = () => {
      const startElement = document.getElementById(startSectionId)
      const endElement = document.getElementById(endSectionId)
      
      if (!startElement || !endElement) return

      const startTop = startElement.getBoundingClientRect().top + window.scrollY
      const endTop = endElement.getBoundingClientRect().top + window.scrollY
      const currentScroll = window.scrollY
      const viewportCenter = currentScroll + window.innerHeight / 2
      
      // Calculate progress (0 to 1)
      const totalDistance = endTop - startTop
      if (totalDistance <= 0) return
      
      const scrolledDistance = viewportCenter - startTop
      const progressValue = Math.max(0, Math.min(1, scrolledDistance / totalDistance))
      
      setProgress(progressValue)
    }

    let rafId: number | null = null
    
    const handleUpdate = () => {
      if (rafId) return
      
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        calculatePositions()
        updateProgress()
        rafId = null
      })
    }

    // Initial calculation
    handleUpdate()
    
    // Listen to scroll and resize with throttling via RAF
    window.addEventListener('scroll', handleUpdate, { passive: true })
    window.addEventListener('resize', handleUpdate)
    
    // Recalculate after delays to ensure DOM is ready
    setTimeout(handleUpdate, 100)
    setTimeout(handleUpdate, 500)
    setTimeout(handleUpdate, 1000)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleUpdate)
      window.removeEventListener('resize', handleUpdate)
    }
  }, [items, startSectionId, endSectionId])

  if (!isVisible || lineHeight === 0) return null

  // Calculate visible portion
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 0
  const visibleTop = Math.max(0, lineTop - scrollY)
  const visibleBottom = Math.min(viewportHeight, visibleTop + lineHeight)
  const visibleHeight = Math.max(0, visibleBottom - visibleTop)

  // Only show if timeline is in viewport
  if (visibleHeight <= 0 || visibleBottom < 0 || visibleTop > viewportHeight) return null

  return (
    <div
      className="fixed left-8 lg:left-16 xl:left-24 z-30 pointer-events-none hidden md:block overflow-hidden"
      style={{ 
        top: `${visibleTop}px`,
        height: `${visibleHeight}px`,
      }}
    >
      <div className="relative h-full flex flex-col items-center" style={{ height: `${lineHeight}px`, top: `${Math.max(0, scrollY - lineTop)}px` }}>
        {/* Timeline Line - Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px bg-white/20" style={{ height: `${lineHeight}px` }}>
          {/* Filled portion */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-white origin-top"
            style={{
              scaleY: progress,
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: progress }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        {/* Timeline Items */}
        {items.map((item) => {
          const position = itemPositions[item.id] || 0
          const isActive = progress >= position - 0.05 // Small threshold for activation
          
          return (
            <div
              key={item.id}
              className="absolute left-1/2 flex items-center gap-3"
              style={{
                top: `${position * 100}%`,
                transform: `translate(-50%, -50%)`,
              }}
            >
              {/* Dot */}
              <motion.div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  isActive ? 'bg-white border-white' : 'bg-transparent border-white/40'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: isActive ? 1 : 0.8 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Title */}
              <motion.span
                className={`text-xs font-light uppercase tracking-wider whitespace-nowrap transition-all duration-300 font-sans ${
                  isActive ? 'text-white opacity-100' : 'text-white/40 opacity-60'
                }`}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: isActive ? 1 : 0.6 }}
                transition={{ duration: 0.3 }}
              >
                {item.title}
              </motion.span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { Timeline }

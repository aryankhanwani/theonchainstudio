"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface Service {
  title: string
  description: string
  image: string
}

interface ServicesShowcaseProps {
  services: Service[]
}

const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({ services }) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(0)
  const [tilt, setTilt] = React.useState(0)
  const [displayTilt, setDisplayTilt] = React.useState(0)
  const prevMouseX = React.useRef(0)
  const isHovering = hoveredIndex !== null

  // Update tilt based on mouse movement
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHovering) {
        const deltaX = e.clientX - prevMouseX.current
        prevMouseX.current = e.clientX
        
        // Calculate tilt based on movement direction (-15 to 15 degrees)
        const newTilt = Math.max(-15, Math.min(15, deltaX * 0.3))
        setTilt(newTilt)
      } else {
        prevMouseX.current = e.clientX
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovering])

  // Smooth tilt transition
  React.useEffect(() => {
    let animationFrameId: number

    const updateTilt = () => {
      setDisplayTilt(prev => {
        const target = isHovering ? tilt : 0
        const newTilt = prev + (target - prev) * 0.15
        if (Math.abs(newTilt - target) < 0.1) {
          return target
        }
        return newTilt
      })
      animationFrameId = requestAnimationFrame(updateTilt)
    }

    animationFrameId = requestAnimationFrame(updateTilt)
    return () => cancelAnimationFrame(animationFrameId)
  }, [tilt, isHovering])

  // Reset tilt when not hovering
  React.useEffect(() => {
    if (!isHovering) {
      setTilt(0)
    }
  }, [isHovering])

  return (
    <div className="w-full py-8 sm:py-10 md:py-12 lg:py-16 overflow-x-hidden relative section-container">
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 1500px) and (max-width: 1699px) {
          .service-title-text {
            font-size: 1.75rem !important;
          }
          .service-item-title {
            font-size: 2rem !important;
          }
          .service-item-desc {
            font-size: 0.9375rem !important;
            line-height: 1.6 !important;
          }
          .service-image-container {
            width: 400px !important;
          }
        }
        @media (min-width: 1700px) and (max-width: 1919px) {
          .service-title-text {
            font-size: 2rem !important;
          }
          .service-item-title {
            font-size: 2.25rem !important;
          }
          .service-item-desc {
            font-size: 1rem !important;
            line-height: 1.6 !important;
          }
          .service-image-container {
            width: 450px !important;
          }
        }
        @media (min-width: 1920px) and (max-width: 2099px) {
          .service-title-text {
            font-size: 2.125rem !important;
          }
          .service-item-title {
            font-size: 2.5rem !important;
          }
          .service-item-desc {
            font-size: 1.0625rem !important;
            line-height: 1.6 !important;
          }
          .service-image-container {
            width: 480px !important;
          }
        }
        @media (min-width: 2100px) and (max-width: 2399px) {
          .service-title-text {
            font-size: 2.25rem !important;
          }
          .service-item-title {
            font-size: 2.75rem !important;
          }
          .service-item-desc {
            font-size: 1.125rem !important;
            line-height: 1.6 !important;
          }
          .service-image-container {
            width: 520px !important;
          }
        }
        @media (min-width: 2400px) {
          .service-title-text {
            font-size: 2.375rem !important;
          }
          .service-item-title {
            font-size: 3rem !important;
          }
          .service-item-desc {
            font-size: 1.1875rem !important;
            line-height: 1.6 !important;
          }
          .service-image-container {
            width: 560px !important;
          }
        }
      `}} />
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 sm:gap-6 lg:gap-8 xl:gap-10 items-start">
        {/* Left Side - Title and Image */}
        <div className="px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 lg:sticky lg:top-0 order-1 self-start">
          <h2 className="service-title-text text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white font-sans tracking-tight uppercase mb-4 sm:mb-5 lg:mb-6">
            WHAT WE DO
          </h2>
          
          {/* Fixed Image below title */}
          <div className="service-image-container w-full sm:w-full md:w-full lg:w-[450px] xl:w-[500px] 2xl:w-[600px]">
            <AnimatePresence mode="wait">
              {hoveredIndex !== null && services[hoveredIndex] && (
                <motion.div
                  key={hoveredIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden"
                  style={{
                    transform: `rotate(${displayTilt}deg)`,
                    transformOrigin: 'center',
                  }}
                >
                  <Image
                    src={services[hoveredIndex].image}
                    alt={services[hoveredIndex].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 450px, 600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side - Services List - Horizontal Stripes */}
        <div className="px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 order-2">
          <div className="flex flex-col gap-0">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="relative border-b border-white/10 last:border-b-0"
                onMouseEnter={(e) => {
                  prevMouseX.current = e.clientX
                  setHoveredIndex(index)
                }}
                onMouseLeave={() => setHoveredIndex(0)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="py-4 sm:py-5 md:py-6 lg:py-7 xl:py-8 cursor-pointer group">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-6">
                    {/* Service Title */}
                    <h3 className="service-item-title text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-white font-sans tracking-tight transition-all duration-300 group-hover:text-white/80 lg:w-1/3">
                      {service.title}
                    </h3>
                    
                    {/* Service Description */}
                    <p className="service-item-desc text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/60 font-light font-sans leading-relaxed lg:w-2/3 transition-all duration-300 group-hover:text-white/80">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { ServicesShowcase }

"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Service {
  title: string
  number: string
  image?: string
}

interface ServicesShowcaseProps {
  services: Service[]
}

const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({ services }) => {
  const [activeIndex, setActiveIndex] = React.useState(0)

  // Placeholder images from Unsplash - you can replace these with actual service images
  const serviceImages = [
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2069",
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071",
    "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1932",
    "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1932",
    "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1932",
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071",
  ]

  return (
    <div className="w-full min-h-screen py-12 sm:py-16 md:py-20 lg:py-32 overflow-x-hidden ">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-start">
        {/* Left Side - Title and Image */}
        <div className="px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 lg:sticky lg:top-0 order-1 self-start">
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12">
            {/* Title */}
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white font-sans tracking-tight uppercase">
              WHAT WE DO
            </h2>
            
            {/* Image Display */}
            <div className="w-full sm:w-full md:w-full lg:w-[500px] xl:w-[600px] 2xl:w-[700px]">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[4/3] lg:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-black/50">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                  >
                    <img
                      src={serviceImages[activeIndex] || serviceImages[0]}
                      alt={services[activeIndex]?.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Services List */}
        <div className="px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 mt-6 sm:mt-8 md:mt-10 lg:mt-16 order-2 overflow-x-hidden">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 overflow-hidden">
            {services.map((service, index) => (
              <motion.button
                key={service.title}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`text-left transition-all duration-100 ${
                  activeIndex === index
                    ? 'text-white'
                    : 'text-white/40 hover:text-white/60'
                }`}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.1 }}
              >
                <h3
                  className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-6xl service-title font-light font-sans tracking-tight transition-all duration-50 break-words ${
                    activeIndex === index
                      ? 'text-white'
                      : 'text-white/40'
                  }`}
                >
                  {service.title}
                </h3>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { ServicesShowcase }


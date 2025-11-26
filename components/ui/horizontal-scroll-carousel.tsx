"use client"

import * as React from "react"
import { motion, useTransform, useScroll } from "framer-motion"

interface Service {
  title: string
  number: string
}

interface HorizontalScrollCarouselProps {
  services: Service[]
}

const HorizontalScrollCarousel: React.FC<HorizontalScrollCarouselProps> = ({ services }) => {
  const targetRef = React.useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })
  
  // Calculate scroll distance: start at 0, end when all cards have scrolled
  // For 6 cards with ~600px width each + gaps, we need to scroll approximately
  // (card width + gap) * number of cards - viewport width
  // Using percentage for responsive behavior
  const totalCards = services.length
  // Approximate: each card takes ~650px (600px card + 50px gap)
  // We want to scroll enough to reveal all cards
  const scrollDistance = totalCards * 650 - 100 // Subtract viewport width approximation
  
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -scrollDistance]
  )

  return (
    <section
      ref={targetRef}
      className="relative h-[300vh] w-full"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-6 md:gap-8 lg:gap-12 will-change-transform pl-4 md:pl-8 lg:pl-16 xl:pl-24"
        >
          {services.map((service) => (
            <ServiceCard
              service={service}
              key={service.title}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  return (
    <div className="group relative h-[500px] w-[400px] md:w-[500px] lg:w-[600px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 bg-white/5 hover:bg-white/10">
      {/* Large number background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[200px] md:text-[250px] lg:text-[300px] font-black text-white/5 group-hover:text-white/10 transition-colors duration-500 font-sans leading-none select-none">
          {service.number}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8 md:p-12">
        <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white font-sans tracking-tight group-hover:scale-105 transition-transform duration-500">
          {service.title}
        </h3>
      </div>

      {/* Arrow indicator */}
      <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
        <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black"
          >
            <path
              d="M5 15L15 5M15 5H5M15 5V15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export { HorizontalScrollCarousel }


"use client"

import * as React from "react"
import { motion } from "framer-motion"

interface AnimatedTextSectionProps {
  text: string
}

const AnimatedTextSection: React.FC<AnimatedTextSectionProps> = ({ text }) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [initialX, setInitialX] = React.useState(500)
  const sectionRef = React.useRef<HTMLDivElement>(null)

  // Split text into words
  const words = text.split(" ")

  React.useEffect(() => {
    // Set initial X position based on viewport width
    setInitialX(typeof window !== "undefined" ? window.innerWidth + 200 : 500)
  }, [])

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
        rootMargin: "0px 0px -100px 0px",
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className="w-full py-20 sm:py-24 md:py-32 lg:py-40 xl:py-48 overflow-hidden"
    >
      <div className="px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-screen-2xl mx-auto">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-white/90 font-light leading-relaxed font-sans">
            {words.map((word, index) => (
              <motion.span
                key={index}
                initial={{ x: initialX, opacity: 0 }}
                animate={
                  isVisible
                    ? { x: 0, opacity: 1 }
                    : { x: initialX, opacity: 0 }
                }
                transition={{
                  duration: 0.8,
                  delay: index * 0.05,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="inline-block mr-2 sm:mr-3"
              >
                {word}
              </motion.span>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}

export { AnimatedTextSection }


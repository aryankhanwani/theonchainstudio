"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Image from "next/image"

const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false)
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const imageRef = React.useRef<HTMLDivElement>(null)

  // Mouse tracking for parallax effect on image
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig)

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

  // Handle mouse move for image parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) / rect.width)
    mouseY.set((e.clientY - centerY) / rect.height)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // Split text into words for animation
  const splitIntoWords = (text: string) => text.split(' ')

  // Main title words
  const titleWords = splitIntoWords("Built for Founders Who Deserve Better Storytelling")

  return (
    <div 
      ref={sectionRef} 
      className="w-full pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-36 pb-20 sm:pb-24 md:pb-28 lg:pb-32 xl:pb-36 overflow-x-hidden relative section-container"
    >
      <style dangerouslySetInnerHTML={{__html: `
        /* Optimized for mobile (below 640px) */
        @media (max-width: 639px) {
          .about-title {
            font-size: 1rem !important;
          }
          .about-main-title {
            font-size: 1.5rem !important;
            line-height: 1.1 !important;
          }
          .about-paragraph {
            font-size: 0.875rem !important;
            line-height: 1.6 !important;
          }
          .about-insight-title {
            font-size: 0.9375rem !important;
            line-height: 1.4 !important;
          }
          .about-value-statement {
            font-size: 1.25rem !important;
            line-height: 1.3 !important;
          }
          .about-signature {
            font-size: 1.125rem !important;
          }
          .about-signature-sub {
            font-size: 0.8125rem !important;
          }
        }
        /* Optimized for small tablets (640px to 767px) */
        @media (min-width: 640px) and (max-width: 767px) {
          .about-title {
            font-size: 1.125rem !important;
          }
          .about-main-title {
            font-size: 1.75rem !important;
            line-height: 1.1 !important;
          }
          .about-paragraph {
            font-size: 0.9375rem !important;
            line-height: 1.6 !important;
          }
          .about-insight-title {
            font-size: 1rem !important;
            line-height: 1.4 !important;
          }
          .about-value-statement {
            font-size: 1.5rem !important;
            line-height: 1.3 !important;
          }
          .about-signature {
            font-size: 1.25rem !important;
          }
          .about-signature-sub {
            font-size: 0.875rem !important;
          }
        }
        /* Optimized for tablets (768px to 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .about-title {
            font-size: 1.25rem !important;
          }
          .about-main-title {
            font-size: 2rem !important;
            line-height: 1.08 !important;
          }
          .about-paragraph {
            font-size: 0.9375rem !important;
            line-height: 1.6 !important;
          }
          .about-insight-title {
            font-size: 1.0625rem !important;
            line-height: 1.4 !important;
          }
          .about-value-statement {
            font-size: 1.625rem !important;
            line-height: 1.3 !important;
          }
          .about-signature {
            font-size: 1.375rem !important;
          }
          .about-signature-sub {
            font-size: 0.9375rem !important;
          }
        }
        /* Optimized for small desktops (1024px to 1199px) */
        @media (min-width: 1024px) and (max-width: 1199px) {
          .about-title {
            font-size: 1.375rem !important;
          }
          .about-main-title {
            font-size: 2.25rem !important;
            line-height: 1.08 !important;
          }
          .about-paragraph {
            font-size: 0.9375rem !important;
            line-height: 1.6 !important;
          }
          .about-insight-title {
            font-size: 1.0625rem !important;
            line-height: 1.4 !important;
          }
          .about-value-statement {
            font-size: 1.75rem !important;
            line-height: 1.3 !important;
          }
          .about-signature {
            font-size: 1.5rem !important;
          }
          .about-signature-sub {
            font-size: 0.9375rem !important;
          }
        }
        /* Optimized for 1200px to 1499px */
        @media (min-width: 1200px) and (max-width: 1499px) {
          .about-title {
            font-size: 1.5rem !important;
          }
          .about-main-title {
            font-size: 2.5rem !important;
            line-height: 1.08 !important;
          }
          .about-paragraph {
            font-size: 0.9375rem !important;
            line-height: 1.6 !important;
          }
          .about-insight-title {
            font-size: 1rem !important;
            line-height: 1.4 !important;
          }
          .about-value-statement {
            font-size: 1.75rem !important;
            line-height: 1.3 !important;
          }
          .about-signature {
            font-size: 1.375rem !important;
          }
          .about-signature-sub {
            font-size: 0.9375rem !important;
          }
        }
        /* Optimized for 1500px to 1699px */
        @media (min-width: 1500px) and (max-width: 1699px) {
          .about-title {
            font-size: 1.75rem !important;
          }
          .about-main-title {
            font-size: 3rem !important;
            line-height: 1.08 !important;
          }
          .about-paragraph {
            font-size: 1rem !important;
            line-height: 1.6 !important;
          }
          .about-insight-title {
            font-size: 1.125rem !important;
            line-height: 1.4 !important;
          }
          .about-value-statement {
            font-size: 2rem !important;
            line-height: 1.3 !important;
          }
          .about-signature {
            font-size: 1.5rem !important;
          }
          .about-signature-sub {
            font-size: 1rem !important;
          }
        }
        /* Optimized for 1700px to 1919px */
        @media (min-width: 1700px) and (max-width: 1919px) {
          .about-title {
            font-size: 2rem !important;
          }
          .about-main-title {
            font-size: 3.5rem !important;
            line-height: 1.08 !important;
          }
          .about-paragraph {
            font-size: 1.0625rem !important;
            line-height: 1.6 !important;
          }
          .about-insight-title {
            font-size: 1.25rem !important;
            line-height: 1.4 !important;
          }
          .about-value-statement {
            font-size: 2.25rem !important;
            line-height: 1.3 !important;
          }
          .about-signature {
            font-size: 1.75rem !important;
          }
          .about-signature-sub {
            font-size: 1.125rem !important;
          }
        }
        /* Optimized for 1920px to 2099px */
        @media (min-width: 1920px) and (max-width: 2099px) {
          .about-title {
            font-size: 2.125rem !important;
          }
          .about-main-title {
            font-size: 4rem !important;
            line-height: 1.08 !important;
          }
          .about-paragraph {
            font-size: 1.125rem !important;
            line-height: 1.6 !important;
          }
          .about-insight-title {
            font-size: 1.375rem !important;
            line-height: 1.4 !important;
          }
          .about-value-statement {
            font-size: 2.5rem !important;
            line-height: 1.3 !important;
          }
          .about-signature {
            font-size: 2rem !important;
          }
          .about-signature-sub {
            font-size: 1.25rem !important;
          }
        }
        /* Optimized for 2100px to 2399px */
        @media (min-width: 2100px) and (max-width: 2399px) {
          .about-title {
            font-size: 2.25rem !important;
          }
          .about-main-title {
            font-size: 4.5rem !important;
            line-height: 1.08 !important;
          }
          .about-paragraph {
            font-size: 1.1875rem !important;
            line-height: 1.6 !important;
          }
          .about-insight-title {
            font-size: 1.5rem !important;
            line-height: 1.4 !important;
          }
          .about-value-statement {
            font-size: 2.75rem !important;
            line-height: 1.3 !important;
          }
          .about-signature {
            font-size: 2.25rem !important;
          }
          .about-signature-sub {
            font-size: 1.375rem !important;
          }
        }
        /* Optimized for 2400px and above */
        @media (min-width: 2400px) {
          .about-title {
            font-size: 2.375rem !important;
          }
          .about-main-title {
            font-size: 5rem !important;
            line-height: 1.08 !important;
          }
          .about-paragraph {
            font-size: 1.25rem !important;
            line-height: 1.6 !important;
          }
          .about-insight-title {
            font-size: 1.625rem !important;
            line-height: 1.4 !important;
          }
          .about-value-statement {
            font-size: 3rem !important;
            line-height: 1.3 !important;
          }
          .about-signature {
            font-size: 2.5rem !important;
          }
          .about-signature-sub {
            font-size: 1.5rem !important;
          }
        }
      `}} />
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start w-full">
        {/* Left Side - Title */}
        <div className="px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 lg:sticky lg:top-0 order-1 self-start pt-0">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="about-title text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white font-sans tracking-tight uppercase"
          >
            ABOUT
          </motion.h2>
        </div>

        {/* Right Side - Two Column Layout with Visual */}
        <div className="px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 order-2 w-full pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start">
            
            {/* Left Column - Visual Element with enhanced styling */}
            <div 
              ref={imageRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="lg:sticky lg:top-0 self-start"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-full aspect-[3/4] max-h-[400px] lg:max-h-[480px] rounded-xl overflow-hidden group"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
              >
                <Image
                  src="/IMG_6276.PNG"
                  alt="The Onchain Studio"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
                {/* Enhanced gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Refined border with glow effect */}
                <div className="absolute inset-0 border border-white/20 rounded-xl pointer-events-none group-hover:border-white/30 transition-colors duration-500" />
                <div className="absolute inset-0 rounded-xl shadow-[0_0_60px_rgba(255,255,255,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </div>

            {/* Right Column - Content with refined spacing */}
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7">
              
              {/* Section Title - Large text with word-by-word animation */}
              <div className="relative">
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="about-main-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light text-white font-sans leading-[1.08] tracking-tight pr-4"
                >
                  {titleWords.map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 50, rotateX: -90 }}
                      animate={isVisible ? { 
                        opacity: 1, 
                        y: 0, 
                        rotateX: 0 
                      } : { 
                        opacity: 0, 
                        y: 50, 
                        rotateX: -90 
                      }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.08,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="inline-block mr-2 sm:mr-3"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h3>
                {/* Enhanced decorative line under title */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 1.2, delay: 0.9, ease: [0.4, 0, 0.2, 1] }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mt-3 sm:mt-4 origin-left"
                />
              </div>

              {/* Main Content Block with refined typography */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 1.1, ease: [0.4, 0, 0.2, 1] }}
                className="space-y-3 sm:space-y-4"
              >
                <p className="about-paragraph text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl text-white/75 font-light font-sans leading-[1.6] tracking-wide">
                  The Onchain Studio was created after hearing the same problem from founders again and again.
                </p>
                
                <p className="about-paragraph text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl text-white/75 font-light font-sans leading-[1.6] tracking-wide">
                  They were building remarkable products but struggling to communicate them. Their ideas were powerful, but the content wasn't — too technical, too rushed, too forgettable.
                </p>
              </motion.div>

              {/* Insight Block - Enhanced visual card style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 1.3, ease: [0.4, 0, 0.2, 1] }}
                className="relative"
              >
                <div className="relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 md:p-6 hover:border-white/25 hover:bg-white/[0.05] transition-all duration-700 group overflow-hidden">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(255,255,255,0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="relative space-y-3 sm:space-y-4">
                    <p className="about-paragraph text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl text-white/85 font-light font-sans leading-[1.6]">
                      We realized Web3 didn't need more noise.
                    </p>
                    
                    <div className="space-y-2 sm:space-y-2.5 pl-3 sm:pl-5 border-l-2 border-white/25 group-hover:border-white/50 transition-colors duration-700">
                      <motion.p 
                        initial={{ opacity: 0, x: -10 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.6, delay: 1.5 }}
                        className="about-insight-title text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl text-white font-light font-sans leading-[1.4]"
                      >
                        It needed clarity.
                      </motion.p>
                      <motion.p 
                        initial={{ opacity: 0, x: -10 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.6, delay: 1.6 }}
                        className="about-insight-title text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl text-white font-light font-sans leading-[1.4]"
                      >
                        It needed emotion.
                      </motion.p>
                      <motion.p 
                        initial={{ opacity: 0, x: -10 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.6, delay: 1.7 }}
                        className="about-insight-title text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl text-white font-light font-sans leading-[1.4]"
                      >
                        It needed storytelling crafted with intention.
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Value Statement Block - Elegant typography */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 1.8, ease: [0.4, 0, 0.2, 1] }}
                className="relative pt-3 sm:pt-4"
              >
                <div className="relative">
                  <p className="about-value-statement text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-light leading-[1.3] tracking-[-0.015em] max-w-4xl" style={{ fontFamily: 'ui-serif, Georgia, "Times New Roman", Times, serif' }}>
                    Our purpose is simple: to help builders be{' '}
                    <span className="italic font-normal">seen</span>,{' '}
                    <span className="italic font-normal">understood</span>, and{' '}
                    <span className="italic font-normal">remembered</span>.
                  </p>
                </div>
                
                {/* Enhanced accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 1, delay: 2, ease: [0.4, 0, 0.2, 1] }}
                  className="h-[1px] bg-gradient-to-r from-white/60 via-white/40 to-transparent mt-4 sm:mt-5 origin-left w-1/3"
                />
              </motion.div>

              {/* Closing Signature - Normal italic styling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 2, ease: [0.4, 0, 0.2, 1] }}
                className="pt-4 sm:pt-5 md:pt-6 space-y-2 sm:space-y-3"
              >
                <p className="about-signature text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white/90 font-light italic leading-[1.4] tracking-wide font-sans">
                  This is The Onchain Studio
                </p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.7, delay: 2.2, ease: [0.4, 0, 0.2, 1] }}
                  className="about-signature-sub text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/70 font-light italic leading-[1.5] tracking-wide max-w-2xl font-sans"
                >
                  Where your vision becomes a story people care about.
                </motion.p>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { AboutSection }







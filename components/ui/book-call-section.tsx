"use client"

import * as React from "react"
import { motion } from "framer-motion"

const BookCallSection: React.FC = () => {
  return (
    <section
      className="relative w-full min-h-[70vh] bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden"
    >

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white mb-6 sm:mb-8 md:mb-10 font-sans leading-tight tracking-tight text-center"
          >
            GET YOUR
            <br />
            <span className="text-white/90 whitespace-nowrap">PROJECT ONCHAIN</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/70 font-light mb-10 sm:mb-12 md:mb-16 font-sans max-w-2xl mx-auto text-center"
          >
            Let's build something extraordinary together. Book a call to discuss your next web3 project.
          </motion.p>

          <motion.a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#contact"}
            target={process.env.NEXT_PUBLIC_CALENDLY_URL ? "_blank" : undefined}
            rel={process.env.NEXT_PUBLIC_CALENDLY_URL ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-white text-black rounded-full font-bold text-base sm:text-lg uppercase tracking-wider font-sans hover:bg-white/90 transition-colors duration-300"
          >
            <span>BOOK A CALL</span>
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
          </motion.a>
        </div>
      </div>
    </section>
  )
}

export { BookCallSection }


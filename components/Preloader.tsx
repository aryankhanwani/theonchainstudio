'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [percentage, setPercentage] = useState(0);
  
  const texts = [
    'Creating',
    'Crafting',
    'Innovating',
    'Narrative',
    'Storytelling',
  ];

  const duration = 2000; // 2 seconds

  useEffect(() => {
    // Cycle through texts
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 600);

    // Update percentage
    const startTime = Date.now();
    const percentageInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setPercentage(Math.floor(progress));
    }, 16); // ~60fps

    // Complete after duration
    const completeTimer = setTimeout(() => {
      clearInterval(textInterval);
      clearInterval(percentageInterval);
      setPercentage(100);
      setTimeout(() => {
        onComplete();
      }, 100);
    }, duration);

    return () => {
      clearInterval(textInterval);
      clearInterval(percentageInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete, texts.length, duration]);

  return (
    <motion.div
      initial={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.1, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
      }}
    >
      <div className="text-center flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTextIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="font-[var(--font-poppins)] text-4xl sm:text-5xl md:text-6xl font-light text-white"
          >
            {texts[currentTextIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Percentage counter at bottom */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="font-[var(--font-poppins)] text-2xl sm:text-3xl md:text-4xl font-light text-white/60">
          {percentage}%
        </div>
      </motion.div>
    </motion.div>
  );
}


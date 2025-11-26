'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LiquidEther from '@/components/LiquidEther';
import { LetterSwapPingPong } from '@/components/ui/letter-swap';
import { ServicesShowcase } from '@/components/ui/services-showcase';
import Preloader from '@/components/Preloader';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  const services = [
    { title: 'Blockchain Development', number: '01' },
    { title: 'Web3 Applications', number: '02' },
    { title: 'NFT Solutions', number: '03' },
    { title: 'DeFi Platforms', number: '04' },
    { title: 'Smart Contract Audits', number: '05' },
    { title: 'Web3 Consulting', number: '06' },
  ];

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isPreloaderComplete && (
          <Preloader onComplete={() => setIsPreloaderComplete(true)} />
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {isPreloaderComplete && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.1
            }}
            className="relative w-full bg-black overflow-x-hidden"
          >
      {/* LiquidEther Background */}
      <div className="absolute inset-0 w-full h-full">
        <LiquidEther
          colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Brand Name - Top Left */}
      <div className="absolute top-6 sm:top-8 md:top-16 left-5 sm:left-6 md:left-8 lg:left-16 xl:left-24 z-20">
        <a 
          href="/" 
          className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white tracking-wider font-sans cursor-pointer lowercase inline-block"
        >
          <LetterSwapPingPong
            label="theonchainstudio."
            reverse={false}
            staggerFrom="center"
            className="lowercase"
          />
        </a>
      </div>

      {/* Hamburger Menu Button - Mobile Only */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden absolute top-6 sm:top-8 right-5 sm:right-6 md:right-8 z-30 w-9 h-9 sm:w-10 sm:h-10 flex flex-col justify-center items-center gap-1.5"
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isMenuOpen ? 'opacity-0' : ''
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
            isMenuOpen ? '-rotate-45 -translate-y-2' : ''
          }`}
        ></span>
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black/95 z-20 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          <a
            href="#works"
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-medium text-white transition-opacity hover:opacity-70 font-sans uppercase tracking-wider"
          >
            WORKS
          </a>
          <a
            href="#about"
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-medium text-white transition-opacity hover:opacity-70 font-sans uppercase tracking-wider"
          >
            ABOUT
          </a>
          <a
            href="#start-project"
            onClick={() => setIsMenuOpen(false)}
            className="text-2xl font-medium text-white transition-opacity hover:opacity-70 font-sans uppercase tracking-wider inline-flex items-center gap-3"
          >
            START A PROJECT
            <span className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
              <svg
                width="16"
                height="16"
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
            </span>
          </a>
        </nav>
      </div>

      {/* Desktop Navigation - Top Right */}
      <nav className="hidden md:flex absolute top-8 md:top-16 right-8 md:right-16 lg:right-24 z-20">
        <ul className="flex flex-row items-center gap-4 md:gap-6 lg:gap-8">
          <li>
            <a
              href="#works"
              className="group text-sm md:text-base lg:text-lg font-medium text-white hover:opacity-70 transition-all duration-300 font-sans uppercase tracking-wider cursor-pointer relative inline-block"
            >
              <span className="relative">
                WORKS
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="group text-sm md:text-base lg:text-lg font-medium text-white hover:opacity-70 transition-all duration-300 font-sans uppercase tracking-wider cursor-pointer relative inline-block"
            >
              <span className="relative">
                ABOUT
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>
          </li>
          <li>
            <a
              href="#start-project"
              className="group text-sm md:text-base lg:text-lg font-medium text-white transition-all duration-500 ease-out font-sans uppercase tracking-wider cursor-pointer inline-flex items-center gap-2 relative"
            >
              <span className="relative z-10 transition-transform duration-500 ease-out group-hover:translate-x-[-4px]">
                START A PROJECT
              </span>
              <span className="relative shrink-0">
                {/* Background circle with scale animation */}
                <span className="absolute inset-0 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-center"></span>
                {/* Arrow container with slide and fade */}
                <span className="relative w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-500 ease-out delay-75">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-black relative z-10"
                  >
                    <path
                      d="M5 15L15 5M15 5H5M15 5V15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-auto md:min-h-screen w-full overflow-hidden">
        {/* Hero Content */}
        <div className="relative z-10 flex h-auto md:min-h-screen items-start md:items-center justify-start px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-20 sm:pt-24 md:pt-0 pb-12 md:pb-0">
        <div className="w-full max-w-7xl">
          {/* Main Hero Text */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[10rem] font-bold leading-[0.9] tracking-[-0.02em] text-white mb-4 sm:mb-6 md:mb-8 font-sans">
            <div className="block">BRINGING</div>
            <div className="block">THE CREATIVITY</div>
            {/* Desktop: Video inline with ONCHAIN */}
            <div className="hidden md:flex items-center gap-4 md:gap-6 lg:gap-8 whitespace-nowrap">
              <span className="block">ONCHAIN</span>
              <div className="relative w-32 h-20 md:w-48 md:h-28 lg:w-64 lg:h-40 shrink-0">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-lg"
                >
                  <source src="/IMG_0330-1.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            {/* Mobile: ONCHAIN without video */}
            <div className="block md:hidden">ONCHAIN</div>
          </h1>

          {/* Mobile: Video below hero text */}
          <div className="md:hidden mt-4 sm:mt-6 mb-4 sm:mb-6 w-full">
            <div className="relative w-full aspect-video">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-lg"
              >
                <source src="/IMG_0330-1.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Mobile: Subtitle Text below video */}
          <div className="md:hidden mb-6 sm:mb-8">
            <p className="text-md sm:text-sm text-white/70 font-light leading-relaxed font-sans text-left">
              We specialize in blockchain technology,
              decentralized applications, and innovative
              digital solutions that push the boundaries
              of what's possible in the web3 space.
            </p>
          </div>

          {/* Desktop: Subtitle Text - positioned below navigation */}
          <div className="hidden md:block absolute top-48 lg:top-56 xl:top-64 right-8 lg:right-16 xl:right-24 text-right max-w-md lg:max-w-lg xl:max-w-xl">
            <p className="text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white/70 font-light leading-relaxed font-sans">
              We specialize in blockchain technology,<br />
              decentralized applications, and innovative<br />
              digital solutions that push the boundaries<br />
              of what's possible in the web3 space.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section
        id="works"
        className="relative w-full bg-black"
      >
        <ServicesShowcase services={services} />
      </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

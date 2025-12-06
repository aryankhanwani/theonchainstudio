'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import LiquidEther from '@/components/LiquidEther';
import { LetterSwapPingPong } from '@/components/ui/letter-swap';
import { ServicesShowcase } from '@/components/ui/services-showcase';
import { WorksSection } from '@/components/ui/works-section';
import { CircularWorkSection } from '@/components/ui/circular-work-section';
import { AboutSection } from '@/components/ui/about-section';
import { BookCallSection } from '@/components/ui/book-call-section';
import Preloader from '@/components/Preloader';
import CircularText from '@/components/CircularText';
import { Timeline } from '@/components/ui/timeline';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Supabase video URL
  const videoUrl = 'https://fvkusemfgfntpxebubku.supabase.co/storage/v1/object/public/videos/IMG_0330-1.mp4';

  // Fixed random order (shuffled once, stays the same)
  const works = [
    // Landscape videos (wider, shorter) - 6 items
    { id: 'stat-1', type: 'stat' as const, cardType: 'square' as const, statData: { label: 'Projects', value: '100+', info: 'Projects Completed' }, height: 200 },
    // { id: 'video-1', type: 'video' as const, cardType: 'landscape' as const, videoUrl: videoUrl, height: 800 },
    { id: 'image-1', type: 'image' as const, cardType: 'portrait' as const, img: '/image.png', height: 400 },
    { id: 'image-2', type: 'image' as const, cardType: 'landscape' as const, img: '/image.png', height: 800 },
    { id: 'image-3', type: 'image' as const, cardType: 'portrait' as const, img: '/image.png', height: 400 },
    { id: 'stat-2', type: 'stat' as const, cardType: 'square' as const, statData: { label: 'Impressions', value: '2M+', info: 'Total Reach' }, height: 200 },
    { id: 'image-4', type: 'image' as const, cardType: 'landscape' as const, img: '/image.png', height: 800 },
    { id: 'video-2', type: 'video' as const, cardType: 'landscape' as const, videoUrl: videoUrl, height: 800 },
    { id: 'image-5', type: 'image' as const, cardType: 'landscape' as const, img: '/image.png', height: 800 },
    // { id: 'image-6', type: 'image' as const, cardType: 'landscape' as const, img: '/image.png', height: 800 },
    { id: 'stat-3', type: 'stat' as const, cardType: 'square' as const, statData: { label: 'Years', value: '5+', info: 'Leading web3 innovation' }, height: 200 },
  ];

  const services = [
    {
      title: 'Founder Story & Brand Films',
      description: 'A cinematic introduction to your story, your journey, and your mission. We bring out the clarity, confidence, and authenticity that only a well-crafted founder narrative can deliver.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2069'
    },
    {
      title: 'Podcast Production',
      description: 'From multi-camera setups to studio-grade audio and thoughtful editing, we handle your entire podcast experience end-to-end. You speak. We shape it into content that feels polished and effortless.',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071'
    },
    {
      title: 'Event Glimpses',
      description: 'Moments matter. We capture the energy, emotion, and essence of your event with elegance and speed. Your community should feel like they were there.',
      image: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1932'
    },
    {
      title: 'Explainers and Motion Graphics',
      description: 'Complex products deserve simple, beautiful storytelling. We use clean visuals, human-focused motion design, and refined narration to make your technology easy to understand.',
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1932'
    },
    {
      title: 'Talking Heads and Interviews',
      description: 'Honest, sharp, founder-led videos that communicate updates, insights, and product messages with authority and personality.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2069'
    },
    {
      title: 'Social-First Editing',
      description: 'Short-form content designed to stop the scroll. Premium formatting, platform-specific cuts, and sharp pacing that drives attention across X, Instagram, TikTok, and YouTube Shorts.',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071'
    },
  ];

  const circularGalleryItems = [
    {
      image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&h=1000',
      text: 'BRAND FILMS',
      video: videoUrl
    },
    {
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2000&h=1000',
      text: 'PODCAST PRODUCTION'
    },
    {
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&h=1000',
      text: 'EVENT COVERAGE'
    },
    {
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&h=1000',
      text: 'MOTION GRAPHICS',
      video: videoUrl
    },
    {
      image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?q=80&w=2000&h=1000',
      text: 'SOCIAL CONTENT'
    },
    {
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=2000&h=1000',
      text: 'PRODUCT SHOWCASE'
    },
    {
      image: 'https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?q=80&w=2000&h=1000',
      text: 'CREATIVE DIRECTION'
    },
    {
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000&h=1000',
      text: 'INTERVIEWS',
      video: videoUrl
    },
  ];

  useEffect(() => {
    // Initialize Lenis smooth scroll with optimized settings
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 2,
      infinite: false,
      syncTouch: true,
      syncTouchLerp: 0.1,
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle anchor link clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const targetElement = document.querySelector(href) as HTMLElement;
          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: 0,
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
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
            className="relative w-full overflow-x-hidden"
            style={{
              transform: 'translateZ(0)',
              willChange: 'scroll-position',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
      {/* LiquidEther Background - Fixed to cover entire page */}
      <div className="fixed inset-0 w-full h-full z-0" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        <LiquidEther
          colors={['#FFFFFF', '#FFFFFF', '#FFFFFF']}
          mouseForce={18}
          cursorSize={90}
          isViscous={false}
          viscous={30}
          iterationsViscous={24}
          iterationsPoisson={24}
          resolution={0.4}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.4}
          autoIntensity={2.0}
          takeoverDuration={0.2}
          autoResumeDelay={3000}
          autoRampDuration={0.5}
        />
      </div>
      
      {/* Overlay to disable LiquidEther in showcase section */}
      <div id="showcase-overlay" className="fixed inset-0 pointer-events-none z-[5]" style={{ display: 'none' }} />

      {/* Brand Name - Top Left */}
      <div className="absolute top-6 sm:top-8 md:top-16 left-5 sm:left-6 md:left-8 lg:left-16 xl:left-24 z-20">
        <a 
          href="/" 
          className="brand-name text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-[0.25em] font-coolvetica uppercase cursor-pointer inline-block"
        >
          <LetterSwapPingPong
            label="ONCHAIN STUDIO"
            reverse={false}
            staggerFrom="center"
            className="brand-name font-coolvetica tracking-[0.15em] uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl"
          />
        </a>
      </div>

      {/* Hamburger Menu Button - Mobile Only */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-6 sm:top-8 right-5 sm:right-6 md:right-8 z-[9998] w-9 h-9 sm:w-10 sm:h-10 flex flex-col justify-center items-center gap-1.5"
        aria-label="Toggle menu"
        style={{
          position: 'fixed',
        }}
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
        className={`md:hidden fixed inset-0 bg-black/95 z-[9997] transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
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
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          <a
            href="#works"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              // Small delay to let menu close before scroll
              setTimeout(() => {
                const targetElement = document.querySelector('#works') as HTMLElement;
                if (targetElement && lenisRef.current) {
                  lenisRef.current.scrollTo(targetElement, {
                    offset: 0,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                  });
                }
              }, 100);
            }}
            className="text-2xl font-medium text-white transition-opacity hover:opacity-70 font-sans uppercase tracking-wider"
          >
            WORKS
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              setTimeout(() => {
                const targetElement = document.querySelector('#about') as HTMLElement;
                if (targetElement && lenisRef.current) {
                  lenisRef.current.scrollTo(targetElement, {
                    offset: 0,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                  });
                }
              }, 100);
            }}
            className="text-2xl font-medium text-white transition-opacity hover:opacity-70 font-sans uppercase tracking-wider"
          >
            ABOUT
          </a>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#start-project"}
            onClick={(e) => {
              if (process.env.NEXT_PUBLIC_CALENDLY_URL) {
                window.open(process.env.NEXT_PUBLIC_CALENDLY_URL, '_blank');
                setIsMenuOpen(false);
              } else {
                e.preventDefault();
                setIsMenuOpen(false);
                setTimeout(() => {
                  const targetElement = document.querySelector('#start-project') as HTMLElement;
                  if (targetElement && lenisRef.current) {
                    lenisRef.current.scrollTo(targetElement, {
                      offset: 0,
                      duration: 1.5,
                      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    });
                  }
                }, 100);
              }
            }}
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

      {/* Timeline Component */}
      {isPreloaderComplete && (
        <Timeline
          items={[
            { id: 'services', title: 'WHAT WE DO' },
            { id: 'works', title: 'WORKS' },
            { id: 'portfolio', title: 'SHOWCASE' },
            { id: 'about', title: 'ABOUT' },
          ]}
          startSectionId="services"
          endSectionId="about"
        />
      )}

      {/* Desktop Navigation - Top Right */}
      <nav className="hidden md:flex absolute top-8 md:top-16 right-8 md:right-16 lg:right-24 z-20">
        <ul className="flex flex-row items-center gap-4 md:gap-6 lg:gap-8">
          <li>
            <a
              href="#works"
              className="nav-link group text-sm md:text-base lg:text-lg font-medium text-white hover:opacity-70 transition-all duration-300 font-sans uppercase tracking-wider cursor-pointer relative inline-block"
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
              className="nav-link group text-sm md:text-base lg:text-lg font-medium text-white hover:opacity-70 transition-all duration-300 font-sans uppercase tracking-wider cursor-pointer relative inline-block"
            >
              <span className="relative">
                ABOUT
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>
          </li>
          <li>
            <a
              href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#start-project"}
              onClick={(e) => {
                if (process.env.NEXT_PUBLIC_CALENDLY_URL) {
                  e.preventDefault();
                  window.open(process.env.NEXT_PUBLIC_CALENDLY_URL, '_blank');
                }
              }}
              className="nav-link group text-sm md:text-base lg:text-lg font-medium text-white transition-all duration-500 ease-out font-sans uppercase tracking-wider cursor-pointer inline-flex items-center gap-2 relative"
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
      <section id="home" className="relative h-auto md:min-h-screen w-full overflow-hidden z-10">
        <style dangerouslySetInnerHTML={{__html: `
          /* Optimized for 1500px width */
          @media (min-width: 1500px) and (max-width: 1699px) {
            .hero-title {
              font-size: 5.5rem !important;
              line-height: 0.9 !important;
            }
            .hero-subtitle {
              font-size: 1.125rem !important;
              line-height: 1.6 !important;
            }
            .hero-video-container {
              width: 35rem !important;
              height: 22rem !important;
            }
            .circular-text-hero {
              width: 170px !important;
              height: 170px !important;
            }
            .circular-text-hero span {
              font-size: 15px !important;
            }
          }
          /* Optimized for 1700px width */
          @media (min-width: 1700px) and (max-width: 1919px) {
            .hero-title {
              font-size: 6rem !important;
              line-height: 0.9 !important;
            }
            .hero-subtitle {
              font-size: 1.25rem !important;
              line-height: 1.6 !important;
            }
            .hero-video-container {
              width: 40rem !important;
              height: 25rem !important;
            }
            .circular-text-hero {
              width: 180px !important;
              height: 180px !important;
            }
            .circular-text-hero span {
              font-size: 16px !important;
            }
          }
          /* Optimized for 1920px width */
          @media (min-width: 1920px) and (max-width: 2099px) {
            .hero-title {
              font-size: 6.5rem !important;
              line-height: 0.9 !important;
            }
            .hero-subtitle {
              font-size: 1.375rem !important;
              line-height: 1.6 !important;
            }
            .hero-video-container {
              width: 45rem !important;
              height: 28rem !important;
            }
            .circular-text-hero {
              width: 190px !important;
              height: 190px !important;
            }
            .circular-text-hero span {
              font-size: 17px !important;
            }
          }
          /* Optimized for 2100px+ width */
          @media (min-width: 2100px) and (max-width: 2399px) {
            .hero-title {
              font-size: 7rem !important;
              line-height: 0.9 !important;
            }
            .hero-subtitle {
              font-size: 1.5rem !important;
              line-height: 1.6 !important;
            }
            .hero-video-container {
              width: 50rem !important;
              height: 32rem !important;
            }
            .circular-text-hero {
              width: 200px !important;
              height: 200px !important;
            }
            .circular-text-hero span {
              font-size: 18px !important;
            }
          }
          /* Optimized for 2400px+ width */
          @media (min-width: 2400px) {
            .hero-title {
              font-size: 7.5rem !important;
              line-height: 0.9 !important;
            }
            .hero-subtitle {
              font-size: 1.625rem !important;
              line-height: 1.6 !important;
            }
            .hero-video-container {
              width: 55rem !important;
              height: 35rem !important;
            }
            .circular-text-hero {
              width: 210px !important;
              height: 210px !important;
            }
            .circular-text-hero span {
              font-size: 19px !important;
            }
          }
          @media (min-width: 1200px) and (max-width: 1499px) {
            .hero-title {
              font-size: 5rem !important;
            }
            .hero-subtitle {
              font-size: 1rem !important;
            }
            .hero-video-container {
              width: 32rem !important;
              height: 20rem !important;
            }
          }
          @media (max-width: 767px) {
            .circular-text-hero {
              display: none !important;
            }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .circular-text-hero {
              width: 150px !important;
              height: 150px !important;
            }
            .circular-text-hero span {
              font-size: 14px !important;
            }
          }
          @media (min-width: 1024px) and (max-width: 1279px) {
            .circular-text-hero {
              width: 160px !important;
              height: 160px !important;
            }
            .circular-text-hero span {
              font-size: 15px !important;
            }
          }
          @media (min-width: 1280px) and (max-width: 1499px) {
            .circular-text-hero {
              width: 170px !important;
              height: 170px !important;
            }
            .circular-text-hero span {
              font-size: 15px !important;
            }
          }
        `}} />
        {/* Hero Content */}
        <div className="relative z-10 flex h-auto md:min-h-screen items-start md:items-center justify-start px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-32 sm:pt-36 md:pt-0 pb-12 md:pb-0">
        <div className="w-full">
          {/* Main Hero Text */}
          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-[6rem] xl:text-[7rem] 2xl:text-[8rem] font-bold leading-[0.9] tracking-[-0.02em] text-white mb-8 sm:mb-10 md:mb-8 font-sans">
            <div className="block mb-2 sm:mb-3">BRINGING</div>
            <div className="block mb-2 sm:mb-3">THE CREATIVITY</div>
            <div className="block">ONCHAIN</div>
          </h1>

          {/* Mobile: Video below hero text */}
          <div className="md:hidden mt-8 sm:mt-10 mb-8 sm:mb-10 w-full -mx-5 sm:-mx-6 px-5 sm:px-6">
            <div className="relative w-full aspect-[16/10] sm:aspect-video">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                style={{
                  transform: 'translateZ(0)',
                  willChange: 'auto',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <source src="https://fvkusemfgfntpxebubku.supabase.co/storage/v1/object/public/videos/IMG_0330-1.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Mobile: Subtitle Text below video */}
          <div className="md:hidden mb-8 sm:mb-10">
            <p className="text-md sm:text-sm text-white/70 font-light leading-relaxed font-sans text-left">
              We transform founders, products, 
              and ideas into beautiful, cinematic stories that 
              inspire trust, elevate brand presence, 
              and make complex concepts unmistakably clear.
            </p>
          </div>

          {/* Desktop: Video - positioned at bottom right */}
          <div className="hidden md:block absolute bottom-8 lg:bottom-12 xl:bottom-16 right-8 lg:right-16 xl:right-24 z-10">
            <div className="hero-video-container relative w-80 h-50 md:w-96 md:h-60 lg:w-[32rem] lg:h-[20rem] xl:w-[40rem] xl:h-[25rem] 2xl:w-[45rem] 2xl:h-[28rem]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-lg"
                style={{
                  transform: 'translateZ(0)',
                  willChange: 'auto',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <source src="https://fvkusemfgfntpxebubku.supabase.co/storage/v1/object/public/videos/IMG_0330-1.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Desktop: Subtitle Text - positioned below navigation */}
          <div className="hidden md:block absolute top-48 lg:top-56 xl:top-64 right-8 lg:right-16 xl:right-24 text-right max-w-md lg:max-w-lg xl:max-w-xl">
            <p className="hero-subtitle text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white/70 font-light leading-relaxed font-sans">
              We transform founders, products, <br />
              and ideas into beautiful, cinematic stories that <br />
              inspire trust, elevate brand presence, <br />
              and make complex concepts unmistakably clear.
              
            </p>
          </div>
        </div>
        </div>

        {/* Circular Text - Bottom Center */}
        <div 
          className="hidden md:block absolute bottom-8 lg:bottom-12 xl:bottom-16 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
          onClick={() => {
            const worksSection = document.getElementById('works');
            if (worksSection && lenisRef.current) {
              lenisRef.current.scrollTo(worksSection, {
                offset: 0,
                duration: 0.5,
                easing: (t) => {
                  // Smooth ease-out cubic bezier
                  return 1 - Math.pow(1 - t, 3);
                },
                lerp: 0.08
              });
            } else if (worksSection) {
              worksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >
          <CircularText 
            text="CLICK HERE • CLICK HERE • " 
            spinDuration={20}
            className="circular-text-hero"
          />
        </div>
      </section>

      {/* What We Do Section */}
      <section
        id="services"
        className="relative w-full z-10"
      >
        <ServicesShowcase services={services} />
      </section>

      {/* Works Section */}
      <section
        id="works"
        className="relative w-full z-10"
      >
        <WorksSection works={works} />
      </section>

      {/* Circular Gallery Showcase Section */}
      <section
        id="portfolio"
        className="relative w-full z-10"
      >
        <CircularWorkSection items={circularGalleryItems} />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative w-full z-10"
      >
        <AboutSection />
      </section>

      {/* Book a Call Section */}
      <section
        id="start-project"
        className="relative w-full z-10"
      >
        <BookCallSection />
      </section>

      {/* Footer Section */}
      <footer className="relative w-full z-10 py-16 md:py-20 lg:py-24 px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 md:p-14 lg:p-20 border border-white/10 shadow-2xl relative overflow-hidden"
            style={{ 
              transformStyle: 'preserve-3d',
              perspective: '1000px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.2)'
            }}
            whileHover={{ 
              scale: 1.005,
              transition: { duration: 0.3 }
            }}
          >
            {/* Inner shadow overlay */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
              boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.05), inset 0 -2px 4px rgba(0, 0, 0, 0.1)'
            }} />
            {/* Main Footer Content - Grid Layout */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-16 mb-12 md:mb-16">
              {/* Column 1 - Brand */}
              <motion.div 
                className="flex flex-col gap-6 md:gap-8 items-start"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ 
                  x: 4,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
              >
                <motion.a 
                  href="/" 
                  className="brand-name text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-[0.25em] font-coolvetica uppercase cursor-pointer inline-block"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <LetterSwapPingPong
                    label="ONCHAIN STUDIO"
                    reverse={false}
                    staggerFrom="first"
                    className="brand-name font-coolvetica tracking-[0.15em] uppercase text-2xl sm:text-3xl md:text-4xl"
                  />
                </motion.a>
                <motion.p 
                  className="text-white/50 text-sm md:text-base font-light font-sans leading-relaxed"
                  whileHover={{ 
                    x: 2,
                    transition: { duration: 0.2 }
                  }}
                >
                  Bringing creativity onchain.
                </motion.p>
              </motion.div>

              {/* Column 2 - Contact & Social */}
              <motion.div 
                className="flex flex-col gap-6 md:gap-8"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ 
                  x: 4,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
              >
                <h3 className="text-white text-sm md:text-base font-semibold uppercase tracking-wider font-sans">
                  Connect
                </h3>
                <div className="flex flex-col gap-4 md:gap-5">
                  <motion.a 
                    href="mailto:hello@onchainstudio.com"
                    className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300 text-sm md:text-base font-light font-sans relative"
                    whileHover={{ 
                      x: 4,
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-white/80 transition-colors duration-300"
                      whileHover={{ 
                        rotateY: 15,
                        rotateX: 5,
                        transition: { duration: 0.2 }
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <svg
                        className="w-full h-full"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </motion.div>
                    <span>hello@onchainstudio.com</span>
                  </motion.a>
                  <motion.a 
                    href="https://x.com/onchainstudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300 text-sm md:text-base font-light font-sans relative"
                    whileHover={{ 
                      x: 4,
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-white/80 transition-colors duration-300"
                      whileHover={{ 
                        rotateY: 15,
                        rotateX: 5,
                        transition: { duration: 0.2 }
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <svg
                        className="w-full h-full"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </motion.div>
                    <span>@onchainstudio</span>
                  </motion.a>
                </div>
                <div className="flex items-center gap-3 md:gap-4 pt-2">
                  <motion.a
                    href="https://t.me/onchainstudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 relative"
                    aria-label="Telegram"
                    whileHover={{ 
                      scale: 1.1,
                      rotateY: 10,
                      rotateX: 5,
                      y: -2,
                      boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
                      transition: { duration: 0.2 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-white/80 group-hover:text-white transition-colors duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://x.com/onchainstudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 relative"
                    aria-label="Twitter"
                    whileHover={{ 
                      scale: 1.1,
                      rotateY: 10,
                      rotateX: 5,
                      y: -2,
                      boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
                      transition: { duration: 0.2 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-white/80 group-hover:text-white transition-colors duration-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="mailto:hello@onchainstudio.com"
                    className="group flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 relative"
                    aria-label="Email"
                    whileHover={{ 
                      scale: 1.1,
                      rotateY: 10,
                      rotateX: 5,
                      y: -2,
                      boxShadow: '0 10px 25px rgba(255, 255, 255, 0.1)',
                      transition: { duration: 0.2 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-white/80 group-hover:text-white transition-colors duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>

              {/* Column 3 - CTA */}
              <motion.div 
                className="flex flex-col gap-6 md:gap-8"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ 
                  x: 4,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
              >
                <h3 className="text-white text-sm md:text-base font-semibold uppercase tracking-wider font-sans">
                  Get Started
                </h3>
                <div className="flex flex-col gap-4">
                  <p className="text-white/60 text-sm md:text-base font-light font-sans leading-relaxed">
                    Ready to bring your vision to life? Let's discuss your next project.
                  </p>
                  <motion.a
                    href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#start-project"}
                    target={process.env.NEXT_PUBLIC_CALENDLY_URL ? "_blank" : undefined}
                    rel={process.env.NEXT_PUBLIC_CALENDLY_URL ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      if (!process.env.NEXT_PUBLIC_CALENDLY_URL) {
                        e.preventDefault();
                        const targetElement = document.querySelector('#start-project') as HTMLElement;
                        if (targetElement && lenisRef.current) {
                          lenisRef.current.scrollTo(targetElement, {
                            offset: 0,
                            duration: 1.5,
                            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                          });
                        }
                      }
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -4,
                      rotateX: 5,
                      rotateY: 2,
                      boxShadow: '0 20px 40px rgba(255, 255, 255, 0.15)',
                      transition: { duration: 0.3, ease: 'easeOut' }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-full font-semibold text-sm md:text-base uppercase tracking-wider font-sans hover:bg-white/95 transition-all duration-300 shadow-lg relative"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <span>Book a Meeting</span>
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-black"
                      whileHover={{ 
                        x: 2,
                        rotate: 45,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <path
                        d="M5 15L15 5M15 5H5M15 5V15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Bottom Section - Copyright */}
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 pt-2">
              {/* Background accent */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] via-transparent to-white/[0.02] rounded-lg -mx-2 -my-1" />
              
              <motion.div
                className="relative flex items-center justify-center gap-2"
                whileHover={{ 
                  x: 4,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="w-1 h-1 rounded-full bg-white/30" />
                <p className="text-white/50 text-xs md:text-sm font-light font-sans tracking-wide">
                  © {new Date().getFullYear()} <span className="text-white/70 font-medium">OnChain Studio</span>
                </p>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-white/30 ml-2" />
                <p className="hidden sm:block text-white/40 text-xs md:text-sm font-light font-sans tracking-wide">
                  All rights reserved
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

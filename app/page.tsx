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
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-[0.25em] font-coolvetica uppercase cursor-pointer inline-block"
        >
          <LetterSwapPingPong
            label="ONCHAIN STUDIO"
            reverse={false}
            staggerFrom="center"
            className="font-coolvetica tracking-[0.15em] uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl"
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
              href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#start-project"}
              onClick={(e) => {
                if (process.env.NEXT_PUBLIC_CALENDLY_URL) {
                  e.preventDefault();
                  window.open(process.env.NEXT_PUBLIC_CALENDLY_URL, '_blank');
                }
              }}
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
      <section id="home" className="relative h-auto md:min-h-screen w-full overflow-hidden z-10">
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 1920px) and (max-width: 2099px) {
            .hero-title {
              font-size: 8.5rem !important;
            }
          }
          @media (min-width: 2100px) {
            .hero-title {
              font-size: 10rem !important;
            }
          }
          @media (min-width: 1200px) and (max-width: 1919px) {
            .hero-title {
              font-size: 7rem !important;
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
          @media (min-width: 1280px) and (max-width: 1599px) {
            .circular-text-hero {
              width: 180px !important;
              height: 180px !important;
            }
            .circular-text-hero span {
              font-size: 16px !important;
            }
          }
          @media (min-width: 1600px) {
            .circular-text-hero {
              width: 200px !important;
              height: 200px !important;
            }
            .circular-text-hero span {
              font-size: 18px !important;
            }
          }
        `}} />
        {/* Hero Content */}
        <div className="relative z-10 flex h-auto md:min-h-screen items-start md:items-center justify-start px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 pt-32 sm:pt-36 md:pt-0 pb-12 md:pb-0">
        <div className="w-full max-w-7xl">
          {/* Main Hero Text */}
          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] xl:text-[7rem] 2xl:text-[10rem] font-bold leading-[0.9] tracking-[-0.02em] text-white mb-8 sm:mb-10 md:mb-8 font-sans">
            <div className="block mb-2 sm:mb-3">BRINGING</div>
            <div className="block mb-2 sm:mb-3">THE CREATIVITY</div>
            <div className="block">ONCHAIN</div>
          </h1>

          {/* Mobile: Video below hero text */}
          <div className="md:hidden mt-8 sm:mt-10 mb-8 sm:mb-10 w-full">
            <div className="relative w-full aspect-video">
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

          {/* Mobile: Subtitle Text below video */}
          <div className="md:hidden mb-8 sm:mb-10">
            <p className="text-md sm:text-sm text-white/70 font-light leading-relaxed font-sans text-left">
              We specialize in blockchain technology,
              decentralized applications, and innovative
              digital solutions that push the boundaries
              of what's possible in the web3 space.
            </p>
          </div>

          {/* Desktop: Video - positioned at bottom right */}
          <div className="hidden md:block absolute bottom-8 lg:bottom-12 xl:bottom-16 right-8 lg:right-16 xl:right-24 z-10">
            <div className="relative w-64 h-40 md:w-80 md:h-52 lg:w-96 lg:h-64 xl:w-[28rem] xl:h-[18rem] 2xl:w-[40rem] 2xl:h-[25rem]">
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
            <p className="text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white/70 font-light leading-relaxed font-sans">
              We specialize in blockchain technology,<br />
              decentralized applications, and innovative<br />
              digital solutions that push the boundaries<br />
              of what's possible in the web3 space.
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

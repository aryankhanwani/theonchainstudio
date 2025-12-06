"use client"

import * as React from "react"
import { motion } from "framer-motion"
import CountUp from "@/components/CountUp"

interface Work {
  id: string
  type: 'video' | 'stat' | 'image'
  cardType?: 'portrait' | 'landscape' | 'square'
  videoUrl?: string
  img?: string
  height: number
  statData?: {
    label: string
    value: string
    info?: string
  }
}

interface WorksSectionProps {
  works: Work[]
}

const WorksSection: React.FC<WorksSectionProps> = ({ works }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  // Separate stats from other items
  const stats = works.filter(work => work.type === 'stat');
  const nonStatWorks = works.filter(work => work.type !== 'stat');

  // Convert non-stat works to masonry format
  const masonryItems = nonStatWorks.map(work => ({
    id: work.id,
    videoUrl: work.videoUrl,
    img: work.img,
    height: work.height,
    type: work.type,
    cardType: work.cardType,
    statData: work.statData,
    url: undefined
  }))

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Disconnect after first intersection to prevent re-triggering
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -100px 0px', // Start animation slightly before fully in view
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full pt-12 sm:pt-16 md:pt-20 lg:pt-32 pb-20 sm:pb-24 md:pb-28 lg:pb-36 xl:pb-40 overflow-x-hidden section-container">
      <style dangerouslySetInnerHTML={{__html: `
        /* Below 1500px - Stats on top, grid below */
        @media (max-width: 1499px) {
          .works-stats-grid-container {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.5rem !important;
          }
          .stat-column-container {
            width: 100% !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            margin-bottom: 0 !important;
            gap: 1rem !important;
          }
          .stat-card {
            flex: 1 !important;
            min-width: 0 !important;
            max-width: none !important;
          }
          .bento-grid-container {
            width: 100% !important;
          }
        }
        /* Responsive decorative element */
        @media (min-width: 1500px) {
          .works-title-decoration {
            display: block !important;
          }
        }
        @media (max-width: 1499px) {
          .works-title-decoration {
            display: none !important;
          }
        }
        /* Below 1600px - Smaller stats cards */
        @media (min-width: 1024px) and (max-width: 1199px) {
          .works-title {
            font-size: 1.5rem !important;
          }
          .stat-column-container {
            width: 100% !important;
            gap: 1rem !important;
          }
          .stat-card {
            min-width: 0 !important;
            min-height: 120px !important;
            flex: 1 1 0 !important;
            height: 120px !important;
          }
          .stat-card-inner {
            padding: 0.875rem !important;
          }
          .stat-value {
            font-size: 2.25rem !important;
            margin-bottom: 0.5rem !important;
          }
          .stat-label {
            font-size: 0.6875rem !important;
            margin-bottom: 0.3125rem !important;
          }
          .stat-info {
            font-size: 0.5625rem !important;
          }
        }
        @media (min-width: 1200px) and (max-width: 1499px) {
          .works-title {
            font-size: 1.625rem !important;
          }
          .stat-column-container {
            width: 100% !important;
            gap: 1.125rem !important;
          }
          .stat-card {
            min-width: 0 !important;
            min-height: 140px !important;
            flex: 1 1 0 !important;
            height: 140px !important;
          }
          .stat-card-inner {
            padding: 1rem !important;
          }
          .stat-value {
            font-size: 2.625rem !important;
            margin-bottom: 0.5625rem !important;
          }
          .stat-label {
            font-size: 0.75rem !important;
            margin-bottom: 0.375rem !important;
          }
          .stat-info {
            font-size: 0.625rem !important;
          }
        }
        @media (min-width: 1500px) and (max-width: 1599px) {
          .works-title {
            font-size: 1.75rem !important;
          }
          .stat-column-container {
            width: 200px !important;
            gap: 0.9375rem !important;
          }
          .stat-card {
            min-width: 95px !important;
            min-height: 135px !important;
          }
          .stat-card-inner {
            padding: 0.9375rem !important;
          }
          .stat-value {
            font-size: 2.5rem !important;
            margin-bottom: 0.4375rem !important;
          }
          .stat-label {
            font-size: 0.71875rem !important;
            margin-bottom: 0.3125rem !important;
          }
          .stat-info {
            font-size: 0.59375rem !important;
          }
        }
        @media (min-width: 1600px) and (max-width: 1699px) {
          .works-title {
            font-size: 1.75rem !important;
          }
          .stat-column-container {
            width: 220px !important;
            gap: 1rem !important;
          }
          .stat-card {
            min-width: 100px !important;
            min-height: 140px !important;
          }
          .stat-card-inner {
            padding: 1rem !important;
          }
          .stat-value {
            font-size: 2.75rem !important;
            margin-bottom: 0.5rem !important;
          }
          .stat-label {
            font-size: 0.75rem !important;
            margin-bottom: 0.375rem !important;
          }
          .stat-info {
            font-size: 0.625rem !important;
          }
        }
        @media (min-width: 1700px) and (max-width: 1919px) {
          .works-title {
            font-size: 2rem !important;
          }
          .stat-column-container {
            width: 250px !important;
            gap: 1.125rem !important;
          }
          .stat-card {
            min-width: 110px !important;
            min-height: 150px !important;
          }
          .stat-card-inner {
            padding: 1.125rem !important;
          }
          .stat-value {
            font-size: 3rem !important;
            margin-bottom: 0.5rem !important;
          }
          .stat-label {
            font-size: 0.8125rem !important;
            margin-bottom: 0.375rem !important;
          }
          .stat-info {
            font-size: 0.6875rem !important;
          }
        }
        @media (min-width: 1920px) and (max-width: 2099px) {
          .works-title {
            font-size: 2.125rem !important;
          }
          .stat-column-container {
            width: 280px !important;
            gap: 1.25rem !important;
          }
          .stat-card {
            min-width: 120px !important;
            min-height: 160px !important;
          }
          .stat-card-inner {
            padding: 1.25rem !important;
          }
          .stat-value {
            font-size: 3.25rem !important;
            margin-bottom: 0.625rem !important;
          }
          .stat-label {
            font-size: 0.875rem !important;
            margin-bottom: 0.5rem !important;
          }
          .stat-info {
            font-size: 0.75rem !important;
          }
        }
        @media (min-width: 2100px) and (max-width: 2399px) {
          .works-title {
            font-size: 2.25rem !important;
          }
          .stat-column-container {
            width: 300px !important;
            gap: 1.375rem !important;
          }
          .stat-card {
            min-width: 130px !important;
            min-height: 170px !important;
          }
          .stat-card-inner {
            padding: 1.375rem !important;
          }
          .stat-value {
            font-size: 3.5rem !important;
            margin-bottom: 0.625rem !important;
          }
          .stat-label {
            font-size: 0.9375rem !important;
            margin-bottom: 0.5rem !important;
          }
          .stat-info {
            font-size: 0.8125rem !important;
          }
        }
        @media (min-width: 2400px) {
          .works-title {
            font-size: 2.375rem !important;
          }
          .stat-column-container {
            width: 320px !important;
            gap: 1.5rem !important;
          }
          .stat-card {
            min-width: 140px !important;
            min-height: 180px !important;
          }
          .stat-card-inner {
            padding: 1.5rem !important;
          }
          .stat-value {
            font-size: 3.75rem !important;
            margin-bottom: 0.75rem !important;
          }
          .stat-label {
            font-size: 1rem !important;
            margin-bottom: 0.625rem !important;
          }
          .stat-info {
            font-size: 0.875rem !important;
          }
        }
      `}} />
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-start">
        {/* Left Side - Title */}
        <div className="px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 lg:sticky lg:top-0 order-1 self-start">
          <h2 className="works-title text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white font-sans tracking-tight uppercase mb-4 sm:mb-6">
            WORKS
          </h2>
          {/* Decorative element below title */}
          <div className="works-title-decoration hidden lg:block w-12 h-px bg-gradient-to-r from-white/40 via-white/20 to-transparent mt-2"></div>
          <div className="works-title-decoration hidden lg:block text-white/30 text-xs font-light font-sans uppercase tracking-widest mt-6 opacity-0 lg:opacity-100">
            PORTFOLIO
          </div>
        </div>

        {/* Right Side - Stats Column + Masonry Grid */}
        <div className="px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 order-2">
          <div className="works-stats-grid-container grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 lg:gap-6 xl:gap-8 items-start lg:items-stretch">
            {/* Stats Column - First Column */}
            {stats.length > 0 && (
              <div className="stat-column-container flex flex-row lg:flex-col gap-3 sm:gap-4 lg:gap-6 w-full lg:w-[200px] xl:w-[240px] 2xl:w-[360px] mb-4 lg:mb-0">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="stat-card relative flex-1 lg:flex-1 lg:w-full bg-black/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)]"
                    style={{
                      minWidth: '100px',
                      minHeight: '120px',
                    }}
                  >
                    {stat.statData && (
                      <div className="stat-card-inner absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-3 sm:p-4 md:p-5 overflow-hidden">
                        <div className="stat-value text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white font-sans mb-1 sm:mb-2 leading-none text-center break-words w-full px-2">
                          {(() => {
                            const match = stat.statData.value.match(/(\d+)(.*)/);
                            if (match) {
                              const numericValue = parseInt(match[1]);
                              const suffix = match[2] || '';
                              return (
                                <span className="inline-flex items-baseline justify-center">
                                  <CountUp
                                    from={0}
                                    to={numericValue}
                                    direction="up"
                                    duration={1}
                                    startWhen={isVisible}
                                    className="count-up-text"
                                  />
                                  {suffix}
                                </span>
                              );
                            }
                            return stat.statData.value;
                          })()}
                        </div>
                        <div className="stat-label text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg text-white/70 font-semibold font-sans uppercase tracking-wider mb-1 sm:mb-2 text-center px-2 leading-tight break-words w-full">
                          {stat.statData.label}
                        </div>
                        {stat.statData.info && (
                          <div className="stat-info text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-white/60 font-semibold font-sans text-center px-2 leading-tight break-words w-full">
                            {stat.statData.info}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Structured Grid - Remaining Columns */}
            <div className="bento-grid-container flex-1">
              <div 
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5"
                style={{
                  gridAutoRows: 'minmax(120px, auto)',
                }}
              >
                {masonryItems.map((item, index) => {
                  return (
                    <motion.div
                      key={item.id}
                      className={`relative rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)] cursor-pointer aspect-square md:aspect-auto ${
                        // Mobile: all items are square, 1 column span, 1 row span
                        // Desktop: use original spans based on cardType
                        item.cardType === 'landscape' ? 'col-span-1 row-span-1 md:col-span-2 md:row-span-2' : 
                        item.cardType === 'portrait' ? 'col-span-1 row-span-1 md:col-span-1 md:row-span-4' : 
                        'col-span-1 row-span-1'
                        }`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 0.98 }}
                    >
                      {item.videoUrl ? (
                        <>
                          <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                            style={{
                              transform: 'translateZ(0)',
                              willChange: 'auto',
                              backfaceVisibility: 'hidden',
                              WebkitBackfaceVisibility: 'hidden',
                            }}
                          >
                            <source src={item.videoUrl} type="video/mp4" />
                          </video>
                          <div className="absolute inset-0 bg-black/12"></div>
                        </>
                      ) : item.img ? (
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${item.img})`,
                            transform: 'translateZ(0)',
                            willChange: 'transform',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                          }}
                        />
                      ) : null}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { WorksSection }


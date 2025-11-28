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
    <div ref={sectionRef} className="w-full pt-12 sm:pt-16 md:pt-20 lg:pt-32 pb-20 sm:pb-24 md:pb-28 lg:pb-36 xl:pb-40 overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-start">
        {/* Left Side - Title */}
        <div className="px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 lg:sticky lg:top-0 order-1 self-start">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white font-sans tracking-tight uppercase">
            WORKS
          </h2>
        </div>

        {/* Right Side - Stats Column + Masonry Grid */}
        <div className="px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 order-2">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 lg:gap-6 xl:gap-8 items-start lg:items-stretch">
            {/* Stats Column - First Column */}
            {stats.length > 0 && (
              <div className="flex flex-row lg:flex-col gap-3 sm:gap-4 lg:gap-6 w-full lg:w-[200px] xl:w-[240px] 2xl:w-[360px] mb-4 lg:mb-0">
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="relative flex-1 lg:flex-1 lg:w-full bg-black/50 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)]"
                    style={{
                      minWidth: '100px',
                      minHeight: '120px',
                    }}
                  >
                    {stat.statData && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-3 sm:p-4 md:p-5 overflow-hidden">
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white font-sans mb-1 sm:mb-2 leading-none text-center break-words w-full px-2">
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
                        <div className="text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg text-white/70 font-semibold font-sans uppercase tracking-wider mb-1 sm:mb-2 text-center px-2 leading-tight break-words w-full">
                          {stat.statData.label}
                        </div>
                        {stat.statData.info && (
                          <div className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-white/60 font-semibold font-sans text-center px-2 leading-tight break-words w-full">
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
            <div className="flex-1">
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


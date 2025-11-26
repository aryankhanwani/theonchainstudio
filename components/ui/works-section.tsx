"use client"

import * as React from "react"
import Masonry from "./masonry"

interface Work {
  id: string
  type: 'video' | 'stat'
  cardType?: 'portrait' | 'landscape' | 'square'
  videoUrl?: string
  height: number
  statData?: {
    label: string
    value: string
  }
}

interface WorksSectionProps {
  works: Work[]
}

const WorksSection: React.FC<WorksSectionProps> = ({ works }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  // Convert works to masonry format
  const masonryItems = works.map(work => ({
    id: work.id,
    videoUrl: work.videoUrl,
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
    <div ref={sectionRef} className="w-full py-12 sm:py-16 md:py-20 lg:py-32 overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-start">
        {/* Left Side - Title */}
        <div className="px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 lg:sticky lg:top-0 order-1 self-start">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white font-sans tracking-tight uppercase">
            WORKS
          </h2>
        </div>

        {/* Right Side - Masonry Grid */}
        <div className="px-5 sm:px-6 md:px-8 lg:px-16 xl:px-24 order-2">
          <Masonry
            items={masonryItems}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.95}
            blurToFocus={true}
            stagger={0.08}
            duration={0.6}
            shouldAnimate={isVisible}
          />
        </div>
      </div>
    </div>
  )
}

export { WorksSection }


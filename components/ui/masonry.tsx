import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { gsap } from 'gsap';
import CountUp from '@/components/CountUp';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {

  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState<number>(get);

  useEffect(() => {

    const handler = () => setValue(get);

    queries.forEach(q => matchMedia(q).addEventListener('change', handler));

    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));

  }, [queries]);

  return value;

};

const useMeasure = <T extends HTMLElement>() => {

  const ref = useRef<T | null>(null);

  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {

    if (!ref.current) return;

    const ro = new ResizeObserver(([entry]) => {

      const { width, height } = entry.contentRect;

      setSize({ width, height });

    });

    ro.observe(ref.current);

    return () => ro.disconnect();

  }, []);

  return [ref, size] as const;

};

const preloadImages = async (urls: string[]): Promise<void> => {

  await Promise.all(

    urls.map(

      src =>

        new Promise<void>(resolve => {

          const img = new Image();

          img.src = src;

          img.onload = img.onerror = () => resolve();

        })

    )

  );

};

interface Item {

  id: string;

  img?: string;

  videoUrl?: string;

  url?: string;

  height: number;

  type?: 'video' | 'stat' | 'image';

  cardType?: 'portrait' | 'landscape' | 'square';

  statData?: {

    label: string;

    value: string;

    info?: string;

  };

}

interface GridItem extends Item {

  x: number;

  y: number;

  w: number;

  h: number;

  cardType?: 'portrait' | 'landscape' | 'square';

}

interface MasonryProps {

  items: Item[];

  ease?: string;

  duration?: number;

  stagger?: number;

  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';

  scaleOnHover?: boolean;

  hoverScale?: number;

  blurToFocus?: boolean;

  colorShiftOnHover?: boolean;

  shouldAnimate?: boolean;

}

const Masonry: React.FC<MasonryProps> = ({

  items,

  ease = 'power3.out',

  duration = 0.6,

  stagger = 0.05,

  animateFrom = 'bottom',

  scaleOnHover = true,

  hoverScale = 0.95,

  blurToFocus = true,

  colorShiftOnHover = false,

  shouldAnimate = true

}) => {

  const columns = useMedia(

    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],

    [4, 3, 2, 2],

    2

  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();

  const [imagesReady, setImagesReady] = useState(false);

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const getInitialPosition = (item: GridItem) => {

    const containerRect = containerRef.current?.getBoundingClientRect();

    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === 'random') {

      const dirs = ['top', 'bottom', 'left', 'right'];

      direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;

    }

    switch (direction) {

      case 'top':

        return { x: item.x, y: -200 };

      case 'bottom':

        return { x: item.x, y: window.innerHeight + 200 };

      case 'left':

        return { x: -200, y: item.y };

      case 'right':

        return { x: window.innerWidth + 200, y: item.y };

      case 'center':

        return {

          x: containerRect.width / 2 - item.w / 2,

          y: containerRect.height / 2 - item.h / 2

        };

      default:

        return { x: item.x, y: item.y + 100 };

    }

  };

  useEffect(() => {

    const imageUrls = items.filter(i => i.img).map(i => i.img!);

    if (imageUrls.length > 0) {

      preloadImages(imageUrls).then(() => setImagesReady(true));

    } else {

      setImagesReady(true);

    }

  }, [items]);

  const grid = useMemo<GridItem[]>(() => {

    if (!width) return [];

    const colHeights = new Array(columns).fill(0);

    // Smaller gap on mobile
    const gap = columns <= 2 ? 12 : 16;

    const totalGaps = (columns - 1) * gap;

    const columnWidth = (width - totalGaps) / columns;

    // Mobile scale factor for smaller cards
    const isMobile = columns <= 2;
    const mobileScale = isMobile ? 0.85 : 1;

    return items.map(child => {

      const col = colHeights.indexOf(Math.min(...colHeights));

      const x = col * (columnWidth + gap);

      // Calculate height based on card type with mobile scaling
      let height = child.height;
      if (child.cardType === 'portrait') {
        // Portrait: 9:16 aspect ratio (vertical video) - reduced size
        height = columnWidth * (16 / 9) * 0.75 * mobileScale;
      } else if (child.cardType === 'landscape') {
        // Landscape: 16:9 aspect ratio (horizontal video)
        height = columnWidth * (9 / 16) * mobileScale;
      } else if (child.cardType === 'square') {
        // Square: small squares (smaller on mobile)
        height = columnWidth * (isMobile ? 0.5 : 0.6);
      } else {
        // Default: use provided height
        height = child.height / 2;
      }

      const y = colHeights[col];

      colHeights[col] += height + gap;

      return { ...child, x, y, w: columnWidth, h: height };

    });

  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {

    if (!imagesReady) return;

    if (!shouldAnimate && !hasMounted.current) {
      // Set initial positions without animation if shouldAnimate is false
      grid.forEach((item) => {
        const selector = `[data-key="${item.id}"]`;
        gsap.set(selector, {
          opacity: 0,
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
        });
      });
      return;
    }

    grid.forEach((item, index) => {

      const selector = `[data-key="${item.id}"]`;

      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current && shouldAnimate) {

        const start = getInitialPosition(item);

        gsap.fromTo(

          selector,

          {

            opacity: 0,

            x: start.x,

            y: start.y,

            width: item.w,

            height: item.h,

            ...(blurToFocus && { filter: 'blur(10px)' })

          },

          {

            opacity: 1,

            ...animProps,

            ...(blurToFocus && { filter: 'blur(0px)' }),

            duration: 0.8,

            ease: 'power3.out',

            delay: index * stagger,

            force3D: true,

            transformOrigin: 'center center'

          }

        );

      } else if (hasMounted.current) {

        gsap.to(selector, {

          ...animProps,

          duration,

          ease,

          overwrite: 'auto'

        });

      }

    });

    if (shouldAnimate) {
      hasMounted.current = true;
    }

  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease, shouldAnimate]);

  // Trigger animation when shouldAnimate becomes true
  useEffect(() => {
    if (shouldAnimate && imagesReady && grid.length > 0 && !hasMounted.current) {
      grid.forEach((item, index) => {
        const selector = `[data-key="${item.id}"]`;
        const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };
        const start = getInitialPosition(item);

        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' })
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger
          }
        );
      });
      hasMounted.current = true;
    }
  }, [shouldAnimate, imagesReady, grid, stagger, animateFrom, blurToFocus]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {

    if (scaleOnHover) {

      gsap.to(`[data-key="${id}"]`, {

        scale: hoverScale,

        duration: 0.3,

        ease: 'power2.out'

      });

    }

    if (colorShiftOnHover) {

      const overlay = element.querySelector('.color-overlay') as HTMLElement;

      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });

    }

  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {

    if (scaleOnHover) {

      gsap.to(`[data-key="${id}"]`, {

        scale: 1,

        duration: 0.3,

        ease: 'power2.out'

      });

    }

    if (colorShiftOnHover) {

      const overlay = element.querySelector('.color-overlay') as HTMLElement;

      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });

    }

  };

  return (

    <div ref={containerRef} className="relative w-full" style={{ minHeight: '100vh' }}>

      {grid.map(item => (

        <div

          key={item.id}

          data-key={item.id}

          className="absolute box-content cursor-pointer"

          style={{ willChange: 'transform, width, height, opacity' }}

          onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}

          onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}

          onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}

        >

          <div

            className="relative w-full h-full bg-cover bg-center rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)]"

            style={{
              ...(item.img ? { backgroundImage: `url(${item.img})` } : {}),
              transform: 'translateZ(0)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}

          >

            {item.type === 'stat' && item.statData ? (

              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-2 sm:p-3 md:p-4">

                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-semibold text-white font-sans mb-1 sm:mb-2">
                  {(() => {
                    // Extract numeric value and suffix from stat value (e.g., "50+" -> 50, "+")
                    const match = item.statData.value.match(/(\d+)(.*)/);
                    if (match) {
                      const numericValue = parseInt(match[1]);
                      const suffix = match[2] || '';
                      return (
                        <>
                          <CountUp
                            from={0}
                            to={numericValue}
                            direction="up"
                            duration={1}
                            startWhen={shouldAnimate}
                            className="count-up-text"
                          />
                          {suffix}
                        </>
                      );
                    }
                    return item.statData.value;
                  })()}
                </div>

                <div className="text-xs sm:text-sm md:text-base lg:text-lg text-white/70 font-semibold font-sans uppercase tracking-wider mb-1 sm:mb-2">

                  {item.statData.label}

                </div>

                {item.statData.info && (

                  <div className="text-[10px] sm:text-xs md:text-sm text-white/60 font-semibold font-sans text-center px-1 sm:px-2">

                    {item.statData.info}

                  </div>

                )}

              </div>

            ) : item.videoUrl ? (

              <>

                <video

                  ref={(el) => {

                    if (el) {

                      videoRefs.current[item.id] = el;

                      // Autoplay video by default

                      el.play().catch(() => {});

                    }

                  }}

                  src={item.videoUrl}

                  className="w-full h-full object-cover"

                  muted

                  loop

                  playsInline

                  autoPlay

                  style={{

                    transform: 'translateZ(0)',

                    willChange: 'auto',

                    backfaceVisibility: 'hidden',

                    WebkitBackfaceVisibility: 'hidden',

                  }}

                />

                {/* Black overlay with opacity */}
                <div className="absolute inset-0 bg-black/12"></div>

              </>

            ) : null}

            {colorShiftOnHover && (

              <div className="color-overlay absolute inset-0 rounded-xl bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />

            )}

          </div>

        </div>

      ))}

    </div>

  );

};

export default Masonry;


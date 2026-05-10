"use client";

import { useRef, useEffect, useMemo, useId } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import './StickerPeel.css';

gsap.registerPlugin(Draggable);

interface StickerPeelProps {
  imageSrc: string;
  rotate?: number;
  peelBackHoverPct?: number;
  peelBackActivePct?: number;
  peelEasing?: string;
  peelHoverEasing?: string;
  width?: number;
  shadowIntensity?: number;
  lightingIntensity?: number;
  initialPosition?: 'center' | { x: number; y: number };
  peelDirection?: number;
  className?: string;
  /** When true the sticker is fixed to the viewport and draggable across the whole page */
  fixed?: boolean;
}

const StickerPeel: React.FC<StickerPeelProps> = ({
  imageSrc,
  rotate = 30,
  peelBackHoverPct = 30,
  peelBackActivePct = 40,
  peelEasing = 'power3.out',
  peelHoverEasing = 'power2.out',
  width = 200,
  shadowIntensity = 0.6,
  lightingIntensity = 0.1,
  initialPosition = 'center',
  peelDirection = 0,
  className = '',
  fixed = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragTargetRef = useRef<HTMLDivElement>(null);
  const pointLightRef = useRef<SVGFEPointLightElement>(null);
  const pointLightFlippedRef = useRef<SVGFEPointLightElement>(null);
  const draggableInstanceRef = useRef<Draggable | null>(null);

  // Unique per-instance filter IDs — prevents conflicts when rendering multiple stickers
  const raw = useId().replace(/:/g, '');
  const plId   = `pl-${raw}`;
  const plfId  = `plf-${raw}`;
  const dsId   = `ds-${raw}`;
  const efId   = `ef-${raw}`;

  const defaultPadding = 10;

  // Apply initial position
  useEffect(() => {
    const target = dragTargetRef.current;
    if (!target || initialPosition === 'center') return;
    if (typeof initialPosition === 'object') {
      gsap.set(target, { x: initialPosition.x, y: initialPosition.y });
    }
  }, [initialPosition]);

  // Set up GSAP Draggable
  useEffect(() => {
    const target = dragTargetRef.current;
    if (!target) return;

    const bounds = fixed
      ? { minX: 0, minY: 0, maxX: window.innerWidth - width, maxY: window.innerHeight - width }
      : target.parentNode as HTMLElement;

    draggableInstanceRef.current = Draggable.create(target, {
      type: 'x,y',
      bounds,
      inertia: true,
      onDrag(this: Draggable) {
        const rot = gsap.utils.clamp(-24, 24, this.deltaX * 0.4);
        gsap.to(target, { rotation: rot, duration: 0.15, ease: 'power1.out' });
      },
      onDragEnd() {
        gsap.to(target, { rotation: 0, duration: 0.8, ease: 'power2.out' });
      },
    })[0];

    const handleResize = () => {
      if (!draggableInstanceRef.current) return;
      if (fixed) {
        draggableInstanceRef.current.applyBounds({
          minX: 0, minY: 0,
          maxX: window.innerWidth - width,
          maxY: window.innerHeight - width,
        });
      }
      draggableInstanceRef.current.update();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      draggableInstanceRef.current?.kill();
    };
  }, [fixed, width]);

  // Track mouse for SVG lighting
  useEffect(() => {
    const updateLight = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (pointLightRef.current) gsap.set(pointLightRef.current, { attr: { x, y } });
      const normalizedAngle = Math.abs(peelDirection % 360);
      if (pointLightFlippedRef.current) {
        if (normalizedAngle !== 180) {
          gsap.set(pointLightFlippedRef.current, { attr: { x, y: rect.height - y } });
        } else {
          gsap.set(pointLightFlippedRef.current, { attr: { x: -1000, y: -1000 } });
        }
      }
    };
    const container = containerRef.current;
    container?.addEventListener('mousemove', updateLight);
    return () => container?.removeEventListener('mousemove', updateLight);
  }, [peelDirection]);

  // Scroll compensation — cancel out page scroll so fixed stickers don't drift
  useEffect(() => {
    if (!fixed) return;

    let lastScrollY = window.scrollY;
    let lastScrollX = window.scrollX;

    const onScroll = () => {
      const target = dragTargetRef.current;
      if (!target) return;

      const dY = window.scrollY - lastScrollY;
      const dX = window.scrollX - lastScrollX;

      const currentX = gsap.getProperty(target, 'x') as number;
      const currentY = gsap.getProperty(target, 'y') as number;

      gsap.set(target, {
        x: currentX - dX,
        y: currentY - dY,
      });

      lastScrollY = window.scrollY;
      lastScrollX = window.scrollX;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [fixed]);

  // Touch active class for mobile peel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const add = () => container.classList.add('touch-active');
    const remove = () => container.classList.remove('touch-active');
    container.addEventListener('touchstart', add);
    container.addEventListener('touchend', remove);
    container.addEventListener('touchcancel', remove);
    return () => {
      container.removeEventListener('touchstart', add);
      container.removeEventListener('touchend', remove);
      container.removeEventListener('touchcancel', remove);
    };
  }, []);

  const cssVars = useMemo(() => ({
    '--sticker-rotate': `${rotate}deg`,
    '--sticker-p': `${defaultPadding}px`,
    '--sticker-peelback-hover': `${peelBackHoverPct}%`,
    '--sticker-peelback-active': `${peelBackActivePct}%`,
    '--sticker-peel-easing': peelEasing,
    '--sticker-peel-hover-easing': peelHoverEasing,
    '--sticker-width': `${width}px`,
    '--sticker-shadow-opacity': shadowIntensity,
    '--sticker-lighting-constant': lightingIntensity,
    '--peel-direction': `${peelDirection}deg`,
  } as React.CSSProperties), [rotate, peelBackHoverPct, peelBackActivePct, peelEasing, peelHoverEasing, width, shadowIntensity, lightingIntensity, peelDirection]);

  return (
    <div
      className={`draggable ${fixed ? 'draggable-fixed' : ''} ${className}`}
      ref={dragTargetRef}
      style={cssVars}
    >
      <svg width="0" height="0">
        <defs>
          <filter id={plId}>
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feSpecularLighting result="spec" in="blur" specularExponent="100" specularConstant={lightingIntensity} lightingColor="white">
              <fePointLight ref={pointLightRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>
          <filter id={plfId}>
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feSpecularLighting result="spec" in="blur" specularExponent="100" specularConstant={lightingIntensity * 7} lightingColor="white">
              <fePointLight ref={pointLightFlippedRef} x="100" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>
          <filter id={dsId}>
            <feDropShadow dx="2" dy="4" stdDeviation={3 * shadowIntensity} floodColor="black" floodOpacity={shadowIntensity} />
          </filter>
          <filter id={efId}>
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />
            <feFlood floodColor="rgb(179,179,179)" result="flood" />
            <feComposite operator="in" in="flood" in2="shape" />
          </filter>
        </defs>
      </svg>

      <div
        className="sticker-container"
        ref={containerRef}
        onMouseEnter={() => containerRef.current?.classList.add('touch-active')}
        onMouseLeave={() => containerRef.current?.classList.remove('touch-active')}
      >
        <div className="sticker-main" style={{ filter: `url(#${dsId})` }}>
          <div className="sticker-lighting" style={{ filter: `url(#${plId})` }}>
            <img src={imageSrc} alt="" className="sticker-image" draggable="false" onContextMenu={e => e.preventDefault()} />
          </div>
        </div>
        <div className="flap">
          <div className="flap-lighting" style={{ filter: `url(#${plfId})` }}>
            <img src={imageSrc} alt="" className="flap-image" draggable="false" onContextMenu={e => e.preventDefault()} style={{ filter: `url(#${efId})` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickerPeel;

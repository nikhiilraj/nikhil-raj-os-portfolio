'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const SPLINE_URL = 'https://prod.spline.design/s55GCKEHaPp-hlNV/scene.splinecode';

export default function SplineRobot() {
  const [loaded, setLoaded] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const [SplineComp, setSplineComp] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only render on wide screens
  useEffect(() => {
    const check = () => setIsWide(window.innerWidth >= 900);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Lazy load Spline only when wide screen
  useEffect(() => {
    if (!isWide) return;
    import('@splinetool/react-spline').then((mod) => {
      setSplineComp(() => mod.default);
    });
  }, [isWide]);

  const handleLoad = useCallback((splineApp: any) => {
    // Hide the Spline watermark
    setTimeout(() => {
      // The watermark is rendered as an <a> tag with the Spline logo
      // inside the container. Find it and hide it.
      if (containerRef.current) {
        const logos = containerRef.current.querySelectorAll('a[href*="spline"]');
        logos.forEach((el: Element) => {
          (el as HTMLElement).style.display = 'none';
        });
        // Also check for any img/svg with spline branding
        const allLinks = containerRef.current.querySelectorAll('a');
        allLinks.forEach((el: Element) => {
          const href = el.getAttribute('href') || '';
          if (href.includes('spline')) {
            (el as HTMLElement).style.display = 'none';
          }
        });
      }
      // Also try shadow DOM approach
      const viewer = containerRef.current?.querySelector('spline-viewer');
      if (viewer?.shadowRoot) {
        const logo =
          (viewer.shadowRoot.querySelector('#logo') as HTMLElement | null) ??
          (viewer.shadowRoot.querySelector('a[href*="spline.design"]') as HTMLElement | null);
        if (logo) logo.style.display = 'none';
      }
      setLoaded(true);
    }, 300);
  }, []);

  if (!isWide) return null;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: 30, scale: 0.92 }}
      animate={{
        opacity: loaded ? 1 : 0,
        x: loaded ? 0 : 30,
        scale: loaded ? 1 : 0.92,
      }}
      transition={{ duration: 1.2, ease: EASE }}
      style={{
        width: 300,
        height: 396,
        position: 'relative',
        flexShrink: 0,
        // Prevent the Spline canvas from capturing all pointer events
        // while still allowing the robot to respond to mouse
      }}
    >
      {/* Ambient glow — very subtle, amber-tinted */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '45%',
          left: '45%',
          transform: 'translate(-50%, -50%)',
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230,169,62,0.05) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Floor reflection — a subtle elliptical gradient at the bottom */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 140,
          height: 20,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(230,169,62,0.06) 0%, transparent 70%)',
          filter: 'blur(8px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Spline canvas — clipped to hide watermark */}
      {SplineComp && (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            // Clip 36px from the bottom where the watermark sits
            clipPath: 'inset(0 0 36px 0)',
          }}
        >
          <div style={{ width: '100%', height: 'calc(100% + 36px)' }}>
            <SplineComp
              scene={SPLINE_URL}
              onLoad={handleLoad}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

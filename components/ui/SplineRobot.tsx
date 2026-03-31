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

  const handleLoad = useCallback(() => {
    // Small delay to ensure scene is fully rendered before revealing
    setTimeout(() => setLoaded(true), 200);
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
        height: 360,
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

      {/* Spline canvas */}
      {SplineComp && (
        <SplineComp
          scene={SPLINE_URL}
          onLoad={handleLoad}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 1,
          }}
        />
      )}
    </motion.div>
  );
}

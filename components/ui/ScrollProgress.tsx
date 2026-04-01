'use client';
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setScrollContainer(document.getElementById('main-content'));
  }, []);

  const { scrollYProgress } = useScroll({
    container: scrollContainer ? { current: scrollContainer } : undefined,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 40,
        left: 0,
        right: 0,
        height: 2,
        background: 'var(--accent)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 9001,
        opacity: 0.6,
        pointerEvents: 'none',
      }}
    />
  );
}

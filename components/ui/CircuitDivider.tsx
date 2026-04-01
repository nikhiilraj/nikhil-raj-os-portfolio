'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CircuitDivider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <div ref={ref} style={{ width: '100%', height: 24, position: 'relative', overflow: 'hidden' }}>
      <svg
        viewBox="0 0 1000 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,12 L200,12 L210,4 L230,4 L240,12 L500,12 L510,20 L530,20 L540,12 L700,12 L710,4 L720,4 L730,12 L1000,12"
          stroke="var(--accent)"
          strokeWidth="1"
          strokeOpacity="0.2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Small dots at branch points */}
        {[210, 510, 710].map((cx, i) => (
          <motion.circle
            key={cx}
            cx={cx}
            cy={cx === 510 ? 20 : 4}
            r="2"
            fill="var(--accent)"
            fillOpacity="0.3"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.3 }}
          />
        ))}
      </svg>
    </div>
  );
}

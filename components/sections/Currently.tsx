'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import CircuitDivider from '@/components/ui/CircuitDivider';
import { playSectionTransition } from '@/lib/sounds';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ROWS = [
  { label: 'Building', value: 'A design system for indie devs' },
  { label: 'Learning', value: 'Rust and WebAssembly' },
  { label: 'Reading', value: 'Designing Data-Intensive Applications' },
];

export default function Currently() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  import('react').then((React) => {
    React.useEffect(() => {
      if (inView) playSectionTransition();
    }, [inView]);
  });

  return (
    <section
      ref={ref}
      style={{
        maxWidth: 700,
        margin: '0 auto',
        padding: '0 24px 80px',
      }}
    >
      {/* ── Circuit trace divider ─────────────────────────────── */}
      <CircuitDivider />

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ marginBottom: 36 }}
      >
        <span className="section-label">Currently</span>
      </motion.div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {ROWS.map((row, i) => (
          <CurrentRow key={row.label} row={row} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}

function CurrentRow({
  row,
  index,
  inView,
}: {
  row: { label: string; value: string };
  index: number;
  inView: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.3, 0.8, 1, 0.8, 0.3]);

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: EASE }}
      style={{
        display: 'grid',
        gridTemplateColumns: '140px 1fr',
        alignItems: 'baseline',
        gap: 24,
        padding: '16px 0',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        opacity,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-tertiary)',
        }}
      >
        {row.label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.9rem',
          fontWeight: 500,
          color: 'var(--text-primary)',
        }}
      >
        {row.value}
      </span>
    </motion.div>
  );
}

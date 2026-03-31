'use client';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useStore, AppId } from '@/lib/store';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const APPS: { id: AppId; label: string; emoji: string }[] = [
  { id: 'about',    label: 'About Me',  emoji: '👤' },
  { id: 'projects', label: 'Projects',  emoji: '🗂️' },
  { id: 'skills',   label: 'Skills',    emoji: '⚡' },
  { id: 'resume',   label: 'Resume',    emoji: '📄' },
  { id: 'contact',  label: 'Messages',  emoji: '💬' },
];

function DockIcon({
  app,
  mouseX,
}: {
  app: (typeof APPS)[0];
  mouseX: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const openWindow = useStore((s) => s.openWindow);
  const isOpen = useStore(
    (s) => s.windows[app.id].isOpen && !s.windows[app.id].isMinimized,
  );

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    return val - (bounds.left + bounds.width / 2);
  });

  // Base 44px → peak 53px (≈1.2×), neighbor at ~60px ≈1.07×
  const size = useTransform(distance, [-100, 0, 100], [44, 53, 44]);
  const sizeSpring = useSpring(size, { stiffness: 320, damping: 26 });

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center no-select"
      style={{ cursor: 'default' }}
      onClick={() => openWindow(app.id)}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
    >
      {/* Tooltip */}
      <motion.span
        initial={false}
        animate={tooltipVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: '100%',
          marginBottom: 8,
          whiteSpace: 'nowrap',
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-primary)',
          background: 'rgba(17,17,20,0.95)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 6,
          padding: '3px 8px',
          pointerEvents: 'none',
        }}
      >
        {app.label}
      </motion.span>

      {/* Icon */}
      <motion.div
        style={{ width: sizeSpring, height: sizeSpring }}
        whileTap={{ scale: 0.88 }}
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className="relative rounded-[14px] flex items-center justify-center"
      >
        <div
          className="absolute inset-0 rounded-[14px]"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.09)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        />
        <span className="relative text-2xl select-none">{app.emoji}</span>
      </motion.div>

      {/* Active indicator — amber dot */}
      <div
        style={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          marginTop: 3,
          background: isOpen ? 'var(--accent)' : 'transparent',
          transition: 'background 0.2s ease',
          flexShrink: 0,
        }}
      />
    </motion.div>
  );
}

export default function Dock() {
  const mouseX = useMotionValue<number>(Infinity);

  return (
    <motion.div
      className="fixed bottom-3 left-1/2 -translate-x-1/2 flex items-end gap-2 px-4 py-2 no-select"
      style={{
        zIndex: 9000,
        borderRadius: 16,
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.0, duration: 0.7, ease: EASE }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {APPS.map((app) => (
        <DockIcon key={app.id} app={app} mouseX={mouseX} />
      ))}
    </motion.div>
  );
}

'use client';
import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useStore, AppId } from '@/lib/store';

const APPS: { id: AppId; label: string; emoji: string; color: string }[] = [
  { id: 'about',    label: 'About Me',  emoji: '👤', color: '#7c6aff' },
  { id: 'projects', label: 'Projects',  emoji: '🗂️', color: '#3dd6f5' },
  { id: 'skills',   label: 'Skills',    emoji: '⚡', color: '#f472b6' },
  { id: 'resume',   label: 'Resume',    emoji: '📄', color: '#a78bfa' },
  { id: 'contact',  label: 'Messages',  emoji: '💬', color: '#34d399' },
];

function DockIcon({ app, mouseX }: { app: typeof APPS[0]; mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const openWindow = useStore((s) => s.openWindow);
  const isOpen = useStore((s) => s.windows[app.id].isOpen && !s.windows[app.id].isMinimized);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    return val - (bounds.left + bounds.width / 2);
  });

  const size = useTransform(distance, [-100, 0, 100], [44, 62, 44]);
  const sizeSpring = useSpring(size, { stiffness: 300, damping: 25 });

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center gap-1 cursor-pointer group"
      onClick={() => openWindow(app.id)}
    >
      <motion.div
        style={{ width: sizeSpring, height: sizeSpring }}
        className="relative rounded-[14px] flex items-center justify-center text-2xl transition-all duration-75"
        whileTap={{ scale: 0.9 }}
        whileHover={{ y: -4 }}
      >
        {/* Glass icon bg */}
        <div
          className="absolute inset-0 rounded-[14px] transition-all"
          style={{
            background: `linear-gradient(135deg, ${app.color}20, ${app.color}08)`,
            border: `1px solid ${app.color}30`,
            backdropFilter: 'blur(8px)',
          }}
        />
        <span className="relative text-2xl select-none">{app.emoji}</span>
      </motion.div>

      {/* Label tooltip */}
      <span
        className="absolute -top-8 text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
        style={{
          background: 'rgba(10,25,47,0.95)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {app.label}
      </span>

      {/* Open indicator dot */}
      <div
        className="w-1 h-1 rounded-full transition-all duration-200"
        style={{ background: isOpen ? app.color : 'transparent' }}
      />
    </motion.div>
  );
}

export default function Dock() {
  const mouseX = useMotionValue<number>(Infinity);

  return (
    <div
      className="fixed bottom-3 left-1/2 -translate-x-1/2 flex items-end gap-2 px-4 py-2 rounded-2xl no-select"
      style={{
        zIndex: 9000,
        background: 'linear-gradient(135deg, rgba(124,106,255,0.08), rgba(6,7,20,0.82))',
        backdropFilter: 'blur(36px)',
        WebkitBackdropFilter: 'blur(36px)',
        border: '1px solid rgba(124,106,255,0.15)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {APPS.map((app) => (
        <DockIcon key={app.id} app={app} mouseX={mouseX} />
      ))}
    </div>
  );
}

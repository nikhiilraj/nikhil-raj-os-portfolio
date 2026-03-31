'use client';
import { useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, AppId } from '@/lib/store';
import TrafficLights from '@/components/ui/TrafficLights';

type Props = {
  id: AppId;
  title: string;
  icon: ReactNode;
  children: ReactNode;
  minWidth?: number;
  minHeight?: number;
};

export default function Window({ id, title, icon, children, minWidth = 360, minHeight = 300 }: Props) {
  const win = useStore((s) => s.windows[id]);
  const topZ = useStore((s) => s.topZ);
  const bringToFront = useStore((s) => s.bringToFront);
  const setPosition = useStore((s) => s.setPosition);
  const isActive = win.zIndex === topZ;
  const constraintsRef = useRef<HTMLDivElement>(null);

  if (!win.isOpen || win.isMinimized) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 12, scale: 0.97 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        drag
        dragMomentum={false}
        dragElastic={0}
        onDragEnd={(_, info) => {
          setPosition(id, {
            x: win.position.x + info.offset.x,
            y: win.position.y + info.offset.y,
          });
        }}
        onMouseDown={() => bringToFront(id)}
        style={{
          position: 'fixed',
          left: `clamp(8px, ${win.position.x}px, calc(100vw - 8px - min(${win.size.width}px, calc(100vw - 16px))))`,
          top: `clamp(48px, ${win.position.y}px, calc(100vh - 8px - min(${win.size.height}px, calc(100vh - 80px))))`,
          width: `min(${win.size.width}px, calc(100vw - 16px))`,
          height: `min(${win.size.height}px, calc(100vh - 80px))`,
          zIndex: win.zIndex,
          minWidth: `min(${minWidth}px, calc(100vw - 16px))`,
          minHeight: `min(${minHeight}px, calc(100vh - 80px))`,
        }}
        className="rounded-[12px] overflow-hidden flex flex-col no-select"
        whileDrag={{ scale: 1.01 }}
      >
        {/* Glass background */}
        <div
          className="absolute inset-0 rounded-[12px]"
          style={{
            background: 'rgba(12,13,18,0.9)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            border: isActive
              ? '1px solid rgba(230,169,62,0.15)'
              : '1px solid rgba(255,255,255,0.08)',
            boxShadow: isActive
              ? '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(230,169,62,0.08)'
              : '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
          }}
        />

        {/* Refraction edge */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
            pointerEvents: 'none',
            zIndex: 1,
            borderRadius: '12px 12px 0 0',
          }}
        />

        {/* Title bar */}
        <div
          className="relative flex items-center gap-3 px-4 py-3 cursor-move"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <TrafficLights id={id} />
          <div className="flex items-center gap-2 ml-2">
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'var(--text-secondary)',
              }}
            >
              {icon}
            </span>
            <span
              className="text-xs font-medium"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
            >
              {title}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex-1 overflow-hidden">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

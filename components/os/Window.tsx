'use client';
import { useRef, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, AppId } from '@/lib/store';
import TrafficLights from '@/components/ui/TrafficLights';

type Props = {
  id: AppId;
  title: string;
  icon: string;
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
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
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
          left: win.position.x,
          top: win.position.y,
          width: win.size.width,
          height: win.size.height,
          zIndex: win.zIndex,
          minWidth,
          minHeight,
        }}
        className="rounded-[12px] overflow-hidden flex flex-col shadow-2xl no-select"
        whileDrag={{ scale: 1.01 }}
      >
        {/* Glass background */}
        <div
          className="absolute inset-0 rounded-[12px]"
          style={{
            background: 'rgba(6, 7, 20, 0.82)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            border: isActive
              ? '1px solid rgba(124,106,255,0.28)'
              : '1px solid rgba(255,255,255,0.08)',
            boxShadow: isActive
              ? '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(124,106,255,0.12)'
              : '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
          }}
        />

        {/* Title bar */}
        <div
          className="relative flex items-center gap-3 px-4 py-3 cursor-move"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <TrafficLights id={id} />
          <div className="flex items-center gap-2 ml-2">
            <span className="text-base leading-none">{icon}</span>
            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
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

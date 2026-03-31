'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bio } from '@/lib/data';
import { useStore, AppId } from '@/lib/store';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const APP_IDS: AppId[] = ['about', 'projects', 'skills', 'resume', 'contact'];

const MENUS: Record<string, { label: string; shortcut?: string; action?: string }[]> = {
  File: [
    { label: 'New Window',   shortcut: '⌘N', action: 'random' },
    { label: 'Open…',        shortcut: '⌘O' },
    { label: '──────────' },
    { label: 'Close Window', shortcut: '⌘W', action: 'close' },
  ],
  View: [
    { label: 'Show Desktop',   shortcut: '⌘D', action: 'desktop' },
    { label: 'Toggle Menubar', shortcut: '⌥⌘M' },
  ],
  Window: [
    { label: 'About Me',  action: 'about'    },
    { label: 'Projects',  action: 'projects' },
    { label: 'Skills',    action: 'skills'   },
    { label: 'Resume',    action: 'resume'   },
    { label: 'Messages',  action: 'contact'  },
  ],
  Help: [
    { label: 'View Source on GitHub' },
    { label: '──────────' },
    { label: 'About Nikhil.OS' },
  ],
};

export default function Menubar() {
  const [time, setTime]           = useState('');
  const [date, setDate]           = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef  = useRef<HTMLDivElement>(null);
  const openWindow = useStore((s) => s.openWindow);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!activeMenu) return;
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [activeMenu]);

  const handleMenuAction = (action?: string) => {
    setActiveMenu(null);
    if (!action) return;
    if (action === 'random') {
      openWindow(APP_IDS[Math.floor(Math.random() * APP_IDS.length)]);
    } else if (action === 'desktop') {
      // do nothing
    } else if (APP_IDS.includes(action as AppId)) {
      openWindow(action as AppId);
    }
  };

  return (
    <motion.div
      ref={menuRef}
      className="fixed top-0 left-0 right-0 h-10 flex items-center justify-between px-4 no-select"
      style={{
        zIndex: 9000,
        background: 'rgba(9,9,11,0.88)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0, duration: 0.5, ease: EASE }}
    >
      {/* ── LEFT: Logo + status ────────────────────────────── */}
      <div className="flex items-center gap-3">
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
          style={{ color: 'var(--accent)', opacity: 0.85 }}
        >
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Nikhil.OS
        </span>

      </div>

      {/* ── CENTER: Menus ──────────────────────────────────── */}
      <div className="flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
        {Object.keys(MENUS).map((menu) => (
          <div key={menu} className="relative">
            <button
              type="button"
              onClick={() => setActiveMenu(activeMenu === menu ? null : menu)}
              className="px-3 py-1 rounded-md text-xs transition-colors duration-100"
              style={{
                color: activeMenu === menu ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: activeMenu === menu ? 'rgba(255,255,255,0.07)' : 'transparent',
                fontFamily: 'var(--font-sans)',
                cursor: 'default',
              }}
            >
              {menu}
            </button>

            <AnimatePresence>
              {activeMenu === menu && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                  className="absolute top-full left-0 mt-1 py-1 rounded-xl min-w-[180px]"
                  style={{
                    background: 'rgba(14,14,17,0.97)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
                    zIndex: 10000,
                  }}
                >
                  {MENUS[menu].map((item, i) =>
                    item.label.startsWith('──') ? (
                      <div
                        key={i}
                        style={{
                          height: 1,
                          background: 'rgba(255,255,255,0.06)',
                          margin: '4px 8px',
                        }}
                      />
                    ) : (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleMenuAction(item.action)}
                        className="w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg mx-1 transition-colors"
                        style={{
                          color: 'var(--text-primary)',
                          background: 'transparent',
                          cursor: 'default',
                          width: 'calc(100% - 8px)',
                          fontFamily: 'var(--font-sans)',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = 'rgba(230,169,62,0.1)';
                          (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                          (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                        }}
                      >
                        <span>{item.label}</span>
                        {item.shortcut && (
                          <span style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: 10 }}>
                            {item.shortcut}
                          </span>
                        )}
                      </button>
                    ),
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* ── RIGHT: System tray ─────────────────────────────── */}
      <div className="flex items-center gap-3">
        {/* CPU bars */}
        <div className="flex items-end gap-[2px] h-4">
          {([0.45, 0.8, 0.55, 0.9] as const).map((h, i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-full"
              style={{ background: 'var(--accent)', opacity: 0.45 }}
              animate={{ scaleY: [h, h * 0.35, h * 0.7, h] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
            />
          ))}
        </div>

        {/* Wifi */}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: 'var(--text-tertiary)', opacity: 0.7 }}
        >
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>

        {/* Battery */}
        <svg width="18" height="10" viewBox="0 0 22 11" fill="none" style={{ opacity: 0.5 }}>
          <rect x="0.5" y="0.5" width="18" height="10" rx="2" stroke="var(--text-tertiary)" strokeWidth="1" />
          <rect x="2" y="2" width="14" height="7" rx="1" fill="var(--accent)" opacity="0.6" />
          <rect x="19" y="3.5" width="2.5" height="4" rx="1" fill="var(--text-tertiary)" opacity="0.5" />
        </svg>

        {/* Date + Time */}
        <div
          className="flex items-center gap-2"
          style={{ color: 'var(--text-secondary)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
        >
          <span>{date}</span>
          <span style={{ color: 'var(--text-primary)', opacity: 0.85 }}>{time}</span>
        </div>
      </div>
    </motion.div>
  );
}

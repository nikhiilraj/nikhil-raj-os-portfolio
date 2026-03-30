'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINES = [
  { text: 'Nikhil.OS v1.0 — Initializing...', delay: 0 },
  { text: 'Loading system modules...', delay: 400 },
  { text: 'Mounting workspace...', delay: 800 },
  { text: 'Connecting to the internet...', delay: 1200 },
  { text: 'Launching environment...', delay: 1600 },
];

const ASCII = `
 ███╗   ██╗██╗██╗  ██╗██╗  ██╗██╗██╗
 ████╗  ██║██║██║ ██╔╝██║  ██║██║██║
 ██╔██╗ ██║██║█████╔╝ ███████║██║██║
 ██║╚██╗██║██║██╔═██╗ ██╔══██║██║██║
 ██║ ╚████║██║██║  ██╗██║  ██║██║███████╗
 ╚═╝  ╚═══╝╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚══════╝`;

type Props = { onDone: () => void };

export default function BootSequence({ onDone }: Props) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [showAscii, setShowAscii] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines((prev) => [...prev, i]), line.delay + 300);
    });

    // Progress bar
    const dur = 2400;
    const steps = 60;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProgress(Math.min(100, Math.round((step / steps) * 100)));
      if (step >= steps) clearInterval(interval);
    }, dur / steps);

    setTimeout(() => setShowAscii(true), 2200);
    setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, 700);
    }, 3400);

    return () => clearInterval(interval);
  }, [onDone]);

  const bar = Math.floor(progress / 5);
  const progressBar = '█'.repeat(bar) + '░'.repeat(20 - bar);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{ background: '#040510', zIndex: 99999, fontFamily: 'var(--font-mono)' }}
        >
          {showAscii && (
            <motion.pre
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[8px] sm:text-[10px] leading-tight mb-8 select-none"
              style={{ color: 'var(--accent)' }}
            >
              {ASCII}
            </motion.pre>
          )}

          <div className="space-y-2 w-full max-w-sm px-6">
            {LINES.map((line, i) =>
              visibleLines.includes(i) ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs"
                  style={{ color: i === LINES.length - 1 ? 'var(--accent)' : 'var(--text-muted)' }}
                >
                  <span style={{ color: 'var(--accent)', opacity: 0.5 }}>▶ </span>
                  {line.text}
                </motion.div>
              ) : null
            )}

            {visibleLines.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pt-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    [{progressBar}] {progress}%
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

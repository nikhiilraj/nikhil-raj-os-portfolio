'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { bio } from '@/lib/data';
import { useStore } from '@/lib/store';
import { playKeyTick, playCopySound, playDockClick, playCommandEnter, playPaperShuffle } from '@/lib/sounds';

const SplineRobot = dynamic(() => import('@/components/ui/SplineRobot'), {
  ssr: false,
  loading: () => null,
});

// ── Easing ─────────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── Terminal content ───────────────────────────────────────────────────────────
type TermLine =
  | { kind: 'cmd';    text: string }
  | { kind: 'out';    text: string }
  | { kind: 'status' }
  | { kind: 'link';   text: string; href: string }
  | { kind: 'copy';   text: string; value: string }
  | { kind: 'blank' };

const STATIC_LINES: TermLine[] = [
  { kind: 'cmd',    text: 'whoami' },
  { kind: 'out',    text: 'Nikhil Raj — full stack developer' },
  { kind: 'blank' },
  { kind: 'cmd',    text: 'uptime' },
  { kind: 'out',    text: '4 yrs · 30+ projects shipped' },
  { kind: 'blank' },
  { kind: 'cmd',    text: 'status' },
  { kind: 'status' },
  { kind: 'blank' },
  { kind: 'cmd',    text: 'links' },
  { kind: 'link',   text: 'github.com/nikhilraj ↗', href: bio.github },
  { kind: 'link',   text: 'resume.pdf ↗',            href: bio.resume },
  { kind: 'copy',   text: `${bio.email} ⎘`,           value: bio.email },
];

// ── Easter egg command definitions ─────────────────────────────────────────────
type EggEntry =
  | { kind: 'input';  text: string }
  | { kind: 'output'; text: string }
  | { kind: 'error';  text: string };

const COMMANDS: Record<string, () => EggEntry[]> = {
  help:   () => [{ kind: 'output', text: 'available commands: whoami, hire, clear' }],
  whoami: () => [{ kind: 'output', text: 'Nikhil Raj — full stack developer' }],

  hire: () => [{ kind: 'output', text: `opening messages.app…` }],
};

// ── Root — stays mounted so ScrollCanvas can dim it as overlay backdrop ───────
export default function HeroZone() {
  return <HeroContent />;
}

// ── Main layout (non-fixed — lives inside Desktop's scroll canvas) ─────────────
function HeroContent() {
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setScrollContainer(document.getElementById('main-content'));
  }, []);

  const { scrollYProgress } = useScroll({ container: scrollContainer ? { current: scrollContainer } : undefined });

  const nameY = useTransform(scrollYProgress, [0, 0.3], [0, -120]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const terminalY = useTransform(scrollYProgress, [0, 0.3], [0, -40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <motion.div style={{ opacity: heroOpacity }} className="flex flex-col items-center justify-center pointer-events-none w-full">
      <motion.div style={{ y: nameY }}>
        <NameDisplay />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
        style={{
          y: subtitleY,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text-tertiary)',
          marginTop: 10,
          marginBottom: 28,
          userSelect: 'none',
        }}
      >
        v4.2 · Full Stack &amp; AI Engineer
      </motion.p>

      {/* Terminal + 3D Robot composition */}
      <motion.div
        style={{
          y: terminalY,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          maxWidth: 'calc(100vw - 32px)',
          pointerEvents: 'auto',
        }}
      >
        <TerminalCard />

        {/* Robot — overlaps the terminal card edge for depth */}
        <div
          style={{
            marginLeft: -48,
            marginTop: -60,
            position: 'relative',
            zIndex: 5,
            pointerEvents: 'auto',
          }}
        >
          <SplineRobot />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Name with stroke-to-fill reveal + letter-spacing hover ────────────────────
function NameDisplay() {
  const [hovered, setHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontSize: 'clamp(5rem, 14vw, 11rem)',
    fontWeight: 400,
    lineHeight: 0.9,
    display: 'block',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    transition: 'letter-spacing 0.3s ease',
    letterSpacing: hovered ? '-0.02em' : '-0.04em',
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block', pointerEvents: 'auto' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Stroke layer — always visible */}
      <span
        aria-hidden
        style={{
          ...baseStyle,
          WebkitTextStroke: '1px rgba(255,255,255,0.1)',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
        }}
      >
        Nikhil Raj
      </span>

      {/* Fill layer — clips in left → right */}
      <motion.span
        aria-label="Nikhil Raj"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ delay: 0.3, duration: 1.2, ease: EASE }}
        style={{
          ...baseStyle,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, #ffffff 0%, #56565f 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Nikhil Raj
      </motion.span>
    </div>
  );
}

// ── Terminal card with spotlight border + easter egg ──────────────────────────
function TerminalCard() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const openWindow = useStore((s) => s.openWindow);

  // ── Spotlight border mouse tracking ──────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  // ── Easter egg state ──────────────────────────────────────────
  const [focused,   setFocused]   = useState(false);
  const [inputBuf,  setInputBuf]  = useState('');
  const [eggHistory, setEggHistory] = useState<EggEntry[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when history grows
  useEffect(() => {
    if (focused) bottomRef.current?.scrollIntoView({ block: 'nearest' });
  }, [eggHistory, inputBuf, focused]);

  // Keydown handler
  useEffect(() => {
    if (!focused) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setFocused(false); return; }
      if (e.key === 'Backspace') { setInputBuf((b) => b.slice(0, -1)); return; }
      if (e.key === 'Enter') {
        const cmd = inputBuf.trim().toLowerCase();
        setEggHistory((h) => {
          const next: EggEntry[] = [...h, { kind: 'input', text: inputBuf }];
          if (cmd === 'clear') return [];
          if (cmd === 'hire') {
            setTimeout(() => { playDockClick(); openWindow('contact'); }, 600);
            return [...next, ...COMMANDS.hire()];
          }
          const fn = COMMANDS[cmd];
          if (fn) return [...next, ...fn()];
          if (cmd !== '') return [...next, { kind: 'error', text: `command not found: ${cmd}` }];
          return next;
        });
        playCommandEnter();
        setInputBuf('');
        return;
      }
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        playKeyTick();
        setInputBuf((b) => b + e.key);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [focused, inputBuf]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.7, ease: EASE }}
      // Spotlight wrapper
      ref={wrapperRef}
      className="terminal-spotlight"
      onMouseMove={handleMouseMove}
      style={{ pointerEvents: 'auto', maxWidth: 'calc(100vw - 32px)', width: 560, position: 'relative', zIndex: 2 }}
    >
      {/* Spotlight ring — shown only on hover */}
      <div className="spotlight-ring" aria-hidden />

      {/* Card */}
      <div
        role="region"
        aria-label="Terminal — click to interact"
        tabIndex={0}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
        }}
        onClick={() => { setFocused(true); wrapperRef.current?.querySelector<HTMLElement>('[tabindex]')?.focus(); }}
        style={{
          background: '#111114',
          border: `1px solid ${focused ? 'rgba(230,169,62,0.2)' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: 12,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: focused
            ? '0 32px 80px rgba(230,169,62,0.1), 0 4px 24px rgba(0,0,0,0.55)'
            : '0 32px 80px rgba(230,169,62,0.06), 0 4px 24px rgba(0,0,0,0.55)',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          cursor: focused ? 'text' : 'default',
          outline: 'none', // handled by :focus-visible in CSS
        }}
      >
        {/* Top-edge refraction line */}
        <div
          aria-hidden
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
            zIndex: 3, pointerEvents: 'none',
          }}
        />
        {/* Inner top glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 56,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
            pointerEvents: 'none', zIndex: 0,
          }}
        />

        {/* Title bar */}
        <div
          style={{
            display: 'flex', alignItems: 'center', height: 40,
            padding: '0 14px', gap: 10,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
            position: 'relative', zIndex: 2,
          }}
        >
          <TrafficLights />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-tertiary)' }}>
            nikhil@dev ~ %
          </span>
          {focused && (
            <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(230,169,62,0.5)' }}>
              interactive — esc to exit
            </span>
          )}
        </div>

        {/* Terminal body */}
        <div style={{ padding: '20px 24px 24px', position: 'relative', zIndex: 2, maxHeight: 340, overflowY: 'auto' }}>
          {/* Static lines */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {STATIC_LINES.map((line, i) => (
              <StaticLine key={i} line={line} index={i} />
            ))}
          </div>

          {/* Easter egg history */}
          {eggHistory.length > 0 && (
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {eggHistory.map((entry, i) => (
                <EggLine key={i} entry={entry} />
              ))}
            </div>
          )}

          {/* "Click to type" hint — visible only when idle */}
          {!focused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 + STATIC_LINES.length * 0.12 + 0.3, duration: 0.5 }}
              style={{
                marginTop: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 10px',
                borderRadius: 6,
                background: 'rgba(230,169,62,0.04)',
                border: '1px dashed rgba(230,169,62,0.18)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', opacity: 0.5 }}>
                ▸
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
                click to interact
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-tertiary)',
                  opacity: 0.55,
                  marginLeft: 4,
                }}
              >
                try:
              </span>
              {['help', 'hire', 'whoami', 'clear'].map((cmd) => (
                <span
                  key={cmd}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--accent)',
                    opacity: 0.6,
                    background: 'rgba(230,169,62,0.08)',
                    border: '1px solid rgba(230,169,62,0.15)',
                    borderRadius: 3,
                    padding: '1px 5px',
                  }}
                >
                  {cmd}
                </span>
              ))}
            </motion.div>
          )}

          {/* Interactive input row */}
          {focused && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>$ </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)' }}>{inputBuf}</span>
              <span className="cursor-blink" aria-hidden />
            </div>
          )}

          <div ref={bottomRef} />

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 + STATIC_LINES.length * 0.12, duration: 0.5, ease: EASE }}
            style={{ display: 'flex', gap: 10, marginTop: 20 }}
          >
            <CTAButton href={bio.resume} variant="filled" onClick={() => playPaperShuffle()}>View resume</CTAButton>
            <CTAButton onClick={() => { playDockClick(); openWindow('contact'); }} variant="ghost">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Get in touch
              </span>
            </CTAButton>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Static terminal line ───────────────────────────────────────────────────────
function StaticLine({ line, index }: { line: TermLine; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const transition = { delay: 1.3 + index * 0.12, duration: 0.3, ease: EASE };
  const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '0.85rem' };

  if (line.kind === 'blank') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={transition} style={{ height: 8 }} />
    );
  }

  let content: React.ReactNode;
  if (line.kind === 'cmd') {
    content = (
      <>
        <span style={{ ...mono, color: 'var(--text-tertiary)' }}>$ </span>
        <span style={{ ...mono, color: 'var(--text-secondary)' }}>{line.text}</span>
      </>
    );
  } else if (line.kind === 'out') {
    content = <span style={{ ...mono, color: 'var(--text-primary)', paddingLeft: '1.1rem' }}>{line.text}</span>;
  } else if (line.kind === 'status') {
    content = (
      <span style={{ ...mono, display: 'inline-flex', alignItems: 'center', gap: 8, paddingLeft: '1.1rem', color: 'var(--text-primary)' }}>
        <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8, flexShrink: 0 }}>
          <span className="animate-ping" style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--accent)', opacity: 0.6 }} />
          <span style={{ position: 'relative', display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
        </span>
        open to work
      </span>
    );
  } else if (line.kind === 'link') {
    content = (
      <a
        href={line.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ ...mono, display: 'block', paddingLeft: '1.1rem', color: 'var(--accent)', textDecoration: 'none', opacity: hovered ? 0.7 : 1, transition: 'opacity 0.15s ease' }}
      >
        {line.text}
      </a>
    );
  } else if (line.kind === 'copy') {
    content = (
      <button
        onClick={() => {
          navigator.clipboard.writeText(line.value);
          playCopySound();
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...mono,
          display: 'block',
          color: copied ? '#28c840' : 'var(--accent)',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          opacity: hovered && !copied ? 0.7 : 1,
          transition: 'color 0.2s, opacity 0.15s ease',
          textAlign: 'left'
        }}
      >
        <span style={{ paddingLeft: '1.1rem' }}>
          {copied ? 'copied to clipboard! ✓' : line.text}
        </span>
      </button>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={transition} style={{ lineHeight: line.kind === 'cmd' ? 2 : 1.65 }}>
      {content}
    </motion.div>
  );
}

// ── Easter egg history line ────────────────────────────────────────────────────
function EggLine({ entry }: { entry: EggEntry }) {
  const mono: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.65 };
  if (entry.kind === 'input') {
    return (
      <div>
        <span style={{ ...mono, color: 'var(--text-tertiary)' }}>$ </span>
        <span style={{ ...mono, color: 'var(--accent)' }}>{entry.text}</span>
      </div>
    );
  }
  if (entry.kind === 'error') {
    return <div style={{ ...mono, paddingLeft: '1.1rem', color: '#ff5f57' }}>{entry.text}</div>;
  }
  return <div style={{ ...mono, paddingLeft: '1.1rem', color: 'var(--text-primary)' }}>{entry.text}</div>;
}

// ── Traffic lights ─────────────────────────────────────────────────────────────
function TrafficLights() {
  return (
    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
      {(['#ff5f57', '#ffbd2e', '#28c840'] as const).map((color) => (
        <div key={color} style={{ width: 12, height: 12, borderRadius: '50%', background: color }} />
      ))}
    </div>
  );
}

// ── CTA buttons ────────────────────────────────────────────────────────────────
function CTAButton({ href, onClick, variant, children }: { href?: string; onClick?: (e: React.MouseEvent) => void; variant: 'filled' | 'ghost'; children: React.ReactNode }) {
  const buttonRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const filled = variant === 'filled';

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Pull strength — how much the button moves toward cursor
    const pullX = (e.clientX - centerX) * 0.15;
    const pullY = (e.clientY - centerY) * 0.25;
    setOffset({ x: pullX, y: pullY });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setActive(false);
    setOffset({ x: 0, y: 0 });
  };

  const commonProps = {
    onMouseEnter: () => setHovered(true),
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    animate: {
      x: offset.x,
      y: offset.y,
      scale: active ? 0.97 : 1,
    },
    transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 36,
      borderRadius: 6,
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 600,
      textDecoration: 'none',
      cursor: 'pointer',
      ...(filled
        ? { background: hovered ? '#d4993a' : 'var(--accent)', color: '#09090b', border: 'none' }
        : { background: 'transparent', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.1)', opacity: hovered ? 0.8 : 1 }),
    } as any
  };

  if (href) {
    return (
      <motion.a
        ref={buttonRef as any}
        href={href}
        target={href.startsWith('mailto:') ? '_self' : '_blank'}
        rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
        onClick={onClick}
        {...commonProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef as any}
      onClick={onClick}
      {...commonProps}
    >
      {children}
    </motion.button>
  );
}

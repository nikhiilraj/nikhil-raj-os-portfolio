'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { bio } from '@/lib/data';
import { useStore } from '@/lib/store';

// ── Easing ─────────────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── Terminal content ───────────────────────────────────────────────────────────
type TermLine =
  | { kind: 'cmd';    text: string }
  | { kind: 'out';    text: string }
  | { kind: 'status' }
  | { kind: 'link';   text: string; href: string }
  | { kind: 'blank' };

const LINES: TermLine[] = [
  { kind: 'cmd',    text: 'whoami' },
  { kind: 'out',    text: 'Nikhil Raj — full stack developer' },
  { kind: 'blank' },
  { kind: 'cmd',    text: 'stack --list' },
  { kind: 'out',    text: 'React · Next.js · TypeScript' },
  { kind: 'out',    text: 'Tailwind · Framer Motion · Three.js' },
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
];

// ── Root — hides when any window is open ──────────────────────────────────────
export default function HeroZone() {
  const anyOpen = useStore((s) =>
    Object.values(s.windows).some((w) => w.isOpen && !w.isMinimized),
  );
  if (anyOpen) return null;
  return <HeroContent />;
}

// ── Main layout ────────────────────────────────────────────────────────────────
function HeroContent() {
  return (
    <div
      className="fixed left-0 right-0 flex flex-col items-center justify-center pointer-events-none"
      style={{ top: 40, bottom: 80, zIndex: 50 }}
    >
      <NameDisplay />

      {/* Version / subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
        style={{
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

      <TerminalCard />
    </div>
  );
}

// ── Name with stroke-to-fill reveal ──────────────────────────────────────────
function NameDisplay() {
  const baseStyle: React.CSSProperties = {
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontSize: 'clamp(5rem, 14vw, 11rem)',
    fontWeight: 400,
    letterSpacing: '-0.04em',
    lineHeight: 0.9,
    display: 'block',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Stroke layer — always visible, provides structure */}
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

      {/* Fill layer — gradient clips in left → right */}
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

// ── Terminal card ─────────────────────────────────────────────────────────────
function TerminalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.7, ease: EASE }}
      style={{
        pointerEvents: 'auto',
        width: 560,
        maxWidth: 'calc(100vw - 32px)',
        background: '#111114',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        boxShadow:
          '0 32px 80px rgba(230,169,62,0.06), 0 4px 24px rgba(0,0,0,0.55)',
      }}
    >
      {/* Top-edge glass refraction line */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
      {/* Inner top glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 56,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 40,
          padding: '0 14px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.02)',
          position: 'relative',
          zIndex: 2,
          gap: 10,
        }}
      >
        <TrafficLights />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--text-tertiary)',
          }}
        >
          nikhil@dev ~ %
        </span>
      </div>

      {/* Terminal body */}
      <div style={{ padding: '20px 24px 24px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {LINES.map((line, i) => (
            <Line key={i} line={line} index={i} />
          ))}
        </div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.3 + LINES.length * 0.12,
            duration: 0.5,
            ease: EASE,
          }}
          style={{ display: 'flex', gap: 10, marginTop: 20 }}
        >
          <CTAButton href={bio.resume} variant="filled">
            View resume
          </CTAButton>
          <CTAButton href={`mailto:${bio.email}`} variant="ghost">
            Get in touch
          </CTAButton>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ── Terminal line ─────────────────────────────────────────────────────────────
function Line({ line, index }: { line: TermLine; index: number }) {
  const [hovered, setHovered] = useState(false);

  const transition = {
    delay: 1.3 + index * 0.12,
    duration: 0.3,
    ease: EASE,
  };

  const monoSm: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.85rem',
  };

  if (line.kind === 'blank') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition}
        style={{ height: 8 }}
      />
    );
  }

  let content: React.ReactNode;

  if (line.kind === 'cmd') {
    content = (
      <>
        <span style={{ ...monoSm, color: 'var(--text-tertiary)' }}>$ </span>
        <span style={{ ...monoSm, color: 'var(--text-secondary)' }}>{line.text}</span>
      </>
    );
  } else if (line.kind === 'out') {
    content = (
      <span style={{ ...monoSm, color: 'var(--text-primary)', paddingLeft: '1.1rem' }}>
        {line.text}
      </span>
    );
  } else if (line.kind === 'status') {
    content = (
      <span
        style={{
          ...monoSm,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          paddingLeft: '1.1rem',
          color: 'var(--text-primary)',
        }}
      >
        {/* Pulsing amber dot */}
        <span style={{ position: 'relative', display: 'inline-flex', width: 8, height: 8, flexShrink: 0 }}>
          <span
            className="animate-ping"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'var(--accent)',
              opacity: 0.6,
            }}
          />
          <span
            style={{
              position: 'relative',
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--accent)',
            }}
          />
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
        style={{
          ...monoSm,
          display: 'block',
          paddingLeft: '1.1rem',
          color: 'var(--accent)',
          textDecoration: 'none',
          opacity: hovered ? 0.7 : 1,
          transition: 'opacity 0.15s ease',
        }}
      >
        {line.text}
      </a>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      style={{ lineHeight: line.kind === 'cmd' ? 2 : 1.65 }}
    >
      {content}
    </motion.div>
  );
}

// ── Traffic lights ─────────────────────────────────────────────────────────────
function TrafficLights() {
  return (
    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
      {(['#ff5f57', '#ffbd2e', '#28c840'] as const).map((color) => (
        <div
          key={color}
          style={{ width: 12, height: 12, borderRadius: '50%', background: color }}
        />
      ))}
    </div>
  );
}

// ── CTA buttons ────────────────────────────────────────────────────────────────
function CTAButton({
  href,
  variant,
  children,
}: {
  href: string;
  variant: 'filled' | 'ghost';
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive]   = useState(false);

  const filled = variant === 'filled';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
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
        transform: active ? 'scale(0.98)' : 'scale(1)',
        transition: 'background 0.15s ease, opacity 0.15s ease, transform 0.1s ease',
        ...(filled
          ? {
              background: hovered ? '#d4993a' : 'var(--accent)',
              color: '#09090b',
              border: 'none',
            }
          : {
              background: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid rgba(255,255,255,0.1)',
              opacity: hovered ? 0.7 : 1,
            }),
      }}
    >
      {children}
    </a>
  );
}

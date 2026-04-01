'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useStore } from '@/lib/store';
import Menubar from './Menubar';
import Dock from './Dock';
import HeroZone from './HeroZone';
import AboutApp from '@/components/apps/AboutApp';
import ProjectsApp from '@/components/apps/ProjectsApp';
import SkillsApp from '@/components/apps/SkillsApp';
import ResumeApp from '@/components/apps/ResumeApp';
import ContactApp from '@/components/apps/ContactApp';
import SelectedWork from '@/components/sections/SelectedWork';
import Currently from '@/components/sections/Currently';
import Footer from '@/components/sections/Footer';
import ScrollProgress from '@/components/ui/ScrollProgress';

const ParticleField = dynamic(() => import('@/components/background/ParticleField'), { ssr: false });

export default function Desktop() {
  const anyOpen = useStore((s) =>
    Object.values(s.windows).some((w) => w.isOpen && !w.isMinimized),
  );

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Skip to main content (accessibility) */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      {/* Ambient background */}
      <ParticleField />

      {/* Cursor glow */}
      <CursorGlow />

      {/* Grain overlay */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0.035,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* OS Chrome */}
      <Menubar />
      {!anyOpen && <ScrollProgress />}

      {/* App Windows */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 100, pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
          <AboutApp />
          <ProjectsApp />
          <SkillsApp />
          <ResumeApp />
          <ContactApp />
        </div>
      </div>

      {/* Scrollable center canvas — hero + below-fold sections */}
      <ScrollCanvas />

      <Dock />
    </div>
  );
}

// ── Scrollable center canvas ───────────────────────────────────────────────────
function ScrollCanvas() {
  const anyOpen = useStore((s) =>
    Object.values(s.windows).some((w) => w.isOpen && !w.isMinimized),
  );

  return (
    <div
      id="main-content"
      style={{
        position: 'fixed',
        top: 40,
        bottom: 80,
        left: 0,
        right: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        zIndex: 50,
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(230,169,62,0.18) transparent',
        opacity: anyOpen ? 0 : 1,
        pointerEvents: anyOpen ? 'none' : 'auto',
        transition: 'opacity 0.2s ease',
      }}
    >
      {/* Hero — min-height fills the visible canvas */}
      <section
        style={{
          minHeight: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 16px',
        }}
      >
        <HeroZone />
      </section>

      {/* Below-fold */}
      <SelectedWork />
      <Currently />
      <Footer />
    </div>
  );
}

// ── Context-aware cursor ───────────────────────────────────────────────────────
type CursorMode = 'default' | 'link' | 'view' | 'text' | 'button';

function CursorGlow() {
  const divRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -9999, y: -9999 });
  const lerpRef = useRef({ x: -9999, y: -9999 });
  const frameRef = useRef(0);
  const [mode, setMode] = useState<CursorMode>('default');
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    setHasFinePointer(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!hasFinePointer) return;

    const onMove = (e: PointerEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('pointermove', onMove);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const closest = (sel: string) => target.closest(sel);

      if (closest('a[href], [role="link"]')) setMode('link');
      else if (closest('.terminal-spotlight') && !closest('.cursor-blink')) setMode('view');
      else if (closest('[role="region"][aria-label*="Terminal"]')) setMode('text');
      else if (closest('button, [role="button"], .cta-primary, .cta-secondary')) setMode('button');
      else setMode('default');
    };
    window.addEventListener('mouseover', onOver);

    const loop = () => {
      const l = lerpRef.current;
      const p = posRef.current;
      l.x += (p.x - l.x) * 0.08;
      l.y += (p.y - l.y) * 0.08;
      if (divRef.current) {
        divRef.current.style.transform = `translate(${l.x}px,${l.y}px)`;
      }
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(frameRef.current);
    };
  }, [hasFinePointer]);

  if (!hasFinePointer) return null;

  return (
    <div
      ref={divRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9998,
        willChange: 'transform',
      }}
    >
      {mode === 'default' && (
        <div
          style={{
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(230,169,62,0.035) 0%, transparent 70%)',
            transform: 'translate(-150px, -150px)',
          }}
        />
      )}

      {mode === 'link' && (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: '1.5px solid var(--accent)',
            background: 'rgba(230,169,62,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            color: 'var(--accent)',
            transform: 'translate(-16px, -16px)',
          }}
        >
          ↗
        </div>
      )}

      {mode === 'view' && (
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '1.5px solid var(--accent)',
            background: 'rgba(230,169,62,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--accent)',
            transform: 'translate(-22px, -22px)',
          }}
        >
          view
        </div>
      )}

      {mode === 'text' && (
        <div
          style={{
            width: 2,
            height: 20,
            background: 'var(--accent)',
            borderRadius: 1,
            transform: 'translate(-1px, -10px)',
          }}
        />
      )}

      {mode === 'button' && (
        <div
          style={{
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(230,169,62,0.05) 0%, transparent 70%)',
            transform: 'translate(-200px, -200px)',
          }}
        />
      )}
    </div>
  );
}

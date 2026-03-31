'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Menubar from './Menubar';
import Dock from './Dock';
import HeroZone from './HeroZone';
import AboutApp from '@/components/apps/AboutApp';
import ProjectsApp from '@/components/apps/ProjectsApp';
import SkillsApp from '@/components/apps/SkillsApp';
import ResumeApp from '@/components/apps/ResumeApp';
import ContactApp from '@/components/apps/ContactApp';

const ParticleField = dynamic(() => import('@/components/background/ParticleField'), { ssr: false });

export default function Desktop() {
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Ambient background */}
      <ParticleField />

      {/* Cursor glow */}
      <CursorGlow />

      {/* Grain texture overlay */}
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

      {/* Hero */}
      <HeroZone />

      <Dock />
    </div>
  );
}

// ── Cursor glow — lerp-smoothed radial amber trail ────────────────────────────

function CursorGlow() {
  const divRef  = useRef<HTMLDivElement>(null);
  const posRef  = useRef({ x: -9999, y: -9999 });
  const lerpRef = useRef({ x: -9999, y: -9999 });
  const frameRef = useRef(0);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('pointermove', onPointerMove);

    const loop = () => {
      const l = lerpRef.current;
      const p = posRef.current;
      l.x += (p.x - l.x) * 0.08;
      l.y += (p.y - l.y) * 0.08;
      if (divRef.current) {
        divRef.current.style.transform = `translate(${l.x - 150}px, ${l.y - 150}px)`;
      }
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={divRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(230,169,62,0.035) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9998,
        willChange: 'transform',
      }}
    />
  );
}

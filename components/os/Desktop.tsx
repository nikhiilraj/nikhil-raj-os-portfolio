'use client';
import dynamic from 'next/dynamic';
import { useStore } from '@/lib/store';
import Menubar from './Menubar';
import Dock from './Dock';
import AboutApp from '@/components/apps/AboutApp';
import ProjectsApp from '@/components/apps/ProjectsApp';
import SkillsApp from '@/components/apps/SkillsApp';
import ResumeApp from '@/components/apps/ResumeApp';
import ContactApp from '@/components/apps/ContactApp';

// Three.js dynamically to avoid SSR issues
const ParticleField = dynamic(() => import('@/components/background/ParticleField'), { ssr: false });

export default function Desktop() {
  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Particle background */}
      <ParticleField />

      {/* Radial gradient overlay for depth */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(99,70,255,0.05) 0%, transparent 80%)',
          zIndex: 1,
        }}
      />

      {/* OS Chrome */}
      <Menubar />

      {/* App Windows — z-index managed by store */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 100, pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
          <AboutApp />
          <ProjectsApp />
          <SkillsApp />
          <ResumeApp />
          <ContactApp />
        </div>
      </div>

      {/* Desktop idle hint */}
      <DesktopHint />

      <Dock />
    </div>
  );
}

function DesktopHint() {
  const anyOpen = useStore((s) =>
    Object.values(s.windows).some((w) => w.isOpen && !w.isMinimized)
  );

  if (anyOpen) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none"
      style={{ zIndex: 50 }}
    >
      <div className="text-center space-y-3 px-6">
        <p
          className="text-4xl md:text-6xl font-bold tracking-tight"
          style={{
            letterSpacing: '-0.02em',
            backgroundImage: 'linear-gradient(135deg, #e2e8f0 0%, #7c6aff 45%, #3dd6f5 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Nikhil Raj
        </p>
        <p
          className="text-sm md:text-base"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          Full Stack Engineer · Backend & AI Applications
        </p>
        <p
          className="text-xs mt-4 animate-pulse"
          style={{ color: 'rgba(124,106,255,0.55)', fontFamily: 'var(--font-mono)' }}
        >
          click an icon below to explore ↓
        </p>
      </div>
    </div>
  );
}

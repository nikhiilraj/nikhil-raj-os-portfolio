'use client';

// Replaces the Three.js Silk shader — static ambient glow background
export default function ParticleField() {
  return (
    <div
      className="fixed inset-0"
      style={{ zIndex: 0, background: '#09090b', pointerEvents: 'none' }}
    >
      {/* Warm amber glow — top-right */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-8%',
          width: '55vw',
          height: '55vh',
          background:
            'radial-gradient(ellipse, rgba(230,169,62,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      {/* Cool white glow — bottom-left */}
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-8%',
          width: '50vw',
          height: '50vh',
          background:
            'radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

'use client';
'use no memo';

import { useEffect, useRef } from 'react';

interface Props {
  slugs: string[];
  /** Hex color without '#' passed to Simple Icons CDN */
  color?: string;
}

/** Distribute n points evenly on a unit sphere (Fibonacci lattice). */
function fibonacciSphere(n: number): Array<{ x: number; y: number; z: number }> {
  const phi = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
  });
}

export default function IconCloud({ slugs, color = '7c6aff' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rotRef = useRef({ x: 0.2, y: 0 });
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const frameRef = useRef<number>(0);
  const pointsRef = useRef(fibonacciSphere(slugs.length));

  const RADIUS = 150;

  useEffect(() => {
    // Recompute sphere points if slugs change
    pointsRef.current = fibonacciSphere(slugs.length);
    // Ensure refs array is same length
    itemRefs.current = itemRefs.current.slice(0, slugs.length);
  }, [slugs]);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (mouseRef.current) {
        rotRef.current.y += mouseRef.current.x * delta * 2.5;
        rotRef.current.x = mouseRef.current.y * 0.6;
      } else {
        rotRef.current.y += delta * 0.38;
      }

      const { x: rx, y: ry } = rotRef.current;
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const cosY = Math.cos(ry), sinY = Math.sin(ry);

      const pts = pointsRef.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        // Rotate around Y, then X
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const el = itemRefs.current[i];
        if (!el) continue;

        const px = x1 * RADIUS;
        const py = y2 * RADIUS;
        const opacity = Math.max(0.12, (z2 + 1.6) / 2.6);
        const scale = Math.max(0.45, (z2 + 1.9) / 2.9);
        const glow = z2 > 0.2
          ? `drop-shadow(0 0 6px rgba(124,106,255,0.75))`
          : `drop-shadow(0 0 2px rgba(124,106,255,0.2))`;

        el.style.transform = `translate(calc(-50% + ${px.toFixed(1)}px), calc(-50% + ${py.toFixed(1)}px)) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(Math.round((z2 + 1) * 50));
        el.style.filter = glow;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: (e.clientX - rect.left - rect.width / 2) / (rect.width / 2),
      y: (e.clientY - rect.top - rect.height / 2) / (rect.height / 2),
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseRef.current = null; }}
    >
      {slugs.map((slug, i) => (
        <div
          key={slug}
          ref={(el) => { itemRefs.current[i] = el; }}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            willChange: 'transform, opacity, filter',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://cdn.simpleicons.org/${slug}/${color}`}
            alt={slug}
            width={26}
            height={26}
            style={{ display: 'block' }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      ))}
    </div>
  );
}

'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PROJECTS = [
  {
    num: '01',
    title: 'Portfolio OS',
    desc: 'A browser-based macOS-inspired desktop with draggable windows and terminal easter eggs.',
    tech: ['React', 'Three.js', 'Framer Motion'],
    featured: true,
  },
  {
    num: '02',
    title: 'Kuro Dashboard',
    desc: 'Real-time analytics platform with dark-first design system and live data streams.',
    tech: ['Next.js', 'Tailwind', 'Prisma'],
    featured: false,
  },
  {
    num: '03',
    title: 'Synth Studio',
    desc: 'Browser-native synthesizer with polyphonic voice engine and MIDI support.',
    tech: ['TypeScript', 'Web Audio', 'Canvas'],
    featured: false,
  },
];

export default function SelectedWork() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const { scrollYProgress: bgScroll } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(bgScroll, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        maxWidth: 960,
        margin: '0 auto',
        padding: '80px 24px 64px',
      }}
    >
      {/* Background architectural text */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        <motion.div
          style={{
            y: bgY,
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(10rem, 22vw, 20rem)',
            fontWeight: 400,
            lineHeight: 0.85,
            letterSpacing: '-0.04em',
            WebkitTextStroke: '1px rgba(255,255,255,0.03)',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            whiteSpace: 'nowrap',
          }}
        >
          NIKHIL
        </motion.div>
      </div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE }}
        style={{ marginBottom: 32 }}
      >
        <span className="section-label" style={{ position: 'relative', zIndex: 1 }}>Selected Work</span>
      </motion.div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <LineWipe inView={inView} />
      </div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
          fontWeight: 400,
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          color: 'var(--text-primary)',
          marginBottom: 40,
        }}
      >
        Things I&apos;ve built
      </motion.h2>

      {/* Asymmetric bento grid */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'auto auto',
          gap: 16,
        }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.num} project={project} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}

type Project = typeof PROJECTS[0];

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: Project;
  index: number;
  inView: boolean;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  
  // Featured card moves slightly slower, others slightly faster
  const speed = project.featured ? 15 : -10 + (index * 8);
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  const gridStyle: React.CSSProperties = project.featured
    ? { gridColumn: '1 / span 2', gridRow: '1 / span 2' }
    : {};

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.55, ease: EASE }}
      style={{ ...gridStyle, y }}
    >
      <CardInner project={project} featured={project.featured} />
    </motion.div>
  );
}

function CardInner({ project, featured }: { project: Project; featured: boolean }) {
  const ref     = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="terminal-spotlight"
      style={{
        height: '100%',
        minHeight: featured ? 280 : 'auto',
        background: 'var(--bg-elevated)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12,
        padding: featured ? '2rem' : '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        cursor: 'default',
        transition: 'border-color 0.2s ease, transform 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
      }}
    >
      {/* Spotlight ring */}
      <div className="spotlight-ring" aria-hidden />

      {/* Top shimmer on hover */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Project number */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--text-tertiary)',
          letterSpacing: '0.08em',
        }}
      >
        {project.num}
      </span>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: featured ? 'clamp(1.4rem, 2.5vw, 2rem)' : '1.2rem',
          fontWeight: 400,
          color: 'var(--text-primary)',
          margin: 0,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.875rem',
          fontWeight: 500,
          color: 'var(--text-secondary)',
          margin: 0,
          lineHeight: 1.6,
          flex: 1,
        }}
      >
        {project.desc}
      </p>

      {/* Tech tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-tertiary)',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 4,
              padding: '2px 8px',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function LineWipe({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
        transformOrigin: 'left',
        marginBottom: 48,
        opacity: 0.4,
      }}
    />
  );
}

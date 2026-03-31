'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder } from '@phosphor-icons/react';
import { projects, Project } from '@/lib/data';
import Window from '@/components/os/Window';

function TechPill({ tech }: { tech: string }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        padding: '2px 8px',
        borderRadius: 4,
        background: 'rgba(230,169,62,0.06)',
        border: '1px solid rgba(230,169,62,0.2)',
        color: 'var(--accent)',
      }}
    >
      {tech}
    </span>
  );
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      className="absolute inset-0 flex flex-col p-6 overflow-y-auto"
      style={{ background: 'rgba(9,9,11,0.98)', zIndex: 10 }}
    >
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-xs mb-5 w-fit transition-colors"
        style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
      >
        ← back
      </button>

      <h2
        style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: '1.5rem',
          fontWeight: 400,
          color: 'var(--text-primary)',
          marginBottom: 8,
          lineHeight: 1.2,
        }}
      >
        {project.name}
      </h2>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>
        {project.description}
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--text-secondary)', marginBottom: 20 }}>
        {project.longDescription}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
        {project.tech.map((t) => <TechPill key={t} tech={t} />)}
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.75rem',
              padding: '6px 14px',
              borderRadius: 8,
              border: '1px solid rgba(230,169,62,0.25)',
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)',
              textDecoration: 'none',
              transition: 'border-color 0.15s ease, background 0.15s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(230,169,62,0.06)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(230,169,62,0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(230,169,62,0.25)';
            }}
          >
            GitHub
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.75rem',
              padding: '6px 14px',
              borderRadius: 8,
              background: 'rgba(230,169,62,0.08)',
              border: '1px solid rgba(230,169,62,0.25)',
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)',
              textDecoration: 'none',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(230,169,62,0.14)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(230,169,62,0.08)'; }}
          >
            ↗ Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsApp() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Window id="projects" title="projects.finder" icon={<Folder weight="bold" size={14} />}>
      <div className="relative h-full flex overflow-hidden">
        {/* Sidebar */}
        <div
          className="w-36 flex-shrink-0 py-3 px-2 space-y-0.5 overflow-y-auto"
          style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-tertiary)',
              padding: '0 8px',
              marginBottom: 8,
            }}
          >
            Projects
          </p>
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 8px',
                borderRadius: 6,
                textAlign: 'left',
                background: selected?.id === p.id ? 'rgba(230,169,62,0.08)' : 'transparent',
                borderLeft: selected?.id === p.id ? '2px solid rgba(230,169,62,0.5)' : '2px solid transparent',
                color: selected?.id === p.id ? 'var(--accent)' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.15s ease, color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (selected?.id !== p.id) {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (selected?.id !== p.id) {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                }
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', truncate: 'ellipsis' } as React.CSSProperties}>
                {p.name}
              </span>
            </button>
          ))}
        </div>

        {/* Main area */}
        <div className="flex-1 overflow-y-auto p-4 relative">
          {!selected ? (
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-tertiary)',
                  marginBottom: 16,
                }}
              >
                {projects.length} items
              </p>
              <div className="grid grid-cols-2 gap-3">
                {projects.map((p, i) => (
                  <motion.button
                    key={p.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => setSelected(p)}
                    style={{
                      textAlign: 'left',
                      padding: 16,
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease, border-color 0.15s ease, transform 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(230,169,62,0.04)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(230,169,62,0.18)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.025)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: 6,
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        lineHeight: 1.55,
                        color: 'var(--text-secondary)',
                        marginBottom: 10,
                      }}
                    >
                      {p.description}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {p.tech.slice(0, 2).map((t) => <TechPill key={t} tech={t} />)}
                      {p.tech.length > 2 && (
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            padding: '2px 4px',
                            color: 'var(--text-tertiary)',
                          }}
                        >
                          +{p.tech.length - 2}
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : null}

          <AnimatePresence>
            {selected && (
              <ProjectDetail project={selected} onClose={() => setSelected(null)} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </Window>
  );
}

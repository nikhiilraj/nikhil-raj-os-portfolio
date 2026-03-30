'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, Project } from '@/lib/data';
import Window from '@/components/os/Window';

function TechPill({ tech }: { tech: string }) {
  return (
    <span
      className="text-[10px] px-2 py-0.5 rounded-full"
      style={{
        background: 'rgba(100,255,218,0.08)',
        border: '1px solid rgba(100,255,218,0.2)',
        color: 'var(--accent)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {tech}
    </span>
  );
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="absolute inset-0 flex flex-col p-6 overflow-y-auto"
      style={{ background: 'rgba(10,25,47,0.95)', zIndex: 10 }}
    >
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-xs mb-5 w-fit transition-colors"
        style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--accent)')}
        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-muted)')}
      >
        ← back
      </button>

      <div className="text-4xl mb-3">{project.emoji}</div>
      <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
        {project.name}
      </h2>
      <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>{project.description}</p>
      <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
        {project.longDescription}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t) => <TechPill key={t} tech={t} />)}
      </div>

      <div className="flex gap-3 mt-auto">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs px-4 py-2 rounded-lg transition-all"
            style={{
              border: '1px solid rgba(100,255,218,0.3)',
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span>⌥</span> GitHub
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs px-4 py-2 rounded-lg transition-all"
            style={{
              background: 'rgba(100,255,218,0.1)',
              border: '1px solid rgba(100,255,218,0.3)',
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span>↗</span> Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectsApp() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Window id="projects" title="projects.finder" icon="🗂️">
      <div className="relative h-full flex overflow-hidden">
        {/* Sidebar */}
        <div
          className="w-36 flex-shrink-0 py-3 px-2 space-y-1 overflow-y-auto"
          style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-[9px] px-2 mb-2 uppercase tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Projects
          </p>
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-all"
              style={{
                background: selected?.id === p.id ? 'rgba(100,255,218,0.08)' : 'transparent',
                color: selected?.id === p.id ? 'var(--accent)' : 'var(--text-muted)',
              }}
            >
              <span className="text-sm">{p.emoji}</span>
              <span className="text-[11px] truncate" style={{ fontFamily: 'var(--font-mono)' }}>{p.name}</span>
            </button>
          ))}
        </div>

        {/* Main area */}
        <div className="flex-1 overflow-y-auto p-4 relative">
          {!selected ? (
            <div>
              <p className="text-[10px] mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
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
                    className="text-left p-4 rounded-xl transition-all group"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}
                    whileHover={{
                      background: 'rgba(100,255,218,0.04)',
                      borderColor: 'rgba(100,255,218,0.2)',
                    }}
                  >
                    <div className="text-2xl mb-2">{p.emoji}</div>
                    <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                      {p.name}
                    </div>
                    <div className="text-[10px] leading-tight mb-2" style={{ color: 'var(--text-muted)' }}>
                      {p.description}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {p.tech.slice(0, 2).map((t) => <TechPill key={t} tech={t} />)}
                      {p.tech.length > 2 && (
                        <span className="text-[10px] px-1 py-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
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

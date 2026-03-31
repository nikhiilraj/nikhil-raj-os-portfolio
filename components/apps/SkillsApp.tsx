'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightning } from '@phosphor-icons/react';
import { skills, SkillNode } from '@/lib/data';
import Window from '@/components/os/Window';
import IconCloud from '@/components/ui/IconCloud';

type Tab = 'sphere' | 'stack' | 'map';

const TABS: { id: Tab; label: string }[] = [
  { id: 'sphere', label: '◎  Sphere' },
  { id: 'stack',  label: '⎗  Stack'  },
  { id: 'map',    label: '⊞  Map'    },
];

const ACCENT = '#e6a93e';

const GROUP_META: Record<string, { icon: string }> = {
  Frontend: { icon: '⬡' },
  Backend:  { icon: '◈' },
  AI:       { icon: '◆' },
  Tools:    { icon: '○' },
};

const LEVEL_PCT: Record<string, number> = { Core: 92, Proficient: 72, Familiar: 45 };

const ICON_SLUGS = [
  'react', 'nextdotjs', 'typescript', 'tailwindcss',
  'nodedotjs', 'express', 'python', 'fastapi',
  'postgresql', 'redis', 'mongodb',
  'openai', 'langchain',
  'docker', 'git', 'vercel',
];

function groupSkills(): Record<string, SkillNode[]> {
  const grouped: Record<string, SkillNode[]> = {};
  skills.nodes.forEach((n) => {
    if (!grouped[n.group]) grouped[n.group] = [];
    grouped[n.group].push(n);
  });
  return grouped;
}

export default function SkillsApp() {
  const [tab, setTab] = useState<Tab>('sphere');

  return (
    <Window id="skills" title="skills.sys" icon={<Lightning weight="bold" size={14} />}>
      <div className="flex flex-col h-full">
        {/* Tab bar */}
        <div
          className="flex items-center gap-1 px-4 pt-3 pb-2 shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className="relative px-3 py-1.5 rounded-lg text-xs transition-colors duration-150"
              style={{
                color: tab === t.id ? 'var(--accent)' : 'var(--text-secondary)',
                background:
                  tab === t.id ? 'rgba(230,169,62,0.08)' : 'transparent',
                border:
                  tab === t.id
                    ? '1px solid rgba(230,169,62,0.22)'
                    : '1px solid transparent',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
              }}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'rgba(230,169,62,0.05)' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {tab === 'sphere' && (
              <motion.div
                key="sphere"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div className="w-full h-full max-w-[420px] max-h-[420px] mx-auto">
                  <IconCloud slugs={ICON_SLUGS} color="e6a93e" />
                </div>
                <p
                  className="absolute bottom-3 text-[10px]"
                  style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}
                >
                  {ICON_SLUGS.length} technologies · hover to interact
                </p>
              </motion.div>
            )}

            {tab === 'stack' && (
              <motion.div
                key="stack"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 overflow-y-auto p-4"
              >
                <StackPanel />
              </motion.div>
            )}

            {tab === 'map' && (
              <motion.div
                key="map"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 overflow-y-auto p-4"
              >
                <MapPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Window>
  );
}

function StackPanel() {
  const grouped = groupSkills();

  return (
    <div className="grid grid-cols-2 gap-3">
      {Object.entries(grouped).map(([group, nodes]) => (
        <StackCategory key={group} group={group} nodes={nodes} />
      ))}
    </div>
  );
}

function StackCategory({ group, nodes }: { group: string; nodes: SkillNode[] }) {
  const meta = GROUP_META[group] ?? { icon: '○' };
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      className="rounded-xl p-3 flex flex-col gap-2"
      style={{
        background: 'rgba(230,169,62,0.04)',
        border: '1px solid rgba(230,169,62,0.14)',
      }}
    >
      {/* Category header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <span style={{ color: ACCENT, fontSize: '12px' }}>{meta.icon}</span>
          <span
            className="text-xs font-semibold"
            style={{ color: ACCENT, fontFamily: 'var(--font-mono)' }}
          >
            {group}
          </span>
        </div>
        <span
          className="text-[9px] px-1.5 py-0.5 rounded"
          style={{
            background: 'rgba(230,169,62,0.1)',
            color: ACCENT,
            fontFamily: 'var(--font-mono)',
          }}
        >
          {nodes.length}
        </span>
      </div>

      {/* Skill rows */}
      {nodes.map((node) => (
        <SkillBar key={node.id} node={node} animate={mounted} />
      ))}
    </div>
  );
}

function SkillBar({ node, animate }: { node: SkillNode; animate: boolean }) {
  const pct = LEVEL_PCT[node.level];
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;
    barRef.current.style.width = animate ? `${pct}%` : '0%';
  }, [animate, pct]);

  const barOpacity = node.level === 'Core' ? 1 : node.level === 'Proficient' ? 0.7 : 0.4;

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center justify-between">
        <span
          className="text-[11px]"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
        >
          {node.label}
        </span>
        <span
          className="text-[9px]"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
        >
          {node.level}
        </span>
      </div>
      <div
        className="h-[3px] rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <div
          ref={barRef}
          style={{
            height: '100%',
            width: '0%',
            borderRadius: '9999px',
            background: ACCENT,
            opacity: barOpacity,
            transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </div>
    </div>
  );
}

function MapPanel() {
  const grouped = groupSkills();

  return (
    <div className="grid grid-cols-2 gap-3 h-full">
      {Object.entries(grouped).map(([group, nodes]) => {
        const meta = GROUP_META[group] ?? { icon: '○' };
        return (
          <motion.div
            key={group}
            className="rounded-xl p-4 flex flex-col gap-3 cursor-default"
            style={{
              background: 'rgba(230,169,62,0.03)',
              border: '1px solid rgba(230,169,62,0.12)',
              minHeight: '120px',
            }}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            {/* Header */}
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
                style={{ background: 'rgba(230,169,62,0.12)', color: ACCENT }}
              >
                {meta.icon}
              </div>
              <div>
                <p
                  className="text-xs font-semibold"
                  style={{ color: ACCENT, fontFamily: 'var(--font-mono)' }}
                >
                  {group}
                </p>
                <p
                  className="text-[9px]"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
                >
                  {nodes.length} skills
                </p>
              </div>
            </div>

            {/* Skill pills */}
            <div className="flex flex-wrap gap-1.5">
              {nodes.map((n) => (
                <span
                  key={n.id}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: 'rgba(230,169,62,0.07)',
                    border: '1px solid rgba(230,169,62,0.18)',
                    color: n.level === 'Core' ? ACCENT : 'var(--text-secondary)',
                  }}
                >
                  {n.label}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

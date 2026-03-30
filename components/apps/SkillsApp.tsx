'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, SkillNode } from '@/lib/data';
import Window from '@/components/os/Window';
import IconCloud from '@/components/ui/IconCloud';

type Tab = 'sphere' | 'stack' | 'map';

const TABS: { id: Tab; label: string }[] = [
  { id: 'sphere', label: '◎  Sphere' },
  { id: 'stack',  label: '⎗  Stack'  },
  { id: 'map',    label: '⊞  Map'    },
];

const GROUP_META: Record<string, { color: string; icon: string }> = {
  Frontend: { color: '#7c6aff', icon: '⬡' },
  Backend:  { color: '#3dd6f5', icon: '◈' },
  AI:       { color: '#f472b6', icon: '◆' },
  Tools:    { color: '#a78bfa', icon: '○' },
};

const LEVEL_PCT: Record<string, number> = { Core: 92, Proficient: 72, Familiar: 45 };

// Simple Icons slugs that map to lib/data.ts skills
const ICON_SLUGS = [
  'react', 'nextdotjs', 'typescript', 'tailwindcss',
  'nodedotjs', 'express', 'python', 'fastapi',
  'postgresql', 'redis', 'mongodb',
  'openai', 'langchain',
  'docker', 'git', 'vercel',
];

// Group nodes
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
    <Window id="skills" title="skills.sys" icon="⚡">
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
                color: tab === t.id ? 'var(--accent)' : 'var(--text-muted)',
                background:
                  tab === t.id ? 'rgba(124,106,255,0.12)' : 'transparent',
                border:
                  tab === t.id
                    ? '1px solid rgba(124,106,255,0.28)'
                    : '1px solid transparent',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer',
              }}
            >
              {tab === t.id && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'rgba(124,106,255,0.08)' }}
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
                  <IconCloud slugs={ICON_SLUGS} color="9d8fff" />
                </div>
                <p
                  className="absolute bottom-3 text-[10px]"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
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
  const meta = GROUP_META[group] ?? { color: '#7c6aff', icon: '○' };
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      className="rounded-xl p-3 flex flex-col gap-2"
      style={{
        background: `${meta.color}08`,
        border: `1px solid ${meta.color}25`,
      }}
    >
      {/* Category header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <span style={{ color: meta.color, fontSize: '12px' }}>{meta.icon}</span>
          <span
            className="text-xs font-semibold"
            style={{ color: meta.color, fontFamily: 'var(--font-mono)' }}
          >
            {group}
          </span>
        </div>
        <span
          className="text-[9px] px-1.5 py-0.5 rounded-full"
          style={{
            background: `${meta.color}18`,
            color: meta.color,
            fontFamily: 'var(--font-mono)',
          }}
        >
          {nodes.length}
        </span>
      </div>

      {/* Skill rows */}
      {nodes.map((node) => (
        <SkillBar key={node.id} node={node} color={meta.color} animate={mounted} />
      ))}
    </div>
  );
}

function SkillBar({ node, color, animate }: { node: SkillNode; color: string; animate: boolean }) {
  const pct = LEVEL_PCT[node.level];
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;
    barRef.current.style.width = animate ? `${pct}%` : '0%';
  }, [animate, pct]);

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
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
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
            background:
              node.level === 'Core'
                ? `linear-gradient(90deg, ${color}, var(--accent-2))`
                : node.level === 'Proficient'
                ? color
                : `${color}80`,
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
        const meta = GROUP_META[group] ?? { color: '#7c6aff', icon: '○' };
        return (
          <motion.div
            key={group}
            className="rounded-xl p-4 flex flex-col gap-3 cursor-default"
            style={{
              background: `${meta.color}06`,
              border: `1px solid ${meta.color}20`,
              minHeight: '120px',
            }}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          >
            {/* Header */}
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
                style={{ background: `${meta.color}20`, color: meta.color }}
              >
                {meta.icon}
              </div>
              <div>
                <p
                  className="text-xs font-semibold"
                  style={{ color: meta.color, fontFamily: 'var(--font-mono)' }}
                >
                  {group}
                </p>
                <p
                  className="text-[9px]"
                  style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
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
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    background: `${meta.color}12`,
                    border: `1px solid ${meta.color}30`,
                    color: n.level === 'Core' ? meta.color : 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
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

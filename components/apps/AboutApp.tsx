'use client';
import { motion } from 'framer-motion';
import { bio, timelineItems } from '@/lib/data';
import TypewriterText from '@/components/ui/TypewriterText';
import Window from '@/components/os/Window';

export default function AboutApp() {
  return (
    <Window id="about" title="about.app" icon="👤">
      <div className="h-full overflow-y-auto flex flex-row">
        {/* Left panel */}
        <div
          className="flex-shrink-0 w-52 flex flex-col items-center py-6 px-4 gap-4"
          style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Avatar */}
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center text-5xl"
              style={{
                border: '2px solid var(--accent)',
                boxShadow: '0 0 24px rgba(100,255,218,0.2)',
                background: 'rgba(100,255,218,0.05)',
              }}
            >
              🧑‍💻
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2"
              style={{ background: '#28c840', borderColor: 'var(--bg)' }}
            />
          </div>

          <div className="text-center">
            <h2 className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
              {bio.name}
            </h2>
            <p className="text-xs mt-1" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
              {bio.status}
            </p>
          </div>

          {/* Info rows */}
          <div className="w-full space-y-2 pt-2">
            {[
              { icon: '🎓', label: bio.university },
              { icon: '📍', label: bio.location },
              { icon: '📧', label: bio.email },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-2">
                <span className="text-sm flex-shrink-0">{item.icon}</span>
                <span className="text-[10px] leading-tight break-all" style={{ color: 'var(--text-muted)' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="flex gap-2 mt-auto pt-4">
            {[
              { label: 'GH', href: bio.github },
              { label: 'LI', href: bio.linkedin },
              { label: 'TW', href: bio.twitter },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] px-2 py-1 rounded transition-all"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = 'var(--accent)';
                  (e.target as HTMLElement).style.borderColor = 'var(--border-accent)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = 'var(--text-muted)';
                  (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Typewriter headline */}
          <div>
            <p className="text-xs mb-2" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
              $ whoami
            </p>
            <h1 className="text-xl font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
              <TypewriterText
                words={[
                  'Full Stack Engineer.',
                  'Backend Specialist.',
                  'AI Application Builder.',
                  'Final Year Student.',
                ]}
                speed={70}
              />
            </h1>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {bio.description}
          </p>

          {/* Timeline */}
          <div>
            <p className="text-xs mb-4" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
              $ cat journey.log
            </p>
            <div className="relative space-y-4">
              {/* Vertical line */}
              <div
                className="absolute left-[22px] top-0 bottom-0 w-px"
                style={{ background: 'rgba(100,255,218,0.15)' }}
              />
              {timelineItems.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex gap-4 relative"
                >
                  {/* Dot */}
                  <div
                    className="w-[10px] h-[10px] rounded-full flex-shrink-0 mt-1 ml-[18px]"
                    style={{ background: 'var(--accent)', boxShadow: '0 0 6px rgba(100,255,218,0.5)' }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-[10px]"
                        style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                      >
                        {item.year}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

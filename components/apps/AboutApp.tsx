'use client';
import { motion } from 'framer-motion';
import { User } from '@phosphor-icons/react';
import { bio, timelineItems } from '@/lib/data';
import TypewriterText from '@/components/ui/TypewriterText';
import Window from '@/components/os/Window';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function SocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        fontWeight: 500,
        color: 'var(--text-secondary)',
        textDecoration: 'none',
        transition: 'color 0.15s ease',
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
    >
      {children}
    </a>
  );
}

export default function AboutApp() {
  return (
    <Window id="about" title="about.nikhil" icon={<User weight="bold" size={14} />}>
      <div className="h-full overflow-y-auto" style={{ padding: '24px 28px 32px' }}>
        {/* Header: avatar + name + status */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}
        >
          {/* Squircle avatar */}
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              background: 'rgba(230,169,62,0.06)',
              border: '1.5px solid rgba(230,169,62,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.3rem',
                color: 'var(--accent)',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              NR
            </span>
          </div>

          <div>
            <h2
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              {bio.name}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 5 }}>
              <span className="relative flex" style={{ width: 6, height: 6 }}>
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ background: 'var(--accent)' }}
                />
                <span
                  className="relative inline-flex rounded-full"
                  style={{ width: 6, height: 6, background: 'var(--accent)' }}
                />
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--accent)',
                }}
              >
                {bio.status}
              </span>
            </div>
          </div>
        </motion.div>

        {/* $ whoami typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45, ease: EASE }}
          style={{ marginBottom: 20 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--accent)',
              marginBottom: 8,
            }}
          >
            $ whoami
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '1.35rem',
              fontWeight: 400,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
              margin: 0,
            }}
          >
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
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.45, ease: EASE }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
            marginBottom: 20,
          }}
        >
          {bio.description}
        </motion.p>

        {/* Details grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45, ease: EASE }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px 16px',
            marginBottom: 28,
            padding: '14px 16px',
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 8,
          }}
        >
          {[
            { label: 'university', value: bio.university },
            { label: 'location',   value: bio.location   },
            { label: 'email',      value: bio.email       },
          ].map((item) => (
            <div key={item.label}>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-tertiary)',
                  marginBottom: 2,
                }}
              >
                {item.label}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  color: 'var(--text-primary)',
                  wordBreak: 'break-all',
                }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.45, ease: EASE }}
          style={{ marginBottom: 28 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--accent)',
              marginBottom: 16,
            }}
          >
            $ cat journey.log
          </p>
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div
              style={{
                position: 'absolute',
                left: 4,
                top: 6,
                bottom: 6,
                width: 1,
                background: 'rgba(230,169,62,0.15)',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {timelineItems.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.4, ease: EASE }}
                  style={{ display: 'flex', gap: 16, position: 'relative' }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      flexShrink: 0,
                      marginTop: 3,
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          color: 'var(--accent)',
                        }}
                      >
                        {item.year}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                        }}
                      >
                        {item.title}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)',
                        marginTop: 2,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Social text links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45, ease: EASE }}
          style={{ display: 'flex', gap: 20 }}
        >
          <SocialLink href={bio.github}>GitHub</SocialLink>
          <SocialLink href={bio.linkedin}>LinkedIn</SocialLink>
          <SocialLink href={bio.twitter}>Twitter</SocialLink>
        </motion.div>
      </div>
    </Window>
  );
}

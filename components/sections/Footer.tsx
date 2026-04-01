'use client';
import { useState, useEffect } from 'react';
import { bio } from '@/lib/data';

const SOCIAL_LINKS = [
  { label: 'GitHub', href: bio.github },
  { label: 'LinkedIn', href: bio.linkedin },
  { label: 'Twitter/X', href: bio.twitter },
];

const LEGAL_LINKS = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

function TimeSpent() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const display = mins > 0 ? `${mins}m ${secs.toString().padStart(2, '0')}s` : `${secs}s`;

  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: 'var(--text-tertiary)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      here for {display}
    </span>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '24px 24px 32px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Social links row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 28,
          marginBottom: 20,
        }}
      >
        {SOCIAL_LINKS.map((link) => (
          <FooterLink key={link.label} href={link.href} amber>
            {link.label}
          </FooterLink>
        ))}
      </div>

      {/* Bottom row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-tertiary)',
          }}
        >
          Nikhil Raj © 2026
        </span>

        <TimeSpent />

        <div style={{ display: 'flex', gap: 20 }}>
          {LEGAL_LINKS.map((link) => (
            <FooterLink key={link.label} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  amber = false,
}: {
  href: string;
  children: React.ReactNode;
  amber?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.8rem',
        fontWeight: 500,
        textDecoration: 'none',
        color: amber
          ? hovered
            ? 'var(--accent)'
            : 'var(--text-secondary)'
          : hovered
            ? 'var(--text-secondary)'
            : 'var(--text-tertiary)',
        transition: 'color 0.15s ease',
      }}
    >
      {children}
    </a>
  );
}

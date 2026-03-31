'use client';
import { useState, useEffect } from 'react';

export default function TypewriterText({
  words,
  className = '',
  speed = 80,
  pause = 2000,
}: {
  words: string[];
  className?: string;
  speed?: number;
  pause?: number;
}) {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }

    setDisplayed(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return (
    <span className={className}>
      {displayed}
      <span
        className="cursor-blink"
        style={{
          display: 'inline-block',
          width: 2,
          height: '0.9em',
          background: 'var(--accent)',
          verticalAlign: 'text-bottom',
          borderRadius: 1,
          marginLeft: 2,
        }}
      />
    </span>
  );
}

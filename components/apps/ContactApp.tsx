'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bio } from '@/lib/data';
import Window from '@/components/os/Window';
import { playMessageSent, playMessageReceived, playErrorSound } from '@/lib/sounds';

type Message = {
  id: string;
  text: string;
  sender: 'nikhil' | 'visitor';
  time: string;
};

const now = () =>
  new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

const INITIAL_MESSAGES: Message[] = [
  { id: '1', text: "Hey! 👋 I'm Nikhil. Glad you stopped by.", sender: 'nikhil', time: now() },
  {
    id: '2',
    text: "Feel free to drop a message — whether it's about a project, opportunity, or just a hello.",
    sender: 'nikhil',
    time: now(),
  },
];

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: bio.github,
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: bio.linkedin,
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: bio.twitter,
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function ContactApp() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || sending) return;
    const text = input.trim();
    setInput('');
    setSending(true);

    const visitorMsg: Message = { id: Date.now().toString(), text, sender: 'visitor', time: now() };
    setMessages((m) => [...m, visitorMsg]);
    playMessageSent();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      let replyText = "Hmm, something went wrong sending that. Try emailing me directly at raj.nikhil.tech@gmail.com 🙏";
      if (res.ok) {
        replyText = "Got it! 🙌 I'll get back to you soon. In the meantime, feel free to check out my projects.";
      } else if (res.status === 429) {
        replyText = "Whoa, slow down! Please wait a few minutes before sending another message.";
      }

      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: replyText,
        sender: 'nikhil',
        time: now(),
      };

      setMessages((m) => [...m, reply]);
      if (res.ok) {
        setSent(true);
        playMessageReceived();
      } else {
        playErrorSound();
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: (Date.now() + 1).toString(),
          text: "Network error — try emailing me directly at raj.nikhil.tech@gmail.com 🙏",
          sender: 'nikhil',
          time: now(),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <Window id="contact" title="messages.app" icon="💬">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* ── Header ────────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
            flexShrink: 0,
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'rgba(230,169,62,0.08)',
              border: '1.5px solid rgba(230,169,62,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            🧑‍💻
          </div>

          {/* Name + status */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              Nikhil Raj
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
              <span
                style={{
                  display: 'inline-block',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#28c840',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-tertiary)',
                }}
              >
                Active now
              </span>
            </div>
          </div>
        </div>

        {/* ── Social link bar ───────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            padding: '8px 16px',
            flexWrap: 'wrap',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(230,169,62,0.02)',
            flexShrink: 0,
          }}
        >
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`Open ${s.label}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '4px 10px',
                borderRadius: 20,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.09)',
                transition: 'all 0.15s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = 'rgba(230,169,62,0.1)';
                el.style.borderColor = 'rgba(230,169,62,0.35)';
                el.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = 'rgba(255,255,255,0.04)';
                el.style.borderColor = 'rgba(255,255,255,0.09)';
                el.style.color = 'var(--text-secondary)';
              }}
            >
              <span style={{ opacity: 0.8 }}>{s.icon}</span>
              {s.label}
              <span style={{ opacity: 0.45, fontSize: '0.6rem' }}>↗</span>
            </a>
          ))}
        </div>

        {/* ── Messages ──────────────────────────────────────────── */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                style={{ display: 'flex', justifyContent: msg.sender === 'visitor' ? 'flex-end' : 'flex-start' }}
              >
                <div style={{ maxWidth: '75%' }}>
                  <div
                    style={{
                      padding: '8px 12px',
                      borderRadius: 16,
                      fontSize: '0.85rem',
                      lineHeight: 1.55,
                      fontFamily: 'var(--font-sans)',
                      ...(msg.sender === 'nikhil'
                        ? {
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.09)',
                            color: 'var(--text-primary)',
                            borderBottomLeftRadius: 4,
                          }
                        : {
                            background: 'rgba(230,169,62,0.12)',
                            border: '1px solid rgba(230,169,62,0.28)',
                            color: 'var(--accent)',
                            borderBottomRightRadius: 4,
                          }),
                    }}
                  >
                    {msg.text}
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      color: 'var(--text-tertiary)',
                      marginTop: 4,
                      textAlign: msg.sender === 'visitor' ? 'right' : 'left',
                    }}
                  >
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {sending && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex' }}>
              <div
                style={{
                  padding: '8px 14px',
                  borderRadius: 16,
                  borderBottomLeftRadius: 4,
                  display: 'flex',
                  gap: 4,
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.09)',
                }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--text-tertiary)' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* ── Input ─────────────────────────────────────────────── */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 12px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder={sent ? 'Send another message...' : 'Type a message...'}
            disabled={sending}
            style={{
              flex: 1,
              fontSize: '0.85rem',
              padding: '8px 12px',
              borderRadius: 20,
              outline: 'none',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
              transition: 'border-color 0.15s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'rgba(230,169,62,0.35)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
          />
          <button
            onClick={send}
            disabled={!input.trim() || sending}
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              background: input.trim() ? 'rgba(230,169,62,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${input.trim() ? 'rgba(230,169,62,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: input.trim() ? 'var(--accent)' : 'var(--text-tertiary)',
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              fontSize: 16,
              transition: 'all 0.15s ease',
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </Window>
  );
}

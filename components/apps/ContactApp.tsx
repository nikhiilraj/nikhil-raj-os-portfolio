'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bio } from '@/lib/data';
import Window from '@/components/os/Window';

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
  { id: '2', text: 'Feel free to drop a message — whether it\'s about a project, opportunity, or just a hello.', sender: 'nikhil', time: now() },
];

const SOCIAL_LINKS = [
  { label: 'GitHub', icon: '⌥', href: bio.github, color: '#ccd6f6' },
  { label: 'LinkedIn', icon: '🔗', href: bio.linkedin, color: '#5e81f4' },
  { label: 'Twitter', icon: '✦', href: bio.twitter, color: '#4cc9f0' },
  { label: 'Email', icon: '✉', href: `mailto:${bio.email}`, color: '#64ffda' },
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

    // Simulate send + auto-reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: "Got it! 🙌 I'll get back to you soon. In the meantime, feel free to check out my projects.",
        sender: 'nikhil',
        time: now(),
      };
      setMessages((m) => [...m, reply]);
      setSending(false);
      setSent(true);
    }, 1200);
  };

  return (
    <Window id="contact" title="messages.app" icon="💬">
      <div className="h-full flex flex-col">
        {/* Contact header */}
        <div
          className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-base"
            style={{
              background: 'rgba(100,255,218,0.1)',
              border: '1px solid rgba(100,255,218,0.3)',
            }}
          >
            🧑‍💻
          </div>
          <div>
            <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Nikhil Raj</p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#28c840' }} />
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Active now</p>
            </div>
          </div>

          {/* Social pills */}
          <div className="flex gap-1.5 ml-auto">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all"
                title={s.label}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = s.color + '60';
                  el.style.background = s.color + '15';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(255,255,255,0.1)';
                  el.style.background = 'rgba(255,255,255,0.04)';
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`flex ${msg.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[75%]">
                  <div
                    className="px-3 py-2 rounded-2xl text-sm leading-relaxed"
                    style={
                      msg.sender === 'nikhil'
                        ? {
                            background: 'rgba(255,255,255,0.07)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'var(--text-primary)',
                            borderBottomLeftRadius: '4px',
                          }
                        : {
                            background: 'rgba(100,255,218,0.12)',
                            border: '1px solid rgba(100,255,218,0.25)',
                            color: 'var(--accent)',
                            borderBottomRightRadius: '4px',
                          }
                    }
                  >
                    {msg.text}
                  </div>
                  <p
                    className={`text-[9px] mt-1 ${msg.sender === 'visitor' ? 'text-right' : 'text-left'}`}
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                  >
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {sending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div
                className="px-4 py-2 rounded-2xl rounded-bl-[4px] flex gap-1 items-center"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--text-muted)' }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div
          className="flex-shrink-0 flex items-center gap-2 px-3 py-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder={sent ? 'Message sent! Send another...' : 'Type a message...'}
            className="flex-1 text-sm px-3 py-2 rounded-xl outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'rgba(100,255,218,0.3)')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            disabled={sending}
          />
          <button
            onClick={send}
            disabled={!input.trim() || sending}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all flex-shrink-0"
            style={{
              background: input.trim() ? 'rgba(100,255,218,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${input.trim() ? 'rgba(100,255,218,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: input.trim() ? 'var(--accent)' : 'var(--text-muted)',
              cursor: input.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </Window>
  );
}

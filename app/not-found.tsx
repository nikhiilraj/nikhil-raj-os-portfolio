import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#09090b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-jetbrains, "JetBrains Mono"), monospace',
      }}
    >
      {/* Grain overlay */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0.035,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        style={{
          width: 480,
          maxWidth: 'calc(100vw - 32px)',
          background: '#111114',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.55)',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 40,
            padding: '0 14px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', gap: 6 }}>
            {(['#ff5f57', '#ffbd2e', '#28c840'] as const).map((c) => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <span style={{ fontSize: 12, color: '#56565f' }}>nikhil@dev ~ %</span>
        </div>

        {/* Terminal body */}
        <div style={{ padding: '24px 24px 28px', lineHeight: 1.8 }}>
          {/* Command 1 */}
          <p style={{ fontSize: '0.85rem', margin: 0 }}>
            <span style={{ color: '#56565f' }}>$ </span>
            <span style={{ color: '#8a8a96' }}>cd /page-not-found</span>
          </p>

          {/* Error output */}
          <p style={{ fontSize: '0.85rem', margin: 0, color: '#ff5f57', paddingLeft: '1.1rem' }}>
            bash: /page-not-found: No such file or directory
          </p>

          {/* Blank */}
          <div style={{ height: 8 }} />

          {/* Suggestion */}
          <p style={{ fontSize: '0.85rem', margin: 0 }}>
            <span style={{ color: '#56565f' }}>$ </span>
            <span style={{ color: '#8a8a96' }}>echo &quot;try: cd /home&quot;</span>
          </p>
          <p style={{ fontSize: '0.85rem', margin: 0, paddingLeft: '1.1rem', color: '#e8e8ec' }}>
            try:{' '}
            <Link
              href="/"
              style={{
                color: '#e6a93e',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(230,169,62,0.3)',
              }}
            >
              cd /home ↗
            </Link>
          </p>

          {/* Blank + blinking cursor */}
          <div style={{ height: 16 }} />
          <p style={{ fontSize: '0.85rem', margin: 0 }}>
            <span style={{ color: '#56565f' }}>$ </span>
            <span
              style={{
                display: 'inline-block',
                width: 7,
                height: 13,
                background: '#e6a93e',
                verticalAlign: 'text-bottom',
                borderRadius: 1,
                animation: 'cursor-blink 1s steps(1) infinite',
              }}
            />
          </p>
        </div>
      </div>

      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

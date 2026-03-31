'use client';
import { File } from '@phosphor-icons/react';
import { bio } from '@/lib/data';
import Window from '@/components/os/Window';

export default function ResumeApp() {
  return (
    <Window id="resume" title="resume.pdf — Preview" icon={<File weight="bold" size={14} />}>
      <div className="h-full flex flex-col">
        {/* Preview toolbar */}
        <div
          className="flex items-center justify-between px-4 py-2 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="flex items-center gap-2">
            <File weight="bold" size={16} style={{ color: 'var(--text-secondary)' }} />
            <div>
              <p className="text-xs font-medium" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                Nikhil_Raj_Resume.pdf
              </p>
              <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>1 page</p>
            </div>
          </div>
          <a
            href={bio.resume}
            download="Nikhil_Raj_Resume.pdf"
            className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: 'rgba(230,169,62,0.08)',
              border: '1px solid rgba(230,169,62,0.25)',
              color: 'var(--accent)',
              fontFamily: 'var(--font-mono)',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(230,169,62,0.14)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(230,169,62,0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(230,169,62,0.08)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(230,169,62,0.25)';
            }}
          >
            ↓ Download
          </a>
        </div>

        {/* PDF content */}
        <div
          className="flex-1 overflow-hidden flex items-center justify-center p-4"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <div
            className="w-full max-w-md h-full max-h-[440px] rounded-lg overflow-y-auto p-8 space-y-5"
            style={{
              background: 'rgba(255,255,255,0.97)',
              color: '#1a1a2e',
              fontFamily: 'Georgia, serif',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header */}
            <div className="text-center border-b border-gray-200 pb-4">
              <h1 className="text-xl font-bold text-gray-900">Nikhil Raj</h1>
              <p className="text-sm text-gray-600 mt-1">Backend Engineer | Go | TypeScript | Distributed Systems</p>
              <p className="text-[11px] text-gray-500 mt-1">raj.nikhil.tech@gmail.com · github.com/nikhiilraj · linkedin.com/in/nikhilraj-dev</p>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Education</h2>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">B.Tech Computer Science & Engineering</p>
                  <p className="text-xs text-gray-500">IIIT, Nagpur</p>
                </div>
                <p className="text-xs text-gray-500">2021 – 2025</p>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Experience</h2>
              <div>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-gray-800">Corporate Lead – Iotics & ECell</p>
                  <p className="text-xs text-gray-500">2024 – 2025</p>
                </div>
                <p className="text-xs text-gray-500 mb-1">IIIT Nagpur</p>
                <p className="text-xs text-gray-600 text-justify">Spearheaded outreach and negotiated 8L+ INR in corporate sponsorships. Directed a cross-functional team of 20+ members to deliver events for 10,000+ attendees.</p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Skills</h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Go · TypeScript · Python · Node.js · PostgreSQL · AWS (EC2, Lambda) · Docker · Terraform · PostGIS
              </p>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Projects</h2>
              <div className="space-y-2">
                {[
                  'RoomScout — Cloud-Native Multi-Tenant Rental Marketplace',
                  'Orbit — System.Alpha — Geospatial Emergency Coordination',
                  'SharkTankLang — Custom DSL Interpreter Ecosystem'
                ].map((p) => (
                  <p key={p} className="text-xs text-gray-600 leading-tight">• {p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

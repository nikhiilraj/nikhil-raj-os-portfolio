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
              <p className="text-sm text-gray-600 mt-1">Full Stack Engineer · AI Applications</p>
              <p className="text-xs text-gray-500 mt-1">nikhilraj@email.com · github.com/nikhilraj · linkedin.com/in/nikhilraj</p>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Education</h2>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">B.Tech Computer Science</p>
                  <p className="text-xs text-gray-500">Your University</p>
                </div>
                <p className="text-xs text-gray-500">2021 – 2025</p>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Experience</h2>
              <div>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-gray-800">Backend Engineer Intern</p>
                  <p className="text-xs text-gray-500">2024</p>
                </div>
                <p className="text-xs text-gray-500 mb-1">Company Name · Remote</p>
                <p className="text-xs text-gray-600">Built and deployed REST APIs, integrated LLM features, improved backend performance by 30%.</p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Skills</h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                React · Next.js · Node.js · Python · FastAPI · LangChain · PostgreSQL · Redis · Docker · Git
              </p>
            </div>

            {/* Projects */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Projects</h2>
              <div className="space-y-2">
                {['IntelliChat — LangChain RAG customer support platform', 'DocuMind — PDF Q&A SaaS with vector search', 'FlowAPI — High-performance API gateway'].map((p) => (
                  <p key={p} className="text-xs text-gray-600">• {p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

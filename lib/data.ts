export const bio = {
  name: 'Nikhil Raj',
  tagline: 'Full Stack Engineer · Backend & AI Applications',
  description:
    "Final year CS student who builds full-stack products with AI at the core. I'm obsessed with how AI changes what software can do — and I build the backend systems that make it real.",
  university: 'Your University, City',
  location: 'India',
  avatar: '/avatar.jpg',
  status: 'Open to opportunities',
  email: 'nikhilraj@email.com',
  github: 'https://github.com/nikhilraj',
  linkedin: 'https://linkedin.com/in/nikhilraj',
  twitter: 'https://twitter.com/nikhilraj',
  resume: '/resume.pdf',
};

export type Project = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  longDescription: string;
  tech: string[];
  github?: string;
  live?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'IntelliChat',
    emoji: '🤖',
    description: 'AI-powered customer support platform with LangChain RAG pipeline',
    longDescription:
      'Built a production-grade customer support system that uses retrieval-augmented generation to answer queries from a knowledge base. Features real-time streaming responses, context memory, and a fallback escalation system.',
    tech: ['Next.js', 'FastAPI', 'LangChain', 'PostgreSQL', 'OpenAI'],
    github: '#',
    live: '#',
    featured: true,
  },
  {
    id: 'proj-2',
    name: 'FlowAPI',
    emoji: '⚡',
    description: 'High-performance REST API gateway with rate limiting and auth',
    longDescription:
      'A developer-first API gateway built with Node.js and Express. Handles 10k+ req/s with Redis-backed rate limiting, JWT auth, and a built-in analytics dashboard.',
    tech: ['Node.js', 'Express', 'Redis', 'PostgreSQL', 'Docker'],
    github: '#',
    featured: false,
  },
  {
    id: 'proj-3',
    name: 'DocuMind',
    emoji: '📄',
    description: 'Upload documents, ask questions — AI reads them for you',
    longDescription:
      'A SaaS tool that lets users upload PDFs and query them via a chat interface. Uses vector embeddings and semantic search to find relevant chunks before passing to the LLM.',
    tech: ['React', 'Python', 'FastAPI', 'Pinecone', 'LangChain'],
    github: '#',
    live: '#',
    featured: false,
  },
  {
    id: 'proj-4',
    name: 'CodePulse',
    emoji: '📊',
    description: 'Real-time developer productivity tracker with GitHub integration',
    longDescription:
      'Connects to GitHub via OAuth, analyzes commit patterns, PR cycles, and code churn to produce weekly productivity reports. Built with Next.js and a time-series database.',
    tech: ['Next.js', 'TypeScript', 'GitHub API', 'TimescaleDB'],
    github: '#',
    featured: false,
  },
  {
    id: 'proj-5',
    name: 'TaskFlow',
    emoji: '✅',
    description: 'Collaborative task manager with AI-generated subtask breakdown',
    longDescription:
      'A project management tool where you describe a goal and AI breaks it into actionable subtasks with time estimates. Team members can assign and track tasks in real-time.',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'OpenAI'],
    github: '#',
    live: '#',
    featured: false,
  },
];

export type SkillNode = {
  id: string;
  label: string;
  group: 'Frontend' | 'Backend' | 'AI' | 'Tools';
  level: 'Core' | 'Proficient' | 'Familiar';
};

export type SkillLink = {
  source: string;
  target: string;
};

export const skills: { nodes: SkillNode[]; links: SkillLink[] } = {
  nodes: [
    // Frontend
    { id: 'react', label: 'React', group: 'Frontend', level: 'Core' },
    { id: 'nextjs', label: 'Next.js', group: 'Frontend', level: 'Core' },
    { id: 'typescript', label: 'TypeScript', group: 'Frontend', level: 'Core' },
    { id: 'tailwind', label: 'Tailwind CSS', group: 'Frontend', level: 'Proficient' },
    // Backend
    { id: 'nodejs', label: 'Node.js', group: 'Backend', level: 'Core' },
    { id: 'express', label: 'Express', group: 'Backend', level: 'Core' },
    { id: 'python', label: 'Python', group: 'Backend', level: 'Core' },
    { id: 'fastapi', label: 'FastAPI', group: 'Backend', level: 'Core' },
    { id: 'postgres', label: 'PostgreSQL', group: 'Backend', level: 'Proficient' },
    { id: 'redis', label: 'Redis', group: 'Backend', level: 'Proficient' },
    { id: 'mongodb', label: 'MongoDB', group: 'Backend', level: 'Proficient' },
    // AI
    { id: 'langchain', label: 'LangChain', group: 'AI', level: 'Core' },
    { id: 'openai', label: 'OpenAI API', group: 'AI', level: 'Core' },
    { id: 'rag', label: 'RAG Systems', group: 'AI', level: 'Core' },
    { id: 'embeddings', label: 'Vector DBs', group: 'AI', level: 'Proficient' },
    // Tools
    { id: 'docker', label: 'Docker', group: 'Tools', level: 'Proficient' },
    { id: 'git', label: 'Git', group: 'Tools', level: 'Core' },
    { id: 'vercel', label: 'Vercel', group: 'Tools', level: 'Proficient' },
  ],
  links: [
    { source: 'react', target: 'nextjs' },
    { source: 'react', target: 'typescript' },
    { source: 'nextjs', target: 'typescript' },
    { source: 'nextjs', target: 'tailwind' },
    { source: 'nodejs', target: 'express' },
    { source: 'python', target: 'fastapi' },
    { source: 'fastapi', target: 'langchain' },
    { source: 'nodejs', target: 'postgres' },
    { source: 'nodejs', target: 'redis' },
    { source: 'langchain', target: 'openai' },
    { source: 'langchain', target: 'rag' },
    { source: 'rag', target: 'embeddings' },
    { source: 'nextjs', target: 'vercel' },
    { source: 'nodejs', target: 'docker' },
    { source: 'fastapi', target: 'docker' },
    { source: 'git', target: 'docker' },
  ],
};

export const timelineItems = [
  { year: '2021', title: 'Started CS Degree', desc: 'Fell in love with backend systems in first semester.' },
  { year: '2022', title: 'First Real Project', desc: 'Built a REST API that actually got used by classmates.' },
  { year: '2023', title: 'Discovered AI Applications', desc: 'LangChain dropped. Everything changed.' },
  { year: '2024', title: 'Internship', desc: 'Backend engineer intern — shipped features to production.' },
  { year: '2025', title: 'Final Year', desc: 'Building, learning, and looking for what comes next.' },
];

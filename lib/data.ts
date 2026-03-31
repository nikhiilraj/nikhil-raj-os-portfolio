export const bio = {
  name: 'Nikhil Raj',
  tagline: 'Backend Engineer | Go | TypeScript | Distributed Systems | Cloud-Native Infrastructure',
  description:
    "Final year CS student and Backend Engineer who builds high-availability cloud-native systems. I'm obsessed with distributed systems, API performance, and building the backend infrastructure that makes software real.",
  university: 'IIIT, Nagpur',
  location: 'India',
  avatar: '/avatar.jpeg',
  status: 'Open to opportunities',
  email: 'raj.nikhil.tech@gmail.com',
  github: 'https://github.com/nikhiilraj',
  linkedin: 'https://www.linkedin.com/in/nikhilraj-dev/',
  twitter: 'https://x.com/nikhilraj__',
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
    name: 'RoomScout',
    emoji: '🏢',
    description: 'Cloud-Native Multi-Tenant Rental Marketplace',
    longDescription:
      'Designed and delivered a distributed multi-tenant rental marketplace with SSR and RBAC for 10,000+ entities. Introduced server-side spatial indexing (GiST) in PostgreSQL to eliminate query bottlenecks, achieving a 60% reduction in response payload and 40% improvement in P95 latency. Provisioned a high-availability AWS environment (EC2, API Gateway, Cognito).',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
    github: '#',
    live: '#',
    featured: true,
  },
  {
    id: 'proj-2',
    name: 'Orbit — System.Alpha',
    emoji: '🛰️',
    description: 'Geospatial Emergency Coordination System',
    longDescription:
      'Architected a real-time event-driven backend with a persistent WebSocket mesh, cutting data propagation lag by 92.4% and achieving sub-85ms end-to-end latency. Remediated geospatial query performance across 150,000+ telemetry nodes using PostGIS GiST indexing, reducing CPU overhead by 68.2%. Scaled throughput via asymmetric edge deployment.',
    tech: ['TypeScript', 'WebSockets', 'PostGIS', 'Vercel', 'Render'],
    github: '#',
    featured: true,
  },
  {
    id: 'proj-3',
    name: 'SharkTankLang',
    emoji: '🦈',
    description: 'Custom DSL Interpreter & Developer Ecosystem',
    longDescription:
      'Conceived and built a Domain-Specific Language (DSL) with a Lexer and Recursive Descent Parser enabling isolated code execution. Developed a cloud-integrated browser IDE running custom syntax in under 100ms. Established CI/CD pipelines enforcing test coverage and automating releases.',
    tech: ['Python', 'FastAPI', 'GitHub Actions'],
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
    { id: 'go', label: 'Go', group: 'Backend', level: 'Core' },
    { id: 'typescript', label: 'TypeScript', group: 'Frontend', level: 'Core' },
    { id: 'python', label: 'Python', group: 'Backend', level: 'Core' },
    { id: 'nodejs', label: 'Node.js', group: 'Backend', level: 'Core' },
    { id: 'sql', label: 'SQL', group: 'Backend', level: 'Core' },
    { id: 'postgres', label: 'PostgreSQL', group: 'Backend', level: 'Core' },
    { id: 'postgis', label: 'PostGIS', group: 'Backend', level: 'Core' },
    { id: 'aws', label: 'AWS', group: 'Tools', level: 'Core' },
    { id: 'docker', label: 'Docker', group: 'Tools', level: 'Core' },
    { id: 'k8s', label: 'Kubernetes', group: 'Tools', level: 'Proficient' },
    { id: 'terraform', label: 'Terraform', group: 'Tools', level: 'Proficient' },
    { id: 'prometheus', label: 'Prometheus', group: 'Tools', level: 'Proficient' },
    { id: 'grafana', label: 'Grafana', group: 'Tools', level: 'Proficient' },
    { id: 'fastapi', label: 'FastAPI', group: 'Backend', level: 'Proficient' },
    { id: 'nextjs', label: 'Next.js', group: 'Frontend', level: 'Proficient' },
  ],
  links: [
    { source: 'go', target: 'postgres' },
    { source: 'typescript', target: 'nodejs' },
    { source: 'typescript', target: 'nextjs' },
    { source: 'python', target: 'fastapi' },
    { source: 'postgres', target: 'postgis' },
    { source: 'nodejs', target: 'aws' },
    { source: 'docker', target: 'k8s' },
    { source: 'docker', target: 'terraform' },
    { source: 'prometheus', target: 'grafana' },
    { source: 'k8s', target: 'prometheus' },
    { source: 'aws', target: 'docker' }
  ],
};

export const timelineItems = [
  { year: '2020', title: 'Started CS Degree', desc: 'B.Tech in Computer Science & Engineering at IIIT Nagpur.' },
  { year: '2024', title: 'Python & Build Infrastructure', desc: 'Built SharkTankLang (DSL interpreter) & managed automated CI/CD releases.' },
  { year: '2024', title: 'Corporate Lead', desc: 'Negotiated sponsorships & managed inter-team operations at IIIT Nagpur.' },
  { year: '2025', title: 'High-Availability Backends', desc: 'Architected Orbit event-driven systems and RoomScout multi-tenant platform.' },
  { year: '2026', title: 'Graduation', desc: 'Looking forward to building scalable systems in production environments.' },
];

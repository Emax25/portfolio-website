import type { ExperienceEntry } from './types';

export const experiences: ExperienceEntry[] = [
  {
    id: 'cantor-fitzgerald',
    company: 'Cantor Fitzgerald & Co.',
    role: 'Quantitative Developer Intern',
    startDate: 'May 2026',
    endDate: 'Present',
    description: [
      'Migrated 20+ studies and signals from a legacy R codebase to Python, cutting runtimes ~500x and extending coverage from daily to hourly intraday data.',
      'Designed a layered market/asset object model with one query interface for cross-asset, cross-timeframe research.',
      'Integrated the Bloomberg API and exposed the backend through a Flask REST API with a front-end UI for internal use.',
      'Added an OpenAI-powered natural-language layer that lets a non-technical Managing Director self-serve historical market data (built with Cursor and Claude under GitLab).'
    ],
    tags: ['Python', 'R', 'Bloomberg API', 'Flask', 'GitLab', 'LLMs'],
    featured: true
  },
  {
    id: 'exponential-tech',
    company: 'Exponential Technology Inc.',
    role: 'Quantitative Researcher (UChicago Project Lab)',
    startDate: 'Jan 2026',
    endDate: 'Mar 2026',
    description: [
      'Built a Python pipeline matching 40 SEC 13F filings to daily equity flows for stock-level positioning analysis.',
      'Engineered event-driven tools and dual-axis visualizations quantifying flow changes at 1-, 7-, and 30-day horizons, integrated into the firm’s proprietary dashboard.'
    ],
    tags: ['Python', 'Pandas', 'SEC 13F', 'Data Visualization', 'Event Studies'],
    featured: true
  },
  {
    id: 'bodhi-research',
    company: 'Bodhi Research Group',
    role: 'Quantitative Research Intern',
    startDate: 'Sep 2025',
    endDate: 'Dec 2025',
    description: [
      'Developed a return-persistence feature and a modified gain-to-pain ratio for a proprietary model scoring ~200 emerging hedge-fund managers.',
      'Increased the portfolio’s Omega ratio by 20%.'
    ],
    tags: ['Python', 'Time-Series Analysis', 'Hedge Fund Classification', 'Portfolio Optimization', 'Risk Metrics'],
    featured: true
  },
  {
    id: 'cs-teaching-assistant',
    company: 'University of Chicago (Dept. of Computer Science)',
    role: 'Teaching Assistant & Grader',
    location: 'Chicago, IL',
    startDate: 'Jan 2024',
    endDate: 'Mar 2026',
    description: [
      'Teaching Assistant for computer science courses (Jan–Mar 2026 and Sep–Dec 2024).',
      'Grader for computer science coursework (Jan–Jun 2024).'
    ],
    tags: ['Computer Science', 'Teaching', 'Mentorship'],
    featured: true
  },
  {
    id: 'astri',
    company: 'ASTRI (Hong Kong Applied Science and Technology Research Institute)',
    role: 'FinTech Intern',
    location: 'Hong Kong',
    startDate: 'Jun 2024',
    endDate: 'Aug 2024',
    description: [
      'Conducted honeypot and cybersecurity vulnerability research.',
      'Prepared technical research reports on findings.'
    ],
    tags: ['FinTech', 'Cybersecurity', 'Honeypots', 'Vulnerability Research'],
    featured: true
  },
  {
    id: 'texchange-unbrokered',
    company: 'TexChange Unbrokered Inc.',
    role: 'Software Developer Intern',
    startDate: 'Sep 2023',
    endDate: 'Dec 2023',
    description: [
      'Developed and optimized application features using Firebase/Firestore and Flutter.'
    ],
    tags: ['Flutter', 'Dart', 'Firebase', 'Firestore'],
    featured: false
  },
  {
    id: 'advance-illinois',
    company: 'Advance Illinois (UChicago Tech Team)',
    role: 'UI Design',
    startDate: 'Apr 2023',
    endDate: 'Jun 2023',
    description: [
      'Designed and built a React.js web application for automated Excel-processing and data parsing.'
    ],
    tags: ['React', 'JavaScript', 'Excel Parsing'],
    featured: false
  },
  {
    id: 'glas-education',
    company: 'GLAS Education',
    role: 'SEAS Intern',
    startDate: 'Jun 2022',
    endDate: 'Aug 2022',
    description: [
      'Processed and analyzed astrophysics images using scientific Python packages.'
    ],
    tags: ['Python', 'Astrophysics', 'Image Processing'],
    featured: false
  }
];

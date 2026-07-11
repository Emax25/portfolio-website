import type { EducationEntry } from './types';

export const education: EducationEntry[] = [
  {
    id: 'uchicago-msfm',
    institution: 'University of Chicago',
    degree: 'M.S. in Financial Mathematics',
    location: 'Chicago, IL',
    startDate: 'Sep 2025',
    endDate: 'Expected Dec 2026',
    courses: [
      'Stochastic Calculus',
      'Algorithmic Game Theory',
      'Time-Series Analysis',
      'Monte Carlo Simulation',
      'Multivariate Statistical Analysis',
      'Generative & Agentic AI for Finance',
      'Options',
      'Portfolio & Risk Management',
      'Probability & Stochastic Processes',
      'Computing for Finance in Python',
      'FX Markets'
    ],
    details: [
      'Graduate coursework in stochastic modeling, simulation, statistics, and computational finance.'
    ]
  },
  {
    id: 'uchicago-ugrad',
    institution: 'University of Chicago',
    degree: 'B.S. in Astrophysics & B.S. in Computer Science',
    location: 'Chicago, IL',
    endDate: 'Conferred Jun 2025',
    courses: [
      'Mathematical Foundations of Machine Learning',
      'Neural Networks',
      'Natural Language Processing',
      'Adversarial Machine Learning',
      'Machine Learning for Computer Systems',
      'Statistical Models and Methods',
      'Theory of Algorithms',
      'Discrete Mathematics',
      'Honors Combinatorics',
      'Database Systems',
      'Computer Architecture',
      'Mathematical Methods in the Physical Sciences I–III'
    ],
    details: [
      'Computer Science degree with a Machine Learning specialization.'
    ]
  }
];

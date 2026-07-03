export type ChartKind = 'equity-curve' | 'line' | 'bar' | 'distribution' | 'confusion-matrix';

export interface ChartSpec {
  kind: ChartKind;
  dataSrc: string;
  illustrative: boolean;
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export interface Project {
  slug: string;
  title: string;
  year: string;
  summary: string;
  tags: string[];
  problem: string[];
  approach: string[];
  results: string[];
  metrics: {
    label: string;
    value: string;
    note?: string;
  }[];
  charts: ChartSpec[];
  links?: {
    label: string;
    href: string;
  }[];
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  bio: string[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string[];
  tags: string[];
  featured: boolean;
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate?: string;
  endDate: string;
  gpa?: string;
  details?: string[];
  courses?: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface HonorEntry {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  description?: string;
}

import type { AboutCards, Profile } from './types';

export const profile: Profile = {
  name: 'Charlie Carvajal',
  title: 'M.S. Financial Mathematics @ UChicago — Quantitative Research, Trading, and Development',
  location: 'Chicago, IL',
  email: 'carvajalchar25@uchicago.edu',
  linkedin: 'https://linkedin.com/in/carvajalchar',
  github: 'https://github.com/Emax25',
  bio: [
    'I am a computational problem solver and financial engineering student currently pursuing an M.S. in Financial Mathematics at the University of Chicago. With dual undergraduate degrees in Astrophysics and Computer Science (Machine Learning specialization) from UChicago, I bring a rigorous mathematical foundation and deep technical toolkit to quantitative research, trading, and development.',
    'My experience ranges from migrating legacy R-based signaling pipelines to high-performance Python, building firm-wide visualization dashboards, and analyzing time-series datasets to model portfolio optimization. I thrive at the intersection of statistical modeling, machine learning, and high-performance computing to solve complex problems in financial markets.'
  ]
};

export const aboutCards: AboutCards = {
  philosophy: {
    title: 'Foundational Philosophy',
    body: 'Applying rigorous scientific inquiry from astrophysics and computational systems modeling to formulate, optimize, and test quantitative trading strategies.',
  },
  currentFocus: {
    label: 'Current Focus',
    heading: 'University of Chicago',
    body: 'Pursuing MSFM. Combining stochastic processes, statistical time-series, options pricing, and high-performance computing to build robust financial systems.',
  },
};

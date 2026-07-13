import type { AboutCards, Profile } from './types';

export const profile: Profile = {
  name: 'Charlie Carvajal',
  title: 'M.S. Financial Mathematics @ UChicago · Quantitative Research, Trading, and Development',
  location: 'Chicago, IL',
  email: 'carvajalchar25@uchicago.edu',
  linkedin: 'https://linkedin.com/in/carvajalchar',
  github: 'https://github.com/Emax25',
  bio: [
    'I am finishing an M.S. in Financial Mathematics at the University of Chicago, where I also earned undergraduate degrees in Astrophysics and Computer Science with a machine learning specialization. I started in astrophysics, found that the modeling and the statistics were the parts of the work I cared about most, and followed them into quantitative finance.',
    'At Cantor Fitzgerald I have migrated 20+ studies and signals from legacy R to Python, which cut runtimes roughly 500x and extended coverage from daily to hourly intraday data. Before that I built a pipeline matching 40 SEC 13F filings to daily equity flows at Exponential Technology, and at Bodhi Research Group developed a return-persistence feature and a modified gain-to-pain ratio for a model scoring around 200 emerging hedge-fund managers, which raised the portfolio\'s Omega ratio by 20%.'
  ]
};

export const aboutCards: AboutCards = {
  philosophy: {
    title: 'Approach',
    body: 'I work on markets the way I was trained to work in astrophysics. I state my assumptions, fit the model to messy data, and do not trust a result until it survives testing.',
  },
  currentFocus: {
    label: 'Current Focus',
    heading: 'University of Chicago',
    body: 'M.S. in Financial Mathematics, expected December 2026. Coursework in stochastic calculus, Monte Carlo simulation, time-series analysis, and portfolio and risk management.',
  },
};

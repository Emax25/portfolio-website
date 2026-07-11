import type { AboutCards, Profile } from './types';

export const profile: Profile = {
  name: 'Charlie Carvajal',
  title: 'M.S. Financial Mathematics @ UChicago · Quantitative Research, Trading, and Development',
  location: 'Chicago, IL',
  email: 'carvajalchar25@uchicago.edu',
  linkedin: 'https://linkedin.com/in/carvajalchar',
  github: 'https://github.com/Emax25',
  bio: [
    'I am finishing an M.S. in Financial Mathematics at the University of Chicago, where I also earned undergraduate degrees in Astrophysics and Computer Science with a machine learning specialization. I came to markets from physics because quantitative finance kept offering the things I already loved: hard applied math, open problems, and fast feedback on whether you are right.',
    'At Cantor Fitzgerald I have migrated 20+ studies and signals from legacy R to Python, cutting runtimes roughly 500x and extending coverage from daily to hourly intraday data. Before that I built a pipeline matching 40 SEC 13F filings to daily equity flows at Exponential Technology, and at Bodhi Research Group developed a return-persistence feature and a modified gain-to-pain ratio for a model scoring around 200 emerging hedge-fund managers, which raised the portfolio\'s Omega ratio by 20%.'
  ]
};

export const aboutCards: AboutCards = {
  philosophy: {
    title: 'Approach',
    body: 'The method I learned in astrophysics, applied to markets: state the assumptions, fit the model to messy data, and trust nothing until it survives testing.',
  },
  currentFocus: {
    label: 'Current Focus',
    heading: 'University of Chicago',
    body: 'M.S. in Financial Mathematics, expected December 2026. Coursework in stochastic calculus, Monte Carlo simulation, time-series analysis, and portfolio and risk management.',
  },
};

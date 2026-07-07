import type { Project } from '../types';

export const pmcmcInsiderDetection: Project = {
  slug: 'pmcmc-insider-detection',
  title: 'Particle MCMC for Insider Detection',
  year: '2026',
  summary: 'A Particle Gibbs / interacting PMCMC sampler for a hierarchical state-space model flagging informed trading across Polymarket trades.',
  tags: ['Python', 'Bayesian Inference', 'Time-Series Analysis', 'Statistical Modeling', 'MCMC'],
  problem: [
    'Detecting insider or informed trading in decentralized prediction markets is challenging: activity is spread across thousands of pseudonymous wallets, and public trading data is noisy.',
    'This project models informed trading as a latent state in a hierarchical state-space model, so that insider activity — which is never directly observed — can be inferred from trading behavior via Bayesian inference.'
  ],
  approach: [
    'I implemented a Particle Gibbs / interacting PMCMC sampler to perform joint parameter estimation and latent state inference in the hierarchical state-space model.',
    'The model uses a Rao-Blackwellized latent state representation, analytically integrating out tractable substructure to reduce the variance of the particle filter estimators.',
    'The sampler was applied to a dataset of 20,000 Polymarket trades across 15,528 unique wallets, producing a posterior insider probability for each wallet.'
  ],
  results: [
    'On synthetic datasets with known ground truth, the sampler achieved a 0.96 Area Under the ROC Curve (AUC) for identifying informed trading.',
    'Applied to the real Polymarket dataset, the model surfaced a real wallet with a 0.88 posterior insider probability.',
    'The project demonstrates that particle MCMC methods can scale Bayesian inference for informed-trading detection to tens of thousands of trades in decentralized prediction markets.'
  ],
  metrics: [
    {
      label: 'Detection AUC',
      value: '0.96',
      note: 'On synthetic ground-truth data'
    },
    {
      label: 'Posterior Probability',
      value: '0.88',
      note: 'Surfaced real-world suspicious wallet'
    },
    {
      label: 'Dataset Scale',
      value: '20K / 15K',
      note: 'Trades / unique wallets analyzed'
    }
  ],
  charts: [
    {
      kind: 'line',
      dataSrc: 'pmcmc-posterior',
      illustrative: true,
      title: 'Posterior Insider Probability over MCMC Iterations',
      xAxisLabel: 'Iteration',
      yAxisLabel: 'Probability'
    }
  ],
  links: [
    {
      label: 'Code',
      href: 'https://github.com/Emax25/PMCMC---Polymarket'
    }
  ],
  status: 'active',
  retrospective: {
    limitations: [
      '[PLACEHOLDER — owner copy pending] A limitation of the sampler\'s variance behavior on the real Polymarket wallet population would be described here.',
      '[PLACEHOLDER — owner copy pending] A limitation around how the model handles wallets with very short trading histories or sparse activity would be described here.',
      '[PLACEHOLDER — owner copy pending] A limitation of the synthetic-to-real generalization gap (how the 0.96 AUC benchmark may not transfer) would be described here.'
    ],
    nowDifferent: [
      '[PLACEHOLDER — owner copy pending] A description of how the sampler or model specification would be revised with current tooling would be placed here.',
      '[PLACEHOLDER — owner copy pending] A description of additional validation or robustness checks that would be added now would be placed here.',
      '[PLACEHOLDER — owner copy pending] A description of how the engineering workflow (e.g. use of Claude Code, subagents, or verification steps) would change the build process would be placed here.'
    ]
  },
  timeline: [
    {
      date: '2026',
      title: '[PLACEHOLDER — owner copy pending] Initial project scoping',
      description: '[PLACEHOLDER — owner copy pending] A description of the initial problem framing and data-gathering phase would be placed here.'
    },
    {
      date: '2026',
      title: '[PLACEHOLDER — owner copy pending] Sampler implementation',
      description: '[PLACEHOLDER — owner copy pending] A description of building and validating the Particle Gibbs / interacting PMCMC sampler would be placed here.'
    },
    {
      date: '2026',
      title: '[PLACEHOLDER — owner copy pending] Application to real Polymarket data',
      description: '[PLACEHOLDER — owner copy pending] A description of applying the sampler to the real trade dataset and surfacing candidate wallets would be placed here.'
    },
    {
      date: '2026',
      title: '[PLACEHOLDER — owner copy pending] Revisit and extension',
      description: '[PLACEHOLDER — owner copy pending] A description of a planned or completed revisit of the project using current tooling would be placed here.'
    }
  ]
};

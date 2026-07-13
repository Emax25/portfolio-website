import type { Project } from '../types';

export const pmcmcInsiderDetection: Project = {
  slug: 'pmcmc-insider-detection',
  title: 'Particle MCMC for Insider Detection',
  year: '2026',
  summary: 'A Particle Gibbs / interacting PMCMC sampler for a hierarchical state-space model that flags informed trading across Polymarket trades.',
  tags: ['Python', 'Bayesian Inference', 'Time-Series Analysis', 'Statistical Modeling', 'MCMC'],
  problem: [
    'Detecting insider or informed trading in a decentralized prediction market is hard. Activity is spread across thousands of pseudonymous wallets, and the public trading data is noisy.',
    'I model informed trading as a latent state in a hierarchical state-space model, so that I can infer insider activity, which is never directly observed, from trading behavior alone.'
  ],
  approach: [
    'I implemented a Particle Gibbs / interacting PMCMC sampler for joint parameter estimation and latent state inference in the hierarchical state-space model.',
    'The model uses a Rao-Blackwellized latent state representation, which analytically integrates out tractable substructure to reduce the variance of the particle filter estimators.',
    'I applied the sampler to a dataset of 20,000 Polymarket trades across 15,528 unique wallets, and it produced a posterior insider probability for each wallet.'
  ],
  results: [
    'On synthetic datasets with known ground truth, the sampler reached a 0.96 Area Under the ROC Curve (AUC) for identifying informed trading.',
    'On the real Polymarket dataset, the model assigned one wallet a 0.88 posterior insider probability.',
    'These runs show that particle MCMC methods can scale Bayesian inference for informed-trading detection to tens of thousands of trades in a decentralized prediction market.'
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
      note: 'Highest-ranked wallet in the real Polymarket data'
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
      illustrative: false,
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
      'The Gaussian random-walk price dynamics cannot absorb the snap to 0 or 1 when a market resolves, so the model labels resolution moves as informed trading and flagged 1,999 of 2,000 trades in one Pennsylvania-margin market. The same misspecification is the honest caveat on the 0.96 synthetic AUC, since synthetic data comes from the model itself while real markets behave in ways the benchmark never sees.',
      'Most of the 15,528 wallets trade only a handful of times, and their posterior insider propensities are prior-dominated below roughly 20 trades. The wallet ranking is trustworthy only for active wallets (roughly 100+ trades); for the long tail the model has essentially no evidence either way.',
      'At the paper\'s compute budget (1,500 iterations, 250 particles, an overnight run), the conjugate variance and regime-transition parameters mix slowly, with effective sample sizes as low as 1.5 on 1,200 post-burn-in draws. I would read their credible intervals as optimistic.'
    ],
    nowDifferent: [
      'I would design the inference as two tiers from the start, with a fast variational-EM screen for iteration and Particle Gibbs as the gold standard. I built the exact sampler first and discovered the multi-hour wall-clock times only after the fact. The post-submission revisit added the fast tier retroactively and cut the synthetic benchmark batch from 64 minutes to about 4, at 0.885 AUC versus 0.962 for full PG.',
      'I would run seed-to-seed controls before trusting any cross-method agreement metric. A global rank correlation between the variational and MCMC wallet rankings came out near zero and looked like a failure, until a PG-vs-PG control with a different seed also missed the same threshold. That showed the metric was dominated by noise ordering among thousands of no-signal wallets. Top-K overlap and insider recall were the right yardsticks.',
      'The revisit runs on my current workflow, with Claude Code orchestrating subagents against a benchmark script that gates every change on a synthetic-injection check (ROC AUC at or above 0.85 with planted insiders ranked on top) before it lands.'
    ]
  },
  timeline: [
    {
      date: 'May 2026',
      title: 'Scoping and data pipeline',
      description: 'Framed insider detection as latent-state inference in a switching state-space model, and built the Polymarket data pipeline, pulling the last 2,000 trades from each of ten 2024 U.S. politics markets through the Data API and cleaning them into 20,000 trades across 15,528 wallets.'
    },
    {
      date: 'May–Jun 2026',
      title: 'Sampler implementation and synthetic validation',
      description: 'Implemented Rao-Blackwellized conditional SMC, Particle Gibbs, and interacting PMCMC, then validated on synthetic markets with planted insiders, reaching a 0.96 pooled ROC AUC with all three planted wallets ranked on top.'
    },
    {
      date: 'Jun 2026',
      title: 'Real-data inference and paper',
      description: 'Ran an overnight 1,500-iteration Particle Gibbs sweep over the full ten-market pool. One wallet came out at 0.88 posterior insider propensity (461 trades, all in a single Fed-chair nomination market), and I submitted the writeup as a graduate Monte Carlo independent project at UChicago.'
    },
    {
      date: 'Jun–Jul 2026',
      title: 'Post-submission revisit for speed and robustness',
      description: 'Reopened the codebase with an agentic workflow and added numba/joblib acceleration, a pre-resolution data filter, a corrected wallet-propensity update, and a variational-EM fast tier that cut the synthetic benchmark batch from 64 minutes to about 4. The work is ongoing and aimed at real-time insider scoring on live trades.'
    }
  ]
};

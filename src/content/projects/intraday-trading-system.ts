import type { Project } from '../types';

export const intradayTradingSystem: Project = {
  slug: 'intraday-trading-system',
  title: 'End-to-End Trading System',
  year: 'Nov–Dec 2025',
  summary:
    'A group-built cross-sectional intraday momentum system, and the post-mortem of its first version, which lost 21.5% in simulation to look-ahead bias, unmodeled transaction costs, and 22,496 trades of churn.',
  tags: ['Python', 'Systematic Trading', 'Backtesting', 'Portfolio Construction', 'Alpaca API'],
  problem: [
    'Cross-sectional intraday momentum - rank a universe of stocks by recent returns, go long the top of the ranking and short the bottom - is a standard quant idea, but capturing it takes more than the signal. It needs intraday data ingestion, portfolio construction, and automated execution working as one system.',
    'This was a group project on a hard two-week clock, with one week to build the full stack and one week to trade it live on paper.'
  ],
  approach: [
    'We built the pipeline in Python. It pulled 5-minute bars for roughly 500 equities and 10 cryptocurrencies, converted a momentum signal into a cross-sectional z-score clipped at ±3.0, formed equal-weighted long-short portfolios from the top and bottom of the ranking, and submitted orders automatically through Alpaca’s paper-trading API.',
    'Our first backtest annualized at over 100%. We treated that number as a warning and went looking for the bug. The backtest’s data cutoff let the signal see bars from later in the same day, a form of look-ahead bias, so we rebuilt it so that a signal generated at 15:30 could only use data through 15:30.'
  ],
  results: [
    'The first version, simulated over six weeks of historical data, lost 21.5% with a 74.8% maximum drawdown across 22,496 trades. The loss shows up directly in the trade statistics. We won 48.5% of trades, our average win (0.43%) was slightly smaller than our average loss (0.45%), and rebalancing the entire book every 30 minutes with market orders meant we paid the spread thousands of times without an edge to pay for it.',
    'The corrected backtest returned +1.29% over 21 trading days with a Sharpe ratio of 3.20, but on only 4 trades, too few to distinguish skill from luck. The one-week live paper run ended near -1% ($100,000 to $99,022 in the final logged cycle). Reading its logs, we found a failure that no backtest would have caught. Alpaca’s free-tier rate limits returned data for only 114 of the ~510 requested symbols in a cycle, so the cross-sectional ranking ran on whichever fraction of the universe happened to load.'
  ],
  metrics: [
    {
      label: 'First-Version Backtest',
      value: '-21.5%',
      note: 'Six weeks of data, 22,496 trades, -74.8% max drawdown'
    },
    {
      label: 'Corrected Backtest',
      value: '+1.29%',
      note: 'Sharpe 3.20 over 21 days, on only 4 trades'
    },
    {
      label: 'Live Paper Week',
      value: '≈ -1%',
      note: '$100,000 → $99,022 over one week on Alpaca'
    }
  ],
  charts: [
    {
      kind: 'equity-curve',
      dataSrc: 'trading-equity',
      illustrative: false,
      title: 'First-Version Backtest, Portfolio Value (reconstructed from the run’s performance chart)',
      xAxisLabel: 'Date',
      yAxisLabel: 'Portfolio Value ($)'
    }
  ],
  status: 'complete',
  retrospective: {
    limitations: [
      'We deployed before we validated. The backtest that justified going live was the one inflated by look-ahead bias, and we only finished the corrected backtest on the project’s final day.',
      'We never modeled transaction costs. Across 22,496 trades, even a 0.02% cost per trade compounds into a large share of the observed loss.',
      'The corrected backtest’s 4 trades cannot support its Sharpe of 3.20. Our own analysis put the minimum for statistical significance at 30-100 trades over 60-120 days.',
      'Free-tier market data failed silently, and a cross-sectional strategy fed a partial universe is a different strategy from the one we designed.'
    ],
    nowDifferent: [
      'Treat results that look too good as bugs until proven otherwise. Look-ahead bias produced a 100%+ annualized backtest; the fix reduced it to 1.29%.',
      'Model transaction costs before believing any intraday result. Every rebalance pays the spread, and how often to rebalance is a choice.',
      'Gate live deployment on statistical significance rather than on the pipeline running. I would want 30+ validated backtest trades first, then paper trading measured against backtest expectations.',
      'Budget for infrastructure as part of the strategy. Rate limits, pagination, and data completeness checks decide what the system actually trades.',
      'These rules are the starting spec for the next trading system I build.'
    ]
  },
  timeline: [
    {
      date: 'Late Nov 2025',
      title: 'Build week',
      description: 'Data pipeline, momentum strategy, backtester, and Alpaca execution assembled in one week.'
    },
    {
      date: 'Late Nov 2025',
      title: 'Live paper trading begins',
      description: 'Deployed on the strength of a backtest we later found inflated by look-ahead bias.'
    },
    {
      date: 'Dec 3, 2025',
      title: 'Look-ahead bias found and fixed',
      description: 'The corrected backtest showed +1.29% over 21 days on 4 trades, and the live week closed near -1%.'
    }
  ]
};

import type { Project } from '../types';

export const intradayTradingSystem: Project = {
  slug: 'intraday-trading-system',
  title: 'End-to-End Trading System',
  year: 'Nov–Dec 2025',
  summary: 'A cross-sectional intraday momentum trading system running a live paper-trading pipeline over equities and cryptocurrencies.',
  tags: ['Python', 'Systematic Trading', 'Time-Series Analysis', 'Portfolio Construction', 'Alpaca API'],
  problem: [
    'Capturing cross-sectional intraday momentum systematically requires more than a signal: it needs reliable intraday data ingestion, robust portfolio construction, and an automated execution engine.',
    'The goal was to build the full stack — from raw 5-minute bars to live order execution — as a single coherent system.'
  ],
  approach: [
    'I built an end-to-end systematic trading pipeline in Python that ingests 5-minute bar data for 100+ equities and 10 cryptocurrencies.',
    'The system computes cross-sectional intraday momentum signals, applies z-score clipping to control outliers, and constructs long-short portfolios from the ranked signals.',
    'The strategy runs on a live Alpaca paper-trading pipeline that executes trades automatically throughout the trading day.'
  ],
  results: [
    'The live paper-trading pipeline executes roughly 20 trades per day end-to-end without manual intervention.',
    'The modular architecture separates data ingestion, signal generation, portfolio construction, and execution, making it straightforward to iterate on new strategies.'
  ],
  metrics: [
    {
      label: 'Asset Universe',
      value: '110+',
      note: '100+ equities and 10 cryptos'
    },
    {
      label: 'Trading Frequency',
      value: '~20',
      note: 'Trades per day executed via Alpaca'
    },
    {
      label: 'Data Resolution',
      value: '5-Min',
      note: 'Bar intervals for signal generation'
    }
  ],
  charts: [
    {
      kind: 'equity-curve',
      dataSrc: 'trading-equity',
      illustrative: true,
      title: 'Cumulative Returns (Paper Trading)',
      xAxisLabel: 'Date',
      yAxisLabel: 'Portfolio Value ($)'
    },
    {
      kind: 'distribution',
      dataSrc: 'trading-returns-dist',
      illustrative: true,
      title: 'Daily Returns Distribution',
      xAxisLabel: 'Return (%)',
      yAxisLabel: 'Frequency'
    }
  ],
  links: [
    {
      label: 'GitHub Profile',
      href: 'https://github.com/Emax25'
    }
  ]
};

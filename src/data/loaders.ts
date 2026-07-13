import pmcmcPosterior from './pmcmc-posterior.json';
import tradingEquity from './trading-equity.json';
import tradingReturnsDist from './trading-returns-dist.json';
import aladdinModelComparison from './aladdin-model-comparison.json';

export interface ChartDataset<T> {
  illustrative: boolean;
  data: T[];
}

export interface PosteriorPoint {
  iteration: number;
  suspiciousWallet: number;
  normalWallet: number;
}

export interface EquityPoint {
  time: string;
  value: number;
}

export interface DistributionPoint {
  bin: string;
  frequency: number;
}

export interface ConfusionPoint {
  actual: string;
  predictedLegitimate: number;
  predictedScam: number;
}

export function loadPmcmcPosterior(): ChartDataset<PosteriorPoint> {
  return pmcmcPosterior as ChartDataset<PosteriorPoint>;
}

export function loadTradingEquity(): ChartDataset<EquityPoint> {
  return tradingEquity as ChartDataset<EquityPoint>;
}

export function loadTradingReturnsDist(): ChartDataset<DistributionPoint> {
  return tradingReturnsDist as ChartDataset<DistributionPoint>;
}

export interface ModelComparisonPoint {
  model: string;
  accuracy: number;
}

export function loadAladdinModelComparison(): ChartDataset<ModelComparisonPoint> {
  return aladdinModelComparison as ChartDataset<ModelComparisonPoint>;
}

export function getChartData(dataSrc: string): ChartDataset<any> {
  switch (dataSrc) {
    case 'pmcmc-posterior':
      return loadPmcmcPosterior();
    case 'trading-equity':
      return loadTradingEquity();
    case 'trading-returns-dist':
      return loadTradingReturnsDist();
    case 'aladdin-model-comparison':
      return loadAladdinModelComparison();
    default:
      throw new Error(`Unknown data source: ${dataSrc}`);
  }
}

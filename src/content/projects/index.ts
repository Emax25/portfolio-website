import type { Project } from '../types';
import { pmcmcInsiderDetection } from './pmcmc-insider-detection';
import { intradayTradingSystem } from './intraday-trading-system';
import { aladdinCryptoScamNlp } from './aladdin-crypto-scam-nlp';

export const projectsRegistry: Project[] = [
  pmcmcInsiderDetection,
  intradayTradingSystem,
  aladdinCryptoScamNlp,
];

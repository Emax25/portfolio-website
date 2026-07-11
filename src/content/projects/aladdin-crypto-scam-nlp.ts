import type { Project } from '../types';

export const aladdinCryptoScamNlp: Project = {
  slug: 'aladdin-crypto-scam-nlp',
  title: 'Aladdin: Predicting Crypto Scams from Tweets',
  year: '2025',
  summary: 'A transformer-based NLP classifier that labels cryptocurrency-related tweets as scam-likely or legitimate.',
  tags: ['Python', 'PyTorch', 'Hugging Face', 'NLP', 'Machine Learning'],
  problem: [
    'Cryptocurrency social media is saturated with fraudulent promotions and scam schemes targeting retail investors, and the language of these scams shifts constantly, which limits how long any keyword filter stays useful.',
    'The goal was to classify tweets as scam-likely or legitimate using modern NLP rather than hand-crafted rules.'
  ],
  approach: [
    'Aladdin is a transformer classifier built with PyTorch and Hugging Face.',
    'The model labels cryptocurrency-related tweets as one of two classes: scam-likely or legitimate.'
  ],
  results: [
    'The project delivered a working classifier that flags scam-likely cryptocurrency tweets.',
    'This page publishes no evaluation numbers; the confusion matrix below illustrates the output format rather than measured results.'
  ],
  metrics: [
    {
      label: 'Model Architecture',
      value: 'Transformer',
      note: 'Tweet-level text classification'
    },
    {
      label: 'Frameworks',
      value: 'PyTorch / HF',
      note: 'PyTorch and Hugging Face'
    },
    {
      label: 'Task',
      value: '2-Class',
      note: 'Scam-likely vs. legitimate tweets'
    }
  ],
  charts: [
    {
      kind: 'confusion-matrix',
      dataSrc: 'aladdin-confusion',
      illustrative: true,
      title: 'Model Confusion Matrix (Illustrative)',
      xAxisLabel: 'Predicted Label',
      yAxisLabel: 'True Label'
    }
  ],
  links: [
    {
      label: 'Project Write-Up',
      href: 'https://github.com/minalee-research/cs257-students/wiki/Aladdin:-Predicting-Cryptocurrency-Scams-and-Rug-Pulls-Using-Marketing-Tweets'
    }
  ]
};

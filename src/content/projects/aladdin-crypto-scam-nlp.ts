import type { Project } from '../types';

export const aladdinCryptoScamNlp: Project = {
  slug: 'aladdin-crypto-scam-nlp',
  title: 'Aladdin: Predicting Crypto Scams from Tweets',
  year: '2025',
  summary: 'A transformer-based NLP classifier that labels cryptocurrency-related tweets as scam-likely or legitimate.',
  tags: ['Python', 'PyTorch', 'Hugging Face', 'NLP', 'Machine Learning'],
  problem: [
    'Cryptocurrency social media is saturated with fraudulent promotions and scam schemes targeting retail investors, and the language of these scams shifts constantly, limiting the usefulness of simple keyword filters.',
    'The goal was to classify tweets as scam-likely or legitimate using modern NLP rather than hand-crafted rules.'
  ],
  approach: [
    'Aladdin is a transformer-based NLP classifier built on the modern deep-learning NLP stack (PyTorch, Hugging Face).',
    'The model classifies cryptocurrency-related tweets into two classes: scam-likely and legitimate.'
  ],
  results: [
    'The project delivered a working transformer-based classifier for flagging scam-likely cryptocurrency tweets.',
    'Quantitative evaluation metrics are not published here; the chart below is illustrative of the classifier output format.'
  ],
  metrics: [
    {
      label: 'Model Architecture',
      value: 'Transformer',
      note: 'Modern NLP classification model'
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
      label: 'GitHub Profile',
      href: 'https://github.com/Emax25'
    }
  ]
};

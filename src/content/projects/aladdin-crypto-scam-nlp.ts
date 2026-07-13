import type { Project } from '../types';

export const aladdinCryptoScamNlp: Project = {
  slug: 'aladdin-crypto-scam-nlp',
  title: 'Aladdin: Predicting Crypto Scams from Tweets',
  year: '2025',
  summary:
    'A BERTweet-based classifier that flags cryptocurrency scams from their marketing tweets alone, and an investigation into why its 99% test accuracy should not be taken at face value.',
  tags: ['Python', 'PyTorch', 'Hugging Face', 'NLP', 'Machine Learning'],
  problem: [
    'Pump-and-dump schemes follow a script. A coin gets marketed aggressively on Twitter, the price inflates, and the developers cash out and abandon the project - a rug pull. The marketing happens in public, on the coin\'s official account, before the collapse.',
    'We asked whether a model trained only on a coin\'s official tweets, with no price data and no on-chain data, can predict whether the coin is a scam. Keyword filters age quickly because scam vocabulary keeps shifting, so we wanted a classifier that learns how scams are marketed rather than a fixed word list.'
  ],
  approach: [
    'Aladdin was our final project for CS257 (Natural Language Processing) at UChicago, built with Alex Fan and Alex Williams. We scraped 5,800 tweets from the official accounts of 16 coins, 9 documented scams and 7 legitimate, using a Selenium-based scraper, and standardized every tweet to 200 tokens.',
    'Each tweet is embedded with BERTweet, which we chose over FinBERT because crypto Twitter leans heavily on emojis and special characters that FinBERT handles poorly. On top of the embeddings sit a single transformer encoder block and a two-layer MLP head, trained for 10 epochs with binary cross-entropy loss.',
    'Because a 16-coin dataset is easy to overfit, the probes mattered more than the model. We ran an MLP-only control, Gaussian Naive Bayes and bag-of-words logistic regression baselines, a name-masked dataset with coin self-references replaced by a [NAME] token, and zero-shot tests that held entire coins out of training.'
  ],
  results: [
    'The headline numbers are nearly perfect. The model reached 99.2% accuracy, 0.988 F1, and 0.997 ROC-AUC on the held-out test set, roughly flat across classification thresholds from 0.05 to 0.95. On a scraped dataset this small, numbers that high are a warning sign, so most of our work went into finding out what the model had actually learned.',
    'Two probes worked in the model\'s favor. Masking coin names barely moved accuracy (99.4%), and zero-shot tests on coins the model had never seen also stayed above 99%. This suggests it picked up something about scam language itself rather than memorizing account names.',
    'The baselines pointed at a shortcut. A bag-of-words logistic regression, which sees only word counts, still reached 89.6%, and its strongest scam-predicting words included "Peanut" and "Squirrel." Those words carried signal because one scam coin (PNUT) tweeted constantly about its squirrel mascot, and our regex-based masking never touched them. This is shortcut learning - the model exploits leftover cues that correlate with the labels instead of the signal we intended it to find.',
    'With roughly 55% of tweets containing self-references, we could not fully separate real linguistic signal from identity leakage at this dataset size. Some of the accuracy is real; the masked and zero-shot results support that much. But we would not quote 99% as the model\'s true skill.'
  ],
  metrics: [
    {
      label: 'Dataset',
      value: '5,800 tweets',
      note: '9 scams and 7 legitimate across 16 scraped coins'
    },
    {
      label: 'Test Accuracy',
      value: '99.2%',
      note: 'F1 0.988, ROC-AUC 0.997; likely inflated by leakage'
    },
    {
      label: 'BoW Baseline',
      value: '89.6%',
      note: 'Logistic regression on word counts alone'
    }
  ],
  charts: [
    {
      kind: 'bar',
      dataSrc: 'aladdin-model-comparison',
      illustrative: false,
      title: 'Test Accuracy by Model',
      xAxisLabel: 'Test Accuracy (%)',
      yAxisLabel: 'Model'
    }
  ],
  retrospective: {
    limitations: [
      'The accuracy is most likely inflated by overfitting. Sixteen coins is a small universe, and with 55% of tweets containing account self-references, the surface for identity leakage was large.',
      'Regex-based name masking removed the coin names but left everything else that identified the coin. Words like "Peanut" and "Squirrel" still predicted scams because one account tweeted constantly about its squirrel mascot, and no name list could cover cues like that.',
      'The false negatives that slipped through were scam tweets that read like ordinary product announcements, which are exactly the ones a deployed filter would most need to catch.'
    ],
    nowDifferent: [
      'Entity-neuter the corpus. A year after this project, Engelberg, Manela, Mullins, and Vulicevic proposed "entity neutering", where an LLM masks and paraphrases each text iteratively until the subject is unrecognizable and anything the LLM can still identify gets dropped. That verification loop is what our masking lacked, and it is the first thing I would add before trusting any accuracy number from this dataset.',
      'Split train and test at the coin level by default. The 80/20 tweet-level split lets the model see every account during training; the zero-shot runs are the only setting that resembles deployment, and they should be the headline number.',
      'Grow the coin universe well past 16 before drawing any conclusion about scam language in general.'
    ]
  },
  links: [
    {
      label: 'Project Write-Up',
      href: 'https://github.com/minalee-research/cs257-students/wiki/Aladdin:-Predicting-Cryptocurrency-Scams-and-Rug-Pulls-Using-Marketing-Tweets'
    },
    {
      label: 'Code Repository',
      href: 'https://github.com/agwilliams200/aladdin'
    },
    {
      label: 'Entity Neutering (Engelberg, Manela, Mullins & Vulicevic)',
      href: 'https://asaf.manela.org/papers/emmv/neutering/slides.pdf'
    }
  ]
};

import type { JourneyContent } from './types';

export const journey: JourneyContent = {
  title: 'The One Constant',
  subtitle:
    'Twenty-some addresses, a physics detour, and the through-line that led me to quantitative finance.',
  sections: [
    {
      id: 'origin',
      heading: 'Where I Started',
      body: [
        'Growing up, I moved more than twenty times. Enough times that I started classifying moves by distance: housing, school, city, state, country, and planetary. I have experienced every category except the last one, though I remain open to it. When people ask where I grew up, I still do not have a good answer.',
        'What I did have, at every address, was math. Curricula changed between schools, friendships reset, and half my classes never transferred, but a hard problem was a hard problem anywhere. Math became the one thing I could carry with me, and I got attached to it the way you get attached to the only thing that survives every move. By high school that attachment had turned into real ambition.',
        'QuestBridge matched me to the University of Chicago in 2020, and I arrived on campus set on becoming a theoretical physicist. After a childhood where everything was a variable, I wanted to spend my life on the few things that are not.'
      ]
    },
    {
      id: 'pivot',
      heading: 'Physics, Code, Markets',
      body: [
        'What I loved about physics was never really the physics. It was the way it applied serious mathematics to questions about how the world actually works, and the fact that the field was still open enough for a newcomer to contribute. The summer after my first year I discovered programming, having had almost no exposure to it before college, and fell hard. Suddenly I could build the models instead of just solving them on paper.',
        'A computational astrophysics course sealed it. We were fitting machine learning models to messy telescope data, and I noticed that the part I looked forward to was the modeling itself — the statistics, the algorithms, the fight to extract signal from noise — more than the cosmology it served. Around the same time I admitted to myself that theoretical physics was not the right fit, and I went looking for fields with the same three attributes that had drawn me in: hard applied math, unsolved problems, and fast feedback on whether you are right.',
        'There was no single lightning-bolt moment. Quantitative finance just kept winning the comparison, field after field, until the decision made itself. I graduated from UChicago in 2025 with dual degrees in Astrophysics and Computer Science, with a specialization in machine learning, already pointed at markets.'
      ]
    },
    {
      id: 'proof',
      heading: 'Putting It to Work',
      body: [
        'I stayed at UChicago for the M.S. in Financial Mathematics, where the coursework — stochastic calculus, Monte Carlo simulation, time-series analysis, options, portfolio and risk management — gave formal structure to the intuitions I had been building. But most of what I know about this field, I learned by doing it.',
        'At Bodhi Research Group I engineered time-series features for a hedge-fund-manager classification algorithm and designed a modified gain-to-pain ratio that improved the portfolio’s Omega ratio by 20%. At Exponential Technology I built a Python pipeline matching SEC 13F filings to daily equity flows, with event-study tooling that shipped into the firm’s dashboard. At Cantor Fitzgerald, as a quantitative developer, I migrated more than twenty studies and signals from legacy R to Python — roughly a 500x runtime reduction that moved signal refresh from daily to hourly intraday.',
        'Along the way I traded in the CME Group University Trading Challenge, taking directional futures positions in gold, silver, and natural gas to a 410% one-month return — second place out of 616 teams. A competition is not a track record, and that risk profile is not one I would defend in a real seat. But there is no substitute for the feeling of a thesis meeting a live market, and I wanted more of it.'
      ]
    },
    {
      id: 'drive',
      heading: 'What Drives Me',
      body: [
        'The through-line in everything above is the same: take a messy real-world signal and build something rigorous, fast, and testable around it. That is what pulled me into physics, what made me fall for programming, and what I now get to do with market data — except markets grade your model every single day, which is exactly the kind of feedback I went looking for.',
        'I find it fitting that after a childhood where everything kept changing, I chose a field where everything changes by design — and the job is to find what does not. That is the work I want to keep doing: deeper stochastic modeling, sharper machine learning, faster systems, applied end to end on problems where being right is measurable. The addresses never stayed the same. The pursuit has.'
      ]
    }
  ]
};

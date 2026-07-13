import type { JourneyContent } from './types';

export const journey: JourneyContent = {
  title: 'My Journey',
  subtitle:
    'How I got from a childhood of constant moves to quantitative finance, by way of physics.',
  sections: [
    {
      id: 'origin',
      heading: 'Where I Started',
      body: [
        'Growing up, I moved more than twenty times, enough that I started sorting moves by how far they went, from a new house up through a new school, city, state, and country. The only category I have not tried is a new planet, though I remain open to it. When people ask where I grew up, I still do not have a good answer.',
        'Math was the one thing I could carry to every address. Curricula changed between schools, friendships reset, and half my classes never transferred, but a hard problem was a hard problem anywhere. By high school I had decided I wanted to spend my life on those problems.',
        'QuestBridge matched me to the University of Chicago in 2020, and I arrived on campus set on becoming a theoretical physicist.'
      ]
    },
    {
      id: 'pivot',
      heading: 'Physics, Code, Markets',
      body: [
        'What I loved about physics was the way it applied serious mathematics to questions about how the world actually works, and the fact that the field was still open enough for a newcomer to contribute. The summer after my first year I discovered programming, having had almost no exposure to it before college, and fell hard. Suddenly I could build the models instead of just solving them on paper.',
        'A computational astrophysics course sealed it. We were fitting machine learning models to messy telescope data, and I noticed that the part I looked forward to was the modeling itself, the statistics and the algorithms, more than the cosmology they served. Around the same time I admitted to myself that theoretical physics was not the right fit, and I went looking for another field with hard applied math, unsolved problems, and fast feedback on whether I was right.',
        'Every comparison I ran ended at quantitative finance. I graduated from UChicago in 2025 with dual degrees in Astrophysics and Computer Science, with a specialization in machine learning, and by then I had settled on markets.'
      ]
    },
    {
      id: 'proof',
      heading: 'Putting It to Work',
      body: [
        'I stayed at UChicago for the M.S. in Financial Mathematics, where I learned the formal versions of tools I had been using by intuition, in courses on stochastic calculus, Monte Carlo simulation, time-series analysis, options, and portfolio and risk management. Still, most of what I know about this field I learned by doing it.',
        'At Bodhi Research Group I developed a return-persistence feature and a modified gain-to-pain ratio for a model scoring around 200 emerging hedge-fund managers, which raised the portfolio’s Omega ratio by 20%. At Exponential Technology I built a Python pipeline matching 40 SEC 13F filings to daily equity flows, with event-study tooling that shipped into the firm’s dashboard. At Cantor Fitzgerald, as a quantitative developer, I have migrated more than twenty studies and signals from legacy R to Python, which cut runtimes roughly 500x and extended coverage from daily to hourly intraday data.',
        'Along the way my team and I traded the CME Group University Trading Challenge, where we took directional futures positions in gold, silver, and natural gas and finished second out of 616 teams with a 410% one-month return. A competition is not a track record, and I would not run that risk profile in a real seat. It was still the first time I put my own market views against live prices, and I wanted more of it.'
      ]
    },
    {
      id: 'next',
      heading: 'What Comes Next',
      body: [
        'The work I want to keep doing is stochastic modeling and machine learning, applied end to end on problems where being right is measurable. The engineering matters to me as much as the math, because a model that cannot run at production speed never gets used.',
        'I do not know yet which corner of the field I will end up in, and I am in no hurry to decide. Every project so far has changed how I approached the next one, and I would like to keep it that way.'
      ]
    }
  ]
};

import type { HowIBuildContent } from './types';

export const howIBuild: HowIBuildContent = {
  intro: [
    'The projects on this site are not frozen coursework. I keep extending them (faster samplers, new robustness checks, this website itself) through a workflow where AI agents write most of the code and I make every decision.',
    'Agents draft changes; automated gates decide whether those changes land. Nothing ships because a model sounded confident. This page describes the same system that built and maintains the site you are reading.'
  ],
  philosophy: {
    title: 'Managing a Team of Agents',
    body: [
      'I run agents the way you would run a team of capable junior engineers: clearly scoped tasks, only the context each one needs, and review on everything before it lands. The skill this takes is technical direction rather than prompting: deciding what to build, breaking it into tasks someone else can execute, and owning the outcome.',
      'Delegation only works when it is verified, so every change passes gates sized to the stakes: mechanical checks on each task, a full test-and-build gate before merge, and domain-specific validation where correctness is subtle. I never delegate the judgment calls: what is true, what ships, and what a number means.'
    ]
  },
  toolchain: [
    {
      name: 'Claude Code',
      role: 'Primary environment for multi-step work. Runs the three-stage pipeline below as an orchestrator: an expensive model plans and reviews while cheaper worker models execute narrowly scoped tasks, the same tiering logic you would apply to any compute budget.'
    },
    {
      name: 'Cursor',
      role: 'Equal partner to Claude Code; I switch between the two when one runs out of usage. The skills and agent definitions live in the repository itself, so the workflow survives the switch and depends on neither vendor.'
    },
    {
      name: 'Subagents',
      role: 'Specialized workers with defined roles: a frontend developer, a case-study writer, an adversarial plan critic, and read-only scouts. Each gets a task-scoped packet (paths plus acceptance criteria) rather than the whole plan, which keeps context clean and output reviewable.'
    },
    {
      name: 'Skills',
      role: 'Repeatable procedures checked into version control: /plan, /implement, and /finish encode the workflow so quality does not depend on remembering it. Learnings from each project accumulate in a solutions directory, so a mistake made once is engineered out rather than repeated.'
    }
  ],
  workflow: [
    {
      stage: 'Plan',
      description: 'Scout agents gather code facts while the orchestrator writes an implementation-ready plan; an adversarial critic then attacks it for architecture risks, scope creep, and missing tasks. The plan file is the only context implementation gets, so every decision must be written down.'
    },
    {
      stage: 'Implement',
      description: 'Worker agents execute the plan task by task. Each task passes a verification gate (typecheck and lint) before the next begins, and the orchestrator reviews diffs rather than trusting reports.'
    },
    {
      stage: 'Review',
      description: 'A finish pipeline closes every change: regression tests written and run, a simplification pass, multi-agent code review, documentation and decision records updated, and learnings captured for the next project.'
    }
  ],
  verification: {
    title: 'Verification Gates',
    body: [
      'Every agent-produced change passes typecheck and lint before it lands, and the full gate (tests, typecheck, lint, production build) before it merges. Content has its own rule: every fact and number on this site must trace to a repository source, so agents cannot invent a metric, a date, or a credential.',
      'Where correctness is subtle, the gate gets domain-specific. On the PMCMC insider-detection project, no change to the sampler landed without passing a synthetic-injection check (ROC AUC at or above 0.85 with planted insider wallets ranked on top), so speed work could not quietly break inference.'
    ]
  }
};

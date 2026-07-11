import type { HowIBuildContent } from './types';

export const howIBuild: HowIBuildContent = {
  intro: [
    'The projects on this site are not frozen coursework. I keep extending them — faster samplers, new robustness checks, this website itself — through a workflow where AI agents do most of the typing and I do all of the deciding.',
    'The claim is simple: engineering leverage under verification discipline. Agents draft; gates decide. Nothing ships because a model sounded confident — and this page describes the same system that built and maintains it.'
  ],
  philosophy: {
    title: 'Managing a Team of Agents',
    body: [
      'I run agents the way you would run a team of capable junior engineers: clearly scoped tasks, the context each one needs and nothing more, and review on everything before it lands. The skill on display is not prompting — it is technical direction: deciding what to build, decomposing it into tasks someone else can execute, and owning the outcome.',
      'Delegation without verification is just risk, so leverage is balanced by gates sized to the stakes: mechanical checks on every task, a full test-and-build gate before merge, and domain-specific validation where correctness is subtle. The judgment calls — what is true, what ships, what a number means — are never delegated.'
    ]
  },
  toolchain: [
    {
      name: 'Claude Code',
      role: 'Primary environment for multi-step work. Runs the three-stage pipeline below as an orchestrator: an expensive model plans and reviews, while cheaper worker models execute narrowly scoped tasks — the same model-tiering logic you would apply to any compute budget.'
    },
    {
      name: 'Cursor',
      role: 'Equal partner to Claude Code — I switch between the two when one runs out of usage. The workflow is deliberately tool-portable: the skills and agent definitions live in the repository itself, so the process survives the switch and nothing depends on either vendor.'
    },
    {
      name: 'Subagents',
      role: 'Specialized workers with defined roles — a frontend developer, a case-study writer, an adversarial plan critic, read-only scouts. Each gets a task-scoped packet (paths plus acceptance criteria), never the whole plan, which keeps context clean and output reviewable.'
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
      description: 'Worker agents execute the plan task by task. Each task passes a verification gate — typecheck and lint — before the next begins, and the orchestrator reviews diffs rather than trusting reports.'
    },
    {
      stage: 'Review',
      description: 'A finish pipeline closes every change: regression tests written and run, a simplification pass, multi-agent code review, documentation and decision records updated, and learnings captured for the next project.'
    }
  ],
  verification: {
    title: 'Nothing Lands Unverified',
    body: [
      'The mechanics: every agent-produced change passes typecheck and lint before it lands, and the full gate — tests, typecheck, lint, production build — before it merges. Content has its own rule: every fact and number on this site must trace to a repository source. Agents cannot invent a metric, a date, or a credential.',
      'Where correctness is subtle, the gate gets domain-specific. On the PMCMC insider-detection project, no change to the sampler landed without passing a synthetic-injection check — ROC AUC at or above 0.85 with planted insider wallets ranked on top — so speed work could never quietly break inference. An agent\'s confidence is not evidence; the gate\'s output is.'
    ]
  }
};

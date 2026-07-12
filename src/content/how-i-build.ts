import type { HowIBuildContent } from './types';

export const howIBuild: HowIBuildContent = {
  intro: [
    'The projects on this site are still moving: I keep extending them - faster samplers, new robustness checks, the site itself - through a workflow where AI agents write most of the code and I make every decision about what lands.',
    'An agent sounding confident is not evidence that its change is correct, so nothing merges on the agent’s word alone: every change has to pass automated gates first. This page describes that system, and it is the same system that built the page you are reading.'
  ],
  philosophy: {
    title: 'Managing a Team of Agents',
    body: [
      'I run agents the way I would run a team of capable junior engineers: each one gets a clearly scoped task, only the context that task needs, and review before anything lands. The skill this takes is technical direction: deciding what to build, then breaking it into tasks someone else can execute. I shaped the workflow during my internships, and the version I run on personal projects usually lags a little behind the one I run at work.',
      'Delegation only works if the output is verified, so every change passes gates sized to what it could break: typecheck and lint on every task, a full test-and-build gate before merge, and domain-specific checks where correctness is subtle. The judgment calls stay with me: what is true, what ships, and what a number means.'
    ]
  },
  toolchain: [
    {
      name: 'Claude Code',
      role: 'Primary environment for multi-step work. It runs the three-stage pipeline below on a cost gradient: the most capable model writes the plan, a cheaper orchestrator runs the implementation, and the cheapest models do the bulk reading and the mechanical edits. The expensive model’s attention is the scarce resource, so anything a cheaper model can do gets delegated down.'
    },
    {
      name: 'Cursor',
      role: 'Equal partner to Claude Code; I switch between the two when one runs out of usage. The skills and agent definitions live in the repository itself, so the workflow survives the switch and depends on neither vendor.'
    },
    {
      name: 'Subagents',
      role: 'Specialized workers with defined roles: a frontend developer, a case-study writer, an adversarial plan critic, and read-only scouts. The archetypes come from open-source agent collections that I modify and tailor to each project. Each worker gets a task-scoped packet of file paths and acceptance criteria instead of the whole plan, which keeps its context small and its output easy to review.'
    },
    {
      name: 'Skills',
      role: 'Repeatable procedures checked into version control. /plan, /implement, and /finish are wrappers around the open-source compound-engineering plugin, with this repository’s rules layered on top. Learnings from each project accumulate in a solutions directory that the planning stage reads, so a lesson learned once carries into the next project.'
    }
  ],
  workflow: [
    {
      stage: 'Plan',
      description: 'The most capable model writes an implementation-ready plan, and it is only allowed to read documentation - the codebase map, prior learnings, decision records - unless something truly requires looking at code. Cheap scout agents do the code reading and report back conclusions. An adversarial critic then reviews the draft for architecture risks and documentation gaps. The plan file is the only context the next stage receives, so every decision has to be written down.'
    },
    {
      stage: 'Implement',
      description: 'A second orchestrator, powerful but cheaper than the planner, executes the plan by dispatching worker agents task by task. Each task has to pass typecheck and lint before the next one starts, and the orchestrator reads the diffs itself instead of taking the workers’ reports at face value.'
    },
    {
      stage: 'Finish',
      description: 'A closing pipeline runs on every change: write and run regression tests, debug whatever fails, simplify the code, run a multi-agent review against the plan, and update the documentation and decision records. Anything non-obvious learned along the way gets written down for the next project.'
    }
  ],
  verification: {
    title: 'Verification Gates',
    body: [
      'Every agent-produced change passes typecheck and lint before it lands, and the full gate - tests, typecheck, lint, production build - before it merges. Content has its own rule: every fact and number on this site must trace to a source in the repository, so an agent cannot invent a metric or a credential.',
      'Where correctness is subtle, the gate gets specific to the domain. On the PMCMC insider-detection project, no change to the sampler landed without passing a synthetic-injection check: ROC AUC at or above 0.85, with the planted insider wallets ranked on top. A speedup that broke inference would fail that check before I ever saw the code.'
    ]
  }
};

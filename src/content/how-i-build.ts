import type { HowIBuildContent } from './types';

export const howIBuild: HowIBuildContent = {
  intro: [
    'The projects on this site are still moving. I keep extending them, a faster sampler here, a new robustness check there, through a workflow where AI agents write most of the code and I make every decision about what lands.',
    'An agent that sounds confident can still be wrong, so nothing merges on the agent’s word alone. Every change has to pass automated gates first. This page describes that system, which also built this page.'
  ],
  philosophy: {
    title: 'Managing a Team of Agents',
    body: [
      'I run agents the way I would run a team of capable junior engineers. Each one gets a clearly scoped task with only the context that task needs, and I review everything before it lands. The skill this takes is technical direction. I decide what to build, then break it into tasks someone else can execute. I shaped the workflow during my internships, and the version I run on personal projects usually lags a little behind the one I run at work.',
      'Delegation only works if I verify the output, so every change passes gates sized to what it could break. Each task gets a typecheck and lint, merges get the full test-and-build gate, and where correctness is subtle I add checks specific to the domain. I still make the judgment calls myself, on what is true, what ships, and what a number means.'
    ]
  },
  toolchain: [
    {
      name: 'Claude Code',
      role: 'My primary environment for multi-step work. It runs the three-stage pipeline below on a cost gradient, where the most capable model writes the plan, a cheaper orchestrator runs the implementation, and the cheapest models do the bulk reading and the mechanical edits. I delegate anything a cheaper model can handle, because the capable model’s time is what I pay the most for.'
    },
    {
      name: 'Cursor',
      role: 'I treat Cursor as an equal to Claude Code and switch between the two when one runs out of usage. The skills and agent definitions live in the repository itself, so the workflow carries over and depends on neither vendor.'
    },
    {
      name: 'Subagents',
      role: 'Specialized workers with defined roles, among them a frontend developer, a case-study writer, an adversarial plan critic, and read-only scouts. The archetypes come from open-source agent collections that I modify and tailor to each project. Each worker gets a task-scoped packet of file paths and acceptance criteria instead of the whole plan, which keeps its context small and its output easy to review.'
    },
    {
      name: 'Skills',
      role: 'Repeatable procedures checked into version control. /plan, /implement, and /finish are wrappers around the open-source compound-engineering plugin, with this repository’s rules layered on top. Lessons from each project accumulate in a solutions directory that the planning stage reads, so I only have to learn each one once.'
    }
  ],
  workflow: [
    {
      stage: 'Plan',
      description: 'The most capable model writes an implementation-ready plan, and it is only allowed to read documentation (the codebase map, prior learnings, decision records) unless something truly requires looking at code. Cheap scout agents do the code reading and report back conclusions. An adversarial critic then reviews the draft for architecture risks and documentation gaps. The plan file is the only context the next stage receives, so every decision has to be written down.'
    },
    {
      stage: 'Implement',
      description: 'A second orchestrator, powerful but cheaper than the planner, executes the plan by dispatching worker agents task by task. Each task has to pass typecheck and lint before the next one starts, and the orchestrator reads the diffs itself instead of taking the workers’ reports at face value.'
    },
    {
      stage: 'Finish',
      description: 'Every change ends with a closing pipeline that writes and runs regression tests, debugs whatever fails, simplifies the code, reviews the result against the plan with multiple agents, and updates the documentation and decision records. It also records anything non-obvious we learned for the next project.'
    }
  ],
  verification: {
    title: 'Verification Gates',
    body: [
      'Every agent-produced change passes typecheck and lint before it lands, then tests, typecheck, lint, and a production build together before it merges. Content follows its own rule. Every fact and number on this site must trace to a source in the repository, so an agent cannot invent a metric or a credential.',
      'Where correctness is subtle, the gate gets specific to the domain. On the PMCMC insider-detection project, no change to the sampler landed without passing a synthetic-injection check, which requires a ROC AUC at or above 0.85 with the planted insider wallets ranked on top. A speedup that broke inference fails that check before I ever see the code.'
    ]
  }
};

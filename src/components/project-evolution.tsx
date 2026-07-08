import { motion, useReducedMotion } from 'motion/react';
import type { Project } from '@/content/types';

interface ProjectEvolutionProps {
  retrospective?: Project['retrospective'];
  timeline?: Project['timeline'];
}

export function ProjectEvolution({ retrospective, timeline }: ProjectEvolutionProps) {
  const isReduced = useReducedMotion();

  if (!retrospective && !timeline) {
    return null;
  }

  const itemAnimationProps = isReduced
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.4 },
      };

  return (
    <section className="space-y-6 pt-8 border-t border-border/50">
      <h2 className="text-2xl font-bold tracking-tight">Project Evolution</h2>

      {retrospective && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight">Known Limitations</h3>
            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
              {retrospective.limitations.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight">What I&apos;m Doing Differently</h3>
            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
              {retrospective.nowDifferent.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {timeline && timeline.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-lg font-semibold tracking-tight">Timeline</h3>
          <ol className="relative border-l border-border/50 pl-6 space-y-8">
            {timeline.map((entry, i) => (
              <motion.li key={i} className="relative" {...itemAnimationProps}>
                <span
                  className="absolute -left-[1.6rem] top-1.5 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background"
                  aria-hidden="true"
                />
                <time className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {entry.date}
                </time>
                <p className="text-base font-semibold tracking-tight mt-1">{entry.title}</p>
                {entry.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                    {entry.description}
                  </p>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}

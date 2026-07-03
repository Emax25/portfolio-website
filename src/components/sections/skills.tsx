import { motion } from 'motion/react';
import { Code, Brain, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { skillGroups, languages } from '@/content/skills';

export function Skills() {
  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animationProps = isReduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
      };

  return (
    <section id="skills" className="scroll-mt-20 py-16 border-t border-border/50">
      <motion.div className="space-y-8" {...animationProps}>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Skills & Domain Knowledge</h2>
          <p className="text-muted-foreground text-sm">Technical toolkit, core competencies, and language proficiencies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Programming & Tools */}
          <div className="p-6 rounded-lg border border-border/50 bg-card/10 space-y-4">
            <div className="flex items-center gap-2 font-semibold text-foreground text-base border-b border-border/50 pb-3">
              <Code className="h-5 w-5 text-primary" />
              <span>Programming & Computational Tools</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {skillGroups[0].skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs font-medium px-2.5 py-1 bg-muted/60 text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-transparent transition-colors cursor-default"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Domain Knowledge */}
            <div className="p-6 rounded-lg border border-border/50 bg-card/10 space-y-4">
              <div className="flex items-center gap-2 font-semibold text-foreground text-base border-b border-border/50 pb-3">
                <Brain className="h-5 w-5 text-primary" />
                <span>Domain Expertise</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {skillGroups[1].skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs font-medium px-2.5 py-1 border-primary/20 text-foreground hover:border-primary transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="p-6 rounded-lg border border-border/50 bg-card/10 space-y-3">
              <div className="flex items-center gap-2 font-semibold text-foreground text-sm border-b border-border/50 pb-2">
                <Globe className="h-4 w-4 text-primary" />
                <span>Languages</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {languages.skills.map((lang, index) => (
                  <span
                    key={index}
                    className="text-xs text-muted-foreground font-medium bg-muted/30 px-3 py-1.5 rounded-md border border-border/50"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

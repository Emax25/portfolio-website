import { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { experiences } from '@/content/experience';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function Experience() {
  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [showEarlier, setShowEarlier] = useState(false);

  const animationProps = isReduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
      };

  const featuredExperiences = experiences.filter((exp) => exp.featured);
  const earlierExperiences = experiences.filter((exp) => !exp.featured);

  return (
    <section id="experience" className="scroll-mt-20 py-16 border-t border-border/50">
      <motion.div className="space-y-8" {...animationProps}>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Professional Experience</h2>
          <p className="text-muted-foreground text-sm">
            Quantitative research, technical development, and academic mentorship history
          </p>
        </div>

        {/* Featured Timeline */}
        <div className="relative border-l border-border pl-6 ml-4 space-y-12">
          {featuredExperiences.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-10 top-1 bg-background border border-border rounded-full p-1.5 z-10 group-hover:border-primary transition-colors">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>

              <div className="space-y-3">
                {/* Header Info */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-base font-semibold text-muted-foreground">
                      {exp.company}
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end text-xs text-muted-foreground gap-1.5">
                    <div className="inline-flex items-center gap-1.5 font-medium">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{exp.startDate} &mdash; {exp.endDate}</span>
                    </div>
                    {exp.location && (
                      <div className="inline-flex items-center gap-1.5 md:justify-end">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{exp.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Verbatim Bullet Points */}
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2 leading-relaxed">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx}>{bullet}</li>
                  ))}
                </ul>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.tags.map((tag, tIdx) => (
                    <Badge
                      key={tIdx}
                      variant="outline"
                      className="text-[10px] font-semibold tracking-wide border-border/60 hover:border-primary/50 transition-colors cursor-default"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Collapsible Earlier Experience */}
        {earlierExperiences.length > 0 && (
          <div className="pt-4 border-t border-border/20">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between py-6 px-4 border border-border/50 bg-muted/10 hover:bg-muted/35 rounded-lg group text-muted-foreground hover:text-foreground transition-all"
              onClick={() => setShowEarlier(!showEarlier)}
              aria-expanded={showEarlier}
              aria-controls="earlier-experience-panel"
              id="earlier-experience-btn"
            >
              <span className="text-sm font-semibold tracking-wide">
                {showEarlier ? 'Hide Earlier Experience' : 'Show Earlier Experience'} ({earlierExperiences.length} roles)
              </span>
              {showEarlier ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-transform" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-transform" />
              )}
            </Button>

            {showEarlier && (
              <div
                id="earlier-experience-panel"
                role="region"
                aria-labelledby="earlier-experience-btn"
                className="mt-4 space-y-4 animate-in fade-in duration-350"
              >
                {earlierExperiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-5 rounded-lg border border-border/40 bg-card/10 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-border/80 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-foreground">{exp.role}</div>
                      <div className="text-xs text-muted-foreground font-semibold">
                        {exp.company}
                        {exp.location ? ` \u2022 ${exp.location}` : ''}
                      </div>
                      {exp.description && exp.description.length > 0 && (
                        <p className="text-xs text-muted-foreground/80 mt-1 leading-relaxed">
                          {exp.description[0]}
                        </p>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-muted-foreground whitespace-nowrap self-start md:self-auto bg-muted/40 border border-border/50 px-2.5 py-1 rounded">
                      {exp.startDate} &mdash; {exp.endDate}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
}

import { motion } from 'motion/react';
import { GraduationCap, Award, Calendar, MapPin, BookOpen } from 'lucide-react';
import { education } from '@/content/education';
import { honors } from '@/content/honors';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function Education() {
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
    <section id="education" className="scroll-mt-20 py-16 border-t border-border/50">
      <motion.div className="space-y-12" {...animationProps}>
        {/* Education Section */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Education</h2>
            <p className="text-muted-foreground text-sm">
              Academic history and specialized quantitative coursework
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu) => (
              <Card key={edu.id} className="bg-card/30 border-border/50 hover:border-border transition-colors flex flex-col justify-between">
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-transparent rounded-full px-2 py-0.5 text-[10px] font-bold">
                      <GraduationCap className="h-3 w-3" />
                      <span>{edu.institution}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{edu.startDate ? `${edu.startDate} \u2014 ${edu.endDate}` : edu.endDate}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg font-extrabold text-foreground leading-tight pt-1">
                    {edu.degree}
                  </CardTitle>
                  
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{edu.location}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4 flex-1">
                  {edu.details && edu.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground leading-relaxed">
                      {detail}
                    </p>
                  ))}
                  
                  {edu.courses && edu.courses.length > 0 && (
                    <div className="space-y-2.5 pt-3 border-t border-border/20">
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground tracking-wide uppercase">
                        <BookOpen className="h-3.5 w-3.5 text-primary" />
                        <span>Core Coursework</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.courses.map((course, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-[10px] font-medium bg-muted/60 text-muted-foreground border border-border/40 hover:border-primary/30 transition-colors"
                          >
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Honors Subsection */}
        <div className="space-y-6 pt-6 border-t border-border/20">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="text-2xl font-bold tracking-tight">Honors & Distinctions</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Recognitions of merit, academic excellence, and competitive trading achievements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {honors.map((honor) => (
              <div
                key={honor.id}
                className="p-5 rounded-lg border border-border/50 bg-card/20 hover:border-border transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 group"
              >
                <div className="space-y-1.5">
                  <div className="text-sm font-extrabold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {honor.title}
                  </div>
                  <div className="text-xs font-semibold text-muted-foreground/90">
                    {honor.issuer}
                  </div>
                  {honor.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                      {honor.description}
                    </p>
                  )}
                </div>
                <div className="text-xs font-bold text-muted-foreground whitespace-nowrap self-start md:self-auto bg-muted/40 border border-border/50 px-2 py-0.5 rounded">
                  {honor.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

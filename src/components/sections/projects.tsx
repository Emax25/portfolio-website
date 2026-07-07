import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { projectsRegistry } from '@/content/projects';

export function ProjectsSection() {
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
    <section id="projects" className="scroll-mt-20 py-16 border-t border-border/50">
      <motion.div className="space-y-8" {...animationProps}>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Quantitative Projects</h2>
          <p className="text-muted-foreground text-sm">
            Research papers, algorithmic systems, and mathematical modeling case studies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsRegistry.map((project) => (
              <Card key={project.slug} className="bg-card/40 border-border/50 flex flex-col justify-between hover:border-border transition-colors group">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{project.year}</span>
                    </div>
                    {project.metrics && project.metrics.length > 0 && (
                      <Badge variant="secondary" className="text-[10px] font-bold bg-primary/10 text-primary border-transparent">
                        {project.metrics[0].value} {project.metrics[0].label}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground mt-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, tagIdx) => (
                      <Badge key={tagIdx} variant="secondary" className="text-[10px] bg-muted/60 text-muted-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-border/20 pt-4 bg-muted/5 rounded-b-lg">
                  <Link
                    to={`/projects/${project.slug}`}
                    className={buttonVariants({ variant: 'ghost', size: 'sm', className: 'text-xs text-primary font-semibold hover:gap-2 transition-all p-0 group' })}
                  >
                    <span>Explore Project</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
        </div>
      </motion.div>
    </section>
  );
}

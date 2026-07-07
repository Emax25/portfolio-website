import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { projectsRegistry } from '@/content/projects';
import { Card, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProjectChart } from '@/components/charts/ProjectChart';
import { usePageTitle } from '@/lib/use-page-title';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsRegistry.find((p) => p.slug === slug);

  usePageTitle(project?.title);

  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animationProps = isReduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      };

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-24 max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold">Project Not Found</h1>
        <p className="text-muted-foreground">
          The project with slug "{slug}" could not be found in our registry.
        </p>
        <Link to="/" className={buttonVariants({ variant: 'default' })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.div className="space-y-10" {...animationProps}>
        {/* Back Navigation */}
        <div>
          <Link
            to="/#projects"
            className={buttonVariants({ variant: 'ghost', className: 'gap-1.5 -ml-3 text-muted-foreground hover:text-foreground' })}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
            <span className="text-sm font-semibold text-muted-foreground bg-muted border border-border/50 px-3.5 py-1.5 rounded-full w-fit">
              {project.year}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-2.5 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Summary */}
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {project.summary}
          </p>
        </div>

        {/* Metrics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {project.metrics.map((metric) => (
            <Card key={metric.label} className="border border-border bg-card/40 backdrop-blur-xs">
              <CardContent className="pt-6 space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {metric.label}
                </p>
                <p className="text-3xl font-bold tracking-tight text-primary">
                  {metric.value}
                </p>
                {metric.note && (
                  <p className="text-xs text-muted-foreground">
                    {metric.note}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Case Study Narrative */}
        <div className="grid grid-cols-1 gap-10 pt-4">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Problem Statement</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
              {project.problem.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Methodology & Approach</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
              {project.approach.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Key Results & Findings</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
              {project.results.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        </div>

        {/* Visualizations Section */}
        {project.charts && project.charts.length > 0 && (
          <section className="space-y-6 pt-8 border-t border-border/50">
            <div className="space-y-1.5">
              <h2 className="text-2xl font-bold tracking-tight">Interactive Visualizations</h2>
              <p className="text-sm text-muted-foreground">
                Explore the performance, distributions, and analytical outputs of this project.
              </p>
            </div>
            <div className={`grid grid-cols-1 ${project.charts.length > 1 ? 'lg:grid-cols-2' : ''} gap-6`}>
              {project.charts.map((chartSpec) => (
                <ProjectChart key={chartSpec.dataSrc} spec={chartSpec} />
              ))}
            </div>
          </section>
        )}

        {/* Links & Footer Nav */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-border/50">
          <div className="flex flex-wrap gap-3">
            {project.links && project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: 'outline', className: 'gap-1.5 text-sm' })}
              >
                <span>{link.label}</span>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </a>
            ))}
          </div>

          <Link
            to="/#projects"
            className={buttonVariants({ variant: 'ghost', className: 'gap-1.5 text-muted-foreground hover:text-foreground self-start sm:self-auto' })}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Projects</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

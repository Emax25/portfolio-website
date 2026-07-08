import { motion } from 'motion/react';
import { journey } from '@/content/journey';
import { usePageTitle } from '@/lib/use-page-title';

export function Journey() {
  usePageTitle('My Journey');

  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animationProps = isReduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.div className="space-y-10" {...animationProps}>
        {/* Intro */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{journey.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">{journey.subtitle}</p>
        </div>

        {/* Sections */}
        {journey.sections.map((section) => (
          <section key={section.id} className="space-y-3 pt-4">
            <h2 className="text-2xl font-bold tracking-tight">{section.heading}</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
              {section.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </motion.div>
    </div>
  );
}

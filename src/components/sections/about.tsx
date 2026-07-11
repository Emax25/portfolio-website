import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MapPin, Sparkles } from 'lucide-react';
import { aboutCards, profile } from '@/content/profile';

export function About() {
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
    <section id="about" className="scroll-mt-20 py-16 border-t border-border/50">
      <motion.div className="space-y-8" {...animationProps}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
            <p className="text-muted-foreground text-sm">Background and how I got here</p>
          </div>
          <div className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground bg-muted/40 px-3.5 py-1.5 rounded-full border border-border/50 self-start md:self-auto">
            <MapPin className="h-4 w-4 text-primary" />
            <span>Chicago, IL</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Bio Text */}
          <div className="md:col-span-2 space-y-6 text-base text-muted-foreground leading-relaxed">
            {profile.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <Link
              to="/journey"
              className="inline-block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Read my full journey &rarr;
            </Link>
          </div>

          {/* Quick Highlight Cards */}
          <div className="space-y-4">
            <div className="p-5 rounded-lg border border-border/50 bg-card/20 space-y-3">
              <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>{aboutCards.philosophy.title}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {aboutCards.philosophy.body}
              </p>
            </div>

            <div className="p-5 rounded-lg border border-border/50 bg-card/20 space-y-2">
              <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">{aboutCards.currentFocus.label}</span>
              <div className="font-bold text-sm text-foreground">{aboutCards.currentFocus.heading}</div>
              <p className="text-xs text-muted-foreground">
                {aboutCards.currentFocus.body}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

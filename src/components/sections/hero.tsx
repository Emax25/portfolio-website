import { motion } from 'motion/react';
import { Download, Mail, Linkedin, Github, TrendingUp, Zap, BarChart2 } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { profile } from '@/content/profile';

export function Hero() {
  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const motionProps = {
    initial: isReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' as const },
  };

  const stats = [
    {
      icon: <TrendingUp className="h-5 w-5 text-emerald-500" />,
      value: '2nd of 616 Teams',
      label: '2025 CME Trading Challenge',
      detail: '410% Return in 1 Month',
    },
    {
      icon: <Zap className="h-5 w-5 text-amber-500" />,
      value: '~500x Speedup',
      label: 'Cantor Fitzgerald',
      detail: 'R-to-Python migration of 20+ signals',
    },
    {
      icon: <BarChart2 className="h-5 w-5 text-blue-500" />,
      value: '0.96 Model AUC',
      label: 'Bayesian Insider-Detection',
      detail: 'MCMC on hierarchical state-space model',
    },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-border/50">
      <div className="absolute inset-0 bg-radial-[circle_800px_at_center] from-primary/5 via-transparent to-transparent -z-10" />
      
      <motion.div className="text-center space-y-6 max-w-3xl px-4" {...motionProps}>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-muted/50 text-xs font-medium text-muted-foreground mb-4">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Open to quantitative finance roles &bull; M.S. expected Dec 2026
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
          {profile.name}
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
          {profile.title}
        </p>

        <p className="text-sm md:text-base text-muted-foreground/80 max-w-xl mx-auto">
          Chicago-based quantitative developer and researcher with a background in
          astrophysics, computer science, and machine learning.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
          <a
            href="/resume.pdf"
            download="Charlie_Carvajal_Resume.pdf"
            className={buttonVariants({ variant: 'default', size: 'lg', className: 'gap-2 shadow-sm font-semibold' })}
          >
            <Download className="h-4 w-4" />
            <span>Download Resume</span>
          </a>
          
          <a
            href="#contact"
            className={buttonVariants({ variant: 'outline', size: 'lg', className: 'gap-2 font-semibold' })}
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <Mail className="h-4 w-4" />
            <span>Contact</span>
          </a>

          <div className="flex items-center gap-2 border-l border-border pl-4">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'h-10 w-10 text-muted-foreground hover:text-foreground' })}
              title="LinkedIn Profile"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'h-10 w-10 text-muted-foreground hover:text-foreground' })}
              title="GitHub Profile"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Stats Highlight Grid */}
      <div className="container max-w-5xl mt-16 md:mt-24 px-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={isReduced ? {} : { opacity: 0, y: 20 }}
              whileInView={isReduced ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={isReduced ? {} : { duration: 0.5, delay: i * 0.15 }}
            >
              <Card className="bg-card/40 backdrop-blur-xs border-border/50 hover:border-border transition-colors h-full">
                <CardContent className="p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    {stat.icon}
                    <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                      {stat.label}
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold tracking-tight text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium mt-1">
                      {stat.detail}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

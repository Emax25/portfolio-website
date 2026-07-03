import { motion } from 'motion/react';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
import { profile } from '@/content/profile';

export function Contact() {
  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animationProps = isReduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
      };

  const contactLinks = [
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      description: 'Primary contact method for recruiting and professional inquiries.',
    },
    {
      icon: <Linkedin className="h-5 w-5 text-[#0A66C2]" />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/carvajalchar',
      href: profile.linkedin,
      description: 'Professional networking and career connection.',
    },
    {
      icon: <Github className="h-5 w-5 text-foreground" />,
      label: 'GitHub',
      value: 'github.com/Emax25',
      href: profile.github,
      description: 'Open-source code, quantitative algorithms, and developer activity.',
    },
  ];

  return (
    <section id="contact" className="scroll-mt-20 py-16 border-t border-border/50">
      <motion.div className="space-y-8 max-w-3xl mx-auto text-center" {...animationProps}>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            I am open to quantitative research, trading, and development opportunities. The fastest way to reach me is by email.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-4 text-left max-w-2xl mx-auto">
          {contactLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target={link.label !== 'Email' ? '_blank' : undefined}
              rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
              className="p-5 rounded-lg border border-border/50 bg-card/10 hover:bg-muted/15 hover:border-border transition-all flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted/60 border border-border/40 rounded-lg group-hover:border-primary/40 transition-colors">
                  {link.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    {link.label}
                    {link.label !== 'Email' && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
                  </div>
                  <div className="text-sm font-semibold text-primary font-mono mt-0.5">
                    {link.value}
                  </div>
                  <p className="text-xs text-muted-foreground/80 mt-1 leading-relaxed">
                    {link.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

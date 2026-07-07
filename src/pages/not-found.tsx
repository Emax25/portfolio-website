import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { usePageTitle } from '@/lib/use-page-title';

export function NotFound() {
  usePageTitle('Page Not Found');

  const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animationProps = isReduced
    ? {}
    : {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
      };

  return (
    <div className="container mx-auto px-4 py-32 max-w-md text-center">
      <motion.div className="space-y-6" {...animationProps}>
        <div className="space-y-2">
          <h1 className="text-7xl font-extrabold tracking-tight text-primary">404</h1>
          <h2 className="text-2xl font-bold tracking-tight">Page Not Found</h2>
        </div>
        <p className="text-muted-foreground text-base max-w-xs mx-auto">
          The page you are looking for does not exist, or has been moved to a different URL.
        </p>
        <div className="pt-2">
          <Link to="/" className={buttonVariants({ variant: 'default', className: 'gap-1.5' })}>
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

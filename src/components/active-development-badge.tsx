import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function ActiveDevelopmentBadge({ className }: { className?: string }) {
  return (
    <Badge variant="outline" className={cn('gap-1.5', className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden="true" />
      <span>Active Development</span>
    </Badge>
  );
}

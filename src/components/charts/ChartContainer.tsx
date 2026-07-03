import type { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ChartContainerProps {
  title: string;
  illustrative?: boolean;
  ariaLabel: string;
  children: ReactNode;
}

export function ChartContainer({
  title,
  illustrative = false,
  ariaLabel,
  children,
}: ChartContainerProps) {
  return (
    <Card className="w-full border border-border bg-card text-card-foreground shadow-xs overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-base font-semibold tracking-tight">
          {title}
        </CardTitle>
        {illustrative && (
          <Badge
            variant="secondary"
            className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/50 font-medium text-[10px] px-2 py-0.5 rounded-full"
          >
            Illustrative Data
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div
          role="img"
          aria-label={ariaLabel}
          className="w-full h-[300px] relative focus-visible:outline-hidden"
        >
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ChartContainer } from './ChartContainer';
import { getChartData } from '@/data/loaders';
import type { ChartSpec } from '@/content/types';

const EquityCurveChart = lazy(() =>
  import('./EquityCurveChart').then((m) => ({ default: m.EquityCurveChart }))
);
const ReturnsDistributionChart = lazy(() =>
  import('./ReturnsDistributionChart').then((m) => ({ default: m.ReturnsDistributionChart }))
);
const PosteriorProbabilityChart = lazy(() =>
  import('./PosteriorProbabilityChart').then((m) => ({ default: m.PosteriorProbabilityChart }))
);
const ConfusionMatrixChart = lazy(() =>
  import('./ConfusionMatrixChart').then((m) => ({ default: m.ConfusionMatrixChart }))
);

function ChartSkeleton() {
  return <div className="w-full h-full animate-pulse rounded-md bg-muted" aria-hidden="true" />;
}

/** Defers mounting children (and their lazy chunks) until the wrapper nears the viewport. */
function useNearViewport<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return { ref, visible };
}

interface ProjectChartProps {
  spec: ChartSpec;
}

export function ProjectChart({ spec }: ProjectChartProps) {
  const { ref, visible } = useNearViewport<HTMLDivElement>();
  const { data, illustrative } = getChartData(spec.dataSrc);
  const title = spec.title || 'Project Chart';

  let ariaLabel = `${title}. This is an interactive chart displaying project results.`;
  if (illustrative) {
    ariaLabel += ' The data shown is illustrative and synthetic.';
  }

  const renderChart = () => {
    switch (spec.kind) {
      case 'equity-curve':
        return <EquityCurveChart data={data} />;
      case 'distribution':
        return <ReturnsDistributionChart data={data} />;
      case 'line':
        return <PosteriorProbabilityChart data={data} />;
      case 'confusion-matrix':
        return <ConfusionMatrixChart data={data} />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Chart type "{spec.kind}" not supported.
          </div>
        );
    }
  };

  return (
    <div ref={ref}>
      <ChartContainer
        title={title}
        illustrative={illustrative}
        ariaLabel={ariaLabel}
      >
        {visible ? (
          <Suspense fallback={<ChartSkeleton />}>{renderChart()}</Suspense>
        ) : (
          <ChartSkeleton />
        )}
      </ChartContainer>
    </div>
  );
}

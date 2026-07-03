import { ChartContainer } from './ChartContainer';
import { EquityCurveChart } from './EquityCurveChart';
import { ReturnsDistributionChart } from './ReturnsDistributionChart';
import { PosteriorProbabilityChart } from './PosteriorProbabilityChart';
import { ConfusionMatrixChart } from './ConfusionMatrixChart';
import { getChartData } from '@/data/loaders';
import type { ChartSpec } from '@/content/types';

interface ProjectChartProps {
  spec: ChartSpec;
}

export function ProjectChart({ spec }: ProjectChartProps) {
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
    <ChartContainer
      title={title}
      illustrative={illustrative}
      ariaLabel={ariaLabel}
    >
      {renderChart()}
    </ChartContainer>
  );
}

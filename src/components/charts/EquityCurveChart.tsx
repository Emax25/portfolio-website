import { useEffect, useRef } from 'react';
import { createChart, AreaSeries } from 'lightweight-charts';
import { useTheme } from '@/components/theme-provider';
import type { EquityPoint } from '@/data/loaders';

interface EquityCurveChartProps {
  data: EquityPoint[];
}

export function EquityCurveChart({ data }: EquityCurveChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartContainerRef.current && chart) {
        chart.resize(chartContainerRef.current.clientWidth, 300);
      }
    };

    const isDark = theme === 'dark';

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { color: 'transparent' },
        textColor: isDark ? '#94a3b8' : '#64748b',
      },
      grid: {
        vertLines: { color: isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(100, 116, 139, 0.08)' },
        horzLines: { color: isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(100, 116, 139, 0.08)' },
      },
      rightPriceScale: {
        borderColor: isDark ? 'rgba(148, 163, 184, 0.15)' : 'rgba(100, 116, 139, 0.15)',
      },
      timeScale: {
        borderColor: isDark ? 'rgba(148, 163, 184, 0.15)' : 'rgba(100, 116, 139, 0.15)',
      },
    });

    const series = chart.addSeries(AreaSeries, {
      lineColor: isDark ? '#60a5fa' : '#2563eb',
      topColor: isDark ? 'rgba(96, 165, 250, 0.3)' : 'rgba(37, 99, 235, 0.2)',
      bottomColor: isDark ? 'rgba(96, 165, 250, 0.0)' : 'rgba(37, 99, 235, 0.0)',
      lineWidth: 2,
    });

    const formattedData = data.map((item) => ({
      time: item.time,
      value: item.value,
    }));

    series.setData(formattedData);
    chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [data, theme]);

  return <div ref={chartContainerRef} className="w-full h-full" />;
}

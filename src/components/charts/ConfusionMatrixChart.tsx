import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { useTheme } from '@/components/theme-provider';
import type { ConfusionPoint } from '@/data/loaders';

interface ConfusionMatrixChartProps {
  data: ConfusionPoint[];
}

export function ConfusionMatrixChart({ data }: ConfusionMatrixChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const gridColor = isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(100, 116, 139, 0.08)';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const legitimateColor = isDark ? '#34d399' : '#10b981'; // green for predicted legitimate
  const scamColor = isDark ? '#f87171' : '#ef4444'; // red for predicted scam

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis
          dataKey="actual"
          stroke={textColor}
          fontSize={11}
          tickLine={false}
          axisLine={false}
          dy={10}
        />
        <YAxis
          stroke={textColor}
          fontSize={11}
          tickLine={false}
          axisLine={false}
          dx={-5}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            color: isDark ? '#f8fafc' : '#0f172a',
            fontSize: '12px',
            borderRadius: '6px',
          }}
        />
        <Legend
          verticalAlign="top"
          height={36}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: '12px' }}
        />
        <Bar
          dataKey="predictedLegitimate"
          name="Predicted Legitimate"
          fill={legitimateColor}
          radius={[4, 4, 0, 0]}
          maxBarSize={40}
        />
        <Bar
          dataKey="predictedScam"
          name="Predicted Scam-Likely"
          fill={scamColor}
          radius={[4, 4, 0, 0]}
          maxBarSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

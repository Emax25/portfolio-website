import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useTheme } from '@/components/theme-provider';
import type { DistributionPoint } from '@/data/loaders';

interface ReturnsDistributionChartProps {
  data: DistributionPoint[];
}

export function ReturnsDistributionChart({ data }: ReturnsDistributionChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const gridColor = isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(100, 116, 139, 0.08)';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const barColor = isDark ? '#60a5fa' : '#2563eb';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis
          dataKey="bin"
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
          cursor={{ fill: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)' }}
        />
        <Bar
          dataKey="frequency"
          fill={barColor}
          radius={[4, 4, 0, 0]}
          maxBarSize={50}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

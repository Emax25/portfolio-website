import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
} from 'recharts';
import { useTheme } from '@/components/theme-provider';
import type { ModelComparisonPoint } from '@/data/loaders';

interface ModelComparisonChartProps {
  data: ModelComparisonPoint[];
}

export function ModelComparisonChart({ data }: ModelComparisonChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const gridColor = isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(100, 116, 139, 0.08)';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const barColor = isDark ? '#60a5fa' : '#2563eb';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 40, left: 10, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
        <XAxis
          type="number"
          domain={[0, 100]}
          stroke={textColor}
          fontSize={11}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: number) => `${v}%`}
        />
        <YAxis
          type="category"
          dataKey="model"
          width={150}
          stroke={textColor}
          fontSize={11}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          formatter={(value) => [`${value}%`, 'Test accuracy']}
          contentStyle={{
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            color: isDark ? '#f8fafc' : '#0f172a',
            fontSize: '12px',
            borderRadius: '6px',
          }}
          cursor={{ fill: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)' }}
        />
        <Bar dataKey="accuracy" fill={barColor} radius={[0, 4, 4, 0]} maxBarSize={24}>
          <LabelList
            dataKey="accuracy"
            position="right"
            formatter={(v) => `${Number(v).toFixed(1)}%`}
            fill={textColor}
            fontSize={11}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

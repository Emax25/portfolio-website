import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { useTheme } from '@/components/theme-provider';
import type { PosteriorPoint } from '@/data/loaders';

interface PosteriorProbabilityChartProps {
  data: PosteriorPoint[];
}

export function PosteriorProbabilityChart({ data }: PosteriorProbabilityChartProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const gridColor = isDark ? 'rgba(148, 163, 184, 0.08)' : 'rgba(100, 116, 139, 0.08)';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const suspiciousColor = isDark ? '#f87171' : '#dc2626'; // red for suspicious
  const normalColor = isDark ? '#94a3b8' : '#64748b'; // slate for normal

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="iteration"
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
          domain={[0, 1]}
          tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
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
          formatter={(value: any) => [`${(Number(value) * 100).toFixed(1)}%`, 'Probability']}
        />
        <Legend
          verticalAlign="top"
          height={36}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: '12px' }}
        />
        <Line
          type="monotone"
          dataKey="suspiciousWallet"
          name="Suspicious Wallet"
          stroke={suspiciousColor}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="normalWallet"
          name="Control Wallet"
          stroke={normalColor}
          strokeWidth={1.5}
          strokeDasharray="4 4"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

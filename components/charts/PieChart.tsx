'use client'

import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { SurveyStats } from '@/types'

interface PieChartProps {
  data: SurveyStats
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b']

export default function PieChart({ data }: PieChartProps) {
  const chartData = [
    { name: 'MySQL', value: data.mysql },
    { name: 'Android', value: data.android },
    { name: 'JavaScript', value: data.javascript },
  ]

  const total = data.total

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] text-gray-500">
        No data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RePieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(entry: any) => {
            const percent = (entry.value / total) * 100
            return `${entry.name}: ${percent.toFixed(1)}%`
          }}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: any) => [`${value} votes`, 'Count']} />
        <Legend />
      </RePieChart>
    </ResponsiveContainer>
  )
}
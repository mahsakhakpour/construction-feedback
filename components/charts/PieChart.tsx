'use client'

import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { SurveyStats } from '@/types'

interface PieChartProps {
  data?: SurveyStats
}

const COLORS = ['#3b82f6', '#22c55e', '#eab308']

export default function PieChart({ data }: PieChartProps) {
  if (!data) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No data available
      </div>
    )
  }

  const total = (data.residential || 0) + (data.commercial || 0) + (data.industrial || 0)
  
  const chartData = [
    { name: 'Residential', value: data.residential || 0 },
    { name: 'Commercial', value: data.commercial || 0 },
    { name: 'Industrial', value: data.industrial || 0 },
  ]

  const hasData = chartData.some(item => item.value > 0)

  if (!hasData) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No data to display
      </div>
    )
  }

  const renderLabel = (entry: any) => {
    const percent = ((entry.value / total) * 100).toFixed(0)
    return `${entry.name} ${percent}%`
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsPie>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderLabel}
          outerRadius={80}
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPie>
    </ResponsiveContainer>
  )
}
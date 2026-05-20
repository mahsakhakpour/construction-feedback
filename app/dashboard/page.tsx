'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import PieChart from '@/components/charts/PieChart'
import { SurveyStats } from '@/types'
import { Users, BarChart3, PieChart as PieChartIcon } from 'lucide-react'
import ExportButton from '@/components/ExportButton'

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery<SurveyStats>({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await fetch('/api/surveys?stats=true')
      return res.json()
    },
  })

  const statsCards = [
    { title: 'Total Clients', value: stats?.total || 0, icon: Users, color: 'bg-blue-500' },
    { title: 'Residential Projects', value: stats?.residential || 0, icon: BarChart3, color: 'bg-blue-500' },
    { title: 'Commercial Projects', value: stats?.commercial || 0, icon: BarChart3, color: 'bg-green-500' },
    { title: 'Industrial Projects', value: stats?.industrial || 0, icon: BarChart3, color: 'bg-yellow-500' },
  ]

  const percentages = stats && stats.total > 0 ? {
    residential: ((stats.residential / stats.total) * 100).toFixed(1),
    commercial: ((stats.commercial / stats.total) * 100).toFixed(1),
    industrial: ((stats.industrial / stats.total) * 100).toFixed(1),
  } : null

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Client feedback statistics and insights
          </p>
        </div>
        <ExportButton />
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{card.title}</p>
                    <p className="text-3xl font-bold mt-2">{card.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${card.color} bg-opacity-10`}>
                    <card.icon className={`h-6 w-6 ${card.color.replace('bg-', 'text-')}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5" />
                Project Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                </div>
              ) : stats && stats.total > 0 ? (
                <>
                  <PieChart data={stats} />
                  <div className="mt-6 space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Residential</span>
                        <span>{percentages?.residential}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${percentages?.residential}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Commercial</span>
                        <span>{percentages?.commercial}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${percentages?.commercial}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Industrial</span>
                        <span>{percentages?.industrial}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${percentages?.industrial}%` }} />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-500 py-8">No data available</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              {stats && stats.total > 0 ? (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <p className="text-sm text-blue-600 dark:text-blue-400">Most Popular</p>
                    <p className="text-2xl font-bold mt-1">
                      {stats.residential >= stats.commercial && stats.residential >= stats.industrial && 'Residential'}
                      {stats.commercial > stats.residential && stats.commercial >= stats.industrial && 'Commercial'}
                      {stats.industrial > stats.residential && stats.industrial > stats.commercial && 'Industrial'}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <p className="text-sm text-green-600 dark:text-green-400">Total Responses</p>
                    <p className="text-2xl font-bold mt-1">{stats.total} clients</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <p className="text-sm text-purple-600 dark:text-purple-400">Project Types</p>
                    <p className="text-2xl font-bold mt-1">3 Categories</p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">Submit feedback to see stats</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
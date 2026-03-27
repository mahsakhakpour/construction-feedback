'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import SurveyForm from '@/components/forms/SurveyForm'
import PieChart from '@/components/charts/PieChart'
import { SurveyStats } from '@/types'

export default function HomePage() {
  const { data: stats, isLoading } = useQuery<SurveyStats>({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await fetch('/api/surveys?stats=true')
      return res.json()
    },
  })

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-center mb-2">
          Course Platform Survey
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Share your preference for BCIT course platforms
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Opinion</CardTitle>
            </CardHeader>
            <CardContent>
              <SurveyForm />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Survey Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                </div>
              ) : stats && stats.total > 0 ? (
                <>
                  <PieChart data={stats} />
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-500">{stats.mysql}</p>
                      <p className="text-sm text-gray-600">MySQL</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-500">{stats.android}</p>
                      <p className="text-sm text-gray-600">Android</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-500">{stats.javascript}</p>
                      <p className="text-sm text-gray-600">JavaScript</p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-500 py-8">No surveys submitted yet</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
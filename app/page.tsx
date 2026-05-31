'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import SurveyForm from '@/components/forms/SurveyForm'
import PieChart from '@/components/charts/PieChart'
import { SurveyStats } from '@/types'
import ExportButton from '@/components/ExportButton'

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
          Construction Project Feedback
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Share your feedback on construction project types
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
              <CardTitle>Submit Your Feedback</CardTitle>
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
              <CardTitle>Feedback Results</CardTitle>
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
                      <p className="text-2xl font-bold text-blue-500">{stats.residential || 0}</p>
                      <p className="text-sm text-gray-600">Residential</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-500">{stats.commercial || 0}</p>
                      <p className="text-sm text-gray-600">Commercial</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-500">{stats.industrial || 0}</p>
                      <p className="text-sm text-gray-600">Industrial</p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-500 py-8">No feedback submitted yet</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <div className="flex justify-center">
        <ExportButton />
      </div>
    </div>
  )
}
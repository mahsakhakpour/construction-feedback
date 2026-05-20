'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { Survey } from '@/types'
import { formatDate } from '@/lib/utils'
import ExportButton from '@/components/ExportButton'

export default function SurveysPage() {
  const { data: surveys, isLoading } = useQuery<Survey[]>({
    queryKey: ['surveys'],
    queryFn: async () => {
      const res = await fetch('/api/surveys')
      return res.json()
    },
  })

  const getProjectColor = (project: string) => {
    switch (project) {
      case 'residential': return 'bg-blue-500'
      case 'commercial': return 'bg-green-500'
      case 'industrial': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getProjectLabel = (project: string) => {
    switch (project) {
      case 'residential': return 'Residential'
      case 'commercial': return 'Commercial'
      case 'industrial': return 'Industrial'
      default: return project
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Client Feedback</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Total: {surveys?.length || 0} responses
          </p>
        </motion.div>
        <ExportButton />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      ) : surveys && surveys.length > 0 ? (
        <div className="grid gap-4">
          {surveys.map((survey, index) => (
            <motion.div
              key={survey.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getProjectColor(survey.course)}`} />
                      <div>
                        <p className="font-medium">{survey.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(survey.timestamp)}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-800">
                      {getProjectLabel(survey.course)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            No client feedback submitted yet
          </CardContent>
        </Card>
      )}
    </div>
  )
}
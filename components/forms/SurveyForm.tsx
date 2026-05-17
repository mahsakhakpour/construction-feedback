'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { SurveyFormData } from '@/types'

const courses = [
  { value: 'mysql', label: 'MySQL', color: 'bg-blue-500' },
  { value: 'android', label: 'Android', color: 'bg-green-500' },
  { value: 'javascript', label: 'JavaScript', color: 'bg-yellow-500' },
]

export default function SurveyForm() {
  const [showSuccess, setShowSuccess] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SurveyFormData>()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: SurveyFormData) => {
      const res = await fetch('/api/surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      reset()
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    },
  })

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <Input
            {...register('name', { required: 'Name is required' })}
            placeholder="e.g., John Smith"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">Preferred Platform</label>
          <div className="space-y-3">
            {courses.map((course) => (
              <label key={course.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value={course.value}
                  {...register('course', { required: 'Please select a platform' })}
                  className="w-4 h-4 text-blue-600"
                />
                <span className={`w-3 h-3 rounded-full ${course.color}`} />
                <span className="text-sm font-medium">{course.label}</span>
              </label>
            ))}
          </div>
          {errors.course && (
            <p className="mt-1 text-sm text-red-500">{errors.course.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full"
        >
          {mutation.isPending ? 'Submitting...' : 'Submit Survey'}
        </Button>
      </form>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            Survey submitted successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { SurveyFormData } from '@/types'
import { geocodeAddress } from '@/lib/geocode'

const projectTypes = [
  { value: 'residential', label: 'Residential Construction', color: 'bg-blue-500' },
  { value: 'commercial', label: 'Commercial Construction', color: 'bg-green-500' },
  { value: 'industrial', label: 'Industrial Construction', color: 'bg-yellow-500' },
]

export default function SurveyForm() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [isGeocoding, setIsGeocoding] = useState(false)
  const { register, handleSubmit, reset, formState: { errors }, setError } = useForm<SurveyFormData>()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (data: SurveyFormData) => {
      setIsGeocoding(true)
      
      // Geocode the address to get coordinates
      const coords = await geocodeAddress(data.address)
      
      if (!coords) {
        throw new Error('Could not find location. Please enter a valid address.')
      }
      
      const payload = {
        name: data.name,
        course: data.course,
        address: data.address,
        lat: coords.lat,
        lng: coords.lng
      }
      
      const res = await fetch('/api/surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Submission failed')
      }
      
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surveys'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      reset()
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    },
    onError: (error: Error) => {
      alert(error.message)
    },
    onSettled: () => {
      setIsGeocoding(false)
    },
  })

  const onSubmit = (data: SurveyFormData) => {
    mutation.mutate(data)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Client Name</label>
          <Input
            {...register('name', { required: 'Client name is required' })}
            placeholder="e.g., ABC Construction"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Project Location</label>
          <Input
            {...register('address', { required: 'Project location is required' })}
            placeholder="e.g., #123, Vancouver, BC, Canada"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Enter city and state, or full street address
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">Project Type</label>
          <div className="space-y-3">
            {projectTypes.map((type) => (
              <label key={type.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value={type.value}
                  {...register('course', { required: 'Please select a project type' })}
                  className="w-4 h-4 text-blue-600"
                />
                <span className={`w-3 h-3 rounded-full ${type.color}`} />
                <span className="text-sm font-medium">{type.label}</span>
              </label>
            ))}
          </div>
          {errors.course && (
            <p className="mt-1 text-sm text-red-500">{errors.course.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={mutation.isPending || isGeocoding}
          className="w-full"
        >
          {isGeocoding ? 'Finding location...' : mutation.isPending ? 'Submitting...' : 'Submit Feedback'}
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
            Feedback submitted successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
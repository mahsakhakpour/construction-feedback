// Local storage mock database for demo
import { Survey, SurveyStats } from '@/types'

let surveys: Survey[] = []

// Load initial data from localStorage if available
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('surveys')
  if (stored) {
    surveys = JSON.parse(stored)
  } else {
    // Sample data for demo
    surveys = [
      { id: '1', name: 'John Smith', course: 'javascript', timestamp: new Date().toISOString() },
      { id: '2', name: 'Sarah Johnson', course: 'android', timestamp: new Date().toISOString() },
      { id: '3', name: 'Michael Brown', course: 'android', timestamp: new Date().toISOString() },
      { id: '4', name: 'Emily Davis', course: 'mysql', timestamp: new Date().toISOString() },
      { id: '5', name: 'David Wilson', course: 'mysql', timestamp: new Date().toISOString() },
    ]
    localStorage.setItem('surveys', JSON.stringify(surveys))
  }
}

export const db = {
  getSurveys: () => {
    return [...surveys].reverse()
  },
  
  addSurvey: (survey: Omit<Survey, 'id' | 'timestamp'>) => {
    const newSurvey: Survey = {
      ...survey,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    }
    surveys.push(newSurvey)
    if (typeof window !== 'undefined') {
      localStorage.setItem('surveys', JSON.stringify(surveys))
    }
    return newSurvey
  },
  
  getStats: (): SurveyStats => {
    const stats = {
      mysql: 0,
      android: 0,
      javascript: 0,
      total: surveys.length,
    }
    
    surveys.forEach(survey => {
      stats[survey.course]++
    })
    
    return stats
  },
}
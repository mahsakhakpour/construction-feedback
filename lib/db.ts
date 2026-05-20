// Local storage mock database for demo
import { Survey, SurveyStats } from '@/types'

let surveys: Survey[] = []

// Load initial data from localStorage if available
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('surveys')
  if (stored) {
    surveys = JSON.parse(stored)
  } else {
    // Sample data for construction company clients
    surveys = [
      { id: '1', name: 'ABC Construction', course: 'commercial', timestamp: new Date().toISOString() },
      { id: '2', name: 'Smith Builders', course: 'residential', timestamp: new Date().toISOString() },
      { id: '3', name: 'Industrial Solutions Inc', course: 'industrial', timestamp: new Date().toISOString() },
      { id: '4', name: 'City Developments Ltd', course: 'commercial', timestamp: new Date().toISOString() },
      { id: '5', name: 'Home Crafters', course: 'residential', timestamp: new Date().toISOString() },
      { id: '6', name: 'MetalFrame Industries', course: 'industrial', timestamp: new Date().toISOString() },
      { id: '7', name: 'Coastal Contractors', course: 'commercial', timestamp: new Date().toISOString() },
    ]
    localStorage.setItem('surveys', JSON.stringify(surveys))
  }
}

export const db = {
  getSurveys: () => {
    return [...surveys].reverse()
  },
  
  addSurvey: (survey: Omit<Survey, 'id' | 'timestamp'>) => {
    const isDuplicate = surveys.some(
      existing => existing.name.toLowerCase() === survey.name.toLowerCase()
    )
    
    if (isDuplicate) {
      throw new Error('DUPLICATE_NAME')
    }
    
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
    let residential = 0
    let commercial = 0
    let industrial = 0
    
    surveys.forEach(survey => {
      if (survey.course === 'residential') residential++
      if (survey.course === 'commercial') commercial++
      if (survey.course === 'industrial') industrial++
    })
    
    return {
      residential: residential,
      commercial: commercial,
      industrial: industrial,
      total: surveys.length,
    }
  },
}
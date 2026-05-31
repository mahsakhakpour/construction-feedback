export interface Survey {
  id: string
  name: string
  course: 'residential' | 'commercial' | 'industrial'
  timestamp: string
  address?: string
  lat?: number
  lng?: number
}

export interface SurveyFormData {
  name: string
  course: 'residential' | 'commercial' | 'industrial'
  address: string
}

export interface SurveyStats {
  residential: number
  commercial: number
  industrial: number
  total: number
}
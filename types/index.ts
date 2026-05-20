export interface Survey {
  id: string
  name: string
  course: 'residential' | 'commercial' | 'industrial'
  timestamp: string
}

export interface SurveyFormData {
  name: string
  course: 'residential' | 'commercial' | 'industrial'
}

export interface SurveyStats {
  residential: number
  commercial: number
  industrial: number
  total: number
}
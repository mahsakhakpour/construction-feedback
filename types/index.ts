export interface Survey {
  id: string
  name: string
  course: 'mysql' | 'android' | 'javascript'
  timestamp: string
}

export interface SurveyStats {
  mysql: number
  android: number
  javascript: number
  total: number
}

export interface SurveyFormData {
  name: string
  course: 'mysql' | 'android' | 'javascript'
}
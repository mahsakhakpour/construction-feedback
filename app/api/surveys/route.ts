import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { SurveyFormData } from '@/types'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const getStats = searchParams.get('stats')
  
  if (getStats === 'true') {
    const stats = db.getStats()
    return NextResponse.json(stats)
  }
  
  const surveys = db.getSurveys()
  return NextResponse.json(surveys)
}

export async function POST(request: NextRequest) {
  try {
    const body: SurveyFormData = await request.json()
    
    if (!body.name || !body.course) {
      return NextResponse.json(
        { error: 'Name and course are required' },
        { status: 400 }
      )
    }
    
    const newSurvey = db.addSurvey(body)
    return NextResponse.json(newSurvey, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
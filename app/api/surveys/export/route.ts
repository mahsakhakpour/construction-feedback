import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const surveys = db.getSurveys()
  
  if (surveys.length === 0) {
    return NextResponse.json(
      { error: 'No data available' },
      { status: 404 }
    )
  }
  
  const csvRows = [
    ['Name', 'Course', 'Timestamp'],
    ...surveys.map(survey => [
      survey.name,
      survey.course,
      survey.timestamp
    ])
  ]
  
  const csvContent = csvRows.map(row => row.join(',')).join('\n')
  
  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename=surveys-export.csv'
    }
  })
}
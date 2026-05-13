import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  const conversations = query('SELECT * FROM ai_conversations ORDER BY created_at ASC')
  return NextResponse.json(conversations)
}
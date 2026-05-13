import { NextResponse } from 'next/server'
import { getEmailCampaigns } from '@/lib/db'

export async function GET() {
  const campaigns = getEmailCampaigns()
  return NextResponse.json(campaigns)
}
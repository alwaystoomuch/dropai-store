import { NextResponse } from 'next/server'
import { getEmailCampaigns } from '@/lib/db'

export async function GET() {
  const campaigns = await getEmailCampaigns()
  return NextResponse.json(campaigns)
}
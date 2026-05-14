import { NextResponse } from 'next/server'
import { getSuppliers } from '@/lib/db'

export async function GET() {
  const suppliers = await getSuppliers()
  return NextResponse.json(suppliers)
}
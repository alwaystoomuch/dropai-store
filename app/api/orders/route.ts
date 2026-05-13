import { NextResponse } from 'next/server'
import { getOrders } from '@/lib/db'

export async function GET() {
  const orders = getOrders()
  return NextResponse.json(orders)
}
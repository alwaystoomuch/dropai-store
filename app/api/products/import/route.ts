import { NextResponse } from 'next/server'
import { createClient } from '@libsql/client'

function getDb() {
  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN
  if (url && authToken) {
    return createClient({ url, authToken })
  }
  return null
}

export async function POST(req: Request) {
  try {
    const db = getDb()
    if (!db) {
      // Demo mode: accept but don't persist
      const data = await req.json()
      return NextResponse.json({ 
        success: true, 
        demo: true, 
        count: Array.isArray(data) ? data.length : 1,
        message: '✅ Product saved (demo mode — set TURSO env vars for persistence)'
      })
    }

    const body = await req.json()
    const products = Array.isArray(body) ? body : [body]

    // Ensure products table exists
    await db.execute(`CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      supplier TEXT NOT NULL,
      cost_price REAL NOT NULL,
      selling_price REAL NOT NULL,
      profit REAL NOT NULL,
      stock_status TEXT DEFAULT 'in_stock',
      image_url TEXT,
      description TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )`)

    let imported = 0
    for (const product of products) {
      if (!product.name || !product.price) continue

      const id = `prod-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
      const cost = product.cost || product.price * 0.4
      const profit = product.price - cost

      await db.execute({
        sql: `INSERT INTO products (id, name, category, supplier, cost_price, selling_price, profit, stock_status, description)
              VALUES (?, ?, ?, ?, ?, ?, ?, 'in_stock', ?)`,
        args: [
          id,
          product.name,
          product.category || 'General',
          product.supplier || 'Manual Import',
          cost,
          product.price,
          profit,
          product.description || '',
        ],
      })
      imported++
    }

    return NextResponse.json({
      success: true,
      count: imported,
      message: `✅ Successfully imported ${imported} product${imported !== 1 ? 's' : ''}!`,
    })
  } catch (error: any) {
    console.error('Import error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
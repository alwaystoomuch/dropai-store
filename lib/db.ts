import { execSync } from 'child_process'

function findTeamDB(): string {
  try {
    return execSync('which team-db', { encoding: 'utf-8', timeout: 3000 }).trim()
  } catch {
    return '/home/agent-backend-data-engineer/.local/bin/team-db'
  }
}

const TEAM_DB = findTeamDB()

type Row = Record<string, any>

export function query(sql: string): Row[] {
  try {
    const output = execSync(`${TEAM_DB} ${JSON.stringify(sql)}`, {
      encoding: 'utf-8',
      timeout: 10000,
    })
    if (!output.trim()) return []
    const parsed = JSON.parse(output.trim())
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('DB query error:', error)
    return []
  }
}

export function getProducts(): Row[] {
  return query('SELECT * FROM products ORDER BY created_at DESC')
}

export function getOrders(): Row[] {
  return query('SELECT * FROM orders ORDER BY created_at DESC')
}

export function getSuppliers(): Row[] {
  return query('SELECT * FROM suppliers ORDER BY name ASC')
}

export function getAnalytics(): Row[] {
  return query('SELECT * FROM analytics ORDER BY date DESC')
}

export function getEmailCampaigns(): Row[] {
  return query('SELECT * FROM email_campaigns ORDER BY created_at DESC')
}

export function getDashboardStats() {
  const totalRevenue = query("SELECT COALESCE(SUM(amount), 0) as value FROM orders WHERE status IN ('confirmed','shipped','delivered')")
  const totalOrders = query("SELECT COUNT(*) as value FROM orders")
  const totalProducts = query("SELECT COUNT(*) as value FROM products")
  const avgOrderValue = query("SELECT COALESCE(AVG(amount), 0) as value FROM orders WHERE status IN ('confirmed','shipped','delivered')")
  
  return {
    totalRevenue: totalRevenue[0]?.value ?? 0,
    totalOrders: totalOrders[0]?.value ?? 0,
    totalProducts: totalProducts[0]?.value ?? 0,
    avgOrderValue: avgOrderValue[0]?.value ?? 0,
  }
}
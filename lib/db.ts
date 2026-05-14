import { createClient } from '@libsql/client'

// Turso client for production
let tursoClient: ReturnType<typeof createClient> | null = null

function getTursoClient() {
  if (tursoClient) return tursoClient
  
  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN
  
  if (url && authToken) {
    tursoClient = createClient({ url, authToken })
    return tursoClient
  }
  return null
}

type Row = Record<string, any>

export async function query(sql: string): Promise<Row[]> {
  const client = getTursoClient()
  if (client) {
    try {
      const result = await client.execute(sql)
      return result.rows as Row[]
    } catch (error) {
      console.error('DB query error:', error)
      return []
    }
  }
  
  // Fallback: return mock data when no DB is configured
  return getMockData(sql)
}

export async function getProducts(): Promise<Row[]> {
  return query('SELECT * FROM products ORDER BY created_at DESC')
}

export async function getOrders(): Promise<Row[]> {
  return query('SELECT * FROM orders ORDER BY created_at DESC')
}

export async function getSuppliers(): Promise<Row[]> {
  return query('SELECT * FROM suppliers ORDER BY name ASC')
}

export async function getAnalytics(): Promise<Row[]> {
  return query('SELECT * FROM analytics ORDER BY date DESC')
}

export async function getEmailCampaigns(): Promise<Row[]> {
  return query('SELECT * FROM email_campaigns ORDER BY created_at DESC')
}

export async function getDashboardStats() {
  const totalRevenue = await query("SELECT COALESCE(SUM(amount), 0) as value FROM orders WHERE status IN ('confirmed','shipped','delivered')")
  const totalOrders = await query("SELECT COUNT(*) as value FROM orders")
  const totalProducts = await query("SELECT COUNT(*) as value FROM products")
  const avgOrderValue = await query("SELECT COALESCE(AVG(amount), 0) as value FROM orders WHERE status IN ('confirmed','shipped','delivered')")
  
  return {
    totalRevenue: totalRevenue[0]?.value ?? 0,
    totalOrders: totalOrders[0]?.value ?? 0,
    totalProducts: totalProducts[0]?.value ?? 0,
    avgOrderValue: avgOrderValue[0]?.value ?? 0,
  }
}

// ─── Mock Data Fallback ──────────────────────────────────────────────
function getMockData(sql: string): Row[] {
  const s = sql.toLowerCase()
  if (s.includes('from products')) return MOCK_PRODUCTS
  if (s.includes('from orders')) return MOCK_ORDERS
  if (s.includes('from suppliers')) return MOCK_SUPPLIERS
  if (s.includes('from analytics')) return MOCK_ANALYTICS
  if (s.includes('from email_campaigns')) return MOCK_EMAIL_CAMPAIGNS
  return []
}

const MOCK_PRODUCTS: Row[] = [
  { id: 'prod-001', name: 'Wireless Bluetooth Earbuds', category: 'Tech Accessories', supplier: 'AliExpress', cost_price: 12.50, selling_price: 39.99, profit: 27.49, stock_status: 'in_stock', image_url: null, description: 'Premium wireless earbuds with noise cancellation', created_at: '2026-01-15' },
  { id: 'prod-002', name: 'Portable Phone Charger 10000mAh', category: 'Tech Accessories', supplier: 'CJDropshipping', cost_price: 8.00, selling_price: 29.99, profit: 21.99, stock_status: 'in_stock', image_url: null, description: 'High-capacity portable charger', created_at: '2026-01-15' },
  { id: 'prod-003', name: 'Adjustable Phone Stand', category: 'Tech Accessories', supplier: 'Spocket', cost_price: 3.50, selling_price: 14.99, profit: 11.49, stock_status: 'in_stock', image_url: null, description: 'Ergonomic adjustable phone stand', created_at: '2026-01-15' },
  { id: 'prod-004', name: 'LED Desk Lamp with Wireless Charger', category: 'Tech Accessories', supplier: 'AliExpress', cost_price: 15.00, selling_price: 49.99, profit: 34.99, stock_status: 'in_stock', image_url: null, description: 'Modern LED desk lamp with built-in wireless charger', created_at: '2026-01-15' },
  { id: 'prod-005', name: 'Smart Water Bottle with Reminder', category: 'Health & Wellness', supplier: 'Zendrop', cost_price: 9.00, selling_price: 34.99, profit: 25.99, stock_status: 'low_stock', image_url: null, description: 'Smart water bottle that reminds you to hydrate', created_at: '2026-01-15' },
  { id: 'prod-006', name: 'Resistance Bands Set', category: 'Health & Wellness', supplier: 'CJDropshipping', cost_price: 6.00, selling_price: 24.99, profit: 18.99, stock_status: 'in_stock', image_url: null, description: 'Complete resistance bands workout set', created_at: '2026-01-15' },
  { id: 'prod-007', name: 'Yoga Mat Extra Thick', category: 'Health & Wellness', supplier: 'Spocket', cost_price: 11.00, selling_price: 39.99, profit: 28.99, stock_status: 'in_stock', image_url: null, description: 'Extra thick premium yoga mat', created_at: '2026-01-15' },
  { id: 'prod-008', name: 'Essential Oil Diffuser', category: 'Health & Wellness', supplier: 'AliExpress', cost_price: 7.50, selling_price: 29.99, profit: 22.49, stock_status: 'in_stock', image_url: null, description: 'Ultrasonic essential oil diffuser with LED lights', created_at: '2026-01-15' },
  { id: 'prod-009', name: 'Bamboo Cutting Board Set', category: 'Home Goods', supplier: 'Zendrop', cost_price: 10.00, selling_price: 34.99, profit: 24.99, stock_status: 'in_stock', image_url: null, description: 'Organic bamboo cutting board set', created_at: '2026-01-15' },
  { id: 'prod-010', name: 'Slim Wallet with RFID Blocking', category: 'Tech Accessories', supplier: 'Printful', cost_price: 5.00, selling_price: 22.99, profit: 17.99, stock_status: 'low_stock', image_url: null, description: 'Minimalist RFID blocking wallet', created_at: '2026-01-15' },
]

const MOCK_ORDERS: Row[] = Array.from({ length: 20 }, (_, i) => ({
  id: `ORD-${String(i + 1).padStart(3, '0')}`,
  product_id: `prod-${String((i % 10) + 1).padStart(3, '0')}`,
  customer_name: ['Sarah Johnson', 'Mike Chen', 'Emma Williams', 'James Brown', 'Lisa Davis', 'Alex Turner', 'Maria Garcia', 'Tom Wilson', 'Anna Lee', 'Chris Evans'][i % 10],
  customer_email: `customer${i + 1}@example.com`,
  status: ['delivered', 'shipped', 'confirmed', 'pending', 'delivered', 'shipped', 'delivered', 'returned', 'delivered', 'cancelled'][i % 10],
  amount: [39.99, 29.99, 14.99, 49.99, 34.99, 24.99, 39.99, 29.99, 34.99, 22.99][i % 10],
  quantity: 1,
  tracking_number: i % 3 === 0 ? `TRK${100000 + i}` : null,
  created_at: new Date(Date.now() - i * 86400000).toISOString(),
  updated_at: new Date(Date.now() - i * 43200000).toISOString(),
}))

const MOCK_SUPPLIERS: Row[] = [
  { id: 'aliexpress', name: 'AliExpress', logo_url: null, rating: 4.2, shipping_speed_min_days: 10, shipping_speed_max_days: 25, is_active: 1 },
  { id: 'cjdropshipping', name: 'CJDropshipping', logo_url: null, rating: 4.5, shipping_speed_min_days: 7, shipping_speed_max_days: 18, is_active: 1 },
  { id: 'spocket', name: 'Spocket', logo_url: null, rating: 4.7, shipping_speed_min_days: 5, shipping_speed_max_days: 14, is_active: 1 },
  { id: 'zendrop', name: 'Zendrop', logo_url: null, rating: 4.3, shipping_speed_min_days: 8, shipping_speed_max_days: 20, is_active: 1 },
  { id: 'printful', name: 'Printful', logo_url: null, rating: 4.6, shipping_speed_min_days: 4, shipping_speed_max_days: 10, is_active: 1 },
]

const MOCK_ANALYTICS: Row[] = Array.from({ length: 30 }, (_, i) => ({
  id: `analytics-${i}`,
  metric_name: 'daily_revenue',
  metric_value: 500 + Math.random() * 800,
  date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
  category: 'revenue',
}))

const MOCK_EMAIL_CAMPAIGNS: Row[] = [
  { id: 'camp-1', campaign_type: 'welcome', subject: 'Welcome to DropAI!', body_html: null, sent_at: '2026-04-01', recipient_count: 1250, open_rate: 0.68 },
  { id: 'camp-2', campaign_type: 'order_confirmation', subject: 'Your order has been confirmed', body_html: null, sent_at: '2026-04-02', recipient_count: 342, open_rate: 0.95 },
  { id: 'camp-3', campaign_type: 'shipping_notification', subject: 'Your package is on the way!', body_html: null, sent_at: '2026-04-03', recipient_count: 298, open_rate: 0.92 },
  { id: 'camp-4', campaign_type: 'abandoned_cart', subject: 'You left something behind!', body_html: null, sent_at: '2026-04-04', recipient_count: 87, open_rate: 0.45 },
  { id: 'camp-5', campaign_type: 'supplier_outreach', subject: 'New partnership opportunity', body_html: null, sent_at: '2026-04-05', recipient_count: 12, open_rate: 1.0 },
]
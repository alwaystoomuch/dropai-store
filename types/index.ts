export interface Product {
  id: string
  name: string
  category: string
  supplier: string
  cost_price: number
  selling_price: number
  profit: number
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock'
  image_url: string | null
  description: string | null
  created_at: string
}

export interface Order {
  id: string
  product_id: string
  customer_name: string
  customer_email: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'returned' | 'cancelled'
  amount: number
  quantity: number
  tracking_number: string | null
  created_at: string
  updated_at: string
}

export interface Supplier {
  id: string
  name: string
  logo_url: string | null
  rating: number
  shipping_speed_min_days: number
  shipping_speed_max_days: number
  is_active: number
  created_at: string
}

export interface AnalyticsMetric {
  id: string
  metric_name: string
  metric_value: number
  date: string
  category: string
  created_at: string
}

export interface EmailCampaign {
  id: string
  campaign_type: string
  subject: string
  body_html: string | null
  sent_at: string | null
  recipient_count: number
  open_rate: number
  created_at: string
}

export interface AIConversation {
  id: string
  session_id: string
  role: 'user' | 'assistant'
  message: string
  created_at: string
}

export type PageProps = {
  params: Promise<{ [key: string]: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
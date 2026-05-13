export const SUPPLIERS = [
  { name: 'AliExpress', rating: 4.2, minDays: 10, maxDays: 25 },
  { name: 'CJDropshipping', rating: 4.5, minDays: 7, maxDays: 18 },
  { name: 'Spocket', rating: 4.7, minDays: 5, maxDays: 14 },
  { name: 'Zendrop', rating: 4.3, minDays: 8, maxDays: 20 },
  { name: 'Printful', rating: 4.6, minDays: 4, maxDays: 10 },
]

export const PRODUCT_CATEGORIES = [
  'Tech Accessories',
  'Health & Wellness',
  'Home Goods',
  'Fashion',
  'Beauty',
  'Pet Supplies',
  'Outdoor',
  'Kitchen',
]

export const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'shipped',
  'delivered',
  'returned',
  'cancelled',
] as const

export const EMAIL_CAMPAIGN_TYPES = [
  'welcome',
  'order_confirmation',
  'shipping_notification',
  'abandoned_cart',
  'supplier_outreach',
] as const

export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Products', href: '/products', icon: 'Package' },
  { label: 'Orders', href: '/orders', icon: 'ShoppingCart' },
  { label: 'Suppliers', href: '/suppliers', icon: 'Truck' },
  { label: 'AI Assistant', href: '/ai-assistant', icon: 'Bot' },
  { label: 'Analytics', href: '/analytics', icon: 'BarChart3' },
  { label: 'Emails', href: '/emails', icon: 'Mail' },
] as const

export const APP_NAME = 'DropAI'
export const APP_TAGLINE = 'AI-Powered Dropshipping Store'
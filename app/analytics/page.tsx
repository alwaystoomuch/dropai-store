'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import StatsCard from '@/components/StatsCard'
import { TrendingUp, Users, RotateCcw, Globe, DollarSign, ShoppingBag } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

export default function AnalyticsPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/orders').then(r => r.json()),
      fetch('/api/products').then(r => r.json()),
    ]).then(([ordersData, productsData]) => {
      setOrders(Array.isArray(ordersData) ? ordersData : [])
      setProducts(Array.isArray(productsData) ? productsData : [])
    }).finally(() => setLoading(false))
  }, [])

  const totalRevenue = orders.filter(o => ['delivered', 'shipped', 'confirmed'].includes(o.status)).reduce((s, o) => s + (o.amount || 0), 0)
  const totalOrders = orders.length
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
  const deliveredOrders = orders.filter(o => o.status === 'delivered')
  const returnRate = orders.length > 0 ? (orders.filter(o => o.status === 'returned').length / orders.length * 100).toFixed(1) : '0'
  const dailyRevenue = totalOrders > 0 ? (totalRevenue / Math.max(1, Math.ceil((Date.now() - new Date(orders[0]?.created_at || Date.now()).getTime()) / 86400000))).toFixed(2) : '0'

  // Revenue trend (last 7 days)
  const revenueTrend = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString('en-US', { weekday: 'short' })
    const dayOrders = orders.filter(o => new Date(o.created_at).toDateString() === new Date(Date.now() - (6 - i) * 86400000).toDateString())
    return { name: date, revenue: dayOrders.reduce((s, o) => s + (o.amount || 0), 0) }
  })

  const trafficData = [
    { name: 'Instagram', value: 42, color: '#E1306C' },
    { name: 'Google', value: 28, color: '#4285F4' },
    { name: 'TikTok', value: 18, color: '#000000' },
    { name: 'Email', value: 12, color: '#6366f1' },
  ]

  // Top products by revenue
  const productRevenue: Record<string, { name: string; revenue: number; count: number }> = {}
  orders.forEach(o => {
    if (!productRevenue[o.product_id]) productRevenue[o.product_id] = { name: o.product_id, revenue: 0, count: 0 }
    productRevenue[o.product_id].revenue += o.amount || 0
    productRevenue[o.product_id].count += 1
  })
  const topProducts = Object.entries(productRevenue)
    .sort(([, a], [, b]) => b.revenue - a.revenue)
    .slice(0, 5)
    .map(([id, data]) => {
      const product = products.find(p => p.id === id)
      return { ...data, name: product?.name || id, id }
    })

  if (loading) {
    return (
      <>
        <Header title="Analytics" />
        <div className="p-8 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1,2,3,4,5,6].map(i => <div key={i} className="bg-white rounded-xl border border-slate-200 p-6"><div className="skeleton h-20 w-full" /></div>)}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header title="Analytics" />
      <div className="p-8 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Total Revenue" value={totalRevenue} change={12.5} icon={<TrendingUp className="w-6 h-6" />} color="indigo" />
          <StatsCard title="Avg Order Value" value={`$${avgOrderValue.toFixed(2)}`} change={5.4} icon={<DollarSign className="w-6 h-6" />} color="green" />
          <StatsCard title="Return Rate" value={`${returnRate}%`} change={-0.3} icon={<RotateCcw className="w-6 h-6" />} color="orange" />
          <StatsCard title="Total Orders" value={totalOrders} change={22.1} icon={<Users className="w-6 h-6" />} color="blue" />
          <StatsCard title="Daily Revenue" value={`$${dailyRevenue}`} change={6.7} icon={<ShoppingBag className="w-6 h-6" />} color="purple" />
          <StatsCard title="Delivered" value={deliveredOrders.length} change={deliveredOrders.length > 0 ? 15 : 0} icon={<Globe className="w-6 h-6" />} color="green" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Revenue Trend (7 Days)</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueTrend} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#colorRev)" name="Revenue" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Traffic Sources</h2>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={trafficData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                    {trafficData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Top Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  {['Product', 'Revenue', 'Units Sold'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topProducts.length === 0 ? (
                  <tr><td colSpan={3} className="px-4 py-12 text-center text-slate-400">No sales data yet</td></tr>
                ) : (
                  topProducts.map((p, i) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm text-slate-900">{p.name}</td>
                      <td className="px-4 py-3 text-sm font-medium text-emerald-600">${p.revenue.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{p.count}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
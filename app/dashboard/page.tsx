'use client'

import { DollarSign, ShoppingCart, Package, TrendingUp, ArrowUpRight, Activity, Clock } from 'lucide-react'
import Header from '@/components/Header'
import StatsCard from '@/components/StatsCard'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const revenueData = [
  { name: 'Jan', revenue: 12500, orders: 145 },
  { name: 'Feb', revenue: 18200, orders: 210 },
  { name: 'Mar', revenue: 15800, orders: 185 },
  { name: 'Apr', revenue: 22100, orders: 260 },
  { name: 'May', revenue: 24850, orders: 290 },
  { name: 'Jun', revenue: 23500, orders: 275 },
]

const recentOrders = [
  { id: '#ORD-001', customer: 'Sarah Johnson', product: 'Wireless Earbuds', amount: '$89.99', status: 'Delivered', date: '2 min ago' },
  { id: '#ORD-002', customer: 'Mike Chen', product: 'Portable Charger', amount: '$49.99', status: 'Shipped', date: '15 min ago' },
  { id: '#ORD-003', customer: 'Emma Williams', product: 'Phone Stand', amount: '$24.99', status: 'Processing', date: '1 hour ago' },
  { id: '#ORD-004', customer: 'James Brown', product: 'LED Desk Lamp', amount: '$59.99', status: 'Shipped', date: '2 hours ago' },
  { id: '#ORD-005', customer: 'Lisa Davis', product: 'Yoga Mat', amount: '$39.99', status: 'Pending', date: '3 hours ago' },
]

const statusColors: Record<string, string> = {
  'Delivered': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Shipped': 'bg-blue-50 text-blue-700 border-blue-200',
  'Processing': 'bg-amber-50 text-amber-700 border-amber-200',
  'Pending': 'bg-slate-50 text-slate-600 border-slate-200',
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-4">
        <p className="text-sm font-semibold text-slate-900 mb-2">{label}</p>
        {payload.map((entry: any, idx: number) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-600">{entry.name}:</span>
            <span className="font-medium text-slate-900">
              {entry.name === 'Revenue' ? `${entry.value.toLocaleString()}` : entry.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="p-8 animate-fade-in">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Revenue"
            value={24850}
            change={12.5}
            icon={<DollarSign className="w-6 h-6" />}
            color="green"
          />
          <StatsCard
            title="Total Orders"
            value={342}
            change={8.2}
            icon={<ShoppingCart className="w-6 h-6" />}
            color="blue"
          />
          <StatsCard
            title="Active Products"
            value={30}
            change={0}
            icon={<Package className="w-6 h-6" />}
            color="purple"
          />
          <StatsCard
            title="Avg Order Value"
            value="$72.66"
            change={-2.1}
            icon={<TrendingUp className="w-6 h-6" />}
            color="orange"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Revenue Overview</h2>
                <p className="text-sm text-slate-500">Monthly revenue and order trends</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span className="text-xs text-slate-500">Revenue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs text-slate-500">Orders</span>
                </div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revenueGradient)" name="Revenue" />
                  <Area type="monotone" dataKey="orders" stroke="#34d399" strokeWidth={2} fill="none" name="Orders" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
                <p className="text-sm text-slate-500">Latest 5 orders in real-time</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">
                <Activity className="w-3 h-3" />
                Live
              </span>
            </div>
            <div className="space-y-3">
              {recentOrders.map((order, idx) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={clsx(
                      'w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold',
                      idx === 0 ? 'bg-emerald-50 text-emerald-600' :
                      idx === 1 ? 'bg-blue-50 text-blue-600' :
                      idx === 2 ? 'bg-amber-50 text-amber-600' :
                      'bg-slate-50 text-slate-600'
                    )}>
                      {order.customer.charAt(0)}{order.customer.split(' ')[1]?.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{order.customer}</p>
                      <p className="text-xs text-slate-500 truncate">{order.product} &middot; {order.amount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={clsx(
                      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
                      statusColors[order.status] || 'bg-slate-50 text-slate-600 border-slate-200'
                    )}>
                      {order.status}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="w-3 h-3" />
                      {order.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Assistant Quick Ask */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">AI Assistant</h2>
              <p className="text-sm text-slate-500">Ask anything about your store&apos;s performance</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Ask AI about your store... e.g. 'What's my best selling product?'"
                className="flex-1 px-4 py-3 rounded-lg border border-indigo-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all inline-flex items-center gap-2 shadow-md hover:shadow-lg">
                Ask
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-slate-400">Quick suggestions:</span>
              {['Revenue trends', 'Top products', 'Low stock alerts'].map((suggestion) => (
                <button
                  key={suggestion}
                  className="text-xs px-3 py-1 rounded-full bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-100 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function clsx(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}
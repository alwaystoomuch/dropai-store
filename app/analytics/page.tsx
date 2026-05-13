'use client'

import Header from '@/components/Header'
import StatsCard from '@/components/StatsCard'
import { TrendingUp, Users, ShoppingBag, RotateCcw, Globe, DollarSign, ArrowUpRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const revenueTrend = [
  { month: 'Jan', revenue: 12500, profit: 4500 },
  { month: 'Feb', revenue: 18200, profit: 6200 },
  { month: 'Mar', revenue: 15800, profit: 5500 },
  { month: 'Apr', revenue: 22100, profit: 7800 },
  { month: 'May', revenue: 24850, profit: 8900 },
  { month: 'Jun', revenue: 23500, profit: 8200 },
]

const trafficSources = [
  { name: 'Instagram', value: 42, color: '#ec4899' },
  { name: 'Facebook', value: 28, color: '#3b82f6' },
  { name: 'Google', value: 18, color: '#6366f1' },
  { name: 'TikTok', value: 8, color: '#14b8a6' },
  { name: 'Other', value: 4, color: '#94a3b8' },
]

const topProducts = [
  { name: 'Wireless Earbuds', revenue: 13680, units: 342, conversion: 4.2, roi: 320 },
  { name: 'Portable Charger', revenue: 8600, units: 287, conversion: 3.8, roi: 280 },
  { name: 'Aromatherapy Steamers', revenue: 4680, units: 234, conversion: 5.1, roi: 340 },
  { name: 'Resistance Bands', revenue: 5300, units: 212, conversion: 4.5, roi: 310 },
  { name: 'Phone Stand', revenue: 2970, units: 198, conversion: 3.2, roi: 260 },
  { name: 'Yoga Mat', revenue: 7120, units: 178, conversion: 6.1, roi: 380 },
  { name: 'Slim Wallet', revenue: 3840, units: 167, conversion: 4.8, roi: 290 },
]

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
              {entry.name.includes('Revenue') || entry.name.includes('Profit')
                ? `$${entry.value.toLocaleString()}`
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  return (
    <>
      <Header title="Analytics" subtitle="See what's working and double down on it" />
      <div className="p-8 animate-fade-in">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard title="Conversion Rate" value="3.2%" change={0.8} icon={<TrendingUp className="w-6 h-6" />} color="indigo" />
          <StatsCard title="Avg Order Value" value="$72.66" change={5.4} icon={<DollarSign className="w-6 h-6" />} color="green" />
          <StatsCard title="Return Rate" value="2.1%" change={-0.3} icon={<RotateCcw className="w-6 h-6" />} color="orange" />
          <StatsCard title="Total Visitors" value="12,847" change={22.1} icon={<Users className="w-6 h-6" />} color="blue" />
          <StatsCard title="Top Channel" value="Instagram" icon={<Globe className="w-6 h-6" />} color="purple" subtitle="42% of all traffic" />
          <StatsCard title="Daily Revenue" value="$812.40" change={6.7} icon={<ShoppingBag className="w-6 h-6" />} color="green" subtitle="Avg over last 30 days" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue & Profit Chart */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Revenue vs Profit</h2>
                <p className="text-sm text-slate-500">Monthly comparison</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span className="text-xs text-slate-500">Revenue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs text-slate-500">Profit</span>
                </div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueTrend} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} name="Revenue" />
                  <Bar dataKey="profit" fill="#34d399" radius={[4, 4, 0, 0]} name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Traffic Sources Pie */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Traffic Sources</h2>
                <p className="text-sm text-slate-500">Where your visitors come from</p>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">
                <ArrowUpRight className="w-3 h-3" />
                Top: Instagram
              </span>
            </div>
            <div className="flex items-center justify-center gap-8">
              <div className="h-56 w-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {trafficSources.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {trafficSources.map((source) => (
                  <div key={source.name} className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                    <span className="text-sm text-slate-600 w-20">{source.name}</span>
                    <span className="text-sm font-semibold text-slate-900">{source.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Top Products</h2>
            <p className="text-sm text-slate-500 mt-0.5">Best performing products by revenue and conversion</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {['Product', 'Revenue', 'Units Sold', 'Conversion', 'ROI'].map(h => (
                    <th key={h} className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topProducts.map((product, idx) => (
                  <tr key={product.name} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                          idx === 0 ? 'bg-amber-50 text-amber-700' :
                          idx === 1 ? 'bg-slate-100 text-slate-600' :
                          idx === 2 ? 'bg-orange-50 text-orange-700' :
                          'bg-transparent'
                        }`}>
                          {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                        </span>
                        <span className="text-sm font-medium text-slate-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">${product.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{product.units}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${(product.conversion / 7) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">{product.conversion}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-emerald-600">{product.roi}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
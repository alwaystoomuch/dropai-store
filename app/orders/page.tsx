'use client'

import { useState, useEffect } from 'react'
import { Clock, Search, Package } from 'lucide-react'
import Header from '@/components/Header'

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/orders')
      .then(r => r.json())
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [])

  const filtered = orders.filter(o => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter
    const matchSearch = o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
                        o.id?.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const statusStyles: Record<string, string> = {
    delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    shipped: 'bg-blue-50 text-blue-700 border-blue-200',
    confirmed: 'bg-amber-50 text-amber-700 border-amber-200',
    pending: 'bg-slate-50 text-slate-600 border-slate-200',
    returned: 'bg-red-50 text-red-700 border-red-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
  }

  return (
    <>
      <Header title="Orders" />
      <div className="p-8 animate-fade-in">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Total Orders</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{orders.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Delivered</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{orders.filter(o => o.status === 'delivered').length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Shipped</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">{orders.filter(o => o.status === 'shipped').length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Pending</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{orders.filter(o => o.status === 'pending').length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'returned', 'cancelled'].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  statusFilter === s
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {['Order ID', 'Customer', 'Amount', 'Quantity', 'Status', 'Tracking', 'Date'].map(h => (
                    <th key={h} className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={7} className="px-6 py-16 text-center text-slate-400">Loading orders...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">No orders found</p>
                      <p className="text-slate-400 text-sm mt-1">Try adjusting your filter</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono font-medium text-slate-900">{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600">
                            {order.customer_name?.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{order.customer_name}</p>
                            <p className="text-xs text-slate-400">{order.customer_email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">${order.amount?.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{order.quantity}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${statusStyles[order.status] || 'bg-slate-50 text-slate-600'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 font-mono">{order.tracking_number || '—'}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {filtered.length > 0 && (
            <div className="border-t border-slate-100 px-6 py-3 flex items-center justify-between bg-slate-50/50">
              <p className="text-sm text-slate-500">Showing {filtered.length} of {orders.length} orders</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
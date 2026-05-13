'use client'

import { ShoppingCart, Search, Eye, Clock, CheckCircle, XCircle, Truck, Ban, AlertCircle } from 'lucide-react'
import Header from '@/components/Header'
import { useState } from 'react'

const mockOrders = [
  { id: 'ORD-2026-001', customer: 'Sarah Johnson', email: 'sarah.j@email.com', product: 'Wireless Bluetooth Earbuds', amount: 39.99, quantity: 1, status: 'delivered', date: '2026-05-12T10:30:00Z', tracking: 'USPS-940551189922345678' },
  { id: 'ORD-2026-002', customer: 'Mike Chen', email: 'mike.c@email.com', product: 'Portable Phone Charger 10000mAh', amount: 29.99, quantity: 2, status: 'shipped', date: '2026-05-12T14:15:00Z', tracking: 'FEDEX-783429102' },
  { id: 'ORD-2026-003', customer: 'Emma Williams', email: 'emma.w@email.com', product: 'Adjustable Phone Stand', amount: 14.99, quantity: 1, status: 'confirmed', date: '2026-05-11T09:45:00Z', tracking: null },
  { id: 'ORD-2026-004', customer: 'James Brown', email: 'james.b@email.com', product: 'LED Desk Lamp with Wireless Charger', amount: 49.99, quantity: 1, status: 'shipped', date: '2026-05-11T16:20:00Z', tracking: 'UPS-1Z999AA10123456784' },
  { id: 'ORD-2026-005', customer: 'Lisa Davis', email: 'lisa.d@email.com', product: 'Resistance Bands Set', amount: 24.99, quantity: 1, status: 'pending', date: '2026-05-10T08:00:00Z', tracking: null },
  { id: 'ORD-2026-006', customer: 'Tom Wilson', email: 'tom.w@email.com', product: 'Smart Water Bottle', amount: 34.99, quantity: 1, status: 'returned', date: '2026-05-09T11:30:00Z', tracking: 'USPS-940551189922345679' },
  { id: 'ORD-2026-007', customer: 'Anna Martinez', email: 'anna.m@email.com', product: 'Yoga Mat Extra Thick', amount: 39.99, quantity: 1, status: 'delivered', date: '2026-05-09T15:00:00Z', tracking: 'FEDEX-783429103' },
  { id: 'ORD-2026-008', customer: 'David Lee', email: 'david.l@email.com', product: 'Essential Oil Diffuser', amount: 29.99, quantity: 1, status: 'cancelled', date: '2026-05-08T12:45:00Z', tracking: null },
  { id: 'ORD-2026-009', customer: 'Rachel Green', email: 'rachel.g@email.com', product: 'Bamboo Cutting Board Set', amount: 34.99, quantity: 1, status: 'confirmed', date: '2026-05-08T10:00:00Z', tracking: null },
  { id: 'ORD-2026-010', customer: 'Chris Evans', email: 'chris.e@email.com', product: 'Aromatherapy Shower Steamers', amount: 19.99, quantity: 3, status: 'pending', date: '2026-05-07T18:30:00Z', tracking: null },
]

const statusConfig: Record<string, { label: string, bg: string, icon: any }> = {
  delivered: { label: 'Delivered', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle },
  shipped: { label: 'Shipped', bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: Truck },
  confirmed: { label: 'Confirmed', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: Clock },
  pending: { label: 'Pending', bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: AlertCircle },
  returned: { label: 'Returned', bg: 'bg-rose-50 text-rose-700 border-rose-200', icon: XCircle },
  cancelled: { label: 'Cancelled', bg: 'bg-slate-50 text-slate-600 border-slate-200', icon: Ban },
}

const allStatuses = ['All Statuses', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Returned', 'Cancelled']

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState('All Statuses')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOrders = mockOrders.filter(o => {
    const matchesStatus = statusFilter === 'All Statuses' || o.status === statusFilter.toLowerCase()
    const matchesSearch = o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         o.product.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const statusCounts = mockOrders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const totalRevenue = mockOrders
    .filter(o => o.status !== 'cancelled' && o.status !== 'returned')
    .reduce((sum, o) => sum + o.amount * o.quantity, 0)

  return (
    <>
      <Header title="Orders" subtitle="Track every sale in real time — from payment to delivery" />
      <div className="p-8 animate-fade-in">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:shadow-md transition-shadow">
            <p className="text-2xl font-bold text-slate-900">{mockOrders.length}</p>
            <p className="text-xs text-slate-500 mt-1">Total Orders</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:shadow-md transition-shadow">
            <p className="text-2xl font-bold text-emerald-600">{statusCounts.delivered || 0}</p>
            <p className="text-xs text-slate-500 mt-1">Delivered</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:shadow-md transition-shadow">
            <p className="text-2xl font-bold text-blue-600">{statusCounts.shipped || 0}</p>
            <p className="text-xs text-slate-500 mt-1">Shipped</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:shadow-md transition-shadow">
            <p className="text-2xl font-bold text-amber-600">{statusCounts.pending || 0}</p>
            <p className="text-xs text-slate-500 mt-1">Pending</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:shadow-md transition-shadow">
            <p className="text-2xl font-bold text-rose-600">{statusCounts.returned || 0}</p>
            <p className="text-xs text-slate-500 mt-1">Returns</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:shadow-md transition-shadow">
            <p className="text-2xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-1">Revenue</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search orders, customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 w-64"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 bg-white"
            >
              {allStatuses.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors inline-flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {['Order ID', 'Customer', 'Product', 'Amount', 'Qty', 'Status', 'Tracking', 'Date'].map(h => (
                    <th key={h} className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center">
                      <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">No orders found</p>
                      <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filter</p>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const statusInfo = statusConfig[order.status]
                    const StatusIcon = statusInfo.icon
                    return (
                      <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-mono font-medium text-slate-900">{order.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-slate-900">{order.customer}</p>
                            <p className="text-xs text-slate-400">{order.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700 max-w-[200px] truncate">{order.product}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">${(order.amount * order.quantity).toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{order.quantity}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusInfo.bg}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 font-mono max-w-[140px] truncate">
                          {order.tracking || '—'}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{formatDate(order.date)}</td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
          {filteredOrders.length > 0 && (
            <div className="border-t border-slate-100 px-6 py-3 flex items-center justify-between bg-slate-50/50">
              <p className="text-sm text-slate-500">
                Showing {filteredOrders.length} of {mockOrders.length} orders
              </p>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map(p => (
                  <button key={p} className={`w-8 h-8 rounded-lg text-xs font-medium ${
                    p === 1 ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}>{p}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
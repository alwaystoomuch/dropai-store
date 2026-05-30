'use client'

import { Package, Search, Plus, AlertTriangle, CheckCircle } from 'lucide-react'
import Header from '@/components/Header'
import { useState, useEffect } from 'react'

const statusStyles: Record<string, { label: string, bg: string, icon: any }> = {
  in_stock: { label: 'In Stock', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle },
  low_stock: { label: 'Low Stock', bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: AlertTriangle },
  out_of_stock: { label: 'Out of Stock', bg: 'bg-red-50 text-red-700 border-red-200', icon: AlertTriangle },
}

const categories = ['All', 'Tech Accessories', 'Health & Wellness', 'Home Goods']

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [])

  const filteredProducts = products.filter((p: any) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    const matchesSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.supplier?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalProfit = filteredProducts.reduce((sum: number, p: any) => sum + (p.profit || 0) * (p.sales || 0), 0)

  return (
    <>
      <Header title="Products" />
      <div className="p-8 animate-fade-in">
        {/* Summary Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Total Products</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{products.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">In Stock</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{products.filter((p: any) => p.stock_status === 'in_stock').length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Low Stock</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{products.filter((p: any) => p.stock_status === 'low_stock').length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Total Cost</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">${products.reduce((s: number, p: any) => s + (p.cost_price || 0), 0).toLocaleString()}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 w-64"
              />
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {['Product', 'Category', 'Cost', 'Sell Price', 'Profit', 'Margin', 'Supplier', 'Status'].map(h => (
                    <th key={h} className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={8} className="px-6 py-16 text-center text-slate-400">Loading products...</td></tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center">
                      <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">No products found</p>
                      <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filter</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product: any, idx: number) => {
                    const statusInfo = statusStyles[product.stock_status || 'in_stock']
                    const cost = product.cost_price || 0
                    const sell = product.selling_price || 0
                    const profit = product.profit || 0
                    const margin = sell > 0 ? ((profit / sell) * 100).toFixed(0) : '0'
                    const StatusIcon = statusInfo.icon
                    return (
                      <tr key={product.id || idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-slate-900">{product.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">${cost.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">${sell.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm font-medium text-emerald-600">+${profit.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${margin}%` }} />
                            </div>
                            <span className="text-xs text-slate-500">{margin}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{product.supplier}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${statusInfo.bg}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.label}
                          </span>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
          {filteredProducts.length > 0 && (
            <div className="border-t border-slate-100 px-6 py-3 flex items-center justify-between bg-slate-50/50">
              <p className="text-sm text-slate-500">Showing {filteredProducts.length} of {products.length} products</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
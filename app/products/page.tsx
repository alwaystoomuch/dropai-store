'use client'

import { Package, Search, Plus, AlertTriangle, CheckCircle } from 'lucide-react'
import Header from '@/components/Header'
import { useState } from 'react'

const mockProducts = [
  { name: 'Wireless Bluetooth Earbuds', category: 'Tech Accessories', cost: 12.50, sellPrice: 39.99, profit: 27.49, supplier: 'AliExpress', status: 'in_stock', sales: 342 },
  { name: 'Portable Phone Charger 10000mAh', category: 'Tech Accessories', cost: 8.00, sellPrice: 29.99, profit: 21.99, supplier: 'CJDropshipping', status: 'in_stock', sales: 287 },
  { name: 'Adjustable Phone Stand', category: 'Tech Accessories', cost: 3.50, sellPrice: 14.99, profit: 11.49, supplier: 'Spocket', status: 'in_stock', sales: 198 },
  { name: 'LED Desk Lamp with Wireless Charger', category: 'Tech Accessories', cost: 15.00, sellPrice: 49.99, profit: 34.99, supplier: 'AliExpress', status: 'in_stock', sales: 156 },
  { name: 'Smart Water Bottle with Reminder', category: 'Health & Wellness', cost: 9.00, sellPrice: 34.99, profit: 25.99, supplier: 'Zendrop', status: 'low_stock', sales: 134 },
  { name: 'Resistance Bands Set', category: 'Health & Wellness', cost: 6.00, sellPrice: 24.99, profit: 18.99, supplier: 'CJDropshipping', status: 'in_stock', sales: 212 },
  { name: 'Yoga Mat Extra Thick', category: 'Health & Wellness', cost: 11.00, sellPrice: 39.99, profit: 28.99, supplier: 'Spocket', status: 'in_stock', sales: 178 },
  { name: 'Essential Oil Diffuser', category: 'Health & Wellness', cost: 7.50, sellPrice: 29.99, profit: 22.49, supplier: 'AliExpress', status: 'in_stock', sales: 145 },
  { name: 'Bamboo Cutting Board Set', category: 'Home Goods', cost: 10.00, sellPrice: 34.99, profit: 24.99, supplier: 'Zendrop', status: 'in_stock', sales: 89 },
  { name: 'Slim Wallet with RFID Blocking', category: 'Tech Accessories', cost: 5.00, sellPrice: 22.99, profit: 17.99, supplier: 'Printful', status: 'low_stock', sales: 167 },
  { name: 'UV Phone Sanitizer', category: 'Tech Accessories', cost: 14.00, sellPrice: 44.99, profit: 30.99, supplier: 'CJDropshipping', status: 'out_of_stock', sales: 98 },
  { name: 'Aromatherapy Shower Steamers', category: 'Health & Wellness', cost: 4.50, sellPrice: 19.99, profit: 15.49, supplier: 'Spocket', status: 'in_stock', sales: 234 },
  { name: 'Kitchen Organizer Drawer Inserts', category: 'Home Goods', cost: 8.00, sellPrice: 27.99, profit: 19.99, supplier: 'Zendrop', status: 'in_stock', sales: 76 },
  { name: 'Magnetic Phone Car Mount', category: 'Tech Accessories', cost: 4.00, sellPrice: 18.99, profit: 14.99, supplier: 'AliExpress', status: 'in_stock', sales: 312 },
  { name: 'Travel Neck Pillow Memory Foam', category: 'Health & Wellness', cost: 8.50, sellPrice: 32.99, profit: 24.49, supplier: 'CJDropshipping', status: 'in_stock', sales: 123 },
]

const statusStyles: Record<string, { label: string, bg: string, icon: any }> = {
  in_stock: { label: 'In Stock', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle },
  low_stock: { label: 'Low Stock', bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: AlertTriangle },
  out_of_stock: { label: 'Out of Stock', bg: 'bg-red-50 text-red-700 border-red-200', icon: AlertTriangle },
}

const categories = ['All', 'Tech Accessories', 'Health & Wellness', 'Home Goods']

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = mockProducts.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.supplier.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalProfit = filteredProducts.reduce((sum, p) => sum + p.profit * p.sales, 0)

  return (
    <>
      <Header title="Products" subtitle="Manage your 30 active products across tech, health, and home categories" />
      <div className="p-8 animate-fade-in">
        {/* Summary Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Total Products</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{mockProducts.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">In Stock</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{mockProducts.filter(p => p.status === 'in_stock').length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Low Stock</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{mockProducts.filter(p => p.status === 'low_stock').length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Total Profit (est.)</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">${totalProfit.toLocaleString()}</p>
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
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all inline-flex items-center gap-2 shadow-sm hover:shadow-md">
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {['Product', 'Category', 'Cost', 'Sell Price', 'Profit', 'Margin', 'Sales', 'Supplier', 'Status'].map(h => (
                    <th key={h} className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-16 text-center">
                      <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">No products found</p>
                      <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filter</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product, idx) => {
                    const statusInfo = statusStyles[product.status]
                    const margin = ((product.sellPrice - product.cost) / product.sellPrice * 100).toFixed(0)
                    const StatusIcon = statusInfo.icon
                    return (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-slate-900">{product.name}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">${product.cost.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">${product.sellPrice.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm font-medium text-emerald-600">+${product.profit.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${margin}%` }}
                              />
                            </div>
                            <span className="text-xs text-slate-500">{margin}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">{product.sales}</td>
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
              <p className="text-sm text-slate-500">
                Showing {filteredProducts.length} of {mockProducts.length} products
              </p>
              <div className="flex items-center gap-2">
                <select className="text-xs px-2 py-1.5 rounded border border-slate-200 bg-white text-slate-600">
                  <option>10 per page</option>
                  <option>25 per page</option>
                  <option>50 per page</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
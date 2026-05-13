'use client'

import { Truck, Star, Clock, Package, Shield, TrendingUp } from 'lucide-react'
import Header from '@/components/Header'

const suppliers = [
  {
    name: 'AliExpress',
    rating: 4.2,
    reviews: 2450,
    min: 10,
    max: 25,
    desc: 'Largest marketplace with millions of products at competitive prices. Great for testing new products with minimal upfront cost.',
    logo: 'AE',
    color: 'from-orange-500 to-red-500',
    products: 12,
    revenue: 28500,
    status: 'Active',
    features: ['Global shipping', 'Buyer protection', 'Wide selection'],
  },
  {
    name: 'CJDropshipping',
    rating: 4.5,
    reviews: 1820,
    min: 7,
    max: 18,
    desc: 'Dedicated dropshipping supplier with fast processing times and excellent automation tools for order syncing.',
    logo: 'CJ',
    color: 'from-blue-500 to-cyan-500',
    products: 8,
    revenue: 19200,
    status: 'Active',
    features: ['Auto order sync', 'Branding service', 'Quality control'],
  },
  {
    name: 'Spocket',
    rating: 4.7,
    reviews: 1560,
    min: 5,
    max: 14,
    desc: 'Premium suppliers based in US and EU for faster shipping to your customers. Higher margins on premium products.',
    logo: 'SP',
    color: 'from-emerald-500 to-teal-500',
    products: 5,
    revenue: 15400,
    status: 'Active',
    features: ['Fast shipping', 'US/EU suppliers', 'Premium quality'],
  },
  {
    name: 'Zendrop',
    rating: 4.3,
    reviews: 980,
    min: 8,
    max: 20,
    desc: 'User-friendly platform with branding options and custom packaging. Great for building your brand identity.',
    logo: 'ZD',
    color: 'from-purple-500 to-pink-500',
    products: 3,
    revenue: 8900,
    status: 'Active',
    features: ['Custom branding', 'Easy interface', 'Sample orders'],
  },
  {
    name: 'Printful',
    rating: 4.6,
    reviews: 2100,
    min: 4,
    max: 10,
    desc: 'Print-on-demand with high quality and fast turnaround. Perfect for custom merchandise and branded apparel.',
    logo: 'PF',
    color: 'from-indigo-500 to-violet-500',
    products: 2,
    revenue: 5600,
    status: 'Active',
    features: ['Print-on-demand', 'Fast turnaround', 'Mockup generator'],
  },
]

export default function SuppliersPage() {
  const totalRevenue = suppliers.reduce((sum, s) => sum + s.revenue, 0)

  return (
    <>
      <Header title="Suppliers" subtitle="Connected to 5 fulfillment partners for flexible sourcing" />
      <div className="p-8 animate-fade-in">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Active Suppliers</p>
                <p className="text-2xl font-bold text-slate-900">{suppliers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Products</p>
                <p className="text-2xl font-bold text-slate-900">{suppliers.reduce((sum, s) => sum + s.products, 0)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Supplier Revenue</p>
                <p className="text-2xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Supplier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {suppliers.map((s) => (
            <div
              key={s.name}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                    {s.logo}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{s.name}</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-medium text-slate-700">{s.rating}</span>
                      <span className="text-xs text-slate-400">({s.reviews.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {s.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">{s.desc}</p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                  <p className="text-xs text-slate-400">Products</p>
                  <p className="text-lg font-bold text-slate-900">{s.products}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                  <p className="text-xs text-slate-400">Shipping</p>
                  <p className="text-sm font-bold text-slate-900">{s.min}-{s.max}d</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5 text-center">
                  <p className="text-xs text-slate-400">Revenue</p>
                  <p className="text-sm font-bold text-slate-900">${(s.revenue / 1000).toFixed(1)}k</p>
                </div>
              </div>

              {/* Features */}
              <div className="flex items-center gap-2 flex-wrap">
                {s.features.map((f) => (
                  <span key={f} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                    <Shield className="w-3 h-3" />
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Shipping Comparison */}
        <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-slate-50 text-slate-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Shipping Speed Comparison</h2>
              <p className="text-sm text-slate-500">Estimated delivery times from fastest to slowest</p>
            </div>
          </div>
          <div className="space-y-3">
            {[...suppliers].sort((a, b) => a.min - b.min).map((s) => (
              <div key={s.name} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {s.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-900">{s.name}</span>
                    <span className="text-xs text-slate-500">{s.min}-{s.max} days</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400"
                      style={{ width: `${((20 - s.min) / 20) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
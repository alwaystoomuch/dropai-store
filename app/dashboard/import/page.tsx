'use client'

import { useState } from 'react'
import { Upload, Package, Plus, Trash2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import Header from '@/components/Header'

interface ProductEntry {
  name: string
  price: string
  cost?: string
  category: string
  supplier: string
  description?: string
}

const defaultProduct: ProductEntry = {
  name: '',
  price: '',
  cost: '',
  category: 'General',
  supplier: 'Manual Import',
  description: '',
}

const CATEGORIES = ['Tech Accessories', 'Health & Wellness', 'Home Goods', 'Fashion', 'Beauty', 'Pet Supplies', 'Outdoor', 'Kitchen', 'General']
const SUPPLIERS = ['Spocket', 'CJDropshipping', 'AliExpress', 'Zendrop', 'Printful', 'Manual Import']

export default function ImportPage() {
  const [products, setProducts] = useState<ProductEntry[]>([{ ...defaultProduct }])
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [bulkText, setBulkText] = useState('')
  const [mode, setMode] = useState<'form' | 'bulk'>('form')

  const addProduct = () => setProducts([...products, { ...defaultProduct }])
  const removeProduct = (idx: number) => setProducts(products.filter((_, i) => i !== idx))

  const updateProduct = (idx: number, field: keyof ProductEntry, value: string) => {
    const updated = [...products]
    updated[idx] = { ...updated[idx], [field]: value }
    setProducts(updated)
  }

  const parseBulk = () => {
    const lines = bulkText.trim().split('\n').filter(l => l.trim())
    const parsed: ProductEntry[] = lines.map(line => {
      // Format: Name | Price | Category | Supplier
      const parts = line.split('|').map(p => p.trim())
      return {
        name: parts[0] || '',
        price: parts[1] || '',
        category: parts[2] || 'General',
        supplier: parts[3] || 'Manual Import',
        cost: parts[4] || '',
        description: parts[5] || '',
      }
    }).filter(p => p.name && p.price)
    setProducts(parsed)
  }

  const handleImport = async () => {
    setImporting(true)
    setResult(null)

    const payload = products.map(p => ({
      name: p.name,
      price: parseFloat(p.price),
      cost: p.cost ? parseFloat(p.cost) : undefined,
      category: p.category,
      supplier: p.supplier,
      description: p.description,
    })).filter(p => p.name && p.price)

    if (payload.length === 0) {
      setResult({ success: false, message: 'Please add at least one product with a name and price.' })
      setImporting(false)
      return
    }

    try {
      const res = await fetch('/api/products/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      setResult(data)
      if (data.success) {
        setProducts([{ ...defaultProduct }])
        setBulkText('')
      }
    } catch {
      setResult({ success: false, message: 'Network error — check your connection.' })
    } finally {
      setImporting(false)
    }
  }

  return (
    <>
      <Header title="Import Products" />
      <div className="p-8 animate-fade-in">

        {/* Status Banner */}
        {result && (
          <div className={`mb-6 p-4 rounded-xl border flex items-start gap-3 ${
            result.success
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            {result.success ? <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />}
            <div>
              <p className="font-medium">{result.success ? 'Imported!' : 'Error'}</p>
              <p className="text-sm mt-0.5">{result.message}</p>
            </div>
          </div>
        )}

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode('form')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'form' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            <Package className="w-4 h-4 inline mr-1.5" />
            Form Entry
          </button>
          <button
            onClick={() => setMode('bulk')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'bulk' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200'}`}
          >
            <Upload className="w-4 h-4 inline mr-1.5" />
            Bulk Paste
          </button>
        </div>

        {mode === 'bulk' ? (
          /* ─── Bulk Mode ─── */
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Paste Products</h2>
            <p className="text-sm text-slate-500 mb-4">One product per line. Format: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">Name | Price | Category | Supplier | Cost | Description</code></p>
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 mb-4 text-xs text-indigo-700">
              <strong>Example:</strong><br />
              Wireless Earbuds | 29.99 | Tech Accessories | Spocket | 8.50 | Premium earbuds with noise cancellation<br />
              Yoga Mat | 34.99 | Health & Wellness | CJDropshipping | 10.00 | Extra thick non-slip mat
            </div>
            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder="Paste your products here..."
              className="w-full h-48 px-4 py-3 rounded-lg border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex gap-3 mt-4">
              <button onClick={parseBulk} className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all">
                Parse Products
              </button>
            </div>
            {products.length > 1 && (
              <p className="text-sm text-emerald-600 mt-2">Parsed {products.length} products</p>
            )}
          </div>
        ) : (
          /* ─── Form Mode ─── */
          <div className="space-y-4">
            {products.map((product, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-slate-900">Product #{idx + 1}</h3>
                  {products.length > 1 && (
                    <button onClick={() => removeProduct(idx)} className="text-red-500 hover:text-red-700 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Product Name *</label>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => updateProduct(idx, 'name', e.target.value)}
                      placeholder="e.g. Wireless Bluetooth Earbuds"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Selling Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={product.price}
                      onChange={(e) => updateProduct(idx, 'price', e.target.value)}
                      placeholder="e.g. 29.99"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Cost Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={product.cost}
                      onChange={(e) => updateProduct(idx, 'cost', e.target.value)}
                      placeholder="Auto (40% of sell price)"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Category</label>
                    <select
                      value={product.category}
                      onChange={(e) => updateProduct(idx, 'category', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Supplier</label>
                    <select
                      value={product.supplier}
                      onChange={(e) => updateProduct(idx, 'supplier', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {SUPPLIERS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
                    <input
                      type="text"
                      value={product.description || ''}
                      onChange={(e) => updateProduct(idx, 'description', e.target.value)}
                      placeholder="Short product description"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addProduct} className="w-full border-2 border-dashed border-slate-300 rounded-xl py-4 text-sm text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-all inline-flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Add Another Product
            </button>
          </div>
        )}

        {/* Import Button */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {products.filter(p => p.name && p.price).length} product{products.filter(p => p.name && p.price).length !== 1 ? 's' : ''} ready to import
          </p>
          <button
            onClick={handleImport}
            disabled={importing}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white px-8 py-3 rounded-xl text-sm font-medium transition-all inline-flex items-center gap-2 shadow-sm"
          >
            {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {importing ? 'Importing...' : `Import ${products.filter(p => p.name && p.price).length} Product${products.filter(p => p.name && p.price).length !== 1 ? 's' : ''}`}
          </button>
        </div>

        {/* Quick Margin Calculator */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-5">
          <h3 className="text-sm font-semibold text-slate-900 mb-2">💰 Quick Margin Calculator</h3>
          <p className="text-xs text-slate-500 mb-3">Enter a supplier cost and your sell price to see your profit:</p>
          <div className="flex items-center gap-3 flex-wrap">
            <div>
              <label className="block text-xs text-slate-500 mb-1">Cost ($)</label>
              <input id="calc-cost" type="number" step="0.01" placeholder="10.00" className="w-24 px-3 py-2 rounded-lg border border-slate-200 text-sm" onChange={() => {
                const cost = parseFloat((document.getElementById('calc-cost') as HTMLInputElement)?.value || '0')
                const price = parseFloat((document.getElementById('calc-price') as HTMLInputElement)?.value || '0')
                const result = document.getElementById('calc-result')
                if (result && cost > 0 && price > 0) {
                  const profit = price - cost
                  const margin = (profit / price * 100)
                  result.innerHTML = `Profit: <strong>$${profit.toFixed(2)}</strong> (${margin.toFixed(0)}% margin)`
                }
              }} />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">Sell Price ($)</label>
              <input id="calc-price" type="number" step="0.01" placeholder="29.99" className="w-24 px-3 py-2 rounded-lg border border-slate-200 text-sm" onChange={() => {
                const cost = parseFloat((document.getElementById('calc-cost') as HTMLInputElement)?.value || '0')
                const price = parseFloat((document.getElementById('calc-price') as HTMLInputElement)?.value || '0')
                const result = document.getElementById('calc-result')
                if (result && cost > 0 && price > 0) {
                  const profit = price - cost
                  const margin = (profit / price * 100)
                  result.innerHTML = `Profit: <strong>$${profit.toFixed(2)}</strong> (${margin.toFixed(0)}% margin)`
                } else if (result) {
                  result.innerHTML = 'Enter both values to see margin'
                }
              }} />
            </div>
            <p id="calc-result" className="text-sm text-slate-600 pt-5">Enter both values to see margin</p>
          </div>
        </div>
      </div>
    </>
  )
}
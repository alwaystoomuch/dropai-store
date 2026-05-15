'use client'

import Link from 'next/link'
import { ShoppingCart, Droplets, Minus, Plus, Trash2, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart()
  const [checkingOut, setCheckingOut] = useState(false)

  const handleCheckout = async () => {
    setCheckingOut(true)
    try {
      // Create a checkout for the first item (simplified)
      const firstItem = items[0]
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: firstItem.id,
          productName: `${firstItem.name}${items.length > 1 ? ` + ${items.length - 1} more` : ''}`,
          price: Math.round(totalPrice * 100) / 100,
          quantity: 1,
        }),
      })
      const data = await res.json()
      if (data.url) {
        clearCart()
        window.location.href = data.url
      }
    } catch (e) {
      console.error(e)
    } finally {
      setCheckingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="w-7 h-7 text-indigo-600" />
            <Link href="/store" className="text-xl font-bold text-slate-900">DropAI Store</Link>
          </div>
          <Link href="/store" className="text-sm text-slate-600 hover:text-slate-900 inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
          <ShoppingCart className="w-6 h-6" />
          Shopping Cart
          {totalItems > 0 && <span className="text-sm font-normal text-slate-500">({totalItems} items)</span>}
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-16 text-center">
            <p className="text-6xl mb-4">🛒</p>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Your cart is empty</h2>
            <p className="text-sm text-slate-500 mb-6">Looks like you haven't added anything yet.</p>
            <Link href="/store" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-medium inline-flex items-center gap-2">
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center text-2xl flex-shrink-0">
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/store/${item.id}`} className="text-sm font-semibold text-slate-900 hover:text-indigo-600">{item.name}</Link>
                    <p className="text-sm text-slate-500 mt-0.5">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-slate-200 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1.5 hover:bg-slate-50 text-slate-600">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1.5 text-sm font-medium text-slate-900 min-w-[30px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1.5 hover:bg-slate-50 text-slate-600">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-slate-900 min-w-[70px] text-right">${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeItem(item.id)} className="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 h-fit sticky top-24">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium text-slate-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-medium text-emerald-600">Free</span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between text-base">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="font-bold text-slate-900">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white py-3 rounded-xl text-sm font-bold transition-all inline-flex items-center justify-center gap-2 shadow-sm"
              >
                {checkingOut ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
                {checkingOut ? 'Processing...' : 'Checkout'}
              </button>
              <p className="text-xs text-slate-400 text-center mt-3">Secure checkout via Stripe</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
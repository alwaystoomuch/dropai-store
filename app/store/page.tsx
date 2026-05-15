'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Droplets, Star, Loader2, CheckCircle } from 'lucide-react'

const products = [
  { id: 'prod-001', name: 'Wireless Bluetooth Earbuds', price: 39.99, category: 'Tech Accessories', rating: 4.8, sales: 342, emoji: '🎧', badge: 'Best Seller', desc: 'Premium wireless earbuds with noise cancellation, 30hr battery life, and IPX5 waterproof rating. Crystal clear sound with deep bass.' },
  { id: 'prod-002', name: '10000mAh Portable Charger', price: 24.99, category: 'Tech Accessories', rating: 4.6, sales: 287, emoji: '🔋', badge: 'Hot', desc: 'Ultra-compact power bank with fast charging, dual USB ports, and LED battery indicator. Charge your phone 3x on one full charge.' },
  { id: 'prod-003', name: 'Adjustable Phone Stand', price: 12.99, category: 'Tech Accessories', rating: 4.5, sales: 198, emoji: '📱', badge: null, desc: 'Ergonomic aluminum phone stand with adjustable angle. Compatible with all phones and tablets up to 12.9".' },
  { id: 'prod-004', name: 'LED Desk Lamp with Wireless Charger', price: 39.99, category: 'Tech Accessories', rating: 4.7, sales: 156, emoji: '💡', badge: null, desc: 'Modern LED desk lamp with touch control, 5 brightness levels, and built-in wireless charging pad.' },
  { id: 'prod-005', name: 'Smart Water Bottle with Reminder', price: 29.99, category: 'Health & Wellness', rating: 4.4, sales: 134, emoji: '💧', badge: null, desc: 'Temperature-displaying smart bottle with time reminder to hydrate. BPA-free, holds 500ml. Keeps drinks cold 24hrs.' },
  { id: 'prod-006', name: 'Resistance Bands Set', price: 19.99, category: 'Health & Wellness', rating: 4.9, sales: 212, emoji: '🏋️', badge: 'Top Rated', desc: 'Set of 5 resistance bands with different strengths. Includes door anchor, ankle straps, and carry bag. Perfect for home workouts.' },
  { id: 'prod-007', name: 'Extra Thick Yoga Mat', price: 34.99, category: 'Health & Wellness', rating: 4.7, sales: 178, emoji: '🧘', badge: null, desc: '6mm thick non-slip yoga mat with alignment lines. Eco-friendly TPE material. Comes with carrying strap.' },
  { id: 'prod-008', name: 'Essential Oil Diffuser', price: 24.99, category: 'Health & Wellness', rating: 4.5, sales: 145, emoji: '🌸', badge: null, desc: 'Ultrasonic aromatherapy diffuser with 7-color LED, auto shut-off, and covers up to 300sq ft. Quiet operation.' },
  { id: 'prod-009', name: 'Bamboo Cutting Board Set', price: 29.99, category: 'Home Goods', rating: 4.6, sales: 89, emoji: '🪵', badge: null, desc: 'Organic bamboo cutting board set with juice groove. Includes 3 sizes for all your food prep needs.' },
  { id: 'prod-010', name: 'RFID Blocking Wallet', price: 19.99, category: 'Tech Accessories', rating: 4.3, sales: 167, emoji: '👛', badge: null, desc: 'Slim minimalist wallet with RFID blocking technology. Holds up to 8 cards. Genuine leather, available in 3 colors.' },
  { id: 'prod-011', name: 'UV Phone Sanitizer', price: 39.99, category: 'Tech Accessories', rating: 4.5, sales: 98, emoji: '🦠', badge: null, desc: 'UV-C sterilizer that kills 99.9% of germs on your phone in just 5 minutes. Also fits keys, wallets, and masks.' },
  { id: 'prod-012', name: 'Aromatherapy Shower Steamers', price: 14.99, category: 'Health & Wellness', rating: 4.8, sales: 234, emoji: '🌿', badge: 'Best Seller', desc: 'Set of 6 essential oil shower steamers. Transform your shower into a spa. Eucalyptus, lavender, and citrus scents.' },
  { id: 'prod-013', name: 'Magnetic Phone Car Mount', price: 14.99, category: 'Tech Accessories', rating: 4.6, sales: 312, emoji: '🧲', badge: null, desc: 'Strong magnetic car mount with 360° rotation. One-hand operation. Universal fit for all smartphones.' },
  { id: 'prod-014', name: 'Memory Foam Travel Neck Pillow', price: 27.99, category: 'Health & Wellness', rating: 4.4, sales: 123, emoji: '😴', badge: null, desc: 'Premium memory foam neck pillow with washable cover. Includes compression travel bag. Ergonomic design for all sleep positions.' },
  { id: 'prod-015', name: 'LED Strip Lights 10ft', price: 18.99, category: 'Home Goods', rating: 4.7, sales: 267, emoji: '✨', badge: 'Hot', desc: 'RGB LED strip lights with remote control. Music sync mode, 16 colors, and adhesive backing for easy installation.' },
]

// Color themes for product cards
const colors = [
  'from-indigo-100 to-purple-100', 'from-blue-100 to-cyan-100', 'from-emerald-100 to-teal-100',
  'from-amber-100 to-orange-100', 'from-rose-100 to-pink-100', 'from-violet-100 to-fuchsia-100',
  'from-sky-100 to-indigo-100', 'from-lime-100 to-emerald-100', 'from-orange-100 to-red-100',
  'from-teal-100 to-cyan-100', 'from-pink-100 to-rose-100', 'from-purple-100 to-violet-100',
  'from-yellow-100 to-amber-100', 'from-green-100 to-emerald-100', 'from-red-100 to-orange-100',
]

export default function StorePage() {
  const [buyingId, setBuyingId] = useState<string | null>(null)
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null)

  const handleBuy = async (product: typeof products[0]) => {
    setBuyingId(product.id)
    setMessage(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity: 1,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setMessage({ text: data.error || 'Checkout failed', success: false })
      }
    } catch {
      setMessage({ text: 'Network error — try again', success: false })
    } finally {
      setBuyingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="w-7 h-7 text-indigo-600" />
            <span className="text-xl font-bold text-slate-900">DropAI Store</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">Dashboard</Link>
            <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">Home</Link>
          </div>
        </div>
      </header>

      {/* Message toast */}
      {message && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 ${
          message.success ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {message.success ? <CheckCircle className="w-4 h-4" /> : null}
          {message.text}
          <button onClick={() => setMessage(null)} className="ml-2 opacity-70 hover:opacity-100">✕</button>
        </div>
      )}

      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Products, Smart Prices</h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">Curated tech, wellness, and home goods — shipped directly to your door. Free shipping on all orders!</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div key={product.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group flex flex-col">
              {/* Image area */}
              <div className={`aspect-[4/3] bg-gradient-to-br ${colors[idx % colors.length]} flex items-center justify-center text-5xl relative`}>
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                    {product.badge}
                  </span>
                )}
                <span className="group-hover:scale-125 transition-transform duration-500 drop-shadow-lg">{product.emoji}</span>
              </div>
              
              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">{product.category}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[11px] text-slate-500">{product.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-sm font-semibold text-slate-900 mt-1">{product.name}</h3>
                
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 flex-1">{product.desc}</p>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-lg font-bold text-slate-900">${product.price}</span>
                    <span className="text-xs text-slate-400 ml-1.5 line-through">${(product.price * 1.4).toFixed(0)}</span>
                  </div>
                  <button
                    onClick={() => handleBuy(product)}
                    disabled={buyingId === product.id}
                    className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all inline-flex items-center gap-1.5 shadow-sm hover:shadow-md"
                  >
                    {buyingId === product.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ShoppingCart className="w-4 h-4" />
                    )}
                    {buyingId === product.id ? '...' : 'Buy Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        © 2026 DropAI. Free shipping on all orders • 30-day money-back guarantee
      </footer>
    </div>
  )
}
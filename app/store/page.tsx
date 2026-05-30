'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Droplets, Star, CheckCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const products = [
  { id: 'prod-001', name: 'Wireless Bluetooth Earbuds', price: 39.99, category: 'Tech Accessories', rating: 4.8, sales: 342, emoji: '🎧', badge: 'Best Seller', desc: 'Premium wireless earbuds with noise cancellation, 30hr battery life.', image: 'https://picsum.photos/seed/earbuds/400/300' },
  { id: 'prod-002', name: '10000mAh Portable Charger', price: 24.99, category: 'Tech Accessories', rating: 4.6, sales: 287, emoji: '🔋', badge: 'Hot', desc: 'Ultra-compact power bank with fast charging, dual USB ports.', image: 'https://picsum.photos/seed/charger/400/300' },
  { id: 'prod-003', name: 'Adjustable Phone Stand', price: 12.99, category: 'Tech Accessories', rating: 4.5, sales: 198, emoji: '📱', badge: null, desc: 'Ergonomic aluminum phone stand with adjustable angle.', image: 'https://picsum.photos/seed/stand/400/300' },
  { id: 'prod-004', name: 'LED Desk Lamp', price: 39.99, category: 'Tech Accessories', rating: 4.7, sales: 156, emoji: '💡', badge: null, desc: 'Modern LED desk lamp with touch control and wireless charging.', image: 'https://picsum.photos/seed/lamp/400/300' },
  { id: 'prod-005', name: 'Smart Water Bottle', price: 29.99, category: 'Health & Wellness', rating: 4.4, sales: 134, emoji: '💧', badge: null, desc: 'Temperature-displaying smart bottle with drink reminder.', image: 'https://picsum.photos/seed/bottle/400/300' },
  { id: 'prod-006', name: 'Resistance Bands Set', price: 19.99, category: 'Health & Wellness', rating: 4.9, sales: 212, emoji: '🏋️', badge: 'Top Rated', desc: 'Set of 5 resistance bands with door anchor and carry bag.', image: 'https://picsum.photos/seed/bands/400/300' },
  { id: 'prod-007', name: 'Extra Thick Yoga Mat', price: 34.99, category: 'Health & Wellness', rating: 4.7, sales: 178, emoji: '🧘', badge: null, desc: '6mm thick non-slip yoga mat with alignment lines.', image: 'https://picsum.photos/seed/yoga/400/300' },
  { id: 'prod-008', name: 'Essential Oil Diffuser', price: 24.99, category: 'Health & Wellness', rating: 4.5, sales: 145, emoji: '🌸', badge: null, desc: 'Ultrasonic aromatherapy diffuser with 7-color LED.', image: 'https://picsum.photos/seed/diffuser/400/300' },
  { id: 'prod-009', name: 'Bamboo Cutting Board Set', price: 29.99, category: 'Home Goods', rating: 4.6, sales: 89, emoji: '🪵', badge: null, desc: 'Organic bamboo cutting board set with juice groove.', image: 'https://picsum.photos/seed/cutting/400/300' },
  { id: 'prod-010', name: 'RFID Blocking Wallet', price: 19.99, category: 'Tech Accessories', rating: 4.3, sales: 167, emoji: '👛', badge: null, desc: 'Slim minimalist wallet with RFID blocking technology.', image: 'https://picsum.photos/seed/wallet/400/300' },
  { id: 'prod-011', name: 'UV Phone Sanitizer', price: 39.99, category: 'Tech Accessories', rating: 4.5, sales: 98, emoji: '🦠', badge: null, desc: 'UV-C sterilizer that kills 99.9% of germs in 5 minutes.', image: 'https://picsum.photos/seed/sanitizer/400/300' },
  { id: 'prod-012', name: 'Aromatherapy Shower Steamers', price: 14.99, category: 'Health & Wellness', rating: 4.8, sales: 234, emoji: '🌿', badge: 'Best Seller', desc: 'Set of 6 essential oil shower steamers for a spa experience.', image: 'https://picsum.photos/seed/steamer/400/300' },
  { id: 'prod-013', name: 'Magnetic Phone Car Mount', price: 14.99, category: 'Tech Accessories', rating: 4.6, sales: 312, emoji: '🧲', badge: null, desc: 'Strong magnetic car mount with 360° rotation.', image: 'https://picsum.photos/seed/mount/400/300' },
  { id: 'prod-014', name: 'Memory Foam Travel Pillow', price: 27.99, category: 'Health & Wellness', rating: 4.4, sales: 123, emoji: '😴', badge: null, desc: 'Premium memory foam neck pillow with washable cover.', image: 'https://picsum.photos/seed/pillow/400/300' },
  { id: 'prod-015', name: 'LED Strip Lights 10ft', price: 18.99, category: 'Home Goods', rating: 4.7, sales: 267, emoji: '✨', badge: 'Hot', desc: 'RGB LED strip lights with music sync and remote control.', image: 'https://picsum.photos/seed/lights/400/300' },
]

const bgColors: Record<string, string> = {
  'Tech Accessories': 'from-blue-200 to-indigo-200',
  'Health & Wellness': 'from-emerald-200 to-teal-200',
  'Home Goods': 'from-amber-200 to-orange-200',
}

export default function StorePage() {
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null)
  const { addItem, totalItems } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filtered = selectedCategory === 'All' ? products : products.filter(p => p.category.startsWith(selectedCategory))
  const categories = ['All', ...new Set(products.map(p => p.category.split(' ')[0]))]

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({ id: product.id, name: product.name, price: product.price, quantity: 1, emoji: product.emoji })
    setMessage({ text: `${product.name} added to cart!`, success: true })
    setTimeout(() => setMessage(null), 2000)
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
            <Link href="/store/cart" className="relative">
              <ShoppingCart className="w-5 h-5 text-slate-600 hover:text-slate-900" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{totalItems}</span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {message && (
        <div className="fixed top-4 right-4 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {message.text}
        </div>
      )}

      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Premium Products, Smart Prices</h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto">Curated tech, wellness, and home goods — shipped directly to your door.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'}`}
            >{cat}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div key={product.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group flex flex-col">
              <Link href={`/store/${product.id}`}>
                <div className={`aspect-[4/3] bg-gradient-to-br ${bgColors[product.category] || 'from-slate-200 to-slate-300'} relative overflow-hidden flex items-center justify-center`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-5xl">${product.emoji}</span>` }}
                  />
                  {product.badge && <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">{product.badge}</span>}
                </div>
              </Link>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded-full">{product.category}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[11px] text-slate-500">{product.rating}</span>
                  </div>
                </div>
                <Link href={`/store/${product.id}`}>
                  <h3 className="text-sm font-semibold text-slate-900 mt-1">{product.name}</h3>
                  <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{product.desc}</p>
                </Link>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                  <span className="text-lg font-bold text-slate-900">${product.price}</span>
                  <div className="flex gap-1.5">
                    <Link href={`/store/${product.id}`} className="text-xs text-indigo-600 hover:text-indigo-500 font-medium px-2 py-2">Details</Link>
                    <button onClick={() => handleAddToCart(product)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg text-xs font-medium transition-all">
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        © 2026 DropAI. Free shipping on all orders
      </footer>
    </div>
  )
}
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ShoppingCart, Star, ArrowLeft, CheckCircle, Minus, Plus, Droplets } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const products = [
  { id: 'prod-001', name: 'Wireless Bluetooth Earbuds', price: 39.99, category: 'Tech Accessories', rating: 4.8, sales: 342, emoji: '🎧', badge: 'Best Seller', desc: 'Premium wireless earbuds with active noise cancellation, 30-hour battery life, and IPX5 waterproof rating. Crystal clear sound with deep bass response. Includes charging case, 3 sizes of ear tips, and USB-C cable.', features: ['Active Noise Cancellation', '30hr Battery Life', 'IPX5 Waterproof', 'Bluetooth 5.3', 'Touch Controls', 'USB-C Charging'] },
  { id: 'prod-002', name: '10000mAh Portable Charger', price: 24.99, category: 'Tech Accessories', rating: 4.6, sales: 287, emoji: '🔋', badge: 'Hot', desc: 'Ultra-compact power bank with fast charging, dual USB ports, and LED battery indicator. Charge your phone 3x on one full charge. Slim design fits in any pocket.', features: ['10000mAh Capacity', 'Fast Charging 20W', 'Dual USB Ports', 'LED Indicator', 'Slim Design', 'Pass-Through Charging'] },
  { id: 'prod-003', name: 'Adjustable Phone Stand', price: 12.99, category: 'Tech Accessories', rating: 4.5, sales: 198, emoji: '📱', badge: null, desc: 'Ergonomic aluminum phone stand with adjustable viewing angle. Compatible with all phones and tablets up to 12.9". Foldable design for travel. Non-slip silicone base.', features: ['Adjustable Angle', 'Aluminum Build', 'Universal Fit', 'Foldable', 'Non-Slip Base', 'Lightweight'] },
  { id: 'prod-004', name: 'LED Desk Lamp with Wireless Charger', price: 39.99, category: 'Tech Accessories', rating: 4.7, sales: 156, emoji: '💡', badge: null, desc: 'Modern LED desk lamp with touch control, 5 brightness levels, 3 color temperatures, and a built-in wireless charging pad for your phone.', features: ['Built-in Wireless Charger', '5 Brightness Levels', '3 Color Temperatures', 'Touch Control', 'USB Charging Port', 'Eye-Care Technology'] },
  { id: 'prod-005', name: 'Smart Water Bottle', price: 29.99, category: 'Health & Wellness', rating: 4.4, sales: 134, emoji: '💧', badge: null, desc: 'Temperature-displaying smart bottle with drink reminder. BPA-free, holds 500ml. Keeps drinks cold for 24 hours or hot for 12. LED temperature display.', features: ['Temperature Display', 'Drink Reminder', '500ml Capacity', 'BPA-Free', '24hr Cold/12hr Hot', 'LED Display'] },
  { id: 'prod-006', name: 'Resistance Bands Set', price: 19.99, category: 'Health & Wellness', rating: 4.9, sales: 212, emoji: '🏋️', badge: 'Top Rated', desc: 'Complete set of 5 resistance bands with different strengths (10-50lbs). Includes door anchor, ankle straps, and carry bag. Perfect for home workouts, yoga, and physical therapy.', features: ['5 Resistance Levels', 'Door Anchor Included', 'Ankle Straps', 'Carry Bag', 'Latex-Free Option', 'Exercise Guide'] },
  { id: 'prod-007', name: 'Extra Thick Yoga Mat', price: 34.99, category: 'Health & Wellness', rating: 4.7, sales: 178, emoji: '🧘', badge: null, desc: '6mm thick non-slip yoga mat with alignment lines. Eco-friendly TPE material. Comes with carrying strap. Perfect for yoga, Pilates, and stretching.', features: ['6mm Thick Cushion', 'Non-Slip Surface', 'Alignment Lines', 'Eco-Friendly TPE', 'Carrying Strap', '72" x 24" Size'] },
  { id: 'prod-008', name: 'Essential Oil Diffuser', price: 24.99, category: 'Health & Wellness', rating: 4.5, sales: 145, emoji: '🌸', badge: null, desc: 'Ultrasonic aromatherapy diffuser with 7-color LED mood lighting, auto shut-off, and covers up to 300sq ft. Whisper-quiet operation for bedrooms and offices.', features: ['7-Color LED', 'Auto Shut-Off', '300sq ft Coverage', 'Ultrasonic Technology', 'Quiet Operation', '200ml Capacity'] },
  { id: 'prod-009', name: 'Bamboo Cutting Board Set', price: 29.99, category: 'Home Goods', rating: 4.6, sales: 89, emoji: '🪵', badge: null, desc: 'Organic bamboo cutting board set with deep juice groove. Includes 3 sizes (small, medium, large) for all your food prep needs. Knife-friendly and antimicrobial.', features: ['3-Piece Set', 'Juice Groove', 'Antimicrobial', 'Knife-Friendly', 'Easy Clean', 'Organic Bamboo'] },
  { id: 'prod-010', name: 'RFID Blocking Wallet', price: 19.99, category: 'Tech Accessories', rating: 4.3, sales: 167, emoji: '👛', badge: null, desc: 'Slim minimalist wallet with RFID blocking technology to protect your cards. Holds up to 8 cards. Genuine leather. Available in black, brown, and navy.', features: ['RFID Blocking', 'Holds 8 Cards', 'Genuine Leather', 'Slim Design', 'ID Window', '3 Color Options'] },
  { id: 'prod-011', name: 'UV Phone Sanitizer', price: 39.99, category: 'Tech Accessories', rating: 4.5, sales: 98, emoji: '🦠', badge: null, desc: 'UV-C sterilizer that kills 99.9% of germs on your phone in just 5 minutes. Also fits keys, wallets, masks, and other small items. Wireless charging compatible.', features: ['UV-C Sterilization', '99.9% Germ Kill', '5-Min Cycle', 'Fits All Phones', 'Wireless Charging', 'Auto Shut-Off'] },
  { id: 'prod-012', name: 'Aromatherapy Shower Steamers', price: 14.99, category: 'Health & Wellness', rating: 4.8, sales: 234, emoji: '🌿', badge: 'Best Seller', desc: 'Set of 6 essential oil shower steamers. Transform your shower into a spa experience. Scents: eucalyptus, lavender, citrus, peppermint, rose, and vanilla.', features: ['6 Scents', 'Essential Oils', 'Spa Experience', '15min Each', 'Cruelty-Free', 'Beautiful Gift Box'] },
  { id: 'prod-013', name: 'Magnetic Phone Car Mount', price: 14.99, category: 'Tech Accessories', rating: 4.6, sales: 312, emoji: '🧲', badge: null, desc: 'Strong magnetic car mount with 360° rotation ball head. One-hand operation. Universal fit for all smartphones. Includes 2 metal plates for cases.', features: ['360° Rotation', 'One-Hand Use', 'Strong Magnet', 'Universal Fit', '2 Plates Included', 'Easy Install'] },
  { id: 'prod-014', name: 'Memory Foam Travel Pillow', price: 27.99, category: 'Health & Wellness', rating: 4.4, sales: 123, emoji: '😴', badge: null, desc: 'Premium memory foam neck pillow with washable velour cover. Includes compression travel bag. Ergonomic design supports all sleep positions.', features: ['Memory Foam', 'Washable Cover', 'Travel Bag Included', 'Ergonomic Design', 'Adjustable Closure', 'Lightweight'] },
  { id: 'prod-015', name: 'LED Strip Lights 10ft', price: 18.99, category: 'Home Goods', rating: 4.7, sales: 267, emoji: '✨', badge: 'Hot', desc: 'RGB LED strip lights with remote control. Music sync mode, 16 colors, 4 brightness levels, and 4 dynamic modes. Adhesive backing for easy installation anywhere.', features: ['Music Sync', '16 Colors', 'Remote Control', '10ft Length', 'Adhesive Backing', '4 Dynamic Modes'] },
]

const colors: Record<string, string> = {
  'Tech Accessories': 'from-blue-100 to-indigo-100',
  'Health & Wellness': 'from-emerald-100 to-teal-100',
  'Home Goods': 'from-amber-100 to-orange-100',
}

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem, totalItems } = useCart()
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)

  const product = products.find(p => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🔍</p>
          <h2 className="text-xl font-bold text-slate-900">Product Not Found</h2>
          <Link href="/store" className="text-indigo-600 text-sm mt-2 inline-block hover:underline">← Back to Store</Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, quantity: 1, emoji: product.emoji })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Store header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="w-7 h-7 text-indigo-600" />
            <Link href="/store" className="text-xl font-bold text-slate-900">DropAI Store</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/store" className="text-sm text-slate-600 hover:text-slate-900">Store</Link>
            <Link href="/store/cart" className="relative">
              <ShoppingCart className="w-5 h-5 text-slate-600 hover:text-slate-900" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/store" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className={`aspect-square rounded-2xl bg-gradient-to-br ${colors[product.category] || 'from-slate-100 to-slate-200'} flex items-center justify-center text-8xl`}>
            {product.emoji}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">{product.category}</span>
              {product.badge && (
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">{product.badge}</span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">{product.name}</h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />)}
              </div>
              <span className="text-sm text-slate-500">{product.rating} ({product.sales} sold)</span>
            </div>

            <p className="text-3xl font-bold text-slate-900 mt-4">${product.price}</p>
            <p className="text-sm text-slate-400 line-through mt-0.5">${(product.price * 1.4).toFixed(0)}</p>

            <p className="text-sm text-slate-600 mt-4 leading-relaxed">{product.desc}</p>

            {/* Features */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border border-slate-200 rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2.5 hover:bg-slate-50 text-slate-600">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2.5 text-sm font-medium text-slate-900 min-w-[40px] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-2.5 hover:bg-slate-50 text-slate-600">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 px-6 py-3 rounded-xl text-sm font-bold transition-all inline-flex items-center justify-center gap-2 shadow-sm ${
                  added ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-md'
                }`}
              >
                {added ? <CheckCircle className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                {added ? 'Added!' : 'Add to Cart'}
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-3 text-center">Free shipping • 30-day returns • Secure checkout</p>
          </div>
        </div>
      </div>
    </div>
  )
}